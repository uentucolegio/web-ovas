// --- Evaluación Quiz — Tema 2: pwd, ls, cd, tree ---
const quizData = [
    {
        question: "Andrés está trabajando en el servidor y escribe pwd. La salida es: /home/andres/proyectos/pizzeria-web/frontend-nextjs ¿Qué tipo de ruta es esta y por qué?",
        options: [
            "a) Es una ruta relativa, porque parte desde el directorio del usuario andres.",
            "b) Es una ruta absoluta, porque comienza desde la raíz del sistema (/).",
            "c) Es una ruta de red, porque contiene el nombre del proyecto.",
            "d) Es una ruta simbólica, porque apunta a un enlace del servidor."
        ],
        answer: "b) Es una ruta absoluta, porque comienza desde la raíz del sistema (/)."
    },
    {
        question: "Andrés ejecuta cd /var/www/tienda y luego usa pwd y pwd -P. La salida de pwd es /var/www/tienda, pero pwd -P muestra /srv/apps/tienda/releases/2026-06-30. ¿Qué indica esto?",
        options: [
            "a) El comando pwd tiene un error y muestra información incorrecta.",
            "b) /var/www/tienda es un enlace simbólico que apunta a la ruta física /srv/apps/tienda/releases/2026-06-30.",
            "c) El servidor tiene dos versiones de la misma carpeta almacenadas en distintos discos.",
            "d) pwd -P siempre muestra la carpeta del administrador del sistema."
        ],
        answer: "b) /var/www/tienda es un enlace simbólico que apunta a la ruta física /srv/apps/tienda/releases/2026-06-30."
    },
    {
        question: "Andrés está en /home/andres/proyectos/pizzeria-web y ejecuta ls -lah. En la salida aparece un archivo llamado .env.local. ¿Qué indica el punto inicial y qué precaución se debe tener?",
        options: [
            "a) El punto indica que es un archivo del sistema; puede subirse a repositorios públicos sin problema.",
            "b) El punto indica que es un archivo oculto que puede contener claves o datos privados; no debe subirse a repositorios públicos ni compartirse en capturas.",
            "c) El punto indica que el archivo está dañado y debe eliminarse inmediatamente.",
            "d) El punto es solo una convención visual, sin efecto en la seguridad del proyecto."
        ],
        answer: "b) El punto indica que es un archivo oculto que puede contener claves o datos privados; no debe subirse a repositorios públicos ni compartirse en capturas."
    },
    {
        question: "Andrés necesita alternar rápidamente entre /etc/nginx/sites-available y /var/www/pizzeria-web/current. ¿Qué comando le permite regresar al directorio anterior sin escribir la ruta completa cada vez?",
        options: [
            "a) cd / para volver siempre a la raíz del sistema.",
            "b) cd ~ para ir al directorio personal del usuario.",
            "c) cd - para regresar automáticamente al directorio en el que estaba antes.",
            "d) cd .. para subir un nivel en el árbol de directorios."
        ],
        answer: "c) cd - para regresar automáticamente al directorio en el que estaba antes."
    },
    {
        question: "Andrés quiere ver la estructura del proyecto frontend-nextjs sin que la pantalla se llene con el contenido de node_modules. ¿Cuál de los siguientes comandos es el más adecuado?",
        options: [
            "a) tree /home/andres/proyectos/pizzeria-web/frontend-nextjs, sin ninguna opción adicional.",
            "b) tree -L 2 /home/andres/proyectos/pizzeria-web/frontend-nextjs, para limitar la profundidad a 2 niveles.",
            "c) ls -lah /home/andres/proyectos/pizzeria-web/frontend-nextjs, porque tree no puede excluir carpetas.",
            "d) tree -a /home/andres/proyectos/pizzeria-web/frontend-nextjs, para incluir todos los archivos ocultos."
        ],
        answer: "b) tree -L 2 /home/andres/proyectos/pizzeria-web/frontend-nextjs, para limitar la profundidad a 2 niveles."
    },
    {
        question: "En el flujo de despliegue del proyecto pizzeria-web, Nginx lee la configuración desde una ruta específica. ¿En cuál de los siguientes directorios Linux se encontraría dicha configuración?",
        options: [
            "a) /home, porque es el directorio personal donde viven los proyectos de desarrollo.",
            "b) /var, porque contiene datos variables como logs y cachés del servidor.",
            "c) /etc, porque es el directorio donde se almacenan las configuraciones del sistema y los servicios.",
            "d) /tmp, porque los archivos temporales de Nginx se guardan allí durante el despliegue."
        ],
        answer: "c) /etc, porque es el directorio donde se almacenan las configuraciones del sistema y los servicios."
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
            '¡Correcto! Una ruta absoluta siempre comienza desde la raíz / e indica el recorrido completo hasta el archivo.',
            '¡Así es! pwd muestra la ruta lógica y pwd -P revela la ruta física real cuando hay un enlace simbólico.',
            '¡Excelente! Los archivos que comienzan con punto son ocultos y suelen contener credenciales o configuraciones privadas.',
            '¡Muy bien! cd - es el atajo perfecto para alternar entre dos directorios sin reescribir la ruta.',
            '¡Correcto! La opción -L 2 limita la profundidad del árbol, evitando que carpetas grandes como node_modules llenen la pantalla.',
            '¡Lo lograste! /etc es el directorio estándar de configuraciones del sistema y servicios como Nginx.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. Una ruta relativa parte del directorio actual; una ruta absoluta siempre comienza desde la raíz /.',
            'Incorrecto. La diferencia entre pwd y pwd -P revela la presencia de un enlace simbólico: pwd muestra la ruta lógica y pwd -P la física.',
            'Incorrecto. El punto al inicio del nombre indica que el archivo es oculto en Linux; estos archivos suelen contener datos sensibles.',
            'Incorrecto. cd - es el comando específico para regresar al directorio anterior; cd .. solo sube un nivel.',
            'Incorrecto. Sin opciones, tree muestra todo el árbol incluyendo node_modules. La opción -L 2 limita la profundidad correctamente.',
            'Incorrecto. Nginx guarda su configuración en /etc/nginx/; /var es para logs y datos variables, /home para proyectos de usuario.'
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