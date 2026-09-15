// --- Componentes visuales interactivos para React ---
// Muestra código JSX a la izquierda y el resultado visual a la derecha

class VisualComponent {
    constructor(containerId, code, title) {
        this.containerId = containerId;
        this.code = code;
        this.title = title;
        this.init();
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="bg-green-600 text-white px-4 py-2">
                    <h4 class="font-semibold">${this.title}</h4>
                </div>
                <div class="grid md:grid-cols-2 gap-4 p-4">
                    <div>
                        <p class="text-sm font-semibold text-slate-700 mb-2">📝 Código JSX:</p>
                        <pre class="bg-slate-800 text-green-400 p-3 rounded text-xs overflow-x-auto"><code>${this.escapeHtml(this.code)}</code></pre>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-slate-700 mb-2">👁️ Resultado visual:</p>
                        <div class="border-2 border-slate-200 rounded p-3 bg-slate-50 min-h-[150px]" id="${this.containerId}-result">
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.renderResult();
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    renderResult() {
        // Este método será sobrescrito por cada componente específico
    }
}

// Componente: Props ejemplo
class PropsComponent extends VisualComponent {
    renderResult() {
        const resultDiv = document.getElementById(`${this.containerId}-result`);
        resultDiv.innerHTML = `
            <div class="space-y-3">
                <div class="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
                    <h3 class="font-bold text-blue-800">Hola Ana</h3>
                    <p class="text-sm text-blue-700">Tienes 25 años</p>
                </div>
                <div class="bg-purple-100 border-l-4 border-purple-500 p-3 rounded">
                    <h3 class="font-bold text-purple-800">Hola Carlos</h3>
                    <p class="text-sm text-purple-700">Tienes 30 años</p>
                </div>
            </div>
        `;
    }
}

// Componente: Lista con map
class ListComponent extends VisualComponent {
    renderResult() {
        const resultDiv = document.getElementById(`${this.containerId}-result`);
        const productos = [
            { id: 1, nombre: "Laptop", precio: 1200 },
            { id: 2, nombre: "Mouse", precio: 25 },
            { id: 3, nombre: "Teclado", precio: 80 }
        ];

        const items = productos.map(p => 
            `<li class="flex justify-between p-2 bg-white rounded border border-slate-200">
                <span class="font-medium">${p.nombre}</span>
                <span class="text-green-600 font-bold">$${p.precio}</span>
            </li>`
        ).join('');

        resultDiv.innerHTML = `<ul class="space-y-2">${items}</ul>`;
    }
}

// Componente: Tarjeta de producto
class ProductCardComponent extends VisualComponent {
    renderResult() {
        const resultDiv = document.getElementById(`${this.containerId}-result`);
        const productos = [
            { id: 1, nombre: "Cuaderno", precio: 8000, stock: 12 },
            { id: 2, nombre: "Lápiz", precio: 1500, stock: 30 }
        ];

        const cards = productos.map(p => 
            `<article class="bg-white border-2 border-slate-300 p-3 rounded-lg shadow-sm">
                <h3 class="font-bold text-slate-800">${p.nombre}</h3>
                <p class="text-sm text-slate-600">Precio: $${p.precio}</p>
                <p class="text-sm text-slate-600">Stock: ${p.stock}</p>
            </article>`
        ).join('');

        resultDiv.innerHTML = `<div class="space-y-3">${cards}</div>`;
    }
}

// Componente: Evento onClick
class EventComponent extends VisualComponent {
    renderResult() {
        const resultDiv = document.getElementById(`${this.containerId}-result`);
        resultDiv.innerHTML = `
            <div class="text-center">
                <button id="btn-play-${this.containerId}" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    ▶️ Play
                </button>
                <p id="msg-${this.containerId}" class="mt-3 text-slate-600 font-medium"></p>
            </div>
        `;

        document.getElementById(`btn-play-${this.containerId}`).addEventListener('click', () => {
            document.getElementById(`msg-${this.containerId}`).textContent = '¡Video reproduciendo! 🎬';
        });
    }
}

// Componente: useState contador
class UseStateComponent extends VisualComponent {
    constructor(containerId, code, title) {
        super(containerId, code, title);
        this.likes = 0;
    }

    renderResult() {
        const resultDiv = document.getElementById(`${this.containerId}-result`);
        resultDiv.innerHTML = `
            <div class="text-center">
                <p class="text-4xl font-bold text-slate-800 mb-3" id="likes-${this.containerId}">👍 ${this.likes}</p>
                <button id="btn-like-${this.containerId}" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                    Me gusta
                </button>
            </div>
        `;

        document.getElementById(`btn-like-${this.containerId}`).addEventListener('click', () => {
            this.likes++;
            document.getElementById(`likes-${this.containerId}`).textContent = `👍 ${this.likes}`;
        });
    }
}

// Componente: Input controlado
class InputComponent extends VisualComponent {
    renderResult() {
        const resultDiv = document.getElementById(`${this.containerId}-result`);
        resultDiv.innerHTML = `
            <div>
                <input 
                    type="text" 
                    id="input-${this.containerId}"
                    placeholder="Buscar..."
                    class="w-full p-2 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <p class="mt-3 text-slate-700">Estás buscando: <span id="search-${this.containerId}" class="font-bold text-blue-600"></span></p>
            </div>
        `;

        document.getElementById(`input-${this.containerId}`).addEventListener('input', (e) => {
            document.getElementById(`search-${this.containerId}`).textContent = e.target.value;
        });
    }
}

// Componente: useEffect
class UseEffectComponent extends VisualComponent {
    renderResult() {
        const resultDiv = document.getElementById(`${this.containerId}-result`);
        resultDiv.innerHTML = `
            <div>
                <p class="text-slate-600 mb-2">⏳ Cargando usuarios...</p>
                <div id="users-${this.containerId}" class="space-y-2"></div>
            </div>
        `;

        // Simular carga de datos
        setTimeout(() => {
            const usuarios = ["Ana", "Carlos", "María"];
            const usersDiv = document.getElementById(`users-${this.containerId}`);
            usersDiv.innerHTML = usuarios.map(u => 
                `<div class="bg-green-100 border-l-4 border-green-500 p-2 rounded">
                    <p class="text-green-800 font-medium">👤 ${u}</p>
                </div>`
            ).join('');
        }, 1000);
    }
}
