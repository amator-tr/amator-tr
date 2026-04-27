/**
 * shared/js/nav.js
 * Merkezi navbar bileseni. <nav id="site-nav"></nav> etiketini bulup icini doldurur.
 * Aktif sayfa tespiti otomatiktir. Tum degerler statik ve hardcoded — kullanici girdisi yok.
 */

const TOOLS = [
  { href: '/araclar/anten-hesaplayici/', label: 'Anten Hesaplayıcı' },
  { href: '/araclar/ctcss-ton-bulucu/', label: 'CTCSS / DCS Bulucu' },
  { href: '/araclar/maidenhead-grid/', label: 'Maidenhead Grid' },
  { href: '/araclar/propagasyon-durumu/', label: 'HF Propagasyon' },
  { href: '/araclar/rf-los/', label: 'RF Görüş Hattı' },
  { href: '/araclar/lisans-sinavi/', label: 'Lisans Sınavı' },
];

const NAV_LINKS = [
  { href: '/tutorials/', label: "Tutorial'lar" },
  { href: '/role-export/', label: 'Röle' },
];

const AFTER_TOOLS = [
  { href: '/sozluk/', label: 'Sözlük' },
  { href: '/hakkinda', label: 'Hakkında' },
];

function isActive(href) {
  var p = location.pathname;
  if (href === '/') return p === '/';
  return p.startsWith(href);
}

function isToolPage() {
  return TOOLS.some(function(t) { return isActive(t.href); });
}

function el(tag, attrs, children) {
  var e = document.createElement(tag);
  if (attrs) {
    for (var k in attrs) {
      if (k === 'className') e.className = attrs[k];
      else if (k === 'textContent') e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
  }
  if (children) {
    children.forEach(function(c) {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
  }
  return e;
}

function makeLink(href, label, active) {
  var a = el('a', { href: href });
  a.textContent = label;
  if (active) a.className = 'active';
  return a;
}

function buildNav() {
  var nav = document.getElementById('site-nav');
  if (!nav) return;

  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Ana navigasyon');

  var inner = el('div', { className: 'site-nav-inner' });

  // Brand
  var brand = el('a', { href: '/', className: 'site-nav-brand', 'aria-label': 'amator.tr ana sayfa' });
  brand.textContent = 'amator.tr';
  inner.appendChild(brand);

  // Links list
  var ul = el('ul', { className: 'site-nav-links' });

  // Main links
  NAV_LINKS.forEach(function(l) {
    var li = el('li');
    li.appendChild(makeLink(l.href, l.label, isActive(l.href)));
    ul.appendChild(li);
  });

  // Tools dropdown
  var dropLi = el('li', { className: 'nav-dropdown' });
  var toggle = el('a', { className: 'nav-dropdown-toggle' + (isToolPage() ? ' active' : '') });
  toggle.textContent = 'Araçlar';
  dropLi.appendChild(toggle);

  var menu = el('div', { className: 'nav-dropdown-menu' });
  TOOLS.forEach(function(t) {
    menu.appendChild(makeLink(t.href, t.label, isActive(t.href)));
  });
  dropLi.appendChild(menu);
  ul.appendChild(dropLi);

  // After-tools links
  AFTER_TOOLS.forEach(function(l) {
    var li = el('li');
    li.appendChild(makeLink(l.href, l.label, isActive(l.href)));
    ul.appendChild(li);
  });

  inner.appendChild(ul);

  // CTA button
  var cta = el('a', {
    href: 'https://cagri.amator.tr/',
    className: 'site-nav-cta',
    rel: 'noopener noreferrer',
    'aria-label': 'Çağrı İşareti Defteri'
  });
  cta.textContent = 'Çağrı Defteri ↗';
  inner.appendChild(cta);

  // Clear and append
  while (nav.firstChild) nav.removeChild(nav.firstChild);
  nav.appendChild(inner);
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
}
