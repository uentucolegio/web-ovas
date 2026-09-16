const wordsToFind = ['INSERT', 'SELECT', 'UPDATE', 'DELETE', 'CRUD', 'WHERE', 'DATOS', 'REGISTROS', 'TABLA', 'DML'];
let foundWords = new Set();
let selectedCells = [];
let wordSearchGrid = [];
let currentDragItem = null;

function generateWordSearch() {
    const size = 12;
    wordSearchGrid = Array.from({ length: size }, () => Array(size).fill(''));
    wordsToFind.forEach((word, row) => {
        [...word].forEach((letter, column) => { wordSearchGrid[row][column] = letter; });
    });
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    wordSearchGrid.forEach((row) => row.forEach((letter, index, source) => {
        if (!letter) source[index] = letters[Math.floor(Math.random() * letters.length)];
    }));
    renderWordSearch();
}

function renderWordSearch() {
    const container = document.getElementById('wordsearch-container');
    if (!container) return;
    container.innerHTML = `<div class="wordsearch-grid">${wordSearchGrid.flatMap((row, rowIndex) => row.map((letter, columnIndex) => `<button class="grid-cell" data-row="${rowIndex}" data-col="${columnIndex}">${letter}</button>`)).join('')}</div>`;
    container.querySelectorAll('.grid-cell').forEach((cell) => cell.addEventListener('click', () => selectCell(cell)));
    markFoundCells();
    updateWordListUI();
}

function selectCell(cell) {
    if (cell.classList.contains('found')) return;
    if (cell.classList.contains('selected')) {
        cell.classList.remove('selected');
        selectedCells = selectedCells.filter((selectedCell) => selectedCell !== cell);
        return;
    }

    cell.classList.add('selected');
    selectedCells.push(cell);

    const selectedPositions = selectedCells.map((selectedCell) => ({
        row: Number(selectedCell.dataset.row),
        col: Number(selectedCell.dataset.col)
    }));
    const sameRow = selectedPositions.every((position) => position.row === selectedPositions[0].row);
    const sameColumn = selectedPositions.every((position) => position.col === selectedPositions[0].col);

    if (!sameRow && !sameColumn) {
        clearSelectedCells();
        return;
    }

    const orderedPositions = [...selectedPositions].sort((first, second) => {
        return sameRow ? first.col - second.col : first.row - second.row;
    });
    const isConsecutive = orderedPositions.every((position, index) => {
        if (index === 0) return true;
        const previous = orderedPositions[index - 1];
        return sameRow ? position.col === previous.col + 1 : position.row === previous.row + 1;
    });

    if (!isConsecutive) {
        clearSelectedCells();
        return;
    }

    const word = orderedPositions.map((position) => wordSearchGrid[position.row][position.col]).join('');
    const reversedWord = [...word].reverse().join('');
    const foundWord = wordsToFind.find((candidate) => candidate === word || candidate === reversedWord);

    if (foundWord) {
        foundWords.add(foundWord);
        selectedCells = [];
        renderWordSearch();
        updateCounters();
    }
}

function clearSelectedCells() {
    selectedCells.forEach((selectedCell) => selectedCell.classList.remove('selected'));
    selectedCells = [];
}

function markFoundCells() {
    foundWords.forEach((word) => {
        const row = wordsToFind.indexOf(word);
        for (let column = 0; column < word.length; column += 1) {
            const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${column}"]`);
            if (cell) cell.classList.add('found');
        }
    });
}

function updateWordListUI() {
    document.querySelectorAll('#words-to-find li').forEach((item) => item.classList.toggle('found-word', foundWords.has(item.dataset.word)));
}

function updateCounters() {
    const foundCount = document.getElementById('found-count');
    const errors = document.getElementById('wordsearch-errors');
    if (foundCount) foundCount.textContent = foundWords.size;
    if (errors) errors.textContent = foundWords.size === wordsToFind.length ? 'Encontraste todas las palabras.' : `Faltan ${wordsToFind.length - foundWords.size} palabras.`;
}

function resetWordSearch() { foundWords.clear(); selectedCells = []; generateWordSearch(); updateCounters(); }

function initDragDrop() {
    document.querySelectorAll('.drag-item').forEach((item) => item.addEventListener('dragstart', () => { currentDragItem = item; }));
    document.querySelectorAll('.drop-area').forEach((area) => {
        area.addEventListener('dragover', (event) => event.preventDefault());
        area.addEventListener('drop', (event) => {
            event.preventDefault();
            if (!currentDragItem) return;
            const zone = area.closest('.drop-zone');
            if (zone.dataset.expected === currentDragItem.dataset.correct) {
                area.appendChild(currentDragItem);
                currentDragItem.classList.add('dropped');
                currentDragItem.draggable = false;
                updateDragCounters();
            }
            currentDragItem = null;
        });
    });
    updateDragCounters();
}

function updateDragCounters() {
    const count = document.querySelectorAll('.drop-area .drag-item').length;
    const current = document.getElementById('drag-correct-count');
    if (current) current.textContent = count;
}

function resetDragDrop() { location.reload(); }

document.addEventListener('DOMContentLoaded', () => { generateWordSearch(); initDragDrop(); updateCounters(); });
