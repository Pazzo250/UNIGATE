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
let bottomText = null;
let bottomLink = null;

// Render dropdown based on whether a user object exists in localStorage
function renderDropdown() {
  const userJson = localStorage.getItem('user');
  if (!dropdown) return;

  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      dropdown.innerHTML = `
        <div class="dropdown-user-info" style="padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.04);">
          <div style="display:flex; align-items:center; gap:10px;">
          <img src="${user.profileImage || 'LOGO.png'}" alt="avatar" style="width:36px;height:36px;border-radius:50%;object-fit:cover;">
          <div style="line-height:1"> <strong style="color:#fff">${user.name || 'Student'}</strong><br><small style="color:rgba(230,238,248,0.7)">${user.email || ''}</small></div>
          </div>
        </div>
        <a href="student-dashboard.html" class="dropdown-item dropdown-profile">Dashboard</a>
        <a href="#" class="dropdown-item dropdown-logout">Logout</a>
      `;

      // attach logout handler
      const logoutEl = dropdown.querySelector('.dropdown-logout');
      if (logoutEl) logoutEl.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        // reset profile ui
        const profileAvatar = document.getElementById('profileAvatar');
        const profileName = document.getElementById('profileName');
        if (profileAvatar) profileAvatar.src = 'fontawesome-free-6.7.2-web/svgs/solid/user.svg';
        if (profileName) profileName.textContent = 'Welcome';
        renderDropdown();
      });
    } catch (e) {
      console.error('Error parsing user JSON', e);
      localStorage.removeItem('user');
      renderDropdown();
    }
  } else {
    dropdown.innerHTML = `
      <a href="#" class="dropdown-item openPopup" data-type="signin">Sign In</a>
      <a href="#" class="dropdown-item openPopup" data-type="create">Create Account</a>
    `;
  }
}
// Initial render - set popup bottom links after DOM ready and render dropdown
document.addEventListener('DOMContentLoaded', function () {
  // popup bottom elements may be placed after scripts in some pages (home.html),
  // so acquire them on DOMContentLoaded instead of at module load time.
  bottomText = document.querySelector('.no-account');
  bottomLink = document.querySelector('.create-link');
  renderDropdown();
});

// Toggle dropdown
profileMenu.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
  // don't hide if click occurred inside the profileMenu or the dropdown itself
  if (!profileMenu.contains(e.target) && !(dropdown && dropdown.contains(e.target))) {
    dropdown.classList.remove('show');
  }
});


(function() {
  const popup = document.getElementById('authPopup');
  const closeBtn = document.getElementById('closePopup');
  const popupHeading = document.getElementById('popupHeading');

  const selectScreen = document.getElementById('selectScreen');
  const loginScreen = document.getElementById('loginScreen');
  const createScreen = document.getElementById('createScreen');

  const authButtons = document.querySelectorAll('.auth-btn');
  const extraFieldContainer = document.getElementById('extraFieldContainer');
  const loginTitle = document.getElementById('loginTitle');
  const loginForm = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMsg');

  const createLink = document.querySelector('.create-link');

  let clickedMode = null; // "signin" or "create"
  let selectedType = null; // "firstyear" or "transfer"

  // ------------------ OPEN POPUP ------------------
  document.addEventListener('click', (e) => {
    const el = e.target;

    if(!el.classList) return;

    // Open Sign In: show login form directly
    if(el.classList.contains('openPopup') && el.dataset.type === 'signin') {
      openPopup('signin');
    }

    // Open Create Account: show create options / form
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
    // Show appropriate screen based on mode
    selectScreen.classList.remove('active');
    loginScreen.classList.remove('active');
    if(createScreen) createScreen.classList.remove('active');

    if(mode === 'signin') {
      loginScreen.classList.add('active');
    } else if(mode === 'create') {
      if(createScreen) createScreen.classList.add('active');
      else selectScreen.classList.add('active');
    } else {
      // fallback
      selectScreen.classList.add('active');
    }

    popup.classList.add('show');
    popup.setAttribute('aria-hidden','false');

    // Set header text based on mode
    popupHeading.textContent = mode === 'signin' ? 'Sign In' : 'Get Started';

    // Update bottom text and link for login only
    if(mode === 'signin') {
      bottomText.textContent = "Don't have an account yet?";
      bottomLink.textContent = "Create an account →";
      bottomLink.setAttribute('href','#');
      bottomLink.onclick = (e) => { e.preventDefault(); openPopup('create'); };
    } else if(mode === 'create') {
      bottomText.textContent = '';
      bottomLink.textContent = '';
      bottomLink.removeAttribute('href');
      bottomLink.onclick = null;
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
      // Call server login endpoint
      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }).then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(()=>({message:'Login failed'}));
          errorMsg.textContent = err.message || 'Invalid credentials';
          return;
        }
        const data = await res.json();
        // store token and user in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // update UI
        const profileAvatar = document.getElementById('profileAvatar');
        const profileName = document.getElementById('profileName');
        if (profileAvatar) profileAvatar.src = data.user.profileImage || 'LOGO.png';
        if (profileName) profileName.textContent = data.user.name || data.user.email;
        renderDropdown();
        errorMsg.style.color = 'green';
        errorMsg.textContent = 'Login successful.';
        setTimeout(() => closePopup(), 600);
      }).catch(err => {
        console.error('login error', err);
        errorMsg.textContent = 'Login failed — server error.';
      });
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    // ---------- BACKEND-READY SIMULATION ----------
    const result = simulateBackendCheck(email);
    if(!result.success){
      errorMsg.textContent = result.message;
      return;
    }
    // set demo user in localStorage and update UI
    const nameFromEmail = email.split('@')[0].replace(/\.|_/g, ' ');
    const prettyName = nameFromEmail.split(' ').map(s => s.charAt(0).toUpperCase()+s.slice(1)).join(' ');
    const demoUser = { name: prettyName || 'Student', email, profileImage: 'LOGO.png', role: 'student' };
    localStorage.setItem('user', JSON.stringify(demoUser));

    // update profile display immediately
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    if (profileAvatar) profileAvatar.src = demoUser.profileImage;
    if (profileName) profileName.textContent = demoUser.name;

    renderDropdown();
    errorMsg.style.color = 'green';
    errorMsg.textContent = 'Login successful — demo.';

    // close popup after a short delay
    setTimeout(() => closePopup(), 600);
  });

  function simulateBackendCheck(email){
    const fakeDB = {
      'john@gmail.com':'firstyear',
      'lucy@gmail.com':'transfer'
    };
    if(!fakeDB[email]) return {success:false, message:'Account not found.'};
    return {success:true};
  }

  window.openAuthPopup = openPopup;
})();

// bottomText/bottomLink are initialized on DOMContentLoaded

