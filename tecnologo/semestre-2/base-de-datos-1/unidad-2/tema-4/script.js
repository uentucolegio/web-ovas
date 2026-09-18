// Interactividad del Tema 4: progreso, sopa de letras, asociación y modal.
const contentCompleted = new Set();
const activityCompleted = new Set();

const activityConfig = {
    points: 20,
    gridSize: 14,
    wordsPerRound: 8,
    pairsPerRound: 6,
    words: [
        'NORMALIZACION', 'PRIMERAFN', 'SEGUNDAFN', 'TERCERAFN', 'ATOMICIDAD',
        'REDUNDANCIA', 'ANOMALIA', 'INSERCION', 'ELIMINACION', 'ACTUALIZACION',
        'DEPENDENCIA', 'FUNCIONAL', 'PARCIAL', 'TRANSITIVA', 'ATRIBUTO',
        'DETERMINANTE', 'CANDIDATA', 'PRIMARIA', 'COMPUESTA', 'DESCOMPOSICION',
        'RELACION', 'CONSISTENCIA'
    ],
    pairs: [
        ['Normalización', 'Proceso de organizar datos para reducir redundancia y anomalías.'],
        ['Primera forma normal (1FN)', 'Exige valores atómicos y evita grupos repetitivos en una misma celda.'],
        ['Segunda forma normal (2FN)', 'Cumple 1FN y elimina dependencias parciales respecto de una clave compuesta.'],
        ['Tercera forma normal (3FN)', 'Cumple 2FN y elimina dependencias transitivas entre atributos no clave.'],
        ['Dependencia funcional', 'Relación en la que un atributo determina de manera única el valor de otro.'],
        ['Dependencia parcial', 'Un atributo depende solo de una parte de una clave primaria compuesta.'],
        ['Dependencia transitiva', 'Un atributo no clave depende de otro atributo no clave.'],
        ['Anomalía de inserción', 'Impide registrar un dato porque todavía falta información de otra entidad.'],
        ['Anomalía de actualización', 'Obliga a cambiar el mismo dato en varias filas y puede producir inconsistencias.'],
        ['Anomalía de eliminación', 'Al borrar una fila se pierde información adicional que debía conservarse.'],
        ['Redundancia', 'Repetición innecesaria de un mismo dato en varios registros.'],
        ['Atributo atómico', 'Valor indivisible que representa un solo dato dentro de una columna.']
    ]
};

function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
}

function pickDifferent(items, amount, previousKey = '') {
    let selected = [];
    for (let attempt = 0; attempt < 20; attempt++) {
        selected = shuffle(items).slice(0, amount);
        const selectedKey = selected.map(item => Array.isArray(item) ? item[0] : String(item)).sort().join('|');
        if (selectedKey !== previousKey) break;
    }
    return selected;
}

function updateProgress(type) {
    const completed = type === 'content' ? contentCompleted : activityCompleted;
    const total = type === 'content' ? 5 : 2;
    const pointsElement = document.getElementById(`${type}-points`);
    const progressElement = document.getElementById(`${type}-progress`);
    const awardElement = document.getElementById(`${type}-award`);
    if (pointsElement) pointsElement.textContent = completed.size * activityConfig.points;
    if (progressElement) progressElement.style.width = `${Math.min(100, (completed.size / total) * 100)}%`;
    if (type === 'content') {
        completed.forEach(id => {
            const badge = document.getElementById(`badge-${id}`);
            if (badge) badge.className = 'progress-badge bg-green-100 text-green-800 border-green-400';
        });
    }
    if (awardElement) awardElement.classList.toggle('hidden', completed.size !== total);
}

function completeActivity(id) {
    if (activityCompleted.has(id)) return;
    activityCompleted.add(id);
    updateProgress('activity');
}

