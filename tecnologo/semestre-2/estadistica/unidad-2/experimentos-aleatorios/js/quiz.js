document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        { q: "¿Cuál de las siguientes situaciones es un experimento aleatorio?", opts: ["Calcular el área de un cuadrado de lado 4 cm", "Lanzar un dado y observar el número que sale", "Sumar 5 + 3 en una calculadora", "Soltar un objeto y observar que cae"], ans: 1 },
        { q: "El espacio muestral de lanzar una moneda es:", opts: ["S = {1, 2}", "S = {cara, sello}", "S = {sí, no, tal vez}", "S = ∅"], ans: 1 },
        { q: "Al lanzar dos monedas, ¿cuántos resultados tiene el espacio muestral?", opts: ["2", "3", "4", "8"], ans: 2 },
        { q: "Un evento que contiene un solo resultado del espacio muestral se llama:", opts: ["Evento compuesto", "Evento seguro", "Evento simple", "Evento imposible"], ans: 2 },
        { q: "Al tirar un dado, el evento 'sale un número menor que 7' es:", opts: ["Evento simple", "Evento imposible", "Evento seguro", "Evento compuesto pero no seguro"], ans: 2 },
        { q: "Si A = {2,4,6} y B = {5,6} al tirar un dado, A ∩ B es:", opts: ["{2,4,5,6}", "{6}", "{2,4}", "∅"], ans: 1 },
        { q: "El complemento de un evento A contiene:", opts: ["Los mismos elementos que A", "Todos los elementos del espacio muestral que no están en A", "Solo el primer elemento de A", "El conjunto vacío"], ans: 1 },
        { q: "Dos eventos son mutuamente excluyentes cuando:", opts: ["Su unión es el espacio muestral completo", "Su intersección es el conjunto vacío", "Tienen el mismo número de elementos", "Uno es el complemento del otro obligatoriamente"], ans: 1 },
        { q: "En el monitoreo de una API, el espacio muestral de los códigos de respuesta S = {200, 301, 404, 500} es un ejemplo de espacio muestral:", opts: ["Infinito", "Finito", "Vacío", "Determinista"], ans: 1 },
        { q: "En una prueba de software (QA), los eventos 'la prueba pasa' y 'la prueba falla' son:", opts: ["Complementarios y mutuamente excluyentes", "Independientes pero no excluyentes", "El mismo evento", "Eventos compuestos"], ans: 0 }
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
