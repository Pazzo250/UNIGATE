// ============================================
// RESOURCES PAGE - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // RESOURCE DOWNLOADS
    // ============================================

    function downloadResource(resourceId) {
        // Simulate download process
        showToast('Preparing download...', 'info');

        setTimeout(() => {
            // In a real application, this would trigger an actual download
            showToast(`Download started for ${resourceId.replace('-', ' ')}`, 'success');

            // Simulate download link creation
            const link = document.createElement('a');
            link.href = `#`; // In real app, this would be the actual file URL
            link.download = `${resourceId}.pdf`; // or .docx, etc.
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 1000);
    }

    // Make function globally available
    window.downloadResource = downloadResource;

    // ============================================
    // INTERACTIVE TOOLS
    // ============================================

    function openCalculator(type) {
        // Simulate opening calculator
        showToast(`Opening ${type} calculator...`, 'info');

        setTimeout(() => {
            // In a real application, this would open a modal or redirect to calculator page
            showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} calculator opened!`, 'success');
        }, 500);
    }

    function openTool(toolId) {
        // Simulate opening tool
        showToast(`Opening ${toolId.replace('-', ' ')}...`, 'info');

        setTimeout(() => {
            showToast(`${toolId.replace('-', ' ').charAt(0).toUpperCase() + toolId.replace('-', ' ').slice(1)} tool opened!`, 'success');
        }, 500);
    }

    // Make functions globally available
    window.openCalculator = openCalculator;
    window.openTool = openTool;

    // ============================================
    // NEWSLETTER SUBSCRIPTION  
    // ============================================

    function subscribeResources() {
        const emailInput = document.getElementById('resourceEmail');
        const email = emailInput.value.trim();

        if (!email) {
            showToast('Please enter your email address.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate subscription
        showToast('Thank you for subscribing! You\'ll receive updates on new resources.', 'success');
        emailInput.value = '';
    }

    // Make function globally available
    window.subscribeResources = subscribeResources;

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================

    function showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        // Toast content
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to container
        toastContainer.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }

    function getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Make function globally available
    window.showToast = showToast;

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // RESOURCE SEARCH (if search functionality is added)
    // ============================================

    const searchInput = document.getElementById('resourceSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const resourceCards = document.querySelectorAll('.resource-card, .template-item, .guide-card');

            resourceCards.forEach(card => {
                const title = card.querySelector('h3, h4').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (title.includes(query) || description.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ============================================
    // CATEGORY FILTERING
    // ============================================

    const categoryButtons = document.querySelectorAll('.category-filter');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;

                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter resources
                const resourceCards = document.querySelectorAll('.resource-card, .template-item, .guide-card, .tool-card');

                resourceCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ============================================
    // DOWNLOAD TRACKING
    // ============================================

    // Track downloads for analytics (in a real app)
    const downloadButtons = document.querySelectorAll('button[onclick*="downloadResource"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resourceId = this.onclick.toString().match(/'([^']+)'/)[1];
            console.log(`Download tracked: ${resourceId}`);

            // In a real application, this would send analytics data
            // trackEvent('resource_download', { resource_id: resourceId });
        });
    });

    // ============================================
    // ACCESSIBILITY IMPROVEMENTS
    // ============================================

    // Add ARIA labels for screen readers
    const resourceCards = document.querySelectorAll('.resource-card, .template-item, .guide-card, .tool-card');
    resourceCards.forEach(card => {
        const title = card.querySelector('h3, h4');
        const description = card.querySelector('p');
        const button = card.querySelector('button, a');

        if (title && button) {
            button.setAttribute('aria-label', `Download ${title.textContent}`);
        }
    });

    // ============================================
    // CONSOLE LOG - Resources Page Loaded
    // ============================================

    console.log('✅ Resources page loaded successfully!');

});

// ============================================
// TOAST STYLES (Add to CSS if not present)
// ============================================

const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .toast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease-out;
    }

    .toast-success {
        background: #10b981;
        color: white;
    }

    .toast-error {
        background: #ef4444;
        color: white;
    }

    .toast-warning {
        background: #f59e0b;
        color: white;
    }

    .toast-info {
        background: #3b82f6;
        color: white;
    }

    .toast-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .toast-content i {
        font-size: 1.25rem;
    }

    .toast-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        opacity: 0.7;
        transition: opacity 0.2s;
    }

    .toast-close:hover {
        opacity: 1;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @media (max-width: 480px) {
        .toast-container {
            left: 10px;
            right: 10px;
        }

        .toast {
            min-width: auto;
        }
    }
`;
document.head.appendChild(toastStyles);
