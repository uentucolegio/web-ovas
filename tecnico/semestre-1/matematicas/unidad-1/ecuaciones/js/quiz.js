// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Cuál de las siguientes opciones representa una ecuación lineal?",
        options: ["5x < 20", "6000x = 60000", "x ≥ 10", "y > 3"],
        answer: "6000x = 60000"
    },
    {
        question: "¿Qué símbolo se usa para indicar 'mayor o igual que'?",
        options: ["<", ">", "≤", "≥"],
        answer: "≥"
    },
    {
        question: "Si tienes $100 y cada camiseta cuesta $20, ¿cuál es la desigualdad que representa cuántas camisetas puedes comprar sin pasarte del presupuesto?",
        options: ["20x ≥ 100", "20x ≤ 100", "x + 20 = 100", "100x ≥ 20"],
        answer: "20x ≤ 100"
    },
    {
        question: "¿Qué interpretación es correcta sobre la solución de una desigualdad lineal?",
        options: ["Solo existe una respuesta posible", "No tiene solución", "Puede tener muchas respuestas que cumplen la condición", "Siempre es igual a una ecuación"],
        answer: "Puede tener muchas respuestas que cumplen la condición"
    },
    {
        question: "Para ganar exactamente $60.000 vendiendo kilos de pescado a $6.000 cada uno, ¿cuántos kilos debes vender?",
        options: ["5", "10", "12", "20"],
        answer: "10"
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
            'Correcto: 6000x = 60000 es una ecuación lineal porque tiene el signo igual (=).',
            'Correcto: El símbolo ≥ significa "mayor o igual que".',
            'Correcto: 20x ≤ 100 representa que el gasto total no debe exceder el presupuesto.',
            'Correcto: Una desigualdad puede tener muchas soluciones que cumplen la condición.',
            'Correcto: 60000 / 6000 = 10, así que debes vender 10 kilos.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Recuerda que una ecuación lineal tiene el signo igual (=).',
            'Incorrecto. El símbolo ≥ es el que indica "mayor o igual que".',
            'Incorrecto. La desigualdad correcta es 20x ≤ 100.',
            'Incorrecto. Una desigualdad puede tener muchas soluciones.',
            'Incorrecto. Debes vender exactamente 10 kilos para ganar $60.000.'
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