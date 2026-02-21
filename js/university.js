// ============================================
// UNIVERSITY DATA STRUCTURE
// ============================================

const universities = {
    "harvard": {
        name: "Harvard University",
        location: "Cambridge, Massachusetts, USA",
        established: "1636",
        stats: {
            students: 21000,
            acceptanceRate: 5,
            faculty: 2400,
            countries: 150
        },
        contact: {
            email: "admissions@harvard.edu",
            phone: "+1 (617) 495-1551",
            website: "www.harvard.edu"
        },
        programs: [
            { name: "Computer Science", degree: "Bachelor's", duration: "4 years", fees: "$52,659/year" },
            { name: "Business Administration", degree: "MBA", duration: "2 years", fees: "$73,440/year" },
            { name: "Law", degree: "JD", duration: "3 years", fees: "$67,081/year" },
            { name: "Medicine", degree: "MD", duration: "4 years", fees: "$63,400/year" }
        ],
        campuses: [
            { name: "Main Campus", location: "Cambridge, MA", facilities: ["Libraries", "Research Labs", "Sports Facilities", "Dining Halls"] },
            { name: "Medical Campus", location: "Boston, MA", facilities: ["Teaching Hospital", "Research Centers", "Medical Libraries"] }
        ],
        scholarships: [
            { name: "Harvard College Scholarships", amount: "Full Tuition", description: "Need-based financial aid covering full tuition for admitted students.", deadline: "March 1" },
            { name: "Harvard Business School Scholarships", amount: "Up to $100,000", description: "Merit-based scholarships for MBA students.", deadline: "April 15" }
        ],
        requirements: [
            "High School Diploma or equivalent",
            "SAT/ACT scores (optional for 2025)",
            "Letters of recommendation",
            "Personal statement",
            "Extracurricular activities"
        ],
        advisors: [
            { name: "Dr. Sarah Johnson", role: "Undergraduate Admissions Director", description: "Specializes in undergraduate admissions and financial aid." },
            { name: "Prof. Michael Chen", role: "Graduate Programs Advisor", description: "Advises on graduate programs and research opportunities." }
        ]
    },
    "uon": {
        name: "University of Nairobi",
        location: "Nairobi, Kenya",
        established: "1970",
        stats: {
            students: 84000,
            acceptanceRate: 65,
            faculty: 2000,
            countries: 80
        },
        contact: {
            email: "admissions@uonbi.ac.ke",
            phone: "+254 20 491 0000",
            website: "www.uonbi.ac.ke"
        },
        programs: [
            { name: "Computer Science", degree: "Bachelor's", duration: "4 years", fees: "$1,200/year" },
            { name: "Business Administration", degree: "Bachelor's", duration: "4 years", fees: "$1,000/year" },
            { name: "Medicine", degree: "Bachelor's", duration: "6 years", fees: "$2,500/year" },
            { name: "Engineering", degree: "Bachelor's", duration: "5 years", fees: "$1,500/year" }
        ],
        campuses: [
            { name: "Main Campus", location: "Nairobi Westlands", facilities: ["Libraries", "Computer Labs", "Sports Complex", "Student Center"] },
            { name: "Chiromo Campus", location: "Nairobi CBD", facilities: ["Medical School", "Research Labs", "Teaching Hospital"] }
        ],
        scholarships: [
            { name: "Government Scholarships", amount: "Full Tuition", description: "Available for Kenyan students with excellent academic performance.", deadline: "June 30" },
            { name: "Commonwealth Scholarships", amount: "Full Funding", description: "For students from Commonwealth countries.", deadline: "December 15" }
        ],
        requirements: [
            "Kenya Certificate of Secondary Education (KCSE)",
            "Minimum C+ grade average",
            "English proficiency",
            "Application form and fee",
            "Birth certificate"
        ],
        advisors: [
            { name: "Dr. Grace Wanjiku", role: "International Students Advisor", description: "Assists international students with admissions and visa processes." },
            { name: "Prof. David Kiprop", role: "Academic Advisor", description: "Provides guidance on academic programs and career paths." }
        ]
    },
    "uct": {
        name: "University of Cape Town",
        location: "Cape Town, South Africa",
        established: "1829",
        stats: {
            students: 29000,
            acceptanceRate: 25,
            faculty: 1500,
            countries: 120
        },
        contact: {
            email: "study@uct.ac.za",
            phone: "+27 21 650 9111",
            website: "www.uct.ac.za"
        },
        programs: [
            { name: "Computer Science", degree: "Bachelor's", duration: "3 years", fees: "$3,500/year" },
            { name: "Commerce", degree: "Bachelor's", duration: "3 years", fees: "$3,200/year" },
            { name: "Medicine", degree: "MBChB", duration: "6 years", fees: "$5,000/year" },
            { name: "Law", degree: "LLB", duration: "4 years", fees: "$4,000/year" }
        ],
        campuses: [
            { name: "Upper Campus", location: "Rondebosch", facilities: ["Libraries", "Research Centers", "Sports Facilities", "Student Village"] },
            { name: "Medical Campus", location: "Observatory", facilities: ["Teaching Hospital", "Medical Research Labs", "Clinical Facilities"] }
        ],
        scholarships: [
            { name: "UCT Scholarships", amount: "Up to $10,000", description: "Merit-based scholarships for undergraduate students.", deadline: "October 31" },
            { name: "NSFAS Funding", amount: "Full Coverage", description: "South African government funding for eligible students.", deadline: "December 31" }
        ],
        requirements: [
            "National Senior Certificate (NSC)",
            "Minimum 60% average",
            "English proficiency",
            "Mathematics for STEM programs",
            "Personal statement"
        ],
        advisors: [
            { name: "Ms. Thandi Nkosi", role: "Student Advisor", description: "Helps with course selection and academic planning." },
            { name: "Dr. James Thompson", role: "International Office", description: "Supports international students with admissions and orientation." }
        ]
    },
    "urk": {
        name: "University of Rwanda",
        location: "Kigali, Rwanda",
        established: "2013",
        stats: {
            students: 30000,
            acceptanceRate: 70,
            faculty: 1200,
            countries: 50
        },
        contact: {
            email: "admissions@ur.ac.rw",
            phone: "+250 788 123 456",
            website: "www.ur.ac.rw"
        },
        programs: [
            { name: "Computer Science", degree: "Bachelor's", duration: "4 years", fees: "$800/year" },
            { name: "Business Administration", degree: "Bachelor's", duration: "4 years", fees: "$700/year" },
            { name: "Agriculture", degree: "Bachelor's", duration: "4 years", fees: "$600/year" },
            { name: "Education", degree: "Bachelor's", duration: "3 years", fees: "$500/year" }
        ],
        campuses: [
            { name: "Gikondo Campus", location: "Kigali", facilities: ["Modern Classrooms", "Computer Labs", "Library", "Sports Facilities"] },
            { name: "Huye Campus", location: "Southern Province", facilities: ["Agriculture Research", "Science Labs", "Student Residences"] }
        ],
        scholarships: [
            { name: "Government Scholarships", amount: "Full Tuition", description: "Available for Rwandan students with high academic achievement.", deadline: "August 31" },
            { name: "African Development Bank Scholarships", amount: "Full Funding", description: "For students from African countries pursuing development-related fields.", deadline: "March 31" }
        ],
        requirements: [
            "Rwanda Advanced Certificate of Education",
            "Minimum 65% average",
            "English proficiency",
            "Application form",
            "Medical certificate"
        ],
        advisors: [
            { name: "Dr. Marie Claire Uwimana", role: "Academic Advisor", description: "Provides guidance on academic programs and student success." },
            { name: "Mr. Jean Baptiste Nkurunziza", role: "International Students Coordinator", description: "Assists international students with admissions and integration." }
        ]
    },
    "mak": {
        name: "Makerere University",
        location: "Kampala, Uganda",
        established: "1922",
        stats: {
            students: 40000,
            acceptanceRate: 55,
            faculty: 1800,
            countries: 90
        },
        contact: {
            email: "admissions@mak.ac.ug",
            phone: "+256 414 595 945",
            website: "www.mak.ac.ug"
        },
        programs: [
            { name: "Computer Science", degree: "Bachelor's", duration: "4 years", fees: "$1,000/year" },
            { name: "Medicine", degree: "Bachelor's", duration: "5 years", fees: "$2,200/year" },
            { name: "Law", degree: "Bachelor's", duration: "4 years", fees: "$1,500/year" },
            { name: "Engineering", degree: "Bachelor's", duration: "4 years", fees: "$1,800/year" }
        ],
        campuses: [
            { name: "Main Campus", location: "Kampala", facilities: ["Libraries", "Research Centers", "Sports Complex", "Medical Center"] },
            { name: "Business School", location: "Nakawa", facilities: ["Executive Classrooms", "Computer Labs", "Conference Facilities"] }
        ],
        scholarships: [
            { name: "Government Scholarships", amount: "Full Tuition", description: "Available for Ugandan students with excellent academic records.", deadline: "July 31" },
            { name: "Commonwealth Scholarships", amount: "Full Funding", description: "For students from Commonwealth countries.", deadline: "December 15" }
        ],
        requirements: [
            "Uganda Advanced Certificate of Education",
            "Minimum B average",
            "English proficiency",
            "Application form and fee",
            "Medical report"
        ],
        advisors: [
            { name: "Dr. Sarah Nakato", role: "Student Affairs Director", description: "Oversees student welfare and academic advising." },
            { name: "Prof. Joseph Oloro", role: "International Programs Coordinator", description: "Manages international student admissions and partnerships." }
        ]
    }
};

