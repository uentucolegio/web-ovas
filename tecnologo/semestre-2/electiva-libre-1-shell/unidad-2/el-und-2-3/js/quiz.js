// --- Evaluación Quiz — Tema 2.3: Permisos, usuarios, grupos, chmod + Procesos y servicios ---
const quizData = [
    {
        question: "Ejecutas 'ls -l' en tu proyecto y obtienes la línea '-rw-r--r-- 1 deploy deploy 256 jul 20 10:15 .env'. ¿Qué significa exactamente esa cadena de permisos?",
        options: [
            "a) Que .env es un directorio y todos sus miembros pueden entrar en él.",
            "b) Que .env es un archivo regular: el propietario puede leerlo y escribirlo, mientras que el grupo y el resto de usuarios solo pueden leerlo.",
            "c) Que .env solo puede ser leído por el usuario deploy y por nadie más del sistema.",
            "d) Que .env es ejecutable por el propietario porque tiene el permiso w."
        ],
        answer: "b) Que .env es un archivo regular: el propietario puede leerlo y escribirlo, mientras que el grupo y el resto de usuarios solo pueden leerlo."
    },
    {
        question: "Debes proteger un archivo .env con las credenciales de la base de datos para que ningún otro usuario del servidor pueda leerlo. ¿Qué permiso numérico corresponde?",
        options: [
            "a) chmod 644 .env, porque es el permiso estándar de los archivos de configuración.",
            "b) chmod 755 .env, porque así el servidor web puede acceder a las variables.",
            "c) chmod 600 .env, porque otorga lectura y escritura solo al propietario (6) y ningún acceso al grupo ni a otros (0 y 0).",
            "d) chmod 777 .env, porque garantiza que la aplicación siempre pueda leerlo."
        ],
        answer: "c) chmod 600 .env, porque otorga lectura y escritura solo al propietario (6) y ningún acceso al grupo ni a otros (0 y 0)."
    },
    {
        question: "Un compañero agregó un usuario a un grupo con 'sudo usermod -G dev-team frontend-dev' y ahora el usuario perdió el acceso a otros recursos. ¿Qué ocurrió?",
        options: [
            "a) La opción -G sin -a reemplaza todos los grupos suplementarios del usuario; lo correcto es usar 'usermod -aG' para agregar sin perder los existentes.",
            "b) El comando falló porque groupadd debe ejecutarse siempre antes que usermod.",
            "c) El usuario perdió su grupo principal porque -G solo funciona con usuarios de servicio.",
            "d) Nada, es un comportamiento temporal que se corrige al reiniciar el sistema."
        ],
        answer: "a) La opción -G sin -a reemplaza todos los grupos suplementarios del usuario; lo correcto es usar 'usermod -aG' para agregar sin perder los existentes."
    },
    {
        question: "Vas a desplegar una aplicación en un servidor con Nginx y necesitas que el servidor web pueda servir los archivos de /var/www/mi-proyecto-web. ¿Cuál es la instrucción adecuada?",
        options: [
            "a) sudo chmod -R 777 /var/www/mi-proyecto-web, para que cualquier usuario pueda acceder sin problemas.",
            "b) sudo chown -R www-data:www-data /var/www/mi-proyecto-web, para asignar recursivamente el usuario y grupo con los que se ejecuta el servidor web.",
            "c) sudo groupdel www-data, para eliminar restricciones de grupo sobre la carpeta.",
            "d) sudo useradd -r www-data, porque el usuario del servidor debe crearse en cada despliegue."
        ],
        answer: "b) sudo chown -R www-data:www-data /var/www/mi-proyecto-web, para asignar recursivamente el usuario y grupo con los que se ejecuta el servidor web."
    },
    {
        question: "¿Por qué en entornos de producción los servicios como Nginx o PostgreSQL se ejecutan con usuarios creados mediante 'useradd -r -s /usr/sbin/nologin'?",
        options: [
            "a) Porque los usuarios de servicio consumen menos memoria RAM que los usuarios normales.",
            "b) Porque son cuentas de sistema sin inicio de sesión interactivo, lo que reduce el impacto de un posible compromiso de seguridad.",
            "c) Porque systemd solo puede iniciar servicios cuyo propietario sea el usuario root.",
            "d) Porque sin la opción -r el servicio no puede escuchar en puertos de red."
        ],
        answer: "b) Porque son cuentas de sistema sin inicio de sesión interactivo, lo que reduce el impacto de un posible compromiso de seguridad."
    },
    {
        question: "Tu aplicación Node.js quedó ejecutándose en segundo plano y necesitas identificar su PID para detenerla. ¿Qué comando usas?",
        options: [
            "a) systemctl list node, porque lista todos los procesos gestionados por el sistema.",
            "b) chmod -x node, porque al quitar el permiso de ejecución el proceso se detiene.",
            "c) journalctl node, porque muestra el identificador de todos los procesos activos.",
            "d) ps aux | grep node, porque muestra una instantánea de los procesos en ejecución filtrada por la palabra node, incluyendo su PID."
        ],
        answer: "d) ps aux | grep node, porque muestra una instantánea de los procesos en ejecución filtrada por la palabra node, incluyendo su PID."
    },
    {
        question: "Necesitas detener un servidor web que atiende peticiones activas. ¿Cuál es el procedimiento recomendado?",
        options: [
            "a) Usar primero kill -15 (SIGTERM) para permitir una finalización ordenada y recurrir a kill -9 (SIGKILL) solo si el proceso no responde.",
            "b) Usar directamente kill -9, porque es la forma más rápida y segura de liberar el puerto.",
            "c) Usar kill -0, porque es la única señal que cierra conexiones de red abiertas.",
            "d) Reiniciar el servidor completo, ya que no existe forma de detener un proceso individual."
        ],
        answer: "a) Usar primero kill -15 (SIGTERM) para permitir una finalización ordenada y recurrir a kill -9 (SIGKILL) solo si el proceso no responde."
    },
    {
        question: "Tras modificar la configuración de Nginx, el servicio no arranca. ¿Qué secuencia de comandos te permite diagnosticar y resolver el problema?",
        options: [
            "a) top y luego chmod 777 sobre el directorio de configuración.",
            "b) ps aux | grep nginx y luego rm -rf sobre la carpeta del servicio.",
            "c) systemctl status nginx para ver el estado, journalctl -u nginx -n 50 para leer el error concreto y, tras corregirlo, systemctl restart nginx.",
            "d) groups nginx y luego usermod -G nginx, porque los fallos de arranque siempre son de grupos."
        ],
        answer: "c) systemctl status nginx para ver el estado, journalctl -u nginx -n 50 para leer el error concreto y, tras corregirlo, systemctl restart nginx."
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
            '¡Correcto! El primer carácter indica el tipo y los nueve siguientes se leen de tres en tres: usuario, grupo y otros.',
            '¡Exacto! 600 equivale a rw------- : el permiso mínimo necesario para un archivo con credenciales.',
            '¡Muy bien! La opción -a (append) es lo que evita borrar los grupos suplementarios existentes.',
            '¡Perfecto! chown -R asigna usuario y grupo de forma recursiva, sin abrir permisos innecesarios.',
            '¡Correcto! Un usuario de servicio sin shell interactivo limita el daño ante un compromiso de seguridad.',
            '¡Excelente! ps aux | grep node es la forma habitual de localizar el PID de una aplicación Node.js.',
            '¡Muy bien! SIGTERM permite cerrar conexiones y liberar recursos; SIGKILL es siempre el último recurso.',
            '¡Perfecto! status muestra el estado, journalctl explica el error y restart aplica la corrección.'
        ];
        const wrongFeedbacks = [
            'Incorrecto. El guion inicial indica archivo regular, y rw- / r-- / r-- son los permisos de usuario, grupo y otros.',
            'Incorrecto. 644, 755 y 777 permiten que otros usuarios lean el archivo. Para credenciales se usa chmod 600.',
            'Incorrecto. El problema es haber omitido -a: usermod -G reemplaza los grupos suplementarios del usuario.',
            'Incorrecto. Abrir permisos con 777 no es la solución: se debe asignar la propiedad con chown -R www-data:www-data.',
            'Incorrecto. La razón es de seguridad: -s /usr/sbin/nologin impide el inicio de sesión interactivo.',
            'Incorrecto. Para ver los procesos en ejecución y sus PID se usa ps (por ejemplo, ps aux | grep node) o top.',
            'Incorrecto. kill -9 fuerza la terminación y puede dejar recursos inconsistentes: primero se intenta kill -15.',
            'Incorrecto. El diagnóstico de servicios en systemd se hace con systemctl status y journalctl -u, no con rm ni chmod.'
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
