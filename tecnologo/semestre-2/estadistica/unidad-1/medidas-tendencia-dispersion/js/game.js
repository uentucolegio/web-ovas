document.addEventListener('DOMContentLoaded', function () {
    const casos = [
        { nombre: 'Sistema operativo más usado por 500 clientes', esNumerica: false, tieneOrden: false, tieneOutliers: null, resultado: 'Moda' },
        { nombre: 'Salarios de una empresa, con un valor muy alto (el del gerente)', esNumerica: true, tieneOrden: true, tieneOutliers: true, resultado: 'Mediana' },
        { nombre: 'Tiempos de respuesta de una API, simétricos y sin picos', esNumerica: true, tieneOrden: true, tieneOutliers: false, resultado: 'Media' },
        { nombre: 'Nivel de satisfacción del cliente (1 a 5 estrellas)', esNumerica: false, tieneOrden: true, tieneOutliers: null, resultado: 'Mediana (y moda)' },
        { nombre: 'Latencias de red con picos ocasionales de sobrecarga', esNumerica: true, tieneOrden: true, tieneOutliers: true, resultado: 'Mediana' },
        { nombre: 'Calificaciones de un examen, distribución normal sin outliers', esNumerica: true, tieneOrden: true, tieneOutliers: false, resultado: 'Media' },
        { nombre: 'Lenguaje de programación preferido por el equipo', esNumerica: false, tieneOrden: false, tieneOutliers: null, resultado: 'Moda' },
        { nombre: 'Número de commits diarios, con un día de migración masiva (outlier)', esNumerica: true, tieneOrden: true, tieneOutliers: true, resultado: 'Mediana' }
    ];

    let orden = [];
    let idx = 0;
    let score = 0;
    let total = 0;

    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function startGame() {
        orden = shuffle(casos);
        idx = 0; score = 0; total = 0;
        document.getElementById('game-final-result').classList.add('hidden');
        document.getElementById('game-next-btn').classList.add('hidden');
        updateScore();
        loadCaso();
    }

    function updateScore() {
        document.getElementById('game-score').textContent = `Puntaje: ${score} / ${total}`;
    }

    function updateProgress() {
        const pct = Math.round((idx / orden.length) * 100);
        document.getElementById('game-progress-fill').style.width = pct + '%';
    }

    function loadCaso() {
        if (idx >= orden.length) { showGameEnd(); return; }
        updateProgress();
        const c = orden[idx];
        document.getElementById('game-var-name').textContent = c.nombre;
        document.getElementById('game-final-result').classList.add('hidden');
        document.getElementById('game-next-btn').classList.add('hidden');
        renderStep1();
    }

    function renderStep1() {
        const c = document.getElementById('game-question-container');
        c.innerHTML = `
            <div class="game-step">
                <p class="font-semibold text-slate-700 mb-2">Paso 1. ¿La variable es numérica (se puede sumar y promediar) o es una categoría?</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep1(true)">Numérica</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep1(false)">Categoría</div>
                </div>
            </div>`;
    }

    window.gameAnswerStep1 = function (userSaysNumerica) {
        const c = orden[idx];
        total++;
        const correct = userSaysNumerica === c.esNumerica;
        markOptions(correct, userSaysNumerica ? 0 : 1);
        if (correct) score++;
        updateScore();
        setTimeout(() => {
            if (c.esNumerica) renderStep2(); else showResult(c);
        }, 900);
    };

    function renderStep2() {
        const c = document.getElementById('game-question-container');
        c.innerHTML += `
            <div class="game-step mt-4">
                <p class="font-semibold text-slate-700 mb-2">Paso 2. Es numérica. ¿Existen valores atípicos (outliers) o la distribución es asimétrica?</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep2(true)">Sí, hay outliers</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep2(false)">No, es simétrica</div>
                </div>
            </div>`;
    }

    window.gameAnswerStep2 = function (userSaysOutliers) {
        const c = orden[idx];
        total++;
        const correct = userSaysOutliers === c.tieneOutliers;
        markOptions(correct, userSaysOutliers ? 0 : 1);
        if (correct) score++;
        updateScore();
        setTimeout(() => showResult(c), 900);
    };

    function markOptions(correct, chosenIndex) {
        const steps = document.querySelectorAll('#game-question-container .game-step');
        const lastStep = steps[steps.length - 1];
        const allOpts = lastStep.querySelectorAll('.game-option');
        allOpts.forEach((el, i) => {
            el.classList.add('disabled');
            if (i === chosenIndex) el.classList.add(correct ? 'correct' : 'wrong');
        });
    }

    function showResult(c) {
        const box = document.getElementById('game-final-result');
        box.className = 'mt-4 pop-in bg-green-50 border-2 border-green-600 rounded-xl p-4 text-center';
        box.innerHTML = `
            <p class="text-sm text-slate-600">Medida de tendencia central recomendada para "<strong>${c.nombre}</strong>":</p>
            <p class="text-xl font-bold text-green-800 mt-1">${c.resultado}</p>`;
        box.classList.remove('hidden');
        document.getElementById('game-next-btn').classList.remove('hidden');
    }

    function showGameEnd() {
        updateProgress();
        document.getElementById('game-question-container').innerHTML = '';
        document.getElementById('game-var-name').textContent = 'Juego completado';
        const box = document.getElementById('game-final-result');
        const pct = total > 0 ? Math.round((score / total) * 100) : 0;
        box.className = `mt-4 pop-in rounded-xl p-5 text-center border-2 ${pct >= 70 ? 'bg-green-50 border-green-600' : 'bg-amber-50 border-amber-500'}`;
        box.innerHTML = `
            <p class="text-lg font-bold ${pct >= 70 ? 'text-green-800' : 'text-amber-800'}">Juego terminado</p>
            <p class="text-sm text-slate-600 mt-1">Acertaste ${score} de ${total} pasos (${pct}%).</p>`;
        box.classList.remove('hidden');
        document.getElementById('game-next-btn').classList.add('hidden');
    }

    document.getElementById('game-next-btn')?.addEventListener('click', function () {
        idx++;
        loadCaso();
    });
    document.getElementById('game-restart-btn')?.addEventListener('click', startGame);

    if (document.getElementById('game-var-card')) startGame();
});
