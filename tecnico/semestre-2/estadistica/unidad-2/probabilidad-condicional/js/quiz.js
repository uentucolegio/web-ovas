document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        { question: "Según la regla de Laplace, la probabilidad de un evento A se calcula como:", options: ["Casos favorables entre casos posibles", "Casos posibles entre casos favorables", "La suma de todos los resultados", "El complemento del espacio muestral"], correct: 0 },
        { question: "La fórmula de la probabilidad condicional P(A|B) es:", options: ["P(A) · P(B)", "P(A ∩ B) / P(B)", "P(A) + P(B)", "P(A ∩ B) / P(A)"], correct: 1 },
        { question: "En la tabla de fallos de una app, P(falló) = 0.20 pero P(falló | Android) = 0.25. Esto indica que los eventos 'usar Android' y 'la app falla' son:", options: ["Independientes", "Mutuamente excluyentes", "Dependientes", "Iguales"], correct: 2 },
        { question: "Dos eventos A y B son independientes cuando se cumple que:", options: ["P(A|B) = P(A)", "P(A ∩ B) = 0", "P(A) = P(B)", "P(A|B) = 1"], correct: 0 },
        { question: "Al sacar dos cartas de una baraja sin devolver la primera, la probabilidad de la segunda carta depende de la primera. Esto es un ejemplo de eventos:", options: ["Independientes", "Dependientes", "Mutuamente excluyentes", "Con la misma probabilidad siempre"], correct: 1 },
        { question: "Un sistema tiene dos servidores independientes que fallan con probabilidad 0.1 cada uno. La probabilidad de que fallen los dos a la vez es:", options: ["0.2", "0.1", "0.01", "1.0"], correct: 2 }
    ];

    const quizContainer = document.getElementById('quiz-container');

    function buildQuiz() {
        quizContainer.innerHTML = '';
        quizData.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('mb-6');
            div.innerHTML = `
                <p class="font-semibold text-slate-800 mb-3">${index + 1}. ${item.question}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 options-grid">
                    ${item.options.map((opt, i) => `
                        <div class="quiz-option border-2 border-slate-200 rounded-lg p-3 cursor-pointer transition-colors"
                             data-question="${index}" data-option="${i}">
                            <span class="font-medium text-green-700 mr-2">${String.fromCharCode(65 + i)}.</span> ${opt}
                        </div>
                    `).join('')}
                </div>
            `;
            quizContainer.appendChild(div);
        });

        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', function () {
                const q = this.dataset.question;
                document.querySelectorAll(`[data-question="${q}"]`).forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    buildQuiz();

    document.getElementById('submit-quiz-btn').addEventListener('click', function () {
        let score = 0;
        quizData.forEach((item, index) => {
            const selected = document.querySelector(`.quiz-option.selected[data-question="${index}"]`);
            if (selected && parseInt(selected.dataset.option) === item.correct) score++;
        });
        const result = document.getElementById('quiz-result');
        const pct = Math.round((score / quizData.length) * 100);
        result.textContent = `Obtuviste ${score} de ${quizData.length} (${pct}%)`;
        result.className = `mt-4 text-lg font-bold ${pct >= 60 ? 'text-green-700' : 'text-red-600'}`;
        document.getElementById('submit-quiz-btn').classList.add('hidden');
        document.getElementById('reset-quiz-btn').classList.remove('hidden');
    });

    document.getElementById('reset-quiz-btn').addEventListener('click', function () {
        document.getElementById('quiz-result').textContent = '';
        document.getElementById('submit-quiz-btn').classList.remove('hidden');
        document.getElementById('reset-quiz-btn').classList.add('hidden');
        buildQuiz();
    });
});
