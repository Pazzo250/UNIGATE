// ============================================
// INDEX PAGE - JAVASCRIPT
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

    // Close mobile nav
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile nav when clicking overlay
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
    const ctaSection = document.querySelector('.cta-section');

    statCards.forEach(card => observer.observe(card));
    contentCards.forEach(card => observer.observe(card));
    if (ctaSection) observer.observe(ctaSection);

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ============================================

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = 70;
            const offsetTop = section.offsetTop - navbarHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // ============================================
    // MICRO-INTERACTIONS
    // ============================================

    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .action-btn');

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
    // PROGRESS BARS ANIMATION
    // ============================================

    const progressBars = document.querySelectorAll('.progress-bar-fill');

    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
        }, 500);
    });

    // ============================================
    // NEWSLETTER SUBSCRIPTION
    // ============================================

    function subscribeNewsletter() {
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for subscribing! You will receive updates soon.');
        emailInput.value = '';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            console.log('Search shortcut triggered');
        }

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
    // LAZY LOADING IMAGES
    // ============================================

    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ============================================
    // END
    // ============================================

    console.log('✅ Index page loaded successfully!');

});

// ============================================
// RIPPLE ANIMATION KEYFRAMES
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

// ============================================
// UTILITY FUNCTIONS
// ============================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = 70;
        const offsetTop = section.offsetTop - navbarHeight;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

window.subscribeNewsletter = function() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();

    if (!email) {
        alert('Please enter your email address.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Thank you for subscribing! You will receive updates soon.');
    emailInput.value = '';
};

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

