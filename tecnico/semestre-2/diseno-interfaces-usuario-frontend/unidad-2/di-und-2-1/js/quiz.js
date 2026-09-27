// --- Evaluación Quiz ---
const quizData = [
    {
        question: "Un cliente te contacta para desarrollar una plataforma web educativa. ¿Qué deberías hacer ANTES de empezar a programar la primera línea de código?",
        options: [
            "a) Diseñar el logotipo y elegir colores atractivos para impresionar rápido.",
            "b) Construir un Brief para entender claramente qué necesita y por qué lo necesita.",
            "c) Crear inmediatamente un prototipo funcional para avanzar rápido y ahorrar tiempo.",
            "d) Programar las funcionalidades estándar que toda web tiene (como el login)."
        ],
        answer: "b) Construir un Brief para entender claramente qué necesita y por qué lo necesita."
    },
    {
        question: "Imagina una aplicación de transporte tipo Uber. Identifica cuál de las siguientes opciones describe un 'Requerimiento No Funcional'.",
        options: [
            "a) El usuario primario (pasajero) debe poder pagar el viaje con tarjeta de crédito.",
            "b) El conductor debe ver el destino en un mapa interactivo antes de arrancar.",
            "c) La aplicación debe ser rápida y cargar los mapas en menos de 2 segundos.",
            "d) Debe existir un gran botón rojo en la pantalla para cancelar el viaje en cualquier momento."
        ],
        answer: "c) La aplicación debe ser rápida y cargar los mapas en menos de 2 segundos."
    },
    {
        question: "Durante una reunión, un cliente emocionado te dice: '¡Quiero que mi página web sea como Netflix, pero para vender zapatos!'. ¿Cuál es tu mejor respuesta desde el enfoque de diseño e interpretación de necesidades?",
        options: [
            "a) '¿Quieres que mantengamos el mismo color rojo y fondo negro de Netflix para tu marca de zapatos?'",
            "b) '¡Perfecto! Copiaré el diseño estructural exacto de Netflix cambiando solo las portadas de series por fotos de zapatos.'",
            "c) '¿Qué es lo que más te gusta de Netflix? ¿Buscas un diseño de catálogo expansivo o un sistema muy inteligente de recomendaciones?'",
            "d) 'Eso no tiene sentido. Netflix está diseñado para videos y streaming, no para vender productos físicos como zapatos.'"
        ],
        answer: "c) '¿Qué es lo que más te gusta de Netflix? ¿Buscas un diseño de catálogo expansivo o un sistema muy inteligente de recomendaciones?'"
    },
    {
        question: "Estás diseñando una aplicación móvil para que adultos mayores lleven el control de sus medicinas diarias. ¿Por qué NO deberías basar el diseño únicamente en lo que a ti (como joven) te parece fácil e intuitivo?",
        options: [
            "a) Porque los lineamientos dicen que el diseño de interfaces modernas es estrictamente para jóvenes y startups.",
            "b) Porque la regla de oro en el diseño UX es 'tú no eres el usuario'. Lo que para ti es obvio, para otro puede ser complejo.",
            "c) Porque estadísticamente a los adultos mayores no les importa el diseño visual, solo gastar lo menos posible.",
            "d) Porque por ley, todas las herramientas médicas deben ser aburridas, usar colores grises y texto pequeño."
        ],
        answer: "b) Porque la regla de oro en el diseño UX es 'tú no eres el usuario'. Lo que para ti es obvio, para otro puede ser complejo."
    },
    {
        question: "Pensando en una plataforma de domicilios (como Rappi). ¿Quién representa al 'Usuario Secundario' en esta dinámica?",
        options: [
            "a) El cliente ansioso que solicita la comida de su restaurante favorito.",
            "b) El equipo de programadores, diseñadores y QA que mantienen viva la app.",
            "c) El repartidor (motorizado/ciclista). Cuentan con necesidades de navegación y aceptación de viajes diferentes.",
            "d) El dueño y los inversionistas de la compañía."
        ],
        answer: "c) El repartidor (motorizado/ciclista). Cuentan con necesidades de navegación y aceptación de viajes diferentes."
    },
    {
        question: "¿Para qué sirve exactamente crear y aplicar la herramienta de diseño llamada 'User Persona' en la concepción de tu proyecto?",
        options: [
            "a) Para buscar en redes sociales a una persona con esos intereses y enviarle publicidad agresiva y directa.",
            "b) Para humanizar al segmento y tomar decisiones pensando en problemas, frustraciones y metas reales de una representación tangible.",
            "c) Para darle más páginas al documento del Brief y justificarle al cliente que el equipo está trabajando e investigando mucho.",
            "d) Para decorar las diapositivas del proyecto final con unas caras sonrientes y nombres creativos simplemente porque se ve moderno."
        ],
        answer: "b) Para humanizar al segmento y tomar decisiones pensando en problemas, frustraciones y metas reales de una representación tangible."
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
            '¡Exacto! El Brief es el "mapa del tesoro".',
            '¡Así es! Define el "cómo" debe ser el sistema (su calidad).',
            '¡Excelente! Interpretar necesidades es hacer buenas preguntas.',
            '¡Muy bien! Lo que para nosotros es obvio, para otros puede ser muy confuso.',
            '¡Correcto! El repartidor es secundario pero tiene una app diferente y vital.',
            '¡Lo lograste! El User Persona te ayuda a empatizar con casos de uso lógicos y reales.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Sin el Brief, podrías construir algo que el cliente no necesita o no quería.',
            'Incorrecto. El tiempo de carga es una cualidad del sistema, lo cual lo hace "No funcional".',
            'Incorrecto. No asumas copiar de inmediato, hay que averiguar qué es lo que realmente valoran de esa app.',
            'Incorrecto. Recuerda la regla fundamental de UX: "Tú no eres el usuario".',
            'Incorrecto. El usuario primario gasta el dinero; el repartidor colabora en el servicio brindando apoyo secundario.',
            'Incorrecto. Es vital en UX para empatizar con los usuarios reales, no para rellenar documentos o vender publicidad directa.'
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