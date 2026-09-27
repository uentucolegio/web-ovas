// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Cuál es la solución del sistema x + y = 8, x - y = 4?",
        options: ["x = 4, y = 4", "x = 6, y = 2", "x = 5, y = 3", "x = 8, y = 0"],
        answer: "x = 6, y = 2"
    },
    {
        question: "¿Qué indica que un sistema de ecuaciones lineales NO tiene solución?",
        options: ["Las rectas se cruzan", "Las rectas son coincidentes", "Las rectas son paralelas", "Las rectas forman un ángulo recto"],
        answer: "Las rectas son paralelas"
    },
    {
        question: "¿Cuál es el primer paso del método de sustitución?",
        options: ["Sumar las ecuaciones", "Despejar una variable en una ecuación", "Multiplicar ambas ecuaciones", "Igualar las variables"],
        answer: "Despejar una variable en una ecuación"
    },
    {
        question: "Si al resolver un sistema por el método gráfico las rectas coinciden, el sistema tiene:",
        options: ["Una única solución", "Infinitas soluciones", "Ninguna solución", "Dos soluciones"],
        answer: "Infinitas soluciones"
    },
    {
        question: "¿Qué método consiste en igualar las expresiones de una misma variable obtenidas de ambas ecuaciones?",
        options: ["Método gráfico", "Método de igualación", "Método de sustitución", "Método de reducción"],
        answer: "Método de igualación"
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
            '¡Correcto! x = 6, y = 2 es la solución del sistema.',
            '¡Bien! Si las rectas son paralelas, el sistema no tiene solución.',
            '¡Exacto! El primer paso es despejar una variable en una ecuación.',
            '¡Muy bien! Si las rectas coinciden, hay infinitas soluciones.',
            '¡Perfecto! Igualar expresiones de la misma variable es el método de igualación.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Recuerda que x = 6, y = 2 es la solución correcta.',
            'Incorrecto. Un sistema no tiene solución si las rectas son paralelas.',
            'Incorrecto. El primer paso es despejar una variable en una ecuación.',
            'No es correcto. Si las rectas coinciden, hay infinitas soluciones.',
            'Vuelve a intentarlo: igualar expresiones de la misma variable corresponde al método de igualación.'
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