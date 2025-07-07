// -----------------------------
// NAVBAR JS - AVALON
// -----------------------------

// Redirigir al index al hacer clic en el logo
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});
