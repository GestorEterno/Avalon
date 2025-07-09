// -----------------------------
// NAVBAR JS - AVALON CREATORS
// -----------------------------

// Scroll suave para todos los enlaces de navegación internos
document.querySelectorAll('.nav-item a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60, // Compensar altura del navbar fijo
        behavior: 'smooth'
      });
    }
  });
});
