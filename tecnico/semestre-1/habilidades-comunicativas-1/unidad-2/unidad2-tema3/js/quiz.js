// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Cuál es la principal razón para usar recursos audiovisuales en una presentación?",
        options: [
            "a) Reemplazar completamente al expositor",
            "b) Mantener la atención y facilitar la comprensión",
            "c) Hacer que la presentación sea más larga",
            "d) Llenar espacio con imágenes y sonidos"
        ],
        answer: "b) Mantener la atención y facilitar la comprensión"
    },
    {
        question: "Los recursos audiovisuales combinan:",
        options: [
            "a) Solo texto y sonido",
            "b) Texto, imágenes, sonidos o animaciones",
            "c) Texto y gráficas únicamente",
            "d) Sonido e iluminación"
        ],
        answer: "b) Texto, imágenes, sonidos o animaciones"
    },
    {
        question: "¿Qué herramienta es más útil para trabajar en línea con varios compañeros al mismo tiempo?",
        options: [
            "a) Canva",
            "b) PowerPoint",
            "c) Google Slides",
            "d) CapCut"
        ],
        answer: "c) Google Slides"
    },
    {
        question: "Una imagen puede ser más poderosa que un párrafo largo porque:",
        options: [
            "a) Hace la presentación más corta",
            "b) Ayuda a comprender e impacta más",
            "c) Es obligatoria en toda diapositiva",
            "d) Reemplaza al expositor"
        ],
        answer: "b) Ayuda a comprender e impacta más"
    },
    {
        question: "Principio fundamental del diseño visual:",
        options: [
            "a) Llenar las diapositivas con información",
            "b) Usar muchos efectos",
            "c) Mantener claridad y coherencia",
            "d) Cambiar colores en cada pantalla"
        ],
        answer: "c) Mantener claridad y coherencia"
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
            'Correcto: los recursos audiovisuales ayudan a mantener la atención y facilitan la comprensión.',
            'Correcto: combinan texto, imágenes, sonidos o animaciones.',
            'Correcto: Google Slides permite colaboración en línea en tiempo real.',
            'Correcto: una buena imagen puede facilitar la comprensión e impactar más que un párrafo largo.',
            'Correcto: la claridad y coherencia son fundamentales en el diseño visual.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. La función principal es apoyar la atención y la comprensión, no reemplazar ni alargar sin sentido.',
            'Incorrecto. No se limita a texto-sonido o solo gráficas: incluye texto, imágenes, sonidos o animaciones.',
            'Incorrecto. La herramienta más útil para trabajo colaborativo en línea es Google Slides.',
            'Incorrecto. Una imagen es valiosa porque ayuda a comprender e impacta más, no porque sea obligatoria ni reemplace al expositor.',
            'Incorrecto. El principio clave es mantener claridad y coherencia, no llenar, usar muchos efectos o cambiar colores en cada pantalla.'
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