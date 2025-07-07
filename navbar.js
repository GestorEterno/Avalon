/**
 * NAVBAR.JS - Avalon Creators
 * Versión limpia y minimalista
 */

// Espera a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  // Selecciona el logo por clase
  const logo = document.querySelector('.logo');

  // Al hacer clic, navega a index.html
  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});
