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

    const roleSelects = document.querySelectorAll('.role-select');
    const checkRoleLab = document.getElementById('check-role-lab');
    const resetRoleLab = document.getElementById('reset-role-lab');
    const roleLabFeedback = document.getElementById('role-lab-feedback');

    if (checkRoleLab && resetRoleLab && roleLabFeedback) {
        checkRoleLab.addEventListener('click', () => {
            let correctCount = 0;
            let unanswered = false;

            roleSelects.forEach((select) => {
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

            roleLabFeedback.classList.remove('hidden', 'success', 'error');

            if (unanswered) {
                roleLabFeedback.classList.add('error');
                roleLabFeedback.textContent = 'Completa todos los roles antes de verificar.';
                return;
            }

            roleLabFeedback.classList.add(correctCount === roleSelects.length ? 'success' : 'error');
            roleLabFeedback.textContent = correctCount === roleSelects.length
                ? 'Muy bien. Relacionaste correctamente los roles y sus funciones.'
                : `Obtuviste ${correctCount}/${roleSelects.length}. Revisa dónde coordinar, definir, construir o verificar era lo más importante.`;
        });

        resetRoleLab.addEventListener('click', () => {
            roleSelects.forEach((select) => {
                select.value = '';
                select.classList.remove('correct', 'incorrect');
            });

            roleLabFeedback.className = 'interactive-feedback hidden mt-4';
            roleLabFeedback.innerHTML = '';
        });
    }

    const methodologyCases = document.querySelectorAll('.methodology-case');
    const checkMethodologyLab = document.getElementById('check-methodology-lab');
    const resetMethodologyLab = document.getElementById('reset-methodology-lab');
    const methodologyLabFeedback = document.getElementById('methodology-lab-feedback');

    methodologyCases.forEach((caseCard) => {
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

    if (checkMethodologyLab && resetMethodologyLab && methodologyLabFeedback) {
        checkMethodologyLab.addEventListener('click', () => {
            const unanswered = Array.from(methodologyCases).some((caseCard) => !caseCard.dataset.selected);

            methodologyLabFeedback.classList.remove('hidden', 'success', 'error');

            if (unanswered) {
                methodologyLabFeedback.classList.add('error');
                methodologyLabFeedback.textContent = 'Selecciona una respuesta en cada escena antes de verificar.';
                return;
            }

            let score = 0;

            methodologyCases.forEach((caseCard) => {
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

            methodologyLabFeedback.classList.add(score === methodologyCases.length ? 'success' : 'error');
            methodologyLabFeedback.textContent = score === methodologyCases.length
                ? 'Elegiste correctamente las metodologías según el contexto del equipo.'
                : `Obtuviste ${score}/${methodologyCases.length}. Revisa cuándo conviene ABP, Scrum, Pair Programming, Peer Review o trabajo estructurado.`;
        });

        resetMethodologyLab.addEventListener('click', () => {
            methodologyCases.forEach((caseCard) => {
                delete caseCard.dataset.selected;
                caseCard.classList.remove('success', 'error');
                caseCard.querySelectorAll('.decision-option').forEach((option) => {
                    option.classList.remove('selected', 'correct', 'incorrect');
                });
            });

            methodologyLabFeedback.className = 'interactive-feedback hidden mt-4';
            methodologyLabFeedback.innerHTML = '';
        });
    }

    const charterProject = document.getElementById('charter-project');
    const charterFocus = document.getElementById('charter-focus');
    const charterDynamic = document.getElementById('charter-dynamic');
    const generateCharter = document.getElementById('generate-charter');
    const clearCharter = document.getElementById('clear-charter');
    const charterPreview = document.getElementById('charter-preview');

    const charterContent = {
        project: {
            inventario: 'Nuestro equipo desarrollará un sistema de inventario con foco en organización, visibilidad y control de existencias.',
            pedidos: 'Nuestro equipo construirá un sistema básico de pedidos que permita registrar, seguir y organizar solicitudes de clientes.',
            web: 'Nuestro equipo desarrollará una página web para un negocio local con foco en claridad, estructura y experiencia básica del usuario.'
        },
        focus: {
            roles: 'Definiremos responsabilidades claras para evitar cruces, vacíos o duplicidad de trabajo entre integrantes.',
            comunicacion: 'Mantendremos comunicación constante para compartir avances, bloqueos y decisiones importantes durante el proceso.',
            revision: 'Acordaremos momentos de revisión conjunta para detectar errores temprano y mejorar la calidad del resultado.'
        },
        dynamic: {
            scrum: 'Trabajaremos en un sprint corto con seguimiento periódico y entregables parciales visibles.',
            pair: 'Usaremos programación en pareja en tareas críticas para fortalecer aprendizaje y reducir errores.',
            peer: 'Aplicaremos revisión entre pares antes de cada entrega para afinar calidad y consistencia.'
        }
    };

    if (generateCharter && clearCharter && charterPreview) {
        generateCharter.addEventListener('click', () => {
            const project = charterProject.value;
            const focus = charterFocus.value;
            const dynamic = charterDynamic.value;

            if (!project || !focus || !dynamic) {
                charterPreview.className = 'preview-box error-box mt-5';
                charterPreview.classList.remove('hidden');
                charterPreview.innerHTML = '<strong>Faltan datos.</strong><p>Selecciona las tres opciones para construir el acuerdo de equipo.</p>';
                return;
            }

            charterPreview.className = 'preview-box success-box mt-5';
            charterPreview.classList.remove('hidden');
            charterPreview.innerHTML = `
                <strong>Acuerdo sugerido</strong>
                <p>${charterContent.project[project]}</p>
                <p class="mt-3">${charterContent.focus[focus]}</p>
                <p class="mt-3">${charterContent.dynamic[dynamic]}</p>
            `;
        });

        clearCharter.addEventListener('click', () => {
            charterProject.value = '';
            charterFocus.value = '';
            charterDynamic.value = '';
            charterPreview.className = 'hidden mt-5';
            charterPreview.innerHTML = '';
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
                ? 'Comprendes bien el trabajo colaborativo, sus problemas frecuentes y las metodologías que fortalecen al equipo.'
                : score >= 3
                    ? 'Vas bien. Refuerza la diferencia entre trabajo en grupo y colaboración, además de las metodologías activas.'
                    : 'Necesitas repasar el tema, especialmente características de colaboración, problemas comunes y uso de Scrum o Jigsaw.';

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
