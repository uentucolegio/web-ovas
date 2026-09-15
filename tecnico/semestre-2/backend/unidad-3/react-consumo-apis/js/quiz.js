// --- Evaluación Quiz Consumo de APIs desde React ---
const quizData = [
    {
        question: "¿Qué función de JavaScript se usa para hacer peticiones HTTP a una API?",
        options: ["request()", "fetch()", "api()", "http()"],
        answer: "fetch()",
        explanation: "fetch() es la función nativa de JavaScript que permite hacer peticiones HTTP a APIs."
    },
    {
        question: "¿Qué método HTTP se usa para obtener datos de una API?",
        options: ["POST", "GET", "PUT", "DELETE"],
        answer: "GET",
        explanation: "GET es el método HTTP usado para leer/obtener datos de un servidor."
    },
    {
        question: "¿Qué código de estado HTTP indica que la petición fue exitosa?",
        options: ["404", "500", "200", "401"],
        answer: "200",
        explanation: "El código 200 OK indica que la petición fue exitosa y el servidor devolvió los datos solicitados."
    },
    {
        question: "¿Cuál es el orden correcto del flujo de comunicación con una API?",
        options: [
            "Guardar datos → Hacer fetch → Mostrar cargando",
            "Mostrar cargando → Hacer fetch → Procesar respuesta → Guardar datos",
            "Hacer fetch → Mostrar cargando → Guardar datos",
            "Procesar respuesta → Hacer fetch → Guardar datos"
        ],
        answer: "Mostrar cargando → Hacer fetch → Procesar respuesta → Guardar datos",
        explanation: "Primero muestras 'Cargando...', luego haces la petición, procesas la respuesta y finalmente guardas los datos en el estado."
    },
    {
        question: "¿Qué estado debes mostrar mientras esperas la respuesta de una API?",
        options: ["Error", "Éxito", "Cargando", "Ninguno"],
        answer: "Cargando",
        explanation: "Siempre debes mostrar un estado de 'Cargando...' para que el usuario sepa que la app está esperando datos."
    },
    {
        question: "¿Qué método se usa en fetch() para convertir la respuesta a JSON?",
        options: ["toJSON()", ".json()", "parse()", "convert()"],
        answer: ".json()",
        explanation: "El método .json() convierte la respuesta de la API a un objeto JavaScript que puedes usar."
    },
    {
        question: "¿Qué método HTTP se usa para crear un nuevo recurso en el servidor?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: "POST",
        explanation: "POST es el método HTTP usado para crear nuevos recursos en el servidor."
    },
    {
        question: "¿Qué propiedad debes verificar para saber si la respuesta fue exitosa?",
        options: ["respuesta.success", "respuesta.ok", "respuesta.status === 200", "respuesta.valid"],
        answer: "respuesta.ok",
        explanation: "La propiedad .ok es true si el código de estado está entre 200-299, indicando éxito."
    },
    {
        question: "¿Qué significa el código de estado HTTP 404?",
        options: ["Servidor caído", "No encontrado", "Error del cliente", "Éxito"],
        answer: "No encontrado",
        explanation: "404 Not Found significa que el recurso que buscas no existe en el servidor."
    },
    {
        question: "¿Cuántos estados principales debes manejar al consumir una API?",
        options: ["1 (solo datos)", "2 (cargando y datos)", "3 (cargando, error, éxito)", "4 (cargando, error, éxito, vacío)"],
        answer: "3 (cargando, error, éxito)",
        explanation: "Debes manejar 3 estados: cargando (mientras esperas), error (si algo falla) y éxito (cuando tienes los datos)."
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
                feedbackDiv.innerHTML = `<span class='text-green-700 font-semibold'>✔️ Correcto. ${quizData[index].explanation || ''}</span>`;
            } else {
                feedbackDiv.innerHTML = `<span class='text-red-700 font-semibold'>❌ Incorrecto. ${quizData[index].explanation || ''}</span>`;
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
