document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        { q: "La inferencia estadística consiste en:", opts: ["Calcular probabilidades con la regla de Laplace", "Obtener conclusiones sobre una población a partir de una muestra", "Construir tablas de frecuencia", "Diseñar experimentos deterministas"], ans: 1 },
        { q: "En la inferencia estadística, un parámetro (como μ) es:", opts: ["Un valor calculado con los datos de la muestra", "Un valor de la población, casi siempre desconocido", "Siempre igual al estadístico", "Un tipo de muestreo"], ans: 1 },
        { q: "Si todos los elementos de la población tienen la misma probabilidad de ser elegidos, el muestreo es:", opts: ["Sistemático", "Aleatorio simple", "Estratificado", "Por conglomerados"], ans: 1 },
        { q: "Cuando la población se divide en grupos homogéneos y se toma una muestra proporcional de cada uno, el muestreo es:", opts: ["Aleatorio simple", "Sistemático", "Estratificado", "Por conglomerados"], ans: 2 },
        { q: "Elegir 3 ciudades al azar de las 8 donde opera una app y estudiar a todos sus usuarios es un ejemplo de muestreo:", opts: ["Aleatorio simple", "Sistemático", "Estratificado", "Por conglomerados"], ans: 3 },
        { q: "Una muestra tiene sesgo cuando:", opts: ["Es muy grande", "No representa correctamente a la población", "Se toma de forma aleatoria", "Incluye a toda la población"], ans: 1 },
        { q: "Cuando solo responden a una encuesta los usuarios más motivados (muy satisfechos o muy molestos), el error se llama:", opts: ["Muestra por conveniencia", "Sesgo de autoselección", "Cobertura incompleta", "Muestreo sistemático"], ans: 1 },
        { q: "La estimación puntual consiste en:", opts: ["Dar un rango de valores probables para el parámetro", "Usar un único valor de la muestra como mejor aproximación del parámetro", "Calcular la probabilidad de un evento", "Diseñar un experimento aleatorio"], ans: 1 },
        { q: "Si en una muestra de 500 usuarios, 430 dicen estar satisfechos, la estimación puntual de la proporción poblacional es:", opts: ["500/430", "430 usuarios", "430/500 = 0.86", "0.5"], ans: 2 },
        { q: "El hecho de que distintas muestras de la misma población den estimaciones puntuales ligeramente diferentes se conoce como:", opts: ["Sesgo de muestreo", "Error de muestreo", "Muestreo sistemático", "Parámetro poblacional"], ans: 1 }
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
