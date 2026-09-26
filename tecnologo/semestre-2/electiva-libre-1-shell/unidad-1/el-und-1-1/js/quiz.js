// --- Evaluación Quiz ---
const quizData = [
    {
        question: "Un compañero te dice que 'Linux es solo el sistema operativo completo, como Windows'. ¿Qué le responderías?",
        options: [
            "a) Tiene razón, Linux y GNU/Linux son exactamente lo mismo.",
            "b) Linux corresponde propiamente al núcleo (kernel); para el sistema operativo completo la denominación correcta es GNU/Linux.",
            "c) Linux es solo un navegador web usado en algunos computadores.",
            "d) Linux es una marca comercial de Microsoft para sus servidores."
        ],
        answer: "b) Linux corresponde propiamente al núcleo (kernel); para el sistema operativo completo la denominación correcta es GNU/Linux."
    },
    {
        question: "¿Cuál de las siguientes opciones pertenece al conjunto de herramientas del proyecto GNU y no al Kernel?",
        options: [
            "a) La administración de memoria del sistema.",
            "b) El control directo de los dispositivos de hardware.",
            "c) Programas como Bash, gcc, ls, cp, mv, cat y grep.",
            "d) La comunicación directa con el procesador."
        ],
        answer: "c) Programas como Bash, gcc, ls, cp, mv, cat y grep."
    },
    {
        question: "Estás iniciando un proyecto para administrar un servidor empresarial que requiere alta estabilidad. Según lo visto sobre distribuciones, ¿cuál elegirías?",
        options: [
            "a) Kali Linux, porque está enfocada en seguridad informática ofensiva.",
            "b) Ubuntu, porque está pensada principalmente para educación y escritorio.",
            "c) Rocky Linux, porque está orientada a servidores empresariales.",
            "d) Arch Linux, porque está pensada para usuarios avanzados que arman su propio sistema."
        ],
        answer: "c) Rocky Linux, porque está orientada a servidores empresariales."
    },
    {
        question: "¿Cuál es la función principal del Shell (como Bash) dentro de GNU/Linux?",
        options: [
            "a) Es el programa que traduce los comandos escritos por el usuario para que el Kernel pueda ejecutarlos.",
            "b) Es el encargado de administrar la memoria RAM del computador.",
            "c) Es una distribución completa de Linux orientada a servidores.",
            "d) Es el dispositivo físico que almacena los archivos del sistema."
        ],
        answer: "a) Es el programa que traduce los comandos escritos por el usuario para que el Kernel pueda ejecutarlos."
    },
    {
        question: "En el comando 'ls -l Documentos', ¿qué elemento corresponde al argumento?",
        options: [
            "a) ls, porque es el nombre del comando que se ejecuta.",
            "b) -l, porque modifica el comportamiento del comando mostrando más detalles.",
            "c) Documentos, porque es el elemento sobre el cual actúa el comando.",
            "d) El espacio en blanco entre las palabras del comando."
        ],
        answer: "c) Documentos, porque es el elemento sobre el cual actúa el comando."
    },
    {
        question: "Si estás ubicado en /home/estudiante y quieres llegar a /home/estudiante/Documentos/proyecto usando una ruta relativa, ¿cuál escribirías?",
        options: [
            "a) /home/estudiante/Documentos/proyecto, comenzando siempre desde la raíz.",
            "b) Documentos/proyecto, partiendo desde el directorio actual en el que te encuentras.",
            "c) C:/Documentos/proyecto, como se haría en Windows.",
            "d) ../Documentos/proyecto/raiz, subiendo primero al directorio raíz del sistema."
        ],
        answer: "b) Documentos/proyecto, partiendo desde el directorio actual en el que te encuentras."
    }
];


const quizContainer = document.getElementById('quiz-container');
if(quizContainer) {
    quizData.forEach((q, index) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'mb-6';
        questionEl.innerHTML = `<p class="font-semibold mb-2">${index + 1}. ${q.question}</p>`;
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'space-y-2';
        
        q.options.forEach(option => {
            const optionEl = document.createElement('div');
            // Adding hover behavior manually by toggling bg-slate-50 since the original .quiz-option didn't have special styles clearly defined in JS
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
if(submitQuizBtn){
    submitQuizBtn.addEventListener('click', () => {
        let score = 0;
        const questions = quizContainer.querySelectorAll('.mb-6');
        const feedbacks = [
            '¡Correcto! Linux es el kernel; GNU/Linux es el sistema operativo completo.',
            '¡Así es! Esas herramientas son parte del proyecto GNU, no del Kernel.',
            '¡Excelente elección! Rocky Linux está pensada para servidores empresariales estables.',
            '¡Muy bien! El Shell traduce lo que escribes para que el Kernel lo ejecute.',
            '¡Correcto! "Documentos" es el argumento: el elemento sobre el que actúa el comando.',
            '¡Lo lograste! Una ruta relativa parte del directorio actual, no de la raíz.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. "Linux" es propiamente el kernel; el sistema operativo completo se llama GNU/Linux.',
            'Incorrecto. Esos programas son herramientas GNU; el Kernel se encarga de la memoria, procesos y hardware.',
            'Incorrecto. Revisa el uso principal de cada distribución: cada una tiene un objetivo diferente.',
            'Incorrecto. El Shell no administra la memoria ni almacena archivos, solo interpreta comandos.',
            'Incorrecto. Recuerda la estructura: comando (ls), opción (-l) y argumento (Documentos).',
            'Incorrecto. Una ruta absoluta siempre comienza desde la raíz (/); la relativa parte del directorio actual.'
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