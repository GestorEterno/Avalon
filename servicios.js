// ==============================
// SCROLL SUAVE PARA NAVEGACIÓN
// ==============================
document.addEventListener("DOMContentLoaded", () => {
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
