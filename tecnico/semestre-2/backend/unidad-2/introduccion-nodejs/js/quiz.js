// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Qué es Node.js?",
        options: ["Un framework de JavaScript", "Un entorno de ejecución de JavaScript fuera del navegador", "Una base de datos", "Un lenguaje de programación"],
        answer: "Un entorno de ejecución de JavaScript fuera del navegador"
    },
    {
        question: "¿Qué motor de JavaScript utiliza Node.js?",
        options: ["SpiderMonkey", "Chakra", "V8 de Google Chrome", "JavaScriptCore"],
        answer: "V8 de Google Chrome"
    },
    {
        question: "¿Qué significa que Node.js sea asíncrono y no bloqueante?",
        options: ["Que solo puede procesar una petición a la vez", "Que puede manejar múltiples peticiones sin esperar a que cada una termine", "Que no puede conectarse a bases de datos", "Que solo funciona en servidores Linux"],
        answer: "Que puede manejar múltiples peticiones sin esperar a que cada una termine"
    },
    {
        question: "¿Qué es npm?",
        options: ["Un editor de código", "El gestor de paquetes de Node.js", "Un framework para crear APIs", "Una base de datos"],
        answer: "El gestor de paquetes de Node.js"
    },
    {
        question: "¿Cuál es el framework más popular para crear APIs en Node.js?",
        options: ["React", "Angular", "Express", "Vue"],
        answer: "Express"
    },
    {
        question: "¿Qué hace el comando 'npm init -y'?",
        options: ["Instala todas las dependencias", "Crea un archivo package.json con valores por defecto", "Inicia el servidor", "Desinstala Node.js"],
        answer: "Crea un archivo package.json con valores por defecto"
    },
    {
        question: "¿Para qué sirve el archivo package.json?",
        options: ["Para escribir el código del servidor", "Para guardar las contraseñas", "Para gestionar las dependencias y scripts del proyecto", "Para crear la base de datos"],
        answer: "Para gestionar las dependencias y scripts del proyecto"
    },
    {
        question: "¿Qué método HTTP se usa para obtener datos de una API?",
        options: ["POST", "GET", "DELETE", "PUT"],
        answer: "GET"
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