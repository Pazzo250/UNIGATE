document.addEventListener('DOMContentLoaded', () => {
  try {
    // ============== AUTH GUARD ==============
    // Prevent access to admin dashboard unless user is logged in with admin role
    const token = localStorage.getItem('token');
    const userJSON = localStorage.getItem('user');
    let user = null;
    try { user = userJSON ? JSON.parse(userJSON) : null; } catch (e) { user = null; }

    const allowedRoles = ['super_admin', 'admin', 'university_admin'];
    if (!token || !user || !allowedRoles.includes(user.role || '')) {
      console.warn('Admin access denied: user not authenticated or insufficient role');
      // redirect to login with reason
      window.location.href = '../login.html?reason=admin_access_denied';
      return; // stop further execution
    }

    // Display authenticated user info
    document.getElementById('adminName').textContent = user.name || user.email || 'Admin';
    document.getElementById('adminRole').textContent = user.role || 'admin';

    // ============== THEME TOGGLE ==============
    // Theme toggle (simple)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
      const el = document.documentElement;
      if (el.getAttribute('data-theme') === 'dark') {
        el.setAttribute('data-theme','light');
        document.body.style.background = '#f5f7fb';
        document.body.style.color = '#012';
      } else {
        el.setAttribute('data-theme','dark');
        document.body.style.background = '';
        document.body.style.color = '';
      }
    });

    // Navigation: handle both SPA sections (data-section) and direct href pages (admin/*.html)
    const menuAnchors = document.querySelectorAll('.admin-sidebar .menu a');
    menuAnchors.forEach(a => {
      // If anchor has data-section — do SPA toggle and prevent default
      const section = a.getAttribute('data-section');
      if (section) {
        a.addEventListener('click', (ev) => {
          ev.preventDefault();
          // SPA: activate sidebar item
          document.querySelectorAll('.admin-sidebar a').forEach(x => x.classList.remove('active'));
          a.classList.add('active');
          // show in-dashboard section
          document.querySelectorAll('.admin-content .section').forEach(s => s.classList.remove('active'));
          const el = document.getElementById(section + 'Section');
          if (el) el.classList.add('active');
          // close mobile sidebar if open
          const sidebarEl = document.getElementById('sidebar');
          if (sidebarEl && sidebarEl.classList.contains('open')) sidebarEl.classList.remove('open');
        });
      } else {
        // Anchor points to a standalone page (e.g. admin/payments.html). Let default navigation occur.
        // Optional: ensure link is absolute when needed
        // No preventDefault here so browser navigates on click.
      }
    });

    // Avoid duplicate dynamic injections: only append if link not present
    const menuList = document.querySelector('.admin-sidebar .menu ul');
    if (menuList) {
      function ensureLink(href, html) {
        if (!menuList.querySelector(`a[href="${href}"]`)) {
          const li = document.createElement('li');
          li.innerHTML = html;
          menuList.appendChild(li);
        }
      }
      // safe ensures (these pages already added in dashboard.html, but keep as fallback)
      ensureLink('admin/tickets.html', '<a href="admin/tickets.html"><i class="fas fa-life-ring"></i> Tickets</a>');
      ensureLink('admin/payments.html', '<a href="admin/payments.html"><i class="fas fa-credit-card"></i> Payments</a>');
      ensureLink('admin/audit.html', '<a href="admin/audit.html"><i class="fas fa-clipboard-list"></i> Audit Logs</a>');
      ensureLink('admin/cms.html', '<a href="admin/cms.html"><i class="fas fa-newspaper"></i> CMS</a>');
      ensureLink('admin/analytics.html', '<a href="admin/analytics.html"><i class="fas fa-chart-line"></i> Analytics</a>');
      ensureLink('admin/logs.html', '<a href="admin/logs.html"><i class="fas fa-server"></i> Logs</a>');
      ensureLink('admin/roles.html', '<a href="admin/roles.html"><i class="fas fa-user-shield"></i> Roles & Permissions</a>');
    }

    // Sample KPI and table population (replace with API calls)
    function loadDashboardSamples(){
      // Simulate fetching KPIs
      const kpis = { users: 12580, universities: 482, applications: 38720, revenue: '$1,254,320' };
      document.getElementById('kpiUsers').textContent = kpis.users;
      document.getElementById('kpiUnis').textContent = kpis.universities;
      document.getElementById('kpiApps').textContent = kpis.applications;
      document.getElementById('kpiRevenue').textContent = kpis.revenue;

      // Populate recent applications table with sample rows
      const apps = [
        {id:'APP-1001', applicant:'Alice M', uni:'University of Nairobi', program:'CS', status:'Under Review'},
        {id:'APP-1002', applicant:'John K', uni:'UCT', program:'MBA', status:'Accepted'},
        {id:'APP-1003', applicant:'Nadia O', uni:'Univ. of Ghana', program:'Medicine', status:'Pending'}
      ];
      const appsTbody = document.querySelector('#appsTable tbody');
      if (appsTbody) {
        appsTbody.innerHTML = '';
        apps.forEach(a=>{
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${a.id}</td><td>${a.applicant}</td><td>${a.uni}</td><td>${a.program}</td><td>${a.status}</td>
            <td><button class="btn" data-id="${a.id}">View</button></td>`;
          appsTbody.appendChild(tr);
        });
      }

      // Populate users table
      const users = [
        {name:'Super Admin', email:'admin@unigate.test', role:'super_admin', status:'active'},
        {name:'University Admin', email:'uni@unigate.test', role:'university_admin', status:'active'}
      ];
      const usersTbody = document.querySelector('#usersTable tbody');
      if (usersTbody) {
        usersTbody.innerHTML = '';
        users.forEach(u=>{
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>${u.status}</td>
            <td><button class="btn" data-email="${u.email}">Edit</button></td>`;
          usersTbody.appendChild(tr);
        });
      }
    }

    loadDashboardSamples();

    // Quick actions hooks
    document.getElementById('createUserBtn').addEventListener('click', ()=> alert('Open create user modal (placeholder)'));
    document.getElementById('addUniversityBtn').addEventListener('click', ()=> alert('Open add university modal (placeholder)'));
    document.getElementById('sendAnnouncementBtn').addEventListener('click', ()=> alert('Open announcement composer (placeholder)'));

    // Sign out
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '../login.html';
      });
    }

  } catch (err) {
    console.error('admin.js init error:', err);
  }
});
