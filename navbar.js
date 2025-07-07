document.addEventListener("DOMContentLoaded", () => {
  // Cargar el navbar desde navbar.html
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      const navbarContainer = document.getElementById("navbar");
      if (!navbarContainer) return;
      navbarContainer.innerHTML = data;

      // Aplicar tema guardado (claro por defecto)
      if (localStorage.getItem("tema") === "oscuro") {
        document.body.classList.add("dark-mode");
      }

      // Botón para cambiar tema con animación de flash eléctrico
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", () => {
          // Activar overlay de transición
          const transitionOverlay = document.getElementById("theme-transition");
          if (transitionOverlay) {
            transitionOverlay.classList.add("active");

            // Cambiar tema mientras se ve el flash
            setTimeout(() => {
              document.body.classList.toggle("dark-mode");
              localStorage.setItem(
                "tema",
                document.body.classList.contains("dark-mode") ? "oscuro" : "claro"
              );
            }, 150);

            // Quitar overlay después de la animación
            setTimeout(() => {
              transitionOverlay.classList.remove("active");
            }, 500);
          } else {
            // Fallback sin animación si no existe el overlay
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
