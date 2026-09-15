// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Qué es un RFC (Request for Comments) en el contexto del desarrollo web?",
        options: ["Un lenguaje de programación", "Un documento técnico que define los requerimientos de un proyecto", "Una herramienta de diseño", "Un tipo de servidor web"],
        answer: "Un documento técnico que define los requerimientos de un proyecto"
    },
    {
        question: "¿Cuál es el primer paso para desarrollar un proyecto web a partir de un RFC?",
        options: ["Escribir el código JavaScript", "Analizar y comprender los requerimientos del RFC", "Diseñar los estilos CSS", "Publicar el sitio web"],
        answer: "Analizar y comprender los requerimientos del RFC"
    },
    {
        question: "¿Qué tecnologías se integran en un proyecto web completo?",
        options: ["Solo HTML", "Solo CSS y JavaScript", "HTML, CSS y JavaScript", "Solo JavaScript"],
        answer: "HTML, CSS y JavaScript"
    },
    {
        question: "¿Para qué se utilizan las etiquetas semánticas en HTML?",
        options: ["Para dar color al texto", "Para estructurar el contenido de manera significativa y accesible", "Para crear animaciones", "Para conectar con bases de datos"],
        answer: "Para estructurar el contenido de manera significativa y accesible"
    },
    {
        question: "¿Qué técnicas de CSS se recomiendan para crear diseños responsivos?",
        options: ["Solo usar píxeles fijos", "Flexbox y Grid", "Tablas HTML", "Frames"],
        answer: "Flexbox y Grid"
    },
    {
        question: "¿Qué es el diseño responsivo?",
        options: ["Un diseño que responde rápido", "Un diseño que se adapta a diferentes tamaños de pantalla", "Un diseño con muchos colores", "Un diseño solo para móviles"],
        answer: "Un diseño que se adapta a diferentes tamaños de pantalla"
    },
    {
        question: "¿Cuál es el propósito de JavaScript en un proyecto web?",
        options: ["Estructurar el contenido", "Dar estilo visual", "Agregar interactividad y funcionalidad", "Crear la base de datos"],
        answer: "Agregar interactividad y funcionalidad"
    },
    {
        question: "¿Qué debes hacer durante la fase de pruebas del proyecto?",
        options: ["Solo revisar el código una vez", "Probar en diferentes navegadores y tamaños de pantalla", "Eliminar todo el CSS", "Cambiar todos los colores"],
        answer: "Probar en diferentes navegadores y tamaños de pantalla"
    },
    {
        question: "¿Qué son las buenas prácticas de desarrollo web?",
        options: ["Escribir código sin comentarios", "Métodos y técnicas que garantizan calidad, mantenibilidad y eficiencia del código", "Usar solo un color en todo el sitio", "No probar el código"],
        answer: "Métodos y técnicas que garantizan calidad, mantenibilidad y eficiencia del código"
    },
    {
        question: "¿En qué orden se recomienda desarrollar un proyecto web?",
        options: ["JavaScript, CSS, HTML", "CSS, HTML, JavaScript", "HTML (estructura), CSS (diseño), JavaScript (funcionalidad)", "Todo al mismo tiempo sin orden"],
        answer: "HTML (estructura), CSS (diseño), JavaScript (funcionalidad)"
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
            'Correcto: Un RFC es un documento técnico que define los requerimientos y especificaciones de un proyecto.',
            'Correcto: El primer paso es analizar y comprender los requerimientos del RFC antes de comenzar a programar.',
            'Correcto: Un proyecto web completo integra HTML (estructura), CSS (diseño) y JavaScript (funcionalidad).',
            'Correcto: Las etiquetas semánticas estructuran el contenido de manera significativa y mejoran la accesibilidad.',
            'Correcto: Flexbox y Grid son técnicas modernas de CSS para crear diseños responsivos y flexibles.',
            'Correcto: El diseño responsivo se adapta a diferentes tamaños de pantalla para una mejor experiencia de usuario.',
            'Correcto: JavaScript agrega interactividad y funcionalidad dinámica a las páginas web.',
            'Correcto: Durante las pruebas debes verificar el funcionamiento en diferentes navegadores y dispositivos.',
            'Correcto: Las buenas prácticas garantizan código de calidad, mantenible y eficiente.',
            'Correcto: El orden recomendado es HTML (estructura), CSS (diseño) y JavaScript (funcionalidad).'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Un RFC es un documento técnico que define los requerimientos de un proyecto.',
            'Incorrecto. El primer paso es analizar y comprender los requerimientos del RFC.',
            'Incorrecto. Un proyecto web completo integra HTML, CSS y JavaScript.',
            'Incorrecto. Las etiquetas semánticas estructuran el contenido de manera significativa y accesible.',
            'Incorrecto. Flexbox y Grid son las técnicas recomendadas para diseños responsivos.',
            'Incorrecto. El diseño responsivo se adapta a diferentes tamaños de pantalla.',
            'Incorrecto. JavaScript agrega interactividad y funcionalidad a las páginas web.',
            'Incorrecto. Debes probar en diferentes navegadores y tamaños de pantalla.',
            'Incorrecto. Las buenas prácticas garantizan calidad, mantenibilidad y eficiencia del código.',
            'Incorrecto. El orden recomendado es HTML (estructura), CSS (diseño), JavaScript (funcionalidad).'
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