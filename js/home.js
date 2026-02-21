// ============================================
// HOME PAGE - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // SIDEBAR TOGGLE (Mobile)
    // ============================================

    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (mobileNav && mobileNavOverlay) {
                mobileNav.classList.toggle('active');
                mobileNavOverlay.classList.toggle('active');
                document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            }
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================

    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
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
    }, observerOptions);

    const statCards = document.querySelectorAll('.stat-card');
    const contentCards = document.querySelectorAll('.content-card');
    const supportSection = document.querySelector('.support-section');

    statCards.forEach(card => observer.observe(card));
    contentCards.forEach(card => observer.observe(card));
    if (supportSection) observer.observe(supportSection);

    // ============================================
    // MICRO-INTERACTIONS
    // ============================================

    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');

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

    // ============================================
    // APPLICATION CARD INTERACTIONS
    // ============================================

    const applicationCards = document.querySelectorAll('.application-card');

    applicationCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn-primary')) {
                const button = this.querySelector('.btn-primary');
                if (button) {
                    button.click();
                }
            }
        });
    });

    // ============================================
    // PROCESS STEP ANIMATIONS
    // ============================================

    const processSteps = document.querySelectorAll('.process-step');

    processSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.1}s`;
        step.style.animation = 'fadeIn 0.5s ease-out forwards';
        step.style.opacity = '0';
    });

    // ============================================
    // FLOATING ACTION BUTTON
    // ============================================

    const fab = document.getElementById('fab');

    if (fab) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const icon = fab.querySelector('i');

            if (scrolled > 500) {
                icon.className = 'fas fa-arrow-up';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    }

    // ============================================
    // RESPONSIVE HANDLING
    // ============================================

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 992) {
                if (mobileNav) {
                    mobileNav.classList.remove('active');
                    if (mobileNavOverlay) {
                        mobileNavOverlay.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                }
            }
        }, 250);
    });

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            if (mobileNav) {
                mobileNav.classList.toggle('active');
                if (mobileNavOverlay) {
                    mobileNavOverlay.classList.toggle('active');
                }
                document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            }
        }
    });

    // ============================================
    // CONSOLE LOG
    // ============================================

    console.log('✅ Home page loaded successfully!');

});

// ============================================
// RIPPLE ANIMATION KEYFRAMES
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// UTILITY FUNCTIONS
// ============================================

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = 70;
        const offsetTop = section.offsetTop - navbarHeight;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

function openChat() {
    alert('Chat support will be available soon! For now, please contact us through our support channels.');
}

window.scrollToSection = scrollToSection;
window.openChat = openChat;
window.scrollToTop = scrollToTop;
