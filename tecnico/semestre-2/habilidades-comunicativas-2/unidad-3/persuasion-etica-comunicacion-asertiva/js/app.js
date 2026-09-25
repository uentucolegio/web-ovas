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

    document.querySelectorAll('[data-choice-group]').forEach((group) => {
        const buttons = group.querySelectorAll('.choice-card');
        const feedback = document.getElementById(group.dataset.feedback);

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                buttons.forEach((item) => item.classList.remove('correct', 'incorrect'));

                const isCorrect = button.dataset.correct === 'true';
                button.classList.add(isCorrect ? 'correct' : 'incorrect');

                if (feedback) {
                    feedback.classList.remove('hidden', 'success', 'error');
                    feedback.classList.add(isCorrect ? 'success' : 'error');
                    feedback.textContent = isCorrect
                        ? 'Correcto. Esa opción persuade con respeto y argumentos verificables.'
                        : 'Revisa de nuevo. La persuasión ética no impone ni presiona.';
                }
            });
        });
    });

    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    const signalCards = document.querySelectorAll('.signal-card');
    const checkEthicsLab = document.getElementById('check-ethics-lab');
    const resetEthicsLab = document.getElementById('reset-ethics-lab');
    const ethicsLabFeedback = document.getElementById('ethics-lab-feedback');

    signalCards.forEach((card) => {
        const buttons = card.querySelectorAll('.signal-btn');
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                buttons.forEach((item) => item.classList.remove('selected'));
                button.classList.add('selected');
                card.dataset.selected = button.dataset.value;
            });
        });
    });

    if (checkEthicsLab && resetEthicsLab && ethicsLabFeedback) {
        checkEthicsLab.addEventListener('click', () => {
            const unanswered = Array.from(signalCards).some((card) => !card.dataset.selected);
            if (unanswered) {
                ethicsLabFeedback.classList.remove('hidden', 'success', 'error');
                ethicsLabFeedback.classList.add('error');
                ethicsLabFeedback.textContent = 'Completa todos los casos del semáforo antes de verificar.';
                return;
            }

            let score = 0;

            signalCards.forEach((card) => {
                const selected = card.dataset.selected;
                const correct = card.dataset.answer;
                const buttons = card.querySelectorAll('.signal-btn');

                card.classList.remove('success', 'error');

                buttons.forEach((button) => {
                    button.classList.remove('correct', 'incorrect');
                    if (button.dataset.value === correct) {
                        button.classList.add('correct');
                    } else if (button.dataset.value === selected && selected !== correct) {
                        button.classList.add('incorrect');
                    }
                });

                if (selected === correct) {
                    score += 1;
                    card.classList.add('success');
                } else {
                    card.classList.add('error');
                }
            });

            ethicsLabFeedback.classList.remove('hidden', 'success', 'error');
            ethicsLabFeedback.classList.add(score === signalCards.length ? 'success' : 'error');
            ethicsLabFeedback.textContent = score === signalCards.length
                ? 'Clasificaste correctamente todas las situaciones del semáforo ético.'
                : `Obtuviste ${score}/${signalCards.length}. Revisa dónde faltó transparencia, evidencia o respeto por la decisión ajena.`;
        });

        resetEthicsLab.addEventListener('click', () => {
            signalCards.forEach((card) => {
                delete card.dataset.selected;
                card.classList.remove('success', 'error');
                card.querySelectorAll('.signal-btn').forEach((button) => {
                    button.classList.remove('selected', 'correct', 'incorrect');
                });
            });

            ethicsLabFeedback.classList.add('hidden');
            ethicsLabFeedback.innerHTML = '';
        });
    }

    const pitchAudience = document.getElementById('pitch-audience');
    const pitchPurpose = document.getElementById('pitch-purpose');
    const pitchEvidence = document.getElementById('pitch-evidence');
    const pitchTone = document.getElementById('pitch-tone');
    const generatePitch = document.getElementById('generate-pitch');
    const clearPitch = document.getElementById('clear-pitch');
    const pitchPreview = document.getElementById('pitch-preview');

    if (generatePitch && clearPitch && pitchPreview) {
        generatePitch.addEventListener('click', () => {
            const values = [
                pitchAudience.value,
                pitchPurpose.value,
                pitchEvidence.value,
                pitchTone.value,
            ];

            if (values.some((value) => !value)) {
                pitchPreview.className = 'preview-box error-box mt-5';
                pitchPreview.classList.remove('hidden');
                pitchPreview.innerHTML = '<strong>Faltan decisiones.</strong><p>Selecciona audiencia, propósito, evidencia y tono para construir la apertura.</p>';
                return;
            }

            pitchPreview.className = 'preview-box success-box mt-5';
            pitchPreview.classList.remove('hidden');
            pitchPreview.innerHTML = `
                <strong>Apertura sugerida</strong>
                <p>Hoy quiero dirigirme ${values[0]} para ${values[1]}, porque contamos con ${values[2]}. Voy a presentarlo con un tono ${values[3]} para facilitar el acuerdo y tomar una decisión informada.</p>
            `;
        });

        clearPitch.addEventListener('click', () => {
            [pitchAudience, pitchPurpose, pitchEvidence, pitchTone].forEach((field) => {
                field.value = '';
            });
            pitchPreview.classList.add('hidden');
            pitchPreview.innerHTML = '';
        });
    }

    const decisionCases = document.querySelectorAll('.decision-case');
    const checkDecisionLab = document.getElementById('check-decision-lab');
    const resetDecisionLab = document.getElementById('reset-decision-lab');
    const decisionLabFeedback = document.getElementById('decision-lab-feedback');

    decisionCases.forEach((caseCard) => {
        const options = caseCard.querySelectorAll('.decision-option');
        options.forEach((option) => {
            option.addEventListener('click', () => {
                options.forEach((item) => item.classList.remove('selected'));
                option.classList.add('selected');
                caseCard.dataset.selected = option.dataset.value;
            });
        });
    });

    if (checkDecisionLab && resetDecisionLab && decisionLabFeedback) {
        checkDecisionLab.addEventListener('click', () => {
            const unanswered = Array.from(decisionCases).some((caseCard) => !caseCard.dataset.selected);
            if (unanswered) {
                decisionLabFeedback.classList.remove('hidden', 'success', 'error');
                decisionLabFeedback.classList.add('error');
                decisionLabFeedback.textContent = 'Selecciona una respuesta en cada escena antes de verificar.';
                return;
            }

            let score = 0;

            decisionCases.forEach((caseCard) => {
                const correct = caseCard.dataset.correct;
                const selected = caseCard.dataset.selected;
                const options = caseCard.querySelectorAll('.decision-option');

                caseCard.classList.remove('success', 'error');

                options.forEach((option) => {
                    option.classList.remove('correct', 'incorrect');
                    if (option.dataset.value === correct) {
                        option.classList.add('correct');
                    } else if (option.dataset.value === selected && selected !== correct) {
                        option.classList.add('incorrect');
                    }
                });

                if (selected === correct) {
                    score += 1;
                    caseCard.classList.add('success');
                } else {
                    caseCard.classList.add('error');
                }
            });

            decisionLabFeedback.classList.remove('hidden', 'success', 'error');
            decisionLabFeedback.classList.add(score === decisionCases.length ? 'success' : 'error');
            decisionLabFeedback.textContent = score === decisionCases.length
                ? 'Elegiste las respuestas más asertivas en todas las escenas.'
                : `Obtuviste ${score}/${decisionCases.length}. Revisa cuáles opciones expresan el problema sin atacar ni evadirlo.`;
        });

        resetDecisionLab.addEventListener('click', () => {
            decisionCases.forEach((caseCard) => {
                delete caseCard.dataset.selected;
                caseCard.classList.remove('success', 'error');
                caseCard.querySelectorAll('.decision-option').forEach((option) => {
                    option.classList.remove('selected', 'correct', 'incorrect');
                });
            });

            decisionLabFeedback.classList.add('hidden');
            decisionLabFeedback.innerHTML = '';
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

    if (finishQuiz && resetQuiz && quizResult) {
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
                ? 'Dominas bien la diferencia entre persuadir éticamente y comunicar con asertividad.'
                : score >= 3
                    ? 'Vas bien. Revisa estilos de comunicación y uso de la persuasión ética para reforzar el tema.'
                    : 'Necesitas repasar el contenido, especialmente manipulación, asertividad y construcción de acuerdos.';

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
    }

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

    if (closeModal) {
        closeModal.addEventListener('click', closeImageModal);
    }

    if (imageModal) {
        imageModal.addEventListener('click', (event) => {
            if (event.target === imageModal) {
                closeImageModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal?.classList.contains('active')) {
            closeImageModal();
        }
    });
});
