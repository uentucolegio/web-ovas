// --- Evaluación Quiz React ---
const quizData = [
    {
        question: "¿Qué es React?",
        options: ["Una base de datos", "Una librería de JavaScript para construir interfaces de usuario", "Un lenguaje de programación", "Un servidor web"],
        answer: "Una librería de JavaScript para construir interfaces de usuario"
    },
    {
        question: "¿Qué es un componente en React?",
        options: ["Una variable", "Una pieza reutilizable de la interfaz", "Un archivo CSS", "Una base de datos"],
        answer: "Una pieza reutilizable de la interfaz"
    },
    {
        question: "¿Qué es JSX?",
        options: ["Un lenguaje de programación nuevo", "Una forma de escribir HTML dentro de JavaScript", "Una base de datos", "Un framework"],
        answer: "Una forma de escribir HTML dentro de JavaScript"
    },
    {
        question: "¿Cuál es la herramienta moderna recomendada para crear proyectos React?",
        options: ["Create React App", "Vite", "Webpack", "Parcel"],
        answer: "Vite"
    },
    {
        question: "En JSX, ¿qué atributo se usa en lugar de 'class'?",
        options: ["class", "className", "classname", "css"],
        answer: "className"
    },
    {
        question: "¿Qué son las props en React?",
        options: ["Propiedades que se pasan de un componente padre a un componente hijo", "Funciones especiales", "Estilos CSS", "Errores del código"],
        answer: "Propiedades que se pasan de un componente padre a un componente hijo"
    },
    {
        question: "¿Qué método de JavaScript se usa para renderizar listas en React?",
        options: ["forEach()", "map()", "filter()", "reduce()"],
        answer: "map()"
    },
    {
        question: "¿Por qué es importante la prop 'key' en listas?",
        options: ["Para que se vea bonito", "Para que React identifique cada elemento y optimice actualizaciones", "No es importante", "Para ordenar la lista"],
        answer: "Para que React identifique cada elemento y optimice actualizaciones"
    },
    {
        question: "¿Cuándo deberías usar tarjetas/listas en lugar de tablas?",
        options: ["Nunca", "Cuando quieres mostrar información visual con imágenes y descripciones largas", "Solo para datos numéricos", "Cuando tienes pocos datos"],
        answer: "Cuando quieres mostrar información visual con imágenes y descripciones largas",
        explanation: "Las tarjetas/listas son ideales para mostrar contenido visual como imágenes, descripciones largas y cuando el diseño responsive es importante. Las tablas son mejores para comparar datos numéricos o textuales cortos."
    },
    {
        question: "¿Qué empresa creó React?",
        options: ["Google", "Microsoft", "Facebook (Meta)", "Apple"],
        answer: "Facebook (Meta)",
        explanation: "React fue creado por Facebook (ahora Meta) en 2013 y es usado en aplicaciones como Instagram y WhatsApp Web."
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