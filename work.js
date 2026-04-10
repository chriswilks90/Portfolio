(function () {

  /* ── Filter Bar ── */
  var filterBtns = document.querySelectorAll('.wk-filter__btn');
  var cards      = document.querySelectorAll('.wk-card');
  var emptyState = document.getElementById('wkEmpty');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {

      /* Update active button */
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var filter = btn.getAttribute('data-filter');
      var visibleCount = 0;

      cards.forEach(function (card) {
        var categories = card.getAttribute('data-category') || '';
        var matches = filter === 'all' || categories.includes(filter);

        if (matches) {
          card.classList.remove('is-hidden');
          visibleCount++;
          /* Re-trigger entrance animation */
          card.classList.remove('is-visible');
          setTimeout(function () { card.classList.add('is-visible'); }, 30);
        } else {
          card.classList.add('is-hidden');
        }
      });

      /* Show empty state if no results */
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  });

  /* ── Scroll entrance animation ── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        /* Stagger each card by 80ms */
        setTimeout(function () {
          entry.target.classList.add('is-visible');
        }, i * 80);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(function (card) { io.observe(card); });

})();
