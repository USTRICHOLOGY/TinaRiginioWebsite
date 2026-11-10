// Hair growth cycle: tap a phase to show its details
(function () {
  var buttons = document.querySelectorAll('.phase-btn');
  var nameEl = document.getElementById('phase-name');
  var lengthEl = document.getElementById('phase-length');
  var bodyEl = document.getElementById('phase-body');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      nameEl.textContent = btn.dataset.name;
      lengthEl.textContent = btn.dataset.length;
      bodyEl.textContent = btn.dataset.body;
    });
  });
})();

// Before and after: the "after" photo wipes in behind the pointer
(function () {
  document.querySelectorAll('.ba-card').forEach(function (card) {
    var after = card.querySelector('.ba-after');
    var line = card.querySelector('.ba-line');

    function set(pct) {
      after.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      line.style.left = pct + '%';
      line.style.opacity = pct > 0 && pct < 100 ? 1 : 0;
    }
    function move(clientX) {
      var box = card.getBoundingClientRect();
      var pct = Math.max(0, Math.min(100, ((clientX - box.left) / box.width) * 100));
      card.classList.add('is-live');
      set(pct);
    }
    function reset() {
      card.classList.remove('is-live');
      set(0);
    }

    card.addEventListener('mousemove', function (e) { move(e.clientX); });
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchmove', function (e) { move(e.touches[0].clientX); }, { passive: true });
    card.addEventListener('touchstart', function (e) { move(e.touches[0].clientX); }, { passive: true });
    card.addEventListener('touchend', function () { setTimeout(reset, 1200); });
  });
})();
