document.addEventListener("DOMContentLoaded", () => {
  // Cargar el navbar desde navbar.html
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      const navbarContainer = document.getElementById("navbar");
      if (!navbarContainer) return;
      navbarContainer.innerHTML = data;

      // Oscuro por defecto (si no hay nada guardado)
      const temaGuardado = localStorage.getItem("tema");
      if (temaGuardado === "claro") {
        document.body.classList.remove("dark-mode");
      } else {
        document.body.classList.add("dark-mode");
      }

      // Botón para cambiar tema (logo)
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", () => {
          const transitionOverlay = document.getElementById("theme-transition");
          if (transitionOverlay) {
            transitionOverlay.classList.add("active");

            setTimeout(() => {
              document.body.classList.toggle("dark-mode");
              localStorage.setItem(
                "tema",
                document.body.classList.contains("dark-mode") ? "oscuro" : "claro"
              );
            }, 150);

            setTimeout(() => {
              transitionOverlay.classList.remove("active");
            }, 500);
          } else {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem(
              "tema",
              document.body.classList.contains("dark-mode") ? "oscuro" : "claro"
            );
          }
        });
      }
    })
    .catch(console.error);
});
