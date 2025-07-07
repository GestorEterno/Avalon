document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      const navbarContainer = document.getElementById("navbar");
      if (!navbarContainer) return;
      navbarContainer.innerHTML = data;

      // Aplicar tema guardado
      if (localStorage.getItem("tema") === "claro") {
        document.body.classList.add("light-mode");
      }

      // Botón para cambiar tema
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", () => {
          document.body.classList.toggle("light-mode");
          localStorage.setItem("tema",
            document.body.classList.contains("light-mode") ? "claro" : "oscuro"
          );
        });
      }
    })
    .catch(console.error);
});
