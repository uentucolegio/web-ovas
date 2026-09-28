// --- Evaluación Quiz: Wireframes y Prototipos ---
const quizData = [
    {
        question: "¿Cuál es la principal función de un wireframe?",
        options: [
            "A. Definir los colores y tipografías de una interfaz",
            "B. Mostrar la estructura y organización de una interfaz",
            "C. Programar la funcionalidad de una aplicación",
            "D. Crear animaciones y transiciones"
        ],
        answer: "B. Mostrar la estructura y organización de una interfaz",
        feedback: "¡Muy bien! El wireframe se enfoca en la estructura, jerarquía y distribución de los elementos, no en el diseño visual final."
    },
    {
        question: "¿Por qué se dice que un wireframe es como el “esqueleto” de una interfaz?",
        options: [
            "A. Porque incluye todos los colores y estilos finales",
            "B. Porque muestra cómo se verá el producto terminado",
            "C. Porque representa la estructura básica sin detalles visuales",
            "D. Porque permite interactuar con la interfaz"
        ],
        answer: "C. Porque representa la estructura básica sin detalles visuales",
        feedback: "¡Exacto! Así como un esqueleto da forma al cuerpo, el wireframe muestra la base estructural sin incluir detalles visuales."
    },
    {
        question: "¿Cuál de las siguientes NO es una función de los wireframes?",
        options: [
            "A. Pensar la estructura antes del diseño visual",
            "B. Comunicar ideas entre el equipo",
            "C. Probar y mejorar rápidamente",
            "D. Programar la aplicación final"
        ],
        answer: "D. Programar la aplicación final",
        feedback: "¡Correcto! Los wireframes no se utilizan para programar, sino para planificar, comunicar y validar ideas."
    },
    {
        question: "¿Cuál es la principal diferencia entre un wireframe y un prototipo?",
        options: [
            "A. El wireframe es interactivo y el prototipo no",
            "B. El prototipo es estático y el wireframe interactivo",
            "C. El wireframe muestra estructura y el prototipo permite interacción",
            "D. No existe diferencia entre ellos"
        ],
        answer: "C. El wireframe muestra estructura y el prototipo permite interacción",
        feedback: "¡Muy bien! El wireframe define la estructura, mientras que el prototipo permite simular la experiencia del usuario mediante interacción."
    },
    {
        question: "¿Cuál es una ventaja de los prototipos de baja fidelidad?",
        options: [
            "A. Son altamente realistas",
            "B. Permiten impresionar a clientes fácilmente",
            "C. Son rápidos de crear y fáciles de modificar",
            "D. Incluyen animaciones avanzadas"
        ],
        answer: "C. Son rápidos de crear y fáciles de modificar",
        feedback: "¡Correcto! Los prototipos de baja fidelidad son ideales para explorar ideas rápidamente sin invertir mucho tiempo."
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
                questionEl.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
                optionEl.classList.add('selected');
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
            '¡Muy bien! El wireframe se enfoca en la estructura, jerarquía y distribución de los elementos, no en el diseño visual final.',
            '¡Exacto! Así como un esqueleto da forma al cuerpo, el wireframe muestra la base estructural sin incluir detalles visuales.',
            '¡Correcto! Los wireframes no se utilizan para programar, sino para planificar, comunicar y validar ideas.',
            '¡Muy bien! El wireframe define la estructura, mientras que el prototipo permite simular la experiencia del usuario mediante interacción.',
            '¡Correcto! Los prototipos de baja fidelidad son ideales para explorar ideas rápidamente sin invertir mucho tiempo.'
        ];
        const wrongFeedbacks = [
            'No es correcto. El wireframe no define aspectos visuales ni técnicos; su objetivo principal es organizar la estructura y el contenido de la interfaz.',
            'Respuesta incorrecta. El wireframe no incluye interacción ni diseño visual detallado, solo representa la estructura básica.',
            'No es la opción correcta. Los wireframes sí ayudan a pensar, comunicar y probar ideas, pero no tienen ninguna función de programación.',
            'Respuesta incorrecta. La diferencia clave está en la interactividad: el prototipo permite navegar y probar la experiencia, el wireframe no.',
            'No es correcto. Las características como realismo y animaciones pertenecen a prototipos de alta fidelidad, no a los de baja.'
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
            } else {
                feedbackDiv.innerHTML = `<span class='text-red-700 font-semibold'>❌ ${wrongFeedbacks[index]}</span>`;
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