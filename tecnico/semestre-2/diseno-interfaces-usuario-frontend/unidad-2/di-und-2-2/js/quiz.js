// --- Evaluación Quiz: Guía de Estilos ---
const quizData = [
    {
        question: "¿Cuál es el propósito principal de una guía de estilo en un producto digital?",
        options: [
            "A. Decorar la interfaz con muchos colores",
            "B. Definir reglas para mantener consistencia en el diseño",
            "C. Hacer que cada diseñador aporte su propio estilo",
            "D. Reducir el tiempo de programación únicamente"
        ],
        answer: "B",
        feedback: {
            correct: "Exacto. La guía de estilo asegura que todo el producto tenga coherencia visual y funcional, sin importar quién lo diseñe o desarrolle.",
            incorrect: "Incorrecto. B es la respuesta correcta. Justamente evita que cada uno haga algo diferente y asegura que el producto no sea solo una decoración, sino un sistema organizado."
        }
    },
    {
        question: "Según la regla 60-30-10, ¿qué representa el 10% del color en una interfaz?",
        options: [
            "A. El color de fondo",
            "B. El color secundario",
            "C. El color de acento",
            "D. El color del texto principal"
        ],
        answer: "C",
        feedback: {
            correct: "Muy bien. El 10% se usa para destacar elementos importantes como botones de acción.",
            incorrect: "Incorrecto. C es la respuesta correcta (color de acento). El 60% es el dominante (fondo) y el 30% el secundario."
        }
    },
    {
        question: "¿Por qué se recomienda usar tipografías Sans-serif en interfaces digitales?",
        options: [
            "A. Porque son más decorativas",
            "B. Porque son más económicas",
            "C. Porque son más legibles en pantalla",
            "D. Porque ocupan menos espacio"
        ],
        answer: "C",
        feedback: {
            correct: "Correcto. Las fuentes Sans-serif son más limpias y fáciles de leer en pantallas digitales.",
            incorrect: "Incorrecto. C es la respuesta correcta. No se busca decoración, sino claridad y legibilidad en los píxeles de la pantalla."
        }
    },
    {
        question: "¿Qué significa la jerarquía visual en el uso de tipografías?",
        options: [
            "A. Usar muchos colores en el texto",
            "B. Organizar el contenido según importancia visual",
            "C. Escribir todo en mayúsculas",
            "D. Usar una sola fuente en todo el diseño"
        ],
        answer: "B",
        feedback: {
            correct: "Exacto. La jerarquía ayuda a que el usuario sepa qué leer primero, segundo y tercero.",
            incorrect: "Incorrecto. B es la respuesta correcta. La jerarquía se define por el peso y tamaño para organizar la información, no solo por colores o mayúsculas."
        }
    },
    {
        question: "¿Cuál es la regla principal al diseñar iconos en una app?",
        options: [
            "A. Que sean muy artísticos",
            "B. Que tengan muchos colores",
            "C. Que su función sea clara para el usuario",
            "D. Que todos sean diferentes"
        ],
        answer: "C",
        feedback: {
            correct: "Perfecto. Lo más importante es que el usuario entienda el icono sin pensar demasiado.",
            incorrect: "Incorrecto. C es la respuesta correcta. El arte no debe sacrificar la claridad; la consistencia y la función son lo primordial."
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