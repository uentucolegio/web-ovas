document.addEventListener('DOMContentLoaded', () => {
    const moduleTabs = document.querySelectorAll('.module-tab');
    const modulePanels = document.querySelectorAll('.module-panel');

    function switchModule(moduleId) {
        moduleTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.module === moduleId);
        });

        modulePanels.forEach((panel) => {
            panel.classList.toggle('active', panel.id === moduleId);
        });
    }

    moduleTabs.forEach((tab) => {
        tab.addEventListener('click', () => switchModule(tab.dataset.module));
    });

    const quickChoiceButtons = document.querySelectorAll('#quick-argument-check .choice-card');
    const quickFeedback = document.getElementById('quick-argument-feedback');

    quickChoiceButtons.forEach((button) => {
        button.addEventListener('click', () => {
            quickChoiceButtons.forEach((item) => {
                item.classList.remove('correct', 'incorrect');
            });

            const isCorrect = button.dataset.correct === 'true';
            button.classList.add(isCorrect ? 'correct' : 'incorrect');
            quickFeedback.classList.remove('hidden', 'success', 'error');
            quickFeedback.classList.add(isCorrect ? 'success' : 'error');
            quickFeedback.textContent = isCorrect
                ? 'Correcto. Un argumento incluye una postura y una razón que la respalda.'
                : 'Todavía no. Un argumento necesita justificar la idea, no solo opinar.';
        });
    });

    const sequenceOrder = ['Tesis', 'Razón', 'Ejemplo', 'Conclusión'];
    const sequenceButtons = document.querySelectorAll('.sequence-card');
    const sequenceSelected = document.querySelector('#sequence-selected span');
    const sequenceFeedback = document.getElementById('sequence-feedback');
    const checkSequence = document.getElementById('check-sequence');
    const resetSequence = document.getElementById('reset-sequence');
    let currentSequence = [];

    function renderSequence() {
        sequenceSelected.textContent = currentSequence.length ? currentSequence.join(' → ') : 'Vacía';
    }

    sequenceButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;
            if (currentSequence.includes(value)) {
                return;
            }

            currentSequence.push(value);
            button.disabled = true;
            button.classList.add('selected');
            renderSequence();
        });
    });

    checkSequence.addEventListener('click', () => {
        const isComplete = currentSequence.length === sequenceOrder.length;
        const isCorrect = isComplete && currentSequence.every((item, index) => item === sequenceOrder[index]);

        sequenceFeedback.classList.remove('hidden', 'success', 'error');
        sequenceFeedback.classList.add(isCorrect ? 'success' : 'error');
        sequenceFeedback.textContent = isCorrect
            ? 'Muy bien. La estructura quedó ordenada de forma lógica.'
            : isComplete
                ? 'La secuencia no es correcta. Revisa el orden y vuelve a intentarlo.'
                : 'Aún faltan elementos por ubicar antes de verificar.';
    });

    resetSequence.addEventListener('click', () => {
        currentSequence = [];
        renderSequence();
        sequenceFeedback.classList.add('hidden');
        sequenceFeedback.classList.remove('success', 'error');
        sequenceButtons.forEach((button) => {
            button.disabled = false;
            button.classList.remove('selected');
        });
    });

    const connectorButton = document.getElementById('check-connectors');
    const connectorSelects = document.querySelectorAll('.practice-select');
    const connectorsFeedback = document.getElementById('connectors-feedback');

    connectorButton.addEventListener('click', () => {
        let correctCount = 0;

        connectorSelects.forEach((select) => {
            const isCorrect = select.value === select.dataset.answer;
            select.classList.remove('correct', 'incorrect');
            select.classList.add(isCorrect ? 'correct' : 'incorrect');
            if (isCorrect) {
                correctCount += 1;
            }
        });

        connectorsFeedback.classList.remove('hidden', 'success', 'error');
        connectorsFeedback.classList.add(correctCount === connectorSelects.length ? 'success' : 'error');
        connectorsFeedback.textContent = correctCount === connectorSelects.length
            ? 'Excelente. Elegiste conectores coherentes con la intención del mensaje.'
            : `Obtuviste ${correctCount}/${connectorSelects.length}. Revisa cuál conector introduce causa, ejemplo o conclusión.`;
    });

    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    const fieldTesis = document.getElementById('field-tesis');
    const fieldRazon = document.getElementById('field-razon');
    const fieldEjemplo = document.getElementById('field-ejemplo');
    const fieldConclusion = document.getElementById('field-conclusion');
    const generateArgument = document.getElementById('generate-argument');
    const clearArgument = document.getElementById('clear-argument');
    const argumentPreview = document.getElementById('argument-preview');

    generateArgument.addEventListener('click', () => {
        const values = [
            fieldTesis.value.trim(),
            fieldRazon.value.trim(),
            fieldEjemplo.value.trim(),
            fieldConclusion.value.trim(),
        ];

        if (values.some((value) => !value)) {
            argumentPreview.className = 'preview-box error-box mt-5';
            argumentPreview.classList.remove('hidden');
            argumentPreview.innerHTML = '<strong>Completa todos los campos.</strong><p>Necesitas tesis, razón, ejemplo y conclusión para generar el borrador.</p>';
            return;
        }

        argumentPreview.className = 'preview-box success-box mt-5';
        argumentPreview.classList.remove('hidden');
        argumentPreview.innerHTML = `
            <strong>Borrador generado</strong>
            <p>${values[0]} ${values[1]} ${values[2]} ${values[3]}</p>
        `;
    });

    clearArgument.addEventListener('click', () => {
        [fieldTesis, fieldRazon, fieldEjemplo, fieldConclusion].forEach((field) => {
            field.value = '';
        });
        argumentPreview.classList.add('hidden');
        argumentPreview.innerHTML = '';
    });

    const activityPartButton = document.getElementById('check-activity-parts');
    const activityPartSelects = document.querySelectorAll('.activity-part-select');
    const activityPartsFeedback = document.getElementById('activity-parts-feedback');

    if (activityPartButton && activityPartsFeedback) {
        activityPartButton.addEventListener('click', () => {
            let correctCount = 0;

            activityPartSelects.forEach((select) => {
                const isCorrect = select.value === select.dataset.answer;
                select.classList.remove('correct', 'incorrect');
                select.classList.add(isCorrect ? 'correct' : 'incorrect');
                if (isCorrect) {
                    correctCount += 1;
                }
            });

            activityPartsFeedback.classList.remove('hidden', 'success', 'error');
            activityPartsFeedback.classList.add(correctCount === activityPartSelects.length ? 'success' : 'error');
            activityPartsFeedback.textContent = correctCount === activityPartSelects.length
                ? 'Muy bien. Identificaste correctamente cada parte del argumento.'
                : `Obtuviste ${correctCount}/${activityPartSelects.length}. Revisa el orden lógico entre tesis, razón, ejemplo y conclusión.`;
        });
    }

    const quizCards = document.querySelectorAll('.quiz-card');
    const finishQuiz = document.getElementById('finish-quiz');
    const resetQuiz = document.getElementById('reset-quiz');
    const quizResult = document.getElementById('quiz-result');

    quizCards.forEach((card) => {
        const options = card.querySelectorAll('.quiz-option');
        options.forEach((option) => {
            option.addEventListener('click', () => {
                options.forEach((item) => item.classList.remove('selected'));
                option.classList.add('selected');
                card.dataset.selected = option.dataset.option;
            });
        });
    });

    finishQuiz.addEventListener('click', () => {
        let score = 0;

        quizCards.forEach((card) => {
            const correct = card.dataset.correct;
            const selected = card.dataset.selected;
            const options = card.querySelectorAll('.quiz-option');

            options.forEach((option) => {
                option.classList.remove('correct', 'incorrect');
                if (option.dataset.option === correct) {
                    option.classList.add('correct');
                } else if (selected && option.dataset.option === selected && selected !== correct) {
                    option.classList.add('incorrect');
                }
            });

            if (selected === correct) {
                score += 1;
            }
        });

        const message = score === quizCards.length
            ? 'Dominas muy bien la estructura de la argumentación.'
            : score >= 3
                ? 'Vas bien. Revisa las preguntas marcadas y fortalece tu justificación.'
                : 'Necesitas repasar el contenido, especialmente estructura y aplicación en contexto.';

        quizResult.className = `preview-box ${score === quizCards.length ? 'success-box' : score >= 3 ? 'warning-box' : 'error-box'} mt-5`;
        quizResult.classList.remove('hidden');
        quizResult.innerHTML = `<strong>Puntaje: ${score}/${quizCards.length}</strong><p>${message}</p>`;
    });

    resetQuiz.addEventListener('click', () => {
        quizCards.forEach((card) => {
            delete card.dataset.selected;
            card.querySelectorAll('.quiz-option').forEach((option) => {
                option.classList.remove('selected', 'correct', 'incorrect');
            });
        });

        quizResult.classList.add('hidden');
        quizResult.innerHTML = '';
    });

    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
    const expandableImages = document.querySelectorAll('.expandable-image');
    const expandButtons = document.querySelectorAll('.expand-btn');

    function openModal(src, alt) {
        modalImage.src = src;
        modalImage.alt = alt;
        imageModal.classList.add('active');
        imageModal.setAttribute('aria-hidden', 'false');
    }

    function closeImageModal() {
        imageModal.classList.remove('active');
        imageModal.setAttribute('aria-hidden', 'true');
        modalImage.src = '';
        modalImage.alt = '';
    }

    expandableImages.forEach((image) => {
        image.addEventListener('click', () => openModal(image.src, image.alt));
    });

    expandButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const container = event.currentTarget.closest('.image-container');
            const image = container.querySelector('.expandable-image');
            openModal(image.src, image.alt);
        });
    });

    closeModal.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeImageModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });
});
