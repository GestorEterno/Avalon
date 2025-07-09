document.addEventListener('DOMContentLoaded', () => {
  // Animación de aparición al hacer scroll
  const sections = document.querySelectorAll('.section');

  const showSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(showSection, {
    threshold: 0.1
  });

  sections.forEach(section => observer.observe(section));
});
