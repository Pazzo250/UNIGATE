# UNIGATE — Setup Guide

## Server Setup

### Quick Start
```bash
cd c:\Users\GK TECH\Desktop\UNIGAT\server
npm install
npm run dev
```

Server will start on `http://localhost:3000`.

### Database
- SQLite file-based DB at `server/data/database.sqlite`
- Tables auto-created on first startup via Sequelize sync
- Starts empty — data only added during use

### Super Admin Credentials
On first server startup, a super_admin user is automatically seeded:
- **Email:** `admin@unigate.local`
- **Password:** `SuperAdmin123!`
- **Role:** `super_admin`

Use these credentials to log in at `http://localhost:3000/login.html` to access the admin dashboard.

**Important:** Change this password in production. Update `server/routes/auth.js` seedSuperAdmin() function and redeploy.

### Role-Based Access

| Role | Redirect | Access |
|------|----------|--------|
| super_admin | Admin Dashboard | Full platform control |
| admin | Admin Dashboard | Full platform control |
| university_admin | Admin Dashboard | University management, applications |
| staff | Admin Dashboard | Application review, support |
| agent | Student Dashboard | Limited student features |
| student | Student Dashboard | Apply, track applications |

### Client URLs

- **Login:** `http://localhost:3000/login.html`
- **Home / Entry:** `http://localhost:3000/index.html`
- **Admin Dashboard:** `http://localhost:3000/admin/dashboard.html` (protected by auth guard)
- **Student Dashboard:** `http://localhost:3000/student-dashboard.html`

### Backend API

All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

Example POST /api/auth/login:
```json
{
  "email": "admin@unigate.local",
  "password": "SuperAdmin123!"
}
```

Response:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "admin@unigate.local",
    "name": "Super Admin",
    "role": "super_admin"
  }
}
```

### Environment Variables (Optional)
Create `.env` in `server/` folder:
```
JWT_SECRET=your_secret_key
NODE_ENV=production
PORT=3000
```

## Client Setup

No build step required. Serve files from project root:
```bash
# Option 1: Use the Node server (recommended)
cd server && npm run dev

# Option 2: Use any HTTP server
python -m http.server 8000  # then visit http://localhost:8000/login.html
```

## Features Overview

### Admin Module
- Users & Roles management
- Universities & Programs
- Applications & reviews
- Payments & reconciliation
- CMS (Pages, Posts, FAQ)
- Analytics & KPIs
- System Logs & Monitoring
- Support Tickets
- Audit Logs
- Role-based permissions

### Student / Entry Module
- Home page with stats
- University search & filter
- Application submission
- Roadmap / guidance
- Student dashboard

## Troubleshooting

**Login fails:** Ensure server is running on port 3000 and DB is synced.
**Admin dashboard redirects to login:** Check token in localStorage and verify role is super_admin/admin/university_admin.
**404 on API calls:** Ensure `/api/` routes are mounted in `server/index.js`.

## Production Considerations

- Use Postgres instead of SQLite
- Set strong JWT_SECRET in .env
- Use HTTPS
- Rate-limit auth endpoints
- Enable CORS carefully
- Add database backups
- Use Sequelize migrations for schema changes
