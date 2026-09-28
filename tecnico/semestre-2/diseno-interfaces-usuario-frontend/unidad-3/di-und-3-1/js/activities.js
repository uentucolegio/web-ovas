// Actividades Interactivas - Gamificación UI/UX
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ACTIVIDAD 1: DRAG & DROP CLASIFICADOR
    // ==========================================
    const dragItemsContainer = document.getElementById('drag-items');
    const dropAreas = document.querySelectorAll('.drop-area');
    const checkDragBtn = document.getElementById('check-drag-btn');
    const resetDragBtn = document.getElementById('reset-drag-btn');
    const dragScore = document.getElementById('drag-score');
    
    let draggedItem = null;

    function initDraggables() {
        const items = document.querySelectorAll('.req-drag-item');
        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                if (item.classList.contains('correct')) return;
                draggedItem = item;
                setTimeout(() => item.classList.add('dragging'), 0);
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                draggedItem = null;
            });
        });

        dropAreas.forEach(area => {
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.classList.add('drag-over');
            });

            area.addEventListener('dragleave', () => {
                area.classList.remove('drag-over');
            });

            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.classList.remove('drag-over');
                if (draggedItem && !draggedItem.classList.contains('correct')) {
                    area.appendChild(draggedItem);
                }
            });
        });
    }

    if(checkDragBtn) {
        checkDragBtn.addEventListener('click', () => {
            let correctCount = 0;
            let totalItems = document.querySelectorAll('.req-drag-item').length;
            
            dropAreas.forEach(area => {
                const targetType = area.parentElement.dataset.target;
                const itemsInArea = area.querySelectorAll('.req-drag-item');
                
                itemsInArea.forEach(item => {
                    const itemType = item.dataset.type;
                    if (itemType === targetType) {
                        item.classList.add('correct');
                        item.classList.remove('incorrect');
                        item.setAttribute('draggable', 'false');
                        correctCount++;
                    } else {
                        item.classList.add('incorrect');
                        item.classList.remove('correct');
                        setTimeout(() => item.classList.remove('incorrect'), 500);
                    }
                });
            });
            
            dragScore.textContent = `${correctCount}/${totalItems}`;
            if (correctCount === totalItems) {
                dragScore.innerHTML = `🌟 ${correctCount}/${totalItems} ¡Perfecto!`;
            }
        });
    }

    if(resetDragBtn) {
        resetDragBtn.addEventListener('click', () => {
            const originalItems = [
                { type: 'base', text: '🔲 Rejillas (Grids)' },
                { type: 'comp', text: '🏆 Jerarquía Visual' },
                { type: 'base', text: '📐 Alineación' },
                { type: 'comp', text: '🎵 Ritmo Visual' },
                { type: 'base', text: '↔️ Espaciado' },
                { type: 'comp', text: '⚖️ Balance' }
            ];
            
            dragItemsContainer.innerHTML = '';
            dropAreas.forEach(area => area.innerHTML = '');
            dragScore.textContent = '';
            originalItems.sort(() => Math.random() - 0.5);
            originalItems.forEach(item => {
                const div = document.createElement('div');
                div.className = 'req-drag-item';
                div.setAttribute('draggable', 'true');
                div.setAttribute('data-type', item.type);
                div.textContent = item.text;
                dragItemsContainer.appendChild(div);
            });
            initDraggables();
        });
    }

    if(dragItemsContainer) {
        initDraggables();
    }


    // ==========================================
    // ACTIVIDAD 2: DESAFÍO DE CONSISTENCIA VISUAL
    // ==========================================
    const challengeContainer = document.getElementById('challenge-container');
    const principleLabel = document.getElementById('challenge-principle');
    const levelLabel = document.getElementById('challenge-level');
    const instructionLabel = document.getElementById('challenge-instruction');
    const feedbackArea = document.getElementById('challenge-feedback');
    const resetChallengeBtn = document.getElementById('reset-challenge-btn');
    const nextChallengeBtn = document.getElementById('next-challenge-btn');
    const dotsContainer = document.getElementById('challenge-dots');

    const challengeData = [
        {
            principle: "Rejillas",
            instruction: "¿Cuál de estos bloques de perfil respeta una estructura de rejilla lógica?",
            explanation: "¡Correcto! La Opción A usa una rejilla de columnas clara. La Opción B tiene elementos 'flotando' sin alineación estructural.",
            correct: 'A',
            optionA: `<div class="mock-card flex gap-3"><div class="mock-avatar"></div><div class="flex-1"><div class="mock-text w-3/4"></div><div class="mock-text w-1/2"></div></div></div>`,
            optionB: `<div class="mock-card"><div class="mock-avatar mb-2"></div><div class="mock-text w-3/4 ml-4"></div><div class="mock-text w-1/2"></div></div>`
        },
        {
            principle: "Alineación",
            instruction: "¿Cuál de estos menús laterales facilita el escaneo rápido de lectura?",
            explanation: "¡Exacto! La alineación a la izquierda es natural para la lectura occidental. El texto centrado en menús crea un eje irregular difícil de seguir.",
            correct: 'A',
            optionA: `<div class="mock-card space-y-2"><div class="mock-text w-full"></div><div class="mock-text w-full"></div><div class="mock-text w-full"></div></div>`,
            optionB: `<div class="mock-card space-y-2 text-center"><div class="mock-text w-1/2 mx-auto"></div><div class="mock-text w-3/4 mx-auto"></div><div class="mock-text w-1/2 mx-auto"></div></div>`
        },
        {
            principle: "Espaciado",
            instruction: "¿Qué versión de la tarjeta permite que el contenido 'respire' y sea más legible?",
            explanation: "¡Muy bien! El espacio en blanco (margen interno) separa el contenido del borde, evitando la fatiga visual y la sensación de amontonamiento.",
            correct: 'B',
            optionA: `<div class="mock-card p-1 border-red-200"><div class="mock-text w-full mb-0"></div><div class="mock-text w-full mb-0"></div><div class="mock-button w-full"></div></div>`,
            optionB: `<div class="mock-card p-6 border-teal-200"><div class="mock-text w-full"></div><div class="mock-text w-full"></div><div class="mock-button"></div></div>`
        },
        {
            principle: "Jerarquía",
            instruction: "¿Cuál de estos diseños guía mejor la atención del usuario hacia la acción principal?",
            explanation: "¡Perfecto! El contraste de tamaño y color (en el botón) establece una jerarquía clara. En la opción B, todos los elementos compiten por atención.",
            correct: 'A',
            optionA: `<div class="mock-card"><div class="mock-text w-1/3 bg-slate-400 h-4 mb-4"></div><div class="mock-text w-full"></div><div class="mock-button bg-teal-600 w-full h-8"></div></div>`,
            optionB: `<div class="mock-card"><div class="mock-text w-1/3"></div><div class="mock-text w-full"></div><div class="mock-button bg-slate-200 w-full h-8"></div></div>`
        },
        {
            principle: "Ritmo",
            instruction: "¿Cuál de estas listas de productos genera un patrón predecible y profesional?",
            explanation: "¡Correcto! El ritmo se logra repitiendo componentes idénticos. La inconsistencia en tamaños (Opción B) genera ruido visual y desconfianza.",
            correct: 'A',
            optionA: `<div class="grid grid-cols-3 gap-2"><div class="mock-card h-16"></div><div class="mock-card h-16"></div><div class="mock-card h-16"></div></div>`,
            optionB: `<div class="grid grid-cols-3 gap-2"><div class="mock-card h-16"></div><div class="mock-card h-24"></div><div class="mock-card h-12"></div></div>`
        },
        {
            principle: "Balance",
            instruction: "¿Qué diseño se percibe más estable visualmente?",
            explanation: "¡Excelente! El balance distribuye el peso de forma equitativa. Un diseño cargado solo a un lado (Opción B) se siente 'pesado' e inacabado.",
            correct: 'A',
            optionA: `<div class="mock-card flex justify-between items-center"><div class="mock-avatar"></div><div class="mock-button"></div></div>`,
            optionB: `<div class="mock-card flex gap-2 justify-start items-center"><div class="mock-avatar"></div><div class="mock-button"></div><div class="w-10"></div></div>`
        }
    ];

    let currentLevel = 0;
    let canClick = true;

    function renderLevel(levelIndex) {
        if (!challengeContainer) return;
        const level = challengeData[levelIndex];
        
        // Actualizar textos
        principleLabel.textContent = level.principle;
        levelLabel.textContent = `Nivel ${levelIndex + 1} de ${challengeData.length}`;
        instructionLabel.textContent = level.instruction;
        
        // Limpiar contenedor
        challengeContainer.innerHTML = '';
        feedbackArea.classList.add('hidden');
        nextChallengeBtn.style.opacity = '0';
        nextChallengeBtn.style.pointerEvents = 'none';
        canClick = true;

        // Crear Tarjetas de Opción
        ['A', 'B'].forEach(type => {
            const card = document.createElement('div');
            card.className = 'challenge-option relative group shadow-sm bg-slate-50 border-2 border-slate-100 rounded-xl p-4';
            card.dataset.type = type;
            
            const label = document.createElement('span');
            label.className = 'absolute -top-3 -left-3 w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 shadow-sm z-20';
            label.textContent = type;
            card.appendChild(label);

            const content = document.createElement('div');
            content.className = 'pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity';
            content.innerHTML = type === 'A' ? level.optionA : level.optionB;
            card.appendChild(content);

            card.addEventListener('click', () => handleChallengeClick(card, type));
            challengeContainer.appendChild(card);
        });

        updateDots();
    }

    function handleChallengeClick(card, selected) {
        if (!canClick) return;
        const level = challengeData[currentLevel];
        canClick = false;

        const isCorrect = selected === level.correct;
        
        if (isCorrect) {
            card.classList.add('selected-correct', 'animate-challenge-success');
            feedbackArea.innerHTML = `<span class="text-green-700 font-bold block mb-1">¡Correcto! 🌟</span> ${level.explanation}`;
            feedbackArea.className = 'challenge-feedback block p-4 rounded-lg mb-4 text-center bg-green-100 text-green-800 border-2 border-green-200 animate-fadeIn';
            
            // Mostrar botón siguiente
            nextChallengeBtn.style.opacity = '1';
            nextChallengeBtn.style.pointerEvents = 'auto';
        } else {
            card.classList.add('selected-incorrect', 'animate-challenge-error');
            feedbackArea.innerHTML = `<span class="text-red-700 font-bold block mb-1">Casi... intenta de nuevo 🤔</span> Analiza bien el principio de ${level.principle} y fíjate en los detalles.`;
            feedbackArea.className = 'challenge-feedback block p-4 rounded-lg mb-4 text-center bg-red-100 text-red-800 border-2 border-red-200 animate-fadeIn';
            
            setTimeout(() => {
                card.classList.remove('selected-incorrect', 'animate-challenge-error');
                canClick = true;
            }, 1000);
        }
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        challengeData.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `challenge-dot ${i === currentLevel ? 'active' : (i < currentLevel ? 'completed' : '')}`;
            dotsContainer.appendChild(dot);
        });
    }

    if (nextChallengeBtn) {
        nextChallengeBtn.addEventListener('click', () => {
            if (currentLevel < challengeData.length - 1) {
                currentLevel++;
                renderLevel(currentLevel);
            } else {
                feedbackArea.innerHTML = `<div class="py-2"><span class="text-2xl block mb-2">🏆 ¡Misión Cumplida!</span> Eres un maestro de la arquitectura visual. Has demostrado buen ojo para los detalles que hacen una app profesional.</div>`;
                feedbackArea.className = 'challenge-feedback block p-6 rounded-lg mb-4 text-center bg-indigo-600 text-white shadow-xl animate-fadeIn';
                nextChallengeBtn.style.display = 'none';
            }
        });
    }

    if (resetChallengeBtn) {
        resetChallengeBtn.addEventListener('click', () => {
            currentLevel = 0;
            nextChallengeBtn.style.display = 'block';
            renderLevel(currentLevel);
        });
    }

    // Inicializar Actividad 2
    if (challengeContainer) {
        renderLevel(0);
    }
});