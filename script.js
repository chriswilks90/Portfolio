(function () {

  /* ── Custom Cursor ── */
  var cursor    = document.getElementById('cursor');
  var cursorDot = document.getElementById('cursorDot');

  document.addEventListener('mousemove', function (e) {
    cursor.style.left    = e.clientX + 'px';
    cursor.style.top     = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top  = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', function () {
    cursor.style.opacity    = '0';
    cursorDot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function () {
    cursor.style.opacity    = '1';
    cursorDot.style.opacity = '1';
  });

  /* ── Nav shrink on scroll ── */
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function () {
    var isMobile = window.innerWidth <= 768;
    if (window.scrollY > 40) {
      nav.style.padding = isMobile ? '14px 24px' : '16px 64px';
    } else {
      nav.style.padding = isMobile ? '18px 24px' : '24px 64px';
    }
  });

  /* ── Hamburger menu ── */
  var hamburger = document.getElementById('navHamburger');
  var navLinks  = document.getElementById('navLinks');
  var overlay   = document.getElementById('navOverlay');

  function toggleMenu(open) {
    hamburger.classList.toggle('is-open', open);
    navLinks.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      toggleMenu(!navLinks.classList.contains('is-open'));
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () { toggleMenu(false); });
  }

  /* Close menu when a nav link is clicked */
  document.querySelectorAll('.nav__links a').forEach(function (link) {
    link.addEventListener('click', function () { toggleMenu(false); });
  });

  /* ── Scroll-triggered fade-up for sections ── */
  var targets = document.querySelectorAll(
    '.work__card, .about__inner, .footer__inner, .work__header'
  );

  targets.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { io.observe(el); });

})();
