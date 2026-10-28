// --- Evaluación Quiz — Scripts para respaldos, organización de archivos y diagnóstico ---
const quizData = [
    {
        question: "Al inicio de un script aparece la línea #!/usr/bin/env bash. ¿Por qué se prefiere frente a #!/bin/bash?",
        options: [
            "a) Porque otorga permiso de ejecución al archivo automáticamente.",
            "b) Porque busca bash en el PATH del usuario, por lo que es más portátil que escribir la ruta de forma fija.",
            "c) Porque comprime el script para que ocupe menos espacio.",
            "d) Porque impide que el script reciba argumentos."
        ],
        answer: "b) Porque busca bash en el PATH del usuario, por lo que es más portátil que escribir la ruta de forma fija.",
        ok: "¡Correcto! El shebang con env localiza bash en el PATH, sin depender de una ruta fija.",
        bad: "Incorrecto. #!/usr/bin/env bash busca bash en el PATH del usuario; no da permisos ni comprime el archivo."
    },
    {
        question: "Escribiste scripts/respaldo.sh y al ejecutar ./scripts/respaldo.sh aparece «Permission denied». ¿Cuál es la solución?",
        options: [
            "a) Asignar permiso con chmod +x scripts/respaldo.sh, o ejecutarlo con bash scripts/respaldo.sh.",
            "b) Eliminar la línea del shebang.",
            "c) Cambiar la extensión .sh por .tar.gz.",
            "d) Ejecutar el script desde el directorio /etc."
        ],
        answer: "a) Asignar permiso con chmod +x scripts/respaldo.sh, o ejecutarlo con bash scripts/respaldo.sh.",
        ok: "¡Exacto! Con ./ el archivo necesita permiso de ejecución; con bash archivo.sh no es necesario.",
        bad: "Incorrecto. El error indica que falta el permiso de ejecución: usa chmod +x o ejecuta con bash."
    },
    {
        question: "Un compañero escribió FECHA = $(date +%F) y Bash muestra un error. ¿Cuál es la causa?",
        options: [
            "a) La sustitución de comandos $(...) no existe en Bash.",
            "b) Las variables deben escribirse siempre en minúsculas.",
            "c) El comando date no admite el formato +%F.",
            "d) Al dejar espacios alrededor del signo igual, Bash interpreta FECHA como un comando; debe escribirse FECHA=$(date +%F)."
        ],
        answer: "d) Al dejar espacios alrededor del signo igual, Bash interpreta FECHA como un comando; debe escribirse FECHA=$(date +%F).",
        ok: "¡Perfecto! Una asignación en Bash no admite espacios alrededor del signo igual.",
        bad: "Incorrecto. La asignación se escribe sin espacios (FECHA=$(date +%F)); con espacios, Bash busca un comando llamado FECHA."
    },
    {
        question: "Tras ejecutar ./respaldo.sh ~/proyectos/no-existe el script termina con exit 1. ¿Cómo se consulta ese código de salida y qué significa?",
        options: [
            "a) Con echo $#; significa que se enviaron cero argumentos.",
            "b) Con echo $0; significa que el script terminó correctamente.",
            "c) Con echo $?; un valor distinto de 0 indica que ocurrió un error.",
            "d) Con echo $1; significa que el respaldo se creó una vez."
        ],
        answer: "c) Con echo $?; un valor distinto de 0 indica que ocurrió un error.",
        ok: "¡Muy bien! $? guarda el código de salida del último comando: 0 es éxito y cualquier otro valor es error.",
        bad: "Incorrecto. El código de salida del último comando queda en $?; 0 significa éxito y otro valor, error."
    },
    {
        question: "Un estudiante ejecutó tar -cfz respaldo.tar.gz proyecto/ y obtuvo un archivo llamado «z». ¿Por qué ocurrió?",
        options: [
            "a) Porque -f toma el siguiente texto como nombre del archivo; la f debe ser la última letra del bloque (-czf).",
            "b) Porque la opción -c solo funciona con carpetas vacías.",
            "c) Porque tar no puede comprimir con gzip.",
            "d) Porque faltó la opción --exclude."
        ],
        answer: "a) Porque -f toma el siguiente texto como nombre del archivo; la f debe ser la última letra del bloque (-czf).",
        ok: "¡Correcto! La opción f siempre debe ir al final del bloque: -czf.",
        bad: "Incorrecto. Con -cfz, la opción f toma «z» como nombre del archivo. El orden correcto es -czf."
    },
    {
        question: "En tar -czf respaldo.tar.gz -C /etc nginx, ¿qué efecto tiene la opción -C /etc?",
        options: [
            "a) Comprime el respaldo con el nivel máximo de compresión.",
            "b) Copia el archivo de configuración al directorio /etc.",
            "c) Excluye del respaldo la carpeta /etc.",
            "d) Cambia al directorio /etc antes de operar, de modo que el respaldo guarde rutas relativas (nginx/...) en lugar de /etc/nginx/...."
        ],
        answer: "d) Cambia al directorio /etc antes de operar, de modo que el respaldo guarde rutas relativas (nginx/...) en lugar de /etc/nginx/....",
        ok: "¡Exacto! -C evita guardar rutas absolutas dentro del respaldo.",
        bad: "Incorrecto. -C cambia al directorio indicado antes de operar, lo que permite guardar rutas relativas."
    },
    {
        question: "Vas a ejecutar rsync -a --delete origen/ destino/. ¿Qué precaución debes tomar antes de ejecutarlo de verdad?",
        options: [
            "a) Añadir la opción -z para que no se borre nada.",
            "b) Probarlo primero con --dry-run y revisar la salida, porque --delete elimina del destino lo que ya no existe en el origen.",
            "c) Ejecutarlo siempre con sudo.",
            "d) Quitar la barra final del origen para que sea más seguro."
        ],
        answer: "b) Probarlo primero con --dry-run y revisar la salida, porque --delete elimina del destino lo que ya no existe en el origen.",
        ok: "¡Muy bien! --dry-run simula la operación sin copiar ni borrar nada.",
        bad: "Incorrecto. Con --delete conviene simular primero con --dry-run (-n) y revisar qué se eliminaría."
    },
    {
        question: "¿Qué hace find ~/respaldos -maxdepth 1 -type f -name 'tienda-web_*.tar.gz' -mtime +7 -delete?",
        options: [
            "a) Elimina todas las carpetas de ~/respaldos.",
            "b) Lista los respaldos de los últimos 7 días sin borrarlos.",
            "c) Elimina los archivos de respaldo de tienda-web modificados hace más de 7 días, sin entrar en subcarpetas.",
            "d) Comprime con gzip los respaldos de tienda-web."
        ],
        answer: "c) Elimina los archivos de respaldo de tienda-web modificados hace más de 7 días, sin entrar en subcarpetas.",
        ok: "¡Perfecto! Es la rotación de respaldos: -mtime +7 selecciona los más antiguos y -delete los elimina.",
        bad: "Incorrecto. -mtime +7 selecciona archivos de más de 7 días, -maxdepth 1 evita subcarpetas y -delete los elimina."
    },
    {
        question: "¿Por qué find ~/respaldos -delete -name '*.tar.gz' es peligroso?",
        options: [
            "a) Porque find evalúa las expresiones de izquierda a derecha y -delete borra todo antes de filtrar por nombre; -delete debe ir al final.",
            "b) Porque -name no admite comillas simples.",
            "c) Porque -delete solo funciona con directorios.",
            "d) Porque find no puede recorrer la carpeta ~/respaldos."
        ],
        answer: "a) Porque find evalúa las expresiones de izquierda a derecha y -delete borra todo antes de filtrar por nombre; -delete debe ir al final.",
        ok: "¡Correcto! Primero se prueba con -print y la acción -delete va siempre al final.",
        bad: "Incorrecto. El orden importa: -delete antes de -name borra todo el contenido sin filtrar."
    },
    {
        question: "Con archivo=\"hero-banner.WEBP\", ¿qué producen ${archivo##*.} y ${archivo,,}?",
        options: [
            "a) hero-banner y HERO-BANNER.WEBP.",
            "b) .WEBP y hero.banner.webp.",
            "c) hero-banner.WEBP y WEBP.",
            "d) WEBP (la extensión) y hero-banner.webp (todo en minúsculas)."
        ],
        answer: "d) WEBP (la extensión) y hero-banner.webp (todo en minúsculas).",
        ok: "¡Exacto! ##*. elimina todo hasta el último punto y ,, convierte a minúsculas.",
        bad: "Incorrecto. ${archivo##*.} devuelve la extensión (WEBP) y ${archivo,,} convierte el valor a minúsculas."
    },
    {
        question: "En el script organizar.sh, ¿qué ocurre con un archivo cuya extensión no aparece en ningún patrón del case, como notas.txt?",
        options: [
            "a) Se elimina del origen.",
            "b) Coincide con el caso por defecto *) y se mueve a la carpeta otros/ para revisión manual.",
            "c) El script se detiene con un error.",
            "d) Se mueve a la carpeta img/ por defecto."
        ],
        answer: "b) Coincide con el caso por defecto *) y se mueve a la carpeta otros/ para revisión manual.",
        ok: "¡Muy bien! *) actúa como caso por defecto y recoge las extensiones no previstas.",
        bad: "Incorrecto. El patrón *) es el caso por defecto: las extensiones no previstas terminan en otros/."
    },
    {
        question: "Quieres las cinco IP con más peticiones en access.log. ¿Qué error produce omitir el primer sort en awk '{print $1}' log | sort | uniq -c | sort -rn | head -n 5?",
        options: [
            "a) uniq solo agrupa líneas iguales consecutivas; sin ordenar antes, el conteo sale fragmentado e incorrecto.",
            "b) awk deja de imprimir la primera columna.",
            "c) head muestra las líneas en orden alfabético.",
            "d) No ocurre ningún error: el resultado es idéntico."
        ],
        answer: "a) uniq solo agrupa líneas iguales consecutivas; sin ordenar antes, el conteo sale fragmentado e incorrecto.",
        ok: "¡Correcto! El primer sort junta las IP iguales para que uniq -c las cuente bien.",
        bad: "Incorrecto. uniq solo agrupa líneas iguales consecutivas, por eso el primer sort es indispensable."
    },
    {
        question: "Al revisar la memoria con free -h, ¿qué columna indica realmente cuánta RAM queda disponible para las aplicaciones?",
        options: [
            "a) free, porque muestra la memoria sin usar.",
            "b) shared, porque muestra la memoria compartida.",
            "c) used, porque indica lo que falta por usar.",
            "d) available, porque Linux usa la RAM libre como caché y la libera cuando se necesita."
        ],
        answer: "d) available, porque Linux usa la RAM libre como caché y la libera cuando se necesita.",
        ok: "¡Muy bien! La columna available estima la memoria que realmente puede usarse.",
        bad: "Incorrecto. Se debe observar available, no free: Linux usa la RAM libre como caché y la libera si hace falta."
    },
    {
        question: "¿Cuándo se ejecuta la tarea de cron 0 */6 * * * /home/estudiante/scripts/diagnostico.sh?",
        options: [
            "a) Una vez al día, a las 6:00 a. m.",
            "b) Cada seis minutos.",
            "c) Cada seis horas, en el minuto 0 de la hora (00:00, 06:00, 12:00 y 18:00).",
            "d) Solo los días 6 de cada mes."
        ],
        answer: "c) Cada seis horas, en el minuto 0 de la hora (00:00, 06:00, 12:00 y 18:00).",
        ok: "¡Perfecto! */6 en el campo de la hora significa «cada 6 horas».",
        bad: "Incorrecto. Los campos son minuto, hora, día del mes, mes y día de la semana; */6 en la hora significa cada seis horas."
    },
    {
        question: "Un script funciona en la terminal pero falla en cron y no queda ningún mensaje. ¿Qué medidas corresponden?",
        options: [
            "a) Usar rutas relativas con ~ y quitar el permiso de ejecución.",
            "b) Programarlo cada minuto para que cron lo reintente.",
            "c) Usar rutas absolutas, invocar herramientas con su ruta completa (which node) y guardar la salida con >> archivo.log 2>&1.",
            "d) Escribir el script sin shebang para que cron lo interprete mejor."
        ],
        answer: "c) Usar rutas absolutas, invocar herramientas con su ruta completa (which node) y guardar la salida con >> archivo.log 2>&1.",
        ok: "¡Exacto! cron no carga la configuración de tu terminal: necesita rutas absolutas y un log para registrar errores.",
        bad: "Incorrecto. cron no usa el mismo PATH ni la carpeta personal: usa rutas absolutas y redirige la salida con >> archivo.log 2>&1."
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
