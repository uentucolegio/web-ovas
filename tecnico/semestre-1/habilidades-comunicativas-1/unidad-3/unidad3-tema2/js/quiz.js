// --- Evaluación Quiz: "Hablar con firmeza y respeto" ---
const quizData = [
    {
        question: "En la frase: 'Haz lo que quieras, da igual', el estilo de comunicación predominante es:",
        options: [
            "A) Asertivo",
            "B) Agresivo",
            "C) Pasivo",
            "D) Pasivo-agresivo"
        ],
        answer: "C) Pasivo",
        feedback: "Minimiza la propia preferencia y cede sin expresar necesidad."
    },
    {
        question: "¿Cuál frase es más asertiva para pedir que bajen el tono en una discusión?",
        options: [
            "A) '¡Cállate y escucha!'",
            "B) 'Bueno, sigue hablando como quieras…'",
            "C) 'Me hace sentir incómodo cuando me hablas así; hablemos con calma, por favor.'",
            "D) 'Si sigues así, no te volveré a hablar.'"
        ],
        answer: "C) 'Me hace sentir incómodo cuando me hablas así; hablemos con calma, por favor.'",
        feedback: "Expresa impacto, pide cambio concreto y mantiene respeto."
    },
    {
        question: "Señala la opción que mejor ejemplifica un estilo pasivo-agresivo:",
        options: [
            "A) 'No estoy de acuerdo, pero respeto tu opinión.'",
            "B) 'Qué bien… como siempre, 'olvidaste' avisar' (con ironía).",
            "C) 'Necesito 10 minutos más para terminar.'",
            "D) 'Hazlo como yo digo.'"
        ],
        answer: "B) 'Qué bien… como siempre, 'olvidaste' avisar' (con ironía).",
        feedback: "La ironía/indirectas sustituyen el pedido claro."
    },
    {
        question: "El orden correcto es: 1) Proponer solución, 2) Escuchar, 3) Reconocer, 4) Expresar mi punto. ¿Cuál es la mejor secuencia?",
        options: [
            "A) 2 → 3 → 4 → 1",
            "B) 4 → 3 → 2 → 1",
            "C) 3 → 2 → 4 → 1",
            "D) 2 → 4 → 1 → 3"
        ],
        answer: "A) 2 → 3 → 4 → 1",
        feedback: "Escuchar → reconocer → expresar → proponer."
    },
    {
        question: "¿Cuál reacción tiende a escalar un conflicto?",
        options: [
            "A) Reformular lo que entendiste",
            "B) Subir el volumen de voz para 'imponerse'",
            "C) Pedir un tiempo breve para calmarse",
            "D) Fijar un límite con respeto"
        ],
        answer: "B) Subir el volumen de voz para 'imponerse'",
        feedback: "Alzar la voz aumenta tensión y defensividad."
    },
    {
        question: "La comunicación asertiva busca principalmente:",
        options: [
            "A) Ganar cualquier discusión",
            "B) Evitar hablar para no generar conflicto",
            "C) Expresar necesidades con respeto, cuidando la relación",
            "D) Demostrar superioridad argumentativa"
        ],
        answer: "C) Expresar necesidades con respeto, cuidando la relación",
        feedback: "Equilibrio entre claridad propia y respeto al otro."
    },
    {
        question: "Un compañero no entregó su parte y te culpan. ¿Cuál respuesta es más asertiva?",
        options: [
            "A) 'Eres un irresponsable, todo es tu culpa.'",
            "B) 'No importa, yo me quedo callado.'",
            "C) 'Me afectó que no se entregara a tiempo; para el próximo, acordemos responsable y fecha de integración.'",
            "D) 'Hazlo tú todo, total siempre pasa igual.'"
        ],
        answer: "C) 'Me afectó que no se entregara a tiempo; para el próximo, acordemos responsable y fecha de integración.'",
        feedback: "Describe impacto y propone acuerdo concreto."
    },
    {
        question: "¿Qué distingue mejor a la asertividad del estilo agresivo?",
        options: [
            "A) La asertividad evita decir 'no'.",
            "B) La asertividad considera los derechos propios y del otro.",
            "C) La asertividad usa más argumentos lógicos.",
            "D) La asertividad es más rápida para resolver."
        ],
        answer: "B) La asertividad considera los derechos propios y del otro.",
        feedback: "Respeto y límites bilaterales."
    },
    {
        question: "¿Qué elemento NO corresponde a la escucha activa en una conversación difícil?",
        options: [
            "A) Parafrasear lo que entendiste",
            "B) Contacto visual y postura abierta",
            "C) Interrumpir para corregir de inmediato",
            "D) Preguntas abiertas para comprender"
        ],
        answer: "C) Interrumpir para corregir de inmediato",
        feedback: "Interrumpir precozmente bloquea la comprensión."
    },
    {
        question: "Elige la mejor formulación:",
        options: [
            "A) 'Si no haces caso, verás.'",
            "B) 'Siempre haces lo mismo.'",
            "C) 'Necesito que respetes los turnos para hablar; termino mi idea y te escucho.'",
            "D) 'Como quieras, total da igual.'"
        ],
        answer: "C) 'Necesito que respetes los turnos para hablar; termino mi idea y te escucho.'",
        feedback: "Pide conducta específica y define un marco de respeto."
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
if(submitQuizBtn){
    submitQuizBtn.addEventListener('click', () => {
        let score = 0;
        const questions = quizContainer.querySelectorAll('.mb-6');
        const feedbacks = [
            'Correcto: El estilo pasivo minimiza las propias preferencias y cede sin expresar necesidades.',
            'Correcto: Esta frase expresa el impacto emocional, pide un cambio concreto y mantiene el respeto.',
            'Correcto: La ironía y las indirectas son características del estilo pasivo-agresivo, evitando el pedido claro.',
            'Correcto: La secuencia efectiva es escuchar → reconocer → expresar → proponer solución.',
            'Correcto: Subir el volumen de voz para imponerse aumenta la tensión y genera defensividad.',
            'Correcto: La asertividad busca el equilibrio entre expresar necesidades con claridad y cuidar la relación.',
            'Correcto: Esta respuesta describe el impacto y propone un acuerdo concreto para el futuro.',
            'Correcto: La asertividad se distingue por considerar tanto los derechos propios como los del otro.',
            'Correcto: Interrumpir para corregir de inmediato bloquea la comprensión y no es parte de la escucha activa.',
            'Correcto: Esta formulación pide una conducta específica y define un marco de respeto mutuo.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. La frase "Haz lo que quieras, da igual" refleja un estilo pasivo, donde se minimizan las propias necesidades.',
            'Incorrecto. La respuesta más asertiva es la que expresa el impacto emocional y pide calma con respeto.',
            'Incorrecto. El estilo pasivo-agresivo se caracteriza por usar ironía e indirectas en lugar de comunicar claramente.',
            'Incorrecto. La secuencia correcta es: primero escuchar, luego reconocer, después expresar tu punto y finalmente proponer solución.',
            'Incorrecto. Subir el volumen de voz para imponerse es la reacción que tiende a escalar el conflicto.',
            'Incorrecto. La comunicación asertiva busca expresar necesidades con respeto, cuidando la relación.',
            'Incorrecto. La respuesta asertiva describe el impacto y propone un acuerdo concreto, sin atacar ni callar.',
            'Incorrecto. La asertividad se distingue por considerar los derechos propios y los del otro, estableciendo respeto bilateral.',
            'Incorrecto. Interrumpir para corregir de inmediato NO es parte de la escucha activa; bloquea la comprensión.',
            'Incorrecto. La mejor formulación pide una conducta específica y define un marco de respeto mutuo.'
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