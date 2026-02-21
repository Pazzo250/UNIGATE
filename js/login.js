document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const googleBtn = document.getElementById('googleLogin');
  const profileAvatar = document.getElementById('profileAvatar');
  const profileName = document.getElementById('profileName');
  const errorMsg = document.getElementById('errorMsg');

  // Firebase config removed for demo - using localStorage instead

  // Check if user is already logged in
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser) {
    profileAvatar.src = currentUser.profileImage || 'fontawesome-free-6.7.2-web/svgs/solid/user.svg';
    profileName.textContent = currentUser.name || 'User';
    // Optional: redirect to home if already logged in
    // window.location.href = "home.html";
  }

  // Google login
  googleBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          profileImage: user.photoURL,
          googleLogin: true
        };
        localStorage.setItem('user', JSON.stringify(userData));
        profileAvatar.src = user.photoURL;
        profileName.textContent = user.displayName;
        window.location.href = "home.html";
      })
      .catch(err => errorMsg.textContent = "Google login failed: " + err.message);
  });

  // Manual login
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    errorMsg.textContent = '';

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (!savedUser) {
      errorMsg.textContent = "No account found. Please register.";
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      profileAvatar.src = savedUser.profileImage || 'fontawesome-free-6.7.2-web/svgs/solid/user.svg';
      profileName.textContent = savedUser.name;
      window.location.href = "home.html";
    } else {
      errorMsg.textContent = "Email or password is incorrect.";
    }
  });
});
/* ============================================================
   LOGIN.JS — COMPLETE AUTH LOGIC
============================================================ */

// ------------------------------------------------------------
// 1. FIREBASE CONFIG (REPLACE WITH YOUR OWN KEYS)
// ------------------------------------------------------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


// ------------------------------------------------------------
// 2. ELEMENTS
// ------------------------------------------------------------
const googleBtn = document.getElementById("googleLogin");
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");


// ------------------------------------------------------------
// 3. SHOW ERROR
// ------------------------------------------------------------
function showError(msg) {
  errorMsg.style.color = "#c00";
  errorMsg.textContent = msg;
}

function showSuccess(msg) {
  errorMsg.style.color = "green";
  errorMsg.textContent = msg;
}


// ------------------------------------------------------------
// 4. SAVE LOGIN SESSION
// ------------------------------------------------------------
function saveUserSession(user) {
  const userData = {
    name: user.displayName || "User",
    email: user.email || "",
    profileImage: user.photoURL || "fontawesome-free-6.7.2-web/svgs/solid/user.svg"
  };

  localStorage.setItem("user", JSON.stringify(userData));
}


// ------------------------------------------------------------
// 5. REDIRECT AFTER LOGIN
// ------------------------------------------------------------
function redirectAfterLogin() {
  window.location.href = "index.html";  // Change if needed
}


// ------------------------------------------------------------
// 6. GOOGLE LOGIN
// ------------------------------------------------------------
if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        saveUserSession(user);
        showSuccess("Login successful — redirecting...");
        setTimeout(redirectAfterLogin, 800);
      })
      .catch(err => showError(err.message));
  });
}


// ------------------------------------------------------------
// 7. EMAIL + PASSWORD LOGIN
// ------------------------------------------------------------
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    errorMsg.textContent = "";

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      showError("Please fill in all fields.");
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        const user = res.user;
        saveUserSession(user);
        showSuccess("Login successful — redirecting...");
        setTimeout(redirectAfterLogin, 800);
      })
      .catch(error => {
        if (error.code === "auth/user-not-found") {
          showError("No account found with that email.");
        } else if (error.code === "auth/wrong-password") {
          showError("Incorrect password.");
        } else {
          showError(error.message);
        }
      });
  });
}


// ------------------------------------------------------------
// 8. KEEP USER LOGGED IN (HEADER UPDATE)
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const profileAvatar = document.getElementById("profileAvatar");
  const profileName = document.getElementById("profileName");

  const saved = localStorage.getItem("user");
  if (!saved) return;

  try {
    const user = JSON.parse(saved);
    if (profileAvatar) profileAvatar.src = user.profileImage;
    if (profileName) profileName.textContent = user.name;
  } catch (e) {
    console.error("Error loading user data:", e);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMsg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) {
        errorMsg.textContent = data.message || `Login failed (status ${res.status})`;
        return;
      }
      if (!data.token || !data.user) {
        errorMsg.textContent = 'Login succeeded but server response is missing token/user.';
        return;
      }
      // store token + user for client routes
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // redirect based on role
      const role = data.user.role || '';
      // super_admin, admin, university_admin -> admin dashboard
      // all others (student, agent, staff, etc.) -> student dashboard
      if (['super_admin','admin','university_admin'].includes(role)) {
        window.location.href = 'admin/dashboard.html';
      } else {
        window.location.href = 'student-dashboard.html';
      }
    } catch (err) {
      console.error('Login network/error', err);
      errorMsg.textContent = 'Network or server error. Ensure the backend (server/) is running on the same host and port.';
    }
  });

  // Google login button — provide clear message instead of redirecting to an unimplemented endpoint
  const googleBtn = document.getElementById('googleLogin');
  if (googleBtn) {
    googleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Google sign-in is not configured on this instance. To enable it, add an OAuth route on the server or remove this button.');
    });
  }
});
