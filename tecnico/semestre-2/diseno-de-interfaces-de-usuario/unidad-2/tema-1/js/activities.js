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

    // Inicializar Draggables
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

        // Inicializar Dropzones
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

    // Verificar DRAG & DROP
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

    // Resetear DRAG & DROP
    if(resetDragBtn) {
        resetDragBtn.addEventListener('click', () => {
            const originalItems = [
                { type: 'nfunc', text: '⚡ Carga rápida (menos de 2s)' },
                { type: 'func', text: '🛒 Añadir al carrito' },
                { type: 'func', text: '👤 Iniciar sesión' },
                { type: 'nfunc', text: '📱 Compatible con celulares' },
                { type: 'func', text: '💳 Procesar pago seguro' },
                { type: 'nfunc', text: '🔒 Datos del usuario cifrados' }
            ];
            
            dragItemsContainer.innerHTML = '';
            dropAreas.forEach(area => area.innerHTML = '');
            dragScore.textContent = '';
            
            // Shuffle original items
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
        initDraggables(); // Arrancar D&D
    }


    // ==========================================
    // ACTIVIDAD 2: MATCHING CONCEPTOS
    // ==========================================
    const conceptsContainer = document.getElementById('ux-concepts');
    const definitionsContainer = document.getElementById('ux-definitions');
    const resetMatchBtn = document.getElementById('reset-match-btn');
    const matchProgress = document.getElementById('match-progress');
    const matchScore = document.getElementById('match-score');
    const matchFeedback = document.getElementById('match-feedback');

    const pairs = [
        { id: 'brief', concept: '📝 Brief', definition: 'Documento que funciona como "mapa del tesoro", guiando el proyecto y definiendo qué y para qué se hace.' },
        { id: 'persona', concept: '👤 User Persona', definition: 'Perfil ficticio de tu usuario ideal con nombre, edad, motivaciones y problemas.' },
        { id: 'primary', concept: '🎯 Usuario Primario', definition: 'La persona que utilizará directamente la aplicación en su día a día.' },
        { id: 'func', concept: '⚙️ Req. Funcional', definition: 'Lo que el sistema DEBE hacer obligatoriamente (ej. registrar usuarios, cobrar).' },
        { id: 'nfunc', concept: '✨ Req. No Funcional', definition: 'Cualidades del sistema: qué tan rápido, seguro o fácil de usar debe ser.' }
    ];

    let selectedConceptCard = null;
    let selectedDefinitionCard = null;
    let matchesFound = 0;
    const totalPairs = pairs.length;

    function initMatching() {
        if (!conceptsContainer) return;
        conceptsContainer.innerHTML = '';
        definitionsContainer.innerHTML = '';
        matchesFound = 0;
        selectedConceptCard = null;
        selectedDefinitionCard = null;
        updateProgress();
        matchFeedback.textContent = '';
        matchFeedback.className = 'mt-4 text-center font-bold text-lg h-10 transition-all flex items-center justify-center rounded-lg'; // reset classes

        // Barajar
        const shuffledConcepts = [...pairs].sort(() => Math.random() - 0.5);
        const shuffledDefinitions = [...pairs].sort(() => Math.random() - 0.5);

        shuffledConcepts.forEach(pair => {
            const card = document.createElement('div');
            card.className = 'match-card concept-card font-semibold text-teal-800';
            card.dataset.id = pair.id;
            card.textContent = pair.concept;
            card.addEventListener('click', () => handleCardSelection(card, 'concept'));
            conceptsContainer.appendChild(card);
        });

        shuffledDefinitions.forEach(pair => {
            const card = document.createElement('div');
            card.className = 'match-card definition-card text-slate-700 text-sm';
            card.dataset.id = pair.id;
            card.textContent = pair.definition;
            card.addEventListener('click', () => handleCardSelection(card, 'definition'));
            definitionsContainer.appendChild(card);
        });
    }

    function handleCardSelection(card, type) {
        if (card.classList.contains('matched')) return;

        if (type === 'concept') {
            if (selectedConceptCard) selectedConceptCard.classList.remove('selected');
            selectedConceptCard = card;
            card.classList.add('selected');
        } else {
            if (selectedDefinitionCard) selectedDefinitionCard.classList.remove('selected');
            selectedDefinitionCard = card;
            card.classList.add('selected');
        }

        checkMatch();
    }

    function checkMatch() {
        if (selectedConceptCard && selectedDefinitionCard) {
            const id1 = selectedConceptCard.dataset.id;
            const id2 = selectedDefinitionCard.dataset.id;
            const cCard = selectedConceptCard;
            const dCard = selectedDefinitionCard;

            if (id1 === id2) {
                // Correcto
                cCard.classList.remove('selected');
                dCard.classList.remove('selected');
                cCard.classList.add('matched');
                dCard.classList.add('matched');
                
                showFeedback('¡Correcto! 👏', 'bg-green-100 text-green-800 border-2 border-green-300');
                matchesFound++;
                updateProgress();

                if (matchesFound === totalPairs) {
                    setTimeout(() => showFeedback('🎉 ¡COMPLETADO! Eres un experto en UX/UI.', 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300 scale-105'), 500);
                }
            } else {
                // Incorrecto
                cCard.classList.add('error');
                dCard.classList.add('error');
                showFeedback('Mmm, intenta de nuevo 🤔', 'bg-red-100 text-red-800 border-2 border-red-300');
                
                setTimeout(() => {
                    cCard.classList.remove('selected', 'error');
                    dCard.classList.remove('selected', 'error');
                }, 500);
            }
            
            selectedConceptCard = null;
            selectedDefinitionCard = null;
        }
    }

    function showFeedback(msg, classes) {
        matchFeedback.textContent = msg;
        matchFeedback.className = `mt-4 text-center font-bold text-sm sm:text-lg h-10 transition-all flex items-center justify-center rounded-lg ${classes}`;
    }

    function updateProgress() {
        const percent = (matchesFound / totalPairs) * 100;
        if (matchProgress) {
            matchProgress.style.width = `${percent}%`;
            matchProgress.textContent = percent > 0 ? `${Math.round(percent)}%` : '';
        }
        if (matchScore) {
            matchScore.textContent = `${matchesFound}/${totalPairs}`;
        }
    }

    if(resetMatchBtn) resetMatchBtn.addEventListener('click', initMatching);

    if (conceptsContainer) {
        initMatching(); // Arrancar Matching
    }
});