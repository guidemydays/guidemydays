/* TVE.flag — every country flag on the site is a numbered symbol in
   /assets/flags/sprite.svg (208 flat, gradient-free Twemoji flags, one
   <symbol id="flag-N"> per country — see Brain/Reference/Icons-Formats-Logos/
   Flags.html for the full number table). No page stores or renders a raw
   flag emoji character; every data source keeps the NUMBER only, exactly
   like every other icon on the site is referenced by its catalogue id. */
(function () {
  window.TVE = window.TVE || {};
  if (window.TVE.flag) return;

  var SPRITE = '/assets/flags/sprite.svg#flag-';

  function html(n, extraClass) {
    if (!n) return '';
    var cls = extraClass ? 'flag-svg ' + extraClass : 'flag-svg';
    return '<svg class="' + cls + '" viewBox="0 0 36 36" aria-hidden="true" data-flag="' + n + '">' +
           '<use href="' + SPRITE + n + '"></use></svg>';
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var XLINK_NS = 'http://www.w3.org/1999/xlink';
  function node(n, extraClass) {
    if (!n) return null;
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', extraClass ? 'flag-svg ' + extraClass : 'flag-svg');
    svg.setAttribute('viewBox', '0 0 36 36');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('data-flag', n);
    var use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', SPRITE + n);
    use.setAttributeNS(XLINK_NS, 'xlink:href', SPRITE + n); // older Safari/WebKit
    svg.appendChild(use);
    return svg;
  }

  window.TVE.flag = { html: html, node: node };
})();
