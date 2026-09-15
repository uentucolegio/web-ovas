// --- Evaluación Quiz React Interacción ---
const quizData = [
    {
        question: "¿Qué es el estado (state) en React?",
        options: ["Una base de datos", "La memoria del componente que puede cambiar con el tiempo", "Un archivo CSS", "Una función"],
        answer: "La memoria del componente que puede cambiar con el tiempo",
        explanation: "El estado es información que puede cambiar y que, cuando cambia, hace que React actualice la pantalla automáticamente."
    },
    {
        question: "¿Qué evento se usa para detectar cuando el usuario hace clic en un botón?",
        options: ["onChange", "onClick", "onSubmit", "onPress"],
        answer: "onClick",
        explanation: "onClick es el evento que se dispara cuando el usuario hace clic en un elemento."
    },
    {
        question: "¿Cuál es la sintaxis correcta para usar useState?",
        options: ["useState(valor, setValor)", "const [valor, setValor] = useState(0)", "const valor = useState(0)", "useState = [valor, setValor]"],
        answer: "const [valor, setValor] = useState(0)",
        explanation: "useState devuelve un array con dos elementos: el valor actual y la función para actualizarlo. Usamos destructuring para obtenerlos."
    },
    {
        question: "¿Qué pasa cuando cambias el estado con setState?",
        options: ["Nada", "React vuelve a renderizar el componente automáticamente", "Se recarga toda la página", "Se borra la memoria"],
        answer: "React vuelve a renderizar el componente automáticamente",
        explanation: "Cuando cambias el estado, React detecta el cambio y vuelve a renderizar el componente para mostrar los nuevos valores."
    },
    {
        question: "¿Cuál es el error en este código? usuario.nombre = 'Carlos' (donde usuario es estado)",
        options: ["No hay error", "No puedes modificar el estado directamente, debes usar setUsuario", "Falta un punto y coma", "El nombre debe estar en mayúsculas"],
        answer: "No puedes modificar el estado directamente, debes usar setUsuario",
        explanation: "Nunca modifiques el estado directamente. Siempre usa la función set que te da useState."
    },
    {
        question: "¿Para qué sirve useEffect?",
        options: ["Para crear estilos CSS", "Para ejecutar código en momentos específicos como cuando el componente aparece", "Para crear componentes", "Para validar formularios"],
        answer: "Para ejecutar código en momentos específicos como cuando el componente aparece",
        explanation: "useEffect te permite ejecutar código cuando el componente se monta, cuando cambian valores específicos, o cuando se desmonta."
    },
    {
        question: "¿Qué significa el array vacío [] en useEffect(() => {}, [])?",
        options: ["Que hay un error", "Que se ejecuta solo una vez al inicio", "Que se ejecuta infinitamente", "Que nunca se ejecuta"],
        answer: "Que se ejecuta solo una vez al inicio",
        explanation: "Un array vacío como dependencia significa que el efecto solo se ejecuta una vez cuando el componente se monta."
    },
    {
        question: "¿Cómo se crea un input controlado en React?",
        options: ["Solo con HTML normal", "Usando value={estado} y onChange para actualizar el estado", "Con CSS", "No se puede hacer"],
        answer: "Usando value={estado} y onChange para actualizar el estado",
        explanation: "Un input controlado usa value para mostrar el estado y onChange para actualizarlo cuando el usuario escribe."
    },
    {
        question: "¿Cuál de estos datos DEBE estar en el estado?",
        options: ["El nombre de tu app (nunca cambia)", "El número de likes de una publicación", "Una constante como PI", "El color del logo"],
        answer: "El número de likes de una publicación",
        explanation: "El número de likes cambia cuando el usuario interactúa, por lo tanto debe estar en el estado."
    },
    {
        question: "¿Qué evento se usa para detectar cuando el usuario escribe en un input?",
        options: ["onClick", "onChange", "onWrite", "onType"],
        answer: "onChange",
        explanation: "onChange se dispara cada vez que el valor de un input cambia, es decir, cuando el usuario escribe."
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