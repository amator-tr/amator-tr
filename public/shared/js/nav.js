/**
 * shared/js/nav.js — Merkezi navbar
 * 1. nav.css'i otomatik yukler (tek kaynak CSS)
 * 2. <nav id="site-nav"></nav> bulursa icini doldurur
 * 3. Dropdown click handler baglar
 */
(function() {
  var TOOLS = [
    { href: '/araclar/anten-hesaplayici/', label: 'Anten Hesaplayıcı' },
    { href: '/araclar/ctcss-ton-bulucu/', label: 'CTCSS / DCS Bulucu' },
    { href: '/araclar/maidenhead-grid/', label: 'Maidenhead Grid' },
    { href: '/araclar/maidenhead-harita/', label: 'Grid Harita (TA1VAL)' },
    { href: '/araclar/propagasyon-durumu/', label: 'HF Propagasyon' },
    { href: '/araclar/rf-los/', label: 'RF Görüş Hattı' },
    { href: '/araclar/lisans-sinavi/', label: 'Lisans Sınavı' },
  ];

  var LINKS_BEFORE = [
    { href: '/tutorials/', label: "Tutorial'lar" },
    { href: '/role-export/', label: 'Röle' },
  ];

  var LINKS_AFTER = [
    { href: '/sozluk', label: 'Sözlük' },
    { href: '/hakkinda', label: 'Hakkında' },
  ];

  function active(href) {
    var p = location.pathname;
    return href === '/' ? p === '/' : p.startsWith(href);
  }

  function mk(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function mkLink(href, label, isActive) {
    var a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (isActive) a.className = 'active';
    return a;
  }

  function bindDropdown(li, toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!li.contains(e.target)) li.classList.remove('open');
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') li.classList.remove('open');
    });
  }

  function build() {
    var nav = document.getElementById('site-nav');
    if (!nav) return;

    nav.className = 'site-nav';
    nav.setAttribute('aria-label', 'Ana navigasyon');

    var inner = mk('div', 'site-nav-inner');

    var brand = document.createElement('a');
    brand.href = '/';
    brand.className = 'site-nav-brand';
    brand.textContent = 'amator.tr';
    inner.appendChild(brand);

    var ul = mk('ul', 'site-nav-links');

    LINKS_BEFORE.forEach(function(l) {
      var li = mk('li');
      li.appendChild(mkLink(l.href, l.label, active(l.href)));
      ul.appendChild(li);
    });

    // Dropdown
    var toolActive = TOOLS.some(function(t) { return active(t.href); });
    var dropLi = mk('li', 'nav-dropdown');
    var toggle = mk('a', 'nav-dropdown-toggle' + (toolActive ? ' active' : ''));
    toggle.textContent = 'Araçlar';
    dropLi.appendChild(toggle);
    var menu = mk('div', 'nav-dropdown-menu');
    TOOLS.forEach(function(t) { menu.appendChild(mkLink(t.href, t.label, active(t.href))); });
    dropLi.appendChild(menu);
    ul.appendChild(dropLi);
    bindDropdown(dropLi, toggle);

    LINKS_AFTER.forEach(function(l) {
      var li = mk('li');
      li.appendChild(mkLink(l.href, l.label, active(l.href)));
      ul.appendChild(li);
    });

    inner.appendChild(ul);

    var cta = document.createElement('a');
    cta.href = 'https://cagri.amator.tr/';
    cta.className = 'site-nav-cta';
    cta.rel = 'noopener noreferrer';
    cta.textContent = 'Çağrı Defteri ↗';
    inner.appendChild(cta);

    while (nav.firstChild) nav.removeChild(nav.firstChild);
    nav.appendChild(inner);
  }

  // script tagi her zaman nav elementinden SONRA oldugu icin element zaten DOM'da
  var navEl = document.getElementById('site-nav');
  if (navEl) build();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
