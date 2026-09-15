document.addEventListener("DOMContentLoaded", () => {
  const contentArea = document.getElementById("content-area");
  const contenido   = document.getElementById("contenido");

  // helpers para mostrar/ocultar
  const showContenido   = () => { contenido.style.display = "block"; contentArea.style.display = "none";  };
  const showContentArea = () => { contenido.style.display = "none";  contentArea.style.display = "block"; };

  // --- Función para cargar contenido ---
  async function loadContent(page) {
    if (page === "Contenido.html") {
      // Mostrar el bloque con el iframe y ocultar el área dinámica
      showContenido();
      return;
    }

    // Para cualquier otra página: ocultar el iframe y mostrar el área dinámica
    showContentArea();

    try {
      const response = await fetch(`contenidos/${page}`);
      if (!response.ok) throw new Error("Error al cargar " + page);
      const html = await response.text();
      contentArea.innerHTML = html;
    } catch (error) {
      contentArea.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    }
  }

  // --- Cargar inicio por defecto ---
  loadContent("inicio.html");

  // --- Manejo de navegación ---
  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.dataset.page;

      // Marcar como activo
      document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Cargar contenido
      loadContent(page);
    });
  });
});
