/**
 * shared/js/nav.js — Merkezi navbar bileseni
 * Sayfalarda <nav id="site-nav"></nav> varsa icini doldurur.
 * Yoksa mevcut .nav-dropdown-toggle'a click handler baglar.
 * Tum degerler statik — kullanici girdisi yok.
 */

var TOOLS = [
  { href: '/araclar/anten-hesaplayici/', label: 'Anten Hesaplayıcı' },
  { href: '/araclar/ctcss-ton-bulucu/', label: 'CTCSS / DCS Bulucu' },
  { href: '/araclar/maidenhead-grid/', label: 'Maidenhead Grid' },
  { href: '/araclar/maidenhead-harita/', label: 'Grid Harita (TA1VAL)' },
  { href: '/araclar/propagasyon-durumu/', label: 'HF Propagasyon' },
  { href: '/araclar/rf-los/', label: 'RF Görüş Hattı' },
  { href: '/araclar/lisans-sinavi/', label: 'Lisans Sınavı' },
];

function _navActive(href) {
  var p = location.pathname;
  return href === '/' ? p === '/' : p.startsWith(href);
}

function _navEl(tag, attrs, children) {
  var e = document.createElement(tag);
  if (attrs) for (var k in attrs) {
    if (k === 'className') e.className = attrs[k];
    else e.setAttribute(k, attrs[k]);
  }
  if (children) children.forEach(function(c) {
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else if (c) e.appendChild(c);
  });
  return e;
}

function _navLink(href, label, active) {
  var a = _navEl('a', { href: href });
  a.textContent = label;
  if (active) a.className = 'active';
  return a;
}

function _navDropdownBind(dropLi, toggle) {
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropLi.classList.toggle('open');
  });
  document.addEventListener('click', function(e) {
    if (!dropLi.contains(e.target)) dropLi.classList.remove('open');
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') dropLi.classList.remove('open');
  });
}

function _navBuild() {
  var nav = document.getElementById('site-nav');
  if (!nav) {
    var existToggle = document.querySelector('.nav-dropdown-toggle');
    if (existToggle) {
      var existDrop = existToggle.closest('.nav-dropdown');
      if (existDrop) _navDropdownBind(existDrop, existToggle);
    }
    return;
  }

  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Ana navigasyon');

  var inner = _navEl('div', { className: 'site-nav-inner' });
  var brand = _navEl('a', { href: '/', className: 'site-nav-brand', 'aria-label': 'amator.tr ana sayfa' });
  brand.textContent = 'amator.tr';
  inner.appendChild(brand);

  var ul = _navEl('ul', { className: 'site-nav-links' });

  [
    { href: '/tutorials/', label: "Tutorial'lar" },
    { href: '/role-export/', label: 'Röle' },
  ].forEach(function(l) {
    var li = _navEl('li');
    li.appendChild(_navLink(l.href, l.label, _navActive(l.href)));
    ul.appendChild(li);
  });

  var toolActive = TOOLS.some(function(t) { return _navActive(t.href); });
  var dropLi = _navEl('li', { className: 'nav-dropdown' });
  var toggle = _navEl('a', { className: 'nav-dropdown-toggle' + (toolActive ? ' active' : '') });
  toggle.textContent = 'Araçlar';
  dropLi.appendChild(toggle);
  var menu = _navEl('div', { className: 'nav-dropdown-menu' });
  TOOLS.forEach(function(t) { menu.appendChild(_navLink(t.href, t.label, _navActive(t.href))); });
  dropLi.appendChild(menu);
  ul.appendChild(dropLi);
  _navDropdownBind(dropLi, toggle);

  [
    { href: '/sozluk/', label: 'Sözlük' },
    { href: '/hakkinda', label: 'Hakkında' },
  ].forEach(function(l) {
    var li = _navEl('li');
    li.appendChild(_navLink(l.href, l.label, _navActive(l.href)));
    ul.appendChild(li);
  });

  inner.appendChild(ul);
  var cta = _navEl('a', { href: 'https://cagri.amator.tr/', className: 'site-nav-cta', rel: 'noopener noreferrer' });
  cta.textContent = 'Çağrı Defteri ↗';
  inner.appendChild(cta);

  while (nav.firstChild) nav.removeChild(nav.firstChild);
  nav.appendChild(inner);
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _navBuild);
  else _navBuild();
}
