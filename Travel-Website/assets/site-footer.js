/* site-footer.js — copyright/legal line + a bare contact mailto, appended to
   the bottom of every page. Loaded dynamically by toolbar.js (see its tail),
   never hardcoded into page HTML — so adding or changing this never touches
   guide HTML and never risks a guide's validation stamp.

   Skips: the homepage (it keeps its own contact FORM at #contact — see
   index.html's <details class="contact-d" id="contact">) and every bare
   hero+search "finder" page short enough that a footer band would crowd it
   (owner call, 2026-09-05): weather, currencies, plugs, ask-your-guide,
   before-you-go, when-to-go, sunrise-sunset, essentials/day-trips. */
(function () {
  'use strict';

  var EXCLUDE_PATHS = [
    '/', '/index.html',
    '/weather/', '/weather/index.html',
    '/currencies/', '/currencies/index.html',
    '/plugs/', '/plugs/index.html',
    '/ask-your-guide/', '/ask-your-guide/index.html',
    '/before-you-go/', '/before-you-go/index.html',
    '/when-to-go/', '/when-to-go/index.html',
    '/sunrise-sunset/', '/sunrise-sunset/index.html',
    '/essentials/day-trips/', '/essentials/day-trips/index.html'
  ];

  function build() {
    if (EXCLUDE_PATHS.indexOf(window.location.pathname) !== -1) return;
    if (document.querySelector('.site-footer')) return;

    var style = document.createElement('style');
    style.textContent =
      '.site-footer{max-width:940px;margin:48px auto 24px;padding:20px 24px 0;' +
      'border-top:1px solid rgba(0,0,0,.08);text-align:center;' +
      'font-size:13px;line-height:1.7;color:#9a948a}' +
      '.site-footer p{margin:0 0 4px}' +
      '.site-footer a{color:#9a948a;text-decoration:underline}' +
      '.site-footer a:hover{color:#6d685f}' +
      '@media (prefers-color-scheme:dark){' +
      '.site-footer{border-top-color:rgba(255,255,255,.14)}}';
    document.head.appendChild(style);

    /* A plain <div>, not a <footer> element: a leftover rule from the retired
       footnote.js feature — `footer, .tb-footnote { display:none !important }`
       — still lives in assets/trains.css and assets/airlines.css and on a
       handful of pages (trips, lounges, airline-networks, cruises,
       self-drive-routes, scenic-trains). A bare <footer> tag would be
       silently hidden there; .site-footer isn't targeted by that selector. */
    var footer = document.createElement('div');
    footer.className = 'site-footer';
    var year = new Date().getFullYear();
    footer.innerHTML =
      '<p>© ' + year + ' GuideMyDays. All rights reserved.</p>' +
      '<p>Contact: <a href="mailto:contact@guidemydays.com">contact@guidemydays.com</a></p>';
    document.body.appendChild(footer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
}());
