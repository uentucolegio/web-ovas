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
                        ? 'Correcto. Esa opción responde mejor al contexto del módulo.'
                        : 'Revisa de nuevo. Busca la opción con más claridad, adaptación o precisión según el caso.';
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

    const translationConcept = document.getElementById('translation-concept');
    const translationFocus = document.getElementById('translation-focus');
    const generateTranslation = document.getElementById('generate-translation');
    const clearTranslation = document.getElementById('clear-translation');
    const translationPreview = document.getElementById('translation-preview');

    const translationContent = {
        api: {
            funcionamiento: {
                tech: 'Una API define endpoints y reglas para que distintos componentes del sistema intercambien datos de forma estructurada.',
                client: 'Una API permite que distintas partes del sistema se comuniquen y te entreguen la información correcta.'
            },
            impacto: {
                tech: 'Una API bien diseñada reduce duplicación de lógica, facilita integraciones y mejora mantenimiento.',
                client: 'Una API ayuda a que la plataforma funcione de forma más estable y conecte mejor sus servicios.'
            },
            coordinacion: {
                tech: 'La API funciona como contrato entre equipos para que frontend, backend y terceros trabajen con la misma estructura.',
                client: 'La API permite que varias personas o herramientas trabajen sobre la misma información sin inconsistencias.'
            }
        },
        'sprint-review': {
            funcionamiento: {
                tech: 'La sprint review es el espacio para mostrar el incremento, recoger retroalimentación y ajustar prioridades del backlog.',
                client: 'La sprint review es una reunión donde el equipo te muestra avances y escucha tus comentarios para mejorar la siguiente entrega.'
            },
            impacto: {
                tech: 'La review ayuda a validar valor entregado, detectar ajustes tempranos y alinear al equipo con negocio.',
                client: 'La review permite confirmar si lo entregado realmente responde a tu necesidad antes de seguir construyendo.'
            },
            coordinacion: {
                tech: 'La sprint review conecta desarrollo, negocio y usuario alrededor de evidencia concreta del sprint.',
                client: 'La sprint review hace que todas las personas involucradas tomen decisiones con base en lo que ya se construyó.'
            }
        },
        'bug-critico': {
            funcionamiento: {
                tech: 'Un bug crítico es un fallo de alta severidad que afecta funciones clave y exige atención prioritaria del equipo.',
                client: 'Un bug crítico es un error grave que impide usar una parte importante del sistema como debería.'
            },
            impacto: {
                tech: 'Puede bloquear integraciones, comprometer calidad y alterar el plan del sprint o la liberación.',
                client: 'Puede detener procesos importantes, generar errores visibles y afectar la confianza en el producto.'
            },
            coordinacion: {
                tech: 'Exige alinear diagnóstico, responsable, solución y comunicación con áreas impactadas.',
                client: 'Requiere que el equipo se organice rápido para corregir el problema y mantenerte informado.'
            }
        }
    };

    if (generateTranslation && clearTranslation && translationPreview) {
        generateTranslation.addEventListener('click', () => {
            const concept = translationConcept.value;
            const focus = translationFocus.value;

            if (!concept || !focus) {
                translationPreview.className = 'preview-box error-box mt-5';
                translationPreview.classList.remove('hidden');
                translationPreview.innerHTML = '<strong>Faltan datos.</strong><p>Selecciona un concepto técnico y un foco de explicación para generar las dos versiones.</p>';
                return;
            }

            const selected = translationContent[concept][focus];
            translationPreview.className = 'mt-5';
            translationPreview.classList.remove('hidden');
            translationPreview.innerHTML = `
                <div class="grid gap-4 md:grid-cols-2">
                    <article class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                        <span class="inline-flex mb-3 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">Versión para desarrollo</span>
                        <p class="text-slate-700 leading-relaxed">${selected.tech}</p>
                    </article>
                    <article class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                        <span class="inline-flex mb-3 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-semibold">Versión para cliente</span>
                        <p class="text-slate-700 leading-relaxed">${selected.client}</p>
                    </article>
                </div>
            `;
        });

        clearTranslation.addEventListener('click', () => {
            translationConcept.value = '';
            translationFocus.value = '';
            translationPreview.className = 'hidden mt-5';
            translationPreview.innerHTML = '';
        });
    }

    const barrierSelects = document.querySelectorAll('.barrier-select');
    const checkBarrierLab = document.getElementById('check-barrier-lab');
    const resetBarrierLab = document.getElementById('reset-barrier-lab');
    const barrierLabFeedback = document.getElementById('barrier-lab-feedback');

    if (checkBarrierLab && resetBarrierLab && barrierLabFeedback) {
        checkBarrierLab.addEventListener('click', () => {
            let correctCount = 0;
            let unanswered = false;

            barrierSelects.forEach((select) => {
                const selectedValue = select.value;
                const isCorrect = selectedValue === select.dataset.answer;

                select.classList.remove('correct', 'incorrect');

                if (!selectedValue) {
                    unanswered = true;
                    return;
                }

                select.classList.add(isCorrect ? 'correct' : 'incorrect');
                if (isCorrect) {
                    correctCount += 1;
                }
            });

            barrierLabFeedback.classList.remove('hidden', 'success', 'error');

            if (unanswered) {
                barrierLabFeedback.classList.add('error');
                barrierLabFeedback.textContent = 'Completa todos los casos antes de verificar.';
                return;
            }

            barrierLabFeedback.classList.add(correctCount === barrierSelects.length ? 'success' : 'error');
            barrierLabFeedback.textContent = correctCount === barrierSelects.length
                ? 'Muy bien. Identificaste correctamente las barreras de comunicación.'
                : `Obtuviste ${correctCount}/${barrierSelects.length}. Revisa dónde el problema es jerga, escucha, suposición o choque de enfoques.`;
        });

        resetBarrierLab.addEventListener('click', () => {
            barrierSelects.forEach((select) => {
                select.value = '';
                select.classList.remove('correct', 'incorrect');
            });

            barrierLabFeedback.className = 'interactive-feedback hidden mt-4';
            barrierLabFeedback.innerHTML = '';
        });
    }

    const meetingCases = document.querySelectorAll('.meeting-case');
    const checkMeetingLab = document.getElementById('check-meeting-lab');
    const resetMeetingLab = document.getElementById('reset-meeting-lab');
    const meetingLabFeedback = document.getElementById('meeting-lab-feedback');

    meetingCases.forEach((caseCard) => {
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

    if (checkMeetingLab && resetMeetingLab && meetingLabFeedback) {
        checkMeetingLab.addEventListener('click', () => {
            const unanswered = Array.from(meetingCases).some((caseCard) => !caseCard.dataset.selected);

            meetingLabFeedback.classList.remove('hidden', 'success', 'error');

            if (unanswered) {
                meetingLabFeedback.classList.add('error');
                meetingLabFeedback.textContent = 'Selecciona una respuesta en cada escena antes de verificar.';
                return;
            }

            let score = 0;

            meetingCases.forEach((caseCard) => {
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

            meetingLabFeedback.classList.add(score === meetingCases.length ? 'success' : 'error');
            meetingLabFeedback.textContent = score === meetingCases.length
                ? 'Elegiste las respuestas más útiles para reuniones ágiles y colaborativas.'
                : `Obtuviste ${score}/${meetingCases.length}. Revisa qué opciones fueron más claras, breves y orientadas a solución.`;
        });

        resetMeetingLab.addEventListener('click', () => {
            meetingCases.forEach((caseCard) => {
                delete caseCard.dataset.selected;
                caseCard.classList.remove('success', 'error');
                caseCard.querySelectorAll('.decision-option').forEach((option) => {
                    option.classList.remove('selected', 'correct', 'incorrect');
                });
            });

            meetingLabFeedback.className = 'interactive-feedback hidden mt-4';
            meetingLabFeedback.innerHTML = '';
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
                ? 'Comprendes bien cómo comunicarte en equipos interdisciplinarios y coordinar conversaciones de trabajo.'
                : score >= 3
                    ? 'Vas bien. Refuerza barreras de comunicación, adaptación del lenguaje y dinámica de reuniones ágiles.'
                    : 'Necesitas repasar el tema, sobre todo barreras, adaptación al interlocutor y prácticas de coordinación.';

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
});
