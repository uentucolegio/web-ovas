document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        { q: "Según la regla de Laplace, la probabilidad de un evento A se calcula como:", opts: ["Casos favorables entre casos posibles", "Casos posibles entre casos favorables", "La suma de todos los resultados", "El complemento del espacio muestral"], ans: 0 },
        { q: "Si P(A) = 0, esto significa que el evento A es:", opts: ["Seguro", "Muy probable", "Imposible", "Independiente"], ans: 2 },
        { q: "La fórmula de la probabilidad condicional P(A|B) es:", opts: ["P(A) · P(B)", "P(A ∩ B) / P(B)", "P(A) + P(B)", "P(A ∩ B) / P(A)"], ans: 1 },
        { q: "En la tabla de fallos de una app, P(falló) = 0.20 pero P(falló | Android) = 0.25. Esto indica que los eventos 'usar Android' y 'la app falla' son:", opts: ["Independientes", "Mutuamente excluyentes", "Dependientes", "Iguales"], ans: 2 },
        { q: "Dos eventos A y B son independientes cuando se cumple que:", opts: ["P(A|B) = P(A)", "P(A ∩ B) = 0", "P(A) = P(B)", "P(A|B) = 1"], ans: 0 },
        { q: "Al lanzar una moneda dos veces, que salga cara en el primer lanzamiento y el segundo lanzamiento son eventos:", opts: ["Dependientes", "Independientes", "Mutuamente excluyentes", "Imposibles"], ans: 1 },
        { q: "Si A y B son independientes, la regla de la multiplicación establece que:", opts: ["P(A ∩ B) = P(A) + P(B)", "P(A ∩ B) = P(A) · P(B)", "P(A ∩ B) = P(A) · P(B|A)", "P(A ∩ B) = P(A|B)"], ans: 1 },
        { q: "Al sacar dos cartas de una baraja sin devolver la primera, la probabilidad de la segunda carta depende de la primera. Esto es un ejemplo de eventos:", opts: ["Independientes", "Dependientes", "Mutuamente excluyentes", "Con la misma probabilidad siempre"], ans: 1 },
        { q: "Un sistema tiene dos servidores independientes que fallan con probabilidad 0.1 cada uno. La probabilidad de que fallen los dos a la vez es:", opts: ["0.2", "0.1", "0.01", "1.0"], ans: 2 },
        { q: "Un filtro de spam que calcula P(spam | contiene ciertas palabras) está aplicando:", opts: ["La regla de Laplace únicamente", "Probabilidad condicional", "La regla de la multiplicación para eventos independientes", "El complemento de un evento"], ans: 1 }
    ];

    function buildQuiz() {
        const container = document.getElementById('quiz-container');
        container.innerHTML = '';
        questions.forEach((q, i) => {
            const div = document.createElement('div');
            div.className = 'mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200';
            div.innerHTML = `<p class="font-semibold text-slate-800 mb-3">${i + 1}. ${q.q}</p>
            <div class="space-y-2">${q.opts.map((o, j) =>
                `<label class="quiz-option flex items-center p-3 rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-green-50 transition-colors">
                    <input type="radio" name="q${i}" value="${j}" class="mr-3 accent-green-600">
                    <span class="text-slate-700">${o}</span></label>`).join('')}</div>
            <div class="feedback-${i} mt-2 text-sm font-medium hidden"></div>`;
            container.appendChild(div);
        });
    }
    buildQuiz();

    document.getElementById('submit-quiz-btn').addEventListener('click', function () {
        let score = 0;
        questions.forEach((q, i) => {
            const sel = document.querySelector(`input[name="q${i}"]:checked`);
            const fb = document.querySelector(`.feedback-${i}`);
            if (sel) {
                const val = parseInt(sel.value);
                if (val === q.ans) { score++; fb.textContent = '✅ ¡Correcto!'; fb.className = `feedback-${i} mt-2 text-sm font-medium text-green-700`; }
                else { fb.textContent = `❌ Incorrecto. Respuesta: "${q.opts[q.ans]}"`; fb.className = `feedback-${i} mt-2 text-sm font-medium text-red-700`; }
                fb.classList.remove('hidden');
            }
        });
        const pct = Math.round((score / questions.length) * 100);
        document.getElementById('quiz-result').innerHTML =
            `<div class="p-4 rounded-lg ${pct >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
            Obtuviste <strong>${score} de ${questions.length}</strong> correctas (${pct}%).
            ${pct >= 70 ? '🎉 ¡Excelente dominio del tema!' : '📚 Revisa el contenido e inténtalo de nuevo.'}</div>`;
        document.getElementById('submit-quiz-btn').classList.add('hidden');
        document.getElementById('reset-quiz-btn').classList.remove('hidden');
    });
    document.getElementById('reset-quiz-btn').addEventListener('click', function () {
        document.getElementById('quiz-result').innerHTML = '';
        document.getElementById('submit-quiz-btn').classList.remove('hidden');
        document.getElementById('reset-quiz-btn').classList.add('hidden');
        buildQuiz();
    });
});
