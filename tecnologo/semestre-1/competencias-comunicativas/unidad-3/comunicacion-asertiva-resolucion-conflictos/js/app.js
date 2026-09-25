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

    const styleCards = document.querySelectorAll('.style-card');
    const checkStyleLab = document.getElementById('check-style-lab');
    const resetStyleLab = document.getElementById('reset-style-lab');
    const styleLabFeedback = document.getElementById('style-lab-feedback');

    styleCards.forEach((card) => {
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

    if (checkStyleLab && resetStyleLab && styleLabFeedback) {
        checkStyleLab.addEventListener('click', () => {
            const unanswered = Array.from(styleCards).some((card) => !card.dataset.selected);

            styleLabFeedback.classList.remove('hidden', 'success', 'error');

            if (unanswered) {
                styleLabFeedback.classList.add('error');
                styleLabFeedback.textContent = 'Selecciona una clasificación en cada caso antes de verificar.';
                return;
            }

            let score = 0;

            styleCards.forEach((card) => {
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

            styleLabFeedback.classList.add(score === styleCards.length ? 'success' : 'error');
            styleLabFeedback.textContent = score === styleCards.length
                ? 'Muy bien. Diferenciaste correctamente los estilos de comunicación.'
                : `Obtuviste ${score}/${styleCards.length}. Revisa dónde hay evasión, imposición o una postura clara con respeto.`;
        });

        resetStyleLab.addEventListener('click', () => {
            styleCards.forEach((card) => {
                delete card.dataset.selected;
                card.classList.remove('success', 'error');
                card.querySelectorAll('.signal-btn').forEach((button) => {
                    button.classList.remove('selected', 'correct', 'incorrect');
                });
            });

            styleLabFeedback.className = 'interactive-feedback hidden mt-4';
            styleLabFeedback.innerHTML = '';
        });
    }

    const sequenceOrder = [
        'Planificar y analizar',
        'Establecer el tono positivo',
        'Definir el problema',
        'Generar ideas de solución',
        'Evaluar y decidir',
        'Dar seguimiento',
    ];
    const sequenceButtons = document.querySelectorAll('.resolution-step');
    const sequenceSelected = document.querySelector('#resolution-sequence-selected span');
    const sequenceFeedback = document.getElementById('resolution-sequence-feedback');
    const checkSequence = document.getElementById('check-resolution-sequence');
    const resetSequence = document.getElementById('reset-resolution-sequence');
    let currentSequence = [];

    function renderSequence() {
        if (sequenceSelected) {
            sequenceSelected.textContent = currentSequence.length ? currentSequence.join(' → ') : 'Vacía';
        }
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

    if (checkSequence && resetSequence && sequenceFeedback) {
        checkSequence.addEventListener('click', () => {
            const isComplete = currentSequence.length === sequenceOrder.length;
            const isCorrect = isComplete && currentSequence.every((item, index) => item === sequenceOrder[index]);

            sequenceFeedback.classList.remove('hidden', 'success', 'error');
            sequenceFeedback.classList.add(isCorrect ? 'success' : 'error');
            sequenceFeedback.textContent = isCorrect
                ? 'Correcto. Ordenaste de forma lógica la ruta de resolución.'
                : isComplete
                    ? 'La secuencia no es correcta. Revisa el orden y vuelve a intentarlo.'
                    : 'Aún faltan pasos por ubicar antes de verificar.';
        });

        resetSequence.addEventListener('click', () => {
            currentSequence = [];
            renderSequence();
            sequenceFeedback.className = 'interactive-feedback hidden mt-4';
            sequenceFeedback.innerHTML = '';

            sequenceButtons.forEach((button) => {
                button.disabled = false;
                button.classList.remove('selected');
            });
        });
    }

    const assertiveContext = document.getElementById('assertive-context');
    const assertiveFocus = document.getElementById('assertive-focus');
    const assertiveRequest = document.getElementById('assertive-request');
    const generateAssertive = document.getElementById('generate-assertive');
    const clearAssertive = document.getElementById('clear-assertive');
    const assertivePreview = document.getElementById('assertive-preview');

    const assertiveContent = {
        context: {
            codigo: {
                impacto: 'Yo noto que estas fallas repetidas en el código están afectando la estabilidad del módulo y el tiempo de revisión.',
                preocupacion: 'Yo me siento preocupado porque estamos corrigiendo varias veces el mismo punto y eso retrasa el avance del equipo.',
                claridad: 'Yo necesito entender qué está provocando estas repeticiones para definir una mejora clara.'
            },
            prioridad: {
                impacto: 'Yo veo que cambiar la prioridad sin aviso está afectando nuestra planeación y la coordinación del sprint.',
                preocupacion: 'Yo me siento inquieto cuando la prioridad cambia de forma repentina porque el equipo pierde foco.',
                claridad: 'Yo necesito mayor claridad sobre por qué cambió la prioridad y qué debemos mover primero.'
            },
            pedidos: {
                impacto: 'Yo observo que los pedidos duplicados y la pérdida de información ya están afectando el servicio y el control del negocio.',
                preocupacion: 'Yo veo una preocupación real porque la desorganización entre canales está generando errores operativos.',
                claridad: 'Yo necesito comprender mejor en qué canal ocurre con más frecuencia para priorizar la solución.'
            }
        },
        request: {
            revisar: 'Propongo que revisemos juntos la causa principal antes de decidir la solución.',
            acordar: 'Me gustaría que acordemos un procedimiento claro para evitar que esto se repita.',
            priorizar: 'Sugiero que definamos la prioridad inmediata y quién se hará cargo del siguiente paso.'
        }
    };

    if (generateAssertive && clearAssertive && assertivePreview) {
        generateAssertive.addEventListener('click', () => {
            const context = assertiveContext.value;
            const focus = assertiveFocus.value;
            const request = assertiveRequest.value;

            if (!context || !focus || !request) {
                assertivePreview.className = 'preview-box error-box mt-5';
                assertivePreview.classList.remove('hidden');
                assertivePreview.innerHTML = '<strong>Faltan datos.</strong><p>Selecciona las tres opciones para construir la respuesta.</p>';
                return;
            }

            const message = assertiveContent.context[context][focus];
            const closing = assertiveContent.request[request];

            assertivePreview.className = 'preview-box success-box mt-5';
            assertivePreview.classList.remove('hidden');
            assertivePreview.innerHTML = `
                <strong>Respuesta sugerida</strong>
                <p>${message}</p>
                <p class="mt-3">${closing}</p>
            `;
        });

        clearAssertive.addEventListener('click', () => {
            assertiveContext.value = '';
            assertiveFocus.value = '';
            assertiveRequest.value = '';
            assertivePreview.className = 'hidden mt-5';
            assertivePreview.innerHTML = '';
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
                ? 'Comprendes bien la comunicación asertiva y la resolución de conflictos en contextos colaborativos.'
                : score >= 3
                    ? 'Vas bien. Refuerza los tipos de conflicto, los estilos de afrontamiento y la secuencia de resolución.'
                    : 'Necesitas repasar el tema, especialmente estilos de comunicación, causas del conflicto y pasos de resolución.';

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
