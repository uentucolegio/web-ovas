document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        {
            question: "¿Qué es la población en estadística?",
            options: ["Un grupo de personas que vive en una ciudad", "El conjunto completo de todos los elementos que comparten una característica y se desea estudiar", "Un subconjunto seleccionado para el análisis", "Los datos numéricos de un estudio"],
            correct: 1
        },
        {
            question: "Una empresa revisa 300 de los 12 000 tickets de soporte del año. El valor 300 corresponde a:",
            options: ["El parámetro", "El tamaño de la población (N)", "El tamaño de la muestra (n)", "El individuo"],
            correct: 2
        },
        {
            question: "El tiempo de respuesta de un servidor en milisegundos es una variable:",
            options: ["Cualitativa nominal", "Cuantitativa discreta de intervalo", "Cuantitativa continua de razón", "Cualitativa ordinal"],
            correct: 2
        },
        {
            question: "La variable 'severidad de un bug (baja, media, alta, crítica)' es:",
            options: ["Cuantitativa discreta", "Cualitativa nominal", "Cualitativa ordinal", "Cuantitativa continua"],
            correct: 2
        },
        {
            question: "Si se analizan TODOS los registros de una base de datos, el estudio se llama:",
            options: ["Muestreo", "Inferencia", "Censo", "Estimación"],
            correct: 2
        },
        {
            question: "El símbolo μ representa:",
            options: ["La media de una muestra", "La desviación estándar de la muestra", "La media de la población (parámetro)", "El tamaño de la muestra"],
            correct: 2
        }
    ];

    const quizContainer = document.getElementById('quiz-container');
    quizData.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('mb-6', 'p-4', 'bg-gray-50', 'rounded-lg', 'border', 'border-gray-200');
        div.innerHTML = `
            <p class="font-semibold text-slate-800 mb-3">${index + 1}. ${item.question}</p>
            <div class="space-y-2 options-grid">
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

    document.getElementById('submit-quiz-btn').addEventListener('click', () => {
        let score = 0;
        quizData.forEach((item, index) => {
            const selected = document.querySelector(`.quiz-option.selected[data-question="${index}"]`);
            if (selected && parseInt(selected.dataset.option) === item.correct) score++;
        });
        const result = document.getElementById('quiz-result');
        const pct = Math.round((score / quizData.length) * 100);
        result.textContent = `Obtuviste ${score} de ${quizData.length} (${pct}%)`;
        result.className = `mt-4 text-lg font-bold ${pct >= 60 ? 'text-green-700' : 'text-red-600'}`;
    });
});
