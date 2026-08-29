# Build state — Mumbai
Started: 2026-08-28
Last updated: 2026-08-28

## Phase 0 — Session start
- [x] Brain/Reference/Ship-Validate/Build-Time-Heads-Up.html — READ THIS FIRST. Why a
      build takes hours: the Phase 0–5 read list is 764k tokens against a 200k window,
      the gates verify your own ticks rather than your reads, and the 7 assumptions
      that produce the 60.4% ship-failure rate. Read it before the specs, not after.
- [x] Rules for Claude.html
- [x] Format + content sourced ONLY from CORE RULES and live research — NO sibling guide in guides/ opened as a template, shape reference, or content source (reading another guide imports its drift; one stale guide becomes many)

## READ IN FULL — this list, and only this list
> These are small enough to actually read, and a tick here means the read happened.
> Everything else is QUERIED at the moment you need it, never loaded whole:
>
>   icons / any icon at all   python3 Brain/scripts/icon_find.py <word>
>   any other spec, by §      python3 Brain/scripts/spec_find.py search <word>
>                             python3 Brain/scripts/spec_find.py get <doc> "<§n>"
>                             python3 Brain/scripts/spec_find.py docs      (aliases)
>
> NEVER open these whole — measured 2026-08-18, they are 79% of the old read pile
> and mostly artwork, not rules:
>   Site-Icons.html (1.37 MB, 77% raw SVG paths)   → icon_find.py, always
>   Icon Order and Format.html (195 KB, 136 KB of inline SVG) → spec_find get icons
>   Toolbar.html (239 KB, 66 sections; a build needs 2-3) → spec_find get toolbar 10
>   Rules for Claude.html is the exception: it IS read in full, Phase 0, hook-enforced.
>
> Why: the old list was 36 documents / 764k tokens against a 200k window, so the
> ticks were claims rather than reads and the bill arrived at the ship gate as a
> retry loop. Full write-up: Brain/Reference/Ship-Validate/Build-Time-Heads-Up.html

## Phase 1 — Technical prerequisites
- [x] Links.html
- [x] Photos Rules.html
- [x] Connectors.html
- [x] Platforms.md

## Phase 2 — Guide structure
- [x] Guide Structure.html
- [x] Stops Structure.html
- [x] hotel_rules.html          ← WHICH hotel to pick (thresholds, brand ladder, HOTEL_ALT_DATA §5)
- [x] Hotel Banner.html
- [x] Trip Overview.html
- [x] Toolbar.html
- [x] Navigation.html

## Phase 2 → 3 Gate — Scaffold
- [x] preflight exit 0: python3 guide_tools.py preflight Mumbai
- [x] stub generated: python3 guide_tools.py stub Mumbai --days 4 --country India
- [x] surface-check run: python3 guide_tools.py surface-check Mumbai  (gather missing surface data before research begins)

## Phase 3 — Day shape
- [x] Day Structure.html

## Phase 4 — Per-stop build
- [x] Motion Rule.html
- [x] Tickets.html
- [x] Icon Order and Format.html

## Phase 5 — Per-section build
- [x] Worth Knowing - Extra Section.html
- [x] Heads Up - Extra Section.html
- [x] Cappuccino - Extra Section.html
- [x] Restaurants Near Hotel - Extra Section.html
- [x] Downtown Restaurants - Extra Section.html
- [x] Local Tastes - Extra Section.html
- [x] Michelin Restaurants - Extra Section.html
- [x] Tours - Extra Section.html
- [x] Shows, Performances & Concerts - Extra Section.html
- [x] Getting Around - Extra Section.html
- [x] Food Delivery - Extra Section.html
- [x] Train Stations Near Hotel - Extra Section.html
- [x] Day Trips by Train - Extra Section.html
- [x] Weekly Closures - Extra Section.html
- [x] Read-About-Pages.html

## Writing progress — tick each section the moment it is saved to disk
> Rule: write one section → save to disk immediately → tick → move to next.
> Never hold multiple sections in context before writing. Every tick is a
> crash-safe checkpoint: if the session dies, the next session resumes from
> the last ticked section — no tokens or research lost.

