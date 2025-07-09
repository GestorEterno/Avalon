// -----------------------------
// NAVBAR JS - AVALON CREATORS
// -----------------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-item a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});
