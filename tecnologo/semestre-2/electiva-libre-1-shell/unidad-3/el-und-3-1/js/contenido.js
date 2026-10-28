// ============================================================
// contenido.js — Guía 1: Variables, parámetros y lectura de entrada
// Navegación por temas, paneles interactivos y listas de verificación
// ============================================================

(function () {
    const sections = ['bash', 'variables', 'parametros', 'entrada', 'archivos', 'integrador', 'ia'];
    let current = 0;

    function updateNav() {
        const prev = document.getElementById('g1-prev');
        const next = document.getElementById('g1-next');
        const counter = document.getElementById('g1-counter');
        const dots = document.querySelectorAll('#g1-prog .g1-dot');
        if (prev) prev.style.display = current > 0 ? 'block' : 'none';
        if (next) next.textContent = current < sections.length - 1 ? 'Siguiente →' : '✅ Completado';
        if (counter) counter.textContent = 'Tema ' + (current + 1) + ' de ' + sections.length;
        dots.forEach((d, i) => d.classList.toggle('done', i <= current));
    }

    window.g1Show = function (id, idx) {
        sections.forEach(s => {
            document.getElementById('sec-' + s)?.classList.remove('active');
            document.getElementById('tab-' + s)?.classList.remove('active');
        });
        document.getElementById('sec-' + id)?.classList.add('active');
        document.getElementById('tab-' + id)?.classList.add('active');
        current = idx;
        updateNav();
    };

    window.g1Navigate = function (dir) {
        const next = Math.min(Math.max(current + dir, 0), sections.length - 1);
        window.g1Show(sections[next], next);
        document.getElementById('tab-' + sections[next])
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    // ---------- Datos de los paneles interactivos ----------
    const g1Data = {
        varops: {
            unset: {
                title: '<code>unset</code> — Eliminar una variable',
                desc: 'Elimina una variable para evitar conflictos o usos no deseados.',
                code: 'unset BUILD_DIR',
                tip: 'Después de <code>unset</code>, consultar <code>$BUILD_DIR</code> devuelve un valor vacío (o un error si el script usa <code>set -u</code>).'
            },
            readonly: {
                title: '<code>readonly</code> — Variable de solo lectura',
                desc: 'Declara una variable que <strong>no debe modificarse</strong> durante la ejecución del script, lo que mantiene la integridad de los datos.',
                code: 'readonly APP_NAME="portal-clientes"',
                tip: 'Cualquier intento posterior de reasignar <code>APP_NAME</code> producirá un error.'
            },
            printf: {
                title: '<code>printf</code> — Salida con formato',
                desc: '<code>printf</code> permite controlar mejor el formato de salida que <code>echo</code>, especialmente en scripts destinados a automatización.',
                code: "printf 'Entorno: %s\\n' \"$NODE_ENV\"",
                tip: '<code>%s</code> se reemplaza por el valor de la variable y <code>\\n</code> agrega el salto de línea.'
            }
        },
        params: {
            p0: {
                title: '<code>$0</code> — Nombre del script',
                desc: 'Contiene el nombre o la ruta utilizada para ejecutar el script.',
                code: "printf 'Uso: %s RUTA_PROYECTO\\n' \"$0\"",
                tip: 'Es útil para mostrar mensajes de uso que siempre indican el nombre correcto del script.'
            },
            p12: {
                title: '<code>$1</code>, <code>$2</code> — Primer y segundo argumento',
                desc: 'Representan los valores enviados después del nombre del script, en orden de aparición.',
                code: './revisar-archivo.sh "$HOME/proyectos/portal-clientes" package.json\n# $1 = ruta del proyecto\n# $2 = package.json',
                tip: 'Usa comillas en la llamada para proteger rutas que contengan espacios.'
            },
            pnum: {
                title: '<code>$#</code> — Cantidad de argumentos',
                desc: 'Indica cuántos argumentos recibió el script. Permite validar que no falten datos.',
                code: 'if [ "$#" -ne 2 ]; then\n    exit 1\nfi',
                tip: 'Valida siempre <code>$#</code> antes de suponer que <code>$1</code> existe.'
            },
            pat: {
                title: '<code>$@</code> — Todos los argumentos',
                desc: 'Representa todos los argumentos como elementos separados, respetando cada valor recibido.',
                code: 'for ARCHIVO in "$@"; do\n    printf \'Revisando: %s\\n\' "$ARCHIVO"\ndone',
                tip: 'Escríbelo entre comillas dobles para que los argumentos con espacios no se dividan.'
            },
            pq: {
                title: '<code>$?</code> — Código de salida',
                desc: 'Guarda el código de salida del <strong>último comando ejecutado</strong>. <strong>0</strong> normalmente significa éxito; cualquier otro valor indica un error.',
                code: 'npm run build\necho $?',
                tip: 'Guárdalo en una variable (<code>BUILD_STATUS=$?</code>) si lo necesitas más adelante: cada comando nuevo lo reemplaza.'
            },
            pid: {
                title: '<code>$$</code> — Identificador del proceso',
                desc: 'Contiene el identificador (PID) del proceso actual, es decir, del propio script en ejecución.',
                code: "printf 'PID del script: %s\\n' \"$$\"",
                tip: 'Suele usarse para crear nombres de archivos temporales únicos.'
            }
        },
        readopts: {
            r: {
                title: '<code>-r</code> — Sin interpretar barras invertidas',
                desc: 'Evita que las barras invertidas sean interpretadas como caracteres especiales. Es una práctica recomendable para recibir rutas o texto introducido por el usuario.',
                code: "printf 'Ingrese la ruta del proyecto Node.js: '\nread -r PROJECT_DIR",
                tip: 'Úsalo casi siempre que leas rutas o texto libre.'
            },
            p: {
                title: '<code>-p</code> — Mostrar el mensaje',
                desc: 'Muestra el mensaje de solicitud directamente en la misma instrucción, sin necesidad de <code>printf</code> previo.',
                code: 'read -r -p "Ingrese el nombre de la rama Git: " BRANCH_NAME\nprintf \'Rama seleccionada: %s\\n\' "$BRANCH_NAME"',
                tip: 'Reduce el script a una sola línea de solicitud.'
            },
            t: {
                title: '<code>-t</code> — Tiempo máximo de espera',
                desc: 'Establece un tiempo máximo de espera en segundos. Si el usuario no responde, <code>read</code> finaliza con un código de error.',
                code: 'read -r -t 15 -p "Ingrese el nombre de la rama Git: " BRANCH_NAME',
                tip: 'Si el usuario no responde dentro de quince segundos, la lectura termina con un código distinto de cero.'
            },
            s: {
                title: '<code>-s</code> — Entrada silenciosa',
                desc: 'Impide que el texto aparezca en pantalla. Se usa para ocultar contraseñas o tokens.',
                code: 'read -r -s -p "Token de despliegue: " DEPLOY_TOKEN\nprintf \'\\n\'',
                tip: 'El <code>printf \'\\n\'</code> final agrega el salto de línea que el usuario no pudo ver. Nunca guardes el token en archivos del repositorio.'
            }
        },
        cmds: {
            pwd: {
                title: '<code>pwd</code> — Directorio actual',
                desc: 'Abreviatura de <em>"print working directory"</em>: muestra la ruta absoluta del directorio actual. Es útil para confirmar desde qué ubicación se ejecutará una operación.',
                code: 'cd "$HOME/proyectos/portal-clientes"\npwd',
                tip: 'Confirma siempre tu ubicación antes de ejecutar operaciones que modifiquen archivos.'
            },
            ls: {
                title: '<code>ls</code> — Listar contenido',
                desc: 'Muestra el contenido de un directorio. <code>-l</code> da detalle, <code>-a</code> incluye ocultos y <code>-h</code> usa tamaños legibles.',
                code: 'ls\nls -la\nls -lh "$HOME/proyectos/portal-clientes/dist"',
                tip: 'Un archivo oculto como <code>.env.example</code> solo aparece con <code>-a</code>.'
            },
            cd: {
                title: '<code>cd</code> — Cambiar de directorio',
                desc: 'Cambia el directorio actual. <code>..</code> representa el directorio padre y <code>-</code> regresa al directorio anterior.',
                code: 'cd "$HOME/proyectos/portal-clientes"\ncd dist\ncd ..\ncd -',
                tip: 'Entre comillas si la ruta tiene espacios.'
            },
            mkdir: {
                title: '<code>mkdir</code> — Crear directorios',
                desc: 'Crea directorios. La opción <code>-p</code> evita errores cuando los directorios padres todavía no existen.',
                code: 'mkdir -p "$HOME/proyectos/portal-clientes/scripts"\nmkdir -p "$HOME/proyectos/portal-clientes/logs"',
                tip: 'Con <code>-p</code>, ejecutarlo dos veces no produce error.'
            },
            touch: {
                title: '<code>touch</code> — Crear archivos vacíos',
                desc: 'Crea un archivo vacío si no existe o actualiza su fecha de modificación si ya existe.',
                code: 'touch "$HOME/proyectos/portal-clientes/scripts/verificar-build.sh"',
                tip: 'No debe utilizarse para editar contenido: para escribir texto usa un editor como <code>nano</code> o <code>code</code>, o una redirección controlada.'
            },
            cp: {
                title: '<code>cp</code> — Copiar',
                desc: 'Copia archivos o directorios. La opción <code>-r</code> permite copiar directorios completos.',
                code: 'cp "$HOME/proyectos/portal-clientes/.env.example" \\\n   "$HOME/proyectos/portal-clientes/.env.local"\n\ncp -r "$HOME/proyectos/portal-clientes/dist" \\\n      "$HOME/proyectos/portal-clientes/backup-dist"',
                tip: 'Antes de copiar archivos de configuración, revisa si contienen credenciales. Un <code>.env</code> no debe incorporarse al repositorio sin una revisión previa.'
            },
            mv: {
                title: '<code>mv</code> — Mover o renombrar',
                desc: 'Mueve o renombra archivos, y también sirve para reorganizarlos dentro del proyecto.',
                code: 'mv "$HOME/proyectos/portal-clientes/scripts/verificar-build.sh" \\\n   "$HOME/proyectos/portal-clientes/scripts/comprobar-build.sh"\n\nmv -i archivo-origen archivo-destino',
                tip: 'Si el destino ya existe, puede sobrescribirse. Con <code>-i</code> se solicita confirmación antes de reemplazarlo.'
            },
            rm: {
                title: '<code>rm</code> — Eliminar',
                desc: 'Elimina archivos. <code>-r</code> elimina directorios y su contenido; <code>-f</code> fuerza la eliminación y evita confirmaciones.',
                code: 'rm "$HOME/proyectos/portal-clientes/logs/anterior-build.log"\nrm -r "$HOME/proyectos/portal-clientes/backup-dist"',
                tip: '<strong>Cuidado:</strong> la eliminación no pasa por una papelera de reciclaje. Úsalo con extremo cuidado, especialmente <code>-rf</code>.'
            }
        },
        claves: {
            setu: {
                title: '<code>set -u</code> — Variables no definidas',
                desc: 'Hace que Bash informe el uso de variables no definidas en lugar de tratarlas como vacías.',
                code: 'set -u\necho "$VARIABLE_QUE_NO_EXISTE"   # error: variable sin asignar',
                tip: 'Ayuda a detectar errores de escritura en nombres de variables antes de que causen daños.'
            },
            default: {
                title: '<code>DEFAULT_PROJECT_DIR</code> — Valor por defecto',
                desc: 'Contiene una ruta inicial relacionada con un proyecto web realista. Se muestra entre corchetes en el mensaje y se usa si el usuario pulsa Enter sin escribir nada.',
                code: 'if [ -z "$PROJECT_DIR" ]; then\n    PROJECT_DIR="$DEFAULT_PROJECT_DIR"\nfi',
                tip: '<code>-z</code> comprueba si el texto está vacío.'
            },
            param: {
                title: '<code>${2:-main}</code> — Parámetro opcional',
                desc: 'Utiliza el segundo parámetro si fue proporcionado; en caso contrario, asigna <code>main</code>.',
                code: 'BRANCH_NAME="${2:-main}"',
                tip: 'Así la rama es opcional: <code>./informe-proyecto.sh ruta</code> usa <code>main</code>; <code>./informe-proyecto.sh ruta develop</code> usa <code>develop</code>.'
            },
            gitc: {
                title: '<code>git -C</code> — Git en otra ruta',
                desc: 'Ejecuta Git como si el comando se hubiera ejecutado dentro de la ruta indicada, sin necesidad de cambiar permanentemente el directorio actual.',
                code: 'git -C "$PROJECT_DIR" status --short',
                tip: 'El script no cambia de directorio, por lo que evita efectos secundarios en el resto de las instrucciones.'
            },
            bloque: {
                title: '<code>{ … } &gt; archivo</code> — Bloque redirigido',
                desc: 'El bloque entre llaves agrupa varias salidas para redirigirlas juntas al archivo de informe.',
                code: '{\n    printf \'Proyecto: %s\\n\' "$PROJECT_DIR"\n    git -C "$PROJECT_DIR" status --short\n} > "$REPORT_FILE"',
                tip: 'Con un solo <code>&gt;</code> se escribe todo el bloque; un nuevo <code>&gt;</code> sobrescribe el archivo anterior.'
            }
        }
    };

    function escapeHtml(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function initChips() {
        document.querySelectorAll('.g1-chips').forEach(group => {
            const panel = document.getElementById(group.dataset.panel);
            const data = g1Data[group.dataset.source];
            if (!panel || !data) return;
            group.querySelectorAll('.g1-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    const item = data[chip.dataset.key];
                    if (!item) return;
                    group.querySelectorAll('.g1-chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    panel.innerHTML =
                        `<h5>${item.title}</h5><p style="margin:0 0 8px;">${item.desc}</p>` +
                        `<div class="g1-code">${escapeHtml(item.code)}</div>` +
                        `<p style="margin:0;">💡 ${item.tip}</p>`;
                    panel.classList.add('show');
                });
            });
        });
    }

    function initTables() {
        document.querySelectorAll('.g1-table[data-selectable]').forEach(table => {
            table.querySelectorAll('tbody tr').forEach(row => {
                row.addEventListener('click', () => {
                    table.querySelectorAll('tbody tr').forEach(r => r.classList.remove('selected'));
                    row.classList.add('selected');
                });
            });
        });
    }

    function initChecklists() {
        document.querySelectorAll('.g1-checklist').forEach(list => {
            const boxes = list.querySelectorAll('input[type="checkbox"]');
            const score = list.querySelector('.g1-score');
            if (!score) return;
            boxes.forEach(box => box.addEventListener('change', () => {
                const checked = list.querySelectorAll('input:checked').length;
                const pct = Math.round((checked / boxes.length) * 100);
                let state = 'low';
                let label = list.dataset.low;
                if (pct === 100) { state = 'full'; label = list.dataset.full; }
                else if (pct >= 50) { state = 'mid'; label = list.dataset.mid; }
                score.className = 'g1-score ' + state;
                score.style.display = 'block';
                score.textContent = `${label} — ${checked}/${boxes.length} ${list.dataset.unit}`;
            }));
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initChips();
        initTables();
        initChecklists();
        updateNav();
    });
})();
