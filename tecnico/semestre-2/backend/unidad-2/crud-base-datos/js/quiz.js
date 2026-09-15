// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Qué significa CRUD?",
        options: ["Create, Read, Update, Delete", "Connect, Run, Upload, Download", "Code, Review, Update, Deploy", "Create, Remove, Upload, Debug"],
        answer: "Create, Read, Update, Delete"
    },
    {
        question: "¿Qué método HTTP se usa para crear un nuevo recurso?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: "POST"
    },
    {
        question: "¿Qué código de estado HTTP indica que un recurso fue creado exitosamente?",
        options: ["200 OK", "201 Created", "204 No Content", "404 Not Found"],
        answer: "201 Created"
    },
    {
        question: "¿Cuál es la diferencia entre PUT y PATCH?",
        options: ["No hay diferencia", "PUT reemplaza completamente el recurso, PATCH actualiza parcialmente", "PATCH es más rápido que PUT", "PUT solo funciona con bases de datos SQL"],
        answer: "PUT reemplaza completamente el recurso, PATCH actualiza parcialmente"
    },
    {
        question: "¿Por qué NO deberíamos guardar datos solo en memoria (variables)?",
        options: ["Es muy lento", "Los datos se pierden al reiniciar el servidor", "Consume mucha CPU", "No permite usar JavaScript"],
        answer: "Los datos se pierden al reiniciar el servidor"
    },
    {
        question: "¿Qué tipo de base de datos es MongoDB?",
        options: ["SQL (Relacional)", "NoSQL (No relacional)", "Blockchain", "Cache"],
        answer: "NoSQL (No relacional)"
    },
    {
        question: "¿Qué código de estado HTTP deberías devolver cuando un recurso no se encuentra?",
        options: ["200 OK", "400 Bad Request", "404 Not Found", "500 Internal Server Error"],
        answer: "404 Not Found"
    },
    {
        question: "¿Cuál es el propósito principal de las validaciones en una API?",
        options: ["Hacer el código más largo", "Proteger la API de datos inválidos o maliciosos", "Aumentar la velocidad", "Reducir el uso de memoria"],
        answer: "Proteger la API de datos inválidos o maliciosos"
    },
    {
        question: "¿Qué método HTTP se usa para eliminar un recurso?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: "DELETE"
    },
    {
        question: "¿Qué ventaja tiene usar una base de datos SQL como MySQL?",
        options: ["Es más rápida que NoSQL siempre", "Permite relaciones estructuradas entre tablas", "No necesita instalación", "Solo funciona con Node.js"],
        answer: "Permite relaciones estructuradas entre tablas"
    }
];

const quizContainer = document.getElementById('quiz-container');
if(quizContainer) {
    quizData.forEach((q, index) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'mb-6';
        questionEl.innerHTML = `<p class="font-semibold mb-2">${index + 1}. ${q.question}</p>`;
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'space-y-2';
        
        q.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'quiz-option p-3 border-2 border-slate-200 rounded-lg cursor-pointer';
            optionEl.textContent = option;
            optionEl.addEventListener('click', () => {
                questionEl.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
                optionEl.classList.add('selected');
            });
            optionsContainer.appendChild(optionEl);
        });
        
        questionEl.appendChild(optionsContainer);
        quizContainer.appendChild(questionEl);
    });
}

const submitQuizBtn = document.getElementById('submit-quiz-btn');
if(submitQuizBtn){
    submitQuizBtn.addEventListener('click', () => {
        let score = 0;
        const questions = quizContainer.querySelectorAll('.mb-6');
        const feedbacks = [
            'Correcto: Node.js es un entorno de ejecución que permite ejecutar JavaScript fuera del navegador.',
            'Correcto: Node.js utiliza el motor V8 de Google Chrome, el mismo que ejecuta JavaScript en el navegador.',
            'Correcto: El modelo asíncrono y no bloqueante permite manejar múltiples peticiones simultáneamente.',
            'Correcto: npm (Node Package Manager) es el gestor de paquetes de Node.js.',
            'Correcto: Express es el framework más popular para crear APIs en Node.js.',
            'Correcto: npm init -y crea un archivo package.json con valores por defecto.',
            'Correcto: El archivo package.json gestiona las dependencias y scripts del proyecto.',
            'Correcto: GET es el método HTTP usado para obtener datos de una API.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Node.js es un entorno de ejecución, no un framework ni un lenguaje.',
            'Incorrecto. Node.js utiliza el motor V8 de Google Chrome.',
            'Incorrecto. El modelo asíncrono permite manejar múltiples peticiones sin bloquear el servidor.',
            'Incorrecto. npm es el gestor de paquetes de Node.js.',
            'Incorrecto. Express es el framework más popular para crear APIs en Node.js.',
            'Incorrecto. npm init -y crea el archivo package.json con configuración por defecto.',
            'Incorrecto. El package.json gestiona dependencias y scripts del proyecto.',
            'Incorrecto. GET es el método HTTP para obtener datos.'
        ];
        questions.forEach((q, index) => {
            const selectedOption = q.querySelector('.quiz-option.selected');
            let feedbackDiv = q.querySelector('.quiz-feedback');
            if (!feedbackDiv) {
                feedbackDiv = document.createElement('div');
                feedbackDiv.className = 'quiz-feedback mt-2 text-sm';
                q.appendChild(feedbackDiv);
            }
            if (selectedOption && selectedOption.textContent === quizData[index].answer) {
                score++;
                feedbackDiv.innerHTML = `<span class='text-green-700 font-semibold'>✔️ ${feedbacks[index]}</span>`;
            } else {
                feedbackDiv.innerHTML = `<span class='text-red-700 font-semibold'>❌ ${wrongFeedbacks[index]}</span>`;
            }
        });
        const resultEl = document.getElementById('quiz-result');
        resultEl.textContent = `Tu puntuación es: ${score} de ${quizData.length}.`;
        if (score / quizData.length >= 0.7) {
            resultEl.className = 'mt-4 text-lg font-bold text-green-700';
        } else {
            resultEl.className = 'mt-4 text-lg font-bold text-red-700';
        }
    });
}