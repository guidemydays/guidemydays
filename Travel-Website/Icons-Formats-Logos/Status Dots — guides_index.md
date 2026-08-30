# Status Dots — guides_index

**GENERATED FILE — do not hand-edit the master list below.** The single source of
truth for every been / want-to-go marker is the `data-status` attribute on each
dest-card in `Guides-Index.html`. This checklist is regenerated *from* the index by
`Brain/scripts/build/build_status_dots.py` — which runs automatically at every session
start (`guide_tools.py start`, Step 0b) and on every ship (`update-index`), right
alongside `sync_tracker.py` (which regenerates `Travel-Tracker.html` the same way).

To change a status: flip `data-status` on the card in `Guides-Index.html` (or toggle
it in the Travel Tracker and paste the change back), then let the builders regenerate
this file — never edit the checklist directly, or the next resync silently reverts it.

## What the status values mean

- `[ ]` = **Want to go** — haven't been yet.
- `[x]` = **Been there.**

**Visual note (updated 2026-07-19):** the gold dot CSS (`.dest-card[data-status="want"]::after`) was removed from `guides-index-style.css` as part of the Visited-pill overhaul. The `data-status` attribute is kept on every card as a **reserved inert attribute** for the Step 4 world tracker integration — it no longer renders anything visible in the index. The `[ ]` / `[x]` checklist below still reflects actual been/want status.

Default is **"want to go."** Every new guide ships with `data-status="want"` until marked been.

## How it works in the HTML

Each city is an `<a class="dest-card" …>`. The default new-guide state is `data-status="want"`:

```html
<a class="dest-card" data-status="want" href="./Bend/bend.html" …>
```

Change to `data-status="been"` once visited, or remove the attribute entirely (same effect). The attribute is inert in the index UI — no visual dot is rendered. It is reserved for the Step 4 world tracker.

## Master list

`[x]` = **been**, `[ ]` = **want to go**. Regenerated from the
index by `build_status_dots.py` — do not hand-edit; flip `data-status` on the card
in `Guides-Index.html` instead.

