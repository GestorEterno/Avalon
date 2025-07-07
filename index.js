// -----------------------------
// INDEX JS - AVALON CREATORS
// -----------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todas las secciones con clase "section"
  const sections = document.querySelectorAll('.section');

  // Crea el observer para animar cuando entren al viewport
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
