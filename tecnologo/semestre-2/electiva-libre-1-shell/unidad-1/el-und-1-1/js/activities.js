// Actividades Interactivas - GNU/Linux
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ACTIVIDAD 1: SIMULADOR DE TERMINAL LINUX
    // ==========================================
    const termInput = document.getElementById('term-input');
    const termBody = document.getElementById('term-body');
    const termChallengeNum = document.getElementById('term-challenge-num');
    const termChallengeTotal = document.getElementById('term-challenge-total');
    const termChallengeText = document.getElementById('term-challenge-text');
    const termChallengeHint = document.getElementById('term-challenge-hint');
    const termProgress = document.getElementById('term-progress');
    const termScore = document.getElementById('term-score');
    const termFeedback = document.getElementById('term-feedback');
    const termResetBtn = document.getElementById('term-reset-btn');
    const termPrompt = document.getElementById('term-prompt');

    const challenges = [
        {
            instruction: 'Averigua qué usuario ha iniciado sesión. ¿Qué comando usarías?',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: el comando significa "¿quién soy?" en inglés.',
            accept: ['whoami'],
            output: 'estudiante',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Muestra el directorio en el que te encuentras actualmente.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: "print working directory" — muestra la ruta del directorio actual.',
            accept: ['pwd'],
            output: '/home/estudiante',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Lista los archivos y carpetas del directorio actual.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: es un comando de 2 letras que significa "list".',
            accept: ['ls'],
            output: 'Documentos  Descargas  Escritorio  Imágenes  Música  Videos  proyecto.py',
            prompt: 'estudiante@linux:~$'
        },
        {
            instruction: 'Navega al directorio "Documentos".',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: "change directory" seguido del nombre de la carpeta.',
            accept: ['cd Documentos', 'cd Documentos/'],
            output: '',
            prompt: 'estudiante@linux:~/Documentos$'
        },
        {
            instruction: 'Muestra el nombre y la información del sistema operativo.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: "Unix name" — prueba con la opción -a para ver toda la info.',
            accept: ['uname', 'uname -a', 'uname -r', 'uname -s'],
            output: 'Linux linux-pc 6.5.0-generic #42-Ubuntu SMP x86_64 GNU/Linux',
            prompt: 'estudiante@linux:~/Documentos$'
        },
        {
            instruction: 'Muestra un mensaje de bienvenida usando el comando echo.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: escribe echo seguido del mensaje entre comillas.',
            accept: ['echo'],
            output: null, // will be dynamic based on input
            prompt: 'estudiante@linux:~/Documentos$'
        }
    ];

    let currentChallenge = 0;
    let completedChallenges = 0;

    function initTerminal() {
        if (!termInput) return;
        currentChallenge = 0;
        completedChallenges = 0;
        termBody.innerHTML = `
            <div class="term-line text-slate-400">Bienvenido a la Terminal Linux simulada <i class="fa-brands fa-linux text-emerald-400 ml-1"></i></div>
            <div class="term-line text-slate-400">Escribe el comando que se te indica en el reto.</div>
            <div class="term-line text-slate-400">───────────────────────────────────────────</div>
        `;
        termInput.value = '';
        termInput.disabled = false;
        updateTermChallenge();
        updateTermProgress();
        showTermFeedback('', '');
    }

    function updateTermChallenge() {
        if (currentChallenge >= challenges.length) {
            termChallengeText.innerHTML = '<i class="fa-solid fa-flag-checkered text-emerald-600 mr-2"></i> ¡Has completado todos los retos!';
            termChallengeHint.textContent = '';
            termChallengeNum.textContent = challenges.length;
            termInput.disabled = true;
            termInput.placeholder = '¡Terminal completada!';
            return;
        }
        const c = challenges[currentChallenge];
        termChallengeNum.textContent = currentChallenge + 1;
        termChallengeTotal.textContent = challenges.length;
        termChallengeText.textContent = c.instruction;
        termChallengeHint.innerHTML = c.hint;
        termPrompt.textContent = c.prompt;
    }

    function addTermLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `term-line ${className}`;
        line.innerHTML = text; // Permite HTML como iconos
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
    }

    function updateTermProgress() {
        const percent = (completedChallenges / challenges.length) * 100;
        if (termProgress) {
            termProgress.style.width = `${percent}%`;
            termProgress.textContent = percent > 0 ? `${Math.round(percent)}%` : '';
        }
        if (termScore) {
            termScore.textContent = `${completedChallenges}/${challenges.length}`;
        }
    }

    function showTermFeedback(msg, classes) {
        if (!termFeedback) return;
        termFeedback.innerHTML = msg; // Permite íconos
        termFeedback.className = `mt-4 text-center font-bold text-sm sm:text-lg h-10 transition-all flex items-center justify-center rounded-lg ${classes}`;
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const input = termInput.value.trim();
                if (!input || currentChallenge >= challenges.length) return;

                const c = challenges[currentChallenge];

                // Show user command in terminal
                addTermLine(`${c.prompt} ${input}`, 'text-green-400');

                // Check if command matches
                let isCorrect = false;
                if (currentChallenge === 5) {
                    // echo - accept any echo command
                    isCorrect = input.toLowerCase().startsWith('echo');
                } else {
                    isCorrect = c.accept.includes(input.trim());
                }

                if (isCorrect) {
                    // Show output
                    let output = c.output;
                    if (currentChallenge === 5) {
                        // For echo, show what they typed
                        const echoContent = input.replace(/^echo\s*/i, '').replace(/^["']|["']$/g, '');
                        output = echoContent || '(sin mensaje)';
                    }
                    if (output) {
                        addTermLine(output, 'text-white');
                    }
                    addTermLine('<i class="fa-solid fa-check text-emerald-400 mr-2"></i> ¡Correcto! Comando ejecutado con éxito.', 'text-emerald-400');

                    completedChallenges++;
                    currentChallenge++;
                    updateTermProgress();
                    showTermFeedback('<i class="fa-solid fa-circle-check mr-2"></i> ¡Bien hecho!', 'bg-green-100 text-green-800 border-2 border-green-300');

                    if (completedChallenges === challenges.length) {
                        addTermLine('', '');
                        addTermLine('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡FELICIDADES! Has completado todos los retos.', 'text-yellow-400');
                        addTermLine('Ya sabes utilizar comandos básicos en la terminal Linux.', 'text-yellow-300');
                        showTermFeedback('<i class="fa-solid fa-award mr-2"></i> ¡COMPLETADO! Dominaste la terminal Linux.', 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300');
                    } else {
                        addTermLine('───────────────────────────────────────────', 'text-slate-600');
                    }
                    updateTermChallenge();
                } else {
                    // Wrong command
                    addTermLine(`bash: ${input}: comando no reconocido o incorrecto para este reto.`, 'text-red-400');
                    showTermFeedback('<i class="fa-solid fa-circle-xmark mr-2"></i> Mmm, intenta de nuevo.', 'bg-red-100 text-red-800 border-2 border-red-300');
                }

                termInput.value = '';
            }
        });
    }

    if (termResetBtn) {
        termResetBtn.addEventListener('click', initTerminal);
    }

    if (termInput) {
        initTerminal();
    }


    // ==========================================
    // ACTIVIDAD 2: CONSTRUIR SISTEMA DE ARCHIVOS
    // ==========================================
    const fsBank = document.getElementById('fs-bank');
    const fsProgress = document.getElementById('fs-progress');
    const fsScore = document.getElementById('fs-score');
    const fsFeedback = document.getElementById('fs-feedback');
    const fsResetBtn = document.getElementById('fs-reset-btn');

    const fsDirectories = [
        { name: 'bin', icon: '<i class="fa-solid fa-gear text-sky-600"></i>' },
        { name: 'etc', icon: '<i class="fa-solid fa-wrench text-sky-600"></i>' },
        { name: 'home', icon: '<i class="fa-solid fa-house-user text-sky-600"></i>' },
        { name: 'tmp', icon: '<i class="fa-solid fa-hourglass-half text-sky-600"></i>' },
        { name: 'var', icon: '<i class="fa-solid fa-chart-column text-sky-600"></i>' },
        { name: 'usr', icon: '<i class="fa-solid fa-box-open text-sky-600"></i>' },
        { name: 'root', icon: '<i class="fa-solid fa-crown text-sky-600"></i>' },
        { name: 'dev', icon: '<i class="fa-solid fa-microchip text-sky-600"></i>' }
    ];

    let fsMatchesFound = 0;
    const fsTotalSlots = fsDirectories.length;
    let draggedFsItem = null;

    function initFilesystem() {
        if (!fsBank) return;
        fsBank.innerHTML = '';
        fsMatchesFound = 0;
        draggedFsItem = null;

        // Reset all slots
        document.querySelectorAll('.fs-drop-slot').forEach(slot => {
            slot.innerHTML = '<span class="slot-placeholder"><i class="fa-solid fa-question text-slate-400"></i></span>';
            slot.classList.remove('fs-correct', 'fs-incorrect');
        });

        // Hide home children
        const homeChildren = document.getElementById('fs-home-children');
        if (homeChildren) homeChildren.style.display = 'none';

        updateFsProgress();
        showFsFeedback('', '');

        // Shuffle directories and create draggables
        const shuffled = [...fsDirectories].sort(() => Math.random() - 0.5);
        shuffled.forEach(dir => {
            const item = document.createElement('div');
            item.className = 'fs-drag-item';
            item.setAttribute('draggable', 'true');
            item.dataset.dir = dir.name;
            item.innerHTML = `<span class="mr-1">${dir.icon}</span> <span class="font-bold">${dir.name}/</span>`;

            item.addEventListener('dragstart', (e) => {
                if (item.classList.contains('fs-placed')) return;
                draggedFsItem = item;
                setTimeout(() => item.classList.add('dragging'), 0);
                e.dataTransfer.effectAllowed = 'move';
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                draggedFsItem = null;
            });

            // Touch support
            item.addEventListener('touchstart', (e) => {
                if (item.classList.contains('fs-placed')) return;
                draggedFsItem = item;
                item.classList.add('dragging');
            }, { passive: true });

            item.addEventListener('touchend', () => {
                item.classList.remove('dragging');
            });

            // Click support for mobile
            item.addEventListener('click', () => {
                if (item.classList.contains('fs-placed')) return;

                // If already selected, deselect
                if (item.classList.contains('fs-selected')) {
                    item.classList.remove('fs-selected');
                    draggedFsItem = null;
                    return;
                }

                // Deselect all others
                document.querySelectorAll('.fs-drag-item.fs-selected').forEach(i => i.classList.remove('fs-selected'));
                item.classList.add('fs-selected');
                draggedFsItem = item;
            });

            fsBank.appendChild(item);
        });

        // Initialize drop slots
        document.querySelectorAll('.fs-drop-slot').forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.classList.add('fs-slot-hover');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('fs-slot-hover');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('fs-slot-hover');
                handleFsDrop(slot);
            });

            // Click support for mobile
            slot.addEventListener('click', () => {
                if (draggedFsItem && !slot.classList.contains('fs-correct')) {
                    handleFsDrop(slot);
                }
            });
        });
    }

    function handleFsDrop(slot) {
        if (!draggedFsItem || slot.classList.contains('fs-correct')) return;

        const expected = slot.dataset.expect;
        const dropped = draggedFsItem.dataset.dir;

        if (dropped === expected) {
            // Correct!
            const icon = fsDirectories.find(d => d.name === dropped)?.icon || '<i class="fa-solid fa-folder text-green-400"></i>';
            // Modificamos el icono a color verde
            const greenIcon = icon.replace('text-sky-600', 'text-green-400');
            slot.innerHTML = `<span class="mr-1">${greenIcon}</span> <span class="font-bold text-green-400">${dropped}/</span>`;
            slot.classList.add('fs-correct');
            slot.classList.remove('fs-incorrect');

            draggedFsItem.classList.add('fs-placed');
            draggedFsItem.classList.remove('fs-selected', 'dragging');
            draggedFsItem.setAttribute('draggable', 'false');
            draggedFsItem = null;

            fsMatchesFound++;
            updateFsProgress();
            showFsFeedback('<i class="fa-solid fa-circle-check mr-2"></i> ¡Correcto!', 'bg-green-100 text-green-800 border-2 border-green-300');

            // Show home children when home is placed
            if (dropped === 'home') {
                const homeChildren = document.getElementById('fs-home-children');
                if (homeChildren) {
                    homeChildren.style.display = 'block';
                    homeChildren.style.animation = 'fadeSlide 0.4s ease';
                }
            }

            if (fsMatchesFound === fsTotalSlots) {
                setTimeout(() => {
                    showFsFeedback('<i class="fa-solid fa-award mr-2"></i> ¡COMPLETADO! Has reconstruido el sistema de archivos Linux.', 'bg-sky-100 text-sky-800 border-2 border-sky-300');
                }, 400);
            }
        } else {
            // Incorrect
            slot.classList.add('fs-incorrect');
            showFsFeedback(`<i class="fa-solid fa-circle-exclamation mr-2"></i> "${dropped}/" no va aquí. Lee la descripción.`, 'bg-red-100 text-red-800 border-2 border-red-300');
            setTimeout(() => {
                slot.classList.remove('fs-incorrect');
            }, 800);
        }
    }

    function updateFsProgress() {
        const percent = (fsMatchesFound / fsTotalSlots) * 100;
        if (fsProgress) {
            fsProgress.style.width = `${percent}%`;
            fsProgress.textContent = percent > 0 ? `${Math.round(percent)}%` : '';
        }
        if (fsScore) {
            fsScore.textContent = `${fsMatchesFound}/${fsTotalSlots}`;
        }
    }

    function showFsFeedback(msg, classes) {
        if (!fsFeedback) return;
        fsFeedback.innerHTML = msg; // Permite HTML como íconos
        fsFeedback.className = `mt-4 text-center font-bold text-sm sm:text-lg h-10 transition-all flex items-center justify-center rounded-lg ${classes}`;
    }

    if (fsResetBtn) {
        fsResetBtn.addEventListener('click', initFilesystem);
    }

    if (fsBank) {
        initFilesystem();
    }
});