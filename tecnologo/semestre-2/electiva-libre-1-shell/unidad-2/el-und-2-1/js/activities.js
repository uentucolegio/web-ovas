// ============================================================
// activities.js — Tema 2.1: Creación, copia, movimiento y
// eliminación de archivos (touch, mkdir, cp, mv, rm)
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
            instruction: 'Crea la carpeta raíz del proyecto, llamada "api-inventario".',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>mkdir</code> seguido del nombre de la carpeta.',
            accept: ['mkdir api-inventario'],
            output: '',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Ubícate dentro de la carpeta del proyecto.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>cd</code> para cambiar de directorio.',
            accept: ['cd api-inventario', 'cd api-inventario/'],
            output: '',
            prompt: 'estudiante@linux:~/api-inventario$'
        },
        {
            instruction: 'Con un solo comando, crea la subcarpeta src y dentro de ella: controllers, routes, models y middlewares.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>mkdir -p</code> con la expansión de llaves <code>{}</code>.',
            accept: ['mkdir -p src/{controllers,routes,models,middlewares}'],
            output: '',
            prompt: 'estudiante@linux:~/api-inventario$'
        },
        {
            instruction: 'Crea los archivos vacíos package.json, .env y el archivo oculto .gitignore en la raíz del proyecto (un solo comando).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: <code>touch</code> acepta varios archivos separados por espacios.',
            accept: ['touch package.json .env .gitignore'],
            output: '',
            prompt: 'estudiante@linux:~/api-inventario$'
        },
        {
            instruction: 'Crea app.js dentro de src/ e inventario.routes.js dentro de src/routes/ (un solo comando).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: indica la ruta completa de cada archivo con <code>touch</code>.',
            accept: ['touch src/app.js src/routes/inventario.routes.js'],
            output: '',
            prompt: 'estudiante@linux:~/api-inventario$'
        },
        {
            instruction: 'Verifica que la estructura completa de carpetas y archivos se haya creado correctamente, de forma recursiva.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#508C46;margin-right:4px;"></i> Pista: usa <code>ls</code> con la opción recursiva <code>-R</code>.',
            accept: ['ls -R', 'ls -r', 'ls'],
            output: '.:\n.env  .gitignore  package.json  src\n\n./src:\napp.js  controllers  middlewares  models  routes\n\n./src/routes:\ninventario.routes.js',
            prompt: 'estudiante@linux:~/api-inventario$'
        }
    ];

    let a1Current = 0, a1Completed = 0;

    function initA1() {
        if (!a1Input) return;
        a1Current = 0; a1Completed = 0;
        a1Body.innerHTML = `
            <div class="term-line text-slate-400">Terminal Linux simulada <i class="fa-brands fa-linux text-green-400 ml-1"></i> — Actividad 1: estructura de proyecto</div>
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
                    addA1Line('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡COMPLETADO! Estructuraste el proyecto api-inventario con mkdir y touch.', 'text-yellow-400');
                    addA1Line('Recuerda: mkdir -p y la expansión de llaves {} ahorran muchos pasos.', 'text-yellow-300');
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
            instruction: 'Crea la estructura de práctica: una carpeta practica-linux y dentro de ella tienda-online/dist (representa el resultado de un build). Un solo comando.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>mkdir -p</code> con la ruta completa anidada.',
            accept: ['mkdir -p practica-linux/tienda-online/dist'],
            output: '',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Ubícate dentro de la carpeta del build (practica-linux/tienda-online/dist).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>cd</code> con la ruta completa.',
            accept: ['cd practica-linux/tienda-online/dist', 'cd practica-linux/tienda-online/dist/'],
            output: '',
            prompt: 'estudiante@linux:~/practica-linux/tienda-online/dist$'
        },
        {
            instruction: 'Crea los tres archivos vacíos del build: index.html, styles.css y app.js (un solo comando).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: <code>touch</code> acepta varios archivos separados por espacios.',
            accept: ['touch index.html styles.css app.js'],
            output: '',
            prompt: 'estudiante@linux:~/practica-linux/tienda-online/dist$'
        },
        {
            instruction: 'Regresa a la carpeta practica-linux.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: sube dos niveles con <code>cd ../..</code> o usa la ruta <code>cd ~/practica-linux</code>.',
            accept: ['cd ../..', 'cd ~/practica-linux'],
            output: '',
            prompt: 'estudiante@linux:~/practica-linux$'
        },
        {
            instruction: 'Crea la carpeta var-www-html (representa el directorio servido por el servidor web).',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>mkdir</code> con el nombre de la carpeta.',
            accept: ['mkdir var-www-html'],
            output: '',
            prompt: 'estudiante@linux:~/practica-linux$'
        },
        {
            instruction: 'Crea una copia completa de var-www-html llamada var-www-html-backup, para respaldar la versión publicada antes de sobrescribirla.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: para copiar una carpeta, <code>cp</code> necesita la opción recursiva <code>-r</code>.',
            accept: ['cp -r var-www-html var-www-html-backup'],
            output: '',
            prompt: 'estudiante@linux:~/practica-linux$'
        },
        {
            instruction: 'Elimina todo el contenido dentro de var-www-html (no la carpeta en sí), ya que quedó respaldado en el paso anterior.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>rm -rf</code> sobre el contenido: <code>var-www-html/*</code>.',
            accept: ['rm -rf var-www-html/*'],
            output: '',
            prompt: 'estudiante@linux:~/practica-linux$'
        },
        {
            instruction: 'Mueve todo el contenido de tienda-online/dist hacia var-www-html.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>mv</code> con <code>tienda-online/dist/*</code> como origen.',
            accept: ['mv tienda-online/dist/* var-www-html/', 'mv tienda-online/dist/* var-www-html'],
            output: '',
            prompt: 'estudiante@linux:~/practica-linux$'
        },
        {
            instruction: 'Verifica que var-www-html contenga ahora los archivos del build.',
            hint: '<i class="fa-solid fa-lightbulb" style="color:#08AFE6;margin-right:4px;"></i> Pista: usa <code>ls</code> seguido del nombre de la carpeta.',
            accept: ['ls var-www-html', 'ls var-www-html/'],
            output: 'app.js  index.html  styles.css',
            prompt: 'estudiante@linux:~/practica-linux$'
        }
    ];

    let a2Current = 0, a2Completed = 0;

    function initA2() {
        if (!a2Input) return;
        a2Current = 0; a2Completed = 0;
        a2Body.innerHTML = `
            <div class="term-line text-slate-400">Terminal Linux simulada <i class="fa-brands fa-linux text-green-400 ml-1"></i> — Actividad 2: despliegue de archivos</div>
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
            a2Text.innerHTML = '<i class="fa-solid fa-flag-checkered" style="color:#08AFE6;margin-right:6px;"></i> ¡Completaste la Actividad 2! Simulaste un despliegue completo con cp, rm y mv.';
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
                    addA2Line('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡COMPLETADO! Despliegue simulado con éxito: respaldo, limpieza y publicación del build.', 'text-yellow-400');
                    addA2Line('Buenas prácticas aplicadas: respaldar antes de sobrescribir y verificar con ls.', 'text-yellow-300');
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
