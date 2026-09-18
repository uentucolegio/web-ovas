// Initialize all interactive components
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Initializing interactive components...');
        
        // Check if all required sections exist
        const requiredSections = ['introduccion', 'objetivos', 'contenido', 'actividades', 'evaluacion', 'recursos', 'bibliografia'];
        const missingSections = requiredSections.filter(section => !document.getElementById(section));
        
        if (missingSections.length > 0) {
            console.warn('Missing sections:', missingSections);
        }
        
        // Initialize navigation
        if (typeof window.initNavigation === 'function') {
            window.initNavigation();
        }
        
        // Initialize accordions
        if (typeof window.initAccordions === 'function') {
            window.initAccordions();
        }
        
        // Initialize activities
        if (typeof window.initActivities === 'function') {
            window.initActivities();
        }
        
        // Initialize quiz
        if (typeof window.initQuiz === 'function') {
            window.initQuiz();
        }
        
        console.log('All interactive components initialized successfully');
    });
    
})();