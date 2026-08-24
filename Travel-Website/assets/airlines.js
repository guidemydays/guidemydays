/* airlines.js — the render behind the seven continent airline pages.
   Each page ships its own AIRLINES array and this draws it: alliance chips, the
   search, country groups, and one card per carrier carrying its own site, its
   reviews and its safety rating. Split out of essentials/airlines/index.html
   when that page became one page per continent (owner 2026-08-17), so the seven
   pages share one copy of the behaviour instead of seven.

   2026-08-23 — boarding-pass redesign (owner-approved mockup). Card markup
   changed to al-pass/al-seam/al-stub; alliance filters moved onto the shared
   .pill-badge fam-* system instead of a bespoke box. `a.iata` (the airline's
   own IATA designator, e.g. "EK" for Emirates) is a NEW, OPTIONAL field —
   rolled out on Middle East first; a page whose data doesn't carry it yet
   renders "—" on the stub rather than a guessed code (Links.html § 1 rule:
   never ship a guess where the real fact is missing). Hub code(s) and the
   short fleet number are DERIVED from the existing `hub`/`fl` strings, so
   every page keeps working unchanged even before its data adds `iata`. */
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* Independent + Full-service share the grey family on purpose — both are the
   "unmarked default" of their own axis (see the family-assignment note this
   file used to carry, now in airlines.css). But two identical-coloured pills
   side by side reads as a bug, not as agreement, so same-family pills merge
   into one instead of repeating the colour. */
function tagsHTML(a) {
  var al = ALLIANCES[a.al] || ALLIANCES['Independent'];
  var picks = [{ cls: al.cls, label: al.label }];
  (a.t || []).forEach(function(k) {
    var ty = TYPES[k];
    if (ty) picks.push({ cls: ty.cls, label: ty.label });
  });
  var byClass = [];
  picks.forEach(function(p) {
    var existing = byClass.filter(function(g) { return g.cls === p.cls; })[0];
    if (existing) existing.labels.push(p.label);
    else byClass.push({ cls: p.cls, labels: [p.label] });
  });
  return byClass.map(function(g) {
    return '<span class="card-tag badge ' + g.cls + '">' + g.labels.join(' · ') + '</span>';
  }).join('');
}

/* The stub is ONE colour block — it can't show every pill, so it shows
   whichever one actually tells you something. Alliance membership is the
   headline fact for the three that have one; "Independent" is the unmarked
   grey default, so for those carriers the stub falls through to their most
   distinguishing type tag (Low-cost, Long-haul, Regional, Leisure) instead
   of defaulting to the same grey the badge row already shows. */
function stubClassFor(a) {
  var al = ALLIANCES[a.al] || ALLIANCES['Independent'];
  if (a.al !== 'Independent') return al.cls;
  var distinguishing = (a.t || []).filter(function(k) { return k !== 'full'; })[0];
  return (distinguishing && TYPES[distinguishing]) ? TYPES[distinguishing].cls : al.cls;
}

/* Airport/hub codes already live in the existing `hub` string as "City
   (CODE)" — pull every parenthesised code out rather than adding a field
   that would duplicate it. */
function hubCodes(a) {
  var m = a.hub.match(/\(([A-Z0-9]{2,4})\)/g);
  if (!m) return a.hub.split(',')[0].trim();
  return m.map(function(s) { return s.replace(/[()]/g, ''); }).join(' · ');
}

/* The fleet field is a full sentence ("≈260 Airbus and Boeing widebodies
   plus A320s"); the stub only has room for the number. Falls back to an
   em dash for the rare carrier with no figure yet (Riyadh Air: "Boeing 787
   fleet in build-up"). */
function fleetNumber(a) {
  /* Anchored to the START of the string on purpose — an unanchored match
     would grab the first digits ANYWHERE, including an aircraft model
     ("Boeing 787 fleet in build-up" has no fleet count yet, but a bare
     \d+ scan reads its own "787" as if it were one). */
  var m = a.fl.match(/^≈?\s*(\d[\d,]*)/);
  return m ? m[1] : '—';
}

/* Reviews and safety rating for THIS carrier, from its own airlineratings.com
   page. A carrier with no rv has no page there, so it gets neither link rather
   than a guessed URL that 404s. Both open in a new tab like every other
   external link on the page. */
function reviewLinks(a) {
  if (!a.rv) return '';
  var base = 'https://www.airlineratings.com/airlines/' + a.rv;
  return '<a href="' + base + '/reviews" target="_blank" rel="noopener" class="al-pass-link">Reviews</a>' +
         '<a href="' + base + '/safety" target="_blank" rel="noopener" class="al-pass-link">Safety rating</a>';
}

