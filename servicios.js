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
// Animación al hacer scroll
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
// Evento delegado para cambio de tema con flash
// ==============================
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('#themeToggle');
  if (!toggle) return;

  e.preventDefault();

  const overlay = document.getElementById('theme-transition');
  if (overlay) {
    overlay.classList.add('active');

    setTimeout(() => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem(
        'tema',
        document.body.classList.contains('dark-mode') ? 'oscuro' : 'claro'
      );
    }, 150);

    setTimeout(() => {
      overlay.classList.remove('active');
    }, 500);
  } else {
    // fallback sin overlay
    document.body.classList.toggle('dark-mode');
    localStorage.setItem(
      'tema',
      document.body.classList.contains('dark-mode') ? 'oscuro' : 'claro'
    );
  }
});
