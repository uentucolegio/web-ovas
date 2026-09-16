// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Desktop sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentPanes = document.querySelectorAll('.content-pane');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all content panes
            contentPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show target content pane
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Mobile navigation
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) {
        mobileNav.addEventListener('change', function() {
            // Hide all content panes
            contentPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show selected content pane
            const targetId = this.value;
            document.getElementById(targetId).classList.add('active');
        });
    }
});