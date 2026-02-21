// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all mobile menu buttons and menus
    const menuButtons = document.querySelectorAll('.mobile-menu-btn');
    const mobileMenus = document.querySelectorAll('.mobile-menu');

    menuButtons.forEach((button, index) => {
        const menu = mobileMenus[index];

        // Toggle menu on button click
        button.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.toggle('active');
            button.classList.toggle('active');

            // Toggle aria-expanded for accessibility
            const isExpanded = menu.classList.contains('active');
            button.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking on overlay
        menu.addEventListener('click', function(e) {
            if (e.target === menu) {
                menu.classList.remove('active');
                button.classList.remove('active');
                button.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                menu.classList.remove('active');
                button.classList.remove('active');
                button.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close all menus
            mobileMenus.forEach(menu => menu.classList.remove('active'));
            menuButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    });

    // Profile popup functionality
    const profileContainer = document.getElementById('profileContainer');
    const profilePopup = document.getElementById('profilePopup');
    const closeProfilePopup = document.getElementById('closeProfilePopup');

    if (profileContainer) {
        profileContainer.addEventListener('click', () => {
            if (profilePopup) profilePopup.classList.toggle('active');
        });
    }

    if (closeProfilePopup) {
        closeProfilePopup.addEventListener('click', () => {
            if (profilePopup) profilePopup.classList.remove('active');
        });
    }

    // Close popup when clicking outside
    if (profilePopup) {
        profilePopup.addEventListener('click', (e) => {
            if (e.target === profilePopup) {
                profilePopup.classList.remove('active');
            }
        });
    }
});
