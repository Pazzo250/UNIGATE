// Site-wide navigation helper — injects a top nav if missing, highlights active link,
// shows admin link only to admins, and handles Sign Out.

(function () {
  'use strict';

  function createNavHtml(showAdmin) {
    return `
      <nav class="top-nav sitewide" aria-label="Main navigation">
        <div class="container nav-inner">
          <a href="index.html" class="nav-link" data-path="/index.html"><i class="fas fa-home"></i> Home</a>
          <a href="home.html" class="nav-link" data-path="/home.html"><i class="fas fa-rocket"></i> Apply</a>
          <a href="roadmap.html" class="nav-link" data-path="/roadmap.html"><i class="fas fa-map"></i> Roadmap</a>
          <a href="university.html" class="nav-link" data-path="/university.html"><i class="fas fa-university"></i> Universities</a>
          <a href="student-dashboard.html" class="nav-link" data-path="/student-dashboard.html"><i class="fas fa-chart-line"></i> Dashboard</a>
          ${showAdmin ? '<a href="admin/dashboard.html" class="nav-link admin-link" data-path="/admin/dashboard.html" style="margin-left:auto;color:var(--accent);"><i class="fas fa-shield-alt"></i> Admin</a>' : ''}
          <div class="nav-utility">
            <span id="siteProfileName" class="site-profile" aria-hidden="true"></span>
            <a href="#" id="signOutNav" class="nav-link signout-link" title="Sign Out"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
          </div>
        </div>
      </nav>`;
  }

  function setActiveLink() {
    const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
    const anchors = document.querySelectorAll('.top-nav .nav-link');
    anchors.forEach(a => {
      const p = a.getAttribute('data-path') || a.getAttribute('href') || '';
      const normalized = p.replace(/\/$/, '') || '/index.html';
      if (normalized === path || window.location.pathname.indexOf(normalized) !== -1) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  function showProfileName() {
    try {
      const userStr = localStorage.getItem('user');
      const el = document.getElementById('siteProfileName');
      if (!el) return;
      if (userStr) {
        const user = JSON.parse(userStr);
        el.textContent = user.name ? user.name : (user.email || '');
        el.style.display = 'inline-block';
      } else {
        el.textContent = '';
        el.style.display = 'none';
      }
    } catch (err) {
      // ignore
    }
  }

  function handleSignOutClick(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }

  function ensureNav() {
    // Check if user is logged in and has admin role
    const userStr = localStorage.getItem('user');
    let showAdmin = false;
    if (userStr) {
      try { 
        const user = JSON.parse(userStr);
        showAdmin = ['super_admin','admin','university_admin'].includes(user.role || ''); 
      } catch(e){}
    }

    // If a top-nav exists already, enhance it with admin link visibility
    const existing = document.querySelector('.top-nav.sitewide, .top-nav, .top-navbar');
    if (existing && !existing.classList.contains('sitewide')) {
      // Enhance existing navbar with admin link if needed
      let adminLink = existing.querySelector('.admin-link');
      if (showAdmin && !adminLink) {
        // Create and insert admin link
        const navMenu = existing.querySelector('.nav-menu, .nav-inner');
        if (navMenu) {
          const li = document.createElement('li');
          li.innerHTML = '<a href="admin/dashboard.html" class="nav-link admin-link" style="margin-left:auto;color:var(--accent);"><i class="fas fa-shield-alt"></i> Admin</a>';
          navMenu.appendChild(li);
        }
      } else if (!showAdmin && adminLink) {
        // Remove admin link if user is not admin
        adminLink.parentNode.removeChild(adminLink);
      }
      
      // Attach sign out handler if not already attached
      const signEl = existing.querySelector('#signOutNav');
      if (signEl && !signEl._siteNavAttached) {
        signEl.addEventListener('click', handleSignOutClick);
        signEl._siteNavAttached = true;
      }
    } else if (!existing) {
      // Inject nav if missing
      const wrapper = document.createElement('div');
      wrapper.innerHTML = createNavHtml(showAdmin);
      document.body.insertBefore(wrapper.firstElementChild, document.body.firstChild);
      const signEl = document.getElementById('signOutNav');
      if (signEl) signEl.addEventListener('click', handleSignOutClick);
    }

    setActiveLink();
    showProfileName();
    window.addEventListener('popstate', setActiveLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureNav);
  } else {
    ensureNav();
  }
})();
