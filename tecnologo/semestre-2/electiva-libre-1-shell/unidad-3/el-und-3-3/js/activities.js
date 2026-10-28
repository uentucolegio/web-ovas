// ============================================================
// activities.js — Scripts para respaldos, organización de archivos y diagnóstico
// Dos terminales simuladas: respaldo automatizado (tar + exit + cron)
// y organización de recursos con for/case + diagnóstico del sistema.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    const P0 = 'estudiante@linux:~$';
    const P1 = 'estudiante@linux:~/proyectos/tienda-web$';
    const P2 = 'estudiante@linux:~/Descargas/recursos-landing$';
    const HOME = '(?:~|\\$HOME|/home/estudiante)';

    const escapeHtml = (s) => s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const normalize = (s) => s.trim().replace(/\s+/g, ' ');

    const hint = (txt) => `<i class="fa-solid fa-lightbulb" style="margin-right:4px;"></i> Pista: ${txt}`;

    // Separa en palabras respetando comillas y las elimina: touch "foto equipo.jpg" -> ['touch', 'foto equipo.jpg']
    const tokens = (cmd) => (cmd.match(/"[^"]*"|'[^']*'|\S+/g) || []).map(t => t.replace(/^["']|["']$/g, ''));

    const sameSet = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());

    // Compara los argumentos sin importar el orden (touch a b == touch b a)
    const argsEq = (cmd, name, args) => {
        const t = tokens(cmd);
        return t[0] === name && sameSet(t.slice(1), args);
    };

    // ==========================================
    // ACTIVIDAD 1: Respaldo automatizado
    // ==========================================
    const dirsProyecto = ['src', 'node_modules', 'dist', 'scripts'];
    const reRespaldo = HOME + '/respaldos/tienda-web_\\S+\\.tar\\.gz';
    const lineaCron = '30 2 * * * /home/estudiante/proyectos/tienda-web/scripts/respaldo.sh >> /home/estudiante/respaldos/respaldo.log 2>&1';

    const a1Challenges = [
        {
            instruction: 'Crea la estructura del proyecto de práctica: ~/proyectos/tienda-web con las carpetas src, node_modules, dist y scripts (un solo comando).',
            hint: hint('<code>mkdir -p ~/proyectos/tienda-web/{src,node_modules,dist,scripts}</code>.'),
            match: (c) => {
                const m = c.match(new RegExp('^mkdir -p ' + HOME + '/proyectos/tienda-web/\\{([^}]+)\\}$'));
                if (m) return sameSet(m[1].split(','), dirsProyecto);
                const t = tokens(c);
                const base = new RegExp('^' + HOME + '/proyectos/tienda-web/');
                return t[0] === 'mkdir' && t[1] === '-p' && t.slice(2).every(x => base.test(x))
                    && sameSet(t.slice(2).map(x => x.replace(base, '')), dirsProyecto);
            },
            output: '',
            prompt: P0
        },
        {
            instruction: 'Ubícate dentro de la carpeta del proyecto: ~/proyectos/tienda-web.',
            hint: hint('usa <code>cd ~/proyectos/tienda-web</code>.'),
            match: (c) => new RegExp('^cd ' + HOME + '/proyectos/tienda-web/?$').test(c) || c === 'cd proyectos/tienda-web',
            output: '',
            prompt: P0
        },
        {
            instruction: 'Crea los archivos de ejemplo: package.json, src/index.js, node_modules/libreria.js, dist/app.js y error.log (un solo comando).',
            hint: hint('<code>touch</code> acepta varios archivos separados por espacios.'),
            match: (c) => argsEq(c, 'touch', ['package.json', 'src/index.js', 'node_modules/libreria.js', 'dist/app.js', 'error.log']),
            output: '',
            prompt: P1
        },
        {
            instruction: 'Abre el editor nano para crear el script scripts/respaldo.sh.',
            hint: hint('<code>nano scripts/respaldo.sh</code>. Allí pegarías el script con <code>tar</code> y <code>--exclude</code>.'),
            match: (c) => /^nano (\.\/)?scripts\/respaldo\.sh$/.test(c),
            output: '[ nano abierto: pega el script, guarda con Ctrl+O, Enter y sal con Ctrl+X ]',
            prompt: P1
        },
        {
            instruction: 'Asigna permiso de ejecución al script.',
            hint: hint('usa <code>chmod +x</code> seguido de la ruta del script.'),
            match: (c) => /^chmod (\+x|u\+x|755) (\.\/)?scripts\/respaldo\.sh$/.test(c),
            output: '',
            prompt: P1,
            errors: [{ test: /^\.\/scripts\/respaldo\.sh$/, out: 'bash: ./scripts/respaldo.sh: Permission denied' }]
        },
        {
            instruction: 'Ejecuta el script de respaldo y observa el nombre del archivo generado.',
            hint: hint('usa <code>./scripts/respaldo.sh</code>.'),
            match: (c) => c === './scripts/respaldo.sh' || c === 'bash scripts/respaldo.sh',
            output: '[OK] Respaldo creado: /home/estudiante/respaldos/tienda-web_2026-09-30_1415.tar.gz',
            prompt: P1
        },
        {
            instruction: 'Verifica el contenido del respaldo SIN extraerlo (usa el nombre tienda-web_2026-09-30_1415.tar.gz). No deben aparecer node_modules, dist ni error.log.',
            hint: hint('<code>tar -tzf ~/respaldos/tienda-web_2026-09-30_1415.tar.gz</code>. La opción <code>-t</code> lista el contenido.'),
            match: (c) => new RegExp('^tar -(tzf|ztf) ' + reRespaldo + '$').test(c),
            output: 'tienda-web/\ntienda-web/package.json\ntienda-web/scripts/\ntienda-web/scripts/respaldo.sh\ntienda-web/src/\ntienda-web/src/index.js',
            prompt: P1,
            errors: [{ test: /^tar -(cfz|tfz|xfz)\b/, out: 'tar: z: No se puede abrir: No existe el fichero o directorio\n(la opción f debe ir siempre al final del bloque: -tzf)' }]
        },
        {
            instruction: 'Crea la carpeta ~/restauracion donde restaurarás el respaldo.',
            hint: hint('usa <code>mkdir -p ~/restauracion</code>.'),
            match: (c) => new RegExp('^mkdir -p ' + HOME + '/restauracion/?$').test(c),
            output: '',
            prompt: P1
        },
        {
            instruction: 'Restaura el respaldo tienda-web_2026-09-30_1415.tar.gz dentro de ~/restauracion (usa -C para indicar el destino).',
            hint: hint('<code>tar -xzf ~/respaldos/tienda-web_2026-09-30_1415.tar.gz -C ~/restauracion</code>.'),
            match: (c) => new RegExp('^tar -(xzf|zxf) ' + reRespaldo + ' -C ' + HOME + '/restauracion/?$').test(c),
            output: '',
            prompt: P1,
            errors: [{ test: /^tar -xfz\b/, out: 'tar: z: No se puede abrir: No existe el fichero o directorio\n(la opción f debe ir al final del bloque: -xzf)' }]
        },
        {
            instruction: 'Revisa de forma recursiva el contenido de ~/restauracion.',
            hint: hint('<code>ls -R ~/restauracion</code>.'),
            match: (c) => new RegExp('^ls -R ' + HOME + '/restauracion/?$').test(c),
            output: '/home/estudiante/restauracion:\ntienda-web\n\n/home/estudiante/restauracion/tienda-web:\npackage.json  scripts  src\n\n/home/estudiante/restauracion/tienda-web/scripts:\nrespaldo.sh\n\n/home/estudiante/restauracion/tienda-web/src:\nindex.js',
            prompt: P1
        },
        {
            instruction: 'Prueba el manejo de errores: ejecuta el script con una ruta que no existe, ~/proyectos/no-existe.',
            hint: hint('<code>./scripts/respaldo.sh ~/proyectos/no-existe</code>.'),
            match: (c) => new RegExp('^(\\./scripts/respaldo\\.sh|bash scripts/respaldo\\.sh) ' + HOME + '/proyectos/no-existe/?$').test(c),
            output: '[ERROR] No existe /home/estudiante/proyectos/no-existe',
            outputClass: 't-err',
            prompt: P1
        },
        {
            instruction: 'Consulta el código de salida del comando anterior.',
            hint: hint('el código del último comando queda en la variable especial <code>$?</code>; muéstrala con <code>echo</code>.'),
            match: (c) => c === 'echo $?' || c === 'echo "$?"',
            output: '1',
            prompt: P1
        },
        {
            instruction: 'Abre la tabla de tareas de cron para programar el respaldo.',
            hint: hint('<code>crontab -e</code> edita la tabla de tareas del usuario.'),
            match: (c) => c === 'crontab -e',
            output: '[ editor abierto: escribe la línea de la tarea, guarda y sal ]',
            prompt: P1
        },
        {
            instruction: 'Escribe la línea de crontab que ejecuta respaldo.sh todos los días a las 2:30 a. m., con rutas absolutas (/home/estudiante/...) y la salida (>> y 2>&1) guardada en ~/respaldos/respaldo.log.',
            hint: hint('<code>30 2 * * * /home/estudiante/proyectos/tienda-web/scripts/respaldo.sh &gt;&gt; /home/estudiante/respaldos/respaldo.log 2&gt;&amp;1</code>'),
            match: (c) => /^30 2 \* \* \* \/home\/estudiante\/proyectos\/tienda-web\/scripts\/respaldo\.sh >> \/home\/estudiante\/respaldos\/respaldo\.log 2>&1$/.test(c),
            output: 'crontab: tarea instalada',
            prompt: P1,
            errors: [
                { test: /^30 2 \* \* \* .*~/, out: 'cron no expande ~: usa rutas absolutas (/home/estudiante/...).' },
                { test: /^30 2 \* \* \* [^>]*$/, out: 'La salida y los errores se perderían: agrega >> archivo.log 2>&1.' }
            ]
        },
        {
            instruction: 'Confirma que la tarea quedó programada.',
            hint: hint('<code>crontab -l</code> lista las tareas del usuario.'),
            match: (c) => c === 'crontab -l',
            output: lineaCron,
            prompt: P1
        }
    ];

    // ==========================================
    // ACTIVIDAD 2: Organización de recursos y diagnóstico del sistema
    // ==========================================
    const archivosRecursos = ['logo.PNG', 'hero-banner.webp', 'estilos.css', 'app.js', 'fuente.woff2', 'intro.mp4', 'notas.txt', 'foto equipo.jpg'];

    const salidaOrganizar = [
        'app.js -> public/js/',
        'estilos.css -> public/css/',
        'foto equipo.jpg -> public/img/',
        'fuente.woff2 -> public/fonts/',
        'hero-banner.webp -> public/img/',
        'intro.mp4 -> public/video/',
        'logo.PNG -> public/img/',
        'notas.txt -> public/otros/'
    ].join('\n');

    const salidaFind = [
        '/home/estudiante/proyectos/landing-cafe/public/js/app.js',
        '/home/estudiante/proyectos/landing-cafe/public/css/estilos.css',
        '/home/estudiante/proyectos/landing-cafe/public/img/foto equipo.jpg',
        '/home/estudiante/proyectos/landing-cafe/public/img/hero-banner.webp',
        '/home/estudiante/proyectos/landing-cafe/public/img/logo.PNG',
        '/home/estudiante/proyectos/landing-cafe/public/fonts/fuente.woff2',
        '/home/estudiante/proyectos/landing-cafe/public/video/intro.mp4',
        '/home/estudiante/proyectos/landing-cafe/public/otros/notas.txt'
    ].join('\n');

    const a2Challenges = [
        {
            instruction: 'Crea la carpeta de recursos que entregó el diseñador: ~/Descargas/recursos-landing.',
            hint: hint('usa <code>mkdir -p</code> para crear la ruta completa.'),
            match: (c) => new RegExp('^mkdir -p ' + HOME + '/Descargas/recursos-landing/?$').test(c),
            output: '',
            prompt: P0
        },
        {
            instruction: 'Ubícate dentro de ~/Descargas/recursos-landing.',
            hint: hint('usa <code>cd ~/Descargas/recursos-landing</code>.'),
            match: (c) => new RegExp('^cd ' + HOME + '/Descargas/recursos-landing/?$').test(c) || c === 'cd Descargas/recursos-landing',
            output: '',
            prompt: P0
        },
        {
            instruction: 'Crea los 8 archivos de ejemplo en un solo comando: logo.PNG, hero-banner.webp, estilos.css, app.js, fuente.woff2, intro.mp4, notas.txt y "foto equipo.jpg" (este último tiene un espacio: va entre comillas).',
            hint: hint('<code>touch logo.PNG hero-banner.webp estilos.css app.js fuente.woff2 intro.mp4 notas.txt "foto equipo.jpg"</code>.'),
            match: (c) => argsEq(c, 'touch', archivosRecursos),
            output: '',
            prompt: P2,
            errors: [{ test: /^touch .*foto equipo\.jpg/, out: 'Sin comillas, "foto" y "equipo.jpg" se interpretan como dos archivos distintos: usa "foto equipo.jpg".' }]
        },
        {
            instruction: 'Extrae la extensión: guarda archivo="hero-banner.WEBP" y, en la misma línea, muestra ${archivo##*.} con echo.',
            hint: hint('<code>archivo="hero-banner.WEBP"; echo "${archivo##*.}"</code>.'),
            match: (c) => /^archivo="?hero-banner\.WEBP"?; echo "?\$\{archivo##\*\.\}"?$/.test(c),
            output: 'WEBP',
            prompt: P2
        },
        {
            instruction: 'Convierte el valor de la variable a minúsculas con la expansión de parámetros ${archivo,,}.',
            hint: hint('<code>echo "${archivo,,}"</code>. Linux distingue mayúsculas: por eso se pasa todo a minúsculas antes del <code>case</code>.'),
            match: (c) => /^echo "?\$\{archivo,,\}"?$/.test(c),
            output: 'hero-banner.webp',
            prompt: P2
        },
        {
            instruction: 'Abre nano para crear el script organizar.sh (con el for y el case de la sección «Clasificar con case»).',
            hint: hint('<code>nano organizar.sh</code>.'),
            match: (c) => /^nano (\.\/)?organizar\.sh$/.test(c),
            output: '[ nano abierto: pega el script, guarda con Ctrl+O, Enter y sal con Ctrl+X ]',
            prompt: P2
        },
        {
            instruction: 'Ejecuta el script con Bash y observa en qué carpeta de public/ quedó cada archivo.',
            hint: hint('<code>bash organizar.sh</code>.'),
            match: (c) => c === 'bash organizar.sh',
            output: salidaOrganizar,
            prompt: P2,
            errors: [{ test: /^\.\/organizar\.sh$/, out: 'bash: ./organizar.sh: Permission denied (usa bash organizar.sh o chmod +x)' }]
        },
        {
            instruction: 'Revisa el resultado listando todos los archivos de ~/proyectos/landing-cafe/public.',
            hint: hint('<code>find ~/proyectos/landing-cafe/public -type f</code>.'),
            match: (c) => new RegExp('^find ' + HOME + '/proyectos/landing-cafe/public -type f$').test(c),
            output: salidaFind,
            prompt: P2
        },
        {
            instruction: 'Pregunta de análisis: ¿a qué carpeta fue notas.txt? Compruébalo listando el contenido de public/otros.',
            hint: hint('<code>ls ~/proyectos/landing-cafe/public/otros</code>. Una extensión no prevista cae en el caso <code>*)</code>.'),
            match: (c) => new RegExp('^ls ' + HOME + '/proyectos/landing-cafe/public/otros/?$').test(c),
            output: 'notas.txt',
            prompt: P2
        },
        {
            instruction: 'Parte B (diagnóstico). Consulta la carga del equipo y el tiempo encendido.',
            hint: hint('<code>uptime</code> muestra los tres valores de <em>load average</em> (1, 5 y 15 min).'),
            match: (c) => c === 'uptime',
            output: ' 10:15:32 up 3 days,  4:21,  2 users,  load average: 0.52, 0.48, 0.45',
            prompt: P2
        },
        {
            instruction: 'Consulta cuántos núcleos tiene el equipo para comparar con el load average.',
            hint: hint('<code>nproc</code>. Si el load average supera este número, hay saturación.'),
            match: (c) => c === 'nproc',
            output: '4',
            prompt: P2
        },
        {
            instruction: 'Revisa el espacio de la partición raíz (/) en formato legible.',
            hint: hint('<code>df -h /</code>. Observa la columna <code>Use%</code>.'),
            match: (c) => c === 'df -h /',
            output: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   21G   27G  44% /',
            prompt: P2
        },
        {
            instruction: 'Consulta la memoria RAM en formato legible.',
            hint: hint('<code>free -h</code>. Fíjate en la columna <code>available</code>, no en <code>free</code>.'),
            match: (c) => c === 'free -h',
            output: '               total        used        free      shared  buff/cache   available\nMem:           7.7Gi       2.9Gi       1.1Gi       215Mi       3.7Gi       4.5Gi\nSwap:          2.0Gi          0B       2.0Gi',
            prompt: P2
        },
        {
            instruction: 'Averigua qué carpeta de ~/proyectos ocupa más espacio: usa du -sh ordenado con sort -h.',
            hint: hint('<code>du -sh ~/proyectos/* | sort -h</code>. La más pesada queda al final.'),
            match: (c) => new RegExp('^du -sh ' + HOME + '/proyectos/\\* \\| sort -h$').test(c),
            output: '12K\t/home/estudiante/proyectos/landing-cafe\n38M\t/home/estudiante/proyectos/api-pedidos\n412M\t/home/estudiante/proyectos/tienda-web',
            prompt: P2
        },
        {
            instruction: 'Lista los puertos TCP en escucha y comprueba si el 3000 o el 80 están en estado LISTEN.',
            hint: hint('<code>ss -tln</code> (t = TCP, l = en escucha, n = números).'),
            match: (c) => c === 'ss -tln',
            output: 'State    Recv-Q   Send-Q   Local Address:Port   Peer Address:Port\nLISTEN   0        511            0.0.0.0:80          0.0.0.0:*\nLISTEN   0        511                  *:3000              *:*',
            prompt: P2
        },
        {
            instruction: 'Análisis de logs: obtén las cinco IP con más peticiones de /var/log/nginx/access.log encadenando awk, sort, uniq -c, sort -rn y head -n 5.',
            hint: hint('<code>awk \'{print $1}\' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -n 5</code>. El primer <code>sort</code> es indispensable para que <code>uniq</code> cuente bien.'),
            match: (c) => /^awk '\{print \$1\}' \/var\/log\/nginx\/access\.log \| sort \| uniq -c \| sort -rn \| head -n 5$/.test(c),
            output: '    312 190.24.81.17\n    144 181.55.12.9\n     97 200.21.5.66\n     40 190.24.81.20\n     12 201.184.7.3',
            prompt: P2,
            errors: [{ test: /^awk .*\| uniq -c/, out: 'uniq solo agrupa líneas iguales consecutivas: falta un sort antes de uniq -c.' }]
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
        title: 'Actividad 1: respaldo automatizado',
        challenges: a1Challenges,
        doneText: '¡Has completado todos los retos de la Actividad 1!',
        winText: '¡COMPLETADO! Creaste, verificaste y restauraste un respaldo, manejaste un código de salida y lo programaste con cron.',
        winBadge: '¡ACTIVIDAD 1 COMPLETADA!'
    });

    createTerminal({
        id: 'a2',
        title: 'Actividad 2: organización y diagnóstico',
        challenges: a2Challenges,
        doneText: '¡Completaste la Actividad 2! Clasificaste archivos con for y case y diagnosticaste el sistema.',
        winText: '¡COMPLETADO! Organizaste recursos por extensión, revisaste recursos del sistema y analizaste un log.',
        winBadge: '¡ACTIVIDAD 2 COMPLETADA!'
    });

});