// ============================================
// UNIVERSITY PAGE - JAVASCRIPT
// ============================================

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION & STATE
    // ============================================

    const CONFIG = {
        animationDuration: 300,
        scrollOffset: 100,
        toastDuration: 4000,
        parallaxSpeed: 0.5
    };

    let currentTheme = localStorage.getItem('universityTheme') || 'dark';
    let searchTimeout;
    let observer;

    // ============================================
    // DOM ELEMENTS
    // ============================================

    const elements = {
        body: document.body,
        themeToggle: document.getElementById('themeToggle'),
        sidebarToggle: document.getElementById('sidebarToggle'),
        mobileNav: document.getElementById('mobileNav'),
        mobileNavOverlay: document.getElementById('mobileNavOverlay'),
        mobileNavClose: document.getElementById('mobileNavClose'),
        backToTop: document.getElementById('backToTop'),
        fab: document.getElementById('fab'),
        toastContainer: document.getElementById('toastContainer'),
        universitySearch: document.getElementById('universitySearch'),
        searchBtn: document.getElementById('searchBtn'),
        dropdownToggle: document.getElementById('dropdownToggle'),
        universityDropdown: document.getElementById('universityDropdown'),
        selectedUniversity: document.getElementById('selectedUniversity'),
        searchResults: document.getElementById('searchResults'),
        universityContent: document.getElementById('universityContent'),
        loadingOverlay: document.getElementById('loadingOverlay'),
        backToSearch: document.getElementById('backToSearch'),
        subscribeForm: document.getElementById('subscribeForm'),
        subscribeEmail: document.getElementById('subscribeEmail'),
        startApplicationBtn: document.getElementById('startApplicationBtn'),
        subscribeUpdatesBtn: document.getElementById('subscribeUpdatesBtn')
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(searchTimeout);
                func(...args);
            };
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(later, wait);
        };
    }

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

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-header">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} toast-icon"></i>
                <span class="toast-title">${type === 'success' ? 'Success' : 'Error'}</span>
            </div>
            <div class="toast-message">${message}</div>
        `;

        elements.toastContainer.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), CONFIG.animationDuration);
        }, CONFIG.toastDuration);
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

    function showLoading() {
        if (elements.loadingOverlay) {
            elements.loadingOverlay.style.display = 'flex';
        }
    }

    function hideLoading() {
        if (elements.loadingOverlay) {
            elements.loadingOverlay.style.display = 'none';
        }
    }

    function renderUniversityContent(university) {
        const data = universities[university];
        if (!data) return;

        // Update hero section
        const universityName = document.getElementById('universityName');
        const universityLocation = document.getElementById('universityLocation');
        const universityEstablished = document.getElementById('universityEstablished');

        if (universityName) universityName.textContent = data.name;
        if (universityLocation) universityLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location}`;
        if (universityEstablished) universityEstablished.innerHTML = `<i class="fas fa-calendar-alt"></i> Established ${data.established}`;

        // Update stats
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        statNumbers.forEach(number => {
            const target = data.stats[number.getAttribute('data-target')];
            if (target !== undefined) {
                number.setAttribute('data-target', target);
                number.textContent = '0';
            }
        });

        // Update contact info
        const universityEmail = document.getElementById('universityEmail');
        const universityPhone = document.getElementById('universityPhone');
        const universityWebsite = document.getElementById('universityWebsite');

        if (universityEmail) universityEmail.textContent = data.contact.email;
        if (universityPhone) universityPhone.textContent = data.contact.phone;
        if (universityWebsite) universityWebsite.textContent = data.contact.website;

        // Render courses
        renderCourses(data.programs);

        // Render campuses
        renderCampuses(data.campuses);

        // Render scholarships
        renderScholarships(data.scholarships);

        // Render requirements
        renderRequirements(data.requirements);

        // Render advisors
        renderAdvisors(data.advisors);

        // Show university content
        if (elements.universityContent) {
            elements.universityContent.style.display = 'block';
            setTimeout(() => {
                scrollToSection('universityHero');
            }, 100);
        }

        // Re-initialize animated counters
        initAnimatedCounters();
    }

    function renderCourses(programs) {
        const coursesList = document.getElementById('coursesList');
        if (!coursesList) return;

        const coursesHTML = programs.map(program => `
            <div class="course-card">
                <div class="course-header">
                    <div class="course-title">${program.name}</div>
                    <span class="course-degree">${program.degree}</span>
                </div>
                <div class="course-description">
                    A comprehensive program designed to provide students with advanced knowledge and practical skills in their chosen field.
                </div>
                <div class="course-meta">
                    <span class="course-duration"><i class="fas fa-clock"></i> ${program.duration}</span>
                    <span class="course-fees"><i class="fas fa-dollar-sign"></i> ${program.fees}</span>
                </div>
            </div>
        `).join('');

        coursesList.innerHTML = coursesHTML;
    }

    function renderCampuses(campuses) {
        const campusList = document.getElementById('campusList');
        if (!campusList) return;

        const campusesHTML = campuses.map(campus => `
            <div class="campus-item">
                <div class="campus-icon">
                    <i class="fas fa-university"></i>
                </div>
                <div class="campus-info">
                    <h4>${campus.name}</h4>
                    <p class="campus-location"><i class="fas fa-map-marker-alt"></i> ${campus.location}</p>
                    <p>Facilities: ${campus.facilities.join(', ')}</p>
                </div>
            </div>
        `).join('');

        campusList.innerHTML = campusesHTML;
    }

    function renderScholarships(scholarships) {
        const scholarshipsList = document.getElementById('scholarshipsList');
        if (!scholarshipsList) return;

        const scholarshipsHTML = scholarships.map(scholarship => `
            <div class="scholarship-item">
                <div class="item-header">
                    <div class="item-title">${scholarship.name}</div>
                    <div class="item-amount">${scholarship.amount}</div>
                </div>
                <div class="item-description">${scholarship.description}</div>
                <div class="item-deadline">Deadline: ${scholarship.deadline}</div>
            </div>
        `).join('');

        scholarshipsList.innerHTML = scholarshipsHTML;
    }

    function renderRequirements(requirements) {
        const requirementsList = document.getElementById('requirementsList');
        if (!requirementsList) return;

        const requirementsHTML = requirements.map(requirement => `
            <div class="requirement-item">
                <div class="item-header">
                    <div class="item-title">${requirement}</div>
                </div>
                <div class="item-description">This requirement ensures that applicants meet the academic and personal standards necessary for successful completion of the program.</div>
            </div>
        `).join('');

        requirementsList.innerHTML = requirementsHTML;
    }

    function renderAdvisors(advisors) {
        const advisorsList = document.getElementById('advisorsList');
        if (!advisorsList) return;

        const advisorsHTML = advisors.map(advisor => `
            <div class="advisor-card">
                <div class="advisor-avatar">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <div class="advisor-name">${advisor.name}</div>
                <div class="advisor-role">${advisor.role}</div>
                <div class="advisor-description">${advisor.description}</div>
            </div>
        `).join('');

        advisorsList.innerHTML = advisorsHTML;
    }

    // ============================================
    // THEME MANAGEMENT
    // ============================================

    function initTheme() {
        elements.body.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        elements.body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('universityTheme', currentTheme);
        updateThemeIcon();
    }

    function updateThemeIcon() {
        if (elements.themeToggle) {
            const icon = elements.themeToggle.querySelector('i');
            if (icon) {
                icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
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
            window.addEventListener('scroll', debounce(() => {
                const scrolled = window.pageYOffset;
                const threshold = 300;

                if (scrolled > threshold) {
                    elements.backToTop.classList.add('show');
                } else {
                    elements.backToTop.classList.remove('show');
                }
            }, 10));

            elements.backToTop.addEventListener('click', scrollToTop);
        }

        // FAB scroll behavior
        if (elements.fab) {
            window.addEventListener('scroll', debounce(() => {
                const scrolled = window.pageYOffset;
                const icon = elements.fab.querySelector('i');

                if (scrolled > 500) {
                    icon.className = 'fas fa-arrow-up';
                } else {
                    icon.className = 'fas fa-plus';
                }
            }, 10));
        }

        // Parallax effect for hero
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            const heroPattern = document.querySelector('.hero-pattern');

            if (heroPattern) {
                const yPos = -(scrolled * CONFIG.parallaxSpeed);
                heroPattern.style.transform = `translateY(${yPos}px)`;
            }
        }, 10));
    }

    // ============================================
    // UNIVERSITY SEARCH & DROPDOWN
    // ============================================

    function initUniversitySearch() {
        // Initialize dropdown with universities
        populateDropdown();

        // Search button functionality - perform search on click
        if (elements.searchBtn) {
            elements.searchBtn.addEventListener('click', performSearch);
        }

        // Search input - handle Enter key
        if (elements.universitySearch) {
            elements.universitySearch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }

        // Dropdown toggle
        if (elements.dropdownToggle) {
            elements.dropdownToggle.addEventListener('click', toggleDropdown);
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                closeDropdown();
            }
        });

        // Back to search functionality
        if (elements.backToSearch) {
            elements.backToSearch.addEventListener('click', backToSearch);
        }
    }

    function populateDropdown() {
        if (!elements.universityDropdown) return;

        const dropdownHTML = Object.keys(universities).map(key => `
            <div class="dropdown-item" data-university="${key}">
                <div class="university-name">${universities[key].name}</div>
                <div class="university-location">${universities[key].location}</div>
            </div>
        `).join('');

        elements.universityDropdown.innerHTML = dropdownHTML;

        // Add click handlers to dropdown items
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                const universityKey = item.getAttribute('data-university');
                selectUniversity(universityKey);
            });
        });
    }



    function toggleDropdown() {
        if (!elements.universityDropdown) return;

        const isOpen = elements.universityDropdown.classList.contains('show');
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    function openDropdown() {
        if (elements.universityDropdown && elements.dropdownToggle) {
            elements.universityDropdown.classList.add('show');
            elements.dropdownToggle.classList.add('active');
        }
    }

    function closeDropdown() {
        if (elements.universityDropdown && elements.dropdownToggle) {
            elements.universityDropdown.classList.remove('show');
            elements.dropdownToggle.classList.remove('active');
        }
    }

    function performSearch() {
        const query = elements.universitySearch.value.toLowerCase().trim();

        if (query === '') {
            showToast('Please enter a university name to search.', 'error');
            return;
        }

        // Find exact match first
        const exactMatch = Object.keys(universities).find(key =>
            universities[key].name.toLowerCase() === query
        );

        if (exactMatch) {
            selectUniversity(exactMatch);
            return;
        }

        // Find partial matches
        const partialMatches = Object.keys(universities).filter(key =>
            universities[key].name.toLowerCase().includes(query) ||
            universities[key].location.toLowerCase().includes(query)
        );

        if (partialMatches.length === 1) {
            selectUniversity(partialMatches[0]);
        } else if (partialMatches.length > 1) {
            showToast(`Found ${partialMatches.length} universities. Please be more specific.`, 'error');
        } else {
            showToast('No university found. Try to choose from the list.', 'error');
        }
    }

    function hideSearchResults() {
        // This function is kept for compatibility but search results are no longer shown
        return;
    }

    function selectUniversity(universityKey) {
        if (!universities[universityKey]) return;

        // Update dropdown display
        if (elements.selectedUniversity) {
            elements.selectedUniversity.textContent = universities[universityKey].name;
        }

        // Clear search
        if (elements.universitySearch) {
            elements.universitySearch.value = '';
        }

        // Hide dropdown and results
        closeDropdown();
        hideSearchResults();

        // Show loading and render university
        showLoading();
        setTimeout(() => {
            renderUniversityContent(universityKey);
            hideLoading();
        }, 500);
    }

    function backToSearch() {
        if (elements.universityContent) {
            elements.universityContent.style.display = 'none';
        }

        // Reset dropdown
        if (elements.selectedUniversity) {
            elements.selectedUniversity.textContent = 'Select a University';
        }

        // Scroll to top
        scrollToTop();
    }

    // ============================================
    // COURSE EXPANSION
    // ============================================

    function initCourseExpansion() {
        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
            const expandBtn = card.querySelector('.course-expand-btn');
            const details = card.querySelector('.course-details');

            if (expandBtn && details) {
                expandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isExpanded = details.classList.contains('show');

                    // Close all other expanded cards
                    document.querySelectorAll('.course-details.show').forEach(openDetail => {
                        if (openDetail !== details) {
                            openDetail.classList.remove('show');
                            const otherBtn = openDetail.parentElement.querySelector('.course-expand-btn');
                            if (otherBtn) {
                                otherBtn.textContent = 'View Details';
                            }
                        }
                    });

                    // Toggle current card
                    details.classList.toggle('show');
                    expandBtn.textContent = isExpanded ? 'View Details' : 'Hide Details';
                });
            }

            // Click on card to expand
            card.addEventListener('click', () => {
                const expandBtn = card.querySelector('.course-expand-btn');
                if (expandBtn) {
                    expandBtn.click();
                }
            });
        });
    }

    // ============================================
    // FORM HANDLING
    // ============================================

    function initForms() {
        // Subscribe form
        if (elements.subscribeForm) {
            elements.subscribeForm.addEventListener('submit', handleSubscribe);
        }

        // Start application button
        if (elements.startApplicationBtn) {
            elements.startApplicationBtn.addEventListener('click', () => {
                window.location.href = 'home.html';
            });
        }

        // Subscribe updates button
        if (elements.subscribeUpdatesBtn) {
            elements.subscribeUpdatesBtn.addEventListener('click', () => {
                if (elements.subscribeEmail) {
                    elements.subscribeEmail.focus();
                    scrollToSection('subscribe');
                }
            });
        }
    }

    function handleSubscribe(e) {
        e.preventDefault();

        const email = elements.subscribeEmail.value.trim();

        if (!validateEmail(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate API call
        elements.subscribeForm.querySelector('button').disabled = true;
        elements.subscribeForm.querySelector('button').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

        setTimeout(() => {
            showToast('Thank you for subscribing! You will receive updates soon.');
            elements.subscribeEmail.value = '';
            elements.subscribeForm.querySelector('button').disabled = false;
            elements.subscribeForm.querySelector('button').innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
        }, 1500);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================

    function initAnimatedCounters() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateNumber(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(number => counterObserver.observe(number));
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

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        // Theme handled by universal theme.js

        // Navigation
        initMobileNav();

        // Scroll handlers
        initScrollHandlers();

        // University search
        initUniversitySearch();

        // Course expansion
        initCourseExpansion();

        // Forms
        initForms();

        // Animated counters
        initAnimatedCounters();

        // Accessibility
        initAccessibility();

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
        const animateElements = document.querySelectorAll('.content-card, .sidebar-card');
        animateElements.forEach(el => observer.observe(el));

        console.log('✅ University page initialized successfully!');
    }

    // ============================================
    // PUBLIC API
    // ============================================

    window.UniversityPage = {
        scrollToSection,
        scrollToTop,
        showToast,
        toggleTheme
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    } const backToTopBtn = document.getElementById('backToTop');
    
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

})();
