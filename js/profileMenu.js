// ============================================
// PROFILE MENU - JS FILE
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    function updateProfileDisplay() {
        const profileAvatar = document.getElementById('profileAvatar');
        const profileName = document.getElementById('profileName');

        if (!profileAvatar || !profileName) return;

        const userData = localStorage.getItem('user');

        if (userData) {
            try {
                const user = JSON.parse(userData);
                profileAvatar.src = user.profileImage || 'LOGO.png';
                profileName.textContent = user.name || 'User';
            } catch (e) {
                console.error('Error parsing user data:', e);
                profileAvatar.src = 'https://via.placeholder.com/36x36?text=User';
                profileName.textContent = 'Welcome';
            }
        } else {
            profileAvatar.src = 'fontawesome-free-6.7.2-web/svgs/solid/user.svg';
            profileName.textContent = 'Welcome';
        }
    }

    // Initialize profile UI
    updateProfileDisplay();
});

// =============================
// PROFILE DROPDOWN LOGIC
// =============================
const profileMenu = document.querySelector('.profile-menu');
const dropdown = document.getElementById('profileDropdown');

// Change this dynamically when the user is logged in
const isLoggedIn = false;

function renderDropdown() {
    if (isLoggedIn) {
        dropdown.innerHTML = `
            <a href="#" class="dropdown-item">Logout</a>
        `;
    } else {
        dropdown.innerHTML = `
            <a href="#" class="dropdown-item openPopup" data-type="signin">Sign In</a>
            <a href="#" class="dropdown-item openPopup" data-type="create">Create Account</a>
        `;
    }
}
// Initial render - moved inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    renderDropdown();
});

// Toggle dropdown
profileMenu.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!profileMenu.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});


(function() {
  const popup = document.getElementById('authPopup');
  const closeBtn = document.getElementById('closePopup');
  const popupHeading = document.getElementById('popupHeading');

  const selectScreen = document.getElementById('selectScreen');
  const loginScreen = document.getElementById('loginScreen');

  const authButtons = document.querySelectorAll('.auth-btn');
  const extraFieldContainer = document.getElementById('extraFieldContainer');
  const loginTitle = document.getElementById('loginTitle');
  const loginForm = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMsg');
  const backBtn = document.getElementById('backToSelect');

  const createLink = document.querySelector('.create-link');

  let clickedMode = null; // "signin" or "create"
  let selectedType = null; // "firstyear" or "transfer"

  // ------------------ OPEN POPUP ------------------
  document.addEventListener('click', (e) => {
    const el = e.target;

    // Dropdown Sign In
    if(el.classList.contains('openPopup') && el.dataset.type === 'signin') {
      openPopup('signin');
    }

    // Dropdown Create Account
    if(el.classList.contains('openPopup') && el.dataset.type === 'create') {
      openPopup('create');
    }
  });

  // ------------------ OPEN POPUP FUNCTION ------------------
function openPopup(mode) {
    clickedMode = mode;
    selectedType = null;
    errorMsg.textContent = '';
    extraFieldContainer.innerHTML = '';
    loginForm.reset();

    selectScreen.classList.add('active');
    loginScreen.classList.remove('active');

    popup.classList.add('show');
    popup.setAttribute('aria-hidden','false');

    // Set header text based on mode
    popupHeading.textContent = mode === 'signin' ? 'Sign In' : 'Get Started';

    // Update bottom text and link
    if(mode === 'signin') {
        bottomText.textContent = "Don't have an account yet?";
        bottomLink.textContent = "Create an account →";
        bottomLink.setAttribute('href','#');
        bottomLink.addEventListener('click', (e) => {
            e.preventDefault();
            openPopup('create');
        });
    } else  {
        bottomText.textContent = "Already have an account?";
        bottomLink.textContent = "Log in here →";
        bottomLink.setAttribute('href','#');
        bottomLink.addEventListener('click', (e) => {
            e.preventDefault();
            openPopup('signin');
        });
    }
}


  // ------------------ CREATE ACCOUNT LINK INSIDE POPUP ------------------
  if(createLink){
    createLink.addEventListener('click', (e)=>{
      e.preventDefault();
      openPopup('create');
    });
  }

  // ------------------ CLOSE POPUP ------------------
  closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', e => { if(e.target === popup) closePopup(); });
  function closePopup() {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden','true');
    clickedMode = null;
    selectedType = null;
  }

  // ------------------ BACK BUTTON ------------------
  backBtn.addEventListener('click', () => {
    selectedType = null;
    extraFieldContainer.innerHTML = '';
    loginForm.reset();
    errorMsg.textContent = '';
    loginScreen.classList.remove('active');
    selectScreen.classList.add('active');
  });

  // ------------------ STUDENT BUTTONS ------------------
  authButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedType = btn.dataset.type;

      if(clickedMode === 'signin') {
        loginTitle.textContent = selectedType === 'firstyear' ? 'First-Year Student Login' : 'Transfer Student Login';
        extraFieldContainer.innerHTML = selectedType === 'transfer' ? 
          `<input type="text" id="previousSchool" placeholder="Previous School (required)" required>` : '';
        selectScreen.classList.remove('active');
        loginScreen.classList.add('active');
      }

      if(clickedMode === 'create') {
        // Redirect to signup page
        const page = selectedType === 'firstyear' ? 'firstyear_signup.html' : 'transfer_signup.html';
        window.location.href = page;
      }
    });
  });

  // ------------------ LOGIN FORM ------------------
  loginForm.addEventListener('submit', evt => {
    evt.preventDefault();
    errorMsg.style.color = '#c00';
    errorMsg.textContent = '';

    if(!selectedType) {
      errorMsg.textContent = 'Please select a student type.';
      return;
    }

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    let previousSchool = null;

    if(selectedType === 'transfer') {
      const el = document.getElementById('previousSchool');
      previousSchool = el ? el.value.trim() : '';
      if(!previousSchool) {
        errorMsg.textContent = 'Previous school is required.';
        return;
      }
    }

    // ---------- BACKEND-READY SIMULATION ----------
    const result = simulateBackendCheck(email, selectedType);
    if(!result.success){
      errorMsg.textContent = result.message;
      return;
    }

    errorMsg.style.color = 'green';
    errorMsg.textContent = 'Login successful — demo.';
  });

  function simulateBackendCheck(email, type){
    const fakeDB = {
      'john@gmail.com':'firstyear',
      'lucy@gmail.com':'transfer'
    };
    if(!fakeDB[email]) return {success:false, message:'Account not found.'};
    if(fakeDB[email] !== type){
      const prettyReg = fakeDB[email] === 'firstyear' ? 'First-Year' : 'Transfer';
      const prettySel = type === 'firstyear' ? 'First-Year' : 'Transfer';
      return {success:false, message:`Cannot log in as ${prettySel}. Account is ${prettyReg}.`};
    }
    return {success:true};
  }

  window.openAuthPopup = openPopup;
})();

const bottomText = document.querySelector('.no-account'); // the <p> text
const bottomLink = document.querySelector('.create-link'); // the <a> link

