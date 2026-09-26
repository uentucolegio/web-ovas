// Activities logic
document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // ACTIVITY 1: Breakpoint Simulator & Quiz
    // ========================================
    const simSlider = document.getElementById('viewport-slider');
    const mockBrowser = document.getElementById('mock-browser');
    const widthDisplay = document.getElementById('current-width-display');
    const mockMobileView = document.getElementById('mock-mobile-view');
    const mockDesktopView = document.getElementById('mock-desktop-view');

    if (simSlider && mockBrowser) {
        // Initial setup for default value
        const initialVal = simSlider.value;
        if(initialVal < 768) {
            widthDisplay.classList.add('text-green-400');
        } else {
            widthDisplay.classList.add('text-indigo-400');
        }

        simSlider.addEventListener('input', function(e) {
            const val = e.target.value;
            mockBrowser.style.maxWidth = val + 'px';
            widthDisplay.textContent = val + 'px';

            if (val < 768) {
                // Mobile View
                mockMobileView.classList.remove('hidden');
                mockMobileView.classList.add('flex');
                mockDesktopView.classList.add('hidden');
                mockDesktopView.classList.remove('flex-row');
                
                widthDisplay.classList.remove('text-indigo-400');
                widthDisplay.classList.add('text-green-400');
            } else {
                // Desktop View
                mockMobileView.classList.add('hidden');
                mockMobileView.classList.remove('flex');
                mockDesktopView.classList.remove('hidden');
                mockDesktopView.classList.add('flex-row');
                
                widthDisplay.classList.remove('text-green-400');
                widthDisplay.classList.add('text-indigo-400');
            }
        });
    }

    // Mini-Quiz logic
    const checkSimBtn = document.getElementById('check-sim-btn');
    const resetSimBtn = document.getElementById('reset-sim-btn');
    const simResult = document.getElementById('sim-result');
    const simSelects = document.querySelectorAll('.sim-select');

    if (checkSimBtn) {
        checkSimBtn.addEventListener('click', function() {
            let correctCount = 0;
            let answeredCount = 0;

            simSelects.forEach(select => {
                const val = select.value;
                if (val !== "") {
                    answeredCount++;
                    if (val === select.dataset.correct) {
                        correctCount++;
                        select.classList.remove('border-slate-300', 'border-red-500', 'bg-red-50', 'text-red-800');
                        select.classList.add('border-green-500', 'bg-green-50', 'text-green-800');
                    } else {
                        select.classList.remove('border-slate-300', 'border-green-500', 'bg-green-50', 'text-green-800');
                        select.classList.add('border-red-500', 'bg-red-50', 'text-red-800');
                    }
                }
            });

            if (answeredCount < simSelects.length) {
                simResult.innerHTML = `
                    <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded">
                        <p class="font-bold">⚠️ Atención</p>
                        <p>Aún te faltan identificar ${simSelects.length - answeredCount} concepto(s).</p>
                    </div>
                `;
                simResult.classList.remove('hidden');
                return;
            }

            const percentage = Math.round((correctCount / simSelects.length) * 100);
            let message = '';
            let colorClass = '';

            if (percentage === 100) {
                message = '¡Excelente! Tienes muy buen ojo analítico para identificar patrones UI/UX.';
                colorClass = 'bg-green-100 border-green-500 text-green-800';
            } else if (percentage >= 75) {
                message = '¡Muy bien! Revisa las opciones marcadas en rojo.';
                colorClass = 'bg-blue-100 border-blue-500 text-blue-800';
            } else {
                message = 'Prueba interactuando más veces con el slider entre 767px y 768px para ver qué cambia.';
                colorClass = 'bg-red-100 border-red-500 text-red-800';
            }

            simResult.innerHTML = `
                <div class="${colorClass} border-l-4 p-4 rounded">
                    <p class="font-bold">Resultado: ${correctCount} de ${simSelects.length} identificados con éxito (${percentage}%)</p>
                    <p>${message}</p>
                </div>
            `;
            simResult.classList.remove('hidden');
        });
    }

    if (resetSimBtn) {
        resetSimBtn.addEventListener('click', function() {
            simSelects.forEach(select => {
                select.value = "";
                select.classList.remove('border-green-500', 'bg-green-50', 'text-green-800', 'border-red-500', 'bg-red-50', 'text-red-800');
                select.classList.add('border-slate-300');
            });
            simResult.innerHTML = '';
            simResult.classList.add('hidden');
        });
    }

    // ========================================
    // ACTIVITY 2: Words Drag and Drop (Classification)
    // ========================================
    
    const wordsContainer = document.getElementById('words-container');
    const dropZonesBuckets = document.querySelectorAll('.drop-zone-bucket');
    const checkWordsButton = document.getElementById('check-words-btn');
    const resetWordsButton = document.getElementById('reset-words-btn');
    const wordsResultDiv = document.getElementById('words-result');
    
    let draggedWord = null;

    // Initialize words drag and drop
    function initWordsDragAndDrop() {
        const wordItems = document.querySelectorAll('.word-item');
        
        wordItems.forEach(item => {
            item.addEventListener('dragstart', handleWordDragStart);
            item.addEventListener('dragend', handleWordDragEnd);
        });

        dropZonesBuckets.forEach(zone => {
            zone.addEventListener('dragover', handleWordDragOver);
            zone.addEventListener('drop', handleWordDrop);
            zone.addEventListener('dragleave', handleWordDragLeave);
            zone.addEventListener('dragenter', handleWordDragEnter);
        });

        // Make the words container a drop zone for returning items
        if (wordsContainer) {
            wordsContainer.addEventListener('dragover', handleWordDragOver);
            wordsContainer.addEventListener('drop', handleWordDropToOriginal);
        }
    }

    function handleWordDragStart(e) {
        draggedWord = this;
        this.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleWordDragEnd(e) {
        this.style.opacity = '1';
        
        dropZonesBuckets.forEach(zone => {
            zone.classList.remove('drag-over', 'bg-blue-100', 'bg-emerald-100');
        });
    }

    function handleWordDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleWordDragEnter(e) {
        if(this.dataset.answer === 'movil') {
            this.classList.add('bg-blue-100');
        } else {
            this.classList.add('bg-emerald-100');
        }
    }

    function handleWordDragLeave(e) {
        this.classList.remove('bg-blue-100', 'bg-emerald-100');
    }

    function handleWordDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        e.preventDefault();

        this.classList.remove('drag-over', 'bg-blue-100', 'bg-emerald-100');

        if (draggedWord) {
            const targetContainer = this.querySelector('.bucket-container');
            draggedWord.remove();
            targetContainer.appendChild(draggedWord);
            
            // Update styling for dropped word
            draggedWord.classList.add('w-full');
            draggedWord.classList.remove('border-red-500', 'border-green-500', 'bg-green-50', 'bg-red-50');
        }

        return false;
    }

    function handleWordDropToOriginal(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        e.preventDefault();

        if (draggedWord && !draggedWord.closest('#words-container')) {
            draggedWord.remove();
            wordsContainer.appendChild(draggedWord);
            
            // Restore original styling
            draggedWord.classList.remove('w-full');
            draggedWord.classList.remove('border-red-500', 'border-green-500', 'bg-green-50', 'bg-red-50');
        }

        return false;
    }

    function checkWordAnswers() {
        let correct = 0;
        let totalPlaced = 0;

        dropZonesBuckets.forEach(zone => {
            const expectedAnswer = zone.dataset.answer;
            const droppedWords = zone.querySelectorAll('.word-item');
            
            droppedWords.forEach(droppedWord => {
                totalPlaced++;
                const actualAnswer = droppedWord.dataset.word;
                
                if (actualAnswer === expectedAnswer) {
                    correct++;
                    droppedWord.classList.remove('border-red-500', 'bg-red-50', 'border-slate-300');
                    droppedWord.classList.add('border-green-500', 'bg-green-50');
                } else {
                    droppedWord.classList.remove('border-green-500', 'bg-green-50', 'border-slate-300');
                    droppedWord.classList.add('border-red-500', 'bg-red-50');
                }
            });
        });

        // Check if all items have been placed
        const remainingWords = wordsContainer.querySelectorAll('.word-item').length;
        
        if (remainingWords > 0) {
            wordsResultDiv.innerHTML = `
                <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded mt-4">
                    <p class="font-bold">⚠️ Atención</p>
                    <p>Aún tienes ${remainingWords} patrón(es) sin clasificar. Arrastra todos a los contenedores antes de verificar.</p>
                </div>
            `;
            return;
        }

        const percentage = totalPlaced > 0 ? Math.round((correct / totalPlaced) * 100) : 0;
        
        let message = '';
        let colorClass = '';
        
        if (percentage === 100) {
            message = '¡Excelente! Has clasificado correctamente todos los patrones de diseño.';
            colorClass = 'bg-green-100 border-green-500 text-green-800';
        } else if (percentage >= 75) {
            message = '¡Muy bien! Revisa los patrones marcados en rojo que están en el dispositivo equivocado.';
            colorClass = 'bg-blue-100 border-blue-500 text-blue-800';
        } else if (percentage >= 50) {
            message = 'Buen intento. Sin embargo, hay varios patrones que pertenecen al otro entorno.';
            colorClass = 'bg-yellow-100 border-yellow-500 text-yellow-800';
        } else {
            message = 'Necesitas repasar las diferencias entre móvil y escritorio. Revisa el contenido e inténtalo nuevamente.';
            colorClass = 'bg-red-100 border-red-500 text-red-800';
        }

        wordsResultDiv.innerHTML = `
            <div class="${colorClass} border-l-4 p-4 rounded mt-4">
                <p class="font-bold">Resultado: ${correct} correctas de ${totalPlaced} (${percentage}%)</p>
                <p>${message}</p>
            </div>
        `;
    }

    function resetWordsActivity() {
        const allWordItems = document.querySelectorAll('.word-item');
        
        allWordItems.forEach(item => {
            item.remove();
            wordsContainer.appendChild(item);
            
            // Reset styling
            item.classList.remove('w-full', 'border-green-500', 'border-red-500', 'bg-green-50', 'bg-red-50');
            item.classList.add('border-slate-300', 'bg-white');
        });

        wordsResultDiv.innerHTML = '';
    }

    // Event listeners for words activity buttons
    if (checkWordsButton) {
        checkWordsButton.addEventListener('click', checkWordAnswers);
    }

    if (resetWordsButton) {
        resetWordsButton.addEventListener('click', resetWordsActivity);
    }

    // Initialize the words drag and drop functionality
    if (wordsContainer) {
        initWordsDragAndDrop();
    }
});