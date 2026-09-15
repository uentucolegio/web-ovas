// --- Consola JavaScript Interactiva ---
class InteractiveConsole {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.outputHistory = [];
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.render();
        this.attachEventListeners();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="interactive-console bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                <div class="console-header bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span class="text-slate-400 text-sm font-mono">Consola JavaScript</span>
                    <button class="clear-console text-slate-400 hover:text-white text-sm">Limpiar</button>
                </div>
                <div class="console-output p-4 font-mono text-sm text-green-400 min-h-[200px] max-h-[400px] overflow-y-auto">
                    <div class="output-lines"></div>
                </div>
                <div class="console-input-wrapper bg-slate-800 px-4 py-3 flex items-center border-t border-slate-700">
                    <span class="text-green-400 mr-2 font-mono">></span>
                    <input type="text" class="console-input flex-1 bg-transparent text-green-400 font-mono outline-none" placeholder="Escribe código JavaScript aquí...">
                    <button class="run-code-btn ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm font-medium transition-colors">Ejecutar</button>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        const input = this.container.querySelector('.console-input');
        const runBtn = this.container.querySelector('.run-code-btn');
        const clearBtn = this.container.querySelector('.clear-console');
        
        runBtn.addEventListener('click', () => this.executeCode(input.value));
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCode(input.value);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            }
        });
        
        clearBtn.addEventListener('click', () => this.clearOutput());
    }
    
    executeCode(code) {
        if (!code.trim()) return;
        
        const input = this.container.querySelector('.console-input');
        const outputLines = this.container.querySelector('.output-lines');
        
        this.commandHistory.push(code);
        this.historyIndex = this.commandHistory.length;
        
        const commandLine = document.createElement('div');
        commandLine.className = 'mb-2';
        commandLine.innerHTML = `<span class="text-slate-500">> </span><span class="text-white">${this.escapeHtml(code)}</span>`;
        outputLines.appendChild(commandLine);
        
        const originalLog = console.log;
        const originalError = console.error;
        const logs = [];
        
        console.log = (...args) => {
            logs.push({ type: 'log', content: args.map(arg => this.formatValue(arg)).join(' ') });
        };
        console.error = (...args) => {
            logs.push({ type: 'error', content: args.map(arg => this.formatValue(arg)).join(' ') });
        };
        
        try {
            const result = eval(code);
            
            if (logs.length > 0) {
                logs.forEach(log => {
                    const logLine = document.createElement('div');
                    logLine.className = log.type === 'error' ? 'text-red-400 mb-1' : 'text-green-400 mb-1';
                    logLine.textContent = log.content;
                    outputLines.appendChild(logLine);
                });
            }
            
            if (result !== undefined) {
                const resultLine = document.createElement('div');
                resultLine.className = 'text-blue-400 mb-2';
                resultLine.textContent = this.formatValue(result);
                outputLines.appendChild(resultLine);
            }
        } catch (error) {
            const errorLine = document.createElement('div');
            errorLine.className = 'text-red-400 mb-2';
            errorLine.textContent = `❌ Error: ${error.message}`;
            outputLines.appendChild(errorLine);
        }
        
        console.log = originalLog;
        console.error = originalError;
        
        input.value = '';
        
        const consoleOutput = this.container.querySelector('.console-output');
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
    
    formatValue(value) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (typeof value === 'string') return `"${value}"`;
        if (typeof value === 'object') {
            try {
                return JSON.stringify(value, null, 2);
            } catch {
                return String(value);
            }
        }
        return String(value);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    navigateHistory(direction) {
        const input = this.container.querySelector('.console-input');
        
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex === this.commandHistory.length - 1) {
            this.historyIndex = this.commandHistory.length;
            input.value = '';
        }
    }
    
    clearOutput() {
        const outputLines = this.container.querySelector('.output-lines');
        outputLines.innerHTML = '';
        this.outputHistory = [];
    }
}

// Inicializar todas las consolas en la página
document.addEventListener('DOMContentLoaded', () => {
    const consoleContainers = document.querySelectorAll('[id^="console-"]');
    consoleContainers.forEach(container => {
        new InteractiveConsole(container.id);
    });
});
