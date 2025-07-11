document.addEventListener("DOMContentLoaded", () => {
  // ✅ 1️⃣ Aplicar dark-mode por defecto si no hay nada en localStorage
  let tema = localStorage.getItem("tema");
  if (!tema) {
    // Valor por defecto
    tema = "oscuro";
    localStorage.setItem("tema", tema);
  }
  if (tema === "oscuro") {
    document.body.classList.add("dark-mode");
  }

  // ✅ 2️⃣ Luego hacer el fetch del navbar
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;

      // ✅ 3️⃣ Activar el botón de dark-mode (con overlay opcional)
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", () => {
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

      // ✅ 4️⃣ Activar el botón hamburguesa (abrir/cerrar menú en mobile)
      const hamburger = document.getElementById("hamburger");
      const navMenu = document.getElementById("navMenu");

      if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
          navMenu.classList.toggle("show");
        });
      }
    })
    .catch(console.error);
});
