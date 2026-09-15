document.addEventListener('DOMContentLoaded', function () {

    // ===== ACT 1: DRAG & DROP — DETERMINISTA VS ALEATORIO =====
    let draggedItem = null;

    document.querySelectorAll('.drag-item').forEach(item => {
        item.addEventListener('dragstart', function (e) {
            draggedItem = this;
            setTimeout(() => this.classList.add('dragging'), 0);
            e.dataTransfer.effectAllowed = 'move';
        });
        item.addEventListener('dragend', function () { this.classList.remove('dragging'); draggedItem = null; });
    });

    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); e.dataTransfer.dropEffect = 'move'; });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', function (e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            if (draggedItem) {
                this.appendChild(draggedItem);
            }
        });
    });

    const bank = document.getElementById('drag-bank');
    if (bank) {
        bank.addEventListener('dragover', e => { e.preventDefault(); bank.style.borderColor = '#15803d'; });
        bank.addEventListener('dragleave', () => bank.style.borderColor = '');
        bank.addEventListener('drop', e => {
            e.preventDefault(); bank.style.borderColor = '';
            if (draggedItem) bank.appendChild(draggedItem);
        });
    }

    const dragCorrect = {
        'zone-determinista': ['var-soltar-objeto', 'var-calculadora'],
        'zone-aleatorio': ['var-dado', 'var-app-falla', 'var-mensajes']
    };
    const dragOriginalOrder = ['var-soltar-objeto', 'var-calculadora', 'var-dado', 'var-app-falla', 'var-mensajes'];

    document.getElementById('check-drag-btn')?.addEventListener('click', function () {
        let score = 0;
        const fb = document.getElementById('drag-feedback');
        let html = '';
        Object.entries(dragCorrect).forEach(([zoneId, correctIds]) => {
            const zone = document.getElementById(zoneId);
            if (!zone) return;
            const placed = Array.from(zone.querySelectorAll('.drag-item')).map(el => el.dataset.var);
            const zoneLabel = zone.dataset.label || zoneId;
            const isOk = JSON.stringify(placed.slice().sort()) === JSON.stringify(correctIds.slice().sort());
            if (isOk) score += correctIds.length;
            html += `<p class="${isOk ? 'text-green-700' : 'text-red-600'} text-sm">${isOk ? '✔' : '✘'} <strong>${zoneLabel}:</strong> ${isOk ? 'Correcto' : 'Revisa esta categoría'}</p>`;
        });
        const total = Object.values(dragCorrect).flat().length;
        fb.innerHTML = html + `<p class="font-bold mt-2 ${score >= total * 0.7 ? 'text-green-700' : 'text-amber-700'}">Puntuación: ${score}/${total}</p>`;
        fb.classList.remove('hidden');
    });

    document.getElementById('reset-drag-btn')?.addEventListener('click', function () {
        const bankEl = document.getElementById('drag-bank');
        dragOriginalOrder.forEach(varId => {
            const el = document.querySelector(`.drag-item[data-var="${varId}"]`);
            if (el) bankEl.appendChild(el);
        });
        const fb = document.getElementById('drag-feedback');
        fb.innerHTML = '';
        fb.classList.add('hidden');
    });

    // ===== ACT 2: CLASIFICADOR DE EVENTOS =====
    const eventosData = [
        { id: 'ev1', desc: 'Al tirar un dado: A = {4}', correct: 'simple' },
        { id: 'ev2', desc: 'Al tirar un dado: B = {1,2,3,4,5,6}', correct: 'seguro' },
        { id: 'ev3', desc: 'Al tirar un dado: C = {2,4,6}', correct: 'compuesto' },
        { id: 'ev4', desc: 'Al tirar un dado: D = {7,8}', correct: 'imposible' },
        { id: 'ev5', desc: 'Código de respuesta: A = {200}', correct: 'simple' },
        { id: 'ev6', desc: 'Código de respuesta: E = {404,500}', correct: 'compuesto' },
    ];
    const cont = document.getElementById('eventos-container');
    if (cont) {
        eventosData.forEach(item => {
            const div = document.createElement('div');
            div.className = 'bg-white rounded-xl border border-slate-300 p-4';
            div.innerHTML = `
                <p class="font-semibold text-slate-700 mb-2 text-sm">${item.desc}</p>
                <div class="flex flex-wrap gap-2">
                    ${['simple', 'compuesto', 'seguro', 'imposible'].map(t =>
                        `<button onclick="checkEvento('${item.id}','${t}','${item.correct}')"
                            class="ev-btn-${item.id} px-3 py-1 rounded-full text-xs font-semibold border-2 border-slate-300 text-slate-600 hover:border-green-600 hover:text-green-700 transition-all">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`
                    ).join('')}
                </div>
                <div id="ev-hint-${item.id}" class="hidden text-xs rounded-lg p-2 mt-2"></div>`;
            cont.appendChild(div);
        });
    }

    // ===== ACT 3: VF =====
    const vfAnswers = { vf1: 'V', vf2: 'F', vf3: 'V', vf4: 'F', vf5: 'V', vf6: 'F' };
    document.getElementById('check-vf-btn')?.addEventListener('click', function () {
        let score = 0;
        Object.entries(vfAnswers).forEach(([id, correct]) => {
            const input = document.getElementById(id); if (!input) return;
            const val = input.value.trim().toUpperCase();
            input.classList.remove('correct', 'wrong');
            if (val === correct) { input.classList.add('correct'); score++; }
            else input.classList.add('wrong');
        });
        const total = Object.keys(vfAnswers).length;
        document.getElementById('vf-result').innerHTML =
            `<span class="${score === total ? 'text-green-700' : 'text-amber-700'} font-bold">${score} de ${total} correctas.</span>`;
    });
    document.getElementById('reset-vf-btn')?.addEventListener('click', function () {
        Object.keys(vfAnswers).forEach(id => { const i = document.getElementById(id); if (i) { i.value = ''; i.classList.remove('correct', 'wrong'); } });
        document.getElementById('vf-result').innerHTML = '';
    });
});

function checkEvento(id, selected, correct) {
    document.querySelectorAll(`.ev-btn-${id}`).forEach(btn => {
        btn.classList.remove('bg-green-600', 'bg-red-500', 'text-white', 'border-green-600', 'border-red-500');
        btn.classList.add('border-slate-300', 'text-slate-600');
    });
    const btn = document.querySelector(`.ev-btn-${id}[onclick*="'${selected}'"]`);
    const hintEl = document.getElementById(`ev-hint-${id}`);
    if (selected === correct) {
        btn.classList.add('bg-green-600', 'text-white', 'border-green-600');
        hintEl.className = 'text-xs rounded-lg p-2 mt-2 bg-green-50 text-green-800';
        hintEl.innerHTML = 'Correcto.';
    } else {
        btn.classList.add('bg-red-500', 'text-white', 'border-red-500');
        hintEl.className = 'text-xs rounded-lg p-2 mt-2 bg-red-50 text-red-800';
        hintEl.innerHTML = `No es correcto. La respuesta correcta es: ${correct}.`;
    }
    hintEl.classList.remove('hidden');
}