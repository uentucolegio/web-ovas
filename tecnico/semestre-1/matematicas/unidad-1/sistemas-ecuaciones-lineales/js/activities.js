// JS para verificación de actividades
const checkActivityBtn = document.getElementById('check-activity-btn');
if (checkActivityBtn) {
    checkActivityBtn.addEventListener('click', () => {
        const selects = document.querySelectorAll('.activity-select');
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
        const resultDiv = document.getElementById('activity-result');
        resultDiv.textContent = `Obtuviste ${correctAnswers} de ${activityData.length} respuestas correctas.`;
        resultDiv.className = correctAnswers === activityData.length ? 'mt-4 font-medium text-green-700' : 'mt-4 font-medium text-red-700';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const checkBtn = document.getElementById('check-activity-btn');
    if (checkBtn) {
        checkBtn.addEventListener('click', function() {
            const inputs = document.querySelectorAll('.activity-input');
            const respuestas = [
                ['4,2','4, 2','4 ,2','4 , 2'], // Actividad 1: solución del sistema
                ['b'], // Actividad 2: punto de intersección
                ['b'], // Actividad 3: infinitas soluciones (coincidentes)
                ['4']  // Actividad 4: método de sustitución
            ];
            let correctas = 0;
            let feedback = [];
            inputs.forEach((input, idx) => {
                let val = input.value.trim().toLowerCase();
                // Normalizar para la respuesta tipo "4,2"
                if(idx === 0) {
                    val = val.replace(/\s+/g, '');
                }
                if (respuestas[idx].some(r => val === r)) {
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
            const resultDiv = document.getElementById('activity-result');
            resultDiv.innerHTML = `<strong>Respuestas correctas: ${correctas} de 4</strong><br>` + feedback.join('<br>');
            resultDiv.className = correctas === 4 ? 'mt-4 font-medium text-green-700' : 'mt-4 font-medium text-red-700';
        });
    }
});