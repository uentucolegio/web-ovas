document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        {
            question: "La inferencia estadística consiste en:",
            options: ["Calcular probabilidades con la regla de Laplace", "Obtener conclusiones sobre una población a partir de una muestra", "Construir tablas de frecuencia", "Diseñar experimentos deterministas"],
            correct: 1
        },
        {
            question: "En la inferencia estadística, un parámetro (como μ) es:",
            options: ["Un valor calculado con los datos de la muestra", "Un valor de la población, casi siempre desconocido", "Siempre igual al estadístico", "Un tipo de muestreo"],
            correct: 1
        },
        {
            question: "Si todos los elementos de la población tienen la misma probabilidad de ser elegidos, el muestreo es:",
            options: ["Sistemático", "Aleatorio simple", "Estratificado", "Por conglomerados"],
            correct: 1
        },
        {
            question: "Cuando la población se divide en grupos homogéneos y se toma una muestra proporcional de cada uno, el muestreo es:",
            options: ["Aleatorio simple", "Sistemático", "Estratificado", "Por conglomerados"],
            correct: 2
        },
        {
            question: "Cuando solo responden a una encuesta los usuarios más motivados (muy satisfechos o muy molestos), el error se llama:",
            options: ["Muestra por conveniencia", "Sesgo de autoselección", "Cobertura incompleta", "Muestreo sistemático"],
            correct: 1
        },
        {
            question: "Si en una muestra de 500 usuarios, 430 dicen estar satisfechos, la estimación puntual de la proporción poblacional es:",
            options: ["500/430", "430 usuarios", "430/500 = 0.86", "0.5"],
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
