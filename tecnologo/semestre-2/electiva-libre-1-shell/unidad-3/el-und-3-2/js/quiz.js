// --- Evaluación Quiz — Condicionales, ciclos y funciones básicas en Bash ---
const quizData = [
    {
        question: "Al inicio de un script aparece la línea #!/bin/bash. ¿Qué función cumple?",
        options: [
            "a) Es un comentario que Bash ignora por completo y no tiene ningún efecto.",
            "b) Otorga permiso de ejecución al archivo automáticamente.",
            "c) Es el shebang: indica que el script debe ejecutarse utilizando el intérprete Bash.",
            "d) Crea una copia de seguridad del script en el directorio /bin."
        ],
        answer: "c) Es el shebang: indica que el script debe ejecutarse utilizando el intérprete Bash.",
        ok: "¡Correcto! El shebang le indica al sistema qué intérprete debe usar para ejecutar el script.",
        bad: "Incorrecto. #!/bin/bash es el shebang: define que el script se ejecuta con Bash (no otorga permisos ni crea copias)."
    },
    {
        question: "Creaste el archivo deploy.sh y al ejecutar ./deploy.sh aparece «Permission denied». ¿Qué solución es la adecuada?",
        options: [
            "a) Asignar permiso de ejecución con chmod +x deploy.sh, o ejecutarlo con bash deploy.sh.",
            "b) Agregar fi al final del archivo.",
            "c) Cambiar la extensión .sh por .txt.",
            "d) Escribir el nombre del script entre comillas dentro del archivo."
        ],
        answer: "a) Asignar permiso de ejecución con chmod +x deploy.sh, o ejecutarlo con bash deploy.sh.",
        ok: "¡Exacto! Con ./ el archivo necesita permiso de ejecución; con bash archivo.sh no es necesario.",
        bad: "Incorrecto. El error se debe a la falta de permiso de ejecución: usa chmod +x o ejecuta con bash deploy.sh."
    },
    {
        question: "Necesitas que tu script muestre un mensaje solo si /var/www/catalogo-api existe y es un directorio. ¿Qué condición utilizas?",
        options: [
            "a) if [ -f /var/www/catalogo-api ]; then, porque -f verifica directorios.",
            "b) if [ -d /var/www/catalogo-api ]; then, porque -d verifica si existe un directorio.",
            "c) if [ -x /var/www/catalogo-api ]; then, porque -x verifica si es un directorio.",
            "d) if [ -r /var/www/catalogo-api ]; then, porque -r crea el directorio si no existe."
        ],
        answer: "b) if [ -d /var/www/catalogo-api ]; then, porque -d verifica si existe un directorio.",
        ok: "¡Muy bien! -d comprueba directorios; -f archivos regulares; -e cualquier ruta.",
        bad: "Incorrecto. Para comprobar un directorio se utiliza -d (-f es para archivos regulares)."
    },
    {
        question: "Quieres imprimir «Proyecto listo» únicamente cuando existan tanto package.json como la carpeta node_modules. ¿Qué estructura es correcta?",
        options: [
            "a) if [ -f package.json ] || [ -d node_modules ]; then, porque || exige ambas condiciones.",
            "b) if [ -f package.json ]; [ -d node_modules ]; then, porque el punto y coma une las condiciones.",
            "c) if [ -f package.json ] elif [ -d node_modules ]; then, porque elif combina pruebas.",
            "d) if [ -f package.json ] && [ -d node_modules ]; then, porque && exige que ambas condiciones sean verdaderas."
        ],
        answer: "d) if [ -f package.json ] && [ -d node_modules ]; then, porque && exige que ambas condiciones sean verdaderas.",
        ok: "¡Perfecto! && requiere que las dos condiciones se cumplan; || basta con que se cumpla una.",
        bad: "Incorrecto. && exige que ambas condiciones sean verdaderas; || solo requiere una de ellas."
    },
    {
        question: "Un compañero escribe if [-f \"$archivo\"]; then y Bash muestra un error. ¿Cuál es la causa?",
        options: [
            "a) Faltan los espacios alrededor de [ y ]: Bash los interpreta como parte de la expresión y necesita separarlos.",
            "b) La opción -f solo funciona con directorios.",
            "c) Las comillas alrededor de la variable están prohibidas dentro de los corchetes.",
            "d) El archivo debe existir antes de escribir el script."
        ],
        answer: "a) Faltan los espacios alrededor de [ y ]: Bash los interpreta como parte de la expresión y necesita separarlos.",
        ok: "¡Correcto! La forma válida es [ -f \"$archivo\" ], con espacios después de [ y antes de ].",
        bad: "Incorrecto. El error es de sintaxis: faltan espacios alrededor de [ y ]."
    },
    {
        question: "La variable procesos=$(pgrep -c node) almacena cuántos procesos Node.js están activos. ¿Qué condición comprueba que hay al menos uno?",
        options: [
            "a) [ \"$procesos\" -eq 0 ], porque -eq significa mayor que.",
            "b) [ \"$procesos\" -lt 0 ], porque -lt significa mayor que.",
            "c) [ \"$procesos\" -gt 0 ], porque -gt significa mayor que.",
            "d) [ \"$procesos\" -ne \"node\" ], porque -ne compara texto."
        ],
        answer: "c) [ \"$procesos\" -gt 0 ], porque -gt significa mayor que.",
        ok: "¡Excelente! -gt (greater than) compara si el valor numérico es mayor que cero.",
        bad: "Incorrecto. Para «mayor que» se usa -gt; -eq es igual, -lt menor que y -ne diferente."
    },
    {
        question: "Tu ciclo while [ \"$contador\" -le 5 ] nunca termina. ¿Cuál es la causa más probable?",
        options: [
            "a) Se usó while en lugar de for, que es el único ciclo que termina.",
            "b) Se olvidó modificar la variable contador dentro del ciclo, por lo que la condición siempre es verdadera.",
            "c) Faltó el shebang #!/bin/bash en la primera línea.",
            "d) El comando sleep impide que el ciclo finalice."
        ],
        answer: "b) Se olvidó modificar la variable contador dentro del ciclo, por lo que la condición siempre es verdadera.",
        ok: "¡Correcto! Hay que actualizar la variable, por ejemplo con contador=$((contador + 1)).",
        bad: "Incorrecto. Si la variable de la condición nunca cambia, el ciclo while se ejecuta indefinidamente."
    },
    {
        question: "¿Cuál es la diferencia entre while y until?",
        options: [
            "a) while repite mientras la condición sea falsa y until mientras sea verdadera.",
            "b) while solo recorre archivos y until solo recorre directorios.",
            "c) while repite mientras la condición sea verdadera; until repite mientras sea falsa y termina cuando se vuelve verdadera.",
            "d) No hay diferencia: son nombres distintos para el mismo ciclo for."
        ],
        answer: "c) while repite mientras la condición sea verdadera; until repite mientras sea falsa y termina cuando se vuelve verdadera.",
        ok: "¡Muy bien! until funciona de forma inversa a while: «repetir hasta que ocurra una condición».",
        bad: "Incorrecto. while continúa mientras la condición es verdadera; until, mientras es falsa."
    },
    {
        question: "Recorres con for los elementos de /var/www/catalogo-api y quieres omitir los directorios, pero seguir con el siguiente elemento. ¿Qué instrucción usas dentro del if [ -d \"$elemento\" ]?",
        options: [
            "a) break, porque termina únicamente la iteración actual.",
            "b) exit, porque omite el elemento y continúa con el siguiente.",
            "c) return 1, porque salta al siguiente elemento del ciclo.",
            "d) continue, porque omite la iteración actual y pasa al siguiente elemento."
        ],
        answer: "d) continue, porque omite la iteración actual y pasa al siguiente elemento.",
        ok: "¡Correcto! continue salta a la siguiente iteración; break termina el ciclo por completo.",
        bad: "Incorrecto. continue omite la iteración actual y sigue con el siguiente elemento; break termina todo el ciclo."
    },
    {
        question: "Declaraste la función verificar_node() { ... } al inicio de tu script, pero al ejecutarlo no se muestra nada. ¿Qué falta?",
        options: [
            "a) Invocar la función escribiendo verificar_node, porque declararla no la ejecuta.",
            "b) Reiniciar el equipo para que Bash reconozca la función.",
            "c) Cambiar el nombre de la función por uno con mayúsculas.",
            "d) Escribir done al final de la función."
        ],
        answer: "a) Invocar la función escribiendo verificar_node, porque declararla no la ejecuta.",
        ok: "¡Exacto! Una función se define una vez y se ejecuta cada vez que se invoca por su nombre.",
        bad: "Incorrecto. Declarar una función no la ejecuta: hay que invocarla por su nombre."
    },
    {
        question: "En la función verificar_proyecto \"/var/www/catalogo-api\", ¿cómo accede la función a esa ruta y qué indica return 1?",
        options: [
            "a) La ruta se lee con $#, y return 1 reinicia la función.",
            "b) La ruta se lee con $@ únicamente, y return 1 elimina el directorio.",
            "c) La ruta se lee con $2, y return 1 indica que el ciclo debe continuar.",
            "d) La ruta se lee con el parámetro posicional $1, y return 1 indica que la función terminó con un resultado diferente de éxito."
        ],
        answer: "d) La ruta se lee con el parámetro posicional $1, y return 1 indica que la función terminó con un resultado diferente de éxito.",
        ok: "¡Perfecto! $1 es el primer parámetro; return 1 señala un resultado distinto de éxito.",
        bad: "Incorrecto. $1 es el primer parámetro; $# cuenta los parámetros y $@ los contiene todos. return 1 indica fallo."
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