function markAnswer(button, isCorrect, feedback, successText, retryText) {
    button.parentElement.querySelectorAll('button').forEach(item => item.classList.remove('answer-correct', 'answer-wrong'));
    button.classList.add(isCorrect ? 'answer-correct' : 'answer-wrong');
    feedback.textContent = isCorrect ? successText : retryText;
    feedback.className = `mt-3 text-sm font-bold ${isCorrect ? 'text-green-700' : 'text-red-600'}`;
}

document.querySelectorAll('.challenge-option').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.challenge;
        const isCorrect = button.dataset.correct === 'true';
        markAnswer(button, isCorrect, document.getElementById(`feedback-${id}`), '🎉 ¡Correcto! Ganaste 20 XP.', '💪 Casi. Revisa la regla de normalización e inténtalo otra vez.');
        if (isCorrect) {
            contentCompleted.add(id);
            updateProgress('content');
        }
    });
});

const wordSearch = { grid: [], placed: [], found: new Set(), start: null, path: [], previousKey: '' };

function createWordSearch() {
    const selected = pickDifferent(activityConfig.words, activityConfig.wordsPerRound, wordSearch.previousKey);
    wordSearch.previousKey = [...selected].sort().join('|');
    let built = false;
    let grid;
    let placed;
    for (let puzzleAttempt = 0; puzzleAttempt < 40 && !built; puzzleAttempt++) {
        grid = Array.from({ length: activityConfig.gridSize }, () => Array(activityConfig.gridSize).fill(''));
        placed = [];
        built = [...selected].sort((a, b) => b.length - a.length).every(word => placeWord(grid, placed, word));
    }
    if (!built) {
        setWordFeedback('No fue posible generar la sopa. Pulsa Restablecer para reintentar.', false);
        return;
    }
    const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    grid.forEach(row => row.forEach((letter, col) => {
        if (!letter) row[col] = letters[Math.floor(Math.random() * letters.length)];
    }));
    Object.assign(wordSearch, { grid, placed, found: new Set(), start: null, path: [] });
    renderWordSearch();
    setWordFeedback('Nueva sopa generada. Selecciona una letra inicial y una final.', true);
}

function placeWord(grid, placed, word) {
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (let attempt = 0; attempt < 300; attempt++) {
        const [rowStep, colStep] = directions[Math.floor(Math.random() * directions.length)];
        const row = Math.floor(Math.random() * activityConfig.gridSize);
        const col = Math.floor(Math.random() * activityConfig.gridSize);
        const cells = Array.from({ length: word.length }, (_, index) => ({ row: row + rowStep * index, col: col + colStep * index }));
        const fits = cells.every((cell, index) => cell.row >= 0 && cell.row < activityConfig.gridSize && cell.col >= 0 && cell.col < activityConfig.gridSize && (!grid[cell.row][cell.col] || grid[cell.row][cell.col] === word[index]));
        if (!fits) continue;
        cells.forEach((cell, index) => { grid[cell.row][cell.col] = word[index]; });
        placed.push({ word, cells });
        return true;
    }
    return false;
}

function renderWordSearch() {
    const gridElement = document.getElementById('wordsearch-grid');
    gridElement.style.setProperty('--grid-size', activityConfig.gridSize);
    gridElement.innerHTML = '';
    wordSearch.grid.forEach((row, rowIndex) => row.forEach((letter, colIndex) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'wordsearch-cell';
        button.textContent = letter;
        button.dataset.row = rowIndex;
        button.dataset.col = colIndex;
        button.setAttribute('role', 'gridcell');
        button.setAttribute('aria-label', `Letra ${letter}, fila ${rowIndex + 1}, columna ${colIndex + 1}`);
        button.addEventListener('click', () => selectCell(rowIndex, colIndex));
        gridElement.appendChild(button);
    }));
    renderWordBank();
    renderFoundWords();
    updateSelectionPreview();
}

