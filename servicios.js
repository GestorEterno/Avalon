(function () {
  // Cargar el navbar desde navbar.html
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      const navbarContainer = document.getElementById("navbar");
      if (!navbarContainer) return;

      navbarContainer.innerHTML = data;

      // Esperar a que el DOM del navbar esté listo
      requestAnimationFrame(() => {
        // Aplicar tema desde localStorage
        const temaGuardado = localStorage.getItem("tema");
        if (temaGuardado === "claro") {
          document.body.classList.remove("dark-mode");
        } else {
          document.body.classList.add("dark-mode");
        }

        // Agregar event listener al logo
        const themeToggle = document.getElementById("themeToggle");
        if (themeToggle) {
          themeToggle.addEventListener("click", (e) => {
            e.preventDefault();

            const overlay = document.getElementById("theme-transition");
            if (overlay) {
              overlay.classList.add("active");

              setTimeout(() => {
                document.body.classList.toggle("dark-mode");
                localStorage.setItem(
                  "tema",
                  document.body.classList.contains("dark-mode") ? "oscuro" : "claro"
                );
              }, 150);

              setTimeout(() => {
                overlay.classList.remove("active");
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
      });
    })
    .catch(console.error);
})();
