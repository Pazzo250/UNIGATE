// ============================================
// ROADMAP PAGE - JAVASCRIPT
// ============================================

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION & STATE 
    // ============================================

    const CONFIG = {
        animationDuration: 300,
        scrollOffset: 100,
        parallaxSpeed: 0.5
    };

    // Removed unused variable
    let observer;

    // ============================================
    // DOM ELEMENTS
    // ============================================

    const elements = {
        sidebarToggle: document.querySelector('.sidebar-toggle'),
        mobileNavClose: document.querySelector('.mobile-nav-close'),
        mobileNavOverlay: document.querySelector('.mobile-nav-overlay'),
        mobileNav: document.querySelector('.mobile-nav'),
        backToTop: document.querySelector('.back-to-top'),
        fab: document.querySelector('.fab'),
        themeToggle: document.querySelector('.theme-toggle'),
        body: document.body
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    function animateNumber(element, target, duration = 1000) {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = 70;
            const offsetTop = section.offsetTop - navbarHeight - CONFIG.scrollOffset;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ============================================
    // THEME MANAGEMENT
    // ============================================

    // Theme management handled by universal theme.js

    function initTheme() {
        // Initialize theme system
        if (window.ThemeSystem) {
            window.ThemeSystem.init();
        }
    }

    function toggleTheme() {
        if (window.ThemeSystem) {
            window.ThemeSystem.toggle();
        }
    }

    // ============================================
    // MOBILE NAVIGATION
    // ============================================

    function initMobileNav() {
        if (elements.sidebarToggle) {
            elements.sidebarToggle.addEventListener('click', toggleMobileNav);
        }

        if (elements.mobileNavClose) {
            elements.mobileNavClose.addEventListener('click', closeMobileNav);
        }

        if (elements.mobileNavOverlay) {
            elements.mobileNavOverlay.addEventListener('click', closeMobileNav);
        }
    }

    function toggleMobileNav() {
        if (elements.mobileNav && elements.mobileNavOverlay) {
            const isActive = elements.mobileNav.classList.contains('active');
            if (isActive) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        }
    }

    function openMobileNav() {
        if (elements.mobileNav && elements.mobileNavOverlay) {
            elements.mobileNav.classList.add('active');
            elements.mobileNavOverlay.classList.add('active');
            elements.body.style.overflow = 'hidden';
        }
    }

    function closeMobileNav() {
        if (elements.mobileNav && elements.mobileNavOverlay) {
            elements.mobileNav.classList.remove('active');
            elements.mobileNavOverlay.classList.remove('active');
            elements.body.style.overflow = '';
        }
    }

    // ============================================
    // SCROLL MANAGEMENT
    // ============================================

    function initScrollHandlers() {
        // Back to top button
        if (elements.backToTop) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const threshold = 300;

                if (scrolled > threshold) {
                    elements.backToTop.classList.add('show');
                } else {
                    elements.backToTop.classList.remove('show');
                }
            });

            elements.backToTop.addEventListener('click', scrollToTop);
        }

       // FAB scroll behavior
        if (elements.fab) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const icon = elements.fab.querySelector('i');

                if (!icon) return; // <--- FIX: Prevent the crash

                if (scrolled > 500) {
                    icon.className = 'fas fa-arrow-up';
                } else {
                    icon.className = 'fas fa-arrow-down';
                }
            });
        }


        // Parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroPattern = document.querySelector('.hero-pattern');

            if (heroPattern) {
                const yPos = -(scrolled * CONFIG.parallaxSpeed);
                heroPattern.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    // ============================================
    // ANIMATED PROGRESS BARS
    // ============================================

    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');

        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';

            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = width;
            }, index * 200);
        });
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================

    function initAnimatedCounters() {
        // Animate any percentage counters if they exist
        const counters = document.querySelectorAll('.distribution-item .progress-fill');

        counters.forEach((counter, index) => {
            setTimeout(() => {
                const width = counter.style.width;
                counter.style.width = '0%';
                setTimeout(() => {
                    counter.style.transition = 'width 1s ease-out';
                    counter.style.width = width;
                }, 100);
            }, index * 200);
        });
    }

    // ============================================
    // MICRO-INTERACTIONS
    // ============================================

    function initMicroInteractions() {
        // Button ripple effects
        const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .step-link, .resource-link');

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.animation = 'ripple 0.6s ease-out';

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Card hover effects
        const cards = document.querySelectorAll('.step-card, .tip-card, .benefit-card, .funding-card, .resource-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // ============================================
    // ACCESSIBILITY
    // ============================================

    function initAccessibility() {
        // Keyboard navigation for mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileNav();
            }
        });

        // Focus management
        if (elements.mobileNav) {
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

            elements.mobileNav.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusable = elements.mobileNav.querySelectorAll(focusableElements);
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            last.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === last) {
                            first.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }
    }

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ============================================

    function initSmoothScrolling() {
        // Add click handlers for navigation links that scroll to sections
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        // Navigation (includes element initialization)
        initMobileNav();

        // Theme
        initTheme();

        // Scroll handlers
        initScrollHandlers();

        // Animations
        initProgressBars();
        initAnimatedCounters();

        // Interactions
        initMicroInteractions();

        // Accessibility
        initAccessibility();

        // Smooth scrolling
        initSmoothScrolling();

        // Event listeners
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }

        // Intersection Observer for animations
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.step-card, .tip-card, .benefit-card, .funding-card, .resource-card, .section-header');
        animateElements.forEach(el => observer.observe(el));

        console.log('✅ Roadmap page initialized successfully!');
    }

    // ============================================
    // PUBLIC API
    // ============================================

    window.RoadmapPage = {
        scrollToSection,
        scrollToTop,
        toggleTheme
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// ============================================
// RIPPLE ANIMATION KEYFRAMES (Add to CSS if not present)
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
