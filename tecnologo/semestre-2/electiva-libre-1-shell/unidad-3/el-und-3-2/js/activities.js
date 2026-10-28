// ============================================================
// activities.js — Condicionales, ciclos y funciones básicas en Bash
// Dos terminales simuladas: validador de proyecto Node.js (if/elif/else)
// y revisión de proyectos con ciclos y funciones.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    const P0 = 'estudiante@linux:~$';
    const P1 = 'estudiante@linux:~/practica-web$';
    const HOME = '(?:~|\\$HOME|"\\$HOME"|/home/estudiante)';

    const escapeHtml = (s) => s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const normalize = (s) => s.trim().replace(/\s+/g, ' ');

    const hint = (txt) => `<i class="fa-solid fa-lightbulb" style="margin-right:4px;"></i> Pista: ${txt}`;

    // Compara los argumentos sin importar el orden (touch a b == touch b a)
    const sameArgs = (cmd, name, args) => {
        const parts = cmd.split(' ');
        if (parts[0] !== name) return false;
        const got = parts.slice(1).map(a => a.replace(new RegExp('^' + HOME + '/practica-web/'), '')).sort();
        return JSON.stringify(got) === JSON.stringify([...args].sort());
    };

    // ==========================================
    // ACTIVIDAD 1: Validador de un proyecto Node.js
    // ==========================================
    const a1Challenges = [
        {
            instruction: 'Crea la carpeta de práctica con el proyecto de ejemplo: ~/practica-web/catalogo-api (un solo comando).',
            hint: hint('usa <code>mkdir -p</code> para crear la ruta completa.'),
            match: (c) => new RegExp('^mkdir -p ' + HOME + '/practica-web/catalogo-api/?$').test(c),
            output: '',
            prompt: P0
        },
        {
            instruction: 'Ubícate dentro de la carpeta ~/practica-web.',
            hint: hint('usa <code>cd ~/practica-web</code>.'),
            match: (c) => new RegExp('^cd ' + HOME + '/practica-web/?$').test(c) || c === 'cd practica-web',
            output: '',
            prompt: P0
        },
        {
            instruction: 'Crea los archivos package.json e index.js dentro de catalogo-api (un solo comando).',
            hint: hint('<code>touch</code> acepta varios archivos separados por espacios.'),
            match: (c) => sameArgs(c, 'touch', ['catalogo-api/package.json', 'catalogo-api/index.js'])
                || c === 'touch catalogo-api/{package.json,index.js}'
                || c === 'touch catalogo-api/{index.js,package.json}',
            output: '',
            prompt: P1
        },
        {
            instruction: 'Abre el editor nano para crear el script validar-proyecto.sh.',
            hint: hint('<code>nano nombre-del-archivo</code>. Allí pegarías el script con <code>if</code>, <code>elif</code> y <code>else</code>.'),
            match: (c) => /^nano (\.\/)?validar-proyecto\.sh$/.test(c),
            output: '[ nano abierto: escribe el script, guarda con Ctrl+O, Enter y sal con Ctrl+X ]',
            prompt: P1
        },
        {
            instruction: 'Asigna permiso de ejecución al script.',
            hint: hint('usa <code>chmod +x</code> seguido del nombre del archivo.'),
            match: (c) => /^chmod (\+x|u\+x|755) (\.\/)?validar-proyecto\.sh$/.test(c),
            output: '',
            prompt: P1,
            errors: [{ test: /^\.\/validar-proyecto\.sh$/, out: 'bash: ./validar-proyecto.sh: Permission denied' }]
        },
        {
            instruction: 'Ejecuta el script. Aún no existe node_modules: observa qué rama del condicional se ejecuta.',
            hint: hint('usa <code>./validar-proyecto.sh</code>.'),
            match: (c) => c === './validar-proyecto.sh' || c === 'bash validar-proyecto.sh',
            output: 'Falta node_modules: se debe ejecutar npm install',
            prompt: P1
        },
        {
            instruction: 'Crea la carpeta node_modules dentro de catalogo-api.',
            hint: hint('usa <code>mkdir catalogo-api/node_modules</code>.'),
            match: (c) => new RegExp('^mkdir (-p )?(' + HOME + '/practica-web/)?catalogo-api/node_modules/?$').test(c),
            output: '',
            prompt: P1
        },
        {
            instruction: 'Vuelve a ejecutar el script y verifica que ahora se cumpla la primera condición (&&).',
            hint: hint('ejecútalo de nuevo con <code>./validar-proyecto.sh</code>.'),
            match: (c) => c === './validar-proyecto.sh' || c === 'bash validar-proyecto.sh',
            output: 'Proyecto listo: tiene package.json y node_modules',
            prompt: P1
        },
        {
            instruction: 'En un solo comando, elimina catalogo-api/package.json y ejecuta el script (encadena con &&).',
            hint: hint('<code>rm archivo &amp;&amp; ./validar-proyecto.sh</code>.'),
            match: (c) => /^rm (\.\/)?catalogo-api\/package\.json && (\.\/validar-proyecto\.sh|bash validar-proyecto\.sh)$/.test(c),
            output: 'El directorio existe, pero falta package.json',
            prompt: P1
        },
        {
            instruction: 'Error intencional: escribe la condición SIN espacios dentro de los corchetes: if [-f "$ruta/package.json"]; then',
            hint: hint('escribe exactamente <code>if [-f "$ruta/package.json"]; then</code> para ver el error de Bash.'),
            match: (c) => c === 'if [-f "$ruta/package.json"]; then',
            output: './validar-proyecto.sh: línea 5: [-f: orden no encontrada',
            outputClass: 't-err',
            prompt: P1
        },
        {
            instruction: 'Corrige el error: escribe la misma condición con los espacios necesarios alrededor de [ y ].',
            hint: hint('deja un espacio después de <code>[</code> y antes de <code>]</code>.'),
            match: (c) => c === 'if [ -f "$ruta/package.json" ]; then',
            output: '✔ Sintaxis correcta: Bash interpreta [ y ] como parte de la expresión.',
            prompt: P1,
            errors: [{ test: /^if \[-f/, out: './validar-proyecto.sh: línea 5: [-f: orden no encontrada' }]
        }
    ];

    // ==========================================
    // ACTIVIDAD 2: Revisión de varios proyectos con ciclos y funciones
    // ==========================================
    const listadoRevision = [
        '--------------------',
        'Revisando: /home/estudiante/practica-web/catalogo-api',
        'package.json: OK',
        'Omitiendo archivo: /home/estudiante/practica-web/notas.txt',
        '--------------------',
        'Revisando: /home/estudiante/practica-web/panel-admin',
        'package.json: FALTA',
        '--------------------',
        'Revisando: /home/estudiante/practica-web/tienda-web',
        'package.json: OK',
        'Proyectos revisados: 3'
    ].join('\n');

    const a2Challenges = [
        {
            instruction: 'Ubícate en la carpeta de práctica ~/practica-web.',
            hint: hint('usa <code>cd ~/practica-web</code>.'),
            match: (c) => new RegExp('^cd ' + HOME + '/practica-web/?$').test(c) || c === 'cd practica-web',
            output: '',
            prompt: P0
        },
        {
            instruction: 'Crea los directorios tienda-web y panel-admin (un solo comando).',
            hint: hint('<code>mkdir -p</code> acepta varias rutas separadas por espacios.'),
            match: (c) => /^mkdir -p /.test(c) && sameArgs(c.replace(/^mkdir -p /, 'mkdir '), 'mkdir', ['tienda-web', 'panel-admin']),
            output: '',
            prompt: P1
        },
        {
            instruction: 'Crea package.json en catalogo-api y tienda-web, y el archivo notas.txt (un solo comando).',
            hint: hint('<code>touch catalogo-api/package.json tienda-web/package.json notas.txt</code>.'),
            match: (c) => sameArgs(c, 'touch', ['catalogo-api/package.json', 'tienda-web/package.json', 'notas.txt']),
            output: '',
            prompt: P1
        },
        {
            instruction: 'Escribe un ciclo for en una sola línea que recorra todos los elementos de la carpeta actual (*) y muestre cada uno con echo.',
            hint: hint('<code>for elemento in *; do echo "$elemento"; done</code>.'),
            match: (c) => /^for \w+ in \S*\*; do echo .+; done$/.test(c),
            output: 'catalogo-api\nnotas.txt\npanel-admin\ntienda-web',
            prompt: P1
        },
        {
            instruction: 'Define en una línea la función verificar_node, que use command -v node dentro de su cuerpo.',
            hint: hint('<code>verificar_node() { if command -v node >/dev/null 2>&amp;1; then echo "Node.js está instalado"; else echo "Node.js no está disponible"; fi; }</code>'),
            match: (c) => /^(function )?verificar_node ?(\(\))? ?\{.*command -v node.*\}$/.test(c),
            output: '',
            prompt: P1
        },
        {
            instruction: 'La función no se ejecuta por haber sido declarada. Invócala.',
            hint: hint('escribe únicamente el nombre de la función.'),
            match: (c) => c === 'verificar_node',
            output: 'Node.js está instalado',
            prompt: P1
        },
        {
            instruction: 'Ejecuta el script revisar-proyectos.sh con Bash. Observa qué ocurre con notas.txt (continue) y cuántos proyectos se revisan.',
            hint: hint('<code>bash revisar-proyectos.sh</code>.'),
            match: (c) => c === 'bash revisar-proyectos.sh',
            output: listadoRevision,
            prompt: P1,
            errors: [{ test: /^\.\/revisar-proyectos\.sh$/, out: 'bash: ./revisar-proyectos.sh: Permission denied (usa bash revisar-proyectos.sh o chmod +x)' }]
        },
        {
            instruction: 'Usa una tubería para mostrar solo la línea del proyecto que no tiene package.json.',
            hint: hint('conecta la ejecución del script con <code>grep FALTA</code> mediante <code>|</code>.'),
            match: (c) => /^bash revisar-proyectos\.sh \| grep "?FALTA"?$/.test(c),
            output: 'package.json: FALTA',
            prompt: P1
        }
    ];

    // ==========================================
    // Motor de las terminales simuladas
    // ==========================================
    function createTerminal(cfg) {
        const $ = (s) => document.getElementById(`${cfg.id}-${s}`);
        const input = $('input'), body = $('body'), num = $('num'), total = $('total'),
            text = $('text'), hintEl = $('hint'), promptEl = $('prompt'),
            progress = $('progress'), score = $('score'), feedback = $('feedback'), reset = $('reset');
        if (!input) return;

        let current = 0, completed = 0;
        const list = cfg.challenges;

        const addLine = (html, cls = '') => {
            const line = document.createElement('div');
            line.className = `term-line ${cls}`;
            line.innerHTML = html.replace(/\n/g, '<br>');
            body.appendChild(line);
            body.scrollTop = body.scrollHeight;
        };

        const showFeedback = (msg, ok) => {
            feedback.innerHTML = msg;
            feedback.className = `bs-feedback ${msg ? (ok ? 'ok' : 'err') : ''}`;
        };

        const updateProgress = () => {
            const pct = (completed / list.length) * 100;
            progress.style.width = `${pct}%`;
            progress.textContent = pct > 0 ? `${Math.round(pct)}%` : '';
            score.textContent = `${completed}/${list.length}`;
        };

        const updateChallenge = () => {
            total.textContent = list.length;
            if (current >= list.length) {
                text.innerHTML = '<i class="fa-solid fa-flag-checkered" style="margin-right:6px;"></i> ' + cfg.doneText;
                hintEl.textContent = '';
                num.textContent = list.length;
                input.disabled = true;
                input.placeholder = '¡Actividad completada!';
                return;
            }
            const c = list[current];
            num.textContent = current + 1;
            text.textContent = c.instruction;
            hintEl.innerHTML = c.hint;
            promptEl.textContent = c.prompt;
        };

        const init = () => {
            current = 0; completed = 0;
            body.innerHTML = '';
            addLine('<i class="fa-brands fa-linux"></i> Terminal Linux simulada — ' + cfg.title, 't-dim');
            addLine('Escribe el comando indicado en el reto y pulsa Enter.', 't-dim');
            addLine('──────────────────────────────────────────────────', 't-dim');
            input.value = '';
            input.disabled = false;
            input.placeholder = 'Escribe tu comando aquí...';
            updateChallenge();
            updateProgress();
            showFeedback('', true);
        };

        input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const raw = input.value;
            const cmd = normalize(raw);
            if (!cmd || current >= list.length) return;
            const c = list[current];
            addLine(`<span class="t-ok">${escapeHtml(c.prompt)}</span> <span class="t-cmd">${escapeHtml(raw.trim())}</span>`);

            if (c.match(cmd)) {
                if (c.output) addLine(escapeHtml(c.output), c.outputClass || 't-out');
                addLine('<i class="fa-solid fa-check" style="margin-right:6px;"></i> ¡Correcto!', 't-ok');
                completed++; current++;
                updateProgress();
                if (completed === list.length) {
                    addLine('');
                    addLine('<i class="fa-solid fa-trophy" style="margin-right:6px;"></i> ' + cfg.winText, 't-win');
                    showFeedback('<i class="fa-solid fa-award" style="margin-right:8px;"></i> ' + cfg.winBadge, true);
                } else {
                    addLine('──────────────────────────────────────────────────', 't-dim');
                    showFeedback('<i class="fa-solid fa-circle-check" style="margin-right:8px;"></i> ¡Bien hecho!', true);
                }
                updateChallenge();
            } else {
                const known = (c.errors || []).find(er => er.test.test(cmd));
                addLine(escapeHtml(known ? known.out : `bash: ${cmd}: comando no reconocido o incorrecto para este reto.`), 't-err');
                showFeedback('<i class="fa-solid fa-circle-xmark" style="margin-right:8px;"></i> Mmm, intenta de nuevo.', false);
            }
            input.value = '';
        });

        reset.addEventListener('click', init);
        init();
    }

    createTerminal({
        id: 'a1',
        title: 'Actividad 1: validador de un proyecto Node.js',
        challenges: a1Challenges,
        doneText: '¡Has completado todos los retos de la Actividad 1!',
        winText: '¡COMPLETADO! Validaste un proyecto con if, elif, else y operadores de archivo.',
        winBadge: '¡ACTIVIDAD 1 COMPLETADA!'
    });

    createTerminal({
        id: 'a2',
        title: 'Actividad 2: ciclos y funciones',
        challenges: a2Challenges,
        doneText: '¡Completaste la Actividad 2! Combinaste ciclos, condicionales y funciones.',
        winText: '¡COMPLETADO! Recorriste proyectos con for, omitiste archivos con continue y reutilizaste funciones.',
        winBadge: '¡ACTIVIDAD 2 COMPLETADA!'
    });

});
