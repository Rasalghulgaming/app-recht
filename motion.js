// Hover and click motion. The page stays fully usable without this script.
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  if (reduce) return;

  // Cards and sections fade in as they scroll into view. Anything at or above
  // the viewport is revealed, so anchor jumps never land on hidden content.
  let pending = Array.from(document.querySelectorAll('.feature, .app-card, .section-heading, .contact-section, .legal-app'));
  pending.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', (i % 3) * 70 + 'ms');
  });
  function revealInView() {
    const limit = window.innerHeight * 0.95;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top > limit) return true;
      el.classList.add('is-visible');
      return false;
    });
    if (!pending.length) ['scroll', 'resize'].forEach((type) => window.removeEventListener(type, revealInView));
  }
  ['scroll', 'resize'].forEach((type) => window.addEventListener(type, revealInView, { passive: true }));
  window.addEventListener('hashchange', revealInView);
  window.addEventListener('load', revealInView);
  revealInView();

  // Ripple from the click point on buttons and cards.
  document.addEventListener('pointerdown', (event) => {
    const host = event.target.closest('.button, .app-card, .feature, .round-link span, summary');
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = event.clientY - rect.top - size / 2 + 'px';
    host.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });

  // Images pop briefly when clicked or tapped.
  document.addEventListener('click', (event) => {
    const img = event.target.closest('.app-icon, .feature-visual');
    if (!img) return;
    img.classList.remove('is-popped');
    void img.offsetWidth;
    img.classList.add('is-popped');
  });

  // Shapey preview tilts towards the pointer.
  const visual = document.querySelector('.feature-visual');
  const shapey = document.querySelector('.feature-shapey');
  if (visual && shapey && window.matchMedia('(hover: hover)').matches) {
    shapey.addEventListener('pointermove', (event) => {
      const rect = shapey.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      visual.style.setProperty('--tilt-x', (y * -10).toFixed(2) + 'deg');
      visual.style.setProperty('--tilt-y', (x * 12).toFixed(2) + 'deg');
    });
    shapey.addEventListener('pointerleave', () => {
      visual.style.removeProperty('--tilt-x');
      visual.style.removeProperty('--tilt-y');
    });
  }
})();
