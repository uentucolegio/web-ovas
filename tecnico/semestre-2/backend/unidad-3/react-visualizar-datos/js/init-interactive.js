// --- Inicialización de todos los elementos interactivos del OVA React ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Code Matcher - Conceptos de React
    new CodeMatcher('matcher-react-conceptos', [
        { concept: 'Componente', code: 'Pieza reutilizable de la interfaz' },
        { concept: 'JSX', code: 'HTML dentro de JavaScript' },
        { concept: 'Props', code: 'Datos que se pasan entre componentes' },
        { concept: 'Virtual DOM', code: 'Actualiza solo lo que cambió' }
    ]);

    // Code Playground - Instalación con Vite
    new CodePlayground('playground-vite-install', 
`// Comandos para crear proyecto React con Vite
// 1. Crear proyecto
// npm create vite@latest mi-app-react

// 2. Seleccionar opciones:
// ✔ Select a framework: › React
// ✔ Select a variant: › JavaScript

// 3. Entrar al proyecto
// cd mi-app-react

// 4. Instalar dependencias
// npm install

// 5. Iniciar servidor de desarrollo
// npm run dev

// El servidor se levantará en http://localhost:5173

console.log("¡Proyecto React creado con Vite!");
console.log("Servidor corriendo en: http://localhost:5173");`,
        '📦 Comandos de instalación - Copia y ejecuta en tu terminal'
    );

    // Code Sequencer - Pasos para crear proyecto React
    new CodeSequencer('sequencer-react-setup',
        [
            'npm create vite@latest mi-app-react',
            'Seleccionar React como framework',
            'Seleccionar JavaScript como variante',
            'cd mi-app-react',
            'npm install',
            'npm run dev'
        ],
        [
            'npm create vite@latest mi-app-react',
            'Seleccionar React como framework',
            'Seleccionar JavaScript como variante',
            'cd mi-app-react',
            'npm install',
            'npm run dev'
        ]
    );

    // Code Playground - Reglas de JSX
    new CodePlayground('playground-jsx-reglas', 
`// Ejemplo de cómo funciona JSX (simulado en JavaScript)
// En React real, JSX se transforma automáticamente

const nombre = "Ana";
const edad = 25;

// Así se vería el JSX:
const ejemploJSX = \`
<>
  <h1>Hola {nombre}</h1>
  <p>Tienes {edad} años</p>
  <p>Mayor de edad: {edad >= 18 ? 'Sí' : 'No'}</p>
  <img src="foto.jpg" alt="Foto" />
  <input type="text" className="input-nombre" />
</>
\`;

console.log("Ejemplo de JSX válido:");
console.log(ejemploJSX);
console.log("");
console.log("Datos interpolados:");
console.log("Nombre:", nombre);
console.log("Edad:", edad);
console.log("Mayor de edad:", edad >= 18 ? 'Sí' : 'No');
console.log("Doble de edad:", edad * 2);

// 🎯 Reto: Cambia los valores de nombre y edad y ejecuta de nuevo`,
        '🎮 Practica JSX - Modifica los valores y observa'
    );

    // Fill in the Blank - JSX correcto
    new FillInTheBlank('fill-blank-jsx', 
`function Saludo() {
  const nombre = "Ana";
  return (
    ___0___
      <div ___1___="contenedor">
        <h1>Hola ___2___</h1>
        <input type="text" ___3___ />
      </div>
    ___4___
  );
}`, 
        [
            { answer: '<>', hint: 'Fragment de apertura' },
            { answer: 'className', hint: 'atributo para clases CSS en JSX' },
            { answer: '{nombre}', hint: 'interpolación de variable en JSX' },
            { answer: 'placeholder="Escribe aquí"', hint: 'atributo y cierre de etiqueta' },
            { answer: '</>', hint: 'Fragment de cierre' }
        ]
    );

    // Componente Visual - Props
    new PropsComponent('playground-props', 
`function Saludo({ nombre, edad }) {
  return (
    <div>
      <h2>Hola {nombre}</h2>
      <p>Tienes {edad} años</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Saludo nombre="Ana" edad={25} />
      <Saludo nombre="Carlos" edad={30} />
    </div>
  );
}`, 
        '� Componente con Props'
    );

    // Code Matcher - Tipos de props
    new CodeMatcher('matcher-props-tipos', [
        { concept: 'String', code: 'texto="Hola"' },
        { concept: 'Número', code: 'edad={25}' },
        { concept: 'Boolean', code: 'activo={true}' },
        { concept: 'Array', code: 'lista={[1, 2, 3]}' }
    ]);

    // Componente Visual - Listas con map
    new ListComponent('playground-listas', 
`function ListaProductos() {
  const productos = [
    { id: 1, nombre: "Laptop", precio: 1200 },
    { id: 2, nombre: "Mouse", precio: 25 },
    { id: 3, nombre: "Teclado", precio: 80 }
  ];

  return (
    <ul>
      {productos.map(producto => (
        <li key={producto.id}>
          {producto.nombre} - ${producto.precio}
        </li>
      ))}
    </ul>
  );
}`, 
        '� Lista renderizada con .map()'
    );

    // Multiple Choice - Importancia de key
    new MultipleChoiceInteractive('choice-key-prop',
        '¿Por qué es importante usar la prop key en listas?',
        ['Para que se vea bonito', 'Para que React identifique cada elemento y optimice actualizaciones', 'Para ordenar la lista', 'No es importante'],
        'Para que React identifique cada elemento y optimice actualizaciones',
        'La prop key ayuda a React a identificar qué elementos cambiaron, se agregaron o eliminaron, mejorando el rendimiento.'
    );

    // Componente Visual - Tarjeta de producto
    new ProductCardComponent('playground-tarjeta-producto', 
`function TarjetaProducto({ producto }) {
  return (
    <article>
      <h3>{producto.nombre}</h3>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>
    </article>
  );
}

function ListaProductos() {
  const productos = [
    { id: 1, nombre: "Cuaderno", precio: 8000, stock: 12 },
    { id: 2, nombre: "Lápiz", precio: 1500, stock: 30 }
  ];

  return (
    <main>
      <h1>Productos</h1>
      {productos.map(p => (
        <TarjetaProducto key={p.id} producto={p} />
      ))}
    </main>
  );
}`, 
        '� Tarjetas de producto reutilizables'
    );

    // Multiple Choice - Listas vs Tablas
    new MultipleChoiceInteractive('choice-lista-tabla',
        '¿Qué usarías para mostrar un catálogo de productos con imágenes y descripciones largas?',
        ['Tabla', 'Tarjetas/Lista', 'Solo texto', 'No se puede hacer en React'],
        'Tarjetas/Lista',
        'Las tarjetas son ideales para contenido visual como imágenes y descripciones largas, además de ser más responsive.'
    );

});
