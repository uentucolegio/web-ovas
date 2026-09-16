document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentPanes = document.querySelectorAll('.content-pane');
    const mobileNav = document.getElementById('mobile-nav');

    function switchPane(targetId) {
        contentPanes.forEach((pane) => {
            pane.classList.toggle('active', pane.id === targetId);
        });

        sidebarLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.target === targetId);
        });

        if (mobileNav && mobileNav.value !== targetId) {
            mobileNav.value = targetId;
        }
    }

    sidebarLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            switchPane(link.dataset.target);
        });
    });

    if (mobileNav) {
        mobileNav.addEventListener('change', (event) => {
            switchPane(event.target.value);
        });
    }
});
