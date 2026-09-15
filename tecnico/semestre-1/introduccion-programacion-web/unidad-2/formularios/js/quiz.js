// --- Evaluación Quiz ---
const quizData = [
    {
        question: "¿Qué es la validación de formularios?",
        options: ["Un proceso para dar estilo a los formularios", "Un proceso para verificar que los datos ingresados sean correctos", "Una forma de enviar datos al servidor", "Un método para crear formularios"],
        answer: "Un proceso para verificar que los datos ingresados sean correctos"
    },
    {
        question: "¿Por qué es importante validar formularios?",
        options: ["Para hacer la página más bonita", "Para evitar que se envíe información incorrecta o incompleta", "Para aumentar el tamaño del código", "Para eliminar campos del formulario"],
        answer: "Para evitar que se envíe información incorrecta o incompleta"
    },
    {
        question: "¿Cuál propiedad se usa para verificar si un campo está vacío?",
        options: ["value", "text", "content", "data"],
        answer: "value"
    },
    {
        question: "¿Cómo se verifica la longitud de un texto en JavaScript?",
        options: ["text.size", "text.length", "text.count", "text.chars"],
        answer: "text.length"
    },
    {
        question: "¿Qué método se usa para validar el formato de un correo electrónico?",
        options: ["Expresiones regulares (regex)", "Operadores matemáticos", "Condicionales simples", "Bucles for"],
        answer: "Expresiones regulares (regex)"
    },
    {
        question: "Si una contraseña debe tener mínimo 8 caracteres, ¿qué condición usarías?",
        options: ["password.length == 8", "password.length >= 8", "password.length <= 8", "password.length > 8"],
        answer: "password.length >= 8"
    },
    {
        question: "¿Qué evento se usa comúnmente para validar un formulario antes de enviarlo?",
        options: ["click", "input", "submit", "load"],
        answer: "submit"
    },
    {
        question: "¿Cómo se previene el envío de un formulario si la validación falla?",
        options: ["event.stop()", "event.preventDefault()", "event.cancel()", "event.block()"],
        answer: "event.preventDefault()"
    },
    {
        question: "¿Qué tipo de validación ocurre en el navegador antes de enviar datos al servidor?",
        options: ["Validación del servidor", "Validación del cliente", "Validación de base de datos", "Validación automática"],
        answer: "Validación del cliente"
    },
    {
        question: "¿Cuál es una buena práctica al validar formularios?",
        options: ["Mostrar mensajes claros de error al usuario", "Ocultar todos los errores", "Validar solo en el servidor", "Permitir cualquier dato"],
        answer: "Mostrar mensajes claros de error al usuario"
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
            'Correcto: La validación de formularios es el proceso para verificar que los datos ingresados sean correctos antes de procesarlos.',
            'Correcto: Validar formularios es importante para evitar que se envíe información incorrecta o incompleta al servidor.',
            'Correcto: La propiedad "value" se usa para acceder al contenido de un campo y verificar si está vacío.',
            'Correcto: La propiedad ".length" permite verificar la longitud de un texto en JavaScript.',
            'Correcto: Las expresiones regulares (regex) son el método más efectivo para validar formatos como correos electrónicos.',
            'Correcto: Para validar que una contraseña tenga mínimo 8 caracteres se usa "password.length >= 8".',
            'Correcto: El evento "submit" se dispara cuando se intenta enviar un formulario.',
            'Correcto: El método "event.preventDefault()" previene el envío del formulario si la validación falla.',
            'Correcto: La validación del cliente ocurre en el navegador antes de enviar datos al servidor.',
            'Correcto: Una buena práctica es mostrar mensajes claros de error para que el usuario sepa qué corregir.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. La validación es el proceso para verificar que los datos sean correctos.',
            'Incorrecto. La validación evita que se envíe información incorrecta o incompleta.',
            'Incorrecto. La propiedad correcta es "value".',
            'Incorrecto. Se usa ".length" para verificar la longitud de un texto.',
            'Incorrecto. Las expresiones regulares (regex) son el método correcto.',
            'Incorrecto. La condición correcta es "password.length >= 8".',
            'Incorrecto. El evento correcto es "submit".',
            'Incorrecto. El método correcto es "event.preventDefault()".',
            'Incorrecto. Es validación del cliente (en el navegador).',
            'Incorrecto. Se deben mostrar mensajes claros de error al usuario.'
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