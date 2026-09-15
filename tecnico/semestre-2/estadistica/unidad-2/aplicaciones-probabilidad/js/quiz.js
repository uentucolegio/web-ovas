document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        { question: "La probabilidad empírica se calcula como:", options: ["Casos favorables entre casos posibles", "Veces que ocurrió el evento entre el total de repeticiones", "P(A) · P(B)", "1 menos la probabilidad teórica"], correct: 1 },
        { question: "La ley de los grandes números establece que la probabilidad empírica:", options: ["Siempre es igual a la teórica desde la primera repetición", "Se aleja más de la teórica cuantas más repeticiones hay", "Se acerca al valor teórico cuando aumenta el número de repeticiones", "No tiene relación con la probabilidad teórica"], correct: 2 },
        { question: "En un sistema con componentes en serie, la probabilidad de que el sistema completo funcione es:", options: ["La suma de las confiabilidades individuales", "El producto de las confiabilidades individuales", "El promedio de las confiabilidades", "Siempre igual a 1"], correct: 1 },
        { question: "En un sistema con respaldo (en paralelo), el sistema falla solo si:", options: ["Falla cualquiera de los componentes", "Fallan todos los componentes a la vez", "Falla el componente principal únicamente", "Nunca puede fallar"], correct: 1 },
        { question: "En la tabla de retención de un videojuego, P(siguió jugando | completó tutorial) = 0.70 y P(siguió | no completó) = 0.20. Esto indica que completar el tutorial y seguir jugando son eventos:", options: ["Independientes", "Mutuamente excluyentes", "Dependientes", "Iguales"], correct: 2 },
        { question: "Si tres microservicios independientes funcionan cada uno con probabilidad 0.99, la probabilidad de que al menos uno falle es aproximadamente:", options: ["0.01", "0.03", "0.99", "0.97"], correct: 1 }
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
