// --- Evaluación Quiz — Tema 2.1: Creación, copia, movimiento y eliminación de archivos ---
const quizData = [
    {
        question: "Necesitas crear un archivo vacío llamado .env en la raíz de tu proyecto para configurar variables de entorno. ¿Qué comando debes usar?",
        options: [
            "a) mkdir .env, porque crea cualquier tipo de elemento en el sistema de archivos.",
            "b) touch .env, porque crea un archivo vacío si no existe, o actualiza su fecha de modificación si ya existe.",
            "c) cp .env, porque copia un archivo de plantilla del sistema.",
            "d) mv .env, porque mueve el archivo desde el directorio del sistema."
        ],
        answer: "b) touch .env, porque crea un archivo vacío si no existe, o actualiza su fecha de modificación si ya existe."
    },
    {
        question: "Ejecutas 'mkdir src/controllers' pero la carpeta src/ todavía no existe y obtienes el error 'No such file or directory'. ¿Cómo lo resuelves con un solo comando?",
        options: [
            "a) Usando 'mkdir -r src/controllers', porque -r crea las carpetas intermedias.",
            "b) Creando primero src/ con touch y luego controllers/ con mkdir.",
            "c) Usando 'mkdir -p src/controllers', porque la opción -p crea toda la ruta de carpetas necesaria, incluso si las intermedias no existen.",
            "d) Usando 'mv src controllers', porque mv reorganiza la jerarquía de directorios."
        ],
        answer: "c) Usando 'mkdir -p src/controllers', porque la opción -p crea toda la ruta de carpetas necesaria, incluso si las intermedias no existen."
    },
    {
        question: "Quieres respaldar la carpeta dist/ completa antes de sobrescribirla, pero ejecutas 'cp dist/ dist-backup' y falla con 'omitting directory'. ¿Por qué y cómo se corrige?",
        options: [
            "a) Porque cp no existe para carpetas; se debe usar mv dist/ dist-backup para respaldarla.",
            "b) Porque por defecto cp no copia el contenido de directorios; se corrige con 'cp -r dist/ dist-backup' usando la opción recursiva.",
            "c) Porque la carpeta está protegida por permisos; se debe ejecutar con sudo cp dist/ dist-backup.",
            "d) Porque el nombre dist-backup es inválido; se debe renombrar la copia con touch."
        ],
        answer: "b) Porque por defecto cp no copia el contenido de directorios; se corrige con 'cp -r dist/ dist-backup' usando la opción recursiva."
    },
    {
        question: "En Linux no existe un comando 'rename' independiente. ¿Por qué 'mv README.md README.old.md' renombra un archivo?",
        options: [
            "a) Porque mv detecta automáticamente si el destino es un nombre nuevo o una carpeta, pero internamente son operaciones distintas del sistema.",
            "b) Porque desde el punto de vista del sistema de archivos, mover y renombrar son la misma operación: ambas actualizan la ruta asociada al archivo.",
            "c) Porque mv crea una copia con el nuevo nombre y luego elimina el original automáticamente.",
            "d) Porque README.old.md es un enlace simbólico al archivo original."
        ],
        answer: "b) Porque desde el punto de vista del sistema de archivos, mover y renombrar son la misma operación: ambas actualizan la ruta asociada al archivo."
    },
    {
        question: "Un compañero dice que eliminó la carpeta node_modules con 'rm -rf node_modules' y luego quiso recuperarla desde la papelera de reciclaje. ¿Qué ocurrió?",
        options: [
            "a) La carpeta está en la papelera del sistema y puede restaurarse desde la interfaz gráfica.",
            "b) rm envía los archivos a una carpeta temporal oculta llamada .trash que se vacía cada 30 días.",
            "c) rm elimina de forma permanente: no envía nada a una papelera y la operación no es reversible, salvo que exista un respaldo previo.",
            "d) La carpeta solo se ocultó y reaparecerá al reiniciar el sistema."
        ],
        answer: "c) rm elimina de forma permanente: no envía nada a una papelera y la operación no es reversible, salvo que exista un respaldo previo."
    },
    {
        question: "Según la regla general del curso, ¿qué debes hacer SIEMPRE antes de ejecutar 'rm -rf' sobre una ruta?",
        options: [
            "a) Ejecutarlo primero con sudo para asegurarte de tener los permisos suficientes.",
            "b) Verificar la ruta con ls o pwd inmediatamente antes, para confirmar que vas a eliminar exactamente lo que deseas.",
            "c) Agregar la opción -f dos veces para que el sistema pida doble confirmación.",
            "d) Nada, porque rm -rf siempre pide confirmación antes de borrar cada archivo."
        ],
        answer: "b) Verificar la ruta con ls o pwd inmediatamente antes, para confirmar que vas a eliminar exactamente lo que deseas."
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
            '¡Correcto! touch crea archivos vacíos o actualiza su fecha de modificación si ya existen.',
            '¡Exacto! mkdir -p crea toda la ruta de carpetas intermedias en una sola instrucción.',
            '¡Muy bien! cp necesita la opción -r (recursiva) para copiar directorios completos.',
            '¡Perfecto! Mover y renombrar son la misma operación: actualizar la ruta asociada al archivo.',
            '¡Correcto! rm elimina de forma permanente, sin papelera de reciclaje: la operación es irreversible.',
            '¡Excelente! Verificar la ruta con ls o pwd antes de rm -rf previene errores irreversibles.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. mkdir crea directorios, no archivos. Para crear un archivo vacío se usa touch.',
            'Incorrecto. La opción correcta es -p (parents): mkdir -p src/controllers crea las carpetas intermedias.',
            'Incorrecto. cp sí copia carpetas, pero requiere la opción recursiva: cp -r dist/ dist-backup.',
            'Incorrecto. mv no copia: actualiza la ruta del archivo. Por eso el mismo comando mueve y renombra.',
            'Incorrecto. rm no usa papelera: elimina permanentemente. Por eso node_modules se regenera con npm install.',
            'Incorrecto. rm -rf no pide confirmación (esa es justamente la función de -f). Verifica siempre con ls o pwd.'
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
