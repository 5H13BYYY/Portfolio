// ---------- Theme toggle ----------
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.setAttribute('data-theme', savedTheme);

const siteNav = document.querySelector('.nav');
const mobileNavToggle = document.querySelector('.nav__toggle');
const primaryNavigation = document.getElementById('primaryNavigation');
let previousScrollY = window.scrollY;
function closeMobileNavigation(){
  siteNav.classList.remove('nav--open');
  document.body.classList.remove('nav-menu-open');
  mobileNavToggle.setAttribute('aria-expanded', 'false');
  mobileNavToggle.setAttribute('aria-label', 'Open navigation');
}
mobileNavToggle.addEventListener('click', () => {
  const isOpen = mobileNavToggle.getAttribute('aria-expanded') !== 'true';
  siteNav.classList.toggle('nav--open', isOpen);
  document.body.classList.toggle('nav-menu-open', isOpen);
  mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
  mobileNavToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
primaryNavigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMobileNavigation();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileNavToggle.getAttribute('aria-expanded') === 'true'){
    closeMobileNavigation();
    mobileNavToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!siteNav.contains(event.target)) closeMobileNavigation();
});
window.addEventListener('resize', () => {
  closeMobileNavigation();
});

themeToggle.addEventListener('click', () => {
  const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Typing effect ----------
let words = ['an AI student.', 'a builder.', 'a lifelong learner.', 'probably debugging.'];
const typedEl = document.getElementById('typed');
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = words[wordIndex];
  if (!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

// ---------- Hero particle network ----------
const canvas = document.getElementById('net');
const ctx = canvas.getContext('2d');
let particles = [];
let w, h;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize(){
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
}

function initParticles(){
  const count = Math.min(70, Math.floor((w * h) / 18000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  }));
}

function accentColor(){
  return getComputedStyle(document.body).getPropertyValue('--accent').trim();
}

function draw(){
  ctx.clearRect(0, 0, w, h);
  const color = accentColor();
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  });

  for (let i = 0; i < particles.length; i++){
    for (let j = i + 1; j < particles.length; j++){
      const a = particles[i], b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 130){
        ctx.strokeStyle = color;
        ctx.globalAlpha = (1 - dist / 130) * 0.25;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 0.85;
  particles.forEach(p => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  if (!reduceMotion) requestAnimationFrame(draw);
}

if (canvas){
  resize();
  initParticles();
  draw();
  window.addEventListener('resize', () => { resize(); initParticles(); });
}

// ---------- Scroll reveals and active section navigation ----------
const revealTargets = document.querySelectorAll('section:not(.hero), .card, .credential');
if ('IntersectionObserver' in window && !reduceMotion){
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(target => target.classList.add('reveal'));
  revealTargets.forEach(target => revealObserver.observe(target));
}

const sectionLinks = [...document.querySelectorAll('.nav__links a, .nav__contact')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

// ---------- Project filters ----------
const projectFilters = document.querySelectorAll('.project-filter');
projectFilters.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  projectFilters.forEach(item => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.lab__grid > .card').forEach(card => {
    card.classList.toggle('is-filtered-out', filter !== 'all' && card.dataset.category !== filter);
  });
}));

const featuredProjectLink = document.querySelector('.hero__featured');
const featuredProjectDetails = document.querySelector('#project-diabetes .card__details');
featuredProjectLink.addEventListener('click', () => {
  const allProjectsFilter = document.querySelector('.project-filter[data-filter="all"]');
  if (allProjectsFilter) allProjectsFilter.click();
  if (featuredProjectDetails) featuredProjectDetails.open = true;
});

// ---------- Project image lightbox ----------
const lightbox = document.querySelector('.image-lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox__caption');
document.querySelectorAll('.project-image').forEach(button => button.addEventListener('click', () => {
  const image = button.querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.alt;
  lightbox.showModal();
}));
lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

// ---------- Copy email ----------
const copyEmailButton = document.querySelector('.copy-email');
let copyEmailResetTimer;
copyEmailButton.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  try {
    if (navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(email);
    } else {
      const temporaryInput = document.createElement('textarea');
      temporaryInput.value = email;
      temporaryInput.setAttribute('readonly', '');
      temporaryInput.style.position = 'fixed';
      temporaryInput.style.opacity = '0';
      document.body.appendChild(temporaryInput);
      let copied;
      try {
        temporaryInput.select();
        copied = document.execCommand('copy');
      } finally {
        temporaryInput.remove();
      }
      if (!copied) throw new Error('Clipboard copy failed');
    }
    copyEmailButton.textContent = 'Copied!';
  } catch {
    copyEmailButton.textContent = 'Copy failed';
  }
  clearTimeout(copyEmailResetTimer);
  copyEmailResetTimer = setTimeout(() => { copyEmailButton.textContent = 'Copy email'; }, 1800);
});

// ---------- Back to top ----------
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - previousScrollY;
  if (currentScrollY <= 20){
    siteNav.classList.remove('is-hidden');
  } else if (Math.abs(scrollDelta) >= 6){
    if (siteNav.classList.contains('nav--open')){
      siteNav.classList.remove('is-hidden');
    } else {
      siteNav.classList.toggle('is-hidden', scrollDelta > 0);
    }
    previousScrollY = currentScrollY;
  }
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
  siteNav.classList.toggle('is-scrolled', currentScrollY > 60);
  if (currentScrollY <= 20) previousScrollY = currentScrollY;
}, { passive:true });
siteNav.classList.toggle('is-scrolled', window.scrollY > 60);
backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior: reduceMotion ? 'auto' : 'smooth' }));
