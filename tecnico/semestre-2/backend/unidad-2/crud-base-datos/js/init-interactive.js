// --- Inicialización de todos los elementos interactivos del OVA CRUD ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Code Matcher - CRUD en apps populares
    new CodeMatcher('matcher-crud-apps', [
        { concept: 'Instagram: Crear publicación', code: 'CREATE - POST /posts' },
        { concept: 'WhatsApp: Leer conversaciones', code: 'READ - GET /chats' },
        { concept: 'Netflix: Actualizar preferencias', code: 'UPDATE - PATCH /profile' },
        { concept: 'Tienda: Eliminar del carrito', code: 'DELETE - DELETE /cart/:id' }
    ]);

    // Code Playground - PUT vs PATCH
    new CodePlayground('playground-put-patch', 
`// PUT: Reemplaza TODOS los campos
const putData = {
  titulo: "Estudiar Node.js",
  descripcion: "Completar la guía",
  completada: false,
  prioridad: "alta"
};

// PATCH: Solo los campos que cambiarán
const patchData = {
  completada: true
};

console.log("PUT (completo):", putData);
console.log("PATCH (parcial):", patchData);

// 🎯 Reto: Crea un objeto PATCH para cambiar solo la prioridad`,
        '🎮 Compara PUT vs PATCH - Ejecuta y observa la diferencia'
    );

    // Code Matcher - SQL vs NoSQL
    new CodeMatcher('matcher-sql-nosql', [
        { concept: 'Datos estructurados con relaciones', code: 'SQL (MySQL, PostgreSQL)' },
        { concept: 'Documentos JSON flexibles', code: 'NoSQL (MongoDB)' },
        { concept: 'Transacciones bancarias', code: 'SQL (MySQL, PostgreSQL)' },
        { concept: 'Apps que escalan rápido', code: 'NoSQL (MongoDB)' }
    ]);

    // Code Matcher - Códigos de estado HTTP
    new CodeMatcher('matcher-http-codes', [
        { concept: 'Recurso creado exitosamente', code: '201 Created' },
        { concept: 'Recurso no encontrado', code: '404 Not Found' },
        { concept: 'Datos inválidos', code: '400 Bad Request' },
        { concept: 'Error del servidor', code: '500 Internal Server Error' }
    ]);

    // Code Playground - Validaciones
    new CodePlayground('playground-validaciones', 
`// Ejemplo de validaciones
function validarTarea(titulo, prioridad) {
  // Validación de presencia
  if (!titulo) {
    return "El título es obligatorio";
  }
  
  // Validación de longitud
  if (titulo.trim().length < 3) {
    return "El título debe tener al menos 3 caracteres";
  }
  
  // Validación de valores permitidos
  const prioridadesValidas = ['baja', 'media', 'alta'];
  if (prioridad && !prioridadesValidas.includes(prioridad)) {
    return "Prioridad inválida";
  }
  
  return "✅ Validación exitosa";
}

// Prueba las validaciones
console.log(validarTarea("", "alta"));
console.log(validarTarea("AB", "alta"));
console.log(validarTarea("Estudiar CRUD", "super"));
console.log(validarTarea("Estudiar CRUD", "alta"));

// 🎯 Reto: Agrega validación para que el título no exceda 100 caracteres`,
        '🎮 Practica validaciones - Modifica y prueba diferentes casos'
    );

    // Code Playground - CRUD en memoria
    new CodePlayground('playground-crud-memoria', 
`// "Base de datos" en memoria
let tareas = [
  { id: 1, titulo: "Estudiar CRUD", completada: false },
  { id: 2, titulo: "Hacer ejercicio", completada: true }
];

// READ - Obtener todas
console.log("Todas las tareas:", tareas);

// CREATE - Crear nueva
const nueva = { id: 3, titulo: "Practicar Node.js", completada: false };
tareas.push(nueva);
console.log("Después de crear:", tareas);

// UPDATE - Actualizar
const tarea = tareas.find(t => t.id === 1);
if (tarea) {
  tarea.completada = true;
  console.log("Después de actualizar:", tareas);
}

// DELETE - Eliminar
tareas = tareas.filter(t => t.id !== 2);
console.log("Después de eliminar:", tareas);

// 🎯 Reto: Agrega una función para buscar tareas por título`,
        '🎮 Experimenta con CRUD en memoria - Agrega, modifica, elimina'
    );

    // Fill in the Blank - Endpoint CRUD
    new FillInTheBlank('fill-blank-endpoint', 
`// Crear una nueva tarea
app.___0___("/tareas", (req, res) => {
  const { titulo } = req.body;
  const nueva = { id: Date.now(), titulo };
  tareas.push(nueva);
  res.status(___1___).json({ data: nueva });
});

// Obtener todas las tareas
app.___2___("/tareas", (req, res) => {
  res.json({ data: tareas });
});`, 
        [
            { answer: 'post', hint: 'método para crear' },
            { answer: '201', hint: 'código para recurso creado' },
            { answer: 'get', hint: 'método para leer' }
        ]
    );

    // Code Sequencer - Flujo de petición CRUD
    new CodeSequencer('sequencer-crud-flow',
        [
            'Cliente envía POST /tareas con datos',
            'Servidor valida los datos recibidos',
            'Si válido: guarda en base de datos',
            'Servidor responde 201 con la tarea creada',
            'Si inválido: responde 400 con error',
            'Cliente recibe respuesta y actualiza UI'
        ],
        [
            'Cliente envía POST /tareas con datos',
            'Servidor valida los datos recibidos',
            'Si válido: guarda en base de datos',
            'Servidor responde 201 con la tarea creada',
            'Si inválido: responde 400 con error',
            'Cliente recibe respuesta y actualiza UI'
        ]
    );

    // Multiple Choice - MongoDB vs MySQL
    new MultipleChoiceInteractive('choice-mongodb-mysql',
        '¿Qué base de datos elegirías para una app de redes sociales que cambia rápido y necesita escalar?',
        ['MySQL', 'MongoDB', 'SQLite', 'PostgreSQL'],
        'MongoDB',
        'MongoDB es ideal para apps que necesitan flexibilidad y escalabilidad horizontal rápida.'
    );

    // Multiple Choice - Códigos HTTP
    new MultipleChoiceInteractive('choice-http-delete',
        '¿Qué código de estado deberías devolver después de eliminar exitosamente un recurso?',
        ['200 OK', '201 Created', '204 No Content', '404 Not Found'],
        '204 No Content',
        '204 No Content indica éxito sin cuerpo de respuesta, ideal para DELETE.'
    );

});
