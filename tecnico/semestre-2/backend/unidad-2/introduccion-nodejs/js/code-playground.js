// --- Code Playground - Editor y resultado en vivo ---
class CodePlayground {
    constructor(containerId, initialCode, description) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.initialCode = initialCode;
        this.description = description;
        
        this.render();
        this.attachEventListeners();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="code-playground bg-white rounded-lg shadow-lg overflow-hidden border-2 border-green-300">
                <div class="playground-header bg-green-600 text-white px-4 py-2 flex items-center justify-between">
                    <span class="font-semibold">💻 Playground Interactivo</span>
                    <div class="flex gap-2">
                        <button class="reset-code-btn text-white hover:bg-green-700 px-3 py-1 rounded text-sm transition-colors">
                            ↺ Resetear
                        </button>
                        <button class="run-playground-btn bg-white text-green-600 hover:bg-green-50 px-3 py-1 rounded text-sm font-medium transition-colors">
                            ▶ Ejecutar
                        </button>
                    </div>
                </div>
                ${this.description ? `<div class="bg-blue-50 px-4 py-2 text-sm text-blue-800 border-b border-blue-200">${this.description}</div>` : ''}
                <div class="grid md:grid-cols-2 divide-x divide-slate-200">
                    <div class="editor-panel">
                        <div class="bg-slate-700 px-4 py-2 text-slate-300 text-xs font-semibold">EDITOR</div>
                        <textarea class="code-editor w-full p-4 bg-slate-800 text-green-400 font-mono text-sm min-h-[250px] resize-none focus:outline-none focus:ring-2 focus:ring-green-500" spellcheck="false">${this.initialCode}</textarea>
                    </div>
                    <div class="output-panel">
                        <div class="bg-slate-700 px-4 py-2 text-slate-300 text-xs font-semibold">RESULTADO</div>
                        <div class="output-content p-4 bg-slate-900 text-green-400 font-mono text-sm min-h-[250px] overflow-auto"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        const runBtn = this.container.querySelector('.run-playground-btn');
        const resetBtn = this.container.querySelector('.reset-code-btn');
        const editor = this.container.querySelector('.code-editor');
        
        runBtn.addEventListener('click', () => this.executeCode());
        resetBtn.addEventListener('click', () => {
            editor.value = this.initialCode;
            this.clearOutput();
        });
        
        editor.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 2;
            }
            
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.executeCode();
            }
        });
    }
    
    executeCode() {
        const editor = this.container.querySelector('.code-editor');
        const output = this.container.querySelector('.output-content');
        const code = editor.value;
        
        output.innerHTML = '';
        
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        
        const addOutput = (content, type = 'log') => {
            const line = document.createElement('div');
            line.className = `output-line mb-1 ${type === 'error' ? 'text-red-400' : type === 'warn' ? 'text-yellow-400' : 'text-green-400'}`;
            line.textContent = content;
            output.appendChild(line);
        };
        
        console.log = (...args) => {
            addOutput(args.map(arg => this.formatValue(arg)).join(' '), 'log');
        };
        console.error = (...args) => {
            addOutput('❌ ' + args.map(arg => this.formatValue(arg)).join(' '), 'error');
        };
        console.warn = (...args) => {
            addOutput('⚠️ ' + args.map(arg => this.formatValue(arg)).join(' '), 'warn');
        };
        
        try {
            const result = eval(code);
            if (result !== undefined) {
                const resultLine = document.createElement('div');
                resultLine.className = 'output-line text-blue-400 mt-2 pt-2 border-t border-slate-700';
                resultLine.textContent = '→ ' + this.formatValue(result);
                output.appendChild(resultLine);
            }
        } catch (error) {
            addOutput(`❌ Error: ${error.message}`, 'error');
        }
        
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
        
        if (output.children.length === 0) {
            output.innerHTML = '<div class="text-slate-500 italic">Sin salida</div>';
        }
    }
    
    formatValue(value) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (typeof value === 'string') return value;
        if (typeof value === 'object') {
            try {
                return JSON.stringify(value, null, 2);
            } catch {
                return String(value);
            }
        }
        return String(value);
    }
    
    clearOutput() {
        const output = this.container.querySelector('.output-content');
        output.innerHTML = '';
    }
}

