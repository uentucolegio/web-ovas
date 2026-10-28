// --- Evaluación Quiz — Guía 1: Variables, parámetros y lectura de entrada en Bash ---
const quizData = [
    {
        question: "Un script comienza con la línea '#!/usr/bin/env bash'. ¿Cuál es su función?",
        options: [
            "a) Es un comentario que Bash ignora por completo y que solo sirve para documentar el archivo.",
            "b) Indica qué intérprete debe utilizarse, buscando el ejecutable de Bash dentro de las rutas configuradas en el sistema.",
            "c) Otorga automáticamente permiso de ejecución al archivo para todos los usuarios.",
            "d) Define la variable PATH con la ruta del proyecto Node.js."
        ],
        answer: "b) Indica qué intérprete debe utilizarse, buscando el ejecutable de Bash dentro de las rutas configuradas en el sistema."
    },
    {
        question: "Escribes 'preparar-entorno.sh' en la terminal y aparece un mensaje indicando que el comando no existe, aunque el archivo está en el directorio actual. ¿Por qué ocurre?",
        options: [
            "a) Porque el archivo no tiene la línea shebang y Bash no puede leerlo.",
            "b) Porque los scripts solo se pueden ejecutar con sudo.",
            "c) Porque el directorio actual normalmente no forma parte de la variable PATH; se debe ejecutar como ./preparar-entorno.sh.",
            "d) Porque el nombre del script no puede contener guiones."
        ],
        answer: "c) Porque el directorio actual normalmente no forma parte de la variable PATH; se debe ejecutar como ./preparar-entorno.sh."
    },
    {
        question: "¿Cuál es la forma correcta de asignar un valor a una variable de Bash y luego consultarlo?",
        options: [
            "a) APP_NAME=\"portal-clientes\" y luego echo \"$APP_NAME\", sin espacios alrededor del signo igual.",
            "b) APP_NAME = \"portal-clientes\" y luego echo \"$APP_NAME\", con espacios para mayor claridad.",
            "c) $APP_NAME=\"portal-clientes\" y luego echo \"APP_NAME\", anteponiendo $ al asignar.",
            "d) set APP_NAME \"portal-clientes\" y luego echo \"@APP_NAME\"."
        ],
        answer: "a) APP_NAME=\"portal-clientes\" y luego echo \"$APP_NAME\", sin espacios alrededor del signo igual."
    },
    {
        question: "Tienes la ruta $HOME/proyectos/portal clientes (con un espacio). ¿Por qué es importante escribir \"$PROJECT_DIR\" entre comillas dobles?",
        options: [
            "a) Porque las comillas dobles convierten la ruta en una variable de entorno.",
            "b) Porque sin comillas Bash no reconoce el símbolo $.",
            "c) Porque las comillas dobles otorgan permisos de lectura sobre la carpeta.",
            "d) Porque sin comillas Bash podría interpretar la ruta como varios argumentos independientes."
        ],
        answer: "d) Porque sin comillas Bash podría interpretar la ruta como varios argumentos independientes."
    },
    {
        question: "Ejecutas: ./revisar-archivo.sh \"$HOME/proyectos/portal-clientes\" package.json. Dentro del script, ¿qué valores tienen $2 y $#?",
        options: [
            "a) $2 es la ruta del proyecto y $# es 1.",
            "b) $2 es el nombre del script y $# es 3.",
            "c) $2 es package.json y $# es 2, la cantidad de argumentos recibidos.",
            "d) $2 es el código de salida del último comando y $# es el PID del script."
        ],
        answer: "c) $2 es package.json y $# es 2, la cantidad de argumentos recibidos."
    },
    {
        question: "Un script contiene: if [ \"$#\" -ne 2 ]; then printf 'Uso: %s RUTA ARCHIVO\\n' \"$0\" >&2; exit 1; fi. ¿Qué hace este bloque?",
        options: [
            "a) Comprueba que se recibieron más de dos argumentos y continúa sin mostrar mensajes.",
            "b) Comprueba que la cantidad de argumentos sea diferente de dos, envía el mensaje al flujo de error estándar y termina el script indicando un error.",
            "c) Cuenta los archivos del directorio y los guarda en la variable $0.",
            "d) Elimina el segundo argumento y finaliza el script con éxito."
        ],
        answer: "b) Comprueba que la cantidad de argumentos sea diferente de dos, envía el mensaje al flujo de error estándar y termina el script indicando un error."
    },
    {
        question: "Después de ejecutar 'npm run build' consultas 'echo $?' y obtienes 0. ¿Qué significa?",
        options: [
            "a) Que el último comando terminó correctamente: un código de salida igual a 0 representa éxito.",
            "b) Que no se ejecutó ningún comando porque la compilación falló.",
            "c) Que el script recibió cero argumentos.",
            "d) Que la variable NODE_ENV está vacía."
        ],
        answer: "a) Que el último comando terminó correctamente: un código de salida igual a 0 representa éxito."
    },
    {
        question: "Necesitas que el script pida un token de despliegue sin que se muestre en pantalla mientras el usuario lo escribe. ¿Qué instrucción es la adecuada?",
        options: [
            "a) echo \"Token de despliegue: \" y guardar la respuesta en un archivo .env versionado.",
            "b) read -t 15 TOKEN, porque el tiempo de espera oculta lo escrito.",
            "c) printf \"$DEPLOY_TOKEN\" para mostrar el valor ya escrito en el script.",
            "d) read -r -s -p \"Token de despliegue: \" DEPLOY_TOKEN, sin guardar nunca el token en archivos del repositorio."
        ],
        answer: "d) read -r -s -p \"Token de despliegue: \" DEPLOY_TOKEN, sin guardar nunca el token en archivos del repositorio."
    },
    {
        question: "Para validar que una ruta recibida corresponde a un proyecto Node.js, ¿qué comprobaciones son las adecuadas?",
        options: [
            "a) [ -d \"$PROJECT_DIR/package.json\" ] para el directorio y [ -f \"$PROJECT_DIR\" ] para el archivo.",
            "b) [ ! -d \"$PROJECT_DIR\" ] para verificar que existe el directorio y [ ! -f \"$PROJECT_DIR/package.json\" ] para verificar que existe package.json, saliendo con exit 1 si alguna falla.",
            "c) [ -z \"$PROJECT_DIR\" ] para el directorio y [ -n \"package.json\" ] para el archivo.",
            "d) ls \"$PROJECT_DIR\" sin comprobar el resultado, porque Bash detiene el script automáticamente si algo falla."
        ],
        answer: "b) [ ! -d \"$PROJECT_DIR\" ] para verificar que existe el directorio y [ ! -f \"$PROJECT_DIR/package.json\" ] para verificar que existe package.json, saliendo con exit 1 si alguna falla."
    },
    {
        question: "En un script aparece BRANCH_NAME=\"${2:-main}\". ¿Qué valor tendrá BRANCH_NAME si el script se ejecuta solo con la ruta del proyecto, sin segundo parámetro?",
        options: [
            "a) Quedará vacía y el script mostrará un error.",
            "b) Tendrá el mismo valor que $1.",
            "c) Tendrá el código de salida del último comando.",
            "d) Tendrá el valor main, porque se usa el segundo parámetro solo si fue proporcionado."
        ],
        answer: "d) Tendrá el valor main, porque se usa el segundo parámetro solo si fue proporcionado."
    },
    {
        question: "Vas a eliminar la carpeta de compilación desde un script. ¿Cuál es la práctica más segura?",
        options: [
            "a) Guardar la ruta en BUILD_DIR, comprobar que no esté vacía y que sea un directorio, y recién entonces ejecutar rm -rf -- \"$BUILD_DIR\".",
            "b) Ejecutar rm -rf $BUILD_DIR/* con sudo para evitar errores de permisos.",
            "c) Ejecutar rm -rf directamente desde cualquier ubicación, porque la papelera permite recuperar los archivos.",
            "d) Cambiar los permisos con chmod 777 y luego eliminar sin revisar la ruta."
        ],
        answer: "a) Guardar la ruta en BUILD_DIR, comprobar que no esté vacía y que sea un directorio, y recién entonces ejecutar rm -rf -- \"$BUILD_DIR\"."
    },
    {
        question: "Una herramienta de IA te entrega un script que incluye 'sudo rm -rf $DIR/*' y un token escrito dentro del archivo. ¿Cómo debes proceder?",
        options: [
            "a) Ejecutarlo directamente, porque la IA ya validó las rutas.",
            "b) Ejecutarlo con sudo para asegurarte de que funcione en cualquier distribución.",
            "c) No ejecutarlo tal cual: revisar rutas, uso de sudo y rm, comillas, validaciones y secretos; probar con bash -n y en una carpeta de práctica con datos no críticos.",
            "d) Subirlo al repositorio para que el equipo lo revise después de ejecutarlo en producción."
        ],
        answer: "c) No ejecutarlo tal cual: revisar rutas, uso de sudo y rm, comillas, validaciones y secretos; probar con bash -n y en una carpeta de práctica con datos no críticos."
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
        const feedbacks = [
            '¡Correcto! El shebang le indica al sistema qué intérprete usar, y env busca Bash en las rutas configuradas.',
            '¡Exacto! Como el directorio actual no suele estar en PATH, el prefijo ./ indica que el archivo se ejecuta desde allí.',
            '¡Muy bien! En Bash la asignación va sin espacios alrededor del igual y la consulta se hace anteponiendo $ al nombre.',
            '¡Perfecto! Las comillas dobles protegen las rutas con espacios para que se procesen como un solo valor.',
            '¡Correcto! $1 es la ruta, $2 es package.json y $# cuenta los dos argumentos recibidos.',
            '¡Excelente! -ne compara que sea diferente de 2, >&2 usa el error estándar y exit 1 señala el fallo.',
            '¡Muy bien! Un código de salida 0 indica éxito; cualquier otro valor señala un error.',
            '¡Perfecto! La opción -s oculta lo que se escribe y -r evita que se interpreten las barras invertidas.',
            '¡Correcto! -d verifica el directorio, -f verifica el archivo regular y exit 1 detiene el script si falla alguna.',
            '¡Exacto! ${2:-main} usa el segundo parámetro si existe y, si no, asigna main.',
            '¡Muy bien! Validar que la variable no esté vacía y sea un directorio evita borrados accidentales; -- evita que el valor se lea como opción.',
            '¡Perfecto! La IA es un apoyo, no una garantía: se revisa cada ruta y comando, y se prueba primero con datos no críticos.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. El shebang no es un comentario ignorado ni da permisos: le indica al sistema qué intérprete utilizar.',
            'Incorrecto. El problema no es el shebang ni el nombre: el directorio actual normalmente no está en PATH, por eso se usa ./',
            'Incorrecto. En Bash no se dejan espacios alrededor del signo igual ni se antepone $ al asignar; $ se usa solo al consultar.',
            'Incorrecto. Sin comillas, una ruta con espacios puede dividirse en varios argumentos independientes.',
            'Incorrecto. $1 es el primer argumento (la ruta), $2 el segundo (package.json) y $# la cantidad total de argumentos.',
            'Incorrecto. La condición se cumple cuando los argumentos son distintos de dos; entonces se informa por el error estándar y se sale con exit 1.',
            'Incorrecto. $? guarda el código de salida del último comando: 0 significa que terminó correctamente.',
            'Incorrecto. Para ocultar la escritura se usa read -s; echo o printf no ocultan nada y el token no debe guardarse en el repositorio.',
            'Incorrecto. -d se usa para directorios y -f para archivos regulares; ambas comprobaciones deben terminar el script con exit 1 si fallan.',
            'Incorrecto. La expresión ${2:-main} asigna main cuando el segundo parámetro no fue proporcionado.',
            'Incorrecto. rm -rf sin validar la variable, con sudo o con permisos 777 es peligroso: no existe papelera de reciclaje.',
            'Incorrecto. Un script de IA nunca debe ejecutarse sin revisar rutas, sudo, rm, comillas, validaciones y secretos.'
        ];

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
                feedbackDiv.innerHTML = `<span class='text-green-700 font-semibold'>✔️ ${feedbacks[index]}</span>`;
            } else if (selectedOption) {
                feedbackDiv.innerHTML = `<span class='text-red-700 font-semibold'>❌ ${wrongFeedbacks[index]}</span>`;
            } else {
                feedbackDiv.innerHTML = `<span class='text-orange-500 font-semibold'>⚠️ No respondiste esta pregunta.</span>`;
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
