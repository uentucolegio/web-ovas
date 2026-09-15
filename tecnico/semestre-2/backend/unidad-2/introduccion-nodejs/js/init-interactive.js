// --- Inicialización de todos los elementos interactivos ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Click to Reveal - Capacidades de Node.js
    new ClickToReveal('reveal-nodejs-capabilities', [
        {
            title: 'Leer y escribir archivos',
            content: '<p class="text-slate-700">Con el módulo <code class="bg-green-100 px-2 py-1 rounded">fs</code>, puedes leer archivos de texto, JSON, imágenes, y escribir nuevos archivos en el servidor.</p>'
        },
        {
            title: 'Crear servidores HTTP',
            content: '<p class="text-slate-700">Node.js puede crear servidores web que escuchan peticiones y devuelven respuestas, sin necesidad de Apache o Nginx.</p>'
        },
        {
            title: 'Conectarse a bases de datos',
            content: '<p class="text-slate-700">Puedes conectarte a MongoDB, MySQL, PostgreSQL y otras bases de datos para guardar y recuperar información.</p>'
        },
        {
            title: 'Procesar datos en tiempo real',
            content: '<p class="text-slate-700">Ideal para aplicaciones de chat, notificaciones en vivo, streaming de datos y aplicaciones que requieren comunicación bidireccional.</p>'
        }
    ]);

    // Code Playground - Event Loop
    new CodePlayground('playground-event-loop', 
`console.log('1. Inicio');

setTimeout(() => {
  console.log('3. Esto se ejecuta después de 1 segundo');
}, 1000);

console.log('2. Continúa sin esperar');

// 🎯 Reto: Agrega otro setTimeout con 500ms`,
        '🎮 Ejecuta el código y observa el orden. Cambia los tiempos de espera y vuelve a ejecutar.'
    );

    // Multiple Choice - Event Loop
    new MultipleChoiceInteractive('choice-event-loop',
        '¿En qué orden se ejecutarán los console.log del código anterior?',
        ['1 → 3 → 2', '1 → 2 → 3', '3 → 2 → 1', '2 → 1 → 3'],
        '1 → 2 → 3',
        'El código síncrono (1 y 2) se ejecuta primero, y el setTimeout (3) se ejecuta después del tiempo especificado.'
    );

    // Code Playground - Módulos
    new CodePlayground('playground-modulos', 
`function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

// Prueba las funciones
console.log(sumar(5, 3));
console.log(restar(10, 4));
console.log(multiplicar(6, 7));

// 🎯 Reto: Crea una función dividir(a, b)`,
        '🎮 Modifica el código, agrega funciones nuevas y presiona Ejecutar (o Ctrl+Enter)'
    );

    // Click to Reveal - Comandos NPM
    new ClickToReveal('reveal-npm-commands', [
        {
            title: 'npm init -y',
            content: '<p class="text-slate-700 mb-2">Inicializa un nuevo proyecto Node.js y crea el archivo <code class="bg-green-100 px-2 py-1 rounded">package.json</code> con valores por defecto.</p><pre class="bg-slate-800 text-green-400 p-2 rounded font-mono text-sm">npm init -y</pre>'
        },
        {
            title: 'npm install express',
            content: '<p class="text-slate-700 mb-2">Instala el paquete Express y lo agrega a las dependencias del proyecto.</p><pre class="bg-slate-800 text-green-400 p-2 rounded font-mono text-sm">npm install express</pre>'
        },
        {
            title: 'npm install --save-dev nodemon',
            content: '<p class="text-slate-700 mb-2">Instala nodemon como dependencia de desarrollo (solo para desarrollo, no para producción).</p><pre class="bg-slate-800 text-green-400 p-2 rounded font-mono text-sm">npm install --save-dev nodemon</pre>'
        },
        {
            title: 'npm install',
            content: '<p class="text-slate-700 mb-2">Instala todas las dependencias listadas en <code class="bg-green-100 px-2 py-1 rounded">package.json</code>. Útil cuando clonas un proyecto.</p><pre class="bg-slate-800 text-green-400 p-2 rounded font-mono text-sm">npm install</pre>'
        },
        {
            title: 'npm uninstall express',
            content: '<p class="text-slate-700 mb-2">Desinstala el paquete Express y lo elimina de las dependencias.</p><pre class="bg-slate-800 text-green-400 p-2 rounded font-mono text-sm">npm uninstall express</pre>'
        }
    ]);

    // Fill in the Blank - Package.json
    new FillInTheBlank('fill-blank-package-json', 
`{
  "name": "___0___",
  "version": "1.0.0",
  "type": "___1___",
  "main": "___2___",
  "scripts": {
    "start": "node index.js"
  }
}`, 
        [
            { answer: 'mi-proyecto', hint: 'nombre del proyecto' },
            { answer: 'module', hint: 'para usar import/export' },
            { answer: 'index.js', hint: 'archivo principal' }
        ]
    );

    // Code Playground - Express
    new CodePlayground('playground-express', 
`// Simulación de respuestas de API
const respuesta = {
  mensaje: "API funcionando correctamente",
  version: "1.0.0",
  timestamp: new Date().toISOString()
};

console.log(JSON.stringify(respuesta, null, 2));

// 🎯 Reto: Crea una respuesta para un endpoint de usuarios
// Debe tener: success, data con array de usuarios`,
        '🎮 Practica creando diferentes estructuras de respuestas JSON'
    );

    // Code Matcher - Métodos HTTP
    new CodeMatcher('matcher-http-methods', [
        { concept: 'Obtener lista de usuarios', code: 'GET /usuarios' },
        { concept: 'Crear una nueva tarea', code: 'POST /tareas' },
        { concept: 'Actualizar un producto', code: 'PUT /productos/:id' },
        { concept: 'Eliminar un comentario', code: 'DELETE /comentarios/:id' }
    ]);

    // Code Matcher - Estructura de carpetas
    new CodeMatcher('matcher-folders', [
        { concept: 'routes/', code: 'Define los endpoints y métodos HTTP' },
        { concept: 'controllers/', code: 'Contiene la lógica de negocio' },
        { concept: 'models/', code: 'Define la estructura de datos' },
        { concept: 'middlewares/', code: 'Validaciones y autenticación' }
    ]);

    // Code Sequencer - Flujo de petición API
    new CodeSequencer('sequencer-api-flow',
        [
            'Cliente hace petición a /tareas',
            'Express recibe la petición en la ruta',
            'Middleware valida los datos',
            'Controller procesa la lógica',
            'Se consulta el Model/Base de datos',
            'Se devuelve respuesta JSON al cliente'
        ],
        [
            'Cliente hace petición a /tareas',
            'Express recibe la petición en la ruta',
            'Middleware valida los datos',
            'Controller procesa la lógica',
            'Se consulta el Model/Base de datos',
            'Se devuelve respuesta JSON al cliente'
        ]
    );

    // Code Playground - Buenas prácticas
    new CodePlayground('playground-buenas-practicas', 
`// ✅ Buena práctica: estructura consistente
const respuestaExito = {
  success: true,
  data: { id: 1, titulo: "Aprender Node.js" }
};

const respuestaError = {
  success: false,
  error: "Tarea no encontrada"
};

console.log("Éxito:", respuestaExito);
console.log("Error:", respuestaError);

// 🎯 Reto: Crea una respuesta para obtener lista de usuarios
// Estructura: { success: true, data: [array de usuarios] }`,
        '🎮 Practica creando respuestas API con estructura consistente'
    );

    // Multiple Choice - Buenas prácticas
    new MultipleChoiceInteractive('choice-buenas-practicas',
        '¿Qué código de estado HTTP deberías usar al crear un nuevo recurso exitosamente?',
        ['200 OK', '201 Created', '204 No Content', '400 Bad Request'],
        '201 Created',
        '201 Created es el código apropiado cuando se crea un nuevo recurso exitosamente.'
    );

});
