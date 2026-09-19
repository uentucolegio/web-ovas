// ============================================================
// OVA Tema 2: Claves primarias y foráneas — script principal
// Base de Datos I · Unidad 2 · Tecnología en Desarrollo de Software
// ============================================================

// ---------- Navegación desktop (sidebar) ----------
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.dataset.target;
        document.querySelectorAll('.content-pane').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        document.getElementById(target).classList.add('active');
        this.classList.add('active');
    });
});

// ---------- Navegación mobile (select) ----------
document.getElementById('mobile-nav').addEventListener('change', function () {
    document.querySelectorAll('.content-pane').forEach(p => p.classList.remove('active'));
    document.getElementById(this.value).classList.add('active');
});

// ---------- Acordeones ----------
document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', function () {
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

// ---------- QUIZ — Evaluación (7 preguntas) ----------
const quizData = [
    {
        question: "¿Qué dos propiedades NO negociables debe cumplir toda clave primaria?",
        options: ["Atomicidad y simplicidad", "Unicidad y no nulidad", "Orden y estabilidad", "Duplicidad y nulidad"],
        correct: 1
    },
    {
        question: "Una clave primaria compuesta está formada por:",
        options: ["Un solo atributo numérico", "La combinación de dos o más atributos que juntos identifican cada tupla", "Solo claves foráneas", "Atributos tomados de dos tablas distintas"],
        correct: 1
    },
    {
        question: "Una clave foránea es un atributo (o conjunto de atributos) cuyo valor:",
        options: ["Siempre es único dentro de su propia tabla", "Debe coincidir con el valor de la clave primaria de otra tabla, o ser nulo si la relación lo permite", "Nunca puede repetirse entre filas", "Es siempre la clave primaria de su propia tabla"],
        correct: 1
    },
    {
        question: "En una relación uno a muchos (1:N), ¿dónde se coloca la clave foránea?",
        options: ["En la tabla del lado \"uno\"", "En la tabla del lado \"muchos\"", "En ambas tablas a la vez", "Siempre en una tabla intermedia"],
        correct: 1
    },
    {
        question: "En una relación uno a uno (1:1), ¿dónde se recomienda colocar la clave foránea?",
        options: ["En la tabla con más atributos", "En la tabla cuya participación es obligatoria", "En la tabla cuya participación en la relación es opcional", "Da exactamente igual: no existe ningún criterio"],
        correct: 2
    },
    {
        question: "¿Cómo se resuelve correctamente una relación muchos a muchos (N:M)?",
        options: ["Poniendo la clave foránea en la tabla más grande", "Creando una tabla intermedia (de enlace) con, como mínimo, dos claves foráneas", "Duplicando todos los registros en ambas tablas", "Guardando varios identificadores separados por comas en una sola celda"],
        correct: 1
    },
    {
        question: "En MATRICULA(id_estudiante, id_curso, fecha_matricula, nota_final), ¿qué afirmación es correcta?",
        options: ["La clave primaria es solo id_estudiante", "nota_final es un atributo propio de la relación y su lugar natural es la tabla intermedia", "No existe ninguna clave foránea en esa tabla", "La clave primaria es fecha_matricula"],
        correct: 1
    }
];

// Renderizado del quiz
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
                    <span class="font-medium text-green-700 mr-2">${String.fromCharCode(65 + i)}.</span> ${opt}
                </div>
            `).join('')}
        </div>
    `;
    quizContainer.appendChild(div);
});

document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', function () {
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

