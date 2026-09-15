document.addEventListener('DOMContentLoaded', function () {

    // ===== ACT 1: DRAG & DROP — SITUACIÓN → MEDIDA RECOMENDADA =====
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
                const prev = this.querySelector('.drag-item');
                if (prev) document.getElementById('drag-bank').appendChild(prev);
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
        'zone-media': ['var-tiempos-simetricos', 'var-notas-clase'],
        'zone-mediana': ['var-salarios', 'var-latencias-picos'],
        'zone-moda': ['var-navegador-mas-usado']
    };
    const dragOriginalOrder = ['var-tiempos-simetricos', 'var-notas-clase', 'var-salarios', 'var-latencias-picos', 'var-navegador-mas-usado'];

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

    // ===== ACT 2: CALCULADORA DE MEDIA, MEDIANA Y MODA =====
    document.getElementById('calc-central-btn')?.addEventListener('click', function () {
        const raw = document.getElementById('central-input').value;
        const datos = raw.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
        if (datos.length === 0) {
            document.getElementById('central-resultado').innerHTML = '<p class="text-red-600 text-sm">Ingresa al menos un número separado por comas.</p>';
            document.getElementById('central-resultado').classList.remove('hidden');
            return;
        }
        const n = datos.length;
        const media = datos.reduce((a, b) => a + b, 0) / n;
        const ordenados = datos.slice().sort((a, b) => a - b);
        let mediana;
        if (n % 2 === 1) mediana = ordenados[(n - 1) / 2];
        else mediana = (ordenados[n / 2 - 1] + ordenados[n / 2]) / 2;

        const freq = {};
        datos.forEach(d => { freq[d] = (freq[d] || 0) + 1; });
        const maxFreq = Math.max(...Object.values(freq));
        const modas = Object.keys(freq).filter(k => freq[k] === maxFreq);
        const modaTexto = maxFreq === 1 ? 'No hay moda (todos los valores son únicos)' : modas.join(', ');

        document.getElementById('central-resultado').innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div class="bg-green-50 rounded-lg p-3 border border-green-200 text-center">
                    <p class="text-xs text-green-700 font-semibold">MEDIA</p>
                    <p class="text-xl font-bold text-green-800">${media.toFixed(2)}</p>
                </div>
                <div class="bg-blue-50 rounded-lg p-3 border border-blue-200 text-center">
                    <p class="text-xs text-blue-700 font-semibold">MEDIANA</p>
                    <p class="text-xl font-bold text-blue-800">${mediana.toFixed(2)}</p>
                </div>
                <div class="bg-amber-50 rounded-lg p-3 border border-amber-200 text-center">
                    <p class="text-xs text-amber-700 font-semibold">MODA</p>
                    <p class="text-lg font-bold text-amber-800">${modaTexto}</p>
                </div>
            </div>
            <p class="text-xs text-slate-500 mt-3">n = ${n} datos ordenados: ${ordenados.join(', ')}</p>`;
        document.getElementById('central-resultado').classList.remove('hidden');
    });

    document.getElementById('reset-central-btn')?.addEventListener('click', function () {
        document.getElementById('central-input').value = '';
        document.getElementById('central-resultado').innerHTML = '';
        document.getElementById('central-resultado').classList.add('hidden');
    });

    // ===== ACT 3: CALCULADORA DE DISPERSIÓN =====
    document.getElementById('calc-disp-btn')?.addEventListener('click', function () {
        const raw = document.getElementById('disp-input').value;
        const datos = raw.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
        if (datos.length < 2) {
            document.getElementById('disp-resultado').innerHTML = '<p class="text-red-600 text-sm">Ingresa al menos dos números separados por comas.</p>';
            document.getElementById('disp-resultado').classList.remove('hidden');
            return;
        }
        const n = datos.length;
        const media = datos.reduce((a, b) => a + b, 0) / n;
        const rango = Math.max(...datos) - Math.min(...datos);
        const sumaCuadrados = datos.reduce((acc, x) => acc + Math.pow(x - media, 2), 0);
        const varianza = sumaCuadrados / (n - 1);
        const desviacion = Math.sqrt(varianza);
        const cv = media !== 0 ? (desviacion / media) * 100 : 0;
        let interpretacionCV = 'Muy homogéneo';
        let colorCV = 'text-green-700';
        if (cv >= 30) { interpretacionCV = 'Heterogéneo'; colorCV = 'text-red-600'; }
        else if (cv >= 10) { interpretacionCV = 'Moderado'; colorCV = 'text-amber-700'; }

        document.getElementById('disp-resultado').innerHTML = `
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                <div class="bg-slate-50 rounded-lg p-3 border border-slate-200 text-center">
                    <p class="text-xs text-slate-600 font-semibold">RANGO</p>
                    <p class="text-lg font-bold text-slate-800">${rango.toFixed(2)}</p>
                </div>
                <div class="bg-green-50 rounded-lg p-3 border border-green-200 text-center">
                    <p class="text-xs text-green-700 font-semibold">VARIANZA (s²)</p>
                    <p class="text-lg font-bold text-green-800">${varianza.toFixed(2)}</p>
                </div>
                <div class="bg-blue-50 rounded-lg p-3 border border-blue-200 text-center">
                    <p class="text-xs text-blue-700 font-semibold">DESV. ESTÁNDAR (s)</p>
                    <p class="text-lg font-bold text-blue-800">${desviacion.toFixed(2)}</p>
                </div>
                <div class="bg-amber-50 rounded-lg p-3 border border-amber-200 text-center">
                    <p class="text-xs text-amber-700 font-semibold">CV</p>
                    <p class="text-lg font-bold text-amber-800">${cv.toFixed(1)}%</p>
                </div>
            </div>
            <p class="mt-3 text-sm ${colorCV} font-semibold">Interpretación: variabilidad ${interpretacionCV.toLowerCase()} (CV = ${cv.toFixed(1)}%).</p>
            <p class="text-xs text-slate-500 mt-1">Media = ${media.toFixed(2)}, n = ${n} datos.</p>`;
        document.getElementById('disp-resultado').classList.remove('hidden');
    });

    document.getElementById('reset-disp-btn')?.addEventListener('click', function () {
        document.getElementById('disp-input').value = '';
        document.getElementById('disp-resultado').innerHTML = '';
        document.getElementById('disp-resultado').classList.add('hidden');
    });

    // ===== ACT 4: VF =====
    const vfAnswers = { vf1: 'F', vf2: 'V', vf3: 'V', vf4: 'F', vf5: 'V', vf6: 'F' };
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
