/* Dilpreet Singh Portfolio — script.js
   Modular, clean, performant vanilla JS */

'use strict';

/* ── LOADER ──────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('gone');
  }, 1600);
});

/* ── THEME TOGGLE ────────────────────────── */
const html       = document.documentElement;
const themeBtn   = document.getElementById('themeBtn');
const THEME_KEY  = 'ds-portfolio-theme';

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem(THEME_KEY, theme);
}

// Restore saved theme
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── MOBILE NAV ──────────────────────────── */
const hbg    = document.getElementById('hbg');
const mobNav = document.getElementById('mobNav');

hbg.addEventListener('click', () => mobNav.classList.toggle('open'));

mobNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobNav.classList.remove('open'));
});

/* ── NAV SCROLL EFFECT ───────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── ACTIVE NAV LINK ─────────────────────── */
const sections   = document.querySelectorAll('section[id], div[id]');
const navLinks   = document.querySelectorAll('.nav-list a, .mob-nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--blue)';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ── TYPING ANIMATION ────────────────────── */
const phrases = [
  'CSE Student',
  'Software Developer',
  'Full-Stack Engineer',
  'NCC Cadet',
  'Hackathon Finalist',
  'Badminton Champion',
  'Problem Solver',
  'Tech Enthusiast',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
const typingEl   = document.getElementById('typingEl');

function type() {
  if (!typingEl) return;
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex--);
  } else {
    typingEl.textContent = current.slice(0, charIndex++);
  }

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    setTimeout(type, 1400);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(type, isDeleting ? 52 : 100);
}

type();

/* ── SCROLL REVEAL ───────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.r').forEach(el => revealObserver.observe(el));

/* ── SKILL BAR ANIMATION ─────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sk-fill').forEach(fill => {
        const pct = fill.getAttribute('data-pct') || '0';
        setTimeout(() => { fill.style.width = pct + '%'; }, 250);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.sk-cell').forEach(cell => skillObserver.observe(cell));

/* ── COUNTER ANIMATION ───────────────────── */
function animateCounter(el) {
  const target  = parseInt(el.getAttribute('data-target'), 10);
  const suffix  = el.getAttribute('data-suffix') || '+';
  const dur     = 1800;
  const step    = 16;
  const total   = Math.ceil(dur / step);
  let current   = 0;

  const timer = setInterval(() => {
    current++;
    const value = Math.round((current / total) * target);
    el.textContent = value + suffix;
    if (current >= total) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) statsObserver.observe(statsRow);

/* ── CONTACT FORM ────────────────────────── */
function handleForm(e) {
  e.preventDefault();
  const ok = document.getElementById('formOk');
  if (ok) {
    ok.style.display = 'block';
    e.target.reset();
    setTimeout(() => { ok.style.display = 'none'; }, 5000);
  }
}
window.handleForm = handleForm;

/* ── SMOOTH NAV CLICKS ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── PROJECT CARD TILT ───────────────────── */
document.querySelectorAll('.proj').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    card.style.transform = `translateY(-7px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── BACK TO TOP KEYBOARD ────────────────── */
document.querySelector('.bktop')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── KEYBOARD NAV ────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobNav.classList.remove('open');
  }
});

/* ── PERFORMANCE: Lazy-load images ───────── */
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
  });
}

console.log(
  '%cDilpreet Singh — Portfolio',
  'color:#4488ff;font-family:monospace;font-size:14px;font-weight:700'
);
console.log(
  '%cBuilt with pure HTML, CSS & JS · Inspired by nielitrpr.github.io',
  'color:#9aa3b8;font-family:monospace;font-size:11px'
);
