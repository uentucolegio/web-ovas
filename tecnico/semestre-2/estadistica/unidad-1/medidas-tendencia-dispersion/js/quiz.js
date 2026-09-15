document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        {
            question: "¿Cuál es la fórmula de la media aritmética para datos simples?",
            options: ["Suma de los datos entre n", "El dato central al ordenar", "El valor más frecuente", "Máximo menos mínimo"],
            correct: 0
        },
        {
            question: "¿Por qué la mediana es una medida robusta ante valores atípicos?",
            options: ["Porque usa todos los datos por igual", "Porque solo depende de la posición central, no del valor extremo", "Porque siempre es igual a la media", "Porque se calcula con la varianza"],
            correct: 1
        },
        {
            question: "¿Cuál es la única medida de tendencia central válida para variables cualitativas nominales?",
            options: ["La media", "La mediana", "La moda", "La desviación estándar"],
            correct: 2
        },
        {
            question: "¿Qué mide la varianza?",
            options: ["El valor central de los datos", "El promedio de los cuadrados de las desviaciones respecto a la media", "La diferencia entre el máximo y el mínimo", "La proporción de datos por debajo de un valor"],
            correct: 1
        },
        {
            question: "¿Para qué sirve el coeficiente de variación (CV)?",
            options: ["Para calcular la mediana de datos agrupados", "Para comparar la variabilidad de conjuntos con unidades o magnitudes distintas", "Para encontrar la moda de una variable", "Para calcular el rango de una muestra"],
            correct: 1
        },
        {
            question: "Dos servidores tienen la misma media de tiempos de respuesta, pero uno tiene mayor desviación estándar. ¿Qué significa esto?",
            options: ["El servidor con mayor desviación es más rápido en promedio", "El servidor con mayor desviación es menos predecible", "Ambos servidores son idénticos", "El servidor con menor desviación tiene errores"],
            correct: 1
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
