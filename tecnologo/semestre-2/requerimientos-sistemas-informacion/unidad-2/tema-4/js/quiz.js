// Quiz functionality for evaluation section
document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz-container');
    const quizFeedback = document.getElementById('quiz-feedback');
    let quizPuntos = 0;
    let preguntaActual = 0;

    const preguntasQuiz = [
        {
            pregunta: "¿Cuál es el objetivo principal de la priorización de requerimientos?",
            opciones: [
                "Eliminar todos los requerimientos que no sean esenciales",
                "Establecer un orden relativo para orientar decisiones de análisis, entrega y validación",
                "Documentar todos los requerimientos en orden alfabético",
                "Asignar un presupuesto a cada requerimiento individualmente"
            ],
            correcta: 1,
            dificultad: "fácil"
        },
        {
            pregunta: "En el método MoSCoW, ¿qué significa la categoría 'Should have'?",
            opciones: [
                "Esencial para que la versión sea viable o conforme",
                "Importante; existe una alternativa temporal aceptable",
                "Aporta valor, pero su ausencia tiene impacto menor",
                "No se incluirá en esta versión; queda registrado"
            ],
            correcta: 1,
            dificultad: "fácil"
        },
        {
            pregunta: "¿Cuál es la fórmula del método WSJF (Weighted Shortest Job First)?",
            opciones: [
                "Valor × Esfuerzo",
                "Costo de Delay ÷ Tamaño del trabajo",
                "Urgencia + Riesgo - Dependencia",
                "Valor ÷ (Esfuerzo × Riesgo)"
            ],
            correcta: 1,
            dificultad: "media"
        },
        {
            pregunta: "En el análisis de impacto de un cambio, ¿qué dimensión evalúa '¿Qué objetivos cambian? ¿Quién gana o pierde valor?'",
            opciones: [
                "Alcance y prioridad",
                "Negocio y usuarios",
                "Técnica y datos",
                "Proyecto y operación"
            ],
            correcta: 1,
            dificultad: "media"
        },
        {
            pregunta: "¿Cuál es la secuencia correcta del flujo de gestión de cambios?",
            opciones: [
                "Decidir → Registrar → Analizar → Implementar → Verificar",
                "Registrar → Analizar → Decidir → Implementar → Verificar",
                "Analizar → Registrar → Decidir → Verificar → Implementar",
                "Implementar → Registrar → Analizar → Decidir → Verificar"
            ],
            correcta: 1,
            dificultad: "difícil"
        }
    ];

    function mostrarPreguntaQuiz() {
        if (preguntaActual < preguntasQuiz.length) {
            const preg = preguntasQuiz[preguntaActual];
            const porcentajeProgreso = ((preguntaActual + 1) / preguntasQuiz.length) * 100;
            
            quizContainer.innerHTML = `
                <div class="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-green-500">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm font-semibold text-green-600">Pregunta ${preguntaActual + 1}/${preguntasQuiz.length}</span>
                        <span class="text-xs px-2 py-1 rounded ${preg.dificultad === 'fácil' ? 'bg-green-100 text-green-700' : preg.dificultad === 'media' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}">${preg.dificultad.toUpperCase()}</span>
                    </div>
                    <p class="text-lg font-semibold text-slate-800 mb-4">${preg.pregunta}</p>
                    <div class="space-y-2">
                        ${preg.opciones.map((opcion, index) => `
                            <button class="quiz-opcion w-full text-left p-3 rounded border border-green-200 hover:bg-green-50 transition-colors" data-index="${index}">
                                <span class="font-semibold mr-2">${String.fromCharCode(65 + index)}.</span> ${opcion}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-500" style="width: ${porcentajeProgreso}%"></div>
                </div>
            `;
            
            document.querySelectorAll('.quiz-opcion').forEach(btn => {
                btn.addEventListener('click', function() {
                    const seleccion = parseInt(this.getAttribute('data-index'));
                    const feedback = document.getElementById('quiz-feedback');
                    feedback.classList.remove('hidden');
                    
                    // Deshabilitar todas las opciones
                    document.querySelectorAll('.quiz-opcion').forEach(opcion => {
                        opcion.disabled = true;
                        opcion.classList.add('opacity-50');
                    });
                    
                    // Resaltar la seleccionada
                    this.classList.remove('opacity-50');
                    
                    if (seleccion === preg.correcta) {
                        this.classList.add('bg-green-100', 'border-green-500');
                        feedback.innerHTML = `<div class="bg-green-50 border border-green-300 rounded-lg p-4"><p class="text-green-700 font-semibold">¡Correcto! 🎉 +1 punto</p></div>`;
                        quizPuntos++;
                        document.getElementById('quiz-puntos').textContent = quizPuntos;
                    } else {
                        this.classList.add('bg-red-100', 'border-red-500');
                        // Mostrar la correcta
                        document.querySelectorAll('.quiz-opcion')[preg.correcta].classList.add('bg-green-100', 'border-green-500', 'opacity-100');
                        feedback.innerHTML = `<div class="bg-red-50 border border-red-300 rounded-lg p-4"><p class="text-red-700 font-semibold">Incorrecto. La respuesta correcta era: ${String.fromCharCode(65 + preg.correcta)}. 💪</p></div>`;
                    }
                    
                    preguntaActual++;
                    
                    setTimeout(() => {
                        feedback.classList.add('hidden');
                        mostrarPreguntaQuiz();
                    }, 2500);
                });
            });
        } else {
            // Quiz completado
            const porcentajeFinal = (quizPuntos / preguntasQuiz.length) * 100;
            let mensajeFinal = "";
            let claseFinal = "";
            
            if (porcentajeFinal === 100) {
                mensajeFinal = "¡Excelente! Has respondido todas correctamente 🏆";
                claseFinal = "bg-green-50 border-green-500 text-green-700";
            } else if (porcentajeFinal >= 60) {
                mensajeFinal = "¡Muy bien! Has aprobado la evaluación 👍";
                claseFinal = "bg-blue-50 border-blue-500 text-blue-700";
            } else {
                mensajeFinal = "Sigue practicando. Repasa el contenido e inténtalo de nuevo 💪";
                claseFinal = "bg-yellow-50 border-yellow-500 text-yellow-700";
            }
            
            quizContainer.innerHTML = `
                <div class="${claseFinal} border-2 rounded-lg p-8 text-center">
                    <span class="text-5xl mb-4 block">${porcentajeFinal === 100 ? '🏆' : porcentajeFinal >= 60 ? '👍' : '📚'}</span>
                    <h3 class="text-2xl font-bold mb-2">Evaluación completada</h3>
                    <p class="text-lg mb-4">${mensajeFinal}</p>
                    <p class="text-3xl font-bold mb-4">${quizPuntos}/${preguntasQuiz.length} puntos (${porcentajeFinal}%)</p>
                    <button onclick="location.reload()" class="bg-green-600 text-white rounded-lg px-6 py-3 hover:bg-green-700 font-semibold">Intentar de nuevo</button>
                </div>
            `;
        }
    }

    // Iniciar el quiz si el contenedor existe
    if (quizContainer) {
        mostrarPreguntaQuiz();
    }
});