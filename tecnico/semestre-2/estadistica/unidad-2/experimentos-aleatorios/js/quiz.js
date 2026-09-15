document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        {
            question: "¿Cuál de las siguientes situaciones es un experimento aleatorio?",
            options: ["Calcular el área de un cuadrado de lado 4 cm", "Lanzar un dado y observar el número que sale", "Sumar 5 + 3 en una calculadora", "Soltar un objeto y observar que cae"],
            correct: 1
        },
        {
            question: "El espacio muestral de lanzar una moneda es:",
            options: ["S = {1, 2}", "S = {cara, sello}", "S = {sí, no, tal vez}", "S = ∅"],
            correct: 1
        },
        {
            question: "Al lanzar dos monedas, ¿cuántos resultados tiene el espacio muestral?",
            options: ["2", "3", "4", "8"],
            correct: 2
        },
        {
            question: "Un evento que contiene un solo resultado del espacio muestral se llama:",
            options: ["Evento compuesto", "Evento seguro", "Evento simple", "Evento imposible"],
            correct: 2
        },
        {
            question: "Si A = {2,4,6} y B = {5,6} al tirar un dado, A ∩ B es:",
            options: ["{2,4,5,6}", "{6}", "{2,4}", "∅"],
            correct: 1
        },
        {
            question: "Dos eventos son mutuamente excluyentes cuando:",
            options: ["Su unión es el espacio muestral completo", "Su intersección es el conjunto vacío", "Tienen el mismo número de elementos", "Uno es el complemento del otro obligatoriamente"],
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
