// ============================================
// STUDENT DASHBOARD - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SIDEBAR TOGGLE (Mobile) 
    // ============================================
    
    const sidebarToggle = document.getElementById('sidebarToggle');
    const dashboardSidebar = document.getElementById('dashboardSidebar');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    if (sidebarToggle && dashboardSidebar) {
        sidebarToggle.addEventListener('click', function() {
            dashboardSidebar.classList.toggle('active');
            
            // Close mobile nav if open
            const mobileNav = document.getElementById('mobileNav');
            const mobileNavOverlay = document.getElementById('mobileNavOverlay');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
            }
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                if (!dashboardSidebar.contains(e.target) && 
                    !sidebarToggle.contains(e.target) && 
                    dashboardSidebar.classList.contains('active')) {
                    dashboardSidebar.classList.remove('active');
                }
            }
        });
    }
    
    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');
    
    // Open mobile nav when clicking hamburger (if sidebar toggle is used for mobile nav)
    if (window.innerWidth <= 768) {
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                if (mobileNav && mobileNavOverlay) {
                    mobileNav.classList.toggle('active');
                    mobileNavOverlay.classList.toggle('active');
                    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
                }
            });
        }
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
    // THEME SYSTEM - Handled by universal theme.js
    // ============================================
    
    // ============================================
    // SIDEBAR NAVIGATION - Active Link Highlighting
    // ============================================
    
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the section to scroll to
            const targetSection = this.getAttribute('data-section');
            
            // Smooth scroll to section (if sections exist)
            const section = document.getElementById(targetSection);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 992 && dashboardSidebar) {
                dashboardSidebar.classList.remove('active');
            }
        });
    });
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // NOTIFICATION INTERACTIONS
    // ============================================
    
    const markReadBtn = document.querySelector('.mark-read');
    const notificationItems = document.querySelectorAll('.notification-item');
    
    if (markReadBtn) {
        markReadBtn.addEventListener('click', function() {
            notificationItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            // Update notification badge
            const notificationBadge = document.querySelector('.notification-badge');
            if (notificationBadge) {
                notificationBadge.textContent = '0';
                setTimeout(() => {
                    notificationBadge.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Click on notification item
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
        });
    });
    
    // ============================================
    // MESSAGE INTERACTIONS
    // ============================================
    
    const messageItems = document.querySelectorAll('.message-item');
    
    messageItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
            const unreadDot = this.querySelector('.unread-dot');
            if (unreadDot) {
                unreadDot.style.display = 'none';
            }
            
            // Here you could open a message modal or navigate to message detail
            console.log('Message clicked');
        });
    });
    
    // ============================================
    // STAT CARDS ANIMATION ON SCROLL
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
    
    // Observe stat cards and content cards
    const statCards = document.querySelectorAll('.stat-card');
    const contentCards = document.querySelectorAll('.content-card');
    
    statCards.forEach(card => observer.observe(card));
    contentCards.forEach(card => observer.observe(card));
    
    // ============================================
    // QUICK ACTION BUTTONS
    // ============================================
    
    const actionButtons = document.querySelectorAll('.action-btn, .quick-action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log(`Action clicked: ${buttonText}`);
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(59, 130, 246, 0.5)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Here you would handle the specific action
            // For example: open a modal, navigate to a page, etc.
        });
    });
    
    // ============================================
    // PROFILE MENU DROPDOWN (Optional)
    // ============================================
    
    const profileMenu = document.querySelector('.profile-menu');
    
    if (profileMenu) {
        profileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            // Here you could show a dropdown menu
            console.log('Profile menu clicked');
            // You could create and show a dropdown here
        });
    }
    
    // ============================================
    // DOCUMENT DOWNLOAD ACTIONS
    // ============================================
    
    const docActions = document.querySelectorAll('.doc-action');
    
    docActions.forEach(action => {
        action.addEventListener('click', function(e) {
            e.stopPropagation();
            const docItem = this.closest('.document-item');
            const docName = docItem.querySelector('.doc-info h4').textContent;
            
            console.log(`Downloading: ${docName}`);
            
            // Add download animation
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-spinner fa-spin';
                setTimeout(() => {
                    icon.className = 'fas fa-check';
                    setTimeout(() => {
                        icon.className = 'fas fa-download';
                    }, 1000);
                }, 1500);
            }
            
            // Here you would trigger the actual download
        });
    });
    
    // ============================================
    // APPLICATION ITEMS INTERACTION
    // ============================================
    
    const applicationItems = document.querySelectorAll('.application-item');
    
    applicationItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Application clicked');
            // Here you could navigate to application details or open a modal
        });
    });
    
    // ============================================
    // RESPONSIVE HANDLING
    // ============================================
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close sidebar on desktop view
            if (window.innerWidth > 992 && dashboardSidebar) {
                dashboardSidebar.classList.remove('active');
            }
            
            // Close mobile nav on desktop view
            if (window.innerWidth > 768 && mobileNav) {
                mobileNav.classList.remove('active');
                if (mobileNavOverlay) {
                    mobileNavOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        }, 250);
    });
    
    // ============================================
    // PROGRESS BAR ANIMATION
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
    // LOGOUT BUTTON
    // ============================================
    
    const logoutBtn = document.querySelector('.logout-btn');
    const logoutLinks = document.querySelectorAll('.logout-link');
    
    function handleLogout(e) {
        e.preventDefault();
        
        // Show confirmation
        if (confirm('Are you sure you want to logout?')) {
            console.log('Logging out...');
            
            // Add loading state
            const btn = e.target.closest('button, a');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
                btn.style.pointerEvents = 'none';
                
                // Simulate logout delay
                setTimeout(() => {
                    // Here you would handle actual logout
                    // For now, redirect to login page
                    window.location.href = 'login.html';
                }, 1000);
            }
        }
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', handleLogout);
    });
    
    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: Focus search (if you add search functionality)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            console.log('Search shortcut triggered');
        }
        
        // Escape: Close modals/sidebars
        if (e.key === 'Escape') {
            if (dashboardSidebar && dashboardSidebar.classList.contains('active')) {
                dashboardSidebar.classList.remove('active');
            }
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Ctrl/Cmd + B: Toggle sidebar
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            if (dashboardSidebar) {
                dashboardSidebar.classList.toggle('active');
            }
        }
    });
    
    // ============================================
    // INITIALIZE TOOLTIPS (Optional)
    // ============================================
    
    // You can add tooltip functionality here if needed
    
    // ============================================
    // CONSOLE LOG - Dashboard Loaded
    // ============================================
    
    console.log('✅ Student Dashboard loaded successfully!');
    
});

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
