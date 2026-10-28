// --- Evaluación Quiz — Prompting técnico, verificación y registro de comandos generados con IA ---
const quizData = [
    {
        question: "¿Qué componentes debe contener un prompt técnico completo para pedir un comando o script de Bash a una IA?",
        options: [
            "a) Saludo, tema general, ejemplo de otro lenguaje, firma y agradecimiento.",
            "b) Entorno, contexto, objetivo, restricciones y formato de salida.",
            "c) Solo el comando que se desea y el nombre del modelo de IA.",
            "d) Únicamente el mensaje de error y la hora en que ocurrió."
        ],
        answer: "b) Entorno, contexto, objetivo, restricciones y formato de salida.",
        ok: "¡Correcto! Los cinco componentes reducen las suposiciones del modelo y vuelven revisable la respuesta.",
        bad: "Incorrecto. Un prompt técnico incluye entorno, contexto, objetivo, restricciones y formato de salida."
    },
    {
        question: "¿Por qué el prompt «dame un comando para subir mi página al servidor» es un prompt débil?",
        options: [
            "a) Porque es demasiado corto para ser enviado a un modelo de IA.",
            "b) Porque la IA no puede generar comandos para servidores.",
            "c) Porque obliga al modelo a suponer la herramienta, el origen, el destino y el sistema, y la respuesta puede no ajustarse al proyecto real.",
            "d) Porque no incluye un saludo inicial ni la palabra «por favor»."
        ],
        answer: "c) Porque obliga al modelo a suponer la herramienta, el origen, el destino y el sistema, y la respuesta puede no ajustarse al proyecto real.",
        ok: "¡Muy bien! Todo dato omitido se completa con una suposición del modelo.",
        bad: "Incorrecto. El problema no es la longitud: al omitir datos, el modelo debe suponer herramienta, rutas y sistema."
    },
    {
        question: "Vas a pedir ayuda a una IA con un error y tu archivo .env contiene DB_PASSWORD con la clave real. ¿Qué haces antes de enviarlo?",
        options: [
            "a) Reemplazar los datos sensibles por valores ficticios, por ejemplo DB_PASSWORD=<oculto>.",
            "b) Pegar el archivo completo para que la IA tenga todo el contexto.",
            "c) Cambiar solo el nombre del archivo a .env.txt y enviarlo igual.",
            "d) Enviar la clave real pero en un mensaje aparte."
        ],
        answer: "a) Reemplazar los datos sensibles por valores ficticios, por ejemplo DB_PASSWORD=<oculto>.",
        ok: "¡Exacto! Los datos sensibles nunca se envían a un servicio externo: se sustituyen por valores ficticios.",
        bad: "Incorrecto. Contraseñas, llaves SSH y tokens se reemplazan por valores ficticios antes de enviarlos."
    },
    {
        question: "Una IA te propone rm -rf $DIR/*. ¿Cuál es el riesgo y cuál es la alternativa más segura?",
        options: [
            "a) No hay riesgo, porque rm -rf siempre pide confirmación.",
            "b) El riesgo es que el comando sea muy lento; se resuelve usando mv.",
            "c) El riesgo es que se borre solo un archivo; se resuelve quitando la opción -r.",
            "d) Si DIR está vacía o mal escrita se convierte en rm -rf /*; se usa rm -rf \"${DIR:?}\"/*, que aborta si la variable está vacía, o se lista antes con ls."
        ],
        answer: "d) Si DIR está vacía o mal escrita se convierte en rm -rf /*; se usa rm -rf \"${DIR:?}\"/*, que aborta si la variable está vacía, o se lista antes con ls.",
        ok: "¡Perfecto! ${DIR:?} detiene el script si la variable está vacía y evita un borrado desastroso.",
        bad: "Incorrecto. El riesgo es que una variable vacía convierta el comando en rm -rf /*; ${DIR:?} lo previene."
    },
    {
        question: "Un script generado por IA contiene sed -i '' 's/localhost/api/' archivo y lo ejecutas en Ubuntu. ¿Qué ocurre?",
        options: [
            "a) Funciona igual que en cualquier sistema, porque sed es universal.",
            "b) Es sintaxis de macOS (BSD): en GNU/Linux falla o produce resultados inesperados; en Linux se usa sed -i 's/.../.../' archivo.",
            "c) Se crea una copia de seguridad llamada «''» automáticamente.",
            "d) Se activa la simulación y no se modifica el archivo."
        ],
        answer: "b) Es sintaxis de macOS (BSD): en GNU/Linux falla o produce resultados inesperados; en Linux se usa sed -i 's/.../.../' archivo.",
        ok: "¡Correcto! En GNU sed, '' se interpreta como el patrón y el reemplazo como un nombre de archivo.",
        bad: "Incorrecto. -i '' es sintaxis BSD (macOS); en Linux se escribe sed -i 's/.../.../' archivo."
    },
    {
        question: "La IA sugiere rsync --backup-dated y no estás seguro de que exista. ¿Cómo lo compruebas?",
        options: [
            "a) Ejecutándolo directamente sobre los archivos reales para ver qué pasa.",
            "b) Preguntándole a la misma IA si está segura de su respuesta.",
            "c) Consultando la documentación instalada, por ejemplo rsync --help | grep -- '--backup-dated' o man rsync.",
            "d) Buscando el nombre de la opción en el historial de la terminal."
        ],
        answer: "c) Consultando la documentación instalada, por ejemplo rsync --help | grep -- '--backup-dated' o man rsync.",
        ok: "¡Muy bien! La documentación del sistema corresponde exactamente a la versión que vas a ejecutar.",
        bad: "Incorrecto. Las opciones desconocidas se verifican en man o --help, no ejecutándolas ni preguntando de nuevo a la IA."
    },
    {
        question: "Al ejecutar bash -n deploy.sh no se imprime ningún mensaje. ¿Qué significa?",
        options: [
            "a) Que la sintaxis es válida, aunque eso no garantiza que el script haga lo correcto ni que sea seguro.",
            "b) Que el script es seguro y puede ejecutarse sobre producción.",
            "c) Que el script se ejecutó correctamente y terminó sin errores.",
            "d) Que ShellCheck ya revisó el script y no encontró advertencias."
        ],
        answer: "a) Que la sintaxis es válida, aunque eso no garantiza que el script haga lo correcto ni que sea seguro.",
        ok: "¡Exacto! bash -n solo valida la sintaxis sin ejecutar ninguna línea; no detecta riesgos de lógica.",
        bad: "Incorrecto. bash -n solo comprueba la sintaxis; un script con sintaxis válida puede ser igualmente peligroso."
    },
    {
        question: "ShellCheck reporta SC2115 sobre la línea rm -rf $BUILD_DIR/*. ¿Qué advierte?",
        options: [
            "a) Que el archivo no tiene permiso de ejecución.",
            "b) Que falta el shebang en la primera línea del script.",
            "c) Que la variable BUILD_DIR tiene un nombre demasiado largo.",
            "d) Que si BUILD_DIR llegara vacía, la orden se convertiría en rm -rf /*; se corrige con \"${BUILD_DIR:?}\"."
        ],
        answer: "d) Que si BUILD_DIR llegara vacía, la orden se convertiría en rm -rf /*; se corrige con \"${BUILD_DIR:?}\".",
        ok: "¡Correcto! SC2115 advierte justamente del borrado de la raíz cuando la variable queda vacía.",
        bad: "Incorrecto. SC2115 señala que una variable vacía convertiría el comando en rm -rf /*."
    },
    {
        question: "Quieres ver qué cambios haría rsync con --delete sin modificar nada. ¿Qué comando usas?",
        options: [
            "a) rsync -av --delete dist/ /var/www/portafolio/ con sudo, para evitar errores de permisos.",
            "b) rsync -avn --delete dist/ /var/www/portafolio/, donde -n activa el modo de simulación.",
            "c) rsync -av --delete dist/ /var/www/portafolio/ y revisar el resultado después.",
            "d) rm -rf /var/www/portafolio y volver a copiar todo."
        ],
        answer: "b) rsync -avn --delete dist/ /var/www/portafolio/, donde -n activa el modo de simulación.",
        ok: "¡Muy bien! Con -n (dry run) rsync informa lo que haría sin aplicar ningún cambio.",
        bad: "Incorrecto. La simulación de rsync se activa con -n; ejecutarlo sin ella aplica los cambios de inmediato."
    },
    {
        question: "¿Qué hace bash -x deploy.sh (o set -x dentro del script)?",
        options: [
            "a) Ejecuta el script en un contenedor aislado sin tocar el sistema.",
            "b) Revisa la sintaxis del script sin ejecutarlo.",
            "c) Imprime cada orden antes de ejecutarla, precedida de +, con las variables ya reemplazadas por sus valores.",
            "d) Elimina el script después de ejecutarlo."
        ],
        answer: "c) Imprime cada orden antes de ejecutarla, precedida de +, con las variables ya reemplazadas por sus valores.",
        ok: "¡Correcto! La traza permite confirmar que cada ruta es la esperada; se desactiva con set +x.",
        bad: "Incorrecto. bash -x muestra cada orden con las variables ya expandidas; la sintaxis se revisa con bash -n."
    },
    {
        question: "Por defecto, history no muestra la fecha ni la hora de cada orden. ¿Cómo se activan?",
        options: [
            "a) Definiendo la variable HISTTIMEFORMAT, por ejemplo export HISTTIMEFORMAT='%F %T '.",
            "b) Ejecutando history -c antes de cada comando.",
            "c) Escribiendo cada orden con un espacio al inicio.",
            "d) Reiniciando el equipo después de cada sesión."
        ],
        answer: "a) Definiendo la variable HISTTIMEFORMAT, por ejemplo export HISTTIMEFORMAT='%F %T '.",
        ok: "¡Exacto! Para que sea permanente se agrega al final de ~/.bashrc.",
        bad: "Incorrecto. La variable HISTTIMEFORMAT define el formato de fecha y hora que muestra history."
    },
    {
        question: "En el comando bash -x script.sh 2>&1 | tee -a registros/script.log, ¿para qué sirve 2>&1?",
        options: [
            "a) Para ejecutar el script dos veces seguidas.",
            "b) Para ocultar los mensajes de error del script.",
            "c) Para borrar el log anterior antes de escribir el nuevo.",
            "d) Porque la traza se escribe en la salida de errores; 2>&1 la une a la salida estándar para que ambas pasen por la tubería hacia tee."
        ],
        answer: "d) Porque la traza se escribe en la salida de errores; 2>&1 la une a la salida estándar para que ambas pasen por la tubería hacia tee.",
        ok: "¡Perfecto! Así tee -a muestra todo en pantalla y lo agrega al log, trazas incluidas.",
        bad: "Incorrecto. 2>&1 redirige la salida de errores (donde va la traza de bash -x) a la salida estándar."
    },
    {
        question: "Terminaste de verificar un script generado por IA. ¿Qué es lo recomendable para el registro de tu trabajo en el repositorio?",
        options: [
            "a) Versionar todos los logs de ejecución, porque más información siempre es mejor.",
            "b) Versionar juntos el script, el prompt y la bitácora, y agregar registros/ a .gitignore para no exponer rutas, usuarios ni variables de entorno.",
            "c) No guardar ningún registro, porque la IA recuerda lo que hizo.",
            "d) Guardar solo el script y borrar la bitácora para ahorrar espacio."
        ],
        answer: "b) Versionar juntos el script, el prompt y la bitácora, y agregar registros/ a .gitignore para no exponer rutas, usuarios ni variables de entorno.",
        ok: "¡Muy bien! La bitácora resume la evidencia sin exponer datos sensibles y el commit conjunto muestra que código y verificación llegaron a la vez.",
        bad: "Incorrecto. Se versionan script, prompt y bitácora; los logs de ejecución van en .gitignore porque pueden contener datos sensibles."
    }
];

