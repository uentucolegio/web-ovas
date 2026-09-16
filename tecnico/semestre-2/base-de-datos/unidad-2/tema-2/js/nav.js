document.addEventListener('DOMContentLoaded', () => {
  const panes = document.querySelectorAll('.content-pane');
  const links = document.querySelectorAll('.sidebar-link');
  const mobileNav = document.getElementById('mobile-nav');

  const activityOne = document.querySelector('#activity1 h2');
  const activityOneDescription = document.querySelector('#activity1 > p');
  const activityTwo = document.querySelector('#activity2 h2');
  const activityTwoDescription = document.querySelector('#activity2 > p');

  if (activityOne) activityOne.textContent = '🔍 Actividad 1: Sopa de Letras - Términos DML';
  if (activityOneDescription) activityOneDescription.innerHTML = 'Encuentra las siguientes palabras relacionadas con DML: <strong>INSERT, SELECT, UPDATE, DELETE, CRUD, WHERE, DATOS, REGISTROS, TABLA, DML</strong>';
  if (activityTwo) activityTwo.textContent = '🖱️ Actividad 2: Arrastrar y Soltar - Clasifica Sentencias DML';
  if (activityTwoDescription) activityTwoDescription.textContent = 'Arrastra cada sentencia SQL a la operación CRUD que le corresponde (CREATE, READ, UPDATE o DELETE).';
  // --- Función para cargar contenido usando rutas relativas ---
  function switchPane(page) {
    panes.forEach((pane) => pane.classList.toggle('active', pane.id === page));
    links.forEach((link) => link.classList.toggle('active', link.dataset.target === page));
    if (mobileNav && mobileNav.value !== page) mobileNav.value = page;
  }

  // --- Cargar inicio por defecto ---
  links.forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    switchPane(link.dataset.target);
  }));

  if (mobileNav) mobileNav.addEventListener('change', (event) => switchPane(event.target.value));
});
