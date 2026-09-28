// --- Evaluación Quiz — Tema 3: man, help, documentación técnica y uso responsable de IA ---
const quizData = [
    {
        question: "Ejecutas 'man ls' en la terminal y aparece una pantalla con secciones como NAME, SYNOPSIS, DESCRIPTION y OPTIONS. ¿Qué herramienta acabas de usar y para qué sirve?",
        options: [
            "a) El comando help, que explica comandos internos del shell como cd o echo.",
            "b) El comando man (manual), que muestra páginas de documentación oficial del sistema sobre comandos, programas y archivos de configuración.",
            "c) El comando info, que solo funciona con conexión a internet para mostrar información actualizada.",
            "d) Un editor de texto integrado en Linux que abre archivos de configuración del sistema."
        ],
        answer: "b) El comando man (manual), que muestra páginas de documentación oficial del sistema sobre comandos, programas y archivos de configuración."
    },
    {
        question: "Un estudiante escribe 'man cd' y obtiene el mensaje: 'No manual entry for cd'. ¿Cuál es la razón y qué debe hacer?",
        options: [
            "a) Hay un error en el sistema operativo y debe reinstalar Linux para solucionar el problema.",
            "b) cd es un comando inventado y no existe en Linux; debe buscar otro comando para cambiar de directorio.",
            "c) cd es un comando interno del shell (builtin), por lo que no tiene página de manual; debe usar 'help cd' para obtener información útil.",
            "d) Debe agregar 'sudo' antes del comando para tener permisos de acceder al manual de cd."
        ],
        answer: "c) cd es un comando interno del shell (builtin), por lo que no tiene página de manual; debe usar 'help cd' para obtener información útil."
    },
    {
        question: "Al abrir 'man mkdir', ¿en qué sección de la página de manual encontrarías la sintaxis exacta de uso del comando y las opciones disponibles?",
        options: [
            "a) En la sección NAME, que contiene el nombre y la descripción breve del comando.",
            "b) En la sección SEE ALSO, que referencia otros comandos y páginas relacionadas.",
            "c) En la sección SYNOPSIS, que muestra la sintaxis de uso, y en OPTIONS, que detalla cada parámetro disponible.",
            "d) En la sección EXAMPLES, que siempre lista todos los casos de uso posibles del comando."
        ],
        answer: "c) En la sección SYNOPSIS, que muestra la sintaxis de uso, y en OPTIONS, que detalla cada parámetro disponible."
    },
    {
        question: "Necesitas consultar documentación técnica para aprender a usar un comando de Linux. ¿Cuál de las siguientes características indica que estás ante una fuente confiable?",
        options: [
            "a) El artículo tiene miles de 'me gusta' en redes sociales y fue compartido muchas veces por usuarios desconocidos.",
            "b) La fuente tiene autoría identificable o respaldo institucional, se actualiza periódicamente e incluye ejemplos verificables con advertencias sobre riesgos.",
            "c) El contenido fue publicado en el año 2010 y nunca ha sido actualizado, lo que garantiza su estabilidad.",
            "d) El artículo fue escrito de forma anónima en un foro público sin revisión editorial de ningún tipo."
        ],
        answer: "b) La fuente tiene autoría identificable o respaldo institucional, se actualiza periódicamente e incluye ejemplos verificables con advertencias sobre riesgos."
    },
    {
        question: "Antes de ejecutar 'chmod -R 777 carpeta_proyecto', ¿qué significa el número 777 y por qué puede ser peligroso?",
        options: [
            "a) 777 es un código de error del sistema y el comando fallará sin hacer ningún cambio.",
            "b) 777 indica que el comando solo afecta 7 archivos dentro del directorio especificado.",
            "c) 777 en octal significa lectura+escritura+ejecución (7) para el propietario, el grupo Y todos los demás usuarios del sistema, lo que elimina toda restricción de acceso y representa un riesgo grave de seguridad.",
            "d) 777 es el número de versión del comando chmod y no tiene relación con los permisos del archivo."
        ],
        answer: "c) 777 en octal significa lectura+escritura+ejecución (7) para el propietario, el grupo Y todos los demás usuarios del sistema, lo que elimina toda restricción de acceso y representa un riesgo grave de seguridad."
    },
    {
        question: "Un estudiante usa una IA para entender un comando complejo y la IA le da una explicación detallada. ¿Cuál es el principio rector correcto para usar la IA en este contexto?",
        options: [
            "a) Si la IA lo explica con detalle y confianza, se puede ejecutar el comando inmediatamente sin verificar nada más.",
            "b) La IA reemplaza completamente a la documentación oficial; no es necesario consultar 'man' ni 'help' si la respuesta fue clara.",
            "c) La IA debe servir para simplificar, traducir y orientar, pero su respuesta siempre debe contrastarse con la documentación oficial (man, help o fuentes institucionales) antes de ejecutar cualquier comando.",
            "d) No se debe usar IA para aprender comandos porque siempre da información incorrecta y peligrosa."
        ],
        answer: "c) La IA debe servir para simplificar, traducir y orientar, pero su respuesta siempre debe contrastarse con la documentación oficial (man, help o fuentes institucionales) antes de ejecutar cualquier comando."
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
            '¡Correcto! man muestra las páginas del manual del sistema: la fuente más confiable sin conexión a internet.',
            '¡Exacto! cd es un builtin del shell; para comandos internos la herramienta correcta es help, no man.',
            '¡Muy bien! SYNOPSIS muestra la sintaxis y OPTIONS detalla cada parámetro del comando.',
            '¡Perfecto! Una documentación confiable tiene autoría identificable, se actualiza y documenta los riesgos.',
            '¡Correcto! 777 en octal da permisos totales a todos los usuarios, eliminando toda restricción de seguridad.',
            '¡Excelente! La IA orienta y simplifica, pero la documentación oficial (man/help) siempre debe ser la fuente de verdad.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. man muestra las páginas del manual del sistema, no help. man ls muestra documentación oficial de Linux.',
            'Incorrecto. cd sí existe, pero es un builtin del shell. Por eso man cd no funciona bien y debes usar help cd.',
            'Incorrecto. SYNOPSIS contiene la sintaxis de uso y OPTIONS los parámetros. NAME solo tiene el nombre breve.',
            'Incorrecto. Los "me gusta" no determinan la confiabilidad. Busca autoría identificable, actualización y ejemplos verificables.',
            'Incorrecto. 777 en notación octal significa permisos totales (rwx) para propietario, grupo y otros usuarios del sistema.',
            'Incorrecto. La IA nunca autoriza automáticamente la ejecución de un comando. Siempre contrasta con la documentación oficial.'
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