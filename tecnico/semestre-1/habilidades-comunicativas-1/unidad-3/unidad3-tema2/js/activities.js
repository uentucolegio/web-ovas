// Drag and Drop Activity for Communication Styles
document.addEventListener('DOMContentLoaded', function() {
    const phrasesContainer = document.getElementById('phrases-container');
    const dropZones = document.querySelectorAll('.drop-zone');
    const checkButton = document.getElementById('check-drag-drop-btn');
    const resetButton = document.getElementById('reset-drag-drop-btn');
    const resultDiv = document.getElementById('drag-drop-result');
    
    let draggedElement = null;
    let initialParent = null;

    // Initialize drag and drop
    function initDragAndDrop() {
        const phraseItems = document.querySelectorAll('.phrase-item');
        
        phraseItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', handleDragOver);
            zone.addEventListener('drop', handleDrop);
            zone.addEventListener('dragleave', handleDragLeave);
            zone.addEventListener('dragenter', handleDragEnter);
        });

        // Also make the phrases container a drop zone for returning items
        if (phrasesContainer) {
            phrasesContainer.addEventListener('dragover', handleDragOver);
            phrasesContainer.addEventListener('drop', handleDropToOriginal);
        }
    }

    function handleDragStart(e) {
        draggedElement = this;
        initialParent = this.parentElement;
        this.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        
        // Remove drag-over class from all drop zones
        dropZones.forEach(zone => {
            zone.classList.remove('drag-over');
        });
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        e.preventDefault();

        this.classList.remove('drag-over');

        if (draggedElement) {
            const droppedItemsContainer = this.querySelector('.dropped-items');
            
            // Remove from original location
            draggedElement.remove();
            
            // Add to new location
            droppedItemsContainer.appendChild(draggedElement);
            
            // Update styling for dropped item
            draggedElement.classList.remove('bg-blue-100', 'border-blue-300');
            draggedElement.classList.add('bg-white', 'border-slate-300', 'text-sm');
        }

        return false;
    }

    function handleDropToOriginal(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        e.preventDefault();

        if (draggedElement && !draggedElement.closest('#phrases-container')) {
            // Remove from current location
            draggedElement.remove();
            
            // Add back to original container
            phrasesContainer.appendChild(draggedElement);
            
            // Restore original styling
            draggedElement.classList.remove('bg-white', 'border-slate-300', 'text-sm');
            draggedElement.classList.add('bg-blue-100', 'border-blue-300');
        }

        return false;
    }

    function checkAnswers() {
        let correct = 0;
        let total = 0;
        const results = [];

        dropZones.forEach(zone => {
            const category = zone.dataset.category;
            const droppedItems = zone.querySelectorAll('.phrase-item');
            
            droppedItems.forEach(item => {
                total++;
                const answer = item.dataset.answer;
                
                if (answer === category) {
                    correct++;
                    item.classList.remove('border-red-500');
                    item.classList.add('border-green-500');
                    results.push({ item, isCorrect: true });
                } else {
                    item.classList.remove('border-green-500');
                    item.classList.add('border-red-500');
                    results.push({ item, isCorrect: false });
                }
            });
        });

        // Check if all items have been placed
        const remainingItems = phrasesContainer.querySelectorAll('.phrase-item').length;
        
        if (remainingItems > 0) {
            resultDiv.innerHTML = `
                <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded">
                    <p class="font-bold">⚠️ Atención</p>
                    <p>Aún tienes ${remainingItems} frase(s) sin clasificar. Arrastra todas las frases a una categoría antes de verificar.</p>
                </div>
            `;
            return;
        }

        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        let message = '';
        let colorClass = '';
        
        if (percentage === 100) {
            message = '¡Excelente! Has clasificado correctamente todas las frases.';
            colorClass = 'bg-green-100 border-green-500 text-green-800';
        } else if (percentage >= 70) {
            message = '¡Buen trabajo! Revisa las frases marcadas en rojo para mejorar.';
            colorClass = 'bg-blue-100 border-blue-500 text-blue-800';
        } else if (percentage >= 50) {
            message = 'Vas por buen camino. Revisa las definiciones y vuelve a intentarlo.';
            colorClass = 'bg-yellow-100 border-yellow-500 text-yellow-800';
        } else {
            message = 'Necesitas repasar los conceptos. Revisa el contenido y vuelve a intentarlo.';
            colorClass = 'bg-red-100 border-red-500 text-red-800';
        }

        resultDiv.innerHTML = `
            <div class="${colorClass} border-l-4 p-4 rounded">
                <p class="font-bold">Resultado: ${correct} de ${total} correctas (${percentage}%)</p>
                <p>${message}</p>
            </div>
        `;
    }

    function resetActivity() {
        // Move all items back to original container
        const allPhraseItems = document.querySelectorAll('.phrase-item');
        
        allPhraseItems.forEach(item => {
            // Remove from current location
            item.remove();
            
            // Add back to phrases container
            phrasesContainer.appendChild(item);
            
            // Reset styling
            item.classList.remove('bg-white', 'border-slate-300', 'text-sm', 'border-green-500', 'border-red-500');
            item.classList.add('bg-blue-100', 'border-blue-300');
        });

        // Clear result message
        resultDiv.innerHTML = '';
    }

    // Event listeners for buttons
    if (checkButton) {
        checkButton.addEventListener('click', checkAnswers);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetActivity);
    }

    // Initialize the drag and drop functionality
    initDragAndDrop();

    // ========================================
    // ACTIVITY 2: Emoji Drag and Drop
    // ========================================
    
    const emojisContainer = document.getElementById('emojis-container');
    const dropZonesEmoji = document.querySelectorAll('.drop-zone-emoji');
    const checkEmojiButton = document.getElementById('check-emoji-btn');
    const resetEmojiButton = document.getElementById('reset-emoji-btn');
    const emojiResultDiv = document.getElementById('emoji-result');
    
    let draggedEmoji = null;

    // Initialize emoji drag and drop
    function initEmojiDragAndDrop() {
        const emojiItems = document.querySelectorAll('.emoji-item');
        
        emojiItems.forEach(item => {
            item.addEventListener('dragstart', handleEmojiDragStart);
            item.addEventListener('dragend', handleEmojiDragEnd);
        });

        dropZonesEmoji.forEach(zone => {
            zone.addEventListener('dragover', handleEmojiDragOver);
            zone.addEventListener('drop', handleEmojiDrop);
            zone.addEventListener('dragleave', handleEmojiDragLeave);
            zone.addEventListener('dragenter', handleEmojiDragEnter);
        });

        // Make the emojis container a drop zone for returning items
        if (emojisContainer) {
            emojisContainer.addEventListener('dragover', handleEmojiDragOver);
            emojisContainer.addEventListener('drop', handleEmojiDropToOriginal);
        }
    }

    function handleEmojiDragStart(e) {
        draggedEmoji = this;
        this.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleEmojiDragEnd(e) {
        this.style.opacity = '1';
        
        dropZonesEmoji.forEach(zone => {
            zone.classList.remove('drag-over');
        });
    }

    function handleEmojiDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleEmojiDragEnter(e) {
        this.classList.add('drag-over');
    }

    function handleEmojiDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleEmojiDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        e.preventDefault();

        this.classList.remove('drag-over');

        if (draggedEmoji) {
            const droppedEmojisContainer = this.querySelector('.dropped-emojis');
            
            draggedEmoji.remove();
            droppedEmojisContainer.appendChild(draggedEmoji);
            
            // Update styling for dropped emoji
            draggedEmoji.classList.remove('bg-indigo-100', 'border-indigo-300');
            draggedEmoji.classList.add('bg-white', 'border-slate-300', 'text-sm');
        }

        return false;
    }

    function handleEmojiDropToOriginal(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        e.preventDefault();

        if (draggedEmoji && !draggedEmoji.closest('#emojis-container')) {
            draggedEmoji.remove();
            emojisContainer.appendChild(draggedEmoji);
            
            // Restore original styling
            draggedEmoji.classList.remove('bg-white', 'border-slate-300', 'text-sm');
            draggedEmoji.classList.add('bg-indigo-100', 'border-indigo-300');
        }

        return false;
    }

    function checkEmojiAnswers() {
        let correct = 0;
        let total = 0;

        dropZonesEmoji.forEach(zone => {
            const category = zone.dataset.category;
            const droppedEmojis = zone.querySelectorAll('.emoji-item');
            
            droppedEmojis.forEach(item => {
                total++;
                const answer = item.dataset.answer;
                
                if (answer === category) {
                    correct++;
                    item.classList.remove('border-red-500');
                    item.classList.add('border-green-500');
                } else {
                    item.classList.remove('border-green-500');
                    item.classList.add('border-red-500');
                }
            });
        });

        // Check if all items have been placed
        const remainingEmojis = emojisContainer.querySelectorAll('.emoji-item').length;
        
        if (remainingEmojis > 0) {
            emojiResultDiv.innerHTML = `
                <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded">
                    <p class="font-bold">⚠️ Atención</p>
                    <p>Aún tienes ${remainingEmojis} emoji(s) sin clasificar. Arrastra todos los emojis a una categoría antes de verificar.</p>
                </div>
            `;
            return;
        }

        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        let message = '';
        let colorClass = '';
        
        if (percentage === 100) {
            message = '¡Perfecto! Has identificado correctamente todas las expresiones corporales.';
            colorClass = 'bg-green-100 border-green-500 text-green-800';
        } else if (percentage >= 75) {
            message = '¡Muy bien! Revisa los emojis marcados en rojo para mejorar.';
            colorClass = 'bg-blue-100 border-blue-500 text-blue-800';
        } else if (percentage >= 50) {
            message = 'Buen intento. Revisa el lenguaje corporal de cada estilo y vuelve a intentarlo.';
            colorClass = 'bg-yellow-100 border-yellow-500 text-yellow-800';
        } else {
            message = 'Necesitas repasar el lenguaje corporal. Revisa el contenido sobre técnicas asertivas.';
            colorClass = 'bg-red-100 border-red-500 text-red-800';
        }

        emojiResultDiv.innerHTML = `
            <div class="${colorClass} border-l-4 p-4 rounded">
                <p class="font-bold">Resultado: ${correct} de ${total} correctas (${percentage}%)</p>
                <p>${message}</p>
            </div>
        `;
    }

    function resetEmojiActivity() {
        const allEmojiItems = document.querySelectorAll('.emoji-item');
        
        allEmojiItems.forEach(item => {
            item.remove();
            emojisContainer.appendChild(item);
            
            // Reset styling
            item.classList.remove('bg-white', 'border-slate-300', 'text-sm', 'border-green-500', 'border-red-500');
            item.classList.add('bg-indigo-100', 'border-indigo-300');
        });

        emojiResultDiv.innerHTML = '';
    }

    // Event listeners for emoji activity buttons
    if (checkEmojiButton) {
        checkEmojiButton.addEventListener('click', checkEmojiAnswers);
    }

    if (resetEmojiButton) {
        resetEmojiButton.addEventListener('click', resetEmojiActivity);
    }

    // Initialize the emoji drag and drop functionality
    if (emojisContainer) {
        initEmojiDragAndDrop();
    }
});