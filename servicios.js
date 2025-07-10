// ==============================
// Aplicar tema guardado al cargar
// ==============================
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado === 'oscuro') {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.remove('dark-mode');
}

// ==============================
// Animación al hacer scroll - Intersection Observer
// ==============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// ==============================
// Scroll suave para enlaces internos
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
