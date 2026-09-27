// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Cuál es el resultado de la función polinómica ganancia(x) = 8x si vendes 6 huevos?",
        options: ["14", "48", "42", "36"],
        answer: "48"
    },
    {
        question: "¿Cuál de las siguientes funciones representa un crecimiento exponencial?",
        options: ["f(x) = 2x + 1", "f(x) = 2^x", "f(x) = x^2", "f(x) = log(x)"],
        answer: "f(x) = 2^x"
    },
    {
        question: "Si tienes una función logarítmica f(x) = log2(x), ¿cuál es el valor de f(16)?",
        options: ["4", "8", "2", "16"],
        answer: "4"
    },
    {
        question: "¿Qué representa la gráfica de una función logarítmica?",
        options: ["Un crecimiento muy rápido al principio y luego lento", "Una línea recta", "Un crecimiento lento que se acelera mucho", "Una curva que nunca baja"],
        answer: "Un crecimiento muy rápido al principio y luego lento"
    },
    {
        question: "¿Cuál es la principal diferencia entre una función exponencial y una logarítmica?",
        options: ["La exponencial muestra el tiempo necesario para alcanzar una cantidad y la logarítmica el crecimiento", "La logarítmica muestra el tiempo necesario para alcanzar una cantidad y la exponencial el crecimiento", "Ambas muestran lo mismo", "Ninguna de las anteriores"],
        answer: "La logarítmica muestra el tiempo necesario para alcanzar una cantidad y la exponencial el crecimiento"
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
            '¡Correcto! 8 x 6 = 48, así calculas la ganancia polinómica.',
            '¡Bien! f(x) = 2^x es una función exponencial porque la variable está en el exponente.',
            '¡Exacto! log2(16) = 4 porque 2 x 2 x 2 x 2 = 16.',
            '¡Muy bien! La gráfica logarítmica crece rápido al principio y luego más lento.',
            '¡Perfecto! La función logarítmica responde “cuánto tiempo”, la exponencial “cuánto crece”.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Recuerda que la ganancia es 8 x 6 = 48.',
            'Incorrecto. Solo f(x) = 2^x es una función exponencial.',
            'Incorrecto. log2(16) = 4, porque 2 elevado a 4 es 16.',
            'No es correcto. La gráfica logarítmica crece rápido y luego se aplana.',
            'Vuelve a intentarlo: la logarítmica indica “cuánto tiempo”, la exponencial “cuánto crece”.'
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