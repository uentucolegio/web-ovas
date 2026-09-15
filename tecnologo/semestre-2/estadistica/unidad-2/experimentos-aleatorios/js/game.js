document.addEventListener('DOMContentLoaded', function () {
    const casos = [
        { nombre: 'Al tirar un dado: A = "sale el número 5"', esVacio: false, tamano: 1, esTodo: false, resultado: 'Evento simple' },
        { nombre: 'Al tirar un dado: B = "sale un número del 1 al 6"', esVacio: false, tamano: 6, esTodo: true, resultado: 'Evento seguro' },
        { nombre: 'Al tirar un dado: C = "sale un número mayor que 10"', esVacio: true, tamano: 0, esTodo: false, resultado: 'Evento imposible' },
        { nombre: 'Al tirar un dado: D = "sale un número par"', esVacio: false, tamano: 3, esTodo: false, resultado: 'Evento compuesto' },
        { nombre: 'Código de respuesta de una API: A = "el código es 200"', esVacio: false, tamano: 1, esTodo: false, resultado: 'Evento simple' },
        { nombre: 'Código de respuesta de una API: B = "hubo algún error" = {404, 500}', esVacio: false, tamano: 2, esTodo: false, resultado: 'Evento compuesto' },
        { nombre: 'Login de usuario: C = "el código es un valor del espacio muestral completo"', esVacio: false, tamano: 4, esTodo: true, resultado: 'Evento seguro' },
        { nombre: 'Login de usuario: D = "el código es 999" (no existe en el sistema)', esVacio: true, tamano: 0, esTodo: false, resultado: 'Evento imposible' }
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
                <p class="font-semibold text-slate-700 mb-2">Paso 1. ¿El evento no contiene ningún resultado posible (conjunto vacío)?</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep1(true)">Sí, está vacío</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep1(false)">No, tiene elementos</div>
                </div>
            </div>`;
    }

    window.gameAnswerStep1 = function (userSaysVacio) {
        const c = orden[idx];
        total++;
        const correct = userSaysVacio === c.esVacio;
        markOptions(correct, userSaysVacio ? 0 : 1);
        if (correct) score++;
        updateScore();
        setTimeout(() => {
            if (c.esVacio) showResult(c); else renderStep2();
        }, 900);
    };

    function renderStep2() {
        const c = document.getElementById('game-question-container');
        c.innerHTML += `
            <div class="game-step mt-4">
                <p class="font-semibold text-slate-700 mb-2">Paso 2. ¿El evento contiene TODOS los resultados del espacio muestral?</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep2(true)">Sí, es el espacio completo</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep2(false)">No, es un subconjunto parcial</div>
                </div>
            </div>`;
    }

    window.gameAnswerStep2 = function (userSaysTodo) {
        const c = orden[idx];
        total++;
        const correct = userSaysTodo === c.esTodo;
        markOptions(correct, userSaysTodo ? 0 : 1);
        if (correct) score++;
        updateScore();
        setTimeout(() => {
            if (c.esTodo) { showResult(c); } else renderStep3();
        }, 900);
    };

    function renderStep3() {
        const c = document.getElementById('game-question-container');
        c.innerHTML += `
            <div class="game-step mt-4">
                <p class="font-semibold text-slate-700 mb-2">Paso 3. ¿El evento contiene un único resultado o más de uno?</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep3(1)">Un único resultado</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswerStep3(2)">Dos o más resultados</div>
                </div>
            </div>`;
    }

    window.gameAnswerStep3 = function (userChoice) {
        const c = orden[idx];
        total++;
        const esSimple = c.tamano === 1;
        const userSaysSimple = userChoice === 1;
        const correct = userSaysSimple === esSimple;
        markOptions(correct, userChoice === 1 ? 0 : 1);
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
            <p class="text-sm text-slate-600">Clasificación de "<strong>${c.nombre}</strong>":</p>
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
