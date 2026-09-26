/**
 * wireframe.js — Interactividad de la sección Wireframes
 * Gestiona: tabs, toggle sin/con wireframe, expand/collapse function cards y tool cards
 */
document.addEventListener('DOMContentLoaded', function () {

    /* ── 1. TABS ─────────────────────────────────────────── */
    const tabBtns  = document.querySelectorAll('.wf-tab-btn');
    const tabPanels = document.querySelectorAll('.wf-tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            // Desactivar todo
            tabBtns.forEach(b  => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Activar el seleccionado
            btn.classList.add('active');
            const panel = document.getElementById(target);
            if (panel) {
                panel.classList.add('active');
                panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    /* ── 2. TOGGLE SIN / CON WIREFRAME ──────────────────── */
    const btnSin   = document.getElementById('btn-sin');
    const btnCon   = document.getElementById('btn-con');
    const panelSin = document.getElementById('panel-sin');
    const panelCon = document.getElementById('panel-con');

    function activateCompare(showId, hideId, activateBtn, deactivateBtn) {
        const show = document.getElementById(showId);
        const hide = document.getElementById(hideId);
        if (!show || !hide) return;
        hide.classList.remove('active');
        show.classList.add('active');
        activateBtn.classList.add('active');
        deactivateBtn.classList.remove('active');
    }

    if (btnSin) btnSin.addEventListener('click', () => activateCompare('panel-sin', 'panel-con', btnSin, btnCon));
    if (btnCon) btnCon.addEventListener('click', () => activateCompare('panel-con', 'panel-sin', btnCon, btnSin));

    /* ── 3. FUNCTION CARDS — expand on click ────────────── */
    document.querySelectorAll('.wf-fn-card').forEach(card => {
        card.addEventListener('click', () => {
            const isOpen = card.classList.contains('open');
            // Cerrar todos los demás
            document.querySelectorAll('.wf-fn-card').forEach(c => c.classList.remove('open'));
            if (!isOpen) card.classList.add('open');
        });
    });

    /* ── 4. TOOL CARDS — expand on click ────────────────── */
    document.querySelectorAll('.wf-tool-card').forEach(card => {
        card.addEventListener('click', () => {
            const isOpen = card.classList.contains('open');
            document.querySelectorAll('.wf-tool-card').forEach(c => c.classList.remove('open'));
            if (!isOpen) card.classList.add('open');
        });
    });

    /* ── 5. SCROLL REVEAL ───────────────────────────────── */
    const revealItems = document.querySelectorAll(
        '.wf-fid-card, .wf-tool-card, .wf-fn-card, .wf-proto-card'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('wf-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(el => observer.observe(el));
    } else {
        revealItems.forEach(el => el.classList.add('wf-revealed'));
    }
});
