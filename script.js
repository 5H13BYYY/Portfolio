// ---------- Theme toggle ----------
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ---------- Language switch ----------
const languageSwitch = document.getElementById('languageSwitch');
const translations = {
  en: {
    nav: ['Home', 'About', 'Lab', 'Credentials', 'Contact'], theme: 'Theme', language: 'Language',
    eyebrow: '// building things for the better future', greeting: "Hey, I'm", hero: 'AI student at AUPP, and English Literature student at IFL, RUPP, Phnom Penh. I build small, useful things — models, tools, and interfaces — and write about what I learn along the way.',
    buttons: ['See the lab', 'My Credentials', 'Get in touch'], scroll: 'scroll', aboutLabel: '01 — About', aboutTitle: 'Curious by default, deliberate by habit.',
    about: ["I'm currently a Sophomore and working toward a B.S. in Artificial Intelligence and B.A. in English Literature, splitting my time between coursework, side projects, and figuring out how the systems I use every day actually work under the hood. Cambodian, Khmer-English bilingual, friendly-beginner French, and always up for a good technical rabbit hole.", 'Outside of code: football, music, and travel — most of what I build ends up being an excuse to combine two of those with tech.'],
    tools: 'Stack & tools', labLabel: '02 — Lab', labTitle: "Things I've built & broken", credentialsLabel: '03 - Credentials', credentialsTitle: 'Learning, one credential at a time.', education: 'Education', certificates: 'Certificates', contactLabel: '04 — Contact', contactTitle: "Let's talk.", contact: 'Open to internships, collabs, and interesting problems. Reach out — I reply fast.', cv: 'Curriculum Vitae', cvText: 'Here is my CV. Please click download here.'
  },
  fr: {
    nav: ['Accueil', 'À propos', 'Projets', 'Diplômes', 'Contact'], theme: 'Thème', language: 'Langue',
    eyebrow: '// créer pour un avenir meilleur', greeting: 'Bonjour, je suis', hero: "Étudiant en IA à l'AUPP et en littérature anglaise à l'IFL, RUPP, Phnom Penh. Je crée des projets utiles : modèles, outils et interfaces, et je partage ce que j'apprends.",
    buttons: ['Voir les projets', 'Mes diplômes', 'Me contacter'], scroll: 'défiler', aboutLabel: '01 — À propos', aboutTitle: 'Curieux par défaut, réfléchi par habitude.',
    about: ["Je suis actuellement en deuxième année et je prépare une licence en intelligence artificielle et une licence en littérature anglaise. Je partage mon temps entre les cours, les projets personnels et la compréhension des systèmes que j'utilise chaque jour.", 'En dehors du code : football, musique et voyages.'],
    tools: 'Compétences et outils', labLabel: '02 — Projets', labTitle: "Ce que j'ai créé et expérimenté", credentialsLabel: '03 - Diplômes', credentialsTitle: 'Apprendre, un diplôme à la fois.', education: 'Formation', certificates: 'Certificats', contactLabel: '04 — Contact', contactTitle: 'Parlons-en.', contact: 'Ouvert aux stages, collaborations et problèmes intéressants. Écrivez-moi.', cv: 'Curriculum Vitae', cvText: 'Voici mon CV. Cliquez ici pour le télécharger.'
  }
};
const typedPhrases = {
  en: ['an AI student.', 'a builder.', 'a lifelong learner.', 'probably debugging.'],
  fr: ["un étudiant en IA.", 'un créateur.', 'un apprenant pour la vie.', 'probablement en train de déboguer.']
};

function setText(selector, value, index = 0) {
  const element = document.querySelectorAll(selector)[index];
  if (element) element.textContent = value;
}

function setHeroGreeting(value) {
  const title = document.querySelector('.hero__title');
  const textNode = [...title.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
  if (textNode) textNode.nodeValue = `\n          ${value} `;
}

function setLanguage(language) {
  const t = translations[language];
  document.documentElement.lang = language === 'km' ? 'km' : language;
  document.documentElement.style.fontFamily = language === 'km' ? "'Noto Sans Khmer', var(--font-body)" : '';
  document.querySelectorAll('.nav__links a').forEach((link, index) => link.textContent = t.nav[index]);
  setText('.theme-control__label-text', t.theme);
  setText('.language-control__text', t.language);
  const languageFlag = document.querySelector('.language-control__flag');
  if (languageFlag) {
    const isFrench = language === 'fr';
    languageFlag.src = isFrench ? 'https://flagcdn.com/w40/fr.png' : 'https://flagcdn.com/w40/gb.png';
    languageFlag.alt = isFrench ? 'Français' : 'English';
  }
  setText('.eyebrow', t.eyebrow);
  setHeroGreeting(t.greeting);
  setText('.hero__sub', t.hero);
  document.querySelectorAll('.hero__cta a').forEach((button, index) => button.textContent = t.buttons[index]);
  setText('.hero__scroll p', t.scroll);
  setText('#about .section-label', t.aboutLabel);
  setText('.about h2', t.aboutTitle);
  document.querySelectorAll('.about__text p').forEach((paragraph, index) => paragraph.textContent = t.about[index]);
  setText('.mono-label', t.tools);
  setText('#lab .section-label', t.labLabel);
  setText('.lab__title', t.labTitle);
  setText('#credentials .section-label', t.credentialsLabel);
  document.querySelectorAll('.credentials__title').forEach((title, index) => title.textContent = index === 0 ? t.credentialsTitle : index === 1 ? t.education : t.certificates);
  document.querySelectorAll('.credential__type').forEach((type, index) => type.textContent = index < 2 ? t.education : t.certificates.slice(0, -1));
  setText('#contact .section-label', t.contactLabel);
  setText('.contact h2', t.contactTitle, 0);
  setText('.contact__sub', t.contact, 0);
  setText('.contact h2', t.cv, 1);
  words = typedPhrases[language];
  wordIndex = 0;
  charIndex = 0;
  deleting = false;
  localStorage.setItem('language', language);
}

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Typing effect ----------
let words = ['an AI student.', 'a builder.', 'a lifelong learner.', 'probably debugging.'];
const typedEl = document.getElementById('typed');
let wordIndex = 0, charIndex = 0, deleting = false;

const savedLanguage = ['en', 'fr'].includes(localStorage.getItem('language')) ? localStorage.getItem('language') : 'en';
languageSwitch.value = savedLanguage;
setLanguage(savedLanguage);
languageSwitch.addEventListener('change', event => setLanguage(event.target.value));

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
