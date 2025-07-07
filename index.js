// -----------------------------
// INDEX JS - AVALON CREATORS
// -----------------------------

// ✅ 1️⃣ Incluir dinámicamente el navbar.html
fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
  })
  .catch(error => console.error('Error al cargar navbar:', error));


// ✅ 2️⃣ Animación de fade-in al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
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
