document.addEventListener('DOMContentLoaded', function () {
    const casos = [
        { nombre: 'Un programa elige 500 usuarios al azar de una lista de 10 000, con igual probabilidad para todos', esProbabilistico: true, metodo: 'simple', resultado: 'Muestreo probabilístico — Aleatorio simple' },
        { nombre: 'Se revisa cada 20.° registro de un archivo de logs del servidor', esProbabilistico: true, metodo: 'sistematico', resultado: 'Muestreo probabilístico — Sistemático' },
        { nombre: 'Se arma la muestra respetando la proporción real de 70% Android y 30% iPhone', esProbabilistico: true, metodo: 'estratificado', resultado: 'Muestreo probabilístico — Estratificado' },
        { nombre: 'Se eligen 3 ciudades al azar de las 10 donde opera la app y se estudia a todos sus usuarios', esProbabilistico: true, metodo: 'conglomerados', resultado: 'Muestreo probabilístico — Por conglomerados' },
        { nombre: 'Una empresa mide la velocidad de su app solo en los celulares de sus propios empleados', esProbabilistico: false, metodo: null, resultado: 'Muestreo no probabilístico — Sesgado (por conveniencia)' },
        { nombre: 'Se publica una encuesta opcional dentro de la app y solo responde el 4% de los usuarios', esProbabilistico: false, metodo: null, resultado: 'Muestreo no probabilístico — Sesgo de autoselección' },
        { nombre: 'Un sistema genera 200 números aleatorios entre 1 y 20 000 para seleccionar usuarios', esProbabilistico: true, metodo: 'simple', resultado: 'Muestreo probabilístico — Aleatorio simple' },
        { nombre: 'Se seleccionan 4 sucursales completas al azar de las 30 que tiene la empresa', esProbabilistico: true, metodo: 'conglomerados', resultado: 'Muestreo probabilístico — Por conglomerados' }
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
                <p class="font-semibold text-slate-700 mb-2">Paso 1. ¿Todos los elementos de la población tuvieron una probabilidad conocida de ser elegidos?</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep1(true)">Sí → Probabilístico</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep1(false)">No → Sesgado / no probabilístico</div>
                </div>
            </div>`;
    }

    window.gameAnswerStep1 = function (userSaysProb) {
        const c = orden[idx];
        total++;
        const correct = userSaysProb === c.esProbabilistico;
        markOptions(correct, userSaysProb ? 0 : 1);
        if (correct) score++;
        updateScore();
        setTimeout(() => {
            if (c.esProbabilistico) renderStep2(); else showResult(c);
        }, 900);
    };

    function renderStep2() {
        const c = document.getElementById('game-question-container');
        c.innerHTML += `
            <div class="game-step mt-4">
                <p class="font-semibold text-slate-700 mb-2">Paso 2. Es probabilístico. ¿Qué método específico es?</p>
                <div class="grid grid-cols-2 gap-3">
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700 text-sm" onclick="gameAnswerStep2('simple')">Aleatorio simple</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700 text-sm" onclick="gameAnswerStep2('sistematico')">Sistemático</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700 text-sm" onclick="gameAnswerStep2('estratificado')">Estratificado</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700 text-sm" onclick="gameAnswerStep2('conglomerados')">Por conglomerados</div>
                </div>
            </div>`;
    }

    const metodoIndex = { simple: 0, sistematico: 1, estratificado: 2, conglomerados: 3 };
    window.gameAnswerStep2 = function (userChoice) {
        const c = orden[idx];
        total++;
        const correct = userChoice === c.metodo;
        markOptions(correct, metodoIndex[userChoice]);
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
            <p class="text-sm text-slate-600">"<strong>${c.nombre}</strong>" corresponde a:</p>
            <p class="text-xl font-bold text-green-800 mt-1">${c.resultado}</p>`;
        box.classList.remove('hidden');
        document.getElementById('game-next-btn').classList.remove('hidden');
    }

    function showGameEnd() {
        updateProgress();
        document.getElementById('game-question-container').innerHTML = '';
        document.getElementById('game-var-name').textContent = 'Caso resuelto, Detective';
        const box = document.getElementById('game-final-result');
        const pct = total > 0 ? Math.round((score / total) * 100) : 0;
        box.className = `mt-4 pop-in rounded-xl p-5 text-center border-2 ${pct >= 70 ? 'bg-green-50 border-green-600' : 'bg-amber-50 border-amber-500'}`;
        box.innerHTML = `
            <p class="text-lg font-bold ${pct >= 70 ? 'text-green-800' : 'text-amber-800'}">Investigación terminada</p>
            <p class="text-sm text-slate-600 mt-1">Acertaste ${score} de ${total} pistas (${pct}%).</p>`;
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
