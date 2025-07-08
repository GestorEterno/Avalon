// servicios.js

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los bloques de servicio
  const bloques = document.querySelectorAll('.servicio-bloque');

  // Configura el IntersectionObserver
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añade la clase 'visible' para activar la animación
        entry.target.classList.add('visible');
        // Deja de observar este elemento (animación solo 1 vez)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Dispara cuando al menos el 10% es visible
  });

  // Observa cada bloque
  bloques.forEach(bloque => observer.observe(bloque));
});
