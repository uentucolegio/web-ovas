document.addEventListener('DOMContentLoaded', () => {
    const panes = document.querySelectorAll('.content-pane');
    const links = document.querySelectorAll('.sidebar-link');
    const mobileNav = document.getElementById('mobile-nav');

    function switchPane(targetId) {
        panes.forEach((pane) => pane.classList.toggle('active', pane.id === targetId));
        links.forEach((link) => link.classList.toggle('active', link.dataset.target === targetId));
        if (mobileNav && mobileNav.value !== targetId) mobileNav.value = targetId;
    }

    links.forEach((link) => link.addEventListener('click', (event) => {
        event.preventDefault();
        switchPane(link.dataset.target);
    }));
    if (mobileNav) mobileNav.addEventListener('change', (event) => switchPane(event.target.value));
});
