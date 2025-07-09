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
// Manejo del formulario con EmailJS
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    status.textContent = "⏳ Enviando solicitud...";
    status.style.color = "var(--color-muted)";

    emailjs.sendForm('YOUR_SERVICE_ID', 'template_w9rqfe6', this)
      .then(() => {
        status.textContent = "✅ ¡Solicitud enviada con éxito! Te contactaremos pronto.";
        status.style.color = "var(--color-brand)";
        form.reset();
      }, (error) => {
        console.error('Error:', error);
        status.textContent = "❌ Ocurrió un error al enviar. Intentá de nuevo más tarde.";
        status.style.color = "#ff0033";
      });
  });
});
