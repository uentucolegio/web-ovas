document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        { q: "La probabilidad empírica se calcula como:", opts: ["Casos favorables entre casos posibles", "Veces que ocurrió el evento entre el total de repeticiones", "P(A) · P(B)", "1 menos la probabilidad teórica"], ans: 1 },
        { q: "La ley de los grandes números establece que la probabilidad empírica:", opts: ["Siempre es igual a la teórica desde la primera repetición", "Se aleja más de la teórica cuantas más repeticiones hay", "Se acerca al valor teórico cuando aumenta el número de repeticiones", "No tiene relación con la probabilidad teórica"], ans: 2 },
        { q: "Si un dado se lanza 600 veces y el 6 sale 150 veces, la probabilidad empírica de sacar 6 es:", opts: ["1/6 ≈ 0.167", "150/600 = 0.25", "6/600 = 0.01", "600/150 = 4"], ans: 1 },
        { q: "En un sistema con componentes en serie, la probabilidad de que el sistema completo funcione es:", opts: ["La suma de las confiabilidades individuales", "El producto de las confiabilidades individuales", "El promedio de las confiabilidades", "Siempre igual a 1"], ans: 1 },
        { q: "En un sistema con respaldo (en paralelo), el sistema falla solo si:", opts: ["Falla cualquiera de los componentes", "Fallan todos los componentes a la vez", "Falla el componente principal únicamente", "Nunca puede fallar"], ans: 1 },
        { q: "Usar el complemento para calcular 'al menos un fallo' significa calcular:", opts: ["P(ningún fallo) directamente", "1 − P(ningún fallo)", "P(fallo) + P(no fallo)", "P(fallo) · P(no fallo)"], ans: 1 },
        { q: "En la tabla de retención de un videojuego, P(siguió jugando | completó tutorial) = 0.70 y P(siguió | no completó) = 0.20. Esto indica que completar el tutorial y seguir jugando son eventos:", opts: ["Independientes", "Mutuamente excluyentes", "Dependientes", "Iguales"], ans: 2 },
        { q: "Al lanzar dos dados y sumar sus caras, el valor con mayor probabilidad de ocurrir es:", opts: ["2", "7", "12", "Todos son igual de probables"], ans: 1 },
        { q: "Una distribución de probabilidad es:", opts: ["La probabilidad de un solo evento calculada una vez", "La asignación de probabilidad a todos los valores posibles de una variable, vista en conjunto", "Solo aplica a monedas y dados", "Un sinónimo de probabilidad condicional"], ans: 1 },
        { q: "Si tres microservicios independientes funcionan cada uno con probabilidad 0.99, la probabilidad de que al menos uno falle es aproximadamente:", opts: ["0.01", "0.03", "0.99", "0.97"], ans: 1 }
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
