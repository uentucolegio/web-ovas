document.addEventListener('DOMContentLoaded', function () {

    // ===== ACT 1: DRAG & DROP — SERIE VS PARALELO =====
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
        'zone-empirica': ['var-app-2000', 'var-spam-2400', 'var-tiros-libres'],
        'zone-teorica': ['var-dado-normal', 'var-moneda-justa']
    };
    const dragOriginalOrder = ['var-app-2000', 'var-spam-2400', 'var-tiros-libres', 'var-dado-normal', 'var-moneda-justa'];

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

    // ===== ACT 2: CALCULADORA DE PROBABILIDAD EMPÍRICA =====
    document.getElementById('calc-empirica-btn')?.addEventListener('click', function () {
        const ocurrencias = parseFloat(document.getElementById('emp-ocurrencias').value) || 0;
        const total = parseFloat(document.getElementById('emp-total').value) || 0;
        const resEl = document.getElementById('emp-resultado');
        if (total === 0) {
            resEl.innerHTML = '<p class="text-red-600 text-sm">El total de repeticiones debe ser mayor que cero.</p>';
            resEl.classList.remove('hidden');
            return;
        }
        const p = ocurrencias / total;
        resEl.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-center text-sm">
                <div class="bg-green-50 rounded-lg p-3 border border-green-200"><p class="text-xs text-green-700 font-semibold">Fracción</p><p class="text-lg font-bold text-green-800">${ocurrencias}/${total}</p></div>
                <div class="bg-blue-50 rounded-lg p-3 border border-blue-200"><p class="text-xs text-blue-700 font-semibold">Decimal</p><p class="text-lg font-bold text-blue-800">${p.toFixed(4)}</p></div>
                <div class="bg-amber-50 rounded-lg p-3 border border-amber-200"><p class="text-xs text-amber-700 font-semibold">Porcentaje</p><p class="text-lg font-bold text-amber-800">${(p * 100).toFixed(2)}%</p></div>
            </div>`;
        resEl.classList.remove('hidden');
    });
    document.getElementById('reset-empirica-btn')?.addEventListener('click', function () {
        document.getElementById('emp-ocurrencias').value = '';
        document.getElementById('emp-total').value = '';
        document.getElementById('emp-resultado').innerHTML = '';
        document.getElementById('emp-resultado').classList.add('hidden');
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
