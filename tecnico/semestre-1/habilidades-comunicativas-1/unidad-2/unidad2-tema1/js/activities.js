// JS para verificación de actividades
const checkActivityBtn = document.getElementById('check-activity-btn');
if (checkActivityBtn) {
    checkActivityBtn.addEventListener('click', () => {
        const selects = document.querySelectorAll('.activity-select');
        if (!selects.length) return; // No hay selects en esta página
        let correctAnswers = 0;
        selects.forEach(select => {
            if (select.value === select.dataset.answer) {
                correctAnswers++;
                select.classList.add('border-green-500');
                select.classList.remove('border-red-500');
            } else {
                select.classList.add('border-red-500');
                select.classList.remove('border-green-500');
            }
        });
        const total = selects.length;
        const resultDiv = document.getElementById('activity-result');
        if (resultDiv) {
            resultDiv.textContent = `Obtuviste ${correctAnswers} de ${total} respuestas correctas.`;
            resultDiv.className = correctAnswers === total ? 'mt-4 font-medium text-green-700' : 'mt-4 font-medium text-red-700';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Configuración Drag & Drop si existe la actividad
    const bank = document.getElementById('dnd-options-bank');
    const dropzones = document.querySelectorAll('.dropzone');

    if (bank && dropzones.length) {
        const makeDraggable = (el) => {
            el.addEventListener('dragstart', (e) => {
                el.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', el.dataset.value || el.textContent.trim());
            });
            el.addEventListener('dragend', () => {
                el.classList.remove('dragging');
            });
        };

        // Inicializar elementos arrastrables existentes
        bank.querySelectorAll('.draggable-option').forEach(makeDraggable);

        // Permitir soltar en el banco para devolver opciones
        bank.addEventListener('dragover', (e) => {
            if (document.querySelector('.draggable-option.dragging')) {
                e.preventDefault();
            }
        });
        bank.addEventListener('drop', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.draggable-option.dragging');
            if (dragging && dragging.parentElement) {
                bank.appendChild(dragging);
            }
        });

        // Configurar cada zona de destino
        dropzones.forEach((dz) => {
            dz.addEventListener('dragover', (e) => {
                if (document.querySelector('.draggable-option.dragging')) {
                    e.preventDefault();
                    dz.classList.add('dz-over');
                }
            });
            dz.addEventListener('dragleave', () => dz.classList.remove('dz-over'));
            dz.addEventListener('drop', (e) => {
                e.preventDefault();
                dz.classList.remove('dz-over');
                const dragging = document.querySelector('.draggable-option.dragging');
                if (!dragging) return;
                // Si ya hay una opción en la zona, devolverla al banco
                const existing = dz.querySelector('.draggable-option');
                if (existing) {
                    bank.appendChild(existing);
                }
                dz.appendChild(dragging);
            });
        });
    }

    const checkBtn = document.getElementById('check-activity-btn');
    if (checkBtn) {
        checkBtn.addEventListener('click', function() {
            // Verificación ejercicios de entrada (si existen)
            const inputs = document.querySelectorAll('.activity-input');
            let correctas = 0;
            let totalInputs = 0;
            let feedback = [];
            if (inputs.length) {
                const respuestas = [
                    ['6', '6.25', '6,25', '6 plugins'],
                    ['12'],
                    ['10'],
                ];
                totalInputs = inputs.length;
                inputs.forEach((input, idx) => {
                    const val = input.value.trim().replace(',', '.').toLowerCase();
                    if (respuestas[idx] && respuestas[idx].some(r => val === r)) {
                        input.classList.remove('border-red-500');
                        input.classList.add('border-green-500');
                        correctas++;
                        feedback.push(`Ejercicio ${idx+1}: ✔️ Correcto`);
                    } else {
                        input.classList.remove('border-green-500');
                        input.classList.add('border-red-500');
                        feedback.push(`Ejercicio ${idx+1}: ❌ Incorrecto`);
                    }
                });
            }

            // Verificación Drag & Drop (Actividad DnD)
            let dndCorrectas = 0;
            const dndZones = document.querySelectorAll('.dropzone');
            dndZones.forEach((dz, idx) => {
                dz.classList.remove('dz-correct', 'dz-incorrect');
                const ans = (dz.dataset.answer || '').trim().toLowerCase();
                const placed = dz.querySelector('.draggable-option');
                if (placed) {
                    const val = (placed.dataset.value || placed.textContent).trim().toLowerCase();
                    if (val === ans) {
                        dndCorrectas++;
                        dz.classList.add('dz-correct');
                    } else {
                        dz.classList.add('dz-incorrect');
                    }
                } else {
                    dz.classList.add('dz-incorrect');
                }
            });

            const resultDiv = document.getElementById('activity-result');
            const totalDnd = dndZones.length || 0;
            const allCorrect = (totalInputs ? (correctas === totalInputs) : true) && (dndCorrectas === totalDnd);

            const parts = [];
            if (totalInputs) {
                parts.push(`<strong>Respuestas correctas (Ejercicios 1-3): ${correctas} de ${totalInputs}</strong>`);
            }
            parts.push(`Actividad de arrastrar y soltar: ${dndCorrectas} de ${totalDnd}`);

            resultDiv.innerHTML = parts.join('<br>') + (feedback.length ? `<br>${feedback.join('<br>')}` : '');
            resultDiv.className = allCorrect ? 'mt-4 font-medium text-green-700' : 'mt-4 font-medium text-red-700';
        });
    }
});