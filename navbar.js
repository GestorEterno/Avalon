// -----------------------------
// NAVBAR JS - AVALON
// -----------------------------

// Scroll suave para los enlaces internos
document.querySelectorAll('.nav-item a').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetSection = document.querySelector(href);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60, // Ajusta altura del navbar fijo
          behavior: 'smooth'
        });
      }
    }
  });
});

// Redirigir al index al hacer clic en el logo
const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}
