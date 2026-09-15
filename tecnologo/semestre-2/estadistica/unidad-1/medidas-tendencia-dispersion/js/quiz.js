document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        { q: "¿Cuál es la fórmula de la media aritmética para datos simples?", opts: ["Suma de los datos entre n", "El dato central al ordenar", "El valor más frecuente", "Máximo menos mínimo"], ans: 0 },
        { q: "¿Por qué la mediana es una medida robusta ante valores atípicos?", opts: ["Porque usa todos los datos por igual", "Porque solo depende de la posición central, no del valor extremo", "Porque siempre es igual a la media", "Porque se calcula con la varianza"], ans: 1 },
        { q: "¿Cuál es la única medida de tendencia central válida para variables cualitativas nominales?", opts: ["La media", "La mediana", "La moda", "La desviación estándar"], ans: 2 },
        { q: "Si n es par, la mediana se calcula como:", opts: ["El dato en la posición (n+1)/2", "El promedio de los dos datos centrales", "El valor más repetido", "La suma de todos los datos entre n"], ans: 1 },
        { q: "¿Qué mide la varianza?", opts: ["El valor central de los datos", "El promedio de los cuadrados de las desviaciones respecto a la media", "La diferencia entre el máximo y el mínimo", "La proporción de datos por debajo de un valor"], ans: 1 },
        { q: "¿Por qué se usa la desviación estándar en lugar de la varianza para interpretar resultados?", opts: ["Porque siempre es menor que la varianza", "Porque recupera las unidades originales de la variable", "Porque no depende de la media", "Porque es más fácil de calcular"], ans: 1 },
        { q: "¿Para qué sirve el coeficiente de variación (CV)?", opts: ["Para calcular la mediana de datos agrupados", "Para comparar la variabilidad de conjuntos con unidades o magnitudes distintas", "Para encontrar la moda de una variable", "Para calcular el rango de una muestra"], ans: 1 },
        { q: "Según la regla práctica, un CV superior al 30% indica un conjunto de datos:", opts: ["Muy homogéneo", "Moderadamente variable", "Heterogéneo", "Sin variabilidad"], ans: 2 },
        { q: "Dos servidores tienen la misma media de tiempos de respuesta, pero uno tiene mayor desviación estándar. ¿Qué significa esto?", opts: ["El servidor con mayor desviación es más rápido en promedio", "El servidor con mayor desviación es menos predecible", "Ambos servidores son idénticos", "El servidor con menor desviación tiene errores"], ans: 1 },
        { q: "En un reporte de rendimiento web con datos asimétricos y outliers, ¿qué medida de tendencia central es más recomendable reportar?", opts: ["La media aritmética", "La moda", "La mediana", "El rango"], ans: 2 }
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
