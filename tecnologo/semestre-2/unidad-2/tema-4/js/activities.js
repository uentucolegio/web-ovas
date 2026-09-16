// Interactive activities and gamification
document.addEventListener('DOMContentLoaded', function() {
    let contenidoPuntos = 0;
    let actividadesPuntos = 0;
    const maxContenidoPuntos = 50; // Total possible points in content
    const maxActividadesPuntos = 3; // Total missions

    // Update progress bars
    function updateContenidoProgress() {
        const puntosElement = document.getElementById('contenido-puntos');
        const barraElement = document.getElementById('contenido-barra');
        
        if (puntosElement) puntosElement.textContent = contenidoPuntos;
        if (barraElement) {
            const porcentaje = (contenidoPuntos / maxContenidoPuntos) * 100;
            barraElement.style.width = porcentaje + '%';
        }
    }

    function updateActividadesProgress() {
        const puntosElement = document.getElementById('actividades-puntos');
        const barraElement = document.getElementById('actividades-barra');
        
        if (puntosElement) puntosElement.textContent = actividadesPuntos;
        if (barraElement) {
            const porcentaje = (actividadesPuntos / maxActividadesPuntos) * 100;
            barraElement.style.width = porcentaje + '%';
        }
    }

    // Criterios Game
    const criteriosJuego = document.getElementById('criterios-juego');
    if (criteriosJuego) {
        const situaciones = [
            { texto: "El cliente necesita la funcionalidad antes del 15 de agosto para cumplir con una norma legal", respuesta: "urgencia" },
            { texto: "Esta característica ahorrará $50,000 anuales en costos operativos", respuesta: "valor" },
            { texto: "Sin este módulo, el sistema no puede funcionar correctamente", respuesta: "dependencia" },
            { texto: "Implementar esto requerirá 6 meses de trabajo del equipo completo", respuesta: "esfuerzo" },
            { texto: "Esto reduce el riesgo de fallos de seguridad en un 80%", respuesta: "riesgo" }
        ];
        
        let situacionActual = 0;
        
        function mostrarSituacionCriterios() {
            if (situacionActual < situaciones.length) {
                const situacion = situaciones[situacionActual];
                criteriosJuego.innerHTML = `
                    <p class="font-semibold mb-3">${situacion.texto}</p>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="criterios-btn bg-white border border-green-300 rounded p-2 hover:bg-green-50 text-sm" data-respuesta="valor">Valor</button>
                        <button class="criterios-btn bg-white border border-green-300 rounded p-2 hover:bg-green-50 text-sm" data-respuesta="urgencia">Urgencia</button>
                        <button class="criterios-btn bg-white border border-green-300 rounded p-2 hover:bg-green-50 text-sm" data-respuesta="riesgo">Riesgo</button>
                        <button class="criterios-btn bg-white border border-green-300 rounded p-2 hover:bg-green-50 text-sm" data-respuesta="dependencia">Dependencia</button>
                        <button class="criterios-btn bg-white border border-green-300 rounded p-2 hover:bg-green-50 text-sm col-span-2" data-respuesta="esfuerzo">Esfuerzo</button>
                    </div>
                `;
                
                document.querySelectorAll('.criterios-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const respuesta = this.getAttribute('data-respuesta');
                        const feedback = document.getElementById('criterios-feedback');
                        feedback.classList.remove('hidden');
                        
                        if (respuesta === situaciones[situacionActual].respuesta) {
                            feedback.innerHTML = `<p class="text-green-700 font-semibold">¡Correcto! 🎉 +5 puntos</p>`;
                            contenidoPuntos += 5;
                            updateContenidoProgress();
                        } else {
                            feedback.innerHTML = `<p class="text-red-700 font-semibold">Incorrecto. La respuesta correcta era: ${situaciones[situacionActual].respuesta} 💪</p>`;
                        }
                        
                        situacionActual++;
                        setTimeout(() => {
                            feedback.classList.add('hidden');
                            mostrarSituacionCriterios();
                        }, 2000);
                    });
                });
            } else {
                criteriosJuego.innerHTML = `<p class="text-green-700 font-semibold">¡Completaste todos los retos! 🏆</p>`;
            }
        }
        
        mostrarSituacionCriterios();
    }

    // Preparación Checklist
    const preparacionChecklist = document.getElementById('preparacion-checklist');
    if (preparacionChecklist) {
        const items = [
            "Cada requerimiento está claramente definido y es comprensible",
            "Los requerimientos representan necesidades reales de los usuarios",
            "Existe evidencia o datos que respaldan cada requerimiento",
            "Los requerimientos son verificables y medibles",
            "Se han identificado las dependencias entre requerimientos"
        ];
        
        let checkedItems = 0;
        
        preparacionChecklist.innerHTML = items.map((item, index) => `
            <label class="flex items-center mb-2 cursor-pointer">
                <input type="checkbox" class="checklist-item mr-2 w-5 h-5" data-index="${index}">
                <span class="text-green-700">${item}</span>
            </label>
        `).join('');
        
        document.querySelectorAll('.checklist-item').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    checkedItems++;
                    if (checkedItems === items.length) {
                        const feedback = document.getElementById('preparacion-feedback');
                        feedback.classList.remove('hidden');
                        feedback.innerHTML = `<p class="text-green-700 font-semibold">¡Excelente! Tus requerimientos están listos para priorizar 🎯 +10 puntos</p>`;
                        contenidoPuntos += 10;
                        updateContenidoProgress();
                    }
                }
            });
        });
    }

    // MoSCoW Game
    const moscowJuego = document.getElementById('moscow-juego');
    if (moscowJuego) {
        const requerimientos = [
            { texto: "Validar que el estudiante esté activo en el sistema", categoria: "must" },
            { texto: "Personalizar el color del horario del estudiante", categoria: "could" },
            { texto: "Alertar conflicto de horario antes de confirmar matrícula", categoria: "should" },
            { texto: "Asistente conversacional para recomendar asignaturas", categoria: "wont" }
        ];
        
        let reqActual = 0;
        
        function mostrarRequerimientoMoscow() {
            if (reqActual < requerimientos.length) {
                const req = requerimientos[reqActual];
                moscowJuego.innerHTML = `
                    <p class="font-semibold mb-3">${req.texto}</p>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="moscow-btn bg-red-100 border border-red-300 rounded p-2 hover:bg-red-200 text-sm" data-respuesta="must">Must</button>
                        <button class="moscow-btn bg-orange-100 border border-orange-300 rounded p-2 hover:bg-orange-200 text-sm" data-respuesta="should">Should</button>
                        <button class="moscow-btn bg-yellow-100 border border-yellow-300 rounded p-2 hover:bg-yellow-200 text-sm" data-respuesta="could">Could</button>
                        <button class="moscow-btn bg-gray-100 border border-gray-300 rounded p-2 hover:bg-gray-200 text-sm" data-respuesta="wont">Won't</button>
                    </div>
                `;
                
                document.querySelectorAll('.moscow-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const respuesta = this.getAttribute('data-respuesta');
                        const feedback = document.getElementById('moscow-feedback');
                        feedback.classList.remove('hidden');
                        
                        if (respuesta === requerimientos[reqActual].categoria) {
                            feedback.innerHTML = `<p class="text-green-700 font-semibold">¡Correcto! 🎉 +5 puntos</p>`;
                            contenidoPuntos += 5;
                            updateContenidoProgress();
                        } else {
                            feedback.innerHTML = `<p class="text-red-700 font-semibold">Incorrecto. La categoría correcta era: ${requerimientos[reqActual].categoria} 💪</p>`;
                        }
                        
                        reqActual++;
                        setTimeout(() => {
                            feedback.classList.add('hidden');
                            mostrarRequerimientoMoscow();
                        }, 2000);
                    });
                });
            } else {
                moscowJuego.innerHTML = `<p class="text-green-700 font-semibold">¡Clasificación completada! 🏆</p>`;
            }
        }
        
        mostrarRequerimientoMoscow();
    }

    // Matriz Valor-Esfuerzo Simulator
    const matrizSimulador = document.getElementById('matriz-simulador');
    if (matrizSimulador) {
        const requerimientosMatriz = [
            { nombre: "Autenticación de usuarios" },
            { nombre: "Consulta de horarios" },
            { nombre: "Personalización de tema" }
        ];
        
        let reqMatrizActual = 0;
        
        function mostrarReqMatriz() {
            if (reqMatrizActual < requerimientosMatriz.length) {
                const req = requerimientosMatriz[reqMatrizActual];
                matrizSimulador.innerHTML = `
                    <p class="font-semibold mb-3">${req.nombre}</p>
                    <div class="grid grid-cols-2 gap-4 mb-3">
                        <div>
                            <label class="block text-sm font-semibold mb-1">Valor (1-5):</label>
                            <input type="range" id="matriz-valor" min="1" max="5" value="3" class="w-full">
                            <span id="matriz-valor-display" class="text-sm">3</span>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-1">Esfuerzo (1-5):</label>
                            <input type="range" id="matriz-esfuerzo" min="1" max="5" value="3" class="w-full">
                            <span id="matriz-esfuerzo-display" class="text-sm">3</span>
                        </div>
                    </div>
                    <button id="matriz-analizar" class="bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full">Analizar posición</button>
                `;
                
                const valorSlider = document.getElementById('matriz-valor');
                const esfuerzoSlider = document.getElementById('matriz-esfuerzo');
                const valorDisplay = document.getElementById('matriz-valor-display');
                const esfuerzoDisplay = document.getElementById('matriz-esfuerzo-display');
                
                valorSlider.addEventListener('input', () => valorDisplay.textContent = valorSlider.value);
                esfuerzoSlider.addEventListener('input', () => esfuerzoDisplay.textContent = esfuerzoSlider.value);
                
                document.getElementById('matriz-analizar').addEventListener('click', () => {
                    const valor = parseInt(valorSlider.value);
                    const esfuerzo = parseInt(esfuerzoSlider.value);
                    const feedback = document.getElementById('matriz-feedback');
                    feedback.classList.remove('hidden');
                    
                    let posicion = "";
                    if (valor >= 4 && esfuerzo <= 2) {
                        posicion = "¡Victoria rápida! 🚀 Alto valor, bajo esfuerzo";
                    } else if (valor >= 4 && esfuerzo >= 4) {
                        posicion = "Iniciativa estratégica 🎯 Alto valor, alto esfuerzo";
                    } else if (valor <= 2 && esfuerzo <= 2) {
                        posicion = "Complemento 📦 Bajo valor, bajo esfuerzo";
                    } else {
                        posicion = "Reconsiderar ⚠️ Bajo valor, alto esfuerzo";
                    }
                    
                    feedback.innerHTML = `<p class="text-green-700 font-semibold">${posicion}</p>`;
                    contenidoPuntos += 5;
                    updateContenidoProgress();
                    
                    reqMatrizActual++;
                    setTimeout(() => {
                        feedback.classList.add('hidden');
                        mostrarReqMatriz();
                    }, 3000);
                });
            } else {
                matrizSimulador.innerHTML = `<p class="text-green-700 font-semibold">¡Análisis completado! 🏆</p>`;
            }
        }
        
        mostrarReqMatriz();
    }

    // Votación Simulator
    const votacionSimulador = document.getElementById('votacion-simulador');
    if (votacionSimulador) {
        const opciones = ["Matrícula en línea", "Consulta de horarios", "Alertas de conflicto", "Pagos en línea"];
        let puntosDisponibles = 10;
        let puntosAsignados = {};
        
        function mostrarVotacion() {
            votacionSimulador.innerHTML = `
                <p class="font-semibold mb-3">Puntos disponibles: <span id="puntos-disponibles">${puntosDisponibles}</span></p>
                ${opciones.map(op => `
                    <div class="flex items-center mb-2">
                        <span class="flex-1">${op}</span>
                        <button class="votacion-menos bg-red-500 text-white rounded px-2 py-1 mr-1" data-opcion="${op}">-</button>
                        <span id="puntos-${op.replace(/\s/g, '-')}" class="mx-2 font-semibold">0</span>
                        <button class="votacion-mas bg-green-500 text-white rounded px-2 py-1 ml-1" data-opcion="${op}">+</button>
                    </div>
                `).join('')}
                <button id="votacion-confirmar" class="bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full mt-3">Confirmar votación</button>
            `;
            
            document.querySelectorAll('.votacion-mas').forEach(btn => {
                btn.addEventListener('click', function() {
                    const opcion = this.getAttribute('data-opcion');
                    if (puntosDisponibles > 0) {
                        puntosAsignados[opcion] = (puntosAsignados[opcion] || 0) + 1;
                        puntosDisponibles--;
                        actualizarVotacion();
                    }
                });
            });
            
            document.querySelectorAll('.votacion-menos').forEach(btn => {
                btn.addEventListener('click', function() {
                    const opcion = this.getAttribute('data-opcion');
                    if (puntosAsignados[opcion] > 0) {
                        puntosAsignados[opcion]--;
                        puntosDisponibles++;
                        actualizarVotacion();
                    }
                });
            });
            
            document.getElementById('votacion-confirmar').addEventListener('click', () => {
                const feedback = document.getElementById('votacion-feedback');
                feedback.classList.remove('hidden');
                
                const ganador = Object.keys(puntosAsignados).reduce((a, b) => puntosAsignados[a] > puntosAsignados[b] ? a : b);
                feedback.innerHTML = `<p class="text-green-700 font-semibold">¡Votación completada! Prioridad: ${ganador} 🏆 +5 puntos</p>`;
                contenidoPuntos += 5;
                updateContenidoProgress();
            });
        }
        
        function actualizarVotacion() {
            document.getElementById('puntos-disponibles').textContent = puntosDisponibles;
            opciones.forEach(op => {
                const clave = op.replace(/\s/g, '-');
                document.getElementById(`puntos-${clave}`).textContent = puntosAsignados[op] || 0;
            });
        }
        
        mostrarVotacion();
    }

    // WSJF Calculator
    const wsjfCalculadora = document.getElementById('wsjf-calculadora');
    if (wsjfCalculadora) {
        wsjfCalculadora.innerHTML = `
            <div class="grid grid-cols-5 gap-2 mb-3">
                <div>
                    <label class="block text-xs font-semibold mb-1">Valor (35%)</label>
                    <input type="number" id="wsjf-valor" min="1" max="5" value="3" class="w-full p-1 border rounded">
                </div>
                <div>
                    <label class="block text-xs font-semibold mb-1">Urgencia (25%)</label>
                    <input type="number" id="wsjf-urgencia" min="1" max="5" value="3" class="w-full p-1 border rounded">
                </div>
                <div>
                    <label class="block text-xs font-semibold mb-1">Riesgo (20%)</label>
                    <input type="number" id="wsjf-riesgo" min="1" max="5" value="3" class="w-full p-1 border rounded">
                </div>
                <div>
                    <label class="block text-xs font-semibold mb-1">Dependencia (10%)</label>
                    <input type="number" id="wsjf-dependencia" min="1" max="5" value="3" class="w-full p-1 border rounded">
                </div>
                <div>
                    <label class="block text-xs font-semibold mb-1">Cumplimiento (10%)</label>
                    <input type="number" id="wsjf-cumplimiento" min="1" max="5" value="3" class="w-full p-1 border rounded">
                </div>
            </div>
            <button id="wsjf-calcular" class="bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full">Calcular prioridad</button>
        `;
        
        document.getElementById('wsjf-calcular').addEventListener('click', () => {
            const valor = parseInt(document.getElementById('wsjf-valor').value);
            const urgencia = parseInt(document.getElementById('wsjf-urgencia').value);
            const riesgo = parseInt(document.getElementById('wsjf-riesgo').value);
            const dependencia = parseInt(document.getElementById('wsjf-dependencia').value);
            const cumplimiento = parseInt(document.getElementById('wsjf-cumplimiento').value);
            
            const total = (valor * 0.35 + urgencia * 0.25 + riesgo * 0.20 + dependencia * 0.10 + cumplimiento * 0.10).toFixed(2);
            
            const feedback = document.getElementById('wsjf-feedback');
            feedback.classList.remove('hidden');
            feedback.innerHTML = `<p class="text-green-700 font-semibold">Puntuación: ${total} / 5 🎯 +5 puntos</p>`;
            contenidoPuntos += 5;
            updateContenidoProgress();
        });
    }

    // Flujo de cambios Simulator
    const flujoSimulador = document.getElementById('flujo-simulador');
    if (flujoSimulador) {
        const pasos = [
            { texto: "Registrar la solicitud de cambio con identificador único", accion: "registrar" },
            { texto: "Analizar el impacto en alcance, costo, plazo y riesgo", accion: "analizar" },
            { texto: "Tomar decisión: aprobar, rechazar o diferir el cambio", accion: "decidir" },
            { texto: "Planificar e implementar el cambio aprobado", accion: "implementar" },
            { texto: "Verificar y cerrar el cambio con evidencia", accion: "verificar" }
        ];
        
        let pasoActual = 0;
        
        function mostrarPasoFlujo() {
            if (pasoActual < pasos.length) {
                const paso = pasos[pasoActual];
                flujoSimulador.innerHTML = `
                    <p class="font-semibold mb-3">Paso ${pasoActual + 1}/5: ${paso.texto}</p>
                    <button id="flujo-accion" class="bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full">Completar paso</button>
                `;
                
                document.getElementById('flujo-accion').addEventListener('click', () => {
                    const feedback = document.getElementById('flujo-feedback');
                    feedback.classList.remove('hidden');
                    feedback.innerHTML = `<p class="text-green-700 font-semibold">¡Paso completado! ✅</p>`;
                    
                    pasoActual++;
                    contenidoPuntos += 2;
                    updateContenidoProgress();
                    
                    setTimeout(() => {
                        feedback.classList.add('hidden');
                        mostrarPasoFlujo();
                    }, 1500);
                });
            } else {
                flujoSimulador.innerHTML = `<p class="text-green-700 font-semibold">¡Flujo completado! 🏆 +10 puntos bonus</p>`;
                contenidoPuntos += 10;
                updateContenidoProgress();
            }
        }
        
        mostrarPasoFlujo();
    }

    // Impacto Game
    const impactoJuego = document.getElementById('impacto-juego');
    if (impactoJuego) {
        const cambios = [
            { texto: "Permitir matrícula con deuda pendiente", dimensiones: ["negocio", "técnica", "riesgo"] },
            { texto: "Agregar autenticación biométrica", dimensiones: ["técnica", "calidad", "operación"] },
            { texto: "Cambiar el esquema de colores de la interfaz", dimensiones: ["técnica", "verificación"] }
        ];
        
        let cambioActual = 0;
        
        function mostrarCambioImpacto() {
            if (cambioActual < cambios.length) {
                const cambio = cambios[cambioActual];
                impactoJuego.innerHTML = `
                    <p class="font-semibold mb-3">${cambio.texto}</p>
                    <p class="text-sm mb-3">Selecciona las dimensiones afectadas (múltiples):</p>
                    <div class="grid grid-cols-2 gap-2">
                        <label class="flex items-center"><input type="checkbox" class="impacto-check mr-2" data-dimension="negocio"> Negocio</label>
                        <label class="flex items-center"><input type="checkbox" class="impacto-check mr-2" data-dimension="alcance"> Alcance</label>
                        <label class="flex items-center"><input type="checkbox" class="impacto-check mr-2" data-dimension="técnica"> Técnica</label>
                        <label class="flex items-center"><input type="checkbox" class="impacto-check mr-2" data-dimension="calidad"> Calidad</label>
                        <label class="flex items-center"><input type="checkbox" class="impacto-check mr-2" data-dimension="riesgo"> Riesgo</label>
                        <label class="flex items-center"><input type="checkbox" class="impacto-check mr-2" data-dimension="operación"> Operación</label>
                        <label class="flex items-center"><input type="checkbox" class="impacto-check mr-2" data-dimension="verificación"> Verificación</label>
                    </div>
                    <button id="impacto-verificar" class="bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full mt-3">Verificar análisis</button>
                `;
                
                document.getElementById('impacto-verificar').addEventListener('click', () => {
                    const seleccionadas = Array.from(document.querySelectorAll('.impacto-check:checked')).map(cb => cb.getAttribute('data-dimension'));
                    const feedback = document.getElementById('impacto-feedback');
                    feedback.classList.remove('hidden');
                    
                    const correctas = cambio.dimensiones.filter(d => seleccionadas.includes(d)).length;
                    const total = cambio.dimensiones.length;
                    
                    if (correctas === total) {
                        feedback.innerHTML = `<p class="text-green-700 font-semibold">¡Análisis correcto! 🎉 +5 puntos</p>`;
                        contenidoPuntos += 5;
                        updateContenidoProgress();
                    } else {
                        feedback.innerHTML = `<p class="text-yellow-700 font-semibold">Parcialmente correcto (${correctas}/${total}) 💪</p>`;
                    }
                    
                    cambioActual++;
                    setTimeout(() => {
                        feedback.classList.add('hidden');
                        mostrarCambioImpacto();
                    }, 2000);
                });
            } else {
                impactoJuego.innerHTML = `<p class="text-green-700 font-semibold">¡Análisis de impacto completado! 🏆</p>`;
            }
        }
        
        mostrarCambioImpacto();
    }

    // Errores Quiz
    const erroresQuiz = document.getElementById('errores-quiz');
    if (erroresQuiz) {
        const preguntas = [
            { error: "Todo es 'Must'", solucion: "Definir prueba de necesidad y capacidad de la versión" },
            { error: "Puntuar sin evidencia", solucion: "Registrar fuentes, escalas, supuestos y desacuerdos" },
            { error: "Cambiar por chat o verbalmente", solucion: "Crear una solicitud identificable y trazable" }
        ];
        
        let preguntaActual = 0;
        
        function mostrarPreguntaErrores() {
            if (preguntaActual < preguntas.length) {
                const preg = preguntas[preguntaActual];
                erroresQuiz.innerHTML = `
                    <p class="font-semibold mb-3">Error: "${preg.error}"</p>
                    <p class="text-sm mb-3">¿Cuál es la buena práctica?</p>
                    <div class="space-y-2">
                        <button class="errores-btn bg-white border border-green-300 rounded p-2 hover:bg-green-50 text-sm w-full text-left" data-solucion="${preg.solucion}">${preg.solucion}</button>
                        <button class="errores-btn bg-white border border-green-300 rounded p-2 hover:bg-green-50 text-sm w-full text-left" data-solucion="Otra opción incorrecta">Otra opción incorrecta</button>
                    </div>
                `;
                
                document.querySelectorAll('.errores-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const solucion = this.getAttribute('data-solucion');
                        const feedback = document.getElementById('errores-feedback');
                        feedback.classList.remove('hidden');
                        
                        if (solucion === preg.solucion) {
                            feedback.innerHTML = `<p class="text-green-700 font-semibold">¡Correcto! 🎉 +5 puntos</p>`;
                            contenidoPuntos += 5;
                            updateContenidoProgress();
                        } else {
                            feedback.innerHTML = `<p class="text-red-700 font-semibold">Incorrecto 💪</p>`;
                        }
                        
                        preguntaActual++;
                        setTimeout(() => {
                            feedback.classList.add('hidden');
                            mostrarPreguntaErrores();
                        }, 2000);
                    });
                });
            } else {
                erroresQuiz.innerHTML = `<p class="text-green-700 font-semibold">¡Quiz completado! 🏆</p>`;
            }
        }
        
        mostrarPreguntaErrores();
    }

    // Actividad 1 Simulator
    const actividad1Simulador = document.getElementById('actividad1-simulador');
    if (actividad1Simulador) {
        actividad1Simulador.innerHTML = `
            <p class="mb-3">Clasifica estos requerimientos con MoSCoW:</p>
            <div class="space-y-3">
                <div class="bg-white p-3 rounded border">
                    <p class="font-semibold mb-2">1. Validar estudiante activo</p>
                    <select class="actividad1-select w-full p-2 border rounded" data-req="1" data-correcta="must">
                        <option value="">Selecciona...</option>
                        <option value="must">Must</option>
                        <option value="should">Should</option>
                        <option value="could">Could</option>
                        <option value="wont">Won't</option>
                    </select>
                </div>
                <div class="bg-white p-3 rounded border">
                    <p class="font-semibold mb-2">2. Personalizar color horario</p>
                    <select class="actividad1-select w-full p-2 border rounded" data-req="2" data-correcta="could">
                        <option value="">Selecciona...</option>
                        <option value="must">Must</option>
                        <option value="should">Should</option>
                        <option value="could">Could</option>
                        <option value="wont">Won't</option>
                    </select>
                </div>
                <div class="bg-white p-3 rounded border">
                    <p class="font-semibold mb-2">3. Alertar conflicto horario</p>
                    <select class="actividad1-select w-full p-2 border rounded" data-req="3" data-correcta="should">
                        <option value="">Selecciona...</option>
                        <option value="must">Must</option>
                        <option value="should">Should</option>
                        <option value="could">Could</option>
                        <option value="wont">Won't</option>
                    </select>
                </div>
            </div>
            <button id="actividad1-verificar" class="bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full mt-3">Verificar priorización</button>
        `;
        
        document.getElementById('actividad1-verificar').addEventListener('click', () => {
            const selects = document.querySelectorAll('.actividad1-select');
            let correctas = 0;
            
            selects.forEach(select => {
                if (select.value === select.getAttribute('data-correcta')) {
                    correctas++;
                }
            });
            
            const feedback = document.getElementById('actividad1-feedback');
            feedback.classList.remove('hidden');
            
            if (correctas === selects.length) {
                feedback.innerHTML = `<p class="text-green-700 font-semibold">¡Misión 1 completada! 🎯 +1 misión</p>`;
                actividadesPuntos++;
                updateActividadesProgress();
            } else {
                feedback.innerHTML = `<p class="text-yellow-700 font-semibold">${correctas}/${selects.length} correctas. Inténtalo de nuevo 💪</p>`;
            }
        });
    }

    // Actividad 2 Simulator
    const actividad2Simulador = document.getElementById('actividad2-simulador');
    if (actividad2Simulador) {
        const roles = ["académico", "finanzas", "seguridad", "desarrollo"];
        let rolActual = 0;
        
        function mostrarRolActividad2() {
            if (rolActual < roles.length) {
                const rol = roles[rolActual];
                actividad2Simulador.innerHTML = `
                    <p class="font-semibold mb-3">Rol: ${rol.toUpperCase()}</p>
                    <p class="text-sm mb-3">Cambio solicitado: "Permitir matrícula provisional con acuerdos de pago"</p>
                    <div class="space-y-2">
                        <label class="flex items-center"><input type="radio" name="actividad2-decision" value="aprobar" class="mr-2"> Aprobar</label>
                        <label class="flex items-center"><input type="radio" name="actividad2-decision" value="rechazar" class="mr-2"> Rechazar</label>
                        <label class="flex items-center"><input type="radio" name="actividad2-decision" value="analizar" class="mr-2"> Solicitar más análisis</label>
                    </div>
                    <button id="actividad2-votar" class="bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full mt-3">Registrar decisión</button>
                `;
                
                document.getElementById('actividad2-votar').addEventListener('click', () => {
                    const feedback = document.getElementById('actividad2-feedback');
                    feedback.classList.remove('hidden');
                    feedback.innerHTML = `<p class="text-green-700 font-semibold">Decisión registrada ✅</p>`;
                    
                    rolActual++;
                    setTimeout(() => {
                        feedback.classList.add('hidden');
                        mostrarRolActividad2();
                    }, 1500);
                });
            } else {
                actividad2Simulador.innerHTML = `<p class="text-green-700 font-semibold">¡Misión 2 completada! 🎯 +1 misión</p>`;
                actividadesPuntos++;
                updateActividadesProgress();
            }
        }
        
        mostrarRolActividad2();
    }

    // Actividad 3 Simulator
    const actividad3Simulador = document.getElementById('actividad3-simulador');
    if (actividad3Simulador) {
        actividad3Simulador.innerHTML = `
            <p class="mb-3">Identifica las inconsistencias de versión:</p>
            <div class="space-y-3">
                <div class="bg-white p-3 rounded border">
                    <p class="font-semibold mb-2">Artefacto 1: Historia de usuario HU-03</p>
                    <select class="actividad3-select w-full p-2 border rounded" data-artefacto="1" data-correcta="v1.1">
                        <option value="">Selecciona versión...</option>
                        <option value="v1.0">v1.0</option>
                        <option value="v1.1">v1.1</option>
                        <option value="v2.0">v2.0</option>
                    </select>
                </div>
                <div class="bg-white p-3 rounded border">
                    <p class="font-semibold mb-2">Artefacto 2: Caso de uso CU-04</p>
                    <select class="actividad3-select w-full p-2 border rounded" data-artefacto="2" data-correcta="v1.0">
                        <option value="">Selecciona versión...</option>
                        <option value="v1.0">v1.0</option>
                        <option value="v1.1">v1.1</option>
                        <option value="v2.0">v2.0</option>
                    </select>
                </div>
                <div class="bg-white p-3 rounded border">
                    <p class="font-semibold mb-2">Artefacto 3: Requisito RF-01</p>
                    <select class="actividad3-select w-full p-2 border rounded" data-artefacto="3" data-correcta="v1.1">
                        <option value="">Selecciona versión...</option>
                        <option value="v1.0">v1.0</option>
                        <option value="v1.1">v1.1</option>
                        <option value="v2.0">v2.0</option>
                    </select>
                </div>
            </div>
            <button id="actividad3-verificar" class="bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full mt-3">Verificar consistencia</button>
        `;
        
        document.getElementById('actividad3-verificar').addEventListener('click', () => {
            const selects = document.querySelectorAll('.actividad3-select');
            let correctas = 0;
            
            selects.forEach(select => {
                if (select.value === select.getAttribute('data-correcta')) {
                    correctas++;
                }
            });
            
            const feedback = document.getElementById('actividad3-feedback');
            feedback.classList.remove('hidden');
            
            if (correctas === selects.length) {
                feedback.innerHTML = `<p class="text-green-700 font-semibold">¡Misión 3 completada! 🎯 +1 misión</p>`;
                actividadesPuntos++;
                updateActividadesProgress();
            } else {
                feedback.innerHTML = `<p class="text-yellow-700 font-semibold">${correctas}/${selects.length} correctas. Revisa las trazas 💪</p>`;
            }
        });
    }
});