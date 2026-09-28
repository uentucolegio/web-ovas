// --- Evaluación Quiz — Tema 2.2: Redireccionamiento, tuberías y filtros básicos ---
const quizData = [
    {
        question: "Quieres guardar el árbol de carpetas de tu proyecto en un archivo llamado estructura.txt, reemplazando su contenido si ya existe. ¿Qué comando debes usar?",
        options: [
            "a) tree ~/proyectos/tienda-online >> estructura.txt, porque agrega el resultado al final del archivo.",
            "b) tree ~/proyectos/tienda-online > estructura.txt, porque el operador > envía la salida estándar a un archivo reemplazando su contenido.",
            "c) tree ~/proyectos/tienda-online < estructura.txt, porque el operador < escribe en el archivo.",
            "d) cat estructura.txt > tree, porque cat crea archivos nuevos."
        ],
        answer: "b) tree ~/proyectos/tienda-online > estructura.txt, porque el operador > envía la salida estándar a un archivo reemplazando su contenido."
    },
    {
        question: "Ejecutas 'date >> despliegues.log' cada vez que publicas una nueva versión de tu aplicación. ¿Por qué se usa >> en lugar de >?",
        options: [
            "a) Porque >> ejecuta el comando con permisos de administrador.",
            "b) Porque >> agrega la salida al final del archivo conservando el contenido existente, mientras que > lo reemplazaría por completo.",
            "c) Porque >> comprime el archivo de registro para ahorrar espacio.",
            "d) Porque >> crea una copia de seguridad automática del archivo."
        ],
        answer: "b) Porque >> agrega la salida al final del archivo conservando el contenido existente, mientras que > lo reemplazaría por completo."
    },
    {
        question: "En el comando 'wc -l < access.log', ¿qué papel cumple el operador &lt;?",
        options: [
            "a) Indica que wc debe leer su información desde el archivo access.log en lugar del teclado.",
            "b) Guarda el resultado de wc dentro de access.log.",
            "c) Conecta la salida de wc con la entrada de access.log.",
            "d) Muestra el contenido de access.log en pantalla."
        ],
        answer: "a) Indica que wc debe leer su información desde el archivo access.log en lugar del teclado."
    },
    {
        question: "¿Qué hace el operador | en 'find ~/proyectos/tienda-online -name \"*\" | grep \".js\"'?",
        options: [
            "a) Ejecuta los dos comandos en paralelo y compara sus resultados.",
            "b) Guarda la salida de find en un archivo temporal llamado grep.",
            "c) Conecta la salida de find con la entrada de grep, de modo que los datos fluyen directamente entre procesos sin archivos intermedios.",
            "d) Repite el comando find hasta que grep encuentre coincidencias."
        ],
        answer: "c) Conecta la salida de find con la entrada de grep, de modo que los datos fluyen directamente entre procesos sin archivos intermedios."
    },
    {
        question: "Un compañero ejecuta 'grep package.json | ls' y la tubería no tiene efecto. ¿Por qué?",
        options: [
            "a) Porque ls no utiliza la entrada estándar, por lo que la tubería no tiene efecto: no se respetó el orden lógico de los comandos.",
            "b) Porque grep necesita siempre la opción -r para funcionar con tuberías.",
            "c) Porque el operador | solo funciona con archivos de registro.",
            "d) Porque package.json es un archivo protegido por el sistema."
        ],
        answer: "a) Porque ls no utiliza la entrada estándar, por lo que la tubería no tiene efecto: no se respetó el orden lógico de los comandos."
    },
    {
        question: "Necesitas observar en tiempo real los errores que se van registrando en /var/log/nginx/error.log mientras pruebas tu aplicación. ¿Qué comando usas?",
        options: [
            "a) head -20 /var/log/nginx/error.log, porque muestra las primeras líneas del archivo.",
            "b) cat /var/log/nginx/error.log, porque muestra todo el contenido del archivo.",
            "c) tail -f /var/log/nginx/error.log, porque muestra las últimas líneas y monitorea los cambios del archivo continuamente.",
            "d) wc -l /var/log/nginx/error.log, porque cuenta los errores en tiempo real."
        ],
        answer: "c) tail -f /var/log/nginx/error.log, porque muestra las últimas líneas y monitorea los cambios del archivo continuamente."
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
            '¡Correcto! > envía la salida estándar a un archivo y reemplaza su contenido si ya existe.',
            '¡Exacto! >> agrega la salida al final del archivo conservando lo que ya contenía.',
            '¡Muy bien! < indica que el comando lee su entrada desde un archivo en lugar del teclado.',
            '¡Perfecto! | conecta la salida de un comando con la entrada del siguiente, sin archivos temporales.',
            '¡Correcto! ls no utiliza la entrada estándar, por eso la tubería no tiene efecto.',
            '¡Excelente! tail -f monitorea en tiempo real los archivos que cambian continuamente.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Para reemplazar el contenido se usa > (>> agregaría al final y < lee desde un archivo).',
            'Incorrecto. >> conserva el contenido existente y añade la nueva línea al final; > lo reemplazaría por completo.',
            'Incorrecto. < redirige la entrada: wc lee desde access.log en lugar del teclado.',
            'Incorrecto. | no guarda ni repite nada: conecta la salida de un comando con la entrada del siguiente.',
            'Incorrecto. El problema es de lógica: ls no lee la entrada estándar, así que la tubería no tiene efecto.',
            'Incorrecto. Para monitorear un archivo que cambia continuamente se usa tail -f archivo.'
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
                feedbackDiv.innerHTML = `<span class='text-green-700 font-semibold'><i class='fa-solid fa-circle-check'></i> ${feedbacks[index]}</span>`;
            } else if (selectedOption) {
                feedbackDiv.innerHTML = `<span class='text-red-700 font-semibold'><i class='fa-solid fa-circle-xmark'></i> ${wrongFeedbacks[index]}</span>`;
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
