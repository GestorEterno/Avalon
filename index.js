/**
 * index.js - Avalon Creators
 * Scroll reveal simple y profesional
 */

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  const revealSection = () => {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom) {
        section.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealSection);
  revealSection();
});