function getPath(start, end) {
    if (start.row !== end.row && start.col !== end.col) return [];
    const rowStep = Math.sign(end.row - start.row);
    const colStep = Math.sign(end.col - start.col);
    const length = Math.max(Math.abs(end.row - start.row), Math.abs(end.col - start.col)) + 1;
    return Array.from({ length }, (_, index) => ({ row: start.row + rowStep * index, col: start.col + colStep * index }));
}

function selectCell(row, col) {
    if (!wordSearch.start || wordSearch.path.length > 1) {
        wordSearch.start = { row, col };
        wordSearch.path = [{ row, col }];
        setWordFeedback('Ahora selecciona la letra final y pulsa “Comprobar selección”.', true);
    } else {
        const path = getPath(wordSearch.start, { row, col });
        if (path.length) wordSearch.path = path;
        else {
            wordSearch.start = { row, col };
            wordSearch.path = [{ row, col }];
            setWordFeedback('La selección debe ser horizontal o vertical. Esta letra será el nuevo inicio.', false);
        }
    }
    updateSelectionPreview();
    updateHighlights();
}

function pathKey(cells) {
    return cells.map(cell => `${cell.row},${cell.col}`).join('|');
}

function checkSelection() {
    if (wordSearch.path.length < 2) {
        setWordFeedback('Selecciona la primera y la última letra antes de comprobar.', false);
        return;
    }
    const direct = pathKey(wordSearch.path);
    const reverse = pathKey([...wordSearch.path].reverse());
    const match = wordSearch.placed.find(item => !wordSearch.found.has(item.word) && [direct, reverse].includes(pathKey(item.cells)));
    if (match) {
        wordSearch.found.add(match.word);
        const finished = wordSearch.found.size === wordSearch.placed.length;
        setWordFeedback(finished ? `🏆 ¡Excelente! Encontraste las ${wordSearch.placed.length} palabras. +20 XP.` : `✅ Encontraste ${match.word}. Continúa con las demás.`, true);
        if (finished) completeActivity('wordsearch');
        renderWordBank();
        renderFoundWords();
    } else {
        setWordFeedback('❌ Esa línea no corresponde a una palabra pendiente. Revisa el banco e inténtalo otra vez.', false);
    }
    wordSearch.start = null;
    wordSearch.path = [];
    updateSelectionPreview();
    updateHighlights();
}

function updateHighlights() {
    document.querySelectorAll('.wordsearch-cell').forEach(cell => cell.classList.remove('is-selected', 'is-found'));
    wordSearch.placed.filter(item => wordSearch.found.has(item.word)).forEach(item => item.cells.forEach(cell => {
        document.querySelector(`.wordsearch-cell[data-row="${cell.row}"][data-col="${cell.col}"]`)?.classList.add('is-found');
    }));
    wordSearch.path.forEach(cell => document.querySelector(`.wordsearch-cell[data-row="${cell.row}"][data-col="${cell.col}"]`)?.classList.add('is-selected'));
}

function renderWordBank() {
    document.getElementById('wordsearch-bank').innerHTML = wordSearch.placed.map(item => `<span class="word-chip ${wordSearch.found.has(item.word) ? 'is-complete' : ''}">${item.word}</span>`).join('');
}

function renderFoundWords() {
    document.getElementById('wordsearch-found').innerHTML = wordSearch.found.size ? [...wordSearch.found].map(word => `<span class="word-chip is-complete">${word}</span>`).join('') : '<span class="text-sm text-slate-500">Aún no has encontrado palabras.</span>';
}

function updateSelectionPreview() {
    document.getElementById('wordsearch-selection').textContent = wordSearch.path.length ? wordSearch.path.map(cell => wordSearch.grid[cell.row][cell.col]).join('') : 'Ninguna letra seleccionada';
}

function setWordFeedback(message, success) {
    const feedback = document.getElementById('wordsearch-feedback');
    feedback.textContent = message;
    feedback.className = `mt-4 text-sm font-bold ${success ? 'text-green-700' : 'text-red-600'}`;
}