// --- Click to Reveal - Revelar contenido al hacer click ---
class ClickToReveal {
    constructor(containerId, items) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.items = items;
        this.revealed = new Set();
        
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="click-reveal-container space-y-3">
                ${this.items.map((item, index) => `
                    <div class="reveal-item">
                        <button class="reveal-btn w-full text-left bg-gradient-to-r from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 border-2 border-green-300 rounded-lg p-4 transition-all transform hover:scale-[1.02]" data-index="${index}">
                            <div class="flex items-center justify-between">
                                <span class="font-semibold text-green-800">🔒 ${item.title}</span>
                                <span class="text-green-600 text-xl">👆</span>
                            </div>
                        </button>
                        <div class="reveal-content hidden mt-2 p-4 bg-white border-2 border-green-300 rounded-lg animate-fadeIn">
                            ${item.content}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        const buttons = this.container.querySelectorAll('.reveal-btn');
        
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const content = btn.nextElementSibling;
                
                if (this.revealed.has(index)) {
                    content.classList.add('hidden');
                    btn.querySelector('.text-xl').textContent = '👆';
                    btn.querySelector('span').textContent = `🔒 ${this.items[index].title}`;
                    this.revealed.delete(index);
                } else {
                    content.classList.remove('hidden');
                    btn.querySelector('.text-xl').textContent = '✅';
                    btn.querySelector('span').textContent = `🔓 ${this.items[index].title}`;
                    this.revealed.add(index);
                }
            });
        });
    }
}

// --- Multiple Choice Interactive ---
class MultipleChoiceInteractive {
    constructor(containerId, question, options, correctAnswer, explanation) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.answered = false;
        
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="multiple-choice-interactive bg-white rounded-lg border-2 border-green-300 p-4">
                <p class="font-semibold text-slate-800 mb-4">${this.question}</p>
                <div class="options-grid space-y-2">
                    ${this.options.map((option, index) => `
                        <button class="choice-option w-full text-left p-3 bg-slate-50 hover:bg-green-50 border-2 border-slate-300 hover:border-green-400 rounded-lg transition-all transform hover:scale-[1.02]" data-option="${option}">
                            <span class="font-mono text-sm">${String.fromCharCode(65 + index)}.</span> ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="choice-feedback mt-4 text-sm font-medium"></div>
            </div>
        `;
        
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        const options = this.container.querySelectorAll('.choice-option');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                if (this.answered) return;
                
                this.answered = true;
                const selected = option.dataset.option;
                const feedback = this.container.querySelector('.choice-feedback');
                
                options.forEach(opt => {
                    opt.disabled = true;
                    opt.classList.remove('hover:bg-green-50', 'hover:border-green-400', 'hover:scale-[1.02]');
                });
                
                if (selected === this.correctAnswer) {
                    option.classList.add('bg-green-100', 'border-green-600');
                    feedback.className = 'choice-feedback mt-4 text-sm font-medium text-green-700 bg-green-50 p-3 rounded-lg border border-green-300';
                    feedback.textContent = '✅ ¡Correcto! ' + this.explanation;
                } else {
                    option.classList.add('bg-red-100', 'border-red-600');
                    
                    options.forEach(opt => {
                        if (opt.dataset.option === this.correctAnswer) {
                            opt.classList.add('bg-green-100', 'border-green-600');
                        }
                    });
                    
                    feedback.className = 'choice-feedback mt-4 text-sm font-medium text-red-700 bg-red-50 p-3 rounded-lg border border-red-300';
                    feedback.textContent = '❌ Incorrecto. ' + this.explanation;
                }
            });
        });
    }
}

// Agregar animación de fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);
