#!/usr/bin/env python3
"""live_smoke.py — does the LIVE site actually boot for a reader, right now?

WHY THIS EXISTS, AND WHAT IT CATCHES THAT THE PARSE GATES CANNOT
---------------------------------------------------------------
The 87th non-negotiable gates shipped JS three times — commit, push, CI — and
every one of them asks the same single question: **does this file PARSE?**

That question has a large blind spot. This parses perfectly:

    TVE.home.init(window.__CFG.toolbar)      // __CFG is undefined

...and it kills the page in exactly the same way a SyntaxError does: the script
stops, the toolbar never renders, and the browser says nothing a reader would
see. `node --check` is green. All three gates are green. The homepage is dead.

A parse gate proves a file is well-FORMED. Only running it proves it WORKS.

So this loads the real pages off the real domain in a real browser, executes
them, and asserts the site actually came up. It is the last line, and it is the
only one positioned AFTER the deploy — everything else runs before the bytes
move.

WHAT IT ASSERTS, per page
-------------------------
  1. HTTP 200.
  2. ZERO uncaught JS errors during load — the direct symptom of both the
     SyntaxError class and the runtime class.
  3. `window.TVE` is defined — toolbar.js did not merely download, it RAN.
  4. The toolbar actually rendered nodes into the DOM — it ran to completion
     rather than throwing halfway through.

WHY IT IS NOT FLAKY, WHICH IS THE WHOLE GAME
--------------------------------------------
An alarm that cries wolf gets ignored, and an ignored alarm is worse than none:
it converts a real outage into "oh, that thing is always red."

  • It asserts ONLY on what a reader actually receives. No fixture, no build
    artifact, no assumption about what should have shipped.
  • CDN propagation is a WAIT, never a failure. After a deploy the edge can
    serve the previous copy for a while; that is normal and is not an outage.
    With --expect-sha it waits for the new bytes, and if they never arrive it
    still runs every assertion against what IS live — because a reader holding
    a broken old copy is a real outage, and a reader holding a working old copy
    is not.
  • Network faults retry. A refused connection is retried before it is believed.
  • Every failure names the page, the assertion and the actual value, so the
    person reading the alarm at 2am does not have to reproduce it first.

WHERE THIS LIVES, AND WHY IT IS NOT IN Brain/scripts/
----------------------------------------------------
`.github/scripts/`, which is otherwise gitignored — this one file is re-included
by name. CI runs it, and the Actions checkout only ever sees the PUBLIC repo:
`Brain/` is tracked in the private Travel-Brain repo and does not exist there.
Move this into `Brain/scripts/` to tidy it and the workflow step stops finding
it — the alarm goes quiet without anything going red.

USAGE
-----
    python3 .github/scripts/live_smoke.py                      # live site
    python3 .github/scripts/live_smoke.py --expect-sha <sha>   # wait for a deploy
    python3 .github/scripts/live_smoke.py --base http://localhost:8000

Exit 0 = the site is up. Exit 1 = it is not, and the output says how.
"""

from __future__ import annotations

import argparse
import re
import sys
import time
import urllib.error
import urllib.request

BASE = "https://guidemydays.com"

# Homepage first — it is the page the owner looks at, and the one whose failure
# on 2026-08-23 started all of this. Then one guide (the bulk of the site) and
# one essentials page, so a break confined to a single page TYPE still shows up.
PAGES = [
    ("/", "homepage"),
    ("/guides/", "guides index"),
    ("/essentials/lounges/", "an essentials page"),
]

# Errors that are the PAGE's fault vs noise from the network or an extension.
# Kept deliberately short: anything not listed here counts, because the failure
# mode this exists to catch is precisely an error nobody predicted.
IGNORABLE = re.compile(
    r"favicon|ERR_INTERNET_DISCONNECTED|net::ERR_NETWORK_CHANGED|"
    r"chrome-extension://|ResizeObserver loop",
    re.I,
)


