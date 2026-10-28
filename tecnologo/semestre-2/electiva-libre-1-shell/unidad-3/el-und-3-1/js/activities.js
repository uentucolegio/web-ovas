// ============================================================
// activities.js — Guía 1: Variables, parámetros y lectura de entrada
// Actividades 1 y 2: terminal simulada | Actividad 3: revisión de un
// script generado por IA
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // Normaliza el comando para aceptar variantes equivalentes (comillas, $HOME y espacios)
    function canon(text) {
        return text
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/"/g, '')
            .replace(/\$HOME/g, '~')
            .replace(/\/+$/, '');
    }

    function hint(text) {
        return `<i class="fa-solid fa-lightbulb" style="margin-right:4px;"></i> Pista: ${text}`;
    }

    // ------------------------------------------------------------
    // Fábrica de actividades con terminal simulada
    // ------------------------------------------------------------
    function createTerminalActivity(cfg) {
        const id = cfg.id;
        const input = document.getElementById(`${id}-input`);
        if (!input) return;

        const body = document.getElementById(`${id}-body`);
        const num = document.getElementById(`${id}-num`);
        const total = document.getElementById(`${id}-total`);
        const text = document.getElementById(`${id}-text`);
        const hintEl = document.getElementById(`${id}-hint`);
        const prompt = document.getElementById(`${id}-prompt`);
        const progress = document.getElementById(`${id}-progress`);
        const score = document.getElementById(`${id}-score`);
        const feedback = document.getElementById(`${id}-feedback`);
        const reset = document.getElementById(`${id}-reset`);
        const challenges = cfg.challenges.map(c => ({ ...c, accept: c.accept.map(canon) }));
        let current = 0;
        let completed = 0;

        function addLine(content, cls = '', asHtml = false) {
            const line = document.createElement('div');
            line.className = `g1-term-line ${cls}`;
            if (asHtml) line.innerHTML = content;
            else line.textContent = content;
            body.appendChild(line);
            body.scrollTop = body.scrollHeight;
        }

        function showFeedback(html, cls) {
            feedback.innerHTML = html;
            feedback.className = `g1-feedback ${cls}`;
        }

        function updateProgress() {
            const pct = (completed / challenges.length) * 100;
            progress.style.width = `${pct}%`;
            progress.textContent = pct > 0 ? `${Math.round(pct)}%` : '';
            score.textContent = `${completed}/${challenges.length}`;
        }

        function updateChallenge() {
            total.textContent = challenges.length;
            if (current >= challenges.length) {
                text.innerHTML = '<i class="fa-solid fa-flag-checkered" style="margin-right:6px;"></i> ' + cfg.doneText;
                hintEl.textContent = '';
                num.textContent = challenges.length;
                input.disabled = true;
                input.placeholder = '¡Actividad completada!';
                return;
            }
            const c = challenges[current];
            num.textContent = current + 1;
            text.textContent = c.instruction;
            hintEl.innerHTML = c.hint;
            prompt.textContent = c.prompt;
        }

        function init() {
            current = 0;
            completed = 0;
            body.innerHTML = '';
            addLine(cfg.title, 'muted');
            addLine('Escribe el comando indicado en el reto y pulsa Enter.', 'muted');
            addLine('──────────────────────────────────────────────────', 'muted');
            input.value = '';
            input.disabled = false;
            input.placeholder = 'Escribe tu comando aquí...';
            updateChallenge();
            updateProgress();
            showFeedback('', '');
        }

        input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const value = input.value.trim();
            if (!value || current >= challenges.length) return;
            const c = challenges[current];
            addLine(`${c.prompt} ${value}`, 'cmd');

            if (c.accept.includes(canon(value))) {
                if (c.output) addLine(c.output, c.outputError ? 'err' : '');
                addLine('✔ ¡Correcto! Comando ejecutado.', 'ok');
                completed++;
                current++;
                updateProgress();
                if (completed === challenges.length) {
                    addLine(cfg.winMessage, 'win');
                    showFeedback(`<i class="fa-solid fa-award" style="margin-right:8px;"></i> ${cfg.winFeedback}`, 'win');
                } else {
                    addLine('──────────────────────────────────────────────────', 'muted');
                    showFeedback('<i class="fa-solid fa-circle-check" style="margin-right:8px;"></i> ¡Bien hecho!', 'ok');
                }
                updateChallenge();
            } else {
                const first = value.split(' ')[0];
                addLine(`bash: ${first}: comando no reconocido o incorrecto para este reto.`, 'err');
                showFeedback('<i class="fa-solid fa-circle-xmark" style="margin-right:8px;"></i> Mmm, revisa la pista e inténtalo de nuevo.', 'err');
            }
            input.value = '';
        });

        if (reset) reset.addEventListener('click', init);
        init();
    }

    const P0 = 'estudiante@linux:~$';
    const P1 = 'estudiante@linux:~/proyectos/mi-tienda$';

    // ==========================================
    // ACTIVIDAD 1: Estructura de proyecto y primer script
    // ==========================================
    createTerminalActivity({
        id: 'a1',
        title: 'Terminal Linux simulada — Actividad 1: estructura de proyecto y primer script',
        doneText: '¡Has completado todos los retos de la Actividad 1!',
        winMessage: '🏆 ¡COMPLETADO! Creaste la estructura de mi-tienda y tu primer script con variables. Recuerda: ejecútalo con ./ y revisa la sintaxis con bash -n.',
        winFeedback: '¡ACTIVIDAD 1 COMPLETADA!',
        challenges: [
            {
                instruction: 'Crea la carpeta ~/proyectos/mi-tienda y, dentro de ella, las subcarpetas scripts, logs y dist con un solo comando.',
                hint: hint('usa <code>mkdir -p</code> con la expansión de llaves <code>{}</code>.'),
                accept: [
                    'mkdir -p ~/proyectos/mi-tienda/{scripts,logs,dist}',
                    'mkdir -p ~/proyectos/mi-tienda/{dist,logs,scripts}',
                    'mkdir -p ~/proyectos/mi-tienda/scripts ~/proyectos/mi-tienda/logs ~/proyectos/mi-tienda/dist'
                ],
                output: '',
                prompt: P0
            },
            {
                instruction: 'Entra al directorio del proyecto.',
                hint: hint('usa <code>cd</code> seguido de la ruta <code>~/proyectos/mi-tienda</code>.'),
                accept: ['cd ~/proyectos/mi-tienda'],
                output: '',
                prompt: P0
            },
            {
                instruction: 'Crea en un solo comando los archivos vacíos package.json y .env.example en la raíz del proyecto.',
                hint: hint('<code>touch</code> acepta varios nombres separados por espacios.'),
                accept: ['touch package.json .env.example', 'touch .env.example package.json'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Confirma en qué ruta absoluta estás trabajando.',
                hint: hint('<code>pwd</code> significa "print working directory".'),
                accept: ['pwd'],
                output: '/home/estudiante/proyectos/mi-tienda',
                prompt: P1
            },
            {
                instruction: 'Lista el contenido con detalle e incluyendo los archivos ocultos. Observa la diferencia con un ls sencillo.',
                hint: hint('combina las opciones <code>-l</code> (detalle) y <code>-a</code> (ocultos).'),
                accept: ['ls -la', 'ls -al', 'ls -l -a', 'ls -a -l'],
                output: 'total 20\ndrwxr-xr-x 5 estudiante estudiante 4096 oct 21 09:30 .\ndrwxr-xr-x 3 estudiante estudiante 4096 oct 21 09:30 ..\n-rw-r--r-- 1 estudiante estudiante    0 oct 21 09:31 .env.example\ndrwxr-xr-x 2 estudiante estudiante 4096 oct 21 09:30 dist\ndrwxr-xr-x 2 estudiante estudiante 4096 oct 21 09:30 logs\n-rw-r--r-- 1 estudiante estudiante    0 oct 21 09:31 package.json\ndrwxr-xr-x 2 estudiante estudiante 4096 oct 21 09:30 scripts',
                prompt: P1
            },
            {
                instruction: 'Copia .env.example como .env.local.',
                hint: hint('<code>cp</code> origen destino.'),
                accept: ['cp .env.example .env.local'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Crea el archivo vacío logs/build.log.',
                hint: hint('usa <code>touch</code> con la ruta relativa <code>logs/build.log</code>.'),
                accept: ['touch logs/build.log'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Renombra logs/build.log como logs/anterior-build.log.',
                hint: hint('<code>mv</code> también sirve para renombrar archivos.'),
                accept: ['mv logs/build.log logs/anterior-build.log'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Crea el archivo scripts/info-proyecto.sh (su contenido se escribe luego con un editor).',
                hint: hint('<code>touch</code> con la ruta <code>scripts/info-proyecto.sh</code>.'),
                accept: ['touch scripts/info-proyecto.sh'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Asigna permiso de ejecución al script, sin otorgar permisos excesivos.',
                hint: hint('evita <code>chmod 777</code>; basta con <code>chmod +x</code>.'),
                accept: ['chmod +x scripts/info-proyecto.sh', 'chmod u+x scripts/info-proyecto.sh'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Ejecuta el script desde la raíz del proyecto, usando el prefijo que indica "directorio actual".',
                hint: hint('el prefijo es <code>./</code> y la ruta es <code>scripts/info-proyecto.sh</code>.'),
                accept: ['./scripts/info-proyecto.sh'],
                output: 'Aplicación: mi-tienda\nProyecto: /home/estudiante/proyectos/mi-tienda\nCompilación: /home/estudiante/proyectos/mi-tienda/dist',
                prompt: P1
            },
            {
                instruction: 'Verifica la sintaxis del script sin ejecutar sus instrucciones.',
                hint: hint('<code>bash</code> con la opción <code>-n</code>.'),
                accept: ['bash -n scripts/info-proyecto.sh'],
                output: '',
                prompt: P1
            }
        ]
    });

    // ==========================================
    // ACTIVIDAD 2: Parámetros, read y validación
    // ==========================================
    createTerminalActivity({
        id: 'a2',
        title: 'Terminal Linux simulada — Actividad 2: parámetros, entrada y validación',
        doneText: '¡Has completado todos los retos de la Actividad 2!',
        winMessage: '🏆 ¡COMPLETADO! Probaste validar-proyecto.sh con parámetros y códigos de salida. Recuerda: 0 es éxito y cualquier otro valor indica error.',
        winFeedback: '¡ACTIVIDAD 2 COMPLETADA!',
        challenges: [
            {
                instruction: 'Crea el archivo scripts/validar-proyecto.sh.',
                hint: hint('usa <code>touch</code> con la ruta <code>scripts/validar-proyecto.sh</code>.'),
                accept: ['touch scripts/validar-proyecto.sh'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Dale permiso de ejecución al script.',
                hint: hint('<code>chmod +x</code> seguido de la ruta del script.'),
                accept: ['chmod +x scripts/validar-proyecto.sh', 'chmod u+x scripts/validar-proyecto.sh'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Verifica la sintaxis del script antes de ejecutarlo.',
                hint: hint('<code>bash -n</code> analiza sin ejecutar.'),
                accept: ['bash -n scripts/validar-proyecto.sh'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Prueba 1: ejecuta el script enviando como parámetro la ruta ~/proyectos/mi-tienda (debe ser válida).',
                hint: hint('la ruta se recibe como <code>$1</code> dentro del script.'),
                accept: ['./scripts/validar-proyecto.sh ~/proyectos/mi-tienda', './scripts/validar-proyecto.sh .'],
                output: 'Proyecto válido',
                prompt: P1
            },
            {
                instruction: 'Consulta el código de salida de la última ejecución.',
                hint: hint('el parámetro especial que guarda el código de salida es <code>$?</code>.'),
                accept: ['echo $?'],
                output: '0',
                prompt: P1
            },
            {
                instruction: 'Prueba 2: ejecuta el script con la ruta ~/proyectos/no-existe (directorio inexistente).',
                hint: hint('el mensaje de error sale por <code>&gt;&amp;2</code> y el script termina con <code>exit 1</code>.'),
                accept: ['./scripts/validar-proyecto.sh ~/proyectos/no-existe'],
                output: 'La ruta no corresponde a un directorio existente.',
                outputError: true,
                prompt: P1
            },
            {
                instruction: 'Consulta de nuevo el código de salida y observa que ahora es distinto de cero.',
                hint: hint('repite el mismo comando que usaste para ver el estado.'),
                accept: ['echo $?'],
                output: '1',
                prompt: P1
            },
            {
                instruction: 'Declara la variable APP_NAME con el valor mi-tienda como variable de solo lectura.',
                hint: hint('<code>readonly NOMBRE="valor"</code>.'),
                accept: ['readonly APP_NAME="mi-tienda"', 'readonly APP_NAME=mi-tienda'],
                output: '',
                prompt: P1
            },
            {
                instruction: 'Exporta la variable NODE_ENV con el valor production para que la reciban los procesos hijos (por ejemplo, npm).',
                hint: hint('<code>export VARIABLE=valor</code>, sin espacios alrededor del signo igual.'),
                accept: ['export NODE_ENV=production'],
                output: '',
                prompt: P1
            },
            {
                instruction: "Muestra el entorno con printf usando el formato 'Entorno: %s' seguido de un salto de línea y el valor de NODE_ENV entre comillas dobles.",
                hint: hint('<code>printf \'Entorno: %s\\n\' "$NODE_ENV"</code>.'),
                accept: [`printf 'Entorno: %s\\n' "$NODE_ENV"`],
                output: 'Entorno: production',
                prompt: P1
            }
        ]
    });

    // ==========================================
    // ACTIVIDAD 3: Revisión crítica de un script de IA
    // ==========================================
    const reviewEl = document.getElementById('ia-review');
    if (reviewEl) {
        const aiScript = [
            { code: '#!/usr/bin/env bash', risk: false, why: 'Correcto: el shebang indica el intérprete esperado.' },
            { code: 'set -u', risk: false, why: 'Correcto: Bash informa el uso de variables no definidas.' },
            { code: 'DIR=$1', risk: true, why: 'Riesgo: no valida que exista el argumento ni usa comillas; con una ruta con espacios fallaría.' },
            { code: 'DEPLOY_TOKEN="ghp_1234567890abcdef"', risk: true, why: 'Riesgo: un token escrito en el script termina en el repositorio. Debe leerse con read -s o una variable de entorno.' },
            { code: 'sudo rm -rf $DIR/dist/*', risk: true, why: 'Riesgo: combina sudo y rm -rf con una variable sin comillas ni validación; si DIR queda vacío puede borrar rutas inesperadas.' },
            { code: 'mkdir -p "$DIR/logs"', risk: false, why: 'Correcto: usa comillas y -p, por lo que no falla si el directorio ya existe.' },
            { code: 'npm run build', risk: false, why: 'Correcto por sí sola, siempre que el script compruebe su código de salida a continuación.' },
            { code: 'printf \'Compilación exitosa\\n\'', risk: true, why: 'Riesgo: anuncia éxito sin consultar $? tras npm run build; ignora el código de salida.' },
            { code: 'echo "Token usado: $DEPLOY_TOKEN"', risk: true, why: 'Riesgo: muestra el token en pantalla y en los registros de la terminal.' }
        ];

        const verifyBtn = document.getElementById('ia-verify');
        const resetBtn = document.getElementById('ia-reset');
        const feedbackEl = document.getElementById('ia-feedback');

        function renderReview() {
            reviewEl.innerHTML = '';
            aiScript.forEach((line, i) => {
                const row = document.createElement('label');
                row.className = 'g1-line';
                row.innerHTML = '<input type="checkbox"><span class="n"></span><span class="code"></span>';
                row.querySelector('.n').textContent = i + 1;
                row.querySelector('.code').textContent = line.code;
                reviewEl.appendChild(row);
            });
            feedbackEl.className = 'g1-feedback';
            feedbackEl.textContent = '';
        }

        verifyBtn.addEventListener('click', () => {
            const rows = reviewEl.querySelectorAll('.g1-line');
            let correct = 0;
            const risks = aiScript.filter(l => l.risk).length;
            rows.forEach((row, i) => {
                const line = aiScript[i];
                const checked = row.querySelector('input').checked;
                row.classList.remove('hit', 'miss', 'fp', 'safe');
                row.querySelector('.why')?.remove();
                if (line.risk && checked) { row.classList.add('hit'); correct++; }
                else if (line.risk) row.classList.add('miss');
                else if (checked) row.classList.add('fp');
                else row.classList.add('safe');
                const why = document.createElement('span');
                why.className = 'why';
                why.textContent = line.why;
                row.querySelector('.code').appendChild(why);
            });
            const falsePositives = reviewEl.querySelectorAll('.g1-line.fp').length;
            const perfect = correct === risks && falsePositives === 0;
            feedbackEl.className = `g1-feedback ${perfect ? 'win' : 'err'}`;
            feedbackEl.textContent = perfect
                ? `¡Excelente revisión! Detectaste los ${risks} riesgos sin marcar líneas seguras.`
                : `Detectaste ${correct} de ${risks} riesgos y marcaste ${falsePositives} línea(s) segura(s). Revisa las explicaciones.`;
        });

        resetBtn.addEventListener('click', renderReview);
        renderReview();
    }
});
