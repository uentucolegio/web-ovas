// --- Evaluación Quiz: Guía de Estilos ---
const quizData = [
    {
        question: "¿Qué es un “punto de quiebre” en diseño responsive?",
        options: [
            "A. Un error visual en la interfaz.",
            "B. Un ancho de pantalla donde el diseño debe cambiar.",
            "C. Una animación en CSS al cargar la página.",
            "D. Un componente fijo que siempre aparece en escritorio."
        ],
        answer: "B",
        feedback: {
            correct: "Exacto, un breakpoint es un ancho específico (en píxeles) donde el layout se ajusta para seguir siendo usable.",
            incorrect: "Incorrecto. Un breakpoint no es un error, ni una animación, ni un componente; es un umbral planificado (ancho específico) para cambiar de estructura."
        }
    },
    {
        question: "Según el texto, ¿qué rango corresponde comúnmente a la vista Tablet?",
        options: [
            "A. 320–767px",
            "B. 768–1023px",
            "C. 1024px+",
            "D. 0–319px"
        ],
        answer: "B",
        feedback: {
            correct: "Bien: la tablet es el rango intermedio antes del escritorio.",
            incorrect: "Incorrecto. El rango 768–1023px corresponde a tablet. Los valores menores son para móvil y mayores a 1024px para escritorio."
        }
    },
    {
        question: "¿Qué error frecuente se menciona al diseñar para breakpoints?",
        options: [
            "A. Hacer usando solo componentes nativos.",
            "B. Diseñar para el modelo exacto de un celular y no para rangos.",
            "C. Usar demasiados colores en la interfaz.",
            "D. No tener un menú hamburguesa en móvil."
        ],
        answer: "B",
        feedback: {
            correct: "Correcto, el error es fijarse en 390px (un iPhone) y no pensar en 320–767.",
            incorrect: "Incorrecto. El error más común señalado es enfocarse en el tamaño exacto de un solo dispositivo en lugar de diseñar pensando en rangos flexibles de pantalla."
        }
    },
    {
        question: "¿Qué adapta la UI al pasar de un celular a un escritorio según el ejemplo de YouTube?",
        options: [
            "A. Cambiar valores de tipografía sin reorganizar.",
            "B. Usar la misma columna vertical siempre.",
            "C. Ajustar la estructura a más columnas y aprovechar el ancho.",
            "D. Reducir el contenido para que todo quepa."
        ],
        answer: "C",
        feedback: {
            correct: "Exacto, en escritorio se expande a 4–5 columnas, no se encoge.",
            incorrect: "Incorrecto. Al pasar a escritorio, la interfaz no solo cambia texto ni se reduce, sino que se reorganiza en más columnas para aprovechar el aumento de espacio horizontal."
        }
    },
    {
        question: "En móvil, ¿qué patrón de navegación es “estándar de oro” y por qué?",
        options: [
            "A. Sidebar, porque ocupa poco espacio.",
            "B. Bottom Nav Bar, porque está al alcance del pulgar.",
            "C. Hamburger menu, porque siempre es visible.",
            "D. Menú contextual con hover."
        ],
        answer: "B",
        feedback: {
            correct: "¡Sí! En celular lo ideal es barra inferior accesible con el pulgar.",
            incorrect: "Incorrecto. La barra inferior es la ideal en dispositivos móviles debido a la comodidad que ofrece al alcance natural del pulgar."
        }
    },
    {
        question: "¿Qué recomendación da el texto para acciones vitales de negocio?",
        options: [
            "A. Ocultarlas en menú hamburguesa.",
            "B. Hacerlas secundarias al final del contenido.",
            "C. Dejarlas siempre visibles, no en desplegable.",
            "D. Cambiar de lugar según dispositivo."
        ],
        answer: "C",
        feedback: {
            correct: "Correcto, un carrito o acción clave debe verse sin pasos extra.",
            incorrect: "Incorrecto. Las acciones clave (vitales para el negocio) siempre deben estar a simple vista en cualquier dispositivo sin requerir pasos extra como abrir un menú."
        }
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
            optionEl.className = 'quiz-option p-3 border-2 border-slate-200 rounded-lg cursor-pointer';
            optionEl.textContent = option;
            optionEl.addEventListener('click', () => {
                questionEl.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected', 'border-blue-500', 'bg-blue-50'));
                optionEl.classList.add('selected', 'border-blue-500', 'bg-blue-50');
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
                feedbackDiv.className = 'quiz-feedback mt-2 text-sm p-3 rounded-lg';
                q.appendChild(feedbackDiv);
            }

            if (selectedOption) {
                const selectedLetter = selectedOption.textContent.charAt(0);
                if (selectedLetter === quizData[index].answer) {
                    score++;
                    feedbackDiv.className = 'quiz-feedback mt-2 text-sm p-3 rounded-lg bg-green-50 border border-green-200';
                    feedbackDiv.innerHTML = `<span class='text-green-700 font-semibold'>✔️ ¡Correcto! ${quizData[index].feedback.correct}</span>`;
                } else {
                    feedbackDiv.className = 'quiz-feedback mt-2 text-sm p-3 rounded-lg bg-red-50 border border-red-200';
                    feedbackDiv.innerHTML = `<span class='text-red-700 font-semibold'>❌ ${quizData[index].feedback.incorrect}</span>`;
                }
            } else {
                feedbackDiv.className = 'quiz-feedback mt-2 text-sm p-3 rounded-lg bg-yellow-50 border border-yellow-200';
                feedbackDiv.innerHTML = `<span class='text-yellow-700 font-semibold'>⚠️ Por favor selecciona una respuesta.</span>`;
            }
        });

        const resultEl = document.getElementById('quiz-result');
        resultEl.textContent = `Tu puntuación es: ${score} de ${quizData.length}.`;
        if (score / quizData.length >= 0.7) {
            resultEl.className = 'mt-4 text-lg font-bold text-green-700 p-4 bg-green-50 rounded-xl border border-green-200 text-center';
        } else {
            resultEl.className = 'mt-4 text-lg font-bold text-red-700 p-4 bg-red-50 rounded-xl border border-red-200 text-center';
        }
    });
}