const matching = { pairs: [], selectedTerm: null, selectedDefinition: null, solved: new Set(), previousKey: '' };

function createMatching() {
    matching.pairs = pickDifferent(activityConfig.pairs, activityConfig.pairsPerRound, matching.previousKey);
    matching.previousKey = matching.pairs.map(pair => pair[0]).sort().join('|');
    matching.selectedTerm = null;
    matching.selectedDefinition = null;
    matching.solved = new Set();
    renderMatching();
    setMatchingFeedback('Selecciona un concepto y su definición.', true);
}

function renderMatching() {
    const terms = shuffle(matching.pairs.map((pair, id) => ({ id, text: pair[0] })));
    const definitions = shuffle(matching.pairs.map((pair, id) => ({ id, text: pair[1] })));
    document.getElementById('matching-terms').innerHTML = terms.map(item => matchingButton(item, 'term')).join('');
    document.getElementById('matching-definitions').innerHTML = definitions.map(item => matchingButton(item, 'definition')).join('');
    document.querySelectorAll('.matching-card').forEach(button => button.addEventListener('click', () => selectMatching(button)));
    updateMatchingCount();
}

function matchingButton(item, type) {
    return `<button type="button" class="matching-card" data-id="${item.id}" data-type="${type}">${item.text}</button>`;
}

function selectMatching(button) {
    if (button.disabled) return;
    const type = button.dataset.type;
    document.querySelectorAll(`.matching-card[data-type="${type}"]`).forEach(card => card.classList.remove('is-selected'));
    button.classList.add('is-selected');
    if (type === 'term') matching.selectedTerm = button;
    else matching.selectedDefinition = button;
    if (matching.selectedTerm && matching.selectedDefinition) evaluateMatch();
}

function evaluateMatch() {
    const term = matching.selectedTerm;
    const definition = matching.selectedDefinition;
    if (term.dataset.id === definition.dataset.id) {
        matching.solved.add(Number(term.dataset.id));
        [term, definition].forEach(card => { card.classList.remove('is-selected'); card.classList.add('is-matched'); card.disabled = true; });
        const finished = matching.solved.size === matching.pairs.length;
        setMatchingFeedback(finished ? `🏆 ¡Excelente! Relacionaste los ${matching.pairs.length} conceptos. +20 XP.` : '✅ Relación correcta. Continúa con el siguiente par.', true);
        if (finished) completeActivity('matching');
    } else {
        [term, definition].forEach(card => { card.classList.remove('is-selected'); card.classList.add('is-wrong'); });
        setMatchingFeedback('❌ Esa relación no es correcta. Revisa las definiciones e inténtalo nuevamente.', false);
        window.setTimeout(() => [term, definition].forEach(card => card.classList.remove('is-wrong')), 650);
    }
    matching.selectedTerm = null;
    matching.selectedDefinition = null;
    updateMatchingCount();
}

function updateMatchingCount() {
    document.getElementById('matching-count').textContent = `${matching.solved.size} de ${matching.pairs.length} relaciones correctas`;
}

function setMatchingFeedback(message, success) {
    const feedback = document.getElementById('matching-feedback');
    feedback.textContent = message;
    feedback.className = `mt-4 text-sm font-bold ${success ? 'text-green-700' : 'text-red-600'}`;
}

document.getElementById('wordsearch-check')?.addEventListener('click', checkSelection);
document.getElementById('wordsearch-reset')?.addEventListener('click', createWordSearch);
document.getElementById('matching-reset')?.addEventListener('click', createMatching);
createWordSearch();
createMatching();

function openImgModal(src, alt = 'Imagen ampliada') {
    document.getElementById('img-modal-src').src = src;
    document.getElementById('img-modal-src').alt = alt;
    document.getElementById('img-modal-caption').textContent = alt;
    document.getElementById('img-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeImgModal() {
    document.getElementById('img-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeImgModal();
});