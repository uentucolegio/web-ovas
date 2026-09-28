// --- Evaluación Quiz ---
const quizData = [
    {
        question: "PREGUNTA 1: La comunicación efectiva ocurre cuando:",
        options: [
            "a) El emisor habla mucho y rápido.",
            "b)  El emisor transmite un mensaje y el receptor lo entiende claramente.",
            "c) El receptor solo escucha sin preguntar.",
            "d) Ambos utilizan palabras complicadas."
        ],
        answer: "b)  El emisor transmite un mensaje y el receptor lo entiende claramente."
    },
    {
        question: "PREGUNTA 2: ¿Cuál de las siguientes NO es una barrera en la comunicación?",
        options: [
            "a) Ruido externo.",
            "b) Lenguaje confuso.",
            "c)  Escucha activa.",
            "d) Prejuicios personales."
        ],
        answer: "c)  Escucha activa."
    },
    {
        question: "PREGUNTA 3: La entonación en la expresión oral se refiere a:",
        options: [
            "a) Los movimientos del cuerpo.",
            "b) El volumen de la voz.",
            "c) La forma en que usamos el tono de voz para expresar intención o emoción.",
            "d) La rapidez con la que hablamos."
        ],
        answer: "c) La forma en que usamos el tono de voz para expresar intención o emoción."
    },
    {
        question: "PREGUNTA 4: ¿Cuál de las siguientes conductas refleja escucha activa?",
        options: [
            "a) Interrumpir para dar tu opinión rápidamente.",
            "b) Mirar al celular mientras la otra persona habla.",
            "c)  Asentir con la cabeza y hacer preguntas para aclarar.",
            "d) Cambiar de tema sin responder."
        ],
        answer: "c)  Asentir con la cabeza y hacer preguntas para aclarar."
    },
    {
        question: "Pregunta 5: La oratoria se define como:",
        options: [
            " a) El arte de leer en silencio.",
            " b) El arte de hablar en público con claridad, persuasión y confianza.",
            " c) La capacidad de escribir discursos para políticos."
        ],
        answer: " b) El arte de hablar en público con claridad, persuasión y confianza."
    },
    {
        question: "Pregunta 6 ¿Cuál de los siguientes NO es un síntoma del miedo escénico?",
        options: [
            " a) Sudor en las manos.",
            " b) Voz temblorosa.",
            " c) Reír sin parar."
        ],
        answer: " c) Reír sin parar."
    },
    {
        question: "Pregunta 7 El cierre de un discurso debe:",
        options: [
            " a) Presentar los datos principales.",
            " b) Captar la atención del público.",
            " c) Concluir con una reflexión, resumen o invitación a actuar."
        ],
        answer: " c) Concluir con una reflexión, resumen o invitación a actuar."
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
            'Correcto: la comunicación efectiva se logra cuando el receptor entiende claramente el mensaje.',
            'Correcto: la escucha activa facilita la comprensión, no es una barrera.',
            'Correcto: la entonación es el uso del tono de voz para expresar intención o emoción.',
            'Correcto: asentir y hacer preguntas demuestra escucha activa.',
            'Correcto: la oratoria es el arte de hablar en público con claridad, persuasión y confianza.',
            'Correcto: reír sin parar no es un síntoma típico del miedo escénico.',
            'Correcto: el cierre debe concluir con una reflexión, resumen o invitación a actuar.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Recuerda que la comunicación efectiva implica que el receptor comprenda el mensaje.',
            'Incorrecto. La escucha activa favorece la comunicación y no es una barrera.',
            'Incorrecto. La entonación es cómo usamos el tono de voz para expresar intención o emoción.',
            'Incorrecto. Interactuar con atención (asentir y preguntar) es clave en la escucha activa.',
            'Incorrecto. La oratoria trata de hablar en público con claridad, persuasión y confianza.',
            'Incorrecto. El miedo escénico incluye síntomas como sudor y voz temblorosa, no reír sin parar.',
            'Incorrecto. El cierre adecuado incluye una reflexión, resumen o invitación a actuar.'
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