*(Auto-generated, grouped by country A→Z to match the index's country split.)*

### Argentina
- [ ] buenos-aires

### Aruba
- [x] aruba

### Australia
- [ ] melbourne
- [ ] sydney

### Austria
- [ ] salzburg
- [x] vienna

### Barbados
- [ ] barbados

### Belgium
- [x] bruges
- [x] brussels

### Bhutan
- [ ] bhutan

### Brazil
- [ ] aracaju
- [ ] curitiba
- [ ] florianopolis
- [ ] fortaleza
- [ ] foz-do-iguacu
- [ ] joao-pessoa
- [ ] maceio
- [ ] natal
- [ ] olinda
- [ ] porto-alegre
- [ ] recife
- [x] rio-de-janeiro
- [ ] salvador
- [ ] sao-luis
- [ ] sao-paulo

### Canada
- [ ] banff
- [ ] montreal
- [ ] quebec-city
- [x] toronto
- [x] vancouver
- [x] victoria
- [x] whistler

### Cayman Islands
- [ ] cayman-islands

### Chile
- [ ] santiago

### China
- [x] beijing
- [x] chongqing
- [ ] hong-kong
- [x] shanghai
- [x] zhangjiajie

### Colombia
- [x] cartagena

### Costa Rica
- [ ] arenal
- [ ] manuel-antonio
- [ ] san-jose-costa-rica

### Croatia
- [ ] dubrovnik
- [ ] split

### Cuba
- [ ] havana

### Curaçao
- [x] curacao

### Czechia
- [ ] prague

### Denmark
- [x] copenhagen

### Dominican Republic
- [ ] punta-cana

### Ecuador
- [ ] galapagos-islands

### Egypt
- [ ] cairo

### Estonia
- [ ] tallinn

### Finland
- [ ] helsinki

### France
- [ ] aix-en-provence
- [ ] annecy
- [ ] bordeaux
- [x] cannes
- [ ] colmar
- [ ] lille
- [ ] lyon
- [ ] marseille
- [x] nice
- [x] paris
- [x] strasbourg

### French Polynesia
- [ ] bora-bora

### Georgia
- [ ] tbilisi

### Germany
- [ ] berlin
- [ ] cologne
- [ ] frankfurt
- [x] hamburg
- [x] marktoberdorf
- [x] munich
- [x] stuttgart

### Greece
- [x] athens
- [x] corfu
- [ ] crete
- [ ] mykonos
- [ ] rhodes
- [ ] santorini
- [ ] zakynthos

### Hungary
- [ ] budapest

### Iceland
- [ ] reykjavik

### India
- [ ] delhi
- [ ] mumbai

### Indonesia
- [ ] bali

### Ireland
- [ ] dublin

### Italy
- [x] amalfi
- [x] bologna
- [x] capri
- [x] cinque-terre
- [x] florence
- [ ] lake-como
- [ ] lecce
- [ ] milan
- [ ] naples
- [x] pisa
- [x] rome
- [ ] sardinia
- [ ] sicily
- [ ] siena
- [x] sorrento
- [x] turin
- [x] venice
- [ ] verona

### Japan
- [x] hiroshima
- [x] kyoto
- [ ] osaka
- [x] tokyo

### Jordan
- [ ] petra

### Laos
- [ ] luang-prabang

### Latvia
- [ ] riga

### Lithuania
- [ ] vilnius

### Luxembourg
- [x] luxembourg

### Malaysia
- [x] kuala-lumpur

### Maldives
- [ ] maldives

### Malta
- [ ] valletta

### Mexico
- [x] cancun
- [x] los-cabos
- [ ] oaxaca
- [x] puerto-vallarta

### Monaco
- [x] monaco

### Montenegro
- [ ] kotor

### Morocco
- [ ] marrakech

### Nepal
- [ ] pokhara

### Netherlands
- [x] amsterdam
- [ ] rotterdam

### New Zealand
- [ ] queenstown
- [ ] wellington

### Nigeria
- [ ] lagos-nigeria

### Norway
- [ ] alesund
- [ ] bergen
- [ ] oslo
- [ ] tromso

### Oman
- [ ] muscat

### Peru
- [ ] cusco
- [ ] lima
- [ ] machupicchu

### Philippines
- [ ] palawan

### Poland
- [ ] krakow

### Portugal
- [ ] azores
- [x] cascais
- [x] lagos
- [ ] lisbon
- [ ] madeira
- [x] porto
- [x] sintra

### Puerto Rico
- [ ] puerto-rico

### Qatar
- [ ] doha

### Seychelles
- [ ] seychelles

### Singapore
- [ ] singapore

### Sint Maarten
- [x] sint-maarten

### Slovenia
- [ ] ljubljana

### South Africa
- [ ] cape-town

### South Korea
- [ ] busan
- [x] seoul

### Spain
- [ ] barcelona
- [ ] bilbao
- [ ] granada
- [x] madrid
- [ ] malaga
- [x] san-sebastian
- [ ] seville
- [ ] tenerife
- [x] toledo

### Sri Lanka
- [ ] colombo

### Sweden
- [x] gothenburg
- [ ] stockholm

### Switzerland
- [x] geneva
- [ ] lucerne
- [ ] zurich

### Taiwan
- [x] taipei

### Thailand
- [ ] bangkok
- [ ] chiang-mai
- [ ] phuket

### The Bahamas
- [x] bahamas

### Turkey
- [ ] istanbul

### Turks and Caicos
- [ ] turks-and-caicos

### United Arab Emirates
- [ ] abu-dhabi
- [ ] dubai

### United Kingdom
- [x] cambridge
- [x] edinburgh
- [ ] glasgow
- [x] london
- [x] oxford

### United States
- [ ] alaska
- [x] atlanta
- [x] austin
- [ ] bend
- [x] big-island
- [ ] boston
- [ ] boulder
- [ ] cape-cod
- [ ] carmel-by-the-sea
- [ ] charlotte
- [x] chicago
- [ ] coeur-dalene
- [ ] columbia
- [ ] dallas
- [ ] denver
- [ ] florida-keys
- [ ] glacier-national-park
- [ ] hilton-head-island
- [x] kauai
- [ ] keywest
- [x] la-jolla
- [ ] lake-tahoe
- [x] las-vegas
- [ ] los-angeles
- [ ] malibu
- [ ] marco-island
- [x] maui
- [x] miami
- [ ] napa
- [ ] naples-florida
- [x] nashville
- [ ] new-orleans
- [x] new-york
- [x] oahu
- [ ] orcas-island
- [x] orlando
- [ ] palm-desert
- [x] palo-alto
- [x] pasadena
- [ ] pensacola
- [ ] philadelphia
- [ ] phoenix
- [ ] portland
- [x] san-diego
- [x] san-francisco
- [ ] san-jose
- [x] san-juan-island
- [ ] santa-barbara
- [ ] santa-cruz
- [ ] santa-fe
- [ ] santa-monica
- [ ] sarasota
- [x] scottsdale
- [x] seattle
- [x] sedona
- [ ] washington-dc
- [ ] yellowstone

### Uruguay
- [ ] montevideo

### Vietnam
- [ ] hanoi
- [ ] hoi-an

### Virgin Islands
- [x] virgin-islands

## Pending builds (not on the index yet)

Unshipped — `_build/` scaffolding only, no guide HTML, no index card. Add to the master list when they ship as `[ ]` (gold dot, want to go) by default, unless owner confirms they've already been — in that case enter as `[x]`. (Brussels shipped 2026-06-06 and moved to the Europe list as been.)

Current stalled builds (as of 2026-06-15 audit — no HTML yet, Phase 6 unchecked or no scaffolding):
_(none — all known stalled builds have shipped HTML as of 2026-06-15)_

## Guide count line

The stat row shows two live totals: **`N guides`** (left) and **`N countries`** (right). Simplified 2026-07-19 — the old "N visited · N on the list" breakdown was removed when the All/Been/Want toggle was removed. The counts are computed by `updateStats()` in `Guides-Index.html`: left reads `elG` (all `.dest-card` count), right reads `elC` (all `.country[data-country]` sections). Nothing to update by hand.

## Keeping it in sync

When a new guide ships, `build_status_dots.py` regenerates this file automatically as part of `guide_tools.py update-index`. The master list below is always rebuilt from `data-status` attributes on the index cards — never hand-edited. To change a city's been/want status: flip `data-status` on its card in `Guides-Index.html`, then run `update-index` to rebuild this file.
