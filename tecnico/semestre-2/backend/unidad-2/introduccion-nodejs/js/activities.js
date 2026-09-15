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
                ['6', '6.25', '6,25', '6 plugins'], // Ejercicio 1: máximo 6 plugins (estrictamente ≤ 50000/8000)
                ['12'], // Ejercicio 2: mínimo 12 estudiantes (72000/6000)
                ['10'], // Ejercicio 3: exactamente 10 kilos (60000/6000)
            ];
            let correctas = 0;
            let feedback = [];
            inputs.forEach((input, idx) => {
                const val = input.value.trim().replace(',', '.').toLowerCase();
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
            resultDiv.innerHTML = `<strong>Respuestas correctas: ${correctas} de 3</strong><br>` + feedback.join('<br>');
            resultDiv.className = correctas === 3 ? 'mt-4 font-medium text-green-700' : 'mt-4 font-medium text-red-700';
        });
    }
});