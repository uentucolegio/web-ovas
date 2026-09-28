// JS para verificación de actividades independientes
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // ACTIVIDAD 1: Botón Verdadero/Falso
    // ========================================
    const checkVFBtn = document.getElementById('check-vf-btn');
    
    if (checkVFBtn) {
        checkVFBtn.addEventListener('click', function() {
            const vfInputs = document.querySelectorAll('.vf-input');
            
            if (vfInputs.length) {
                let correctasVF = 0;
                const totalVF = vfInputs.length;
                let feedbackVF = [];
                
                vfInputs.forEach((input, idx) => {
                    // Limpiar clases previas
                    input.classList.remove('border-green-500', 'border-red-500', 'bg-green-50', 'bg-red-50');
                    
                    // Obtener la respuesta del usuario (convertir a minúscula)
                    const userAnswer = input.value.trim().toLowerCase();
                    // Obtener la respuesta correcta
                    const correctAnswer = input.dataset.answer.toLowerCase();
                    
                    // Validar si la respuesta es correcta
                    if (userAnswer === correctAnswer) {
                        input.classList.add('border-green-500', 'bg-green-50');
                        correctasVF++;
                        feedbackVF.push(`Pregunta ${idx + 1}: ✔️ Correcto`);
                    } else if (userAnswer === '') {
                        input.classList.add('border-red-500', 'bg-red-50');
                        feedbackVF.push(`Pregunta ${idx + 1}: ⚠️ Sin respuesta`);
                    } else {
                        input.classList.add('border-red-500', 'bg-red-50');
                        feedbackVF.push(`Pregunta ${idx + 1}: ❌ Incorrecto`);
                    }
                });
                
                // Mostrar resultado Actividad 1
                const resultDiv = document.getElementById('vf-result');
                if (resultDiv) {
                    const porcentaje = Math.round((correctasVF / totalVF) * 100);
                    let mensaje = `<div class="text-lg mb-3"><strong>Resultado: ${correctasVF} de ${totalVF} respuestas correctas (${porcentaje}%)</strong></div>`;
                    
                    // Agregar emoji según el resultado
                    if (correctasVF === totalVF) {
                        mensaje += '<div class="text-2xl mb-2">🎉 ¡Excelente! Has respondido todas correctamente.</div>';
                    } else if (correctasVF >= totalVF * 0.7) {
                        mensaje += '<div class="text-2xl mb-2">👍 ¡Muy bien! Tienes un buen entendimiento del tema.</div>';
                    } else if (correctasVF >= totalVF * 0.5) {
                        mensaje += '<div class="text-2xl mb-2">📚 Buen intento. Revisa el contenido para mejorar.</div>';
                    } else {
                        mensaje += '<div class="text-2xl mb-2">💪 Sigue practicando. Revisa el contenido nuevamente.</div>';
                    }
                    
                    mensaje += '<div class="mt-3 text-sm">' + feedbackVF.join('<br>') + '</div>';
                    
                    resultDiv.innerHTML = mensaje;
                    resultDiv.className = correctasVF === totalVF 
                        ? 'mt-4 p-4 font-medium text-green-700 bg-green-50 border border-green-300 rounded-lg' 
                        : 'mt-4 p-4 font-medium text-slate-700 bg-slate-50 border border-slate-300 rounded-lg';
                    
                    // Scroll suave al resultado
                    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }
    
    // ========================================
    // ACTIVIDAD 2: Botón Selección Múltiple
    // ========================================
    const checkCheckboxBtn = document.getElementById('check-checkbox-btn');
    
    if (checkCheckboxBtn) {
        checkCheckboxBtn.addEventListener('click', function() {
            const checkboxInputs = document.querySelectorAll('.checkbox-input');
            
            if (checkboxInputs.length) {
                let correctasCheckbox = 0;
                const totalCheckbox = checkboxInputs.length;
                
                checkboxInputs.forEach((input, idx) => {
                    // Limpiar clases previas
                    input.classList.remove('border-green-500', 'border-red-500', 'bg-green-50', 'bg-red-50');
                    
                    // Obtener el valor del usuario
                    const userAnswer = input.value.trim().toUpperCase();
                    // Verificar si debe tener X (es correcta)
                    const shouldBeChecked = input.dataset.correct === 'true';
                    const isChecked = userAnswer === 'X';
                    
                    // Lógica de validación:
                    // - Si debe estar marcada Y está marcada = correcto
                    // - Si NO debe estar marcada Y NO está marcada = correcto
                    // - Si debe estar marcada Y NO está marcada = incorrecto
                    // - Si NO debe estar marcada Y está marcada = incorrecto
                    
                    const isCorrect = (shouldBeChecked && isChecked) || (!shouldBeChecked && !isChecked);
                    
                    if (isCorrect) {
                        input.classList.add('border-green-500', 'bg-green-50');
                        correctasCheckbox++;
                    } else {
                        input.classList.add('border-red-500', 'bg-red-50');
                    }
                });
                
                // Mostrar resultado Actividad 2
                const resultDiv = document.getElementById('checkbox-result');
                if (resultDiv) {
                    const porcentaje = Math.round((correctasCheckbox / totalCheckbox) * 100);
                    let mensaje = `<div class="text-lg mb-3"><strong>Resultado: ${correctasCheckbox} de ${totalCheckbox} opciones correctas (${porcentaje}%)</strong></div>`;
                    
                    // Agregar emoji según el resultado
                    if (correctasCheckbox === totalCheckbox) {
                        mensaje += '<div class="text-2xl mb-2">🎉 ¡Perfecto! Has seleccionado todas las opciones correctamente.</div>';
                    } else if (correctasCheckbox >= totalCheckbox * 0.8) {
                        mensaje += '<div class="text-2xl mb-2">👍 ¡Muy bien! Tienes un buen entendimiento del tema.</div>';
                    } else if (correctasCheckbox >= totalCheckbox * 0.6) {
                        mensaje += '<div class="text-2xl mb-2">📚 Buen intento. Revisa algunos conceptos.</div>';
                    } else {
                        mensaje += '<div class="text-2xl mb-2">💪 Sigue practicando. Revisa el contenido nuevamente.</div>';
                    }
                    
                    mensaje += '<div class="mt-3 text-sm text-slate-600">Recuerda: debes marcar las opciones correctas Y dejar vacías las incorrectas.</div>';
                    
                    resultDiv.innerHTML = mensaje;
                    resultDiv.className = correctasCheckbox === totalCheckbox 
                        ? 'mt-4 p-4 font-medium text-green-700 bg-green-50 border border-green-300 rounded-lg' 
                        : 'mt-4 p-4 font-medium text-slate-700 bg-slate-50 border border-slate-300 rounded-lg';
                    
                    // Scroll suave al resultado
                    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }
    
    // ========================================
    // CONFIGURACIÓN DE INPUTS - V/F
    // ========================================
    const vfInputs = document.querySelectorAll('.vf-input');
    vfInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
        
        // Permitir solo V o F
        input.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which).toUpperCase();
            if (char !== 'V' && char !== 'F') {
                e.preventDefault();
            }
        });
    });
    
    // ========================================
    // CONFIGURACIÓN DE INPUTS - CHECKBOX (X)
    // ========================================
    const checkboxInputs = document.querySelectorAll('.checkbox-input');
    checkboxInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
        
        // Permitir solo X
        input.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which).toUpperCase();
            if (char !== 'X') {
                e.preventDefault();
            }
        });
    });
});