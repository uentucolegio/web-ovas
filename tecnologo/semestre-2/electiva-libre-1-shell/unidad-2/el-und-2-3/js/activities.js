// ============================================================
// activities.js — Tema 2.3: Permisos, usuarios, grupos, chmod
// + Procesos y servicios
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ACTIVIDAD 1: Permisos, usuarios y grupos
    // ==========================================
    const a1Input   = document.getElementById('a1-input');
    const a1Body    = document.getElementById('a1-body');
    const a1Num     = document.getElementById('a1-num');
    const a1Total   = document.getElementById('a1-total');
    const a1Text    = document.getElementById('a1-text');
    const a1Hint    = document.getElementById('a1-hint');
    const a1Prompt  = document.getElementById('a1-prompt');
    const a1Progress= document.getElementById('a1-progress');
    const a1Score   = document.getElementById('a1-score');
    const a1Feedback= document.getElementById('a1-feedback');
    const a1Reset   = document.getElementById('a1-reset');

    const P1 = 'estudiante@linux:~$';
    const P2 = 'estudiante@linux:~/proyecto-web-practica$';

    const a1Challenges = [
        {
            instruction: 'Crea la carpeta proyecto-web-practica y, dentro de ella, las subcarpetas src, public y logs con un solo comando.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>mkdir -p</code> con la expansión de llaves <code>{}</code>.',
            accept: ['mkdir -p proyecto-web-practica/{src,public,logs}'],
            output: '',
            prompt: P1
        },
        {
            instruction: 'Ubícate dentro de la carpeta del proyecto.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>cd</code> seguido del nombre de la carpeta.',
            accept: ['cd proyecto-web-practica', 'cd proyecto-web-practica/'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Crea en un solo comando los archivos vacíos: .env en la raíz, src/app.js, public/index.html y logs/app.log.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: <code>touch</code> acepta varias rutas separadas por espacios.',
            accept: ['touch .env src/app.js public/index.html logs/app.log'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Crea el grupo del equipo de desarrollo, llamado dev-equipo.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>sudo groupadd</code> seguido del nombre del grupo.',
            accept: ['sudo groupadd dev-equipo', 'groupadd dev-equipo'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Crea el usuario dev-frontend con directorio home propio y /bin/bash como shell de inicio.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: <code>useradd</code> con las opciones <code>-m</code> (home) y <code>-s</code> (shell).',
            accept: ['sudo useradd -m -s /bin/bash dev-frontend', 'useradd -m -s /bin/bash dev-frontend'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Agrega dev-frontend al grupo dev-equipo SIN eliminar los grupos que ya tenía.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: la opción <code>-a</code> (append) junto a <code>-G</code> es imprescindible.',
            accept: ['sudo usermod -aG dev-equipo dev-frontend', 'usermod -aG dev-equipo dev-frontend'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Cambia de forma recursiva el grupo propietario de todo el proyecto para que sea dev-equipo.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: <code>chgrp</code> con la opción recursiva <code>-R</code> sobre el directorio actual <code>.</code>',
            accept: ['sudo chgrp -R dev-equipo .', 'chgrp -R dev-equipo .'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Deja src/ accesible en lectura y ejecución para el propietario y el grupo, pero sin ningún acceso para otros.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: propietario 7 (rwx), grupo 5 (r-x) y otros 0 (sin acceso).',
            accept: ['chmod 750 src', 'chmod 750 src/'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Deja public/ accesible en lectura y ejecución para todos, pero con escritura solo para el propietario.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: es el permiso estándar de directorios públicos en despliegues web.',
            accept: ['chmod 755 public', 'chmod 755 public/'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Haz que logs/app.log sea legible y escribible por el propietario, solo legible para el grupo y sin acceso para otros.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: propietario 6 (rw-), grupo 4 (r--) y otros 0.',
            accept: ['chmod 640 logs/app.log'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Protege el archivo .env para que solo el propietario pueda leerlo y escribirlo.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: propietario 6 (rw-), grupo 0 y otros 0.',
            accept: ['chmod 600 .env'],
            output: '',
            prompt: P2
        },
        {
            instruction: 'Verifica que los permisos y la propiedad quedaron como esperabas.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>ls</code> con la opción de listado largo <code>-l</code>.',
            accept: ['ls -l', 'ls -la', 'ls -al'],
            output: 'total 12\n-rw------- 1 estudiante dev-equipo    0 ago  8 09:42 .env\ndrwxr-x--- 2 estudiante dev-equipo 4096 ago  8 09:42 logs\ndrwxr-xr-x 2 estudiante dev-equipo 4096 ago  8 09:42 public\ndrwxr-x--- 2 estudiante dev-equipo 4096 ago  8 09:42 src',
            prompt: P2
        }
    ];

    let a1Current = 0, a1Completed = 0;

    function initA1() {
        if (!a1Input) return;
        a1Current = 0; a1Completed = 0;
        a1Body.innerHTML = `
            <div class="term-line text-slate-400">Terminal Linux simulada <i class="fa-brands fa-linux text-green-400 ml-1"></i> — Actividad 1: permisos, usuarios y grupos</div>
            <div class="term-line text-slate-400">Escribe el comando indicado en el reto.</div>
            <div class="term-line text-slate-400">──────────────────────────────────────────────────</div>
        `;
        a1Input.value = '';
        a1Input.disabled = false;
        a1Input.placeholder = 'Escribe tu comando aquí...';
        updateA1Challenge();
        updateA1Progress();
        showA1Feedback('', '');
    }

    function updateA1Challenge() {
        if (a1Current >= a1Challenges.length) {
            a1Text.innerHTML = '<i class="fa-solid fa-flag-checkered" style="color:#508C46;margin-right:6px;"></i> ¡Has completado todos los retos de la Actividad 1!';
            a1Hint.textContent = '';
            a1Num.textContent = a1Challenges.length;
            a1Input.disabled = true;
            a1Input.placeholder = '¡Actividad completada!';
            return;
        }
        const c = a1Challenges[a1Current];
        a1Num.textContent = a1Current + 1;
        a1Total.textContent = a1Challenges.length;
        a1Text.textContent = c.instruction;
        a1Hint.innerHTML = c.hint;
        a1Prompt.textContent = c.prompt;
    }

    function addA1Line(text, cls = '') {
        const line = document.createElement('div');
        line.className = `term-line ${cls}`;
        line.innerHTML = text.replace(/\n/g, '<br>');
        a1Body.appendChild(line);
        a1Body.scrollTop = a1Body.scrollHeight;
    }

    function updateA1Progress() {
        const pct = (a1Completed / a1Challenges.length) * 100;
        if (a1Progress) { a1Progress.style.width = `${pct}%`; a1Progress.textContent = pct > 0 ? `${Math.round(pct)}%` : ''; }
        if (a1Score) a1Score.textContent = `${a1Completed}/${a1Challenges.length}`;
    }

    function showA1Feedback(msg, cls) {
        if (!a1Feedback) return;
        a1Feedback.innerHTML = msg;
        a1Feedback.className = `mt-4 text-center font-bold text-sm sm:text-lg h-10 transition-all flex items-center justify-center rounded-lg ${cls}`;
    }

    if (a1Input) {
        a1Input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const input = a1Input.value.trim();
            if (!input || a1Current >= a1Challenges.length) return;
            const c = a1Challenges[a1Current];
            addA1Line(`${c.prompt} ${input}`, 'text-green-400');
            const isCorrect = c.accept.includes(input);
            if (isCorrect) {
                if (c.output) addA1Line(c.output, 'text-white');
                addA1Line('<i class="fa-solid fa-check text-green-400 mr-2"></i> ¡Correcto! Comando ejecutado.', 'text-green-400');
                a1Completed++; a1Current++;
                updateA1Progress();
                showA1Feedback('<i class="fa-solid fa-circle-check mr-2"></i> ¡Bien hecho!', 'bg-green-100 text-green-800 border-2 border-green-300');
                if (a1Completed === a1Challenges.length) {
                    addA1Line('', '');
                    addA1Line('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡COMPLETADO! Configuraste usuarios, grupos y permisos de proyecto-web-practica.', 'text-yellow-400');
                    addA1Line('Recuerda: permiso mínimo necesario. El .env siempre en 600.', 'text-yellow-300');
                    showA1Feedback('<i class="fa-solid fa-award mr-2"></i> ¡ACTIVIDAD 1 COMPLETADA!', 'bg-green-100 text-green-800 border-2 border-green-300');
                } else {
                    addA1Line('──────────────────────────────────────────────────', 'text-slate-600');
                }
                updateA1Challenge();
            } else {
                addA1Line(`bash: ${input}: comando no reconocido o incorrecto para este reto.`, 'text-red-400');
                showA1Feedback('<i class="fa-solid fa-circle-xmark mr-2"></i> Mmm, intenta de nuevo.', 'bg-red-100 text-red-800 border-2 border-red-300');
            }
            a1Input.value = '';
        });
    }

    if (a1Reset) a1Reset.addEventListener('click', initA1);
    if (a1Input) initA1();


    // ==========================================
    // ACTIVIDAD 2: Gestión de procesos y servicios
    // ==========================================
    const a2Input    = document.getElementById('a2-input');
    const a2Body     = document.getElementById('a2-body');
    const a2Num      = document.getElementById('a2-num');
    const a2Total    = document.getElementById('a2-total');
    const a2Text     = document.getElementById('a2-text');
    const a2Hint     = document.getElementById('a2-hint');
    const a2Prompt   = document.getElementById('a2-prompt');
    const a2Progress = document.getElementById('a2-progress');
    const a2Score    = document.getElementById('a2-score');
    const a2Feedback = document.getElementById('a2-feedback');
    const a2Reset    = document.getElementById('a2-reset');

    const PP = 'estudiante@linux:~/proyecto-web-practica$';

    const a2Challenges = [
        {
            instruction: 'Crea el archivo server.js, que contendrá un servidor HTTP muy simple escuchando en el puerto 3000.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>touch</code> con el nombre del archivo.',
            accept: ['touch server.js'],
            output: '',
            prompt: PP
        },
        {
            instruction: 'Dale a server.js permisos de lectura, escritura y ejecución para el propietario, y de lectura y ejecución para el grupo y otros.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: es la combinación numérica 7-5-5.',
            accept: ['chmod 755 server.js'],
            output: '',
            prompt: PP
        },
        {
            instruction: 'Ejecuta el servidor en segundo plano para que la terminal quede libre.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: añade el símbolo <code>&</code> al final del comando <code>node server.js</code>.',
            accept: ['node server.js &'],
            output: '[1] 4821\nServidor escuchando en http://localhost:3000',
            prompt: PP
        },
        {
            instruction: 'Localiza el proceso de tu servidor filtrando la lista de procesos por la palabra node.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: combina <code>ps aux</code> con <code>grep</code> mediante una tubería <code>|</code>.',
            accept: ['ps aux | grep node', 'ps aux |grep node', 'ps aux|grep node'],
            output: 'estudiante  4821  0.4  1.2  node server.js\nestudiante  4903  0.0  0.0  grep --color=auto node',
            prompt: PP
        },
        {
            instruction: 'Detén el proceso 4821 con la señal que permite una terminación ordenada (no forzada).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: SIGTERM es la señal 15 y siempre se intenta antes que SIGKILL.',
            accept: ['kill -15 4821', 'kill 4821'],
            output: '[1]+  Terminado          node server.js',
            prompt: PP
        },
        {
            instruction: 'Crea el archivo de unidad mi-app-web.service para registrar tu aplicación como servicio (versión simulada, en tu carpeta de práctica).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: los archivos de unidad de systemd terminan en <code>.service</code>.',
            accept: ['touch mi-app-web.service'],
            output: '',
            prompt: PP
        },
        {
            instruction: 'Consulta el estado actual del servicio mi-app-web.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: <code>systemctl</code> con el subcomando de estado.',
            accept: ['systemctl status mi-app-web', 'sudo systemctl status mi-app-web'],
            output: '● mi-app-web.service - Aplicacion web Node.js\n   Loaded: loaded (/etc/systemd/system/mi-app-web.service)\n   Active: inactive (dead)',
            prompt: PP
        },
        {
            instruction: 'Inicia el servicio mi-app-web.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: el subcomando que pone en marcha un servicio es <code>start</code>.',
            accept: ['sudo systemctl start mi-app-web', 'systemctl start mi-app-web'],
            output: '',
            prompt: PP
        },
        {
            instruction: 'Haz que el servicio arranque automáticamente cada vez que se inicie el sistema.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: el subcomando <code>enable</code> crea el enlace de arranque.',
            accept: ['sudo systemctl enable mi-app-web', 'systemctl enable mi-app-web'],
            output: 'Created symlink /etc/systemd/system/multi-user.target.wants/mi-app-web.service',
            prompt: PP
        },
        {
            instruction: 'Consulta las últimas 50 líneas de log del servicio mi-app-web para verificar que arrancó sin errores.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: <code>journalctl</code> con <code>-u</code> (unidad) y <code>-n</code> (número de líneas).',
            accept: ['journalctl -u mi-app-web -n 50', 'sudo journalctl -u mi-app-web -n 50'],
            output: 'ago 08 09:58:12 servidor systemd[1]: Started Aplicacion web Node.js.\nago 08 09:58:12 servidor node[5120]: Servidor escuchando en http://localhost:3000',
            prompt: PP
        }
    ];

    let a2Current = 0, a2Completed = 0;

    function initA2() {
        if (!a2Input) return;
        a2Current = 0; a2Completed = 0;
        a2Body.innerHTML = `
            <div class="term-line text-slate-400">Terminal Linux simulada <i class="fa-brands fa-linux text-green-400 ml-1"></i> — Actividad 2: procesos y servicios</div>
            <div class="term-line text-slate-400">Escribe el comando indicado en el reto.</div>
            <div class="term-line text-slate-400">──────────────────────────────────────────────────</div>
        `;
        a2Input.value = '';
        a2Input.disabled = false;
        a2Input.placeholder = 'Escribe tu comando aquí...';
        updateA2Challenge();
        updateA2Progress();
        showA2Feedback('', '');
    }

    function updateA2Challenge() {
        if (a2Current >= a2Challenges.length) {
            a2Text.innerHTML = '<i class="fa-solid fa-flag-checkered" style="color:#08AFE6;margin-right:6px;"></i> ¡Completaste la Actividad 2! Gestionaste un proceso y un servicio de principio a fin.';
            a2Hint.textContent = '';
            a2Num.textContent = a2Challenges.length;
            a2Input.disabled = true;
            a2Input.placeholder = '¡Actividad completada!';
            return;
        }
        const c = a2Challenges[a2Current];
        a2Num.textContent = a2Current + 1;
        a2Total.textContent = a2Challenges.length;
        a2Text.textContent = c.instruction;
        a2Hint.innerHTML = c.hint;
        a2Prompt.textContent = c.prompt;
    }

    function addA2Line(text, cls = '') {
        const line = document.createElement('div');
        line.className = `term-line ${cls}`;
        line.innerHTML = text.replace(/\n/g, '<br>');
        a2Body.appendChild(line);
        a2Body.scrollTop = a2Body.scrollHeight;
    }

    function updateA2Progress() {
        const pct = (a2Completed / a2Challenges.length) * 100;
        if (a2Progress) { a2Progress.style.width = `${pct}%`; a2Progress.textContent = pct > 0 ? `${Math.round(pct)}%` : ''; }
        if (a2Score) a2Score.textContent = `${a2Completed}/${a2Challenges.length}`;
    }

    function showA2Feedback(msg, cls) {
        if (!a2Feedback) return;
        a2Feedback.innerHTML = msg;
        a2Feedback.className = `mt-4 text-center font-bold text-sm sm:text-lg h-10 transition-all flex items-center justify-center rounded-lg ${cls}`;
    }

    if (a2Input) {
        a2Input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const input = a2Input.value.trim();
            if (!input || a2Current >= a2Challenges.length) return;
            const c = a2Challenges[a2Current];
            addA2Line(`${c.prompt} ${input}`, 'text-green-400');
            const isCorrect = c.accept.includes(input);
            if (isCorrect) {
                if (c.output) addA2Line(c.output, 'text-white');
                addA2Line('<i class="fa-solid fa-check text-green-400 mr-2"></i> ¡Correcto!', 'text-green-400');
                a2Completed++; a2Current++;
                updateA2Progress();
                showA2Feedback('<i class="fa-solid fa-circle-check mr-2"></i> ¡Excelente!', 'bg-blue-100 text-blue-800 border-2 border-blue-300');
                if (a2Completed === a2Challenges.length) {
                    addA2Line('', '');
                    addA2Line('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡COMPLETADO! Ejecutaste, inspeccionaste y detuviste un proceso, y registraste el servicio en systemd.', 'text-yellow-400');
                    addA2Line('Buenas prácticas aplicadas: kill -15 antes que kill -9 y journalctl para diagnosticar.', 'text-yellow-300');
                    showA2Feedback('<i class="fa-solid fa-award mr-2"></i> ¡ACTIVIDAD 2 COMPLETADA!', 'bg-blue-100 text-blue-800 border-2 border-blue-300');
                } else {
                    addA2Line('──────────────────────────────────────────────────', 'text-slate-600');
                }
                updateA2Challenge();
            } else {
                addA2Line(`bash: ${input}: comando no reconocido o incorrecto para este reto.`, 'text-red-400');
                showA2Feedback('<i class="fa-solid fa-circle-xmark mr-2"></i> Intenta de nuevo.', 'bg-red-100 text-red-800 border-2 border-red-300');
            }
            a2Input.value = '';
        });
    }

    if (a2Reset) a2Reset.addEventListener('click', initA2);
    if (a2Input) initA2();

});
