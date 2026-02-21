// ============================================
// CONTACT PAGE - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // FORM VALIDATION
    // ============================================

    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');
    const submitBtn = document.querySelector('.form-actions .btn-primary');

    // Real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const errorMessage = group.querySelector('.error-message');

        if (input && errorMessage) {
            input.addEventListener('blur', function() {
                validateField(this, errorMessage);
            });

            input.addEventListener('input', function() {
                if (group.classList.contains('error')) {
                    validateField(this, errorMessage);
                }
            });
        }
    });

    function validateField(field, errorElement) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required.';
        }

        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address.';
            }
        }

        // Phone validation
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                message = 'Please enter a valid phone number.';
            }
        }

        // Minimum length validation
        else if (field.minLength && value.length < field.minLength) {
            isValid = false;
            message = `Minimum ${field.minLength} characters required.`;
        }

        // Update field state
        const formGroup = field.closest('.form-group');
        if (isValid) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            errorElement.style.display = 'none';
        } else {
            formGroup.classList.remove('success');
            formGroup.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        return isValid;
    }

    // ============================================
    // FORM SUBMISSION
    // ============================================

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            let isFormValid = true;
            formGroups.forEach(group => {
                const input = group.querySelector('input, select, textarea');
                const errorMessage = group.querySelector('.error-message');
                if (input && errorMessage) {
                    if (!validateField(input, errorMessage)) {
                        isFormValid = false;
                    }
                }
            });

            if (!isFormValid) {
                showToast('Please correct the errors in the form.', 'error');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate form submission
            setTimeout(() => {
                // Reset loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';

                // Show success message
                showToast('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');

                // Reset form
                contactForm.reset();

                // Reset field states
                formGroups.forEach(group => {
                    group.classList.remove('error', 'success');
                    const errorMessage = group.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.style.display = 'none';
                    }
                });
            }, 2000);
        });
    }

    // ============================================
    // PHONE NUMBER FORMATTING
    // ============================================

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length >= 10) {
                // Format as (XXX) XXX-XXXX
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 6) {
                // Format as (XXX) XXX-XXXX
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2-');
            } else if (value.length >= 3) {
                // Format as (XXX)
                value = value.replace(/(\d{3})/, '($1) ');
            }

            e.target.value = value;
        });
    }

    // ============================================
    // LIVE CHAT SIMULATION
    // ============================================

    const liveChatBtn = document.querySelector('.contact-option-card .btn-primary[href="#live-chat"]');
    if (liveChatBtn) {
        liveChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLiveChat();
        });
    }

    function openLiveChat() {
        // Create chat widget
        const chatWidget = document.createElement('div');
        chatWidget.id = 'liveChatWidget';
        chatWidget.innerHTML = `
            <div class="chat-header">
                <div class="chat-avatar">
                    <img src="LOGO.png" alt="Support Agent">
                </div>
                <div class="chat-info">
                    <h4>UNIGATE Support</h4>
                    <span class="chat-status">● Online</span>
                </div>
                <button class="chat-close" onclick="closeLiveChat()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages">
                <div class="message agent">
                    <div class="message-avatar">
                        <img src="LOGO.png" alt="Agent">
                    </div>
                    <div class="message-content">
                        <p>Hi there! 👋 How can I help you with your university applications today?</p>
                        <span class="message-time">Just now</span>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message..." id="chatInput">
                <button onclick="sendChatMessage()">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;

        document.body.appendChild(chatWidget);

        // Add chat styles
        const chatStyles = document.createElement('style');
        chatStyles.textContent = `
            #liveChatWidget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 500px;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-xl);
                box-shadow: var(--shadow-xl);
                display: flex;
                flex-direction: column;
                z-index: 10000;
                animation: slideUp 0.3s ease-out;
            }

            .chat-header {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
                padding: var(--spacing-lg);
                background: var(--gradient-blue);
                border-radius: var(--radius-xl) var(--radius-xl) 0 0;
                color: white;
            }

            .chat-avatar img {
                width: 40px;
                height: 40px;
                border-radius: var(--radius-full);
            }

            .chat-info h4 {
                margin: 0;
                font-size: 1rem;
                font-weight: 600;
            }

            .chat-status {
                font-size: 0.75rem;
                color: #10b981;
            }

            .chat-close {
                margin-left: auto;
                background: none;
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                padding: var(--spacing-xs);
            }

            .chat-messages {
                flex: 1;
                padding: var(--spacing-lg);
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: var(--spacing-md);
            }

            .message {
                display: flex;
                gap: var(--spacing-md);
                max-width: 80%;
            }

            .message.agent {
                align-self: flex-start;
            }

            .message.user {
                align-self: flex-end;
                flex-direction: row-reverse;
            }

            .message-avatar img {
                width: 32px;
                height: 32px;
                border-radius: var(--radius-full);
            }

            .message-content {
                background: var(--bg-tertiary);
                padding: var(--spacing-md);
                border-radius: var(--radius-lg);
                position: relative;
            }

            .message.user .message-content {
                background: var(--gradient-blue);
                color: white;
            }

            .message-content p {
                margin: 0;
                font-size: 0.875rem;
                line-height: 1.4;
            }

            .message-time {
                font-size: 0.75rem;
                color: var(--text-tertiary);
                margin-top: var(--spacing-xs);
                display: block;
            }

            .chat-input {
                display: flex;
                gap: var(--spacing-sm);
                padding: var(--spacing-lg);
                border-top: 1px solid var(--border-color);
            }

            .chat-input input {
                flex: 1;
                padding: var(--spacing-md);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-tertiary);
                color: var(--text-primary);
                font-size: 0.875rem;
            }

            .chat-input input:focus {
                outline: none;
                border-color: var(--accent-blue);
            }

            .chat-input button {
                padding: var(--spacing-md);
                background: var(--gradient-blue);
                color: white;
                border: none;
                border-radius: var(--radius-md);
                cursor: pointer;
                transition: all var(--transition-base);
            }

            .chat-input button:hover {
                transform: translateY(-1px);
            }

            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @media (max-width: 480px) {
                #liveChatWidget {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 100px);
                    bottom: 10px;
                    right: 10px;
                }
            }
        `;
        document.head.appendChild(chatStyles);

        // Focus on input
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 100);

        showToast('Live chat opened! Type your message below.', 'info');
    }

    // Make functions globally available
    window.closeLiveChat = function() {
        const chatWidget = document.getElementById('liveChatWidget');
        if (chatWidget) {
            chatWidget.remove();
        }
    };

    window.sendChatMessage = function() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        const messagesContainer = document.querySelector('.chat-messages');
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        messagesContainer.appendChild(userMessage);

        // Clear input
        input.value = '';

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate agent response
        setTimeout(() => {
            const agentMessage = document.createElement('div');
            agentMessage.className = 'message agent';
            agentMessage.innerHTML = `
                <div class="message-avatar">
                    <img src="LOGO.png" alt="Agent">
                </div>
                <div class="message-content">
                    <p>Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to browse our resources or check out our FAQ section.</p>
                    <span class="message-time">Just now</span>
                </div>
            `;
            messagesContainer.appendChild(agentMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    };

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
    // WHATSAPP INTEGRATION
    // ============================================

    const whatsappBtn = document.querySelector('.contact-option-card .btn-primary[href="#whatsapp"]');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    }

    function openWhatsApp() {
        const phoneNumber = '+1234567890'; // Replace with actual WhatsApp business number
        const message = encodeURIComponent('Hi! I need help with university applications.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

        window.open(whatsappUrl, '_blank');
        showToast('Opening WhatsApp...', 'info');
    }

    // ============================================
    // EMAIL INTEGRATION
    // ============================================

    const emailBtn = document.querySelector('.contact-option-card .btn-primary[href="#email"]');
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openEmailClient();
        });
    }

    function openEmailClient() {
        const subject = encodeURIComponent('UNIGATE Support Request');
        const body = encodeURIComponent('Hi UNIGATE Team,\n\nI need assistance with:\n\n[Please describe your question or issue here]\n\nBest regards,\n[Your Name]');
        const emailUrl = `mailto:support@unigate.org?subject=${subject}&body=${body}`;

        window.location.href = emailUrl;
        showToast('Opening email client...', 'info');
    }

    // ============================================
    // PHONE CALL INTEGRATION
    // ============================================

    const phoneBtn = document.querySelector('.contact-option-card .btn-primary[href="#phone"]');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function(e) {
            e.preventDefault();
            initiatePhoneCall();
        });
    }

    function initiatePhoneCall() {
        const phoneNumber = '+1234567890'; // Replace with actual phone number
        const phoneUrl = `tel:${phoneNumber}`;

        window.location.href = phoneUrl;
        showToast('Initiating phone call...', 'info');
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================

    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter: Submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (contactForm && !submitBtn.disabled) {
                contactForm.dispatchEvent(new Event('submit'));
            }
        }

        // Escape: Close live chat
        if (e.key === 'Escape') {
            const chatWidget = document.getElementById('liveChatWidget');
            if (chatWidget) {
                closeLiveChat();
            }
        }
    });

    // ============================================
    // ACCESSIBILITY IMPROVEMENTS
    // ============================================

    // Add ARIA labels and descriptions
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            input.setAttribute('aria-required', 'true');
        }

        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            const labelId = `label-${input.id || Math.random().toString(36).substr(2, 9)}`;
            label.id = labelId;
            input.setAttribute('aria-labelledby', labelId);
        }
    });

    // Form validation announcements for screen readers
    function announceValidation(field, isValid, message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = isValid ? 'Field is valid' : `Error: ${message}`;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Update validation to include announcements
    const originalValidateField = validateField;
    validateField = function(field, errorElement) {
        const result = originalValidateField(field, errorElement);
        announceValidation(field, result, errorElement.textContent);
        return result;
    };

    // ============================================
    // CONSOLE LOG - Contact Page Loaded
    // ============================================

    console.log('✅ Contact page loaded successfully!');

});
