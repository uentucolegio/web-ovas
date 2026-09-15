// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Qué significa DOM?",
        options: ["Document Object Model", "Data Object Management", "Digital Online Method", "Dynamic Object Module"],
        answer: "Document Object Model"
    },
    {
        question: "¿Cómo se representa el DOM?",
        options: ["Como una lista lineal", "Como un árbol jerárquico", "Como una tabla de datos", "Como un archivo JSON"],
        answer: "Como un árbol jerárquico"
    },
    {
        question: "¿Cuál método se usa para seleccionar un elemento por su ID?",
        options: ["document.querySelector()", "document.getElementByClass()", "document.getElementById()", "document.selectById()"],
        answer: "document.getElementById()"
    },
    {
        question: "¿Qué propiedad se usa para cambiar el contenido de texto de un elemento?",
        options: ["innerHTML", "textContent", "innerText", "Todas las anteriores"],
        answer: "Todas las anteriores"
    },
    {
        question: "¿Cuál es la diferencia entre innerHTML y textContent?",
        options: ["No hay diferencia", "innerHTML interpreta HTML, textContent solo texto plano", "textContent es más rápido siempre", "innerHTML es obsoleto"],
        answer: "innerHTML interpreta HTML, textContent solo texto plano"
    },
    {
        question: "¿Cómo se accede al elemento body de una página?",
        options: ["document.body", "document.getBody()", "document.querySelector('body')", "Tanto A como C son correctas"],
        answer: "Tanto A como C son correctas"
    },
    {
        question: "¿Qué método permite seleccionar múltiples elementos por su clase?",
        options: ["document.getElementById()", "document.getElementsByClassName()", "document.getClass()", "document.selectAll()"],
        answer: "document.getElementsByClassName()"
    },
    {
        question: "¿Cómo se cambia el color de fondo de un elemento usando el DOM?",
        options: ["element.backgroundColor = 'red'", "element.style.backgroundColor = 'red'", "element.color.background = 'red'", "element.css.backgroundColor = 'red'"],
        answer: "element.style.backgroundColor = 'red'"
    },
    {
        question: "¿Qué propiedad se usa para cambiar el valor de un campo de texto (input)?",
        options: ["text", "content", "value", "data"],
        answer: "value"
    },
    {
        question: "¿Para qué sirve la manipulación del DOM?",
        options: ["Solo para leer contenido", "Para modificar dinámicamente el contenido y estilos de una página", "Para crear bases de datos", "Para diseñar páginas estáticas"],
        answer: "Para modificar dinámicamente el contenido y estilos de una página"
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
            'Correcto: DOM significa Document Object Model, el modelo de objetos del documento.',
            'Correcto: El DOM se representa como un árbol jerárquico donde cada elemento es un nodo.',
            'Correcto: document.getElementById() es el método para seleccionar un elemento por su ID.',
            'Correcto: Todas las opciones (innerHTML, textContent, innerText) pueden cambiar el contenido de texto.',
            'Correcto: innerHTML interpreta código HTML, mientras textContent solo maneja texto plano.',
            'Correcto: Tanto document.body como document.querySelector(\'body\') funcionan para acceder al body.',
            'Correcto: document.getElementsByClassName() selecciona múltiples elementos por su clase.',
            'Correcto: Se usa element.style.backgroundColor para cambiar el color de fondo mediante el DOM.',
            'Correcto: La propiedad "value" se usa para cambiar o leer el valor de un campo de texto.',
            'Correcto: La manipulación del DOM permite modificar dinámicamente el contenido y estilos de una página.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. DOM significa Document Object Model.',
            'Incorrecto. El DOM se representa como un árbol jerárquico.',
            'Incorrecto. El método correcto es document.getElementById().',
            'Incorrecto. Todas las opciones mencionadas pueden cambiar el contenido de texto.',
            'Incorrecto. innerHTML interpreta HTML, textContent solo maneja texto plano.',
            'Incorrecto. Tanto document.body como document.querySelector(\'body\') son correctas.',
            'Incorrecto. El método correcto es document.getElementsByClassName().',
            'Incorrecto. Se usa element.style.backgroundColor para cambiar el color de fondo.',
            'Incorrecto. La propiedad correcta es "value".',
            'Incorrecto. El DOM permite modificar dinámicamente el contenido y estilos de una página.'
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