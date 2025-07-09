// -----------------------------
// NAVBAR JS - AVALON CREATORS
// -----------------------------

// Selecciona el botón hamburguesa y el menú
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Toggle del menú al hacer click en la hamburguesa
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Cierra el menú al hacer click en un enlace (solo en mobile)
document.querySelectorAll('.nav-item a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});
