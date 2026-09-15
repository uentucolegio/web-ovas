document.addEventListener('DOMContentLoaded', function () {

    // ===== ACT 1: DRAG & DROP — INDEPENDIENTE VS DEPENDIENTE =====
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
        'zone-independiente': ['var-monedas', 'var-usuarios-distintos'],
        'zone-dependiente': ['var-cartas-sin-reemplazo', 'var-peticiones-saturado', 'var-android-falla']
    };
    const dragOriginalOrder = ['var-monedas', 'var-usuarios-distintos', 'var-cartas-sin-reemplazo', 'var-peticiones-saturado', 'var-android-falla'];

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

    // ===== ACT 2: CALCULADORA DE TABLA DE CONTINGENCIA (actividad, editable libre) =====
    document.getElementById('calc-tabla-btn')?.addEventListener('click', function () {
        const a = parseFloat(document.getElementById('act-celda-a').value) || 0;
        const b = parseFloat(document.getElementById('act-celda-b').value) || 0;
        const c = parseFloat(document.getElementById('act-celda-c').value) || 0;
        const d = parseFloat(document.getElementById('act-celda-d').value) || 0;
        const filaA_total = a + b;
        const filaB_total = c + d;
        const colA_total = a + c;
        const colB_total = b + d;
        const total = a + b + c + d;
        if (total === 0) {
            document.getElementById('act-tabla-resultado').innerHTML = '<p class="text-red-600 text-sm">Ingresa al menos un valor mayor que cero.</p>';
            document.getElementById('act-tabla-resultado').classList.remove('hidden');
            return;
        }
        const pColA = (colA_total / total);
        const pAdadoFilaA = filaA_total > 0 ? (a / filaA_total) : 0;
        const pAdadoFilaB = filaB_total > 0 ? (c / filaB_total) : 0;
        document.getElementById('act-tabla-resultado').innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-sm">
                <div class="bg-green-50 rounded-lg p-3 border border-green-200 text-center">
                    <p class="text-xs text-green-700 font-semibold">P(columna A)</p>
                    <p class="text-lg font-bold text-green-800">${pColA.toFixed(3)}</p>
                </div>
                <div class="bg-blue-50 rounded-lg p-3 border border-blue-200 text-center">
                    <p class="text-xs text-blue-700 font-semibold">P(col A | fila A)</p>
                    <p class="text-lg font-bold text-blue-800">${pAdadoFilaA.toFixed(3)}</p>
                </div>
                <div class="bg-amber-50 rounded-lg p-3 border border-amber-200 text-center">
                    <p class="text-xs text-amber-700 font-semibold">P(col A | fila B)</p>
                    <p class="text-lg font-bold text-amber-800">${pAdadoFilaB.toFixed(3)}</p>
                </div>
            </div>
            <p class="text-xs text-slate-500 mt-3">Total = ${total}. Si P(col A) ≈ P(col A | fila A) ≈ P(col A | fila B), los eventos son aproximadamente independientes.</p>`;
        document.getElementById('act-tabla-resultado').classList.remove('hidden');
    });
    document.getElementById('reset-tabla-btn')?.addEventListener('click', function () {
        ['act-celda-a', 'act-celda-b', 'act-celda-c', 'act-celda-d'].forEach(id => { document.getElementById(id).value = ''; });
        document.getElementById('act-tabla-resultado').innerHTML = '';
        document.getElementById('act-tabla-resultado').classList.add('hidden');
    });

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