def _fetch(url: str, tries: int = 3) -> tuple[int, str]:
    """(status, body). A transport fault is retried before it is believed."""
    last = None
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers={"Cache-Control": "no-cache"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.status, r.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            return e.code, ""
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(2 * (attempt + 1))
    print(f"    ! {url} unreachable after {tries} tries: {last}")
    return 0, ""


def wait_for_deploy(base: str, expect_sha: str, timeout: int) -> bool:
    """Wait for the edge to serve THIS commit's toolbar.js. Never fatal.

    Returns True if the new bytes arrived. False means we timed out and are
    about to smoke-test the PREVIOUS copy — which is still worth doing and is
    reported as such, never as a pass we did not earn.
    """
    import subprocess

    want = subprocess.run(
        ["git", "show", f"{expect_sha}:Travel-Website/assets/toolbar.js"],
        capture_output=True, text=True,
    )
    if want.returncode != 0:
        print(f"  · cannot read toolbar.js at {expect_sha}; skipping propagation wait")
        return False

    target = len(want.stdout)
    deadline = time.time() + timeout
    while time.time() < deadline:
        _, live = _fetch(f"{base}/assets/toolbar.js?cb={int(time.time())}", tries=1)
        if live and len(live) == target and live == want.stdout:
            print(f"  ✓ edge is serving {expect_sha[:9]}")
            return True
        time.sleep(10)
    print(
        f"  · edge has not picked up {expect_sha[:9]} within {timeout}s — testing "
        f"what IS live (a reader on a working previous copy is not an outage; a "
        f"reader on a broken one still is)"
    )
    return False


def smoke(base: str) -> list[str]:
    from playwright.sync_api import sync_playwright

    failures: list[str] = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for path, label in PAGES:
            url = f"{base}{path}?smoke={int(time.time())}"
            page = browser.new_page()
            errors: list[str] = []
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.on(
                "console",
                lambda m: errors.append(m.text) if m.type == "error" else None,
            )
            try:
                resp = page.goto(url, wait_until="load", timeout=45_000)
                status = resp.status if resp else 0
                if status != 200:
                    failures.append(f"{label} ({path}) — HTTP {status}, expected 200")
                    page.close()
                    continue

                page.wait_for_timeout(2500)  # let toolbar.js inject

                real = [e for e in errors if not IGNORABLE.search(e)]
                if real:
                    failures.append(
                        f"{label} ({path}) — {len(real)} uncaught JS error(s): "
                        + " | ".join(real[:3])
                    )

                state = page.evaluate(
                    """() => ({
                        tve: typeof window.TVE !== 'undefined',
                        links: document.querySelectorAll('a').length,
                        text: (document.body.innerText || '').trim().length
                    })"""
                )
                if not state["tve"]:
                    failures.append(
                        f"{label} ({path}) — window.TVE undefined: toolbar.js did "
                        f"not RUN (it may still have downloaded and parsed)"
                    )
                if state["links"] < 10:
                    failures.append(
                        f"{label} ({path}) — only {state['links']} links in the DOM; "
                        f"the toolbar did not render"
                    )
                if state["text"] < 200:
                    failures.append(
                        f"{label} ({path}) — page body is {state['text']} chars; "
                        f"effectively blank"
                    )
            except Exception as e:  # noqa: BLE001
                failures.append(f"{label} ({path}) — did not load: {e}")
            finally:
                page.close()
        browser.close()
    return failures


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default=BASE)
    ap.add_argument("--expect-sha", default="")
    ap.add_argument("--propagation-timeout", type=int, default=180)
    a = ap.parse_args()

    base = a.base.rstrip("/")
    print(f"live smoke — {base}")

    if a.expect_sha:
        wait_for_deploy(base, a.expect_sha, a.propagation_timeout)

    failures = smoke(base)

    print()
    if failures:
        print("🚨  THE LIVE SITE IS NOT HEALTHY\n")
        for f in failures:
            print(f"      • {f}")
        print(
            "\n  This ran a real browser against the real domain, so this is what a\n"
            "  READER is getting right now — not a prediction.\n\n"
            "  A page that loads but whose JS did not run is the shape to know: the\n"
            "  parse gates (87th non-negotiable) prove a file is well-FORMED, and a\n"
            "  runtime error is well-formed. Check the browser console on the page\n"
            "  above before assuming a deploy problem.\n"
        )
        return 1

    print(f"✓ all {len(PAGES)} pages load, boot their JS, and render. Site is up.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
