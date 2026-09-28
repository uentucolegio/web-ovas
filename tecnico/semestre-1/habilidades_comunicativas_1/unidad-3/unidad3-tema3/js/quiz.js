// --- Evaluación Quiz: Grupos y Equipos ---
const quizData = [
    {
        question: "¿Cuál es la principal diferencia entre un grupo y un equipo?",
        options: [
            "a) El grupo siempre tiene un líder.",
            "b) En el grupo todos trabajan juntos por un objetivo común.",
            "c) En el equipo hay colaboración y metas compartidas.",
            "d) En el grupo todos hacen las mismas tareas."
        ],
        answer: "c) En el equipo hay colaboración y metas compartidas.",
        feedback: "El equipo se caracteriza por la colaboración activa y metas compartidas, mientras que en un grupo las personas pueden estar juntas sin necesariamente colaborar."
    },
    {
        question: "¿Cuál de los siguientes ejemplos representa un grupo y no un equipo?",
        options: [
            "a) Estudiantes que hacen una exposición entre todos.",
            "b) Compañeros que trabajan cada uno por separado.",
            "c) Personas que se reparten tareas y se ayudan mutuamente.",
            "d) Un grupo de deportistas que entrenan para ganar."
        ],
        answer: "b) Compañeros que trabajan cada uno por separado.",
        feedback: "En un grupo las personas pueden estar juntas pero trabajar individualmente, mientras que en un equipo existe colaboración y coordinación."
    },
    {
        question: "En el trabajo colaborativo, la comunicación y el respeto son…",
        options: [
            "a) Opcionales.",
            "b) Responsabilidad del líder.",
            "c) Fundamentales para lograr los objetivos.",
            "d) Solo necesarias al inicio del proyecto."
        ],
        answer: "c) Fundamentales para lograr los objetivos.",
        feedback: "La comunicación efectiva y el respeto mutuo son esenciales para el éxito del trabajo colaborativo durante todo el proceso."
    },
    {
        question: "¿Qué rol cumple el secretario dentro de un equipo?",
        options: [
            "a) Dirigir al grupo y tomar decisiones.",
            "b) Motivar a los compañeros.",
            "c) Anotar acuerdos y tareas realizadas.",
            "d) Exponer los resultados ante el público."
        ],
        answer: "c) Anotar acuerdos y tareas realizadas.",
        feedback: "El secretario es responsable de documentar los acuerdos, seguimiento de tareas y mantener el registro del equipo."
    },
    {
        question: "¿Cuál es la función del vocero?",
        options: [
            "a) Organizar el tiempo.",
            "b) Representar al grupo y comunicar sus ideas.",
            "c) Revisar los materiales.",
            "d) Evaluar el trabajo de los demás."
        ],
        answer: "b) Representar al grupo y comunicar sus ideas.",
        feedback: "El vocero actúa como portavoz del equipo, representando las decisiones y comunicando las posturas del grupo."
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
            'Correcto: El equipo se caracteriza por la colaboración activa y metas compartidas, mientras que en un grupo las personas pueden estar juntas sin necesariamente colaborar.',
            'Correcto: En un grupo las personas pueden estar juntas pero trabajar individualmente, mientras que en un equipo existe colaboración y coordinación.',
            'Correcto: La comunicación efectiva y el respeto mutuo son esenciales para el éxito del trabajo colaborativo durante todo el proceso.',
            'Correcto: El secretario es responsable de documentar los acuerdos, seguimiento de tareas y mantener el registro del equipo.',
            'Correcto: El vocero actúa como portavoz del equipo, representando las decisiones y comunicando las posturas del grupo.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. En el equipo hay colaboración y metas compartidas. El equipo se distingue por la colaboración activa.',
            'Incorrecto. Compañeros que trabajan cada uno por separado. Esto representa un grupo donde no hay colaboración.',
            'Incorrecto. Fundamentales para lograr los objetivos. La comunicación y el respeto son esenciales durante todo el proceso.',
            'Incorrecto. Anotar acuerdos y tareas realizadas. El secretario se encarga de la documentación y registro.',
            'Incorrecto. Representar al grupo y comunicar sus ideas. El vocero actúa como portavoz del equipo.'
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