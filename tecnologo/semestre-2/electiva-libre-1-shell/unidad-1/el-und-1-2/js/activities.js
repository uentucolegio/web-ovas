// Actividades Interactivas - Tema 2: pwd, ls, cd, tree
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
            instruction: 'Andrés acaba de abrir la terminal. Muestra en qué directorio se encuentra actualmente.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: "print working directory" — imprime la ruta del directorio de trabajo actual.',
            accept: ['pwd'],
            output: '/home/andres/proyectos/pizzeria-web',
            prompt: 'andres@servidor:~$'
        },
        {
            instruction: 'Lista el contenido del directorio actual para ver qué hay en el proyecto pizzeria-web.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: es un comando de 2 letras que significa "list".',
            accept: ['ls'],
            output: 'backend-laravel  frontend-nextjs  README.md  docker-compose.yml',
            prompt: 'andres@servidor:~/proyectos/pizzeria-web$'
        },
        {
            instruction: 'Muestra el contenido con todos los detalles: permisos, tamaño legible y archivos ocultos.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: combina las opciones -l (detalles), -a (ocultos) y -h (tamaño legible).',
            accept: ['ls -lah', 'ls -lah .', 'ls -alh', 'ls -hal', 'ls -hla', 'ls -lha'],
            output: 'drwxr-xr-x  4 andres andres 4.0K jun 30 09:12 .\ndrwxr-xr-x  6 andres andres 4.0K jun 29 08:40 ..\n-rw-r--r--  1 andres andres  423 jun 29 18:10 .env.local\ndrwxr-xr-x  8 andres andres 4.0K jun 30 09:12 backend-laravel\ndrwxr-xr-x 12 andres andres 4.0K jun 30 09:10 frontend-nextjs',
            prompt: 'andres@servidor:~/proyectos/pizzeria-web$'
        },
        {
            instruction: 'Navega al directorio frontend-nextjs usando una ruta relativa.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: "change directory" seguido del nombre de la carpeta.',
            accept: ['cd frontend-nextjs', 'cd frontend-nextjs/'],
            output: '',
            prompt: 'andres@servidor:~/proyectos/pizzeria-web/frontend-nextjs$'
        },
        {
            instruction: 'Sube un nivel para volver al directorio pizzeria-web.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: ".." representa el directorio padre (un nivel arriba).',
            accept: ['cd ..', 'cd ../'],
            output: '',
            prompt: 'andres@servidor:~/proyectos/pizzeria-web$'
        },
        {
            instruction: 'Andrés navega a /etc/nginx/sites-available. Ahora regresa al directorio anterior sin escribir la ruta completa.',
            hint: '<i class="fa-solid fa-lightbulb text-emerald-500 mr-1"></i> Pista: el guion (-) como argumento de cd regresa al directorio previo automáticamente.',
            accept: ['cd -'],
            output: '/home/andres/proyectos/pizzeria-web',
            prompt: 'andres@servidor:/etc/nginx/sites-available$'
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
        line.innerHTML = text;
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
        termFeedback.innerHTML = msg;
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
                const isCorrect = c.accept.includes(input.trim());

                if (isCorrect) {
                    // Show output (handle multiline)
                    const output = c.output;
                    if (output) {
                        output.split('\n').forEach(line => {
                            addTermLine(line, 'text-white');
                        });
                    }
                    addTermLine('<i class="fa-solid fa-check text-emerald-400 mr-2"></i> ¡Correcto! Comando ejecutado con éxito.', 'text-emerald-400');

                    completedChallenges++;
                    currentChallenge++;
                    updateTermProgress();
                    showTermFeedback('<i class="fa-solid fa-circle-check mr-2"></i> ¡Bien hecho!', 'bg-green-100 text-green-800 border-2 border-green-300');

                    if (completedChallenges === challenges.length) {
                        addTermLine('', '');
                        addTermLine('<i class="fa-solid fa-trophy mr-2 text-yellow-400"></i> ¡FELICIDADES! Has completado todos los retos.', 'text-yellow-400');
                        addTermLine('Ya dominas los comandos de navegación: pwd, ls, cd y tree.', 'text-yellow-300');
                        showTermFeedback('<i class="fa-solid fa-award mr-2"></i> ¡COMPLETADO! Dominas la navegación en Linux.', 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300');
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
    // ACTIVIDAD 2: RELACIONA COMANDO CON FUNCIÓN
    // ==========================================
    const fsBank = document.getElementById('fs-bank');
    const fsProgress = document.getElementById('fs-progress');
    const fsScore = document.getElementById('fs-score');
    const fsFeedback = document.getElementById('fs-feedback');
    const fsResetBtn = document.getElementById('fs-reset-btn');

    const cmdItems = [
        { name: 'pwd',      icon: '<i class="fa-solid fa-location-dot text-sky-600"></i>' },
        { name: 'ls -a',    icon: '<i class="fa-solid fa-eye text-sky-600"></i>' },
        { name: 'ls -l',    icon: '<i class="fa-solid fa-list text-sky-600"></i>' },
        { name: 'cd ..',    icon: '<i class="fa-solid fa-arrow-up text-sky-600"></i>' },
        { name: 'tree -L 2',icon: '<i class="fa-solid fa-sitemap text-sky-600"></i>' },
        { name: 'ls -t',    icon: '<i class="fa-solid fa-clock text-sky-600"></i>' },
        { name: 'cd -',     icon: '<i class="fa-solid fa-rotate-left text-sky-600"></i>' },
        { name: 'pwd -P',   icon: '<i class="fa-solid fa-link text-sky-600"></i>' }
    ];

    // Alias: fsDirectories kept for reuse of existing HTML/JS infrastructure
    const fsDirectories = cmdItems;

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

        // Hide home children (kept for structure compatibility)
        const homeChildren = document.getElementById('fs-home-children');
        if (homeChildren) homeChildren.style.display = 'none';

        updateFsProgress();
        showFsFeedback('', '');

        // Shuffle items and create draggables
        const shuffled = [...fsDirectories].sort(() => Math.random() - 0.5);
        shuffled.forEach(dir => {
            const item = document.createElement('div');
            item.className = 'fs-drag-item';
            item.setAttribute('draggable', 'true');
            item.dataset.dir = dir.name;
            item.innerHTML = `<span class="mr-1">${dir.icon}</span> <span class="font-bold font-mono">${dir.name}</span>`;

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
                if (item.classList.contains('fs-selected')) {
                    item.classList.remove('fs-selected');
                    draggedFsItem = null;
                    return;
                }
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
            const icon = fsDirectories.find(d => d.name === dropped)?.icon || '<i class="fa-solid fa-terminal text-green-400"></i>';
            const greenIcon = icon.replace('text-sky-600', 'text-green-400');
            slot.innerHTML = `<span class="mr-1">${greenIcon}</span> <span class="font-bold text-green-400 font-mono">${dropped}</span>`;
            slot.classList.add('fs-correct');
            slot.classList.remove('fs-incorrect');

            draggedFsItem.classList.add('fs-placed');
            draggedFsItem.classList.remove('fs-selected', 'dragging');
            draggedFsItem.setAttribute('draggable', 'false');
            draggedFsItem = null;

            fsMatchesFound++;
            updateFsProgress();
            showFsFeedback('<i class="fa-solid fa-circle-check mr-2"></i> ¡Correcto!', 'bg-green-100 text-green-800 border-2 border-green-300');

            if (fsMatchesFound === fsTotalSlots) {
                setTimeout(() => {
                    showFsFeedback('<i class="fa-solid fa-award mr-2"></i> ¡COMPLETADO! Relacionaste todos los comandos con su función.', 'bg-sky-100 text-sky-800 border-2 border-sky-300');
                }, 400);
            }
        } else {
            slot.classList.add('fs-incorrect');
            showFsFeedback(`<i class="fa-solid fa-circle-exclamation mr-2"></i> "${dropped}" no corresponde aquí. Revisa la descripción.`, 'bg-red-100 text-red-800 border-2 border-red-300');
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
        fsFeedback.innerHTML = msg;
        fsFeedback.className = `mt-4 text-center font-bold text-sm sm:text-lg h-10 transition-all flex items-center justify-center rounded-lg ${classes}`;
    }

    if (fsResetBtn) {
        fsResetBtn.addEventListener('click', initFilesystem);
    }

    if (fsBank) {
        initFilesystem();
    }
});