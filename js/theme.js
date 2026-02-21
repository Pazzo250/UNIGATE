// ============================================
// UNIVERSAL THEME SYSTEM - JAVASCRIPT
// ============================================

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================

    const THEME_KEY = 'theme';
    const DEFAULT_THEME = 'dark';

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    function getSavedTheme() {
        return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    }

    function saveTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }

    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || DEFAULT_THEME;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        applyTheme(newTheme);
        saveTheme(newTheme);

        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    function initTheme() {
        // Apply saved theme immediately
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);

        // Set up theme toggle event listener
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        console.log('✅ Universal theme system initialized. Current theme:', savedTheme);
    }

    // ============================================
    // PUBLIC API
    // ============================================

    window.ThemeSystem = {
        init: initTheme,
        toggle: toggleTheme,
        getCurrentTheme: () => document.body.getAttribute('data-theme'),
        setTheme: (theme) => {
            applyTheme(theme);
            saveTheme(theme);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

})();
