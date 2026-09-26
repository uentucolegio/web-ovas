// ============================================================
// activities.js — Tema 2.2: Redireccionamiento, tuberías y
// filtros básicos (>, >>, <, |, cat, less, head, tail, grep,
// sort, wc, uniq, cut)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ACTIVIDAD 1: Estructurar un proyecto web
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
            instruction: 'Crea la carpeta laboratorio-logs-node con las subcarpetas logs, reportes y scripts (un solo comando).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>mkdir -p</code> con la expansión de llaves <code>{}</code>.',
            accept: ['mkdir -p laboratorio-logs-node/{logs,reportes,scripts}'],
            output: '',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Ubícate dentro de la carpeta del laboratorio.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>cd</code> para cambiar de directorio.',
            accept: ['cd laboratorio-logs-node', 'cd laboratorio-logs-node/'],
            output: '',
            prompt: 'estudiante@linux:~/laboratorio-logs-node$'
        },
        {
            instruction: 'Genera el archivo application.log dentro de logs/ con el mensaje "INFO: servidor iniciado en el puerto 3000", redirigiendo la salida de echo.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>echo "mensaje" &gt; archivo</code>.',
            accept: ['echo "INFO: servidor iniciado en el puerto 3000" > logs/application.log'],
            output: '',
            prompt: 'estudiante@linux:~/laboratorio-logs-node$'
        },
        {
            instruction: 'Agrega al final del archivo el mensaje "ERROR: fallo la conexión a la base de datos", conservando el contenido existente.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>&gt;&gt;</code> para agregar al final sin reemplazar.',
            accept: ['echo "ERROR: fallo la conexión a la base de datos" >> logs/application.log'],
            output: '',
            prompt: 'estudiante@linux:~/laboratorio-logs-node$'
        },
        {
            instruction: 'Extrae únicamente las líneas de error del registro y guárdalas en reportes/errores.log.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: combina <code>grep "ERROR"</code> con redireccionamiento <code>&gt;</code>.',
            accept: ['grep "ERROR" logs/application.log > reportes/errores.log'],
            output: '',
            prompt: 'estudiante@linux:~/laboratorio-logs-node$'
        },
        {
            instruction: 'Cuenta cuántos errores fueron registrados usando una tubería de comandos.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: conecta <code>grep "ERROR"</code> con <code>wc -l</code> usando <code>|</code>.',
            accept: ['grep "ERROR" logs/application.log | wc -l'],
            output: '1',
            prompt: 'estudiante@linux:~/laboratorio-logs-node$'
        },
        {
            instruction: 'Verifica el contenido del reporte generado utilizando un visor de texto desde la terminal.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>less</code> o <code>cat</code> sobre el archivo del reporte.',
            accept: ['less reportes/errores.log', 'cat reportes/errores.log'],
            output: 'ERROR: fallo la conexión a la base de datos',
            prompt: 'estudiante@linux:~/laboratorio-logs-node$'
        }
    ];

    let a1Current = 0, a1Completed = 0;

    function initA1() {
        if (!a1Input) return;
        a1Current = 0; a1Completed = 0;
        a1Body.innerHTML = `
            <div class="term-line text-slate-400">Terminal Linux simulada <i class="fa-brands fa-linux text-green-400 ml-1"></i> — Actividad 1: análisis de registros</div>
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
                    addA1Line('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡COMPLETADO! Analizaste los registros con redireccionamiento, tuberías y filtros.', 'text-yellow-400');
                    addA1Line('Recuerda: > reemplaza, >> agrega y | conecta comandos sin archivos temporales.', 'text-yellow-300');
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
    // ACTIVIDAD 2: Simular el despliegue de archivos
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
            instruction: 'Crea la carpeta proyecto-web-practica con las subcarpetas src, public, config, scripts y dist (un solo comando).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>mkdir -p</code> con la expansión de llaves <code>{}</code>.',
            accept: ['mkdir -p proyecto-web-practica/{src,public,config,scripts,dist}'],
            output: '',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Ubícate dentro de la carpeta del proyecto.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>cd</code> para cambiar de directorio.',
            accept: ['cd proyecto-web-practica', 'cd proyecto-web-practica/'],
            output: '',
            prompt: 'estudiante@linux:~/proyecto-web-practica$'
        },
        {
            instruction: 'Crea los archivos representativos del proyecto: package.json, index.html, src/main.js, src/App.jsx, config/nginx.conf y Dockerfile (un solo comando).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: <code>touch</code> acepta varios archivos separados por espacios.',
            accept: ['touch package.json index.html src/main.js src/App.jsx config/nginx.conf Dockerfile'],
            output: '',
            prompt: 'estudiante@linux:~/proyecto-web-practica$'
        },
        {
            instruction: 'Genera un listado completo de todos los archivos del proyecto y almacénalo en inventario.txt.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: combina <code>find . -type f</code> con redireccionamiento <code>&gt;</code>.',
            accept: ['find . -type f > inventario.txt'],
            output: '',
            prompt: 'estudiante@linux:~/proyecto-web-practica$'
        },
        {
            instruction: 'Obtén únicamente los archivos relacionados con JavaScript y guarda el resultado en reporte-js.txt, usando una tubería.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: conecta <code>find . -type f</code> con <code>grep ".js"</code> usando <code>|</code> y redirige con <code>&gt;</code>.',
            accept: ['find . -type f | grep ".js" > reporte-js.txt'],
            output: '',
            prompt: 'estudiante@linux:~/proyecto-web-practica$'
        },
        {
            instruction: 'Cuenta cuántos archivos JavaScript existen en el proyecto utilizando una tubería de comandos.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: agrega <code>| wc -l</code> al final de la tubería anterior.',
            accept: ['find . -type f | grep ".js" | wc -l'],
            output: '2',
            prompt: 'estudiante@linux:~/proyecto-web-practica$'
        },
        {
            instruction: 'Visualiza el contenido del inventario con una herramienta adecuada para archivos de varias líneas.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>less</code> seguido del nombre del archivo.',
            accept: ['less inventario.txt'],
            output: './Dockerfile\n./config/nginx.conf\n./index.html\n./inventario.txt\n./package.json\n./src/App.jsx\n./src/main.js',
            prompt: 'estudiante@linux:~/proyecto-web-practica$'
        },
        {
            instruction: 'Muestra únicamente las primeras 5 líneas del inventario.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>head</code> con la opción <code>-5</code>.',
            accept: ['head -5 inventario.txt'],
            output: './Dockerfile\n./config/nginx.conf\n./index.html\n./inventario.txt\n./package.json',
            prompt: 'estudiante@linux:~/proyecto-web-practica$'
        }
    ];

    let a2Current = 0, a2Completed = 0;

    function initA2() {
        if (!a2Input) return;
        a2Current = 0; a2Completed = 0;
        a2Body.innerHTML = `
            <div class="term-line text-slate-400">Terminal Linux simulada <i class="fa-brands fa-linux text-green-400 ml-1"></i> — Actividad 2: inventario de archivos</div>
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
            a2Text.innerHTML = '<i class="fa-solid fa-flag-checkered" style="color:#08AFE6;margin-right:6px;"></i> ¡Completaste la Actividad 2! Generaste el inventario con redireccionamiento, tuberías y filtros.';
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
                    addA2Line('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡COMPLETADO! Inventario generado con éxito: reportes, filtros y conteo con tuberías.', 'text-yellow-400');
                    addA2Line('Recuerda: combina find, grep y wc con | para responder preguntas sobre tus archivos.', 'text-yellow-300');
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
