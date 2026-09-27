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

    document.querySelectorAll('.flip-card').forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    const signalCards = document.querySelectorAll('.signal-card');
    const checkSignalLab = document.getElementById('check-signal-lab');
    const resetSignalLab = document.getElementById('reset-signal-lab');
    const signalLabFeedback = document.getElementById('signal-lab-feedback');

    signalCards.forEach((card) => {
        const buttons = card.querySelectorAll('.signal-btn');
        buttons.forEach((button, index) => {
            const optionValue = String.fromCharCode(97 + index);
            button.dataset.value = optionValue;
            button.addEventListener('click', () => {
                buttons.forEach((item) => item.classList.remove('selected'));
                button.classList.add('selected');
                card.dataset.selected = optionValue;
            });
        });
    });

    if (checkSignalLab && resetSignalLab && signalLabFeedback) {
        checkSignalLab.addEventListener('click', () => {
            const unanswered = Array.from(signalCards).some((card) => !card.dataset.selected);

            signalLabFeedback.classList.remove('hidden', 'success', 'error');

            if (unanswered) {
                signalLabFeedback.classList.add('error');
                signalLabFeedback.textContent = 'Selecciona una respuesta en cada caso antes de verificar.';
                return;
            }

            let score = 0;

            signalCards.forEach((card) => {
                const correct = card.dataset.correct;
                const selected = card.dataset.selected;
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

            signalLabFeedback.classList.add(score === signalCards.length ? 'success' : 'error');
            signalLabFeedback.textContent = score === signalCards.length
                ? 'Muy bien. Identificaste correctamente las conductas de escucha activa.'
                : `Obtuviste ${score}/${signalCards.length}. Revisa dónde hubo distracción, anticipación o verificación del mensaje.`;
        });

        resetSignalLab.addEventListener('click', () => {
            signalCards.forEach((card) => {
                delete card.dataset.selected;
                card.classList.remove('success', 'error');
                card.querySelectorAll('.signal-btn').forEach((button) => {
                    button.classList.remove('selected', 'correct', 'incorrect');
                });
            });

            signalLabFeedback.className = 'interactive-feedback hidden mt-4';
            signalLabFeedback.innerHTML = '';
        });
    }

    const listeningCases = document.querySelectorAll('.listening-case');
    const checkListeningLab = document.getElementById('check-listening-lab');
    const resetListeningLab = document.getElementById('reset-listening-lab');
    const listeningLabFeedback = document.getElementById('listening-lab-feedback');

    listeningCases.forEach((caseCard) => {
        const options = caseCard.querySelectorAll('.decision-option');
        options.forEach((option, index) => {
            const optionValue = String.fromCharCode(97 + index);
            option.dataset.value = optionValue;
            option.addEventListener('click', () => {
                options.forEach((item) => item.classList.remove('selected'));
                option.classList.add('selected');
                caseCard.dataset.selected = optionValue;
            });
        });
    });

    if (checkListeningLab && resetListeningLab && listeningLabFeedback) {
        checkListeningLab.addEventListener('click', () => {
            const unanswered = Array.from(listeningCases).some((caseCard) => !caseCard.dataset.selected);

            listeningLabFeedback.classList.remove('hidden', 'success', 'error');

            if (unanswered) {
                listeningLabFeedback.classList.add('error');
                listeningLabFeedback.textContent = 'Selecciona una opción en cada escena antes de verificar.';
                return;
            }

            let score = 0;

            listeningCases.forEach((caseCard) => {
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

            listeningLabFeedback.classList.add(score === listeningCases.length ? 'success' : 'error');
            listeningLabFeedback.textContent = score === listeningCases.length
                ? 'Elegiste intervenciones coherentes con la escucha activa y la aclaración de requerimientos.'
                : `Obtuviste ${score}/${listeningCases.length}. Busca respuestas que primero comprendan y luego orienten la solución.`;
        });

        resetListeningLab.addEventListener('click', () => {
            listeningCases.forEach((caseCard) => {
                delete caseCard.dataset.selected;
                caseCard.classList.remove('success', 'error');
                caseCard.querySelectorAll('.decision-option').forEach((option) => {
                    option.classList.remove('selected', 'correct', 'incorrect');
                });
            });

            listeningLabFeedback.className = 'interactive-feedback hidden mt-4';
            listeningLabFeedback.innerHTML = '';
        });
    }

    const paraphraseEmotion = document.getElementById('paraphrase-emotion');
    const paraphraseNeed = document.getElementById('paraphrase-need');
    const paraphraseStep = document.getElementById('paraphrase-step');
    const generateParaphrase = document.getElementById('generate-paraphrase');
    const clearParaphrase = document.getElementById('clear-paraphrase');
    const paraphrasePreview = document.getElementById('paraphrase-preview');

    const paraphraseContent = {
        emocion: {
            preocupacion: 'Noto que esto te preocupa porque afecta el control diario de tu negocio.',
            frustracion: 'Percibo frustración porque el problema ya te está haciendo perder tiempo y oportunidades.',
            urgencia: 'Veo que es urgente para ti resolverlo pronto para evitar más fallas operativas.'
        },
        necesidad: {
            inventario: 'Lo central ahora es saber con claridad qué productos tienes disponibles.',
            ventas: 'También necesitas identificar cuáles productos se venden más para tomar mejores decisiones.',
            alcance: 'Todavía estás definiendo qué tipo de sistema se ajusta mejor a tu necesidad.'
        },
        paso: {
            ejemplo: '¿Podrías contarme un caso reciente en el que no encontraste la información a tiempo?',
            prioridad: 'Si resolvemos primero una sola necesidad, ¿cuál te genera hoy más dificultad?',
            confirmacion: 'Entonces, hasta aquí entiendo que debemos priorizar visibilidad del inventario y claridad sobre la solución, ¿correcto?'
        }
    };

    if (generateParaphrase && clearParaphrase && paraphrasePreview) {
        generateParaphrase.addEventListener('click', () => {
            const emotion = paraphraseEmotion.value;
            const need = paraphraseNeed.value;
            const step = paraphraseStep.value;

            if (!emotion || !need || !step) {
                paraphrasePreview.className = 'preview-box error-box mt-5';
                paraphrasePreview.classList.remove('hidden');
                paraphrasePreview.innerHTML = '<strong>Faltan datos.</strong><p>Selecciona las tres opciones para construir la respuesta.</p>';
                return;
            }

            paraphrasePreview.className = 'preview-box success-box mt-5';
            paraphrasePreview.classList.remove('hidden');
            paraphrasePreview.innerHTML = `
                <strong>Respuesta sugerida</strong>
                <p>${paraphraseContent.emocion[emotion]} ${paraphraseContent.necesidad[need]}</p>
                <p class="mt-3">${paraphraseContent.paso[step]}</p>
            `;
        });

        clearParaphrase.addEventListener('click', () => {
            paraphraseEmotion.value = '';
            paraphraseNeed.value = '';
            paraphraseStep.value = '';
            paraphrasePreview.className = 'hidden mt-5';
            paraphrasePreview.innerHTML = '';
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
                ? 'Reconoces bien los principios de la escucha activa y su impacto en contextos académicos y tecnológicos.'
                : score >= 3
                    ? 'Vas bien. Refuerza barreras, parafraseo y aplicación práctica en reuniones y requerimientos.'
                    : 'Necesitas repasar el tema, especialmente la diferencia entre oír y escuchar y las técnicas para verificar comprensión.';

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
        if (!imageModal || !modalImage) {
            return;
        }
        modalImage.src = src;
        modalImage.alt = alt;
        imageModal.classList.add('active');
        imageModal.setAttribute('aria-hidden', 'false');
    }

    function closeImageModal() {
        if (!imageModal || !modalImage) {
            return;
        }
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
            const image = container?.querySelector('.expandable-image');
            if (image) {
                openModal(image.src, image.alt);
            }
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
});
