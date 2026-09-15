// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Cuál es la función principal de JavaScript en el desarrollo web?",
        options: ["Estructurar el contenido de la página", "Dar estilo y diseño visual", "Agregar interactividad y dinamismo", "Gestionar bases de datos"],
        answer: "Agregar interactividad y dinamismo"
    },
    {
        question: "¿Cuál de las siguientes es la forma correcta de declarar una variable en JavaScript?",
        options: ["variable nombre = 'Juan';", "let nombre = 'Juan';", "var nombre := 'Juan';", "nombre == 'Juan';"],
        answer: "let nombre = 'Juan';"
    },
    {
        question: "¿Qué tipo de dato representa el valor 'true' en JavaScript?",
        options: ["String", "Number", "Boolean", "Undefined"],
        answer: "Boolean"
    },
    {
        question: "¿Cuál es el resultado de la operación: 10 + '5' en JavaScript?",
        options: ["15", "'105'", "Error", "NaN"],
        answer: "'105'"
    },
    {
        question: "¿Qué estructura condicional usarías para ejecutar código solo si una condición es verdadera?",
        options: ["for", "while", "if", "switch"],
        answer: "if"
    },
    {
        question: "En la analogía del robot, ¿qué papel cumple JavaScript?",
        options: ["Construye el esqueleto del robot", "Le da la forma al robot", "Le da funcionalidades como hablar y saludar", "Almacena la información del robot"],
        answer: "Le da funcionalidades como hablar y saludar"
    },
    {
        question: "¿Cuál operador se utiliza para verificar si dos valores son iguales en JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        question: "¿Qué tipo de dato es el siguiente: let edad = 25;?",
        options: ["String", "Number", "Boolean", "Object"],
        answer: "Number"
    },
    {
        question: "¿Cuál es la diferencia entre HTML, CSS y JavaScript?",
        options: ["No hay diferencia, son lo mismo", "HTML estructura, CSS diseña, JavaScript da interactividad", "HTML da interactividad, CSS estructura, JavaScript diseña", "Todos sirven para dar estilo"],
        answer: "HTML estructura, CSS diseña, JavaScript da interactividad"
    },
    {
        question: "¿Para qué se utilizan las estructuras condicionales en JavaScript?",
        options: ["Para repetir código varias veces", "Para tomar decisiones según condiciones", "Para declarar variables", "Para crear funciones"],
        answer: "Para tomar decisiones según condiciones"
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
            'Correcto: JavaScript es el lenguaje que agrega interactividad y dinamismo a las páginas web.',
            'Correcto: "let" es una de las formas modernas y correctas de declarar variables en JavaScript.',
            'Correcto: "true" es un valor booleano, que representa verdadero o falso.',
            'Correcto: Al sumar un número con un string, JavaScript convierte el número a string y los concatena, resultando en "105".',
            'Correcto: La estructura "if" permite ejecutar código solo cuando una condición es verdadera.',
            'Correcto: JavaScript le da funcionalidades al robot, como hablar y saludar, mientras HTML es el esqueleto y CSS la forma.',
            'Correcto: El operador "===" verifica igualdad estricta de valor y tipo en JavaScript.',
            'Correcto: El valor 25 es de tipo Number (número) en JavaScript.',
            'Correcto: HTML estructura el contenido, CSS lo diseña y JavaScript le da interactividad.',
            'Correcto: Las estructuras condicionales permiten tomar decisiones en el código según se cumplan o no ciertas condiciones.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. JavaScript es el que agrega interactividad y dinamismo a las páginas web.',
            'Incorrecto. La forma correcta es "let nombre = \'Juan\';".',
            'Incorrecto. "true" es un valor de tipo Boolean (booleano).',
            'Incorrecto. JavaScript concatena el número con el string, resultando en "105".',
            'Incorrecto. La estructura "if" es la que se usa para ejecutar código condicionalmente.',
            'Incorrecto. JavaScript le da funcionalidades como hablar y saludar al robot.',
            'Incorrecto. El operador correcto para verificar igualdad es "===".',
            'Incorrecto. El valor 25 es de tipo Number (número).',
            'Incorrecto. HTML estructura, CSS diseña y JavaScript da interactividad.',
            'Incorrecto. Las estructuras condicionales sirven para tomar decisiones según condiciones.'
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