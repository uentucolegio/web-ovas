// --- Elementos Interactivos Adicionales ---

// 1. Fill in the Blank - Completar código
class FillInTheBlank {
    constructor(containerId, code, blanks) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.code = code;
        this.blanks = blanks;
        this.userAnswers = {};
        
        this.render();
        this.attachEventListeners();
    }
    
    render() {
        let codeHtml = this.code;
        
        this.blanks.forEach((blank, index) => {
            const placeholder = `___${index}___`;
            codeHtml = codeHtml.replace(placeholder, `<input type="text" class="blank-input inline-block bg-yellow-100 border-2 border-yellow-400 px-2 py-1 rounded text-slate-800 font-mono text-sm min-w-[100px]" data-blank-id="${index}" data-answer="${blank.answer}" placeholder="${blank.hint || '?'}">`);
        });
        
        this.container.innerHTML = `
            <div class="fill-blank-container">
                <div class="bg-slate-800 text-green-400 p-4 rounded-lg mb-3">
                    <pre class="font-mono text-sm whitespace-pre-wrap">${codeHtml}</pre>
                </div>
                <button class="check-blanks-btn bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Verificar respuestas
                </button>
                <div class="blank-feedback mt-3 text-sm font-medium"></div>
            </div>
        `;
    }
    
    attachEventListeners() {
        const checkBtn = this.container.querySelector('.check-blanks-btn');
        const inputs = this.container.querySelectorAll('.blank-input');
        
        checkBtn.addEventListener('click', () => this.checkAnswers());
        
        inputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.checkAnswers();
                }
            });
        });
    }
    
    checkAnswers() {
        const inputs = this.container.querySelectorAll('.blank-input');
        const feedback = this.container.querySelector('.blank-feedback');
        let correct = 0;
        let total = inputs.length;
        
        inputs.forEach(input => {
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = input.dataset.answer.toLowerCase();
            
            if (userAnswer === correctAnswer) {
                input.classList.remove('border-yellow-400', 'border-red-400');
                input.classList.add('border-green-500', 'bg-green-50');
                correct++;
            } else {
                input.classList.remove('border-yellow-400', 'border-green-500');
                input.classList.add('border-red-400', 'bg-red-50');
            }
        });
        
        if (correct === total) {
            feedback.className = 'blank-feedback mt-3 text-sm font-medium text-green-700 bg-green-50 p-3 rounded-lg border border-green-300';
            feedback.textContent = `🎉 ¡Perfecto! ${correct}/${total} respuestas correctas`;
        } else {
            feedback.className = 'blank-feedback mt-3 text-sm font-medium text-orange-700 bg-orange-50 p-3 rounded-lg border border-orange-300';
            feedback.textContent = `📝 ${correct}/${total} correctas. Revisa las respuestas marcadas en rojo.`;
        }
    }
}

// 2. Code Matcher - Emparejar conceptos con código
class CodeMatcher {
    constructor(containerId, pairs) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.pairs = pairs;
        this.selected = null;
        this.matches = [];
        
