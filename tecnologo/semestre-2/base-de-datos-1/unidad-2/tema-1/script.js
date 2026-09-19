//  <!-- =============================================
//          SCRIPTS
//          ============================================= -->

    // <!-- Script de navegación entre secciones — NO MODIFICAR -->

        // Navegación desktop (sidebar)
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.dataset.target;
                document.querySelectorAll('.content-pane').forEach(p => p.classList.remove('active'));
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                document.getElementById(target).classList.add('active');
                this.classList.add('active');
            });
        });

        // Navegación mobile (select)
        document.getElementById('mobile-nav').addEventListener('change', function() {
            document.querySelectorAll('.content-pane').forEach(p => p.classList.remove('active'));
            document.getElementById(this.value).classList.add('active');
        });

        // Acordeones
        document.querySelectorAll('.accordion-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.dataset.target;
                const panel = document.querySelector(targetId);
                const icon = this.querySelector('span:last-child');
                if (panel.classList.contains('hidden')) {
                    panel.classList.remove('hidden');
                    icon.textContent = '➖';
                } else {
                    panel.classList.add('hidden');
                    icon.textContent = '➕';
                }
            });
        });

    // </script>

    // <!-- =============================================
    //      QUIZ — Define aquí las preguntas de evaluación
    //      Edita el array `quizData` con tus preguntas.
    //      ============================================= -->
    // <script>
        const quizData = [
            {
                question: "¿Quién propuso el modelo relacional y en qué año lo hizo?",
                options: ["Bill Gates, en 1985", "Edgar F. Codd, en 1970", "Linus Torvalds, en 1991", "Tim Berners-Lee, en 1989"],
                correct: 1
            },
            {
                question: "En el lenguaje práctico de los SGBD y los desarrolladores, una \"tupla\" equivale a:",
                options: ["Una columna o campo", "Una tabla completa", "Una fila o registro", "Un dominio"],
                correct: 2
            },
            {
                question: "La expresión ESTUDIANTE(id, nombre, correo) representa:",
                options: ["La instancia de la relación", "El esquema de la relación", "Una tupla de la relación", "El dominio del atributo id"],
                correct: 1
            },
            {
                question: "Si se inserta un nuevo registro en una tabla, ¿qué cambia?",
                options: ["El esquema de la tabla", "El nombre de la tabla", "Solo la instancia de la relación", "El dominio de todos los atributos"],
                correct: 2
            },
            {
                question: "Una celda que almacena el valor \"3001234567, 3107654321\" incumple directamente:",
                options: ["La propiedad de atomicidad", "La regla del nombre único de tabla", "La regla del orden de las columnas", "La unicidad de las tuplas"],
                correct: 0
            },
            {
                question: "¿Cuál es el dominio más adecuado para el atributo estado_pedido?",
                options: ["Cualquier texto libre", "Número entero entre 0 y 100", "Conjunto {\"pendiente\", \"en proceso\", \"entregado\", \"cancelado\"}", "Fecha válida anterior a hoy"],
                correct: 2
            },
            {
                question: "¿Cuál afirmación sobre las tuplas es correcta según el modelo relacional?",
                options: ["Puede haber dos tuplas idénticas si están en distinto orden", "El orden de las tuplas determina la información de la tabla", "Las tuplas definen el esquema de la relación", "No puede haber dos tuplas idénticas y su orden no es relevante"],
                correct: 3
            }
        ];

        // Renderizado del quiz — NO MODIFICAR
        const quizContainer = document.getElementById('quiz-container');
        quizData.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('mb-6');
            div.innerHTML = `
                <p class="font-semibold text-slate-800 mb-3">${index + 1}. ${item.question}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 options-grid">
                    ${item.options.map((opt, i) => `
                        <div class="quiz-option border-2 border-slate-200 rounded-lg p-3 cursor-pointer transition-colors"
                             data-question="${index}" data-option="${i}">
                            <span class="font-medium text-green-700 mr-2">${String.fromCharCode(65+i)}.</span> ${opt}
                        </div>
                    `).join('')}
                </div>
            `;
            quizContainer.appendChild(div);
        });

        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', function() {
                const q = this.dataset.question;
                document.querySelectorAll(`[data-question="${q}"]`).forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        document.getElementById('submit-quiz-btn').addEventListener('click', () => {
            let score = 0;
            quizData.forEach((item, index) => {
                const selected = document.querySelector(`.quiz-option.selected[data-question="${index}"]`);
                if (selected && parseInt(selected.dataset.option) === item.correct) score++;
            });
            const result = document.getElementById('quiz-result');
            const pct = Math.round((score / quizData.length) * 100);
            result.textContent = `Obtuviste ${score} de ${quizData.length} (${pct}%)`;
            result.className = `mt-4 text-lg font-bold ${pct >= 60 ? 'text-green-700' : 'text-red-600'}`;
        });
    // </script>

    // <!-- =============================================
    //      SCRIPTS DE ACTIVIDADES INTERACTIVAS
    //      ============================================= -->
    // <script>
    //     // ============================================
    //     // SISTEMA DE GAMIFICACIÓN — Contenido (misiones)
    //     // ============================================
        const MISSION_XP = { m1: 30, m2: 30, m3: 30, m4: 30, m5: 20 };
        const TOTAL_XP = Object.values(MISSION_XP).reduce((a, b) => a + b, 0);
        const gameState = { xp: 0, completed: new Set() };

        function updateGamePanel() {
            document.getElementById('game-points').textContent = gameState.xp;
            document.getElementById('game-progress').style.width = Math.round((gameState.xp / TOTAL_XP) * 100) + '%';
        }

        function completeMission(missionId, container) {
            if (gameState.completed.has(missionId)) return;
            gameState.completed.add(missionId);
            gameState.xp += MISSION_XP[missionId] || 0;
            updateGamePanel();
            const badge = document.getElementById('badge-' + missionId);
            if (badge) {
                badge.classList.remove('bg-slate-100', 'text-slate-400', 'border-slate-200');
                badge.classList.add('bg-green-500', 'text-white', 'border-green-500');
            }
            const feedback = container.querySelector('.mission-feedback');
            if (feedback) {
                feedback.textContent = '🎉 ¡Misión completada! +' + (MISSION_XP[missionId] || 0) + ' XP';
                feedback.className = 'mission-feedback mt-3 text-sm font-bold text-green-700';
            }
            if (gameState.completed.size === Object.keys(MISSION_XP).length) {
                document.getElementById('badge-final').classList.remove('hidden');
            }
        }

        // Manejador de opciones de las misiones del contenido
        document.querySelectorAll('.m1-opt, .game-opt').forEach(btn => {
            btn.addEventListener('click', function () {
                const group = this.closest('[data-m1]') || this.closest('[data-gq]');
                const missionContainer = this.closest('[data-mission]');
                if (!group || !missionContainer || group.dataset.solved === 'true') return;
                const feedback = missionContainer.querySelector('.mission-feedback');
                if (this.dataset.correct === 'true') {
                    group.dataset.solved = 'true';
                    this.classList.remove('border-slate-200', 'text-slate-600');
                    this.classList.add('bg-green-500', 'border-green-500', 'text-white');
                    group.querySelectorAll('button').forEach(b => {
                        b.disabled = true;
                        if (b !== this) b.classList.add('opacity-50');
                    });
                    if (feedback) {
                        feedback.textContent = '¡Correcto! ⭐';
                        feedback.className = 'mission-feedback mt-3 text-sm font-bold text-green-700';
                    }
                    const groups = missionContainer.querySelectorAll('[data-m1], [data-gq]');
                    const allSolved = Array.from(groups).every(g => g.dataset.solved === 'true');
                    if (allSolved) completeMission(missionContainer.dataset.mission, missionContainer);
                } else {
                    this.disabled = true;
                    this.classList.remove('border-slate-200', 'text-slate-600');
                    this.classList.add('bg-red-100', 'border-red-300', 'text-red-400', 'opacity-60');
                    if (feedback) {
                        feedback.textContent = '¡Casi! Inténtalo de nuevo 💪';
                        feedback.className = 'mission-feedback mt-3 text-sm font-bold text-red-500';
                    }
                }
            });
        });
        // ============================================
        // GAMIFICACIÓN — Actividades
        // ============================================
        const actState = { done: new Set() };
        const ACT_FLAGS = { a2: false, a3: false };

        function updateActPanel() {
            document.getElementById('act-points').textContent = actState.done.size;
            document.getElementById('act-progress').style.width = Math.round((actState.done.size / 3) * 100) + '%';
        }

        function completarActividad(id, btn) {
            if (actState.done.has(id)) return;
            const container = document.querySelector('[data-act="' + id + '"]');
            const feedback = container.querySelector('.act-feedback');
            let ok = false, msg = '';
            if (id === 'a1') {
                const text = document.getElementById('act1-text').value.trim();
                const allChecked = Array.from(container.querySelectorAll('.act1-check')).every(c => c.checked);
                ok = text.length >= 80 && allChecked;
                msg = !allChecked ? 'Marca toda la lista de autoevaluación para confirmar tu trabajo ✅' : 'Tu explicación está muy corta: escribe al menos 3-4 frases con tu ejemplo ✍️';
            } else if (id === 'a2') {
                ok = ACT_FLAGS.a2;
                msg = 'Primero genera el esquema con al menos 5 atributos completos (nombre, tipo y dominio) 🏗️';
            } else if (id === 'a3') {
                const text = document.getElementById('act3-text').value.trim();
                ok = ACT_FLAGS.a3 && text.length >= 50;
                msg = !ACT_FLAGS.a3 ? 'Selecciona primero la propiedad que se incumple 🕵️' : 'Escribe una justificación un poco más completa 📝';
            }
            if (!ok) {
                feedback.textContent = '⚠️ ' + msg;
                feedback.className = 'act-feedback mt-3 text-sm font-bold text-red-500';
                return;
            }
            actState.done.add(id);
            updateActPanel();
            feedback.textContent = actState.done.size === 3
                ? '🏆 ¡3/3 misiones cumplidas! Eres un ARQUITECTO RELACIONAL certificado 🎓'
                : '🎉 ¡Misión cumplida! ' + actState.done.size + '/3 actividades completadas';
            feedback.className = 'act-feedback mt-3 text-sm font-bold text-green-700';
            if (btn) { btn.disabled = true; btn.classList.add('opacity-50', 'cursor-not-allowed'); }
        }
        // ---- Actividad 2: constructor de esquema EMPLEADO ----
        const EMP_TIPOS = ['Entero', 'Decimal', 'Texto', 'Fecha', 'Booleano'];
        function crearFilaEmpleado(placeholderNombre) {
            const row = document.createElement('div');
            row.className = 'grid grid-cols-1 sm:grid-cols-3 gap-2 emp-row';
            row.innerHTML =
                '<input type="text" class="emp-nombre p-2 border-2 border-slate-200 rounded-lg text-sm focus:border-green-500 focus:outline-none" placeholder="' + placeholderNombre + '">' +
                '<select class="emp-tipo p-2 border-2 border-slate-200 rounded-lg text-sm focus:border-green-500 focus:outline-none bg-white">' +
                '<option value="">Tipo...</option>' +
                EMP_TIPOS.map(t => '<option>' + t + '</option>').join('') +
                '</select>' +
                '<input type="text" class="emp-dom p-2 border-2 border-slate-200 rounded-lg text-sm focus:border-green-500 focus:outline-none" placeholder="Ej: entero > 0 / texto 100 car.">';
            return row;
        }
        function agregarFilaEmpleado() {
            const rows = document.getElementById('emp-rows');
            rows.appendChild(crearFilaEmpleado('Atributo ' + (rows.children.length + 1)));
        }
        function generarEsquemaEmpleado() {
            const rows = document.querySelectorAll('#emp-rows .emp-row');
            const parts = [];
            rows.forEach(r => {
                const n = r.querySelector('.emp-nombre').value.trim();
                const t = r.querySelector('.emp-tipo').value;
                const d = r.querySelector('.emp-dom').value.trim();
                if (n && t && d) parts.push(n + ': ' + t + ' (' + d + ')');
            });
            const out = document.getElementById('empleado-result');
            out.classList.remove('hidden');
            if (parts.length >= 5) {
                out.textContent = 'EMPLEADO(\n  ' + parts.join(',\n  ') + '\n)\n\n✅ Esquema válido con ' + parts.length + ' atributos y sus dominios.';
                ACT_FLAGS.a2 = true;
            } else {
                out.textContent = '⚠️ Completa al menos 5 atributos con nombre, tipo de dato y dominio. Llevas ' + parts.length + ' completo(s).';
                ACT_FLAGS.a2 = false;
            }
        }
        // Inicializar las 5 filas del constructor
        (function initEmpRows() {
            const ejemplos = ['Ej: id_empleado', 'Ej: nombre_completo', 'Ej: salario', 'Ej: fecha_ingreso', 'Ej: estado'];
            const rows = document.getElementById('emp-rows');
            ejemplos.forEach(e => rows.appendChild(crearFilaEmpleado(e)));
        })();

        // ---- Actividad 3: opciones del detective ----
        document.querySelectorAll('.a3-opt').forEach(btn => {
            btn.addEventListener('click', function () {
                const group = this.closest('[data-a3]');
                group.querySelectorAll('.a3-opt').forEach(b => b.classList.remove('bg-green-500', 'text-white', 'border-green-500', 'bg-red-100', 'border-red-300'));
                const hint = document.getElementById('a3-hint');
                if (this.dataset.correct === 'true') {
                    this.classList.add('bg-green-500', 'text-white', 'border-green-500');
                    ACT_FLAGS.a3 = true;
                    hint.textContent = '🎯 ¡Exacto! productos_comprados guardaría varios valores en una sola celda → rompe la atomicidad ☝️';
                    hint.className = 'text-sm font-bold mb-3 text-green-700';
                } else {
                    this.classList.add('bg-red-100', 'border-red-300');
                    ACT_FLAGS.a3 = false;
                    hint.textContent = '🤔 Piensa: si un pedido tiene 3 productos, ¿caben todos en UNA sola celda?';
                    hint.className = 'text-sm font-bold mb-3 text-red-500';
                }
            });
        });

        // ---- Soluciones desplegables ----
        function toggleSolucion(id, btn) {
            const el = document.getElementById(id);
            const nowVisible = !el.classList.toggle('hidden');
            if (!btn.dataset.label) btn.dataset.label = btn.textContent;
            btn.textContent = nowVisible ? '🙈 Ocultar' : btn.dataset.label;
        }

        // ---- Modal de imagen ----
        function openImgModal(src) {
            document.getElementById('img-modal-src').src = src;
            document.getElementById('img-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
        function closeImgModal() {
            document.getElementById('img-modal').classList.add('hidden');
            document.body.style.overflow = '';
        }
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeImgModal(); });
