/* =========================
   ELEMENT DEFINITIONS
========================= */
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const carousel = document.getElementById('carousel');
const hero = document.getElementById('hero');

/* =========================
   MOBILE MENU
========================= */
mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !mobileMenuToggle.contains(e.target) &&
    !mobileMenu.classList.contains('hidden')
  ) {
    mobileMenu.classList.add('hidden');
  }
});

/* =========================
   NAV ACTIVE STATE
========================= */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => {
      l.classList.remove('text-white');
      l.classList.add('text-gray-400');
    });

    link.classList.add('text-white');
    link.classList.remove('text-gray-400');

    mobileMenu.classList.add('hidden');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  navLinks[0]?.classList.add('text-white');
});
