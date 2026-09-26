// ============================================================
// activities.js — Tema 3: man, help, documentación técnica, IA
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ACTIVIDAD 1: man mkdir — Simulador terminal
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

    const a1Challenges = [
        {
            instruction: 'Consulta la documentación del comando mkdir para conocer su función y opciones.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>man</code> seguido del nombre del comando.',
            accept: ['man mkdir'],
            output: 'MKDIR(1)                 Manual del usuario de Linux                MKDIR(1)\n\nNAME\n       mkdir - crear directorios\n\nSYNOPSIS\n       mkdir [OPCIÓN]... DIRECTORIO...\n\nDESCRIPTION\n       Crear DIRECTORIO(s) si no existen.\n\n       -p     sin error si el directorio existe; crea los directorios padre\n              intermedios si es necesario.\n\nSEE ALSO\n       rmdir(1)',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Crea una carpeta llamada "practicas" usando el comando mkdir.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: <code>mkdir</code> seguido del nombre de la carpeta.',
            accept: ['mkdir practicas', 'mkdir prácticas'],
            output: '',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Verifica que la carpeta "practicas" fue creada listando el directorio actual.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: el comando para listar archivos es de 2 letras.',
            accept: ['ls', 'ls -l', 'ls -la'],
            output: 'Documentos  Descargas  Escritorio  practicas  proyecto.py',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Ahora crea una estructura de carpetas anidadas de una sola vez: "curso1/unidad2/ejercicios".',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa la opción <code>-p</code> de mkdir que aprendiste en el manual.',
            accept: ['mkdir -p curso1/unidad2/ejercicios'],
            output: '',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Verifica que se creó la carpeta "curso1" en el directorio actual.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: lista los archivos del directorio actual.',
            accept: ['ls', 'ls -l', 'ls -la'],
            output: 'Documentos  Descargas  Escritorio  curso1  practicas  proyecto.py',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Verifica el contenido dentro de "curso1/unidad2" para confirmar que "ejercicios" existe.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>ls</code> seguido de la ruta del directorio a listar.',
            accept: ['ls curso1/unidad2', 'ls curso1/unidad2/'],
            output: 'ejercicios',
            prompt: 'estudiante@linux:~$'
        }
    ];

    let a1Current = 0, a1Completed = 0;

    function initA1() {
        if (!a1Input) return;
        a1Current = 0; a1Completed = 0;
        a1Body.innerHTML = `
            <div class="term-line text-slate-400">Terminal Linux simulada <i class="fa-brands fa-linux text-green-400 ml-1"></i> — Actividad 1: man mkdir</div>
            <div class="term-line text-slate-400">Escribe el comando indicado en el reto.</div>
            <div class="term-line text-slate-400">──────────────────────────────────────────────────</div>
        `;
        a1Input.value = '';
        a1Input.disabled = false;
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
        line.innerHTML = text;
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
            const isCorrect = c.accept.includes(input) ||
                (input.startsWith('ls') && c.accept.some(a => a.startsWith('ls')));
            if (isCorrect) {
                if (c.output) addA1Line(c.output, 'text-white');
                addA1Line('<i class="fa-solid fa-check text-green-400 mr-2"></i> ¡Correcto! Comando ejecutado.', 'text-green-400');
                a1Completed++; a1Current++;
                updateA1Progress();
                showA1Feedback('<i class="fa-solid fa-circle-check mr-2"></i> ¡Bien hecho!', 'bg-green-100 text-green-800 border-2 border-green-300');
                if (a1Completed === a1Challenges.length) {
                    addA1Line('', '');
                    addA1Line('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡COMPLETADO! Aprendiste a usar man mkdir correctamente.', 'text-yellow-400');
                    addA1Line('Recuerda: consultar el manual antes de ejecutar es una buena práctica.', 'text-yellow-300');
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
    // ACTIVIDAD 2: man cd vs help cd
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

    const a2Challenges = [
        {
            instruction: 'Intenta consultar el manual de cd. Observa si la información es útil.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>man</code> seguido de <code>cd</code>.',
            accept: ['man cd'],
            output: 'No manual entry for cd\nSee \'man 7 undocumented\' for help when manual pages are not available.\n\n💡 cd es un comando interno del shell (builtin). El manual del sistema no lo documenta bien.',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Ahora usa la herramienta correcta: consulta la ayuda interna del shell para cd.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa el comando <code>help</code> para comandos internos del shell.',
            accept: ['help cd'],
            output: 'cd: cd [-L|[-P [-e]] [-@]] [dir]\n    Cambia el directorio de trabajo de la shell al DIR.\n\n    Opciones:\n      -L   sigue los enlaces simbólicos lógicamente\n      -P   usa la estructura de directorios física\n\n    Si DIR no se proporciona, va a $HOME.\n    Si DIR es -, va al directorio anterior.\n\n✅ ¡Mucho más útil! help cd explica los builtins del shell correctamente.',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Muestra en qué directorio estás actualmente.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: "print working directory".',
            accept: ['pwd'],
            output: '/home/estudiante',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Sube un nivel en la jerarquía de directorios (ve al directorio padre).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>cd</code> con dos puntos para subir un nivel.',
            accept: ['cd ..', 'cd ../'],
            output: '',
            prompt: 'estudiante@linux:/home$'
        },
        {
            instruction: 'Confirma tu nueva ubicación después de subir de nivel.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: muestra el directorio de trabajo actual.',
            accept: ['pwd'],
            output: '/home',
            prompt: 'estudiante@linux:/home$'
        },
        {
            instruction: 'Regresa al directorio de inicio del usuario (home) con un solo comando.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>cd</code> seguido del símbolo que representa tu home.',
            accept: ['cd ~', 'cd ~/','cd'],
            output: '',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Verifica que estás de nuevo en tu directorio de inicio.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: muestra el directorio de trabajo actual.',
            accept: ['pwd'],
            output: '/home/estudiante',
            prompt: 'estudiante@linux:~$'
        }
    ];

    let a2Current = 0, a2Completed = 0;

    function initA2() {
        if (!a2Input) return;
        a2Current = 0; a2Completed = 0;
        a2Body.innerHTML = `
            <div class="term-line text-slate-400">Terminal Linux simulada <i class="fa-brands fa-linux text-green-400 ml-1"></i> — Actividad 2: man vs help</div>
            <div class="term-line text-slate-400">Escribe el comando indicado en el reto.</div>
            <div class="term-line text-slate-400">──────────────────────────────────────────────────</div>
        `;
        a2Input.value = '';
        a2Input.disabled = false;
        updateA2Challenge();
        updateA2Progress();
        showA2Feedback('', '');
    }

    function updateA2Challenge() {
        if (a2Current >= a2Challenges.length) {
            a2Text.innerHTML = '<i class="fa-solid fa-flag-checkered" style="color:#08AFE6;margin-right:6px;"></i> ¡Completaste la Actividad 2! Ya sabes cuándo usar man y cuándo usar help.';
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
        line.innerHTML = text;
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
                    addA2Line('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡COMPLETADO! Ya dominas man vs help y la navegación con cd.', 'text-yellow-400');
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


    // ==========================================
    // ACTIVIDAD 3: Chat IA simulado + Terminal
    // ==========================================
    const a3ChatBody  = document.getElementById('a3-chat-body');
    const a3TermBody  = document.getElementById('a3-term-body');
    const a3Input     = document.getElementById('a3-input');
    const a3Progress  = document.getElementById('a3-progress');
    const a3Score     = document.getElementById('a3-score');
    const a3Feedback  = document.getElementById('a3-feedback');
    const a3Conclusion= document.getElementById('a3-conclusion');

    // Respuestas simuladas de la IA para cada pregunta
    const iaResponses = {
        1: {
            user: '¿Qué hace chmod -R 777 proyecto?',
            ai: `<strong>IA:</strong> El comando <code>chmod -R 777 proyecto</code> modifica recursivamente los permisos de acceso del directorio <code>proyecto</code> y de todos los archivos y subdirectorios dentro de él, otorgando permisos completos (lectura + escritura + ejecución) a <strong>todos los usuarios</strong> del sistema.<br><br>⚠️ <em>Nota importante: esto elimina toda restricción de acceso, lo que puede ser un riesgo de seguridad serio.</em>`
        },
        2: {
            user: 'Explica cada parte del comando.',
            ai: `<strong>IA:</strong><br>
            • <code>chmod</code> — change mode: comando para cambiar permisos de archivos/directorios.<br>
            • <code>-R</code> — recursivo: aplica el cambio a todo el contenido del directorio.<br>
            • <code>777</code> — permisos en octal: lectura(4)+escritura(2)+ejecución(1)=7 para propietario, grupo y otros.<br>
            • <code>proyecto</code> — el directorio objetivo.<br><br>
            💡 <em>Siempre contrasta esta explicación con <code>man chmod</code>.</em>`
        },
        3: {
            user: '¿Qué riesgos tiene ejecutarlo?',
            ai: `<strong>IA:</strong> Los principales riesgos de <code>chmod -R 777</code> son:<br>
            1. Cualquier usuario del sistema puede <strong>leer, modificar o eliminar</strong> los archivos.<br>
            2. Los scripts o ejecutables quedan expuestos a <strong>modificación maliciosa</strong>.<br>
            3. En servidores web, puede permitir que se suban o ejecuten archivos peligrosos.<br>
            4. Viola el principio de <strong>mínimo privilegio</strong> de seguridad informática.<br><br>
            🛡️ <em>Verifica siempre los permisos realmente necesarios antes de aplicar chmod.</em>`
        },
        4: {
            user: '¿Hay una alternativa más segura?',
            ai: `<strong>IA:</strong> Sí. En lugar de <code>777</code>, considera alternativas más restrictivas:<br>
            • <code>chmod 755 proyecto</code> — el propietario puede todo; el resto solo leer y ejecutar.<br>
            • <code>chmod 644 archivo</code> — para archivos de configuración: propietario lee/escribe, otros solo leen.<br>
            • <code>chmod u+x script.sh</code> — agrega ejecución solo al propietario.<br><br>
            💡 <em>Regla: otorga solo los permisos estrictamente necesarios.</em>`
        },
        5: {
            user: '¿Cómo verifico esto en la documentación?',
            ai: `<strong>IA:</strong> Para verificar esta información con la documentación oficial, ejecuta en tu terminal:<br>
            <code>man chmod</code><br><br>
            Busca las secciones <strong>DESCRIPTION</strong> y <strong>OPTIONS</strong> para entender el modo 777 y la opción <code>-R</code>.<br>
            También puedes consultar: <a href='https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html' style='color:#6752A0;' target='_blank'>documentación GNU chmod</a><br><br>
            ✅ <em>Recuerda: la IA orienta, la documentación oficial confirma.</em>`
        }
    };

    let a3Preguntas = 0;
    let a3TermDone = false;

    function addChatMsg(content, cls) {
        if (!a3ChatBody) return;
        const msg = document.createElement('div');
        msg.className = `a3-chat-msg ${cls}`;
        msg.innerHTML = content;
        a3ChatBody.appendChild(msg);
        a3ChatBody.scrollTop = a3ChatBody.scrollHeight;
    }

    function addA3TermLine(text, cls = '') {
        if (!a3TermBody) return;
        const line = document.createElement('div');
        line.className = `term-line ${cls}`;
        line.innerHTML = text;
        a3TermBody.appendChild(line);
        a3TermBody.scrollTop = a3TermBody.scrollHeight;
    }

    function updateA3Progress() {
        // Max 6 acciones: 5 preguntas IA + 1 verificación con man chmod
        const total = 6;
        const done = Math.min(a3Preguntas + (a3TermDone ? 1 : 0), total);
        const pct = (done / total) * 100;
        if (a3Progress) { a3Progress.style.width = `${pct}%`; a3Progress.textContent = pct > 0 ? `${Math.round(pct)}%` : ''; }
        if (a3Score) a3Score.textContent = `${done}/${total}`;
        if (done >= total && a3Conclusion) {
            a3Conclusion.style.display = 'block';
        }
    }

    function showA3Feedback(msg, cls) {
        if (!a3Feedback) return;
        a3Feedback.innerHTML = msg;
        a3Feedback.className = `mt-4 text-center font-bold text-sm h-10 transition-all flex items-center justify-center rounded-lg ${cls}`;
    }

    // Función global para preguntas del chat
    window.askIA = function(n) {
        const resp = iaResponses[n];
        if (!resp) return;
        // Marcar botón como usado
        const btns = document.querySelectorAll('.a3-pregunta-btn');
        if (btns[n-1]) btns[n-1].classList.add('used');

        addChatMsg(`<i class="fa-solid fa-user mr-2" style="color:#508C46;"></i> <strong>Tú:</strong> ${resp.user}`, 'a3-chat-user');
        setTimeout(() => {
            addChatMsg(resp.ai, 'a3-chat-ai');
            a3Preguntas = Math.min(a3Preguntas + 1, 5);
            updateA3Progress();
            showA3Feedback('<i class="fa-solid fa-robot mr-2"></i> Respuesta recibida. Recuerda verificarla con <code>man chmod</code>.', 'bg-purple-100 text-purple-800 border-2 border-purple-200');
        }, 400);
    };

    window.resetA3 = function() {
        if (a3ChatBody) {
            a3ChatBody.innerHTML = `<div class="a3-chat-msg a3-chat-system">
                <i class="fa-solid fa-robot mr-2"></i>
                Hola, soy tu asistente IA. Selecciona una pregunta para analizar el comando <code>chmod -R 777 proyecto</code>:
            </div>`;
        }
        if (a3TermBody) {
            a3TermBody.innerHTML = `
                <div class="term-line text-slate-400">Terminal de verificación 🔍</div>
                <div class="term-line text-slate-400">Contrasta la respuesta de la IA con la documentación oficial.</div>
                <div class="term-line text-slate-400">────────────────────────────────────────</div>
            `;
        }
        document.querySelectorAll('.a3-pregunta-btn').forEach(b => b.classList.remove('used'));
        a3Preguntas = 0;
        a3TermDone = false;
        if (a3Conclusion) a3Conclusion.style.display = 'none';
        if (a3Input) { a3Input.value = ''; a3Input.disabled = false; }
        updateA3Progress();
        showA3Feedback('', '');
    };

    // Terminal de verificación A3
    if (a3Input) {
        a3Input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const input = a3Input.value.trim();
            if (!input) return;
            addA3TermLine(`estudiante@linux:~$ ${input}`, 'text-green-400');

            if (input === 'man chmod') {
                addA3TermLine('CHMOD(1)              Manual del usuario de Linux              CHMOD(1)', 'text-white');
                addA3TermLine('', '');
                addA3TermLine('NAME', 'text-yellow-400');
                addA3TermLine('       chmod - cambiar bits de modo de acceso a archivos', 'text-white');
                addA3TermLine('', '');
                addA3TermLine('SYNOPSIS', 'text-yellow-400');
                addA3TermLine('       chmod [OPCIÓN]... MODO[,MODO]... ARCHIVO...', 'text-white');
                addA3TermLine('', '');
                addA3TermLine('OPCIONES', 'text-yellow-400');
                addA3TermLine('  -R, --recursive  cambia archivos y directorios recursivamente', 'text-white');
                addA3TermLine('', '');
                addA3TermLine('MODOS NUMÉRICOS (octal):', 'text-yellow-400');
                addA3TermLine('  4 = lectura (r)   2 = escritura (w)   1 = ejecución (x)', 'text-white');
                addA3TermLine('  7 = rwx (todos los permisos) → para propietario, grupo y otros', 'text-white');
                addA3TermLine('', '');
                addA3TermLine('⚠️  chmod -R 777 otorga permisos TOTALES a TODOS los usuarios.', 'text-red-400');
                addA3TermLine('    Usar con extrema precaución — riesgo grave de seguridad.', 'text-red-400');
                addA3TermLine('', '');
                addA3TermLine('<i class="fa-solid fa-circle-check text-green-400 mr-2"></i> ✅ Verificado con la documentación oficial. La explicación de la IA fue correcta.', 'text-green-400');
                if (!a3TermDone) {
                    a3TermDone = true;
                    updateA3Progress();
                    showA3Feedback('<i class="fa-solid fa-check-double mr-2"></i> ¡Verificado! La IA y la documentación coinciden.', 'bg-green-100 text-green-800 border-2 border-green-300');
                }
            } else if (input.startsWith('man ')) {
                const cmd = input.split(' ')[1];
                addA3TermLine(`Manual de ${cmd} disponible. Para verificar chmod, escribe: man chmod`, 'text-slate-400');
            } else {
                addA3TermLine(`bash: ${input}: comando no reconocido en este contexto. Escribe <code>man chmod</code> para verificar.`, 'text-red-400');
                showA3Feedback('<i class="fa-solid fa-triangle-exclamation mr-2"></i> Intenta con <code>man chmod</code>.', 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300');
            }
            a3Input.value = '';
        });
    }

    // Inicializar A3
    if (a3ChatBody) updateA3Progress();

});