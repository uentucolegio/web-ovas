document.addEventListener('DOMContentLoaded', function () {
    const casos = [
        { nombre: 'Una app se abrió 2000 veces y falló en 60 ocasiones', tipo: 'empirica', resultado: 'Probabilidad empírica' },
        { nombre: 'Al lanzar un dado equilibrado, P(sale 6) = 1/6', tipo: 'teorica', resultado: 'Probabilidad teórica (Laplace)' },
        { nombre: 'De 2400 correos, 312 resultaron ser spam', tipo: 'empirica', resultado: 'Probabilidad empírica' },
        { nombre: 'Al lanzar una moneda justa, P(cara) = 1/2', tipo: 'teorica', resultado: 'Probabilidad teórica (Laplace)' },
        { nombre: 'Un jugador anotó 52 de 80 tiros libres', tipo: 'empirica', resultado: 'Probabilidad empírica' },
        { nombre: 'Se ejecutaron 500 pruebas automatizadas y 64 fallaron', tipo: 'empirica', resultado: 'Probabilidad empírica' },
        { nombre: 'En una baraja de 52 cartas, P(sacar un as) = 4/52', tipo: 'teorica', resultado: 'Probabilidad teórica (Laplace)' },
        { nombre: 'Un servidor registró 800 usuarios nuevos y 352 siguieron activos', tipo: 'empirica', resultado: 'Probabilidad empírica' }
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
        renderStep();
    }

    function renderStep() {
        const c = document.getElementById('game-question-container');
        c.innerHTML = `
            <div class="game-step">
                <p class="font-semibold text-slate-700 mb-2">¿Esta probabilidad se calculó con datos reales (repitiendo el experimento) o se dedujo por teoría (casos favorables sobre posibles)?</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswer('empirica')">Con datos reales → Empírica</div>
                    <div class="game-option bg-white rounded-lg p-3 text-center font-semibold text-slate-700" onclick="gameAnswer('teorica')">Por teoría → Laplace / Teórica</div>
                </div>
            </div>`;
    }

    window.gameAnswer = function (userChoice) {
        const c = orden[idx];
        total++;
        const correct = userChoice === c.tipo;
        markOptions(correct, userChoice === 'empirica' ? 0 : 1);
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
            <p class="text-sm text-slate-600">"<strong>${c.nombre}</strong>" es un ejemplo de:</p>
            <p class="text-xl font-bold text-green-800 mt-1">${c.resultado}</p>`;
        box.classList.remove('hidden');
        document.getElementById('game-next-btn').classList.remove('hidden');
    }

    function showGameEnd() {
        updateProgress();
        document.getElementById('game-question-container').innerHTML = '';
        document.getElementById('game-var-name').textContent = 'Auditoría completada';
        const box = document.getElementById('game-final-result');
        const pct = total > 0 ? Math.round((score / total) * 100) : 0;
        box.className = `mt-4 pop-in rounded-xl p-5 text-center border-2 ${pct >= 70 ? 'bg-green-50 border-green-600' : 'bg-amber-50 border-amber-500'}`;
        box.innerHTML = `
            <p class="text-lg font-bold ${pct >= 70 ? 'text-green-800' : 'text-amber-800'}">Juego terminado</p>
            <p class="text-sm text-slate-600 mt-1">Acertaste ${score} de ${total} casos (${pct}%).</p>`;
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
