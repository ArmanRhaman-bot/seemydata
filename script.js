/* =============================================
   ARMAN RHAMAN — BIO PAGE SCRIPTS
   ============================================= */

// ── CUSTOM CURSOR ───────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── SCROLL REVEAL ───────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

// ── HERO NAME GLITCH ON LOAD ────────────────
window.addEventListener('load', () => {
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  heroName.style.opacity = '0';
  heroName.style.transform = 'translateY(40px)';
  heroName.style.transition = 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)';

  setTimeout(() => {
    heroName.style.opacity = '1';
    heroName.style.transform = 'translateY(0)';
  }, 200);

  // Glitch flicker after entrance
  setTimeout(() => {
    heroName.classList.add('glitch-once');
    setTimeout(() => heroName.classList.remove('glitch-once'), 600);
  }, 1200);
});

// ── MINING CARD TILT ────────────────────────
document.querySelectorAll('.mine-card:not(.ineligible)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── BOT PILL RIPPLE ─────────────────────────
document.querySelectorAll('.bot-pill').forEach(pill => {
  pill.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = pill.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      background: rgba(232, 255, 0, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-anim 0.5s linear;
      pointer-events: none;
    `;
    pill.style.position = 'relative';
    pill.style.overflow = 'hidden';
    pill.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Ripple keyframe injected dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(2.5); opacity: 0; }
  }
  @keyframes glitch {
    0%   { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
    10%  { clip-path: inset(30% 0 50% 0); transform: translate(4px, 0); }
    20%  { clip-path: inset(60% 0 20% 0); transform: translate(-4px, 0); }
    30%  { clip-path: inset(80% 0 5% 0);  transform: translate(4px, 0); }
    40%  { clip-path: inset(0 0 0 0);     transform: translate(0, 0); }
    100% { clip-path: inset(0 0 0 0);     transform: translate(0, 0); }
  }
`;
document.head.appendChild(style);
