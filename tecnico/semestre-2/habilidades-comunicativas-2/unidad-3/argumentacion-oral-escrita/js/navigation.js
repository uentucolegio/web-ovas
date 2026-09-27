document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentPanes = document.querySelectorAll('.content-pane');
    const mobileNav = document.getElementById('mobile-nav');

    function switchPane(targetId) {
        contentPanes.forEach((pane) => {
            pane.classList.remove('active');
        });

        const targetPane = document.getElementById(targetId);
        if (targetPane) {
            targetPane.classList.add('active');
            if (window.location.hash !== `#${targetId}`) {
                history.replaceState(null, '', `#${targetId}`);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        sidebarLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            }
        });

        if (mobileNav && mobileNav.value !== targetId) {
            mobileNav.value = targetId;
        }
    }

    sidebarLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            switchPane(event.currentTarget.dataset.target);
        });
    });

    if (mobileNav) {
        mobileNav.addEventListener('change', (event) => {
            switchPane(event.target.value);
        });
    }

    const initialPane = window.location.hash.replace('#', '');
    if (initialPane && document.getElementById(initialPane)) {
        switchPane(initialPane);
    }
});
