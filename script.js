/* ============================
   FORJA DA MENTE — JavaScript
   ============================ */

// ---- COUNTDOWN TIMER ----
(function () {
  var endTime = new Date();
  endTime.setMinutes(endTime.getMinutes() + 17);
  endTime.setSeconds(endTime.getSeconds() + 43);

  var stored = sessionStorage.getItem('fmTimerEnd');
  if (stored) {
    endTime = new Date(parseInt(stored, 10));
  } else {
    sessionStorage.setItem('fmTimerEnd', endTime.getTime().toString());
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var now = new Date();
    var diff = Math.max(0, endTime - now);
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    var el = document.getElementById('countdown');
    if (el) el.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    if (diff > 0) setTimeout(tick, 1000);
  }
  tick();
})();

// ---- FAQ ACCORDION ----
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = this.closest('.faq-item');
    var answer = item.querySelector('.faq-answer');
    var arrow = this.querySelector('.faq-arrow');
    var isOpen = answer.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-answer').forEach(function (a) { a.classList.remove('open'); });
    document.querySelectorAll('.faq-arrow').forEach(function (a) { a.classList.remove('rotated'); });

    if (!isOpen) {
      answer.classList.add('open');
      arrow.classList.add('rotated');
    }
  });
});

// ---- FLOATING CTA ----
(function () {
  var floatingCta = document.getElementById('floatingCta');
  var heroSection = document.querySelector('.hero');

  function onScroll() {
    if (!floatingCta || !heroSection) return;
    var heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---- SMOOTH ENTRANCE ANIMATIONS ----
(function () {
  if (!window.IntersectionObserver) return;

  var targets = document.querySelectorAll(
    '.pain-card, .feature-item, .testimonial-card, .bonus-card, .learn-list li, .offer-box'
  );

  targets.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease ' + (i % 4 * 0.1) + 's, transform 0.5s ease ' + (i % 4 * 0.1) + 's';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { observer.observe(el); });
})();
