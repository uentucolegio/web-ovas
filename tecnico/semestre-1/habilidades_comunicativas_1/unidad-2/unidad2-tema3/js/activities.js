// JS para verificación de actividades independientes
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // ACTIVIDAD 1: Juego de Emparejamiento
    // ========================================
    
    // Variables globales para el juego de emparejamiento
    let selectedConcept = null;
    let matches = {};
    
    // Mapeo de respuestas correctas
    const correctMatches = {
        'diapositivas': 'diapositivas',
        'video': 'video',
        'imagen': 'imagen',
        'grafico': 'grafico'
    };
    
    // Función para resetear estilos
    function resetConceptStyles() {
        document.querySelectorAll('.concept-item').forEach(item => {
            item.classList.remove('ring-4', 'ring-blue-500', 'ring-red-500', 'ring-green-500', 'ring-purple-500', 'scale-105');
        });
    }
    
    // Función para resetear definiciones
    function resetDefinitionStyles() {
        document.querySelectorAll('.definition-item').forEach(item => {
            item.classList.remove('border-solid', 'border-blue-500', 'border-red-500', 'border-green-500', 'border-purple-500', 'bg-blue-50', 'bg-red-50', 'bg-green-50', 'bg-purple-50');
        });
    }
    
    // Función para obtener el color según el concepto
    function getColorClass(concept) {
        const colors = {
            'diapositivas': 'blue',
            'video': 'red',
            'imagen': 'green',
            'grafico': 'purple'
        };
        return colors[concept] || 'gray';
    }
    
    // Event listeners para conceptos
    const conceptItems = document.querySelectorAll('.concept-item');
    conceptItems.forEach(item => {
        item.addEventListener('click', function() {
            const concept = this.dataset.concept;
            
            // Si ya está emparejado, no hacer nada
            if (matches[concept]) {
                return;
            }
            
            // Resetear estilos previos
            resetConceptStyles();
            
            // Marcar como seleccionado
            selectedConcept = concept;
            const color = getColorClass(concept);
            this.classList.add('ring-4', `ring-${color}-500`, 'scale-105');
        });
    });
    
    // Event listeners para definiciones
    const definitionItems = document.querySelectorAll('.definition-item');
    definitionItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!selectedConcept) {
                // Mostrar mensaje si no hay concepto seleccionado
                const resultDiv = document.getElementById('matching-result');
                resultDiv.innerHTML = '<div class="text-yellow-700 bg-yellow-50 border border-yellow-300 rounded-lg p-3">⚠️ Primero selecciona un recurso audiovisual</div>';
                setTimeout(() => {
                    resultDiv.innerHTML = '';
                }, 2000);
                return;
            }
            
            const definition = this.dataset.definition;
            const color = getColorClass(selectedConcept);
            
            // Verificar si la definición ya está emparejada
            const alreadyMatched = Object.values(matches).includes(definition);
            if (alreadyMatched) {
                const resultDiv = document.getElementById('matching-result');
                resultDiv.innerHTML = '<div class="text-yellow-700 bg-yellow-50 border border-yellow-300 rounded-lg p-3">⚠️ Esta definición ya está emparejada</div>';
                setTimeout(() => {
                    resultDiv.innerHTML = '';
                }, 2000);
                return;
            }
            
            // Guardar el emparejamiento
            matches[selectedConcept] = definition;
            
            // Actualizar visualización
            this.classList.remove('border-dashed', 'border-gray-300', 'bg-gray-50');
            this.classList.add('border-solid', `border-${color}-500`, `bg-${color}-50`);
            
            // Mostrar el concepto emparejado en la definición
            const matchedDiv = this.querySelector('.matched-concept');
            const conceptText = document.querySelector(`[data-concept="${selectedConcept}"] .concept-name`).textContent.trim();
            matchedDiv.innerHTML = `<div class="mt-2 pt-2 border-t border-${color}-300 text-sm font-semibold text-${color}-700">✓ Emparejado con: ${conceptText}</div>`;
            matchedDiv.classList.remove('hidden');
            
            // Ocultar el concepto seleccionado
            const conceptElement = document.querySelector(`[data-concept="${selectedConcept}"]`);
            conceptElement.style.opacity = '0.5';
            conceptElement.style.pointerEvents = 'none';
            
            // Resetear selección
            resetConceptStyles();
            selectedConcept = null;
            
            // Limpiar mensaje de resultado
            document.getElementById('matching-result').innerHTML = '';
        });
    });
    
    // Botón para verificar respuestas
    const checkMatchingBtn = document.getElementById('check-matching-btn');
    if (checkMatchingBtn) {
        checkMatchingBtn.addEventListener('click', function() {
            const totalMatches = Object.keys(correctMatches).length;
            const userMatches = Object.keys(matches).length;
            
            if (userMatches === 0) {
                const resultDiv = document.getElementById('matching-result');
                resultDiv.innerHTML = '<div class="text-red-700 bg-red-50 border border-red-300 rounded-lg p-4">❌ No has realizado ningún emparejamiento. Haz clic en un recurso y luego en su definición.</div>';
                return;
            }
            
            if (userMatches < totalMatches) {
                const resultDiv = document.getElementById('matching-result');
                resultDiv.innerHTML = `<div class="text-yellow-700 bg-yellow-50 border border-yellow-300 rounded-lg p-4">⚠️ Has emparejado ${userMatches} de ${totalMatches}. Completa todos los emparejamientos antes de verificar.</div>`;
                return;
            }
            
            // Verificar respuestas
            let correctCount = 0;
            const feedback = [];
            
            for (const [concept, definition] of Object.entries(matches)) {
                const isCorrect = correctMatches[concept] === definition;
                const conceptElement = document.querySelector(`[data-concept="${concept}"]`);
                const definitionElement = document.querySelector(`[data-definition="${definition}"]`);
                const conceptText = conceptElement.querySelector('.concept-name').textContent.trim();
                
                if (isCorrect) {
                    correctCount++;
                    feedback.push(`✅ ${conceptText} - Correcto`);
                    definitionElement.classList.add('border-green-500', 'bg-green-50');
                    definitionElement.classList.remove('border-blue-500', 'border-red-500', 'border-purple-500', 'border-yellow-500');
                } else {
                    feedback.push(`❌ ${conceptText} - Incorrecto`);
                    definitionElement.classList.add('border-red-500', 'bg-red-50');
                    definitionElement.classList.remove('border-blue-500', 'border-green-500', 'border-purple-500', 'border-yellow-500');
                }
            }
            
            // Mostrar resultado
            const resultDiv = document.getElementById('matching-result');
            const percentage = Math.round((correctCount / totalMatches) * 100);
            let mensaje = `<div class="text-lg mb-3"><strong>Resultado: ${correctCount} de ${totalMatches} emparejamientos correctos (${percentage}%)</strong></div>`;
            
            if (correctCount === totalMatches) {
                mensaje += '<div class="text-2xl mb-2">🎉 ¡Perfecto! Has emparejado todos los recursos correctamente.</div>';
                resultDiv.className = 'mt-4 p-4 font-medium text-green-700 bg-green-50 border border-green-300 rounded-lg';
            } else if (correctCount >= totalMatches * 0.75) {
                mensaje += '<div class="text-2xl mb-2">👍 ¡Muy bien! Solo algunos ajustes y lo tendrás perfecto.</div>';
                resultDiv.className = 'mt-4 p-4 font-medium text-blue-700 bg-blue-50 border border-blue-300 rounded-lg';
            } else if (correctCount >= totalMatches * 0.5) {
                mensaje += '<div class="text-2xl mb-2">📚 Buen intento. Revisa el contenido para mejorar.</div>';
                resultDiv.className = 'mt-4 p-4 font-medium text-yellow-700 bg-yellow-50 border border-yellow-300 rounded-lg';
            } else {
                mensaje += '<div class="text-2xl mb-2">💪 Sigue practicando. Revisa el contenido nuevamente.</div>';
                resultDiv.className = 'mt-4 p-4 font-medium text-red-700 bg-red-50 border border-red-300 rounded-lg';
            }
            
            mensaje += '<div class="mt-3 text-sm">' + feedback.join('<br>') + '</div>';
            resultDiv.innerHTML = mensaje;
            
            // Scroll suave al resultado
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    
    // Botón para reiniciar
    const resetMatchingBtn = document.getElementById('reset-matching-btn');
    if (resetMatchingBtn) {
        resetMatchingBtn.addEventListener('click', function() {
            // Resetear variables
            selectedConcept = null;
            matches = {};
            
            // Resetear estilos de conceptos
            document.querySelectorAll('.concept-item').forEach(item => {
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto';
                item.classList.remove('ring-4', 'ring-blue-500', 'ring-red-500', 'ring-green-500', 'ring-purple-500', 'scale-105');
            });
            
            // Resetear estilos de definiciones
            document.querySelectorAll('.definition-item').forEach(item => {
                item.classList.remove('border-solid', 'border-blue-500', 'border-red-500', 'border-green-500', 'border-purple-500', 'border-yellow-500', 'bg-blue-50', 'bg-red-50', 'bg-green-50', 'bg-purple-50');
                item.classList.add('border-dashed', 'border-gray-300', 'bg-gray-50');
                
                const matchedDiv = item.querySelector('.matched-concept');
                matchedDiv.innerHTML = '';
                matchedDiv.classList.add('hidden');
            });
            
            // Limpiar mensaje de resultado
            document.getElementById('matching-result').innerHTML = '';
        });
    }

    // ========================================
    // ACTIVIDAD 2: Sopa de Letras
    // ========================================
    
    const words = ['CANVA', 'POWERPOINT', 'GOOGLESLIDES', 'CAPCUT'];
    const gridSize = 15;
    let grid = [];
    let foundWords = new Set();
    let isSelecting = false;
    let selectedCells = [];
    let selectionDirection = null;
    
    // Inicializar la cuadrícula
    function initGrid() {
        grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
        foundWords.clear();
        selectedCells = [];
        selectionDirection = null;
        
        // Colocar las palabras en la cuadrícula
        words.forEach(word => placeWord(word));
        
        // Llenar espacios vacíos con letras aleatorias
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === '') {
                    grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }
        
        renderGrid();
    }
    
    // Colocar una palabra en la cuadrícula
    function placeWord(word) {
        const directions = [
            { dx: 0, dy: 1 },   // Horizontal derecha
            { dx: 1, dy: 0 },   // Vertical abajo
            { dx: 1, dy: 1 },   // Diagonal abajo-derecha
            { dx: 1, dy: -1 }   // Diagonal abajo-izquierda
        ];
        
        let placed = false;
        let attempts = 0;
        const maxAttempts = 100;
        
        while (!placed && attempts < maxAttempts) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const startRow = Math.floor(Math.random() * gridSize);
            const startCol = Math.floor(Math.random() * gridSize);
            
            if (canPlaceWord(word, startRow, startCol, direction)) {
                // Colocar la palabra
                for (let i = 0; i < word.length; i++) {
                    const row = startRow + i * direction.dx;
                    const col = startCol + i * direction.dy;
                    grid[row][col] = word[i];
                }
                placed = true;
            }
            attempts++;
        }
    }
    
    // Verificar si se puede colocar una palabra
    function canPlaceWord(word, startRow, startCol, direction) {
        for (let i = 0; i < word.length; i++) {
            const row = startRow + i * direction.dx;
            const col = startCol + i * direction.dy;
            
            if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
                return false;
            }
            
            if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
                return false;
            }
        }
        return true;
    }
    
    // Renderizar la cuadrícula
    function renderGrid() {
        const gridContainer = document.getElementById('word-search-grid');
        gridContainer.innerHTML = '';
        
        const table = document.createElement('table');
        table.className = 'border-collapse';
        
        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('td');
                cell.textContent = grid[i][j];
                cell.className = 'w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base border border-gray-300 text-center font-bold text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors select-none';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                // Event listeners para selección
                cell.addEventListener('mousedown', startSelection);
                cell.addEventListener('mouseenter', continueSelection);
                cell.addEventListener('mouseup', endSelection);
                cell.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    startSelection.call(cell, e);
                });
                cell.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (element && element.dataset.row) {
                        continueSelection.call(element, e);
                    }
                });
                cell.addEventListener('touchend', endSelection);
                
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        
        gridContainer.appendChild(table);
    }
    
    // Calcular la dirección entre dos celdas
    function getDirection(cell1, cell2) {
        const row1 = parseInt(cell1.dataset.row);
        const col1 = parseInt(cell1.dataset.col);
        const row2 = parseInt(cell2.dataset.row);
        const col2 = parseInt(cell2.dataset.col);
        
        const dRow = Math.sign(row2 - row1);
        const dCol = Math.sign(col2 - col1);
        
        return { dRow, dCol };
    }
    
    // Verificar si una celda está en la misma línea
    function isInLine(startCell, currentCell, direction) {
        const startRow = parseInt(startCell.dataset.row);
        const startCol = parseInt(startCell.dataset.col);
        const currentRow = parseInt(currentCell.dataset.row);
        const currentCol = parseInt(currentCell.dataset.col);
        
        const rowDiff = currentRow - startRow;
        const colDiff = currentCol - startCol;
        
        // Verificar si la celda está en la dirección correcta
        if (direction.dRow === 0 && direction.dCol === 0) return true;
        
        if (direction.dRow === 0) {
            // Horizontal
            return rowDiff === 0 && Math.sign(colDiff) === direction.dCol;
        } else if (direction.dCol === 0) {
            // Vertical
            return colDiff === 0 && Math.sign(rowDiff) === direction.dRow;
        } else {
            // Diagonal
            return Math.abs(rowDiff) === Math.abs(colDiff) && 
                   Math.sign(rowDiff) === direction.dRow && 
                   Math.sign(colDiff) === direction.dCol;
        }
    }
    
    // Iniciar selección
    function startSelection(e) {
        isSelecting = true;
        selectedCells = [this];
        selectionDirection = null;
        this.classList.add('bg-blue-200');
    }
    
    // Continuar selección
    function continueSelection(e) {
        if (!isSelecting) return;
        if (selectedCells.includes(this)) return;
        
        // Establecer dirección si tenemos al menos una celda seleccionada
        if (selectedCells.length === 1) {
            selectionDirection = getDirection(selectedCells[0], this);
        }
        
        // Verificar si la celda está en la misma línea
        if (selectedCells.length > 0 && selectionDirection) {
            if (isInLine(selectedCells[0], this, selectionDirection)) {
                // Limpiar selección previa
                selectedCells.forEach(cell => {
                    if (!cell.classList.contains('bg-green-200')) {
                        cell.classList.remove('bg-blue-200');
                    }
                });
                
                // Reconstruir selección en línea recta
                selectedCells = getCellsInLine(selectedCells[0], this, selectionDirection);
                
                selectedCells.forEach(cell => {
                    if (!cell.classList.contains('bg-green-200')) {
                        cell.classList.add('bg-blue-200');
                    }
                });
            }
        }
    }
    
    // Obtener todas las celdas en línea recta entre dos puntos
    function getCellsInLine(startCell, endCell, direction) {
        const cells = [];
        const startRow = parseInt(startCell.dataset.row);
        const startCol = parseInt(startCell.dataset.col);
        const endRow = parseInt(endCell.dataset.row);
        const endCol = parseInt(endCell.dataset.col);
        
        let currentRow = startRow;
        let currentCol = startCol;
        
        while (true) {
            const cell = document.querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`);
            if (cell) {
                cells.push(cell);
            }
            
            if (currentRow === endRow && currentCol === endCol) break;
            
            currentRow += direction.dRow;
            currentCol += direction.dCol;
            
            // Seguridad para evitar bucles infinitos
            if (Math.abs(currentRow - startRow) > gridSize || Math.abs(currentCol - startCol) > gridSize) {
                break;
            }
        }
        
        return cells;
    }
    
    // Terminar selección
    function endSelection() {
        if (!isSelecting) return;
        isSelecting = false;
        selectionDirection = null;
        
        const selectedWord = selectedCells.map(cell => cell.textContent).join('');
        
        if (words.includes(selectedWord) && !foundWords.has(selectedWord)) {
            foundWords.add(selectedWord);
            
            // Marcar las celdas como encontradas
            selectedCells.forEach(cell => {
                cell.classList.remove('bg-blue-200');
                cell.classList.add('bg-green-200', 'text-green-800');
            });
            
            // Marcar la palabra en la lista
            const wordItem = document.querySelector(`.word-item[data-word="${selectedWord}"]`);
            if (wordItem) {
                wordItem.classList.remove('bg-blue-50', 'bg-orange-50', 'bg-yellow-50', 'bg-purple-50');
                wordItem.classList.add('bg-green-100', 'border-green-400');
                wordItem.querySelector('.checkmark').classList.remove('hidden');
            }
            
            // Verificar si se encontraron todas las palabras
            if (foundWords.size === words.length) {
                const resultDiv = document.getElementById('wordsearch-result');
                resultDiv.innerHTML = '<div class="text-green-700 bg-green-50 border border-green-300 rounded-lg p-4 text-lg">🎉 ¡Felicidades! Has encontrado todas las palabras.</div>';
            }
        } else {
            // Si no es una palabra válida, quitar la selección
            selectedCells.forEach(cell => {
                if (!cell.classList.contains('bg-green-200')) {
                    cell.classList.remove('bg-blue-200');
                }
            });
        }
        
        selectedCells = [];
    }
    
    // Botón reiniciar sopa de letras
    const resetWordSearchBtn = document.getElementById('reset-wordsearch-btn');
    if (resetWordSearchBtn) {
        resetWordSearchBtn.addEventListener('click', function() {
            foundWords.clear();
            selectedCells = [];
            selectionDirection = null;
            
            // Resetear estilos de palabras
            document.querySelectorAll('.word-item').forEach((item, index) => {
                item.classList.remove('bg-green-100', 'border-green-400');
                const colors = ['bg-blue-50', 'bg-orange-50', 'bg-yellow-50', 'bg-purple-50'];
                item.classList.add(colors[index]);
                item.querySelector('.checkmark').classList.add('hidden');
            });
            
            // Limpiar mensaje
            document.getElementById('wordsearch-result').innerHTML = '';
            
            // Regenerar cuadrícula
            initGrid();
        });
    }
    
    // Botón pista
    const hintBtn = document.getElementById('hint-wordsearch-btn');
    if (hintBtn) {
        hintBtn.addEventListener('click', function() {
            const remainingWords = words.filter(word => !foundWords.has(word));
            if (remainingWords.length === 0) {
                const resultDiv = document.getElementById('wordsearch-result');
                resultDiv.innerHTML = '<div class="text-blue-700 bg-blue-50 border border-blue-300 rounded-lg p-4">Ya has encontrado todas las palabras. 🎉</div>';
                return;
            }
            
            const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
            const resultDiv = document.getElementById('wordsearch-result');
            resultDiv.innerHTML = `<div class="text-yellow-700 bg-yellow-50 border border-yellow-300 rounded-lg p-4">💡 Pista: Busca la palabra <strong>${randomWord}</strong></div>`;
            
            setTimeout(() => {
                resultDiv.innerHTML = '';
            }, 3000);
        });
    }
    
    // Inicializar la sopa de letras si existe el contenedor
    if (document.getElementById('word-search-grid')) {
        initGrid();
    }
});