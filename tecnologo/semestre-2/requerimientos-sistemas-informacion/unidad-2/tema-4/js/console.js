// Console utilities for debugging
(function() {
    'use strict';
    
    // Safe console logging
    function safeLog() {
        try {
            console.log.apply(console, arguments);
        } catch (e) {
            // Console not available
        }
    }
    
    // Export safe logging functions
    window.safeLog = safeLog;
    window.safeError = function() {
        try {
            console.error.apply(console, arguments);
        } catch (e) {}
    };
    window.safeWarn = function() {
        try {
            console.warn.apply(console, arguments);
        } catch (e) {}
    };
    
    safeLog('Console utilities loaded');
})();