// ============================================================
// SISTEMA DE GAMIFICACIÓN — Contenido (misiones)
// ============================================================
const MISSION_XP = { m1: 30, m2: 30, m3: 20, m4: 30 };
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
document.querySelectorAll('.game-opt').forEach(btn => {
    btn.addEventListener('click', function () {
        const group = this.closest('[data-gq]');
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
            const groups = missionContainer.querySelectorAll('[data-gq]');
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

// ============================================================
// GAMIFICACIÓN — Actividades
// ============================================================
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
        msg = 'Primero genera un esquema válido: atributos en ambas tablas, 1 PK por tabla y la FK en EMPLEADO 🏗️';
    } else if (id === 'a3') {
        const text = document.getElementById('act3-text').value.trim();
        ok = ACT_FLAGS.a3 && text.length >= 50;
        msg = !ACT_FLAGS.a3 ? 'Selecciona primero el análisis correcto sobre la afirmación 🕵️' : 'Escribe un análisis un poco más completo con tu diseño correcto 📝';
    }
    if (!ok) {
        feedback.textContent = '⚠️ ' + msg;
        feedback.className = 'act-feedback mt-3 text-sm font-bold text-red-500';
        return;
    }
    actState.done.add(id);
    updateActPanel();
    feedback.textContent = actState.done.size === 3
        ? '🏆 ¡3/3 misiones cumplidas! Eres un MAESTRO DE LAS CLAVES certificado 🎓'
        : '🎉 ¡Misión cumplida! ' + actState.done.size + '/3 actividades completadas';
    feedback.className = 'act-feedback mt-3 text-sm font-bold text-green-700';
    if (btn) { btn.disabled = true; btn.classList.add('opacity-50', 'cursor-not-allowed'); }
}
// ---- Actividad 2: constructor SUCURSAL — EMPLEADO ----
function crearFilaSE(conFK, placeholder) {
    const row = document.createElement('div');
    row.className = 'grid grid-cols-[1fr_auto_auto] gap-2 items-center se-row';
    let html =
        '<input type="text" class="se-nombre p-2 border-2 border-slate-200 rounded-lg text-sm focus:border-green-500 focus:outline-none" placeholder="' + placeholder + '">' +
        '<input type="checkbox" class="se-pk accent-green-600 w-5 h-5 justify-self-center" title="Marcar si es la clave primaria 🔑">';
    if (conFK) {
        html += '<input type="checkbox" class="se-fk accent-teal-600 w-5 h-5 justify-self-center" title="Marcar si es clave foránea 🔗">';
    } else {
        html += '<span></span>';
    }
    row.innerHTML = html;
    return row;
}

function leerTabla(id) {
    return Array.from(document.querySelectorAll('#' + id + ' .se-row')).map(r => ({
        n: r.querySelector('.se-nombre').value.trim(),
        pk: r.querySelector('.se-pk').checked,
        fk: r.querySelector('.se-fk') ? r.querySelector('.se-fk').checked : false
    })).filter(a => a.n !== '');
}

function generarEsquemaSE() {
    const suc = leerTabla('suc-rows');
    const emp = leerTabla('emp2-rows');
    const out = document.getElementById('se-result');
    out.classList.remove('hidden');
    const fail = msg => {
        out.textContent = '⚠️ ' + msg;
        ACT_FLAGS.a2 = false;
    };
    if (suc.length < 2) return fail('Escribe al menos 2 atributos para SUCURSAL.');
    if (emp.length < 3) return fail('Escribe al menos 3 atributos para EMPLEADO (incluye la FK).');
    if (suc.filter(a => a.pk).length !== 1) return fail('Marca exactamente 1 clave primaria 🔑 en SUCURSAL.');
    if (emp.filter(a => a.pk).length !== 1) return fail('Marca exactamente 1 clave primaria 🔑 en EMPLEADO.');
    if (emp.filter(a => a.fk).length < 1) return fail('Marca al menos 1 clave foránea 🔗 en EMPLEADO (la que apunta a SUCURSAL).');
    if (emp.some(a => a.fk && a.pk)) return fail('La FK y la PK de EMPLEADO deben ser atributos distintos en este ejercicio.');
    const fmt = arr => arr.map(a => a.pk ? '<u>' + a.n + '</u>' : (a.fk ? a.n + ' 🔗' : a.n)).join(', ');
    out.innerHTML = 'SUCURSAL(' + fmt(suc) + ')<br><br>EMPLEADO(' + fmt(emp) + ')<br><br>✅ Esquema válido 1:N — PK subrayada, FK con 🔗 apuntando a SUCURSAL.';
    ACT_FLAGS.a2 = true;
}

// Inicializar las filas del constructor
(function initSE() {
    const suc = document.getElementById('suc-rows');
    ['Ej: id_sucursal', 'Ej: ciudad', 'Ej: direccion'].forEach(p => suc.appendChild(crearFilaSE(false, p)));
    const emp = document.getElementById('emp2-rows');
    ['Ej: id_empleado', 'Ej: nombre', 'Ej: cargo', 'Ej: id_sucursal (¡aquí va la FK! 🔗)'].forEach(p => emp.appendChild(crearFilaSE(true, p)));
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
            hint.textContent = '🎯 ¡Exacto! Con id_pelicula en ACTOR solo cabe UNA película por actor (y meter varias rompe la atomicidad). La solución es una tabla intermedia, por ejemplo REPARTO(id_actor 🔗, id_pelicula 🔗).';
            hint.className = 'text-sm font-bold mb-3 text-green-700';
        } else {
            this.classList.add('bg-red-100', 'border-red-300');
            ACT_FLAGS.a3 = false;
            hint.textContent = '🤔 Piensa: un actor actúa en MUCHAS películas... ¿caben todas en una sola celda?';
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
