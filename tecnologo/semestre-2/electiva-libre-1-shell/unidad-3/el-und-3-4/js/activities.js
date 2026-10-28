// ============================================================
// activities.js — Prompting técnico, verificación y registro de comandos con IA
// Dos terminales simuladas: auditoría de un script generado por IA y
// prompt técnico + registro del trabajo (history, script, tee, bitácora).
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    const P0 = 'estudiante@linux:~$';
    const P_TIENDA = 'estudiante@linux:~/practica-u3/tienda-web$';
    const P_API = 'estudiante@linux:~/practica-u3/api$';
    const P_LOGS = 'estudiante@linux:~/practica-u3/api/logs$';
    const HOME = '(?:~|\\$HOME|"\\$HOME"|/home/estudiante)';
    const SP = '\u00a0';
    const RUTA_TIENDA = '/home/estudiante/practica-u3/tienda-web';
    const RUTA_LOGS = '/home/estudiante/practica-u3/api/logs';

    const escapeHtml = (s) => s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const normalize = (s) => s.trim().replace(/\s+/g, ' ');

    const hint = (txt) => `<i class="fa-solid fa-lightbulb" style="margin-right:4px;"></i> Pista: ${txt}`;

    // Expande llaves simples: a/{x,y} -> a/x a/y
    const expandBraces = (s) => s.replace(/(\S*)\{([^{}\s]*,[^{}\s]*)\}(\S*)/g,
        (_, pre, mid, post) => mid.split(',').map(m => pre + m + post).join(' '));

    // Compara los argumentos sin importar el orden; quita el prefijo de la ruta base
    const sameArgs = (cmd, name, args, base) => {
        const parts = expandBraces(cmd).split(' ');
        if (parts[0] !== name) return false;
        const prefix = base ? new RegExp('^' + HOME + '/' + base + '/') : null;
        const got = parts.slice(1).map(a => (prefix ? a.replace(prefix, '') : a)).sort();
        return JSON.stringify(got) === JSON.stringify([...args].sort());
    };

    // ==========================================
    // ACTIVIDAD 1: Auditoría de un script de despliegue generado por IA
    // ==========================================
    const SED_SEGURO = "['\"]s/localhost:3000/api\\.tienda-web\\.co/['\"]";

    const a1Challenges = [
        {
            instruction: 'Prepara el entorno aislado: crea la carpeta ~/practica-u3/tienda-web/dist (un solo comando).',
            hint: hint('usa <code>mkdir -p</code> para crear la ruta completa.'),
            match: (c) => new RegExp('^mkdir -p ' + HOME + '/practica-u3/tienda-web/dist/?$').test(c),
            output: '',
            prompt: P0
        },
        {
            instruction: 'Ubícate dentro de la carpeta ~/practica-u3/tienda-web.',
            hint: hint('usa <code>cd ~/practica-u3/tienda-web</code>.'),
            match: (c) => new RegExp('^cd ' + HOME + '/practica-u3/tienda-web/?$').test(c) || c === 'cd practica-u3/tienda-web',
            output: '',
            prompt: P0
        },
        {
            instruction: 'Crea los archivos de ejemplo dist/index.html, dist/app.js y dist/estilos.css (un solo comando).',
            hint: hint('<code>touch</code> acepta varios archivos separados por espacios.'),
            match: (c) => sameArgs(c, 'touch', ['dist/index.html', 'dist/app.js', 'dist/estilos.css'], 'practica-u3/tienda-web'),
            output: '',
            prompt: P_TIENDA
        },
        {
            instruction: 'Crea el archivo .env.production con el texto VITE_API_URL=http://localhost:3000 usando echo y la redirección >.',
            hint: hint('<code>echo "VITE_API_URL=http://localhost:3000" &gt; .env.production</code>.'),
            match: (c) => /^echo ["']?VITE_API_URL=http:\/\/localhost:3000["']? ?> ?(\.\/)?\.env\.production$/.test(c),
            output: '',
            prompt: P_TIENDA
        },
        {
            instruction: 'Primera verificación: comprueba la sintaxis de limpiar-build.sh SIN ejecutarlo.',
            hint: hint('<code>bash -n</code> seguido del nombre del script.'),
            match: (c) => /^bash -n (\.\/)?limpiar-build\.sh$/.test(c),
            output: '(sin salida: la sintaxis es válida, pero eso no garantiza que el script sea seguro)',
            outputClass: 't-dim',
            prompt: P_TIENDA
        },
        {
            instruction: 'Segunda verificación: analiza limpiar-build.sh con el analizador estático ShellCheck.',
            hint: hint('usa <code>shellcheck limpiar-build.sh</code>.'),
            match: (c) => /^shellcheck (\.\/)?limpiar-build\.sh$/.test(c),
            output: 'In limpiar-build.sh line 3:\nrm -rf $BUILD_DIR/*\n' + SP.repeat(7) + '^----------^ SC2115 (warning): Use "${var:?}" to ensure this never expands to /* .',
            outputClass: 't-err',
            prompt: P_TIENDA
        },
        {
            instruction: 'Tercera verificación: consulta en la ayuda de sed la opción -i (usa una tubería con grep y el doble guion).',
            hint: hint('<code>sed --help | grep -- \'-i\'</code>.'),
            match: (c) => /^sed --help \| grep -- ['"]?-i['"]?$/.test(c),
            output: SP.repeat(2) + '-i[SUFFIX], --in-place[=SUFFIX]',
            prompt: P_TIENDA
        },
        {
            instruction: 'Reproduce el error de la línea 4 en la copia de práctica: ejecuta sed con la sintaxis de macOS (-i \'\') para cambiar localhost:3000 por api.tienda-web.co en .env.production.',
            hint: hint('<code>sed -i \'\' \'s/localhost:3000/api.tienda-web.co/\' .env.production</code>.'),
            match: (c) => new RegExp('^sed -i (\'\'|"") ' + SED_SEGURO + ' (\\./)?\\.env\\.production$').test(c),
            output: 'sed: can\'t read s/localhost:3000/api.tienda-web.co/: No such file or directory',
            outputClass: 't-err',
            prompt: P_TIENDA
        },
        {
            instruction: 'En tu script corregido, la ruta debe guardarse entre comillas. Define la variable BUILD_DIR con la ruta "$HOME/practica-u3/tienda-web/dist".',
            hint: hint('<code>BUILD_DIR="$HOME/practica-u3/tienda-web/dist"</code> (sin espacios alrededor del =).'),
            match: (c) => new RegExp('^BUILD_DIR=["\']?(\\$HOME|/home/estudiante|~)/practica-u3/tienda-web/dist/?["\']?$').test(c),
            output: '',
            prompt: P_TIENDA
        },
        {
            instruction: 'Simula el borrado: antepón echo a rm -rf y usa la forma protegida "${BUILD_DIR:?}"/* para ver las rutas exactas que se eliminarían.',
            hint: hint('<code>echo rm -rf "${BUILD_DIR:?}"/*</code>.'),
            match: (c) => c === 'echo rm -rf "${BUILD_DIR:?}"/*',
            output: `rm -rf ${RUTA_TIENDA}/dist/app.js ${RUTA_TIENDA}/dist/estilos.css ${RUTA_TIENDA}/dist/index.html`,
            prompt: P_TIENDA,
            errors: [{ test: /^echo rm -rf "?\$BUILD_DIR"?\/\*$/, out: 'Funciona, pero sin ${BUILD_DIR:?} no estás protegido si la variable llega vacía: vuelve a intentarlo con la forma segura.' }]
        },
        {
            instruction: 'Antes de modificar el archivo, usa sed SIN la opción -i para imprimir el resultado del reemplazo en pantalla.',
            hint: hint('<code>sed \'s/localhost:3000/api.tienda-web.co/\' .env.production</code>.'),
            match: (c) => new RegExp('^sed ' + SED_SEGURO + ' (\\./)?\\.env\\.production$').test(c),
            output: 'VITE_API_URL=http://api.tienda-web.co',
            prompt: P_TIENDA
        },
        {
            instruction: 'Ejecuta la versión corregida con traza para confirmar que cada ruta es la esperada: limpiar-build-seguro.sh.',
            hint: hint('<code>bash -x limpiar-build-seguro.sh</code>.'),
            match: (c) => /^bash -x (\.\/)?limpiar-build-seguro\.sh$/.test(c),
            output: [
                '+ set -euo pipefail',
                `+ BUILD_DIR=${RUTA_TIENDA}/dist`,
                `+ [[ -d ${RUTA_TIENDA}/dist ]]`,
                `+ echo rm -rf ${RUTA_TIENDA}/dist/app.js ${RUTA_TIENDA}/dist/estilos.css ${RUTA_TIENDA}/dist/index.html`,
                `rm -rf ${RUTA_TIENDA}/dist/app.js ${RUTA_TIENDA}/dist/estilos.css ${RUTA_TIENDA}/dist/index.html`,
                `+ sed s/localhost:3000/api.tienda-web.co/ ${RUTA_TIENDA}/.env.production`,
                'VITE_API_URL=http://api.tienda-web.co'
            ].join('\n'),
            prompt: P_TIENDA
        },
        {
            instruction: 'La simulación fue correcta. Aplica el cambio real con sed -i (sintaxis de Linux) y comprueba el resultado con cat en un solo comando (encadena con &&).',
            hint: hint('<code>sed -i \'s/localhost:3000/api.tienda-web.co/\' .env.production &amp;&amp; cat .env.production</code>.'),
            match: (c) => new RegExp('^sed -i ' + SED_SEGURO + ' (\\./)?\\.env\\.production && cat (\\./)?\\.env\\.production$').test(c),
            output: 'VITE_API_URL=http://api.tienda-web.co',
            prompt: P_TIENDA
        }
    ];

    // ==========================================
    // ACTIVIDAD 2: Prompt técnico y registro del trabajo con IA
    // ==========================================
    const FECHA = '2026-10-27';

    const a2Challenges = [
        {
            instruction: 'Prepara la carpeta de práctica: crea ~/practica-u3/api/logs, ~/practica-u3/api/registros y ~/practica-u3/api/docs (un solo comando).',
            hint: hint('<code>mkdir -p</code> acepta varias rutas separadas por espacios.'),
            match: (c) => /^mkdir -p /.test(c) && sameArgs(c.replace(/^mkdir -p /, 'mkdir '), 'mkdir', ['api/logs', 'api/registros', 'api/docs'], 'practica-u3'),
            output: '',
            prompt: P0
        },
        {
            instruction: 'Ubícate en la carpeta de logs: ~/practica-u3/api/logs.',
            hint: hint('usa <code>cd ~/practica-u3/api/logs</code>.'),
            match: (c) => new RegExp('^cd ' + HOME + '/practica-u3/api/logs/?$').test(c) || c === 'cd practica-u3/api/logs',
            output: '',
            prompt: P0
        },
        {
            instruction: 'Crea los dos logs antiguos (acceso-viejo.log y error-viejo.log) con fecha de hace 10 días.',
            hint: hint('<code>touch -d "10 days ago" acceso-viejo.log error-viejo.log</code>.'),
            match: (c) => /^touch -d ["']10 days ago["'] (acceso-viejo\.log error-viejo\.log|error-viejo\.log acceso-viejo\.log)$/.test(c),
            output: '',
            prompt: P_LOGS
        },
        {
            instruction: 'Crea los dos logs recientes: acceso-hoy.log y error-hoy.log (un solo comando).',
            hint: hint('<code>touch</code> sin opciones usa la fecha actual.'),
            match: (c) => sameArgs(c, 'touch', ['acceso-hoy.log', 'error-hoy.log']),
            output: '',
            prompt: P_LOGS
        },
        {
            instruction: 'Antes de pedir el script a la IA, simula la búsqueda: lista (sin borrar) los archivos .log con más de 7 días en la carpeta actual.',
            hint: hint('<code>find . -name \'*.log\' -mtime +7 -print</code>.'),
            match: (c) => new RegExp('^find (\\.|' + HOME + '/practica-u3/api/logs/?) -name [\'"]\\*\\.log[\'"] -mtime \\+7( -print)?$').test(c),
            output: './acceso-viejo.log\n./error-viejo.log',
            prompt: P_LOGS,
            errors: [{ test: /-delete/, out: 'Cuidado: -delete borra de inmediato. Primero simula con -print.' }]
        },
        {
            instruction: 'Confirma las opciones de find en la documentación instalada: abre su manual.',
            hint: hint('<code>man find</code>. Dentro del manual, <code>/-mtime</code> busca y <code>q</code> sale.'),
            match: (c) => c === 'man find',
            output: '[ manual de find abierto: busca con /-mtime, avanza con n y sal con q ]',
            outputClass: 't-dim',
            prompt: P_LOGS
        },
        {
            instruction: 'Sube un nivel para quedar en ~/practica-u3/api, donde está el script y la carpeta registros.',
            hint: hint('<code>cd ..</code>.'),
            match: (c) => c === 'cd ..' || c === 'cd ../' || new RegExp('^cd ' + HOME + '/practica-u3/api/?$').test(c),
            output: '',
            prompt: P_LOGS
        },
        {
            instruction: 'Activa las marcas de tiempo del historial con el formato "%F %T " (fecha y hora).',
            hint: hint('<code>export HISTTIMEFORMAT=\'%F %T \'</code>.'),
            match: (c) => /^export HISTTIMEFORMAT=['"]%F %T ?['"]$/.test(c),
            output: '',
            prompt: P_API
        },
        {
            instruction: 'Inicia la grabación de la sesión en registros/sesion_FECHA.txt usando la sustitución de comandos $(date +%F) para la fecha.',
            hint: hint('<code>script registros/sesion_$(date +%F).txt</code>.'),
            match: (c) => /^script (-q |-a )?(\.\/)?registros\/sesion_\$\(date \+%F\)\.txt$/.test(c),
            output: `Script started, output log file is 'registros/sesion_${FECHA}.txt'.`,
            prompt: P_API
        },
        {
            instruction: 'Dentro de la grabación, verifica la sintaxis de limpiar-logs.sh sin ejecutarlo.',
            hint: hint('<code>bash -n limpiar-logs.sh</code>.'),
            match: (c) => /^bash -n (\.\/)?limpiar-logs\.sh$/.test(c),
            output: '(sin salida: la sintaxis es válida)',
            outputClass: 't-dim',
            prompt: P_API
        },
        {
            instruction: 'Ejecuta el script en modo de simulación con traza y guarda la salida en registros/limpiar_FECHA.log (une errores con 2>&1 y usa tee -a).',
            hint: hint('<code>bash -x limpiar-logs.sh 2&gt;&amp;1 | tee -a registros/limpiar_$(date +%F).log</code>.'),
            match: (c) => /^bash -x (\.\/)?limpiar-logs\.sh 2>&1 \| tee -a registros\/limpiar_\$\(date \+%F\)\.log$/.test(c),
            output: [
                `+ find ${RUTA_LOGS} -name '*.log' -mtime +7 -print`,
                `${RUTA_LOGS}/acceso-viejo.log`,
                `${RUTA_LOGS}/error-viejo.log`
            ].join('\n'),
            prompt: P_API
        },
        {
            instruction: 'Solo aparecen los archivos con más de 7 días. Ejecuta el modo real (cambia -print por -delete) y comprueba con ls logs en el mismo comando (&&).',
            hint: hint('<code>find logs -name \'*.log\' -mtime +7 -delete &amp;&amp; ls logs</code>.'),
            match: (c) => /^find logs\/? -name ['"]\*\.log['"] -mtime \+7 -delete && ls logs\/?$/.test(c),
            output: 'acceso-hoy.log\nerror-hoy.log',
            prompt: P_API
        },
        {
            instruction: 'Termina la grabación de la sesión.',
            hint: hint('escribe <code>exit</code> (o pulsa Ctrl+D).'),
            match: (c) => c === 'exit',
            output: 'Script done.',
            prompt: P_API
        },
        {
            instruction: 'Consulta las últimas 15 órdenes del historial, ahora con fecha y hora.',
            hint: hint('<code>history 15</code>.'),
            match: (c) => c === 'history 15',
            output: [
                `  118  ${FECHA} 15:02:44 script registros/sesion_${FECHA}.txt`,
                `  119  ${FECHA} 15:03:10 bash -n limpiar-logs.sh`,
                `  120  ${FECHA} 15:04:02 bash -x limpiar-logs.sh 2>&1 | tee -a registros/limpiar_${FECHA}.log`,
                `  121  ${FECHA} 15:05:37 find logs -name '*.log' -mtime +7 -delete && ls logs`,
                `  122  ${FECHA} 15:06:15 history 15`
            ].join('\n').replace(/ {2}/g, SP + SP),
            prompt: P_API
        },
        {
            instruction: 'Abre el editor nano para escribir la bitácora docs/registro-ia.md.',
            hint: hint('<code>nano docs/registro-ia.md</code>. Registra asistente, prompt, archivo, verificación, cambios, evidencia y resultado.'),
            match: (c) => /^nano (\.\/)?docs\/registro-ia\.md$/.test(c),
            output: '[ nano abierto: escribe la entrada de bitácora, guarda con Ctrl+O, Enter y sal con Ctrl+X ]',
            outputClass: 't-dim',
            prompt: P_API
        },
        {
            instruction: 'Protege tus datos: agrega la carpeta registros/ al archivo .gitignore (sin vaciarlo: usa la redirección que agrega al final).',
            hint: hint('<code>echo "registros/" &gt;&gt; .gitignore</code>.'),
            match: (c) => /^echo ["']?registros\/["']? >> (\.\/)?\.gitignore$/.test(c),
            output: '',
            prompt: P_API,
            errors: [{ test: /^echo ["']?registros\/["']? > (\.\/)?\.gitignore$/, out: 'Cuidado: > vacía .gitignore antes de escribir. Usa >> para agregar al final.' }]
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
        title: 'Actividad 1: auditoría de un script generado por IA',
        challenges: a1Challenges,
        doneText: '¡Has completado todos los retos de la Actividad 1!',
        winText: '¡COMPLETADO! Verificaste el script con bash -n, ShellCheck y la documentación, y lo corregiste con simulación y traza.',
        winBadge: '¡ACTIVIDAD 1 COMPLETADA!'
    });

    createTerminal({
        id: 'a2',
        title: 'Actividad 2: prompt técnico y registro',
        challenges: a2Challenges,
        doneText: '¡Completaste la Actividad 2! Verificaste el script y dejaste evidencia con history, script, tee y una bitácora.',
        winText: '¡COMPLETADO! Simulaste, verificaste y registraste tu trabajo con IA de forma auditable.',
        winBadge: '¡ACTIVIDAD 2 COMPLETADA!'
    });

});
