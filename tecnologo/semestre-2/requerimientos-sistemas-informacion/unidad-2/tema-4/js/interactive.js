// Interactive elements and general utilities
(function() {
    'use strict';
    
    // Initialize interactive elements when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Interactive elements initialized');
        
        // Add smooth scrolling to anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Add loading states to buttons
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                if (!this.classList.contains('no-loading')) {
                    this.classList.add('opacity-75');
                    setTimeout(() => {
                        this.classList.remove('opacity-75');
                    }, 200);
                }
            });
        });
    });
    
    // Utility function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Utility function to get random element from array
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Export utilities
    window.shuffleArray = shuffleArray;
    window.getRandomElement = getRandomElement;
    
})();