const quizContainer = document.getElementById('quiz-container');
if (quizContainer) {
    quizData.forEach((q, index) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'mb-6';
        questionEl.innerHTML = `<p class="font-semibold mb-2">${index + 1}. ${q.question}</p>`;

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'space-y-2';

        q.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'quiz-option p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors';
            optionEl.textContent = option;

            optionEl.addEventListener('click', () => {
                questionEl.querySelectorAll('.quiz-option').forEach(el => {
                    el.classList.remove('selected', 'bg-green-50', 'border-green-500');
                    el.classList.add('border-slate-200');
                });
                optionEl.classList.add('selected', 'bg-green-50', 'border-green-500');
                optionEl.classList.remove('border-slate-200');
            });
            optionsContainer.appendChild(optionEl);
        });

        questionEl.appendChild(optionsContainer);
        quizContainer.appendChild(questionEl);
    });
}

const submitQuizBtn = document.getElementById('submit-quiz-btn');
if (submitQuizBtn) {
    submitQuizBtn.addEventListener('click', () => {
        let score = 0;
        const questions = quizContainer.querySelectorAll('.mb-6');

        questions.forEach((q, index) => {
            const selectedOption = q.querySelector('.quiz-option.selected');
            let feedbackDiv = q.querySelector('.quiz-feedback');
            if (!feedbackDiv) {
                feedbackDiv = document.createElement('div');
                feedbackDiv.className = 'quiz-feedback mt-2 text-sm';
                q.appendChild(feedbackDiv);
            }
            if (selectedOption && selectedOption.textContent === quizData[index].answer) {
                score++;
                feedbackDiv.innerHTML = `<span class='text-green-700 font-semibold'><i class='fa-solid fa-circle-check'></i> ${quizData[index].ok}</span>`;
            } else if (selectedOption) {
                feedbackDiv.innerHTML = `<span class='text-red-700 font-semibold'><i class='fa-solid fa-circle-xmark'></i> ${quizData[index].bad}</span>`;
            } else {
                feedbackDiv.innerHTML = `<span class='text-orange-500 font-semibold'><i class='fa-solid fa-triangle-exclamation'></i> No respondiste esta pregunta.</span>`;
            }
        });

        const resultEl = document.getElementById('quiz-result');
        resultEl.textContent = `Tu puntuación es: ${score} de ${quizData.length}.`;
        if (score / quizData.length >= 0.7) {
            resultEl.className = 'mt-4 text-lg font-bold text-green-700';
        } else {
            resultEl.className = 'mt-4 text-lg font-bold text-red-700';
        }
    });
}