function cardHTML(a) {
  var host = a.w.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return '' +
  '<div class="al-pass">' +
    '<div class="al-pass-body">' +
      '<div class="al-pass-head">' +
        '<div class="al-pass-flag">' + a.f + '</div>' +
        '<div class="al-pass-id">' +
          '<h3 class="al-pass-name"><a href="' + a.w + '" target="_blank" rel="noopener">' + esc(a.n) + '</a></h3>' +
          '<div class="al-pass-sub">' + esc(a.hq) + ', ' + esc(a.c) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card-tags">' + tagsHTML(a) + '</div>' +
      '<p class="al-pass-desc">' + esc(a.d) + '</p>' +
      '<div class="al-pass-stats">' +
        '<div class="al-pass-stat"><b>Headquarters</b><span>' + esc(a.hq) + '</span></div>' +
        '<div class="al-pass-stat"><b>Hub</b><span>' + esc(hubCodes(a)) + '</span></div>' +
        '<div class="al-pass-stat"><b>Aircraft</b><span>' + esc(a.fl) + '</span></div>' +
      '</div>' +
      '<div class="al-pass-known"><b>Known for</b> — ' + esc(a.k) + '.</div>' +
      '<div class="al-pass-links">' +
        '<a class="al-pass-link" href="' + a.w + '" target="_blank" rel="noopener">' + esc(host) + '</a>' +
        reviewLinks(a) +
      '</div>' +
    '</div>' +
    '<div class="al-seam"><span class="al-notch top"></span><span class="al-notch bot"></span></div>' +
    '<div class="al-stub ' + stubClassFor(a) + '">' +
      '<div>' +
        '<div class="al-stub-label">Flight</div>' +
        '<div class="al-stub-iata">' + (a.iata ? esc(a.iata) : '—') + '</div>' +
      '</div>' +
      '<div class="al-stub-fleet"><span class="al-stub-label">Fleet</span><b>' + esc(fleetNumber(a)) + '</b></div>' +
      '<div class="al-stub-barcode"></div>' +
    '</div>' +
  '</div>';
}

var alAlliance = 'All';

function matches(a) {
  if (alAlliance !== 'All' && a.al !== alAlliance) return false;
  var q = (document.getElementById('al-search').value || '').trim().toLowerCase();
  if (!q) return true;
  return [a.n, a.c, a.hq, a.hub, a.al, a.d, a.k].join(' ').toLowerCase().indexOf(q) !== -1;
}

function render() {
  var res = document.getElementById('al-results');
  var list = AIRLINES.filter(matches);
  var q = (document.getElementById('al-search').value || '').trim();
  var noResults = list.length === 0;

  // No-results state: only the title, the search box and the message remain.
  // (This also used to hide #also-on-this-site; the strip was retired site-wide
  //  on 2026-08-17 and there is nothing left below the results to hide.)
  document.getElementById('al-alliance-filters').style.display = noResults ? 'none' : '';

  if (noResults) {
    res.innerHTML = '<div class="empty-state">No airline matches “' + esc(q) + '”.</div>';
    return;
  }

  /* One continent per page, so countries are the only grouping left. */
  var html = '';
  var countries = Array.from(new Set(list.map(function(a) { return a.c; })))
                       .sort(function(x, y) { return x.localeCompare(y); });
  countries.forEach(function(country) {
    var cards = list.filter(function(a) { return a.c === country; })
                    .sort(function(x, y) { return x.n.localeCompare(y.n); });
    html += '<div class="al-country"><div class="al-country-head">' +
      '<span class="al-country-flag">' + cards[0].f + '</span>' +
      '<span class="al-country-name">' + esc(country) + '</span>' +
      '<span class="al-country-rule"></span>' +
      '</div><div class="al-grid">' + cards.map(cardHTML).join('') + '</div></div>';
  });
  res.innerHTML = html;
}

/* Alliance filters are `.pill-badge fam-*` buttons — built ONCE (not
   recreated per click) so the width toolbar.js's _equalizePillRows() sets
   on first paint survives every later filter click; only `.is-on` toggles. */
function buildAllChips() {
  var mount = document.getElementById('al-alliance-filters');
  var opts = [{ key: 'All', label: 'All alliances', cls: 'fam-yellow', test: function() { return true; } }].concat(
    Object.keys(ALLIANCES).map(function(k) {
      return { key: k, label: ALLIANCES[k].label, cls: ALLIANCES[k].cls, test: function(a) { return a.al === k; } };
    }));
  mount.innerHTML = '';
  opts.forEach(function(o) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pill-badge ' + o.cls + (o.key === alAlliance ? ' is-on' : '');
    b.dataset.key = o.key;
    b.textContent = o.label;
    b.onclick = function() {
      alAlliance = o.key;
      document.getElementById('al-search').value = '';
      updateChipStates();
      render();
    };
    mount.appendChild(b);
  });
}

function updateChipStates() {
  [].slice.call(document.getElementById('al-alliance-filters').children).forEach(function(b) {
    b.classList.toggle('is-on', b.dataset.key === alAlliance);
  });
}

var alInput = document.getElementById('al-search');

function runQuery(q) {
  alInput.value = q;
  alAlliance = 'All';
  updateChipStates();
  render();
}

alInput.addEventListener('input', function() { runQuery(alInput.value); });

/* Shared typeahead — every search box on the site uses TVESearch (Toolbar.html
   § TVESearch). Items are the airlines themselves plus the countries they fly
   from, so a reader typing "Qatar" is offered both the airline and the country. */
if (window.TVESearch) {
  var seen = {};
  var items = AIRLINES.map(function(a) { return { name: a.n, sub: a.c }; });
  AIRLINES.forEach(function(a) {
    if (!seen[a.c]) { seen[a.c] = 1; items.push({ name: a.c, sub: a.r }); }
  });
  TVESearch.attach(alInput, { items: items, onPick: function(it) { runQuery(it.name); } });
}

buildAllChips();
render();
