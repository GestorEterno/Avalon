// -----------------------------
// NAVBAR JS - AVALON
// -----------------------------

// Scroll suave para enlaces internos
document.querySelectorAll('.nav-item a').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetSection = document.querySelector(href);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,  // Ajustar según la altura del navbar
          behavior: 'smooth'
        });
      }
    }
  });
});

// Logo lleva a index
document.querySelector('.logo').addEventListener('click', () => {
  window.location.href = 'index.html';
});
