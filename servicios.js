document.addEventListener("DOMContentLoaded", () => {
  // Mostrar secciones
  document.querySelectorAll('.section').forEach((section) => {
    section.classList.add('visible');
  });

  // Scroll suave
  const enlaces = document.querySelectorAll('a[href^="#"]');
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      const destino = document.querySelector(this.getAttribute("href"));
      if (destino) {
        e.preventDefault();
        destino.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