- [x] Hotel banner + toolbar-mount div (InterContinental Marine Drive Mumbai, 135 Marine Drive · Churchgate, India)
- [x] HOTEL_ALT_DATA entry in toolbar.js — FOUR PRICE TIERS, hard-fail from day one.
      Every hotel carries tier: 'budget' | 'mid' | 'expensive' | 'luxury' and the guide holds
      at least ONE in each; TWO per tier is the standard on a new build (eight hotels), and two
      is a FLOOR never a cap — nothing is deleted to make a count come out even.
      Search the owner's brands FIRST (Marriott → Hilton → Hyatt; Residence Inn first in the US),
      then complete the missing price levels: at least two brand hotels per guide, and they land
      in Mid and Expensive. A brand passes on LOCATION alone — its rating never blocks it; the
      9.0+ bar governs non-brand picks only. A thin tier is a search that stopped early: walk
      Trivago → Booking → Expedia → TripAdvisor before calling a market shallow.
      Each entry needs a booking url. AFTER the h: array, price: { budget · mid · expensive · luxury }
      — one range per tier head ('€90–140': per night, double room, the destination's currency,
      read off Booking.com with the tiers) — REQUIRED, FINAL GATE (owner rule 2026-08-22; the
      zero-money rule is retired). hotel_rules.html §3 + §5b · CLAUDE.md Fifty-eighth non-negotiable
- [x] Trip Overview block (Read About script, extras pills, overview nav)
- [x] Day 1 — all stops fully written (motion, tickets/tours, photos, Wikipedia)
- [x] Day 2 — all stops fully written
- [x] Day 3 — all stops fully written
- [x] Day 4 — all stops fully written
- [x] Extra sections (one Edit per section: Tours, Restaurants, Getting Around, etc.)
- [x] Read About page ({slug}-read-about.html written and linked)
- [x] Stops Map page ({slug}-stops-map.html built or run build_guide_map.py)

## Phase 6 — Ship gate
- [ ] Brain/Reference/Ship-Validate/Ship Checklist.html
- [x] optimize_route.py run (no --dry-run) — REQUIRED on every build AND every
      rebuild; hard-fail gate. Then READ the plan it printed and hand-fix any day
      that reads wrong (timed stop on the wrong day, "near" stop across a river,
      demoted anchor sight), then `--restamp`. Regenerate the stripped .next banners.
- [ ] validate_itinerary.py passes
- [ ] THE SIX GATES THAT FAIL EVERY GUIDE UNTIL THEY ARE DONE (owner rule 2026-08-21:
      "if a guide do not have it will fail or at least needs to mark why does not have it").
      FIVE of the six take NO waiver at all; only Position 2c (6) has one, and it wants a reason.
      The six: hotel tiers · motion links · Getting Around ships · Food Delivery ships ·
      app entries (verdict + verification clause + review) · Position 2c.
      1. Hotel price tiers  — all four tiers present in HOTEL_ALT_DATA, each with its price
                              range (price: { budget … luxury } after h:). No waiver.
      2. Motion-row links   — every leg ends in a Maps DIRECTIONS url (/maps/dir/?api=1&
                              origin=…&destination=…), and the minutes match that route.
                              A place search (/maps/search/) is NOT a pass. No waiver.
      3. Getting Around     — the section ships in EVERY guide, never in data-no-entries.
      4. Food Delivery      — same, and in BOTH: every app entry carries the foreign-number
                              verdict WITH its em-dash verification clause (does the code
                              actually arrive?) and a REVIEW of that app, under that app.
                              No waiver — a review is writing, and writing has no negative
                              finding.
      5. Position 2c notes  — the five accessibility notes stay CONDITIONAL per stop, but the
                              guide carries at least one somewhere or says why it carries
                              none: an accessibility-checked comment naming what was walked,
                              20+ characters. "no" is not an answer.
- [ ] every extra populated or carries negative-finding line (Getting Around and Food Delivery
      are the exception both ways: never omitted, and an empty one says so on an .extras-empty
      line — the negative-finding carve-out)
- [ ] Read About page built, linked both ways

## Timing
> Auto-stamped. stub → ship PASS is the real build duration;
> ship_log.md holds the end. Added 2026-08-18.
- 2026-08-28 10:38 — stub created — research and writing begin here
- 2026-08-28 10:38 — preflight passed — upfront reads done
