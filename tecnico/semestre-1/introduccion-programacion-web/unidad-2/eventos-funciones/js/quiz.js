// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Qué es un evento en JavaScript?",
        options: ["Una función que se ejecuta automáticamente", "Una acción que realiza el usuario en la página", "Un tipo de variable", "Un método para modificar el DOM"],
        answer: "Una acción que realiza el usuario en la página"
    },
    {
        question: "¿Cuál de los siguientes es un ejemplo de evento?",
        options: ["let nombre = 'Juan'", "click", "document.getElementById()", "function saludar()"],
        answer: "click"
    },
    {
        question: "¿Qué es una función en JavaScript?",
        options: ["Un bloque de código que se ejecuta cuando es llamado", "Un tipo de evento", "Una propiedad del DOM", "Un operador matemático"],
        answer: "Un bloque de código que se ejecuta cuando es llamado"
    },
    {
        question: "¿Cuál es la sintaxis correcta para declarar una función?",
        options: ["function miFuncion() {}", "func miFuncion() {}", "def miFuncion() {}", "create function miFuncion() {}"],
        answer: "function miFuncion() {}"
    },
    {
        question: "¿Cómo se asocia un evento click a un botón con id 'miBoton'?",
        options: ["miBoton.click = funcion()", "document.getElementById('miBoton').addEventListener('click', funcion)", "miBoton.onClick(funcion)", "addEventListener(miBoton, click, funcion)"],
        answer: "document.getElementById('miBoton').addEventListener('click', funcion)"
    },
    {
        question: "¿Qué hace el método addEventListener()?",
        options: ["Crea un nuevo elemento", "Asocia un evento a un elemento", "Modifica el contenido de un elemento", "Elimina un elemento del DOM"],
        answer: "Asocia un evento a un elemento"
    },
    {
        question: "¿Cuál evento se dispara cuando el usuario escribe en un campo de texto?",
        options: ["click", "input", "submit", "load"],
        answer: "input"
    },
    {
        question: "¿Qué parámetro recibe una función asociada a un evento?",
        options: ["El elemento HTML", "El objeto event", "El valor del input", "El nombre del evento"],
        answer: "El objeto event"
    },
    {
        question: "¿Para qué sirve combinar eventos y funciones?",
        options: ["Para crear variables", "Para hacer que la página responda a las acciones del usuario", "Para dar estilo a la página", "Para estructurar el HTML"],
        answer: "Para hacer que la página responda a las acciones del usuario"
    },
    {
        question: "¿Cuál es el orden correcto para crear interactividad con eventos?",
        options: ["Evento → Función → Acción del usuario", "Acción del usuario → Evento → Función", "Función → Acción del usuario → Evento", "Acción del usuario → Función → Evento"],
        answer: "Acción del usuario → Evento → Función"
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
            'Correcto: Un evento es una acción que realiza el usuario en la página, como hacer clic o escribir.',
            'Correcto: "click" es un ejemplo de evento que se dispara cuando el usuario hace clic en un elemento.',
            'Correcto: Una función es un bloque de código que se ejecuta cuando es llamado o invocado.',
            'Correcto: La sintaxis correcta para declarar una función es "function miFuncion() {}".',
            'Correcto: Se usa addEventListener() con el elemento, el tipo de evento y la función a ejecutar.',
            'Correcto: addEventListener() asocia un evento a un elemento para que ejecute una función cuando ocurra.',
            'Correcto: El evento "input" se dispara cada vez que el usuario escribe en un campo de texto.',
            'Correcto: Las funciones asociadas a eventos reciben el objeto "event" como parámetro.',
            'Correcto: Combinar eventos y funciones permite que la página responda a las acciones del usuario.',
            'Correcto: El orden es: Acción del usuario → Evento → Función que responde.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Un evento es una acción que realiza el usuario en la página.',
            'Incorrecto. "click" es un ejemplo de evento.',
            'Incorrecto. Una función es un bloque de código que se ejecuta cuando es llamado.',
            'Incorrecto. La sintaxis correcta es "function miFuncion() {}".',
            'Incorrecto. Se usa document.getElementById(\'miBoton\').addEventListener(\'click\', funcion).',
            'Incorrecto. addEventListener() asocia un evento a un elemento.',
            'Incorrecto. El evento "input" se dispara cuando el usuario escribe.',
            'Incorrecto. Las funciones asociadas a eventos reciben el objeto "event".',
            'Incorrecto. Eventos y funciones permiten que la página responda a las acciones del usuario.',
            'Incorrecto. El orden correcto es: Acción del usuario → Evento → Función.'
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