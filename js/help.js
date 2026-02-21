// ============================================
// HELP PAGE - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // SEARCH FUNCTIONALITY 
    // ============================================

    const searchInput = document.querySelector('.help-search input');
    const searchButton = document.querySelector('.help-search button');
    let searchTimeout;

    if (searchInput) {
        // Real-time search with debounce
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value.trim());
            }, 300);
        });

        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value.trim());
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value.trim());
        });
    }

    function performSearch(query) {
        const q = query.toLowerCase().trim();
        let matchCount = 0;

        // Filter help cards
        helpCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (q === '' || text.includes(q)) {
                card.classList.remove('hidden');
                card.classList.add('visible');
                matchCount++;
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });

        // Filter FAQ items
        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question h4').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
            if (q === '' || questionText.includes(q) || answerText.includes(q)) {
                item.classList.remove('hidden');
                item.classList.add('visible');
                matchCount++;
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
            }
        });

        // Show "no results" message if needed
        const faqSection = document.querySelector('.faq-section');
        if (q !== '' && matchCount === 0) {
            let noResults = document.getElementById('noSearchResults');
            if (!noResults) {
                noResults = document.createElement('p');
                noResults.id = 'noSearchResults';
                noResults.style.textAlign = 'center';
                noResults.style.color = 'var(--muted)';
                noResults.style.padding = '20px';
                faqSection.appendChild(noResults);
            }
            noResults.textContent = `No results found for "${query}"`;
        } else {
            const noResults = document.getElementById('noSearchResults');
            if (noResults) noResults.remove();
        }
    }

    // Search on button click
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
      });
    }

    // Search on Enter key in input field
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch(searchInput.value);
        }
      });

      // Real-time search as user types (optional: debounced)
      searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
      });
    }

    // FAQ accordion functionality (toggle answer on question click)
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          // Close other open items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('open');
            }
          });
          // Toggle current item
          item.classList.toggle('open');
        });
      }
    });

    // Live chat stub
    window.startLiveChat = function() {
      alert('Live chat feature will be available soon. Please use our email or phone support in the meantime.');
    };

    // Newsletter subscription stub
    window.subscribeNewsletter = function() {
      const email = document.getElementById('newsletterEmail').value.trim();
      if (!email) {
        alert('Please enter a valid email address.');
        return;
      }
      alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
      document.getElementById('newsletterEmail').value = '';
    };

    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopBtn.style.display = 'block';
        } else {
          backToTopBtn.style.display = 'none';
        }
      });
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function() {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });

        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ============================================
    // CATEGORY NAVIGATION
    // ============================================

    const categoryCards = document.querySelectorAll('.help-category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            navigateToCategory(category);
        });

        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    function navigateToCategory(category) {
        // Hide all sections
        const sections = document.querySelectorAll('.help-categories, .faq-section, .popular-articles');
        sections.forEach(section => section.style.display = 'none');

        // Show relevant content based on category
        switch (category) {
            case 'applications':
                showApplicationHelp();
                break;
            case 'documents':
                showDocumentHelp();
                break;
            case 'payments':
                showPaymentHelp();
                break;
            case 'technical':
                showTechnicalHelp();
                break;
            default:
                // Show all sections
                sections.forEach(section => section.style.display = 'block');
        }

        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });

        showToast(`Showing ${category} help topics`, 'info');
    }

    function showApplicationHelp() {
        // Filter FAQ items related to applications
        filterFAQ(['application', 'apply', 'admission']);
        document.querySelector('.faq-section').style.display = 'block';
        document.querySelector('.popular-articles').style.display = 'block';
    }

    function showDocumentHelp() {
        filterFAQ(['document', 'transcript', 'certificate']);
        document.querySelector('.faq-section').style.display = 'block';
        document.querySelector('.popular-articles').style.display = 'block';
    }

    function showPaymentHelp() {
        filterFAQ(['payment', 'fee', 'cost', 'money']);
        document.querySelector('.faq-section').style.display = 'block';
        document.querySelector('.popular-articles').style.display = 'block';
    }

    function showTechnicalHelp() {
        filterFAQ(['login', 'password', 'account', 'technical']);
        document.querySelector('.faq-section').style.display = 'block';
        document.querySelector('.popular-articles').style.display = 'block';
    }

    function filterFAQ(keywords) {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

            const isRelevant = keywords.some(keyword =>
                question.includes(keyword) || answer.includes(keyword)
            );

            item.style.display = isRelevant ? 'block' : 'none';
        });
    }

    // ============================================
    // ARTICLE NAVIGATION
    // ============================================

    const articleCards = document.querySelectorAll('.article-card');

    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const articleId = this.dataset.article;
            navigateToArticle(articleId);
        });
    });

    function navigateToArticle(articleId) {
        // In a real application, this would navigate to the full article
        showToast(`Opening article: ${articleId}`, 'info');

        // For demo purposes, we'll just highlight the article
        articleCards.forEach(card => {
            if (card.dataset.article === articleId) {
                card.style.borderColor = 'var(--accent-blue)';
                card.style.boxShadow = 'var(--shadow-lg)';

                // Scroll to article
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // ============================================
    // CONTACT OPTIONS
    // ============================================

    const contactOptions = document.querySelectorAll('.contact-option');

    contactOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const contactType = this.dataset.contact;

            switch (contactType) {
                case 'chat':
                    openLiveChat();
                    break;
                case 'email':
                    openEmailSupport();
                    break;
                case 'phone':
                    openPhoneSupport();
                    break;
                case 'faq':
                    scrollToSection('faq-section');
                    break;
            }
        });
    });

    function openLiveChat() {
        showToast('Opening live chat support...', 'info');
        // In a real application, this would open a chat widget
        setTimeout(() => {
            showToast('Live chat is currently offline. Please try email support.', 'warning');
        }, 1000);
    }

    function openEmailSupport() {
        const subject = encodeURIComponent('UNIGATE Help Request');
        const body = encodeURIComponent('Hi UNIGATE Support Team,\n\nI need help with:\n\n[Please describe your issue here]\n\nBest regards,\n[Your Name]');
        const emailUrl = `mailto:support@unigate.org?subject=${subject}&body=${body}`;

        window.location.href = emailUrl;
        showToast('Opening email client...', 'info');
    }

    function openPhoneSupport() {
        const phoneNumber = '+1234567890';
        const phoneUrl = `tel:${phoneNumber}`;

        window.location.href = phoneUrl;
        showToast('Initiating phone call...', 'info');
    }

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

    // Make functions globally available
    window.showToast = showToast;
    window.navigateToResult = function(type, index) {
        if (type === 'faq') {
            const faqItems = document.querySelectorAll('.faq-item');
            if (faqItems[index]) {
                faqItems[index].querySelector('.faq-question').click();
                faqItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else if (type === 'article') {
            const articles = document.querySelectorAll('.article-card');
            if (articles[index]) {
                articles[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                articles[index].style.borderColor = 'var(--accent-blue)';
                articles[index].style.boxShadow = 'var(--shadow-lg)';
            }
        }
        hideSearchResults();
    };

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================

    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                showToast('Search activated - type to find help topics', 'info');
            }
        }

        // Escape: Clear search
        if (e.key === 'Escape') {
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                hideSearchResults();
                searchInput.blur();
            }
        }
    });

    // ============================================
    // ACCESSIBILITY IMPROVEMENTS
    // ============================================

    // Add ARIA labels and descriptions
    if (searchInput) {
        searchInput.setAttribute('aria-label', 'Search help topics');
        searchInput.setAttribute('role', 'searchbox');
    }

    categoryCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View ${card.querySelector('h3').textContent} help topics`);
    });

    articleCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Read article: ${card.querySelector('h4').textContent}`);
    });

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', `faq-answer-${item.dataset.faq}`);
        answer.setAttribute('id', `faq-answer-${item.dataset.faq}`);
        answer.setAttribute('aria-hidden', 'true');

        item.addEventListener('toggle', function() {
            const isExpanded = item.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded.toString());
            answer.setAttribute('aria-hidden', (!isExpanded).toString());
        });
    });

    // ============================================
    // CONSOLE LOG - Help Page Loaded
    // ============================================

    console.log('✅ Help page loaded successfully!');

});
