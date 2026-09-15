// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetPanel = document.querySelector(targetId);
            
            // Toggle current panel
            if (targetPanel.classList.contains('hidden')) {
                targetPanel.classList.remove('hidden');
                this.querySelector('span:last-child').textContent = '➖';
            } else {
                targetPanel.classList.add('hidden');
                this.querySelector('span:last-child').textContent = '➕';
            }
        });
    });
});