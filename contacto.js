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
// Manejo del formulario con EmailJS
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form) {
    console.error('Formulario no encontrado. Revisá el ID en el HTML.');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    status.textContent = "⏳ Enviando solicitud...";
    status.style.color = "var(--color-muted)";

    // Cambiar Service ID y Template ID a los correctos
    emailjs.sendForm('service_xnz52t8', 'template_o0xed43', this)
      .then(() => {
        status.textContent = "✅ ¡Solicitud enviada con éxito! Te contactaremos pronto.";
        status.style.color = "var(--color-brand)";
        form.reset();
      }, (error) => {
        console.error('Error al enviar:', error);
        status.textContent = "❌ Ocurrió un error al enviar. Intentá de nuevo más tarde.";
        status.style.color = "#ff0033";
      });
  });
});
