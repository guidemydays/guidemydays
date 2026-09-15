# Build state — Essaouira
Started: 2026-09-12
Last updated: 2026-09-12

## Phase 0 — Session start
- [x] Rules for Claude.html

## Phase 1 — Technical prerequisites
- [x] Links.html
- [x] Photos Rules.html
- [x] Connectors.html
- [x] Platforms.md

## Phase 2 — Guide structure
- [x] Guide Structure.html
- [x] Stops Structure.html
- [x] hotel_rules.html
- [x] Hotel Banner.html
- [x] Trip Overview.html
- [x] Toolbar.html
- [x] Navigation.html

## Phase 2 → 3 Gate — Scaffold
- [x] preflight exit 0: python3 guide_tools.py preflight Essaouira
- [x] stub generated: python3 guide_tools.py stub Essaouira --days 2 --country Morocco
- [x] surface-check run: python3 guide_tools.py surface-check Essaouira

## Phase 3 — Day shape
- [x] Day Structure.html

## Phase 4 — Per-stop build
- [x] Tickets.html
- [x] Motion Rule.html
- [x] Icon Order and Format.html

## Phase 5 — Per-section build
- [x] Motion Rule.html (read once at Phase 5 start)
- [x] Icon Order and Format.html (read once at Phase 5 start)
- [x] Tours - Extra Section.html
- [x] Cappuccino - Extra Section.html
- [x] Restaurants Near Hotel - Extra Section.html
- [x] Downtown Restaurants - Extra Section.html
- [x] Dining Areas - Extra Section.html
- [x] Local Tastes - Extra Section.html
- [x] Food Delivery - Extra Section.html
- [x] Getting Around - Extra Section.html
- [x] Heads Up - Extra Section.html
- [x] Worth Knowing - Extra Section.html
- [x] Also in Country - Extra Section.html
- [x] Nearby Guides - Extra Section.html
- [x] Brain/Reference/Page-Specs/Read-About-Pages.html (read once at Phase 5 end)

## Phase 6 — Ship gate
- [x] Brain/Reference/Ship-Validate/Ship Checklist.html
- [x] validate_itinerary.py passes (966/966 passed, 0 failed — PUBLISHED 2026-09-12 14:51, per ship_log.md)
- [x] every extra section is either populated or omitted entirely; absent sections (Weekly Closures, Shows, Train Stations, Day Trips, Michelin Stars, Hiking, Best Of) declared on `data-no-entries`; Worth Knowing shipped
