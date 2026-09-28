// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Qué es una rejilla en el diseño de interfaces y cuál es su función principal?",
        options: [
            "a) Un sistema de colores para resaltar elementos importantes.",
            "b) Un sistema estructural de líneas verticales y horizontales que divide la pantalla en columnas y filas para organizar elementos de manera lógica.",
            "c) Una herramienta para medir el tiempo de carga de la interfaz.",
            "d) Un patrón de animaciones para guiar la atención del usuario."
        ],
        answer: "b) Un sistema estructural de líneas verticales y horizontales que divide la pantalla en columnas y filas para organizar elementos de manera lógica."
    },
    {
        question: "¿Cuál es el error frecuente al aplicar alineación en bloques de texto extensos y por qué es problemático?",
        options: [
            "a) Usar alineación derecha para acelerar la lectura.",
            "b) Aplicar alineación central, lo que incrementa la fatiga visual del usuario.",
            "c) Alinear todo a la izquierda para reducir carga cognitiva.",
            "d) Ignorar la alineación para crear diseños asimétricos."
        ],
        answer: "b) Aplicar alineación central, lo que incrementa la fatiga visual del usuario."
    },
    {
        question: "¿Qué representa el espaciado en el diseño de interfaces y cuál es su importancia?",
        options: [
            "a) La distancia matemática entre elementos que indica relación y evita saturación visual.",
            "b) El tamaño de las fuentes para jerarquía tipográfica.",
            "c) La velocidad de carga de imágenes en la pantalla.",
            "d) El patrón de colores para resaltar botones."
        ],
        answer: "a) La distancia matemática entre elementos que indica relación y evita saturación visual."
    },
    {
        question: "¿Cuál es el propósito de la jerarquía visual y qué error se comete al aplicarla incorrectamente?",
        options: [
            "a) Determinar el orden de importancia mediante contraste de tamaño, color o grosor tipográfico.",
            "b) Repetir elementos para crear ritmo en la interfaz.",
            "c) Distribuir peso visual de manera equilibrada en toda la pantalla.",
            "d) Guiar el movimiento del ojo con patrones repetitivos."
        ],
        answer: "a) Determinar el orden de importancia mediante contraste de tamaño, color o grosor tipográfico."
    },
    {
        question: "¿Qué es el ritmo visual y cuál es su beneficio en el diseño de interfaces?",
        options: [
            "a) La distribución equilibrada del peso visual en la pantalla.",
            "b) La repetición controlada de elementos para guiar el movimiento del ojo de forma predecible.",
            "c) La colocación de elementos a lo largo de un eje común.",
            "d) La distancia matemática entre elementos para indicar relación."
        ],
        answer: "b) La repetición controlada de elementos para guiar el movimiento del ojo de forma predecible."
    },
    {
        question: "¿Cuál es el concepto de balance en el diseño de interfaces y cómo se evalúa?",
        options: [
            "a) La repetición de patrones para guiar la atención.",
            "b) La distribución equilibrada del peso visual mediante tamaño, color o densidad tipográfica.",
            "c) La alineación de elementos a lo largo de un eje común.",
            "d) La distancia entre elementos para agrupar funciones."
        ],
        answer: "b) La distribución equilibrada del peso visual mediante tamaño, color o densidad tipográfica."
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
            '¡Excelente! Has identificado correctamente que una rejilla es un sistema estructural que organiza los elementos en espacios delimitados, como en el perfil de Instagram, asegurando un orden predecible y evitando diseños desestructurados. Recuerda usar múltiplos de 8px para proporciones exactas.',
            '¡Muy bien! La alineación central en textos largos aumenta la fatiga visual porque rompe el flujo natural de lectura. Como en WhatsApp, alinea nombres a la izquierda y horas a la derecha para una lectura eficiente. Ante la duda, alinea a la izquierda.',
            '¡Correcto! El espaciado actúa como "pausas" en el lenguaje, agrupando elementos relacionados (como en Spotify) y separando funciones. Evita reducir márgenes al mínimo, ya que el espacio en blanco es activo y mejora la claridad.',
            '¡Perfecto! La jerarquía visual establece importancia, como en YouTube donde el título es grande y negrita, seguido del canal en gris. Evita aumentar tamaño y colores a todos los elementos simultáneamente, definiendo un único foco principal por pantalla.',
            '¡Excelente respuesta! El ritmo visual, como en el feed de X (Twitter), repite patrones (avatar, nombre, texto, iconos) para una asimilación rápida. Evita alterar dimensiones en listas, y convierte bloques en componentes de Figma para consistencia.',
            '¡Muy bien! El balance, como en Netflix, contrarresta elementos pesados (póster grande) con otros pequeños para estabilidad. Evalúalo alejando la vista y entrecerrando los ojos; evita agrupar todo en un cuadrante para mantener el centro de gravedad.'
        ];
        const wrongFeedbacks = [
            'La opción correcta es b. Una rejilla no se relaciona con colores, tiempos de carga o animaciones; su propósito es crear un marco matemático para la disposición de elementos, previniendo errores como posicionar elementos sin restricciones y generando diseños caóticos.',
            'La opción correcta es b. La alineación central no acelera la lectura; al contrario, complica el escaneo visual. La alineación izquierda es natural en occidente, pero el error específico es forzar centralización en textos largos, lo que desorienta al usuario.',
            'La opción correcta es a. El espaciado no se refiere a fuentes, velocidades de carga o colores; es la distancia negativa que estructura la interfaz, previniendo errores como forzar más contenido y generar confusión visual.',
            'La opción correcta es a. La jerarquía no es sobre repetición, balance o ritmo; es el contraste tipográfico que guía la atención, evitando desorientación cuando múltiples elementos compiten por atención.',
            'La opción correcta es b. El ritmo no es balance, alineación o espaciado; es la repetición sistemática que acelera el consumo de contenido, previniendo fricción cognitiva al mantener patrones invariables.',
            'La opción correcta es b. El balance no es ritmo, alineación o espaciado; es la estabilidad visual que previene desequilibrios, asegurando que la composición no se incline hacia un sector dominante.'
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