        this.render();
        this.attachEventListeners();
    }
    
    render() {
        const concepts = this.pairs.map((p, i) => ({ id: i, text: p.concept, type: 'concept' }));
        const codes = this.pairs.map((p, i) => ({ id: i, text: p.code, type: 'code' }));
        
        const shuffledCodes = [...codes].sort(() => Math.random() - 0.5);
        
        this.container.innerHTML = `
            <div class="code-matcher" style="width: 100%; overflow-x: hidden;">
                <div style="width: 100%;">
                    <div style="width: 100%; margin-bottom: 1rem;">
                        <h4 class="font-bold text-green-800 mb-3 text-center">Conceptos</h4>
                        <div class="space-y-2">
                            ${concepts.map(c => `
                                <div class="matcher-item concept-item bg-green-100 border-2 border-green-300 p-2 rounded-lg cursor-pointer hover:bg-green-200 transition-colors" data-id="${c.id}" data-type="${c.type}" style="width: 100%; box-sizing: border-box; word-wrap: break-word;">
                                    ${c.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div style="width: 100%; margin-bottom: 1rem;">
                        <h4 class="font-bold text-blue-800 mb-3 text-center">Código</h4>
                        <div class="space-y-2">
                            ${shuffledCodes.map(c => `
                                <div class="matcher-item code-item bg-blue-100 border-2 border-blue-300 p-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors" data-id="${c.id}" data-type="${c.type}" style="width: 100%; box-sizing: border-box; word-wrap: break-word; font-size: 0.875rem;">
                                    ${c.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 mt-4">
                    <button class="check-matches-btn bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Verificar emparejamientos
                    </button>
                    <button class="reset-matches-btn bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Reiniciar
                    </button>
                </div>
                <div class="matcher-feedback mt-3 text-sm font-medium"></div>
            </div>
        `;
    }
    
    attachEventListeners() {
        const items = this.container.querySelectorAll('.matcher-item');
        const checkBtn = this.container.querySelector('.check-matches-btn');
        const resetBtn = this.container.querySelector('.reset-matches-btn');
        
        items.forEach(item => {
            item.addEventListener('click', () => this.selectItem(item));
        });
        
        checkBtn.addEventListener('click', () => this.checkMatches());
        resetBtn.addEventListener('click', () => this.reset());
    }
    
    selectItem(item) {
        if (item.classList.contains('matched')) return;
        
        if (!this.selected) {
            this.selected = item;
            item.classList.add('ring-4', 'ring-teal-500');
        } else {
            if (this.selected === item) {
                this.selected.classList.remove('ring-4', 'ring-teal-500');
                this.selected = null;
            } else if (this.selected.dataset.type !== item.dataset.type) {
                const match = {
                    conceptId: this.selected.dataset.type === 'concept' ? this.selected.dataset.id : item.dataset.id,
                    codeId: this.selected.dataset.type === 'code' ? this.selected.dataset.id : item.dataset.id
                };
                
                this.matches.push(match);
                
                this.selected.classList.remove('ring-4', 'ring-teal-500');
                this.selected.classList.add('matched', 'opacity-50');
                item.classList.add('matched', 'opacity-50');
                
                this.selected = null;
            } else {
                this.selected.classList.remove('ring-4', 'ring-teal-500');
                this.selected = item;
                item.classList.add('ring-4', 'ring-teal-500');
            }
        }
    }
    
    checkMatches() {
        const feedback = this.container.querySelector('.matcher-feedback');
        let correct = 0;
        
        this.matches.forEach(match => {
            if (match.conceptId === match.codeId) {
                correct++;
            }
        });
        
        if (correct === this.pairs.length && this.matches.length === this.pairs.length) {
            feedback.className = 'matcher-feedback mt-3 text-sm font-medium text-green-700 bg-green-50 p-3 rounded-lg border border-green-300';
            feedback.textContent = `🎉 ¡Excelente! Todos los emparejamientos son correctos (${correct}/${this.pairs.length})`;
        } else if (this.matches.length < this.pairs.length) {
            feedback.className = 'matcher-feedback mt-3 text-sm font-medium text-orange-700 bg-orange-50 p-3 rounded-lg border border-orange-300';
            feedback.textContent = `⚠️ Aún faltan ${this.pairs.length - this.matches.length} emparejamientos por hacer`;
        } else {
            feedback.className = 'matcher-feedback mt-3 text-sm font-medium text-red-700 bg-red-50 p-3 rounded-lg border border-red-300';
            feedback.textContent = `❌ ${correct}/${this.pairs.length} correctos. Intenta de nuevo.`;
        }
    }
    
    reset() {
        this.selected = null;
        this.matches = [];
        this.render();
        this.attachEventListeners();
    }
}

// 3. Code Sequencer - Ordenar líneas de código
class CodeSequencer {
    constructor(containerId, lines, correctOrder) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.lines = lines;
        this.correctOrder = correctOrder;
        this.currentOrder = [...lines].sort(() => Math.random() - 0.5);
        
        this.render();
        this.attachEventListeners();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="code-sequencer">
                <p class="text-sm text-slate-700 mb-3">Arrastra las líneas para ordenarlas correctamente:</p>
                <div class="sequence-lines space-y-2 mb-4">
                    ${this.currentOrder.map((line, index) => `
                        <div class="sequence-line bg-slate-800 text-green-400 p-3 rounded-lg cursor-move border-2 border-slate-700 hover:border-green-500 transition-colors font-mono text-sm" draggable="true" data-line="${line}">
                            <span class="text-slate-500 mr-2">${index + 1}.</span>${line}
                        </div>
                    `).join('')}
                </div>
                <button class="check-sequence-btn bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Verificar orden
                </button>
                <button class="shuffle-sequence-btn ml-2 bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Mezclar de nuevo
                </button>
                <div class="sequence-feedback mt-3 text-sm font-medium"></div>
            </div>
        `;
    }
    
    attachEventListeners() {
        const lines = this.container.querySelectorAll('.sequence-line');
        const checkBtn = this.container.querySelector('.check-sequence-btn');
        const shuffleBtn = this.container.querySelector('.shuffle-sequence-btn');
        
        let draggedElement = null;
        
        lines.forEach(line => {
            line.addEventListener('dragstart', (e) => {
                draggedElement = line;
                line.classList.add('opacity-50');
            });
            
            line.addEventListener('dragend', (e) => {
                line.classList.remove('opacity-50');
            });
            
            line.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            
            line.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedElement !== line) {
                    const allLines = [...this.container.querySelectorAll('.sequence-line')];
                    const draggedIndex = allLines.indexOf(draggedElement);
                    const targetIndex = allLines.indexOf(line);
                    
                    if (draggedIndex < targetIndex) {
                        line.parentNode.insertBefore(draggedElement, line.nextSibling);
                    } else {
                        line.parentNode.insertBefore(draggedElement, line);
                    }
                    
                    this.updateLineNumbers();
                }
            });
        });
        
        checkBtn.addEventListener('click', () => this.checkOrder());
        shuffleBtn.addEventListener('click', () => this.shuffle());
    }
    
    updateLineNumbers() {
        const lines = this.container.querySelectorAll('.sequence-line');
        lines.forEach((line, index) => {
            const numberSpan = line.querySelector('.text-slate-500');
            if (numberSpan) {
                numberSpan.textContent = `${index + 1}.`;
            }
        });
    }
    
    checkOrder() {
        const lines = this.container.querySelectorAll('.sequence-line');
        const currentOrder = Array.from(lines).map(line => line.dataset.line);
        const feedback = this.container.querySelector('.sequence-feedback');
        
        const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(this.correctOrder);
        
        if (isCorrect) {
            feedback.className = 'sequence-feedback mt-3 text-sm font-medium text-green-700 bg-green-50 p-3 rounded-lg border border-green-300';
            feedback.textContent = '🎉 ¡Perfecto! El orden es correcto';
            lines.forEach(line => {
                line.classList.add('border-green-500');
                line.classList.remove('border-slate-700');
            });
        } else {
            feedback.className = 'sequence-feedback mt-3 text-sm font-medium text-red-700 bg-red-50 p-3 rounded-lg border border-red-300';
            feedback.textContent = '❌ El orden no es correcto. Intenta de nuevo.';
        }
    }
    
    shuffle() {
        this.currentOrder = [...this.lines].sort(() => Math.random() - 0.5);
        this.render();
        this.attachEventListeners();
    }
}

// 4. Interactive Quiz Cards - Tarjetas interactivas de conceptos
class QuizCards {
    constructor(containerId, cards) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.cards = cards;
        this.currentCard = 0;
        this.score = 0;
        
        this.render();
    }
    
    render() {
        const card = this.cards[this.currentCard];
        
        this.container.innerHTML = `
            <div class="quiz-cards">
                <div class="mb-4 text-sm text-slate-600">
                    Tarjeta ${this.currentCard + 1} de ${this.cards.length}
                </div>
                <div class="card-content bg-white border-2 border-green-300 rounded-lg p-6 mb-4 min-h-[200px] flex flex-col justify-center">
                    <h4 class="text-lg font-bold text-green-800 mb-4">${card.question}</h4>
                    <div class="options-grid grid gap-3">
                        ${card.options.map((option, index) => `
                            <button class="card-option bg-slate-100 hover:bg-green-100 border-2 border-slate-300 hover:border-green-400 p-3 rounded-lg text-left transition-all" data-option="${option}">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="card-feedback text-sm font-medium mb-4"></div>
                <div class="progress-bar bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="progress-fill bg-green-600 h-full transition-all" style="width: ${(this.currentCard / this.cards.length) * 100}%"></div>
                </div>
            </div>
        `;
        
        this.attachCardListeners();
    }
    
    attachCardListeners() {
        const options = this.container.querySelectorAll('.card-option');
        const card = this.cards[this.currentCard];
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                const selectedAnswer = option.dataset.option;
                const feedback = this.container.querySelector('.card-feedback');
                
                options.forEach(opt => opt.disabled = true);
                
                if (selectedAnswer === card.answer) {
                    option.classList.add('bg-green-200', 'border-green-600');
                    feedback.className = 'card-feedback text-sm font-medium mb-4 text-green-700 bg-green-50 p-3 rounded-lg border border-green-300';
                    feedback.textContent = '✅ ' + card.explanation;
                    this.score++;
                } else {
                    option.classList.add('bg-red-200', 'border-red-600');
                    feedback.className = 'card-feedback text-sm font-medium mb-4 text-red-700 bg-red-50 p-3 rounded-lg border border-red-300';
                    feedback.textContent = '❌ Incorrecto. ' + card.explanation;
                    
                    options.forEach(opt => {
                        if (opt.dataset.option === card.answer) {
                            opt.classList.add('bg-green-200', 'border-green-600');
                        }
                    });
                }
                
                setTimeout(() => {
                    this.currentCard++;
                    if (this.currentCard < this.cards.length) {
                        this.render();
                    } else {
                        this.showFinalScore();
                    }
                }, 2000);
            });
        });
    }
    
    showFinalScore() {
        const percentage = (this.score / this.cards.length) * 100;
        let message = '';
        let colorClass = '';
        
        if (percentage === 100) {
            message = '🎉 ¡Perfecto! Dominaste todos los conceptos';
            colorClass = 'text-green-700 bg-green-50 border-green-300';
        } else if (percentage >= 70) {
            message = '👍 ¡Bien hecho! Vas por buen camino';
            colorClass = 'text-blue-700 bg-blue-50 border-blue-300';
        } else {
            message = '📚 Sigue practicando, puedes mejorar';
            colorClass = 'text-orange-700 bg-orange-50 border-orange-300';
        }
        
        this.container.innerHTML = `
            <div class="final-score text-center">
                <div class="mb-6">
                    <div class="text-6xl font-bold text-green-800 mb-2">${this.score}/${this.cards.length}</div>
                    <div class="text-xl text-slate-600">Respuestas correctas</div>
                </div>
                <div class="${colorClass} p-4 rounded-lg border-2 mb-4">
                    <p class="font-medium">${message}</p>
                </div>
                <button class="restart-cards-btn bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                    Intentar de nuevo
                </button>
            </div>
        `;
        
        const restartBtn = this.container.querySelector('.restart-cards-btn');
        restartBtn.addEventListener('click', () => {
            this.currentCard = 0;
            this.score = 0;
            this.render();
        });
    }
}

// Inicializar elementos interactivos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Los elementos se inicializarán individualmente desde el HTML
});
