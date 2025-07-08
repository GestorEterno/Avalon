// servicios.js

document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar todos los bloques de servicio
  const bloques = document.querySelectorAll('.servicio-bloque');

  // Configurar el IntersectionObserver
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Agregar la clase 'visible' para activar la animación
        entry.target.classList.add('visible');
        // Dejar de observar este elemento (animación solo 1 vez)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Dispara cuando al menos el 10% es visible
  });

  // Observar cada bloque
  bloques.forEach(bloque => observer.observe(bloque));
});
