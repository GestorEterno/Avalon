// -----------------------------
// INDEX JS - AVALON CREATORS
// -----------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todas las secciones que queremos animar
  const sections = document.querySelectorAll('.section');

  // Intersection Observer para activar animación cuando entren en el viewport
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});
