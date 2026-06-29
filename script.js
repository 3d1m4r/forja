/* ================================================
   CAMINO ESTOICO — LANDING PAGE
   script.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  createEmbers();

  const btn = document.getElementById('ctaBtn');
  if (btn) {
    setInterval(() => {
      btn.style.transition = 'box-shadow .3s';
      btn.style.boxShadow = '0 0 40px rgba(201,168,76,.7), 0 0 0 1px rgba(201,168,76,.5)';
      setTimeout(() => {
        btn.style.boxShadow = '';
        setTimeout(() => { btn.style.transition = ''; }, 300);
      }, 400);
    }, 3500);
  }

});

function createEmbers() {
  const count = 18;

  const style = document.createElement('style');
  style.textContent = `
    .ember {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      animation: float linear infinite;
      opacity: 0;
    }
    @keyframes float {
      0%   { transform: translateY(100vh) translateX(0) scale(1);   opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: .6; }
      100% { transform: translateY(-10vh) translateX(var(--drift)) scale(.4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'ember';

    const size  = Math.random() * 4 + 2;
    const left  = Math.random() * 100;
    const dur   = Math.random() * 10 + 8;
    const delay = Math.random() * 12;
    const drift = (Math.random() - .5) * 120;
    const r     = Math.random();
    const color = r > .6
      ? `rgba(255,${80 + Math.floor(Math.random()*60)},0,.9)`
      : `rgba(201,168,76,.85)`;

    el.style.cssText = `
      width:${size}px;height:${size}px;
      left:${left}%;bottom:-10px;
      background:${color};
      box-shadow:0 0 ${size*2}px ${color};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      --drift:${drift}px;
    `;

    document.body.appendChild(el);
  }
}
