document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        {
            question: "¿Qué representa la frecuencia relativa (hᵢ) de un valor?",
            options: ["El número de veces que aparece el valor", "La proporción del total que representa ese valor", "La suma de frecuencias hasta ese valor", "El punto medio del intervalo"],
            correct: 1
        },
        {
            question: "Si un dato tiene frecuencia absoluta acumulada F₃ = 39 con n = 50, ¿qué significa?",
            options: ["39 datos tienen exactamente ese valor", "39 de los 50 datos son menores o iguales al límite de esa clase", "El 39% de los datos son mayores a ese valor", "Hay 39 clases en la tabla"],
            correct: 1
        },
        {
            question: "La regla de Sturges se usa para calcular:",
            options: ["La frecuencia relativa", "El número de clases (k) al agrupar datos", "La marca de clase", "El rango de los datos"],
            correct: 1
        },
        {
            question: "¿Cuál es la diferencia principal entre un gráfico de barras y un histograma?",
            options: ["El histograma usa colores diferentes", "Las barras del histograma van pegadas porque la variable es continua", "El gráfico de barras solo sirve para datos numéricos", "No hay diferencia, son lo mismo"],
            correct: 1
        },
        {
            question: "La ojiva es un gráfico que se construye con:",
            options: ["Las marcas de clase y las frecuencias absolutas", "El límite superior del intervalo y la frecuencia acumulada", "Las categorías y sus frecuencias porcentuales", "Solo los valores mínimo y máximo"],
            correct: 1
        },
        {
            question: "Para la variable 'severidad del bug' (baja, media, alta, crítica), el gráfico más adecuado es:",
            options: ["Histograma", "Ojiva", "Barras, respetando el orden natural de las categorías", "Polígono de frecuencias"],
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
