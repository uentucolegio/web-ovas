// --- Evaluación Quiz ---
const quizData = [
    {
        question: "Una presentación es efectiva cuando:",
        options: [
            "a) Tiene muchas diapositivas coloridas.",
            "b) El público comprende, recuerda e interactúa con el mensaje.",
            "c) El presentador habla muy rápido para cubrir todo el contenido.",
            "d) Se leen todas las diapositivas sin explicación adicional."
        ],
        answer: "b) El público comprende, recuerda e interactúa con el mensaje."
    },
    {
        question: "¿Cuál de las siguientes NO es una estrategia para captar la atención del público?",
        options: [
            "a) Contar una anécdota.",
            "b) Usar humor respetuoso.",
            "c) Empezar con una estadística llamativa.",
            "d) Leer todo el discurso de memoria sin mirar al público."
        ],
        answer: "d) Leer todo el discurso de memoria sin mirar al público."
    },
    {
        question: "Para organizar las ideas en una presentación, el orden más recomendable es:",
        options: [
            "a) Desarrollo → Conclusión → Introducción.",
            "b) Introducción → Desarrollo → Cierre.",
            "c) Conectores → Ejemplos → Conclusión.",
            "d) Humor → Video → Preguntas."
        ],
        answer: "b) Introducción → Desarrollo → Cierre."
    },
    {
        question: "El lenguaje persuasivo se caracteriza por:",
        options: [
            "a) Dar órdenes sin explicación.",
            "b) Usar emociones, preguntas retóricas o llamados a la acción.",
            "c) Basarse únicamente en datos técnicos.",
            "d) Evitar la interacción con el público."
        ],
        answer: "b) Usar emociones, preguntas retóricas o llamados a la acción."
    },
    {
        question: "Una recomendación para manejar el tiempo en una presentación es:",
        options: [
            "a) Ensayar con cronómetro.",
            "b) Hablar cada vez más rápido.",
            "c) No preparar nada y confiar en la improvisación.",
            "d) Saltarse la conclusión para ahorrar tiempo."
        ],
        answer: "a) Ensayar con cronómetro."
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
            'Correcto: una presentación efectiva logra que el público comprenda, recuerde e interactúe con el mensaje.',
            'Correcto: leer el discurso sin mirar al público no es una estrategia efectiva para captar atención.',
            'Correcto: el orden lógico es Introducción → Desarrollo → Cierre.',
            'Correcto: el lenguaje persuasivo usa emociones, preguntas retóricas o llamados a la acción.',
            'Correcto: ensayar con cronómetro ayuda a manejar bien el tiempo de presentación.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Una presentación efectiva no se trata de diapositivas coloridas, sino de que el público comprenda e interactúe con el mensaje.',
            'Incorrecto. Leer sin mirar al público NO es una buena estrategia. Las opciones correctas incluyen anécdotas, humor respetuoso y estadísticas llamativas.',
            'Incorrecto. El orden correcto es Introducción → Desarrollo → Cierre. Así se mantiene una estructura lógica.',
            'Incorrecto. El lenguaje persuasivo no se basa solo en datos técnicos u órdenes, sino en conectar emocionalmente con el público.',
            'Incorrecto. Ensayar con cronómetro es la mejor práctica. Hablar rápido o improvisar no garantiza un buen manejo del tiempo.'
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