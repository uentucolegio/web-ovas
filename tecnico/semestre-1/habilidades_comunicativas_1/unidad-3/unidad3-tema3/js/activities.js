// Connection Activity for Roles and Descriptions
document.addEventListener('DOMContentLoaded', function() {
    const svg = document.getElementById('connection-svg');
    const roleItems = document.querySelectorAll('.role-item');
    const descriptionItems = document.querySelectorAll('.description-item');
    const checkButton = document.getElementById('check-connections-btn');
    const resetButton = document.getElementById('reset-connections-btn');
    const resultDiv = document.getElementById('connections-result');
    
    let selectedRole = null;
    let connections = [];
    
    // Correct answers mapping
    const correctAnswers = {
        'vocero': 'expone',
        'secretario': 'registra',
        'creativo': 'aporta',
        'lider': 'organiza'
    };

    // Initialize connection activity
    function initConnectionActivity() {
        // Set up SVG dimensions
        updateSVGDimensions();
        
        // Add click listeners to roles
        roleItems.forEach(item => {
            item.addEventListener('click', handleRoleClick);
        });
        
        // Add click listeners to descriptions
        descriptionItems.forEach(item => {
            item.addEventListener('click', handleDescriptionClick);
        });
        
        // Update SVG on window resize
        window.addEventListener('resize', updateSVGDimensions);
    }
    
    function updateSVGDimensions() {
        const container = svg.parentElement;
        const rect = container.getBoundingClientRect();
        svg.setAttribute('width', rect.width);
        svg.setAttribute('height', rect.height);
        redrawConnections();
    }
    
    function handleRoleClick(e) {
        const roleItem = this;
        const role = roleItem.dataset.role;
        
        // If this role is already connected, remove the connection
        const existingConnection = connections.find(conn => conn.role === role);
        if (existingConnection) {
            removeConnection(existingConnection);
        }
        
        // Deselect all roles
        roleItems.forEach(item => item.classList.remove('ring-4', 'ring-blue-400'));
        
        // Select this role
        roleItem.classList.add('ring-4', 'ring-blue-400');
        selectedRole = { element: roleItem, role: role };
    }
    
    function handleDescriptionClick(e) {
        if (!selectedRole) return;
        
        const descriptionItem = this;
        const description = descriptionItem.dataset.description;
        
        // If this description is already connected, remove the connection
        const existingConnection = connections.find(conn => conn.description === description);
        if (existingConnection) {
            removeConnection(existingConnection);
        }
        
        // Create new connection
        const connection = {
            role: selectedRole.role,
            description: description,
            roleElement: selectedRole.element,
            descriptionElement: descriptionItem
        };
        
        connections.push(connection);
        
        // Update visual state
        selectedRole.element.classList.remove('ring-4', 'ring-blue-400');
        selectedRole.element.classList.add('bg-blue-200', 'border-blue-500');
        selectedRole.element.dataset.connected = 'true';
        
        descriptionItem.classList.add('bg-green-200', 'border-green-500');
        descriptionItem.dataset.connected = 'true';
        
        // Draw the line
        drawConnection(connection);
        
        // Reset selection
        selectedRole = null;
    }
    
    function drawConnection(connection) {
        const roleRect = connection.roleElement.getBoundingClientRect();
        const descRect = connection.descriptionElement.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        
        const x1 = roleRect.right - svgRect.left;
        const y1 = roleRect.top + roleRect.height / 2 - svgRect.top;
        const x2 = descRect.left - svgRect.left;
        const y2 = descRect.top + descRect.height / 2 - svgRect.top;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#3b82f6');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('data-role', connection.role);
        line.setAttribute('data-description', connection.description);
        
        svg.appendChild(line);
        connection.lineElement = line;
    }
    
    function removeConnection(connection) {
        // Remove from connections array
        const index = connections.findIndex(conn => 
            conn.role === connection.role && conn.description === connection.description
        );
        if (index > -1) {
            connections.splice(index, 1);
        }
        
        // Reset visual state
        connection.roleElement.classList.remove('bg-blue-200', 'border-blue-500');
        connection.roleElement.dataset.connected = 'false';
        
        connection.descriptionElement.classList.remove('bg-green-200', 'border-green-500');
        connection.descriptionElement.dataset.connected = 'false';
        
        // Remove line
        if (connection.lineElement) {
            connection.lineElement.remove();
        }
    }
    
    function redrawConnections() {
        // Clear all lines
        svg.innerHTML = '';
        
        // Redraw all connections
        connections.forEach(connection => {
            drawConnection(connection);
        });
    }
    
    function checkConnections() {
        if (connections.length < 4) {
            resultDiv.innerHTML = `
                <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded">
                    <p class="font-bold">⚠️ Atención</p>
                    <p>Aún tienes ${4 - connections.length} conexión(es) sin hacer. Conecta todos los roles con sus descripciones.</p>
                </div>
            `;
            return;
        }
        
        let correct = 0;
        connections.forEach(connection => {
            if (correctAnswers[connection.role] === connection.description) {
                correct++;
                connection.lineElement.setAttribute('stroke', '#22c55e');
                connection.lineElement.setAttribute('stroke-width', '4');
            } else {
                connection.lineElement.setAttribute('stroke', '#ef4444');
                connection.lineElement.setAttribute('stroke-width', '4');
            }
        });
        
        const percentage = Math.round((correct / 4) * 100);
        let message = '';
        let colorClass = '';
        
        if (percentage === 100) {
            message = '¡Excelente! Has conectado correctamente todos los roles con sus funciones.';
            colorClass = 'bg-green-100 border-green-500 text-green-800';
        } else if (percentage >= 75) {
            message = '¡Muy bien! Revisa las conexiones marcadas en rojo.';
            colorClass = 'bg-blue-100 border-blue-500 text-blue-800';
        } else if (percentage >= 50) {
            message = 'Vas por buen camino. Revisa las funciones de cada rol.';
            colorClass = 'bg-yellow-100 border-yellow-500 text-yellow-800';
        } else {
            message = 'Necesitas repasar los roles y sus funciones. Inténtalo nuevamente.';
            colorClass = 'bg-red-100 border-red-500 text-red-800';
        }
        
        resultDiv.innerHTML = `
            <div class="${colorClass} border-l-4 p-4 rounded">
                <p class="font-bold">Resultado: ${correct} de 4 conexiones correctas (${percentage}%)</p>
                <p>${message}</p>
            </div>
        `;
    }
    
    function resetActivity() {
        // Clear all connections
        connections.forEach(connection => {
            removeConnection(connection);
        });
        connections = [];
        
        // Clear SVG
        svg.innerHTML = '';
        
        // Reset selection
        selectedRole = null;
        
        // Clear result
        resultDiv.innerHTML = '';
    }

    // Event listeners for buttons
    if (checkButton) {
        checkButton.addEventListener('click', checkConnections);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetActivity);
    }

    // Initialize the connection activity
    initConnectionActivity();

    // ========================================
    // ACTIVITY 2: Words Drag and Drop
    // ========================================
    
    const wordsContainer = document.getElementById('words-container');
    const dropZonesWords = document.querySelectorAll('.drop-zone-word');
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

        dropZonesWords.forEach(zone => {
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
        
        dropZonesWords.forEach(zone => {
            zone.classList.remove('drag-over');
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
        this.classList.add('drag-over');
    }

    function handleWordDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleWordDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        e.preventDefault();

        this.classList.remove('drag-over');

        if (draggedWord) {
            // If the drop zone already has a word, return it to the container
            const existingWord = this.querySelector('.word-item');
            if (existingWord) {
                wordsContainer.appendChild(existingWord);
                existingWord.classList.remove('bg-white', 'border-slate-300', 'text-sm');
                existingWord.classList.add('bg-green-100', 'border-green-300');
            }
            
            draggedWord.remove();
            this.appendChild(draggedWord);
            
            // Update styling for dropped word
            draggedWord.classList.remove('bg-green-100', 'border-green-300');
            draggedWord.classList.add('bg-white', 'border-slate-300', 'text-sm');
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
            draggedWord.classList.remove('bg-white', 'border-slate-300', 'text-sm');
            draggedWord.classList.add('bg-green-100', 'border-green-300');
        }

        return false;
    }

    function checkWordAnswers() {
        let correct = 0;
        let total = 0;

        dropZonesWords.forEach(zone => {
            const expectedAnswer = zone.dataset.answer;
            const droppedWord = zone.querySelector('.word-item');
            
            if (droppedWord) {
                total++;
                const actualAnswer = droppedWord.dataset.word;
                
                if (actualAnswer === expectedAnswer) {
                    correct++;
                    droppedWord.classList.remove('border-red-500');
                    droppedWord.classList.add('border-green-500');
                    zone.classList.remove('border-red-500');
                    zone.classList.add('border-green-500', 'bg-green-50');
                } else {
                    droppedWord.classList.remove('border-green-500');
                    droppedWord.classList.add('border-red-500');
                    zone.classList.remove('border-green-500');
                    zone.classList.add('border-red-500', 'bg-red-50');
                }
            }
        });

        // Check if all items have been placed
        const remainingWords = wordsContainer.querySelectorAll('.word-item').length;
        
        if (remainingWords > 0) {
            wordsResultDiv.innerHTML = `
                <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded">
                    <p class="font-bold">⚠️ Atención</p>
                    <p>Aún tienes ${remainingWords} palabra(s) sin colocar. Arrastra todas las palabras a los espacios vacíos antes de verificar.</p>
                </div>
            `;
            return;
        }

        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        let message = '';
        let colorClass = '';
        
        if (percentage === 100) {
            message = '¡Excelente! Has completado correctamente todas las oraciones.';
            colorClass = 'bg-green-100 border-green-500 text-green-800';
        } else if (percentage >= 75) {
            message = '¡Muy bien! Revisa las palabras marcadas en rojo para mejorar.';
            colorClass = 'bg-blue-100 border-blue-500 text-blue-800';
        } else if (percentage >= 50) {
            message = 'Buen intento. Revisa el significado de cada palabra y vuelve a intentarlo.';
            colorClass = 'bg-yellow-100 border-yellow-500 text-yellow-800';
        } else {
            message = 'Necesitas repasar los conceptos sobre grupos y equipos. Revisa el contenido e inténtalo nuevamente.';
            colorClass = 'bg-red-100 border-red-500 text-red-800';
        }

        wordsResultDiv.innerHTML = `
            <div class="${colorClass} border-l-4 p-4 rounded">
                <p class="font-bold">Resultado: ${correct} de ${total} correctas (${percentage}%)</p>
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
            item.classList.remove('bg-white', 'border-slate-300', 'text-sm', 'border-green-500', 'border-red-500');
            item.classList.add('bg-green-100', 'border-green-300');
        });

        // Reset drop zones styling
        dropZonesWords.forEach(zone => {
            zone.classList.remove('border-green-500', 'border-red-500', 'bg-green-50', 'bg-red-50');
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