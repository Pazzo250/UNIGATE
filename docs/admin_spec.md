# UNIGATE — Super Admin Dashboard Specification

## Overview
This document specifies DB schema, REST API surfaces, frontend components, backend logic examples, security considerations, and scalability suggestions for the Super Admin Dashboard.

---

## Database Schema (simplified)
- users
  - id (uuid, pk)
  - email (unique)
  - password_hash
  - name
  - role (enum: super_admin, admin, university_admin, agent, staff, student)
  - status (active, suspended, pending)
  - created_at, updated_at, last_login

- organizations (universities)
  - id, name, country, city, verified (bool), meta JSON, created_at

- programs
  - id, university_id (fk), name, level (undergrad/masters/phd), requirements JSON, fees JSON, deadlines JSON

- applications
  - id, applicant_id (user fk), program_id, university_id, status (submitted, under_review, accepted, rejected), assigned_reviewer (user fk), documents JSON, fraud_flag boolean, score (float), created_at

- payments
  - id, user_id, application_id, amount, currency, provider_txn_id, status (pending, confirmed, refunded), created_at

- roles_permissions
  - role, permission (string)

- logs
  - id, level, source, message, metadata JSON, created_at

- tickets
  - id, user_id, subject, messages JSON, status, assigned_to, created_at

- audit_trail
  - id, actor_id, action, target_type, target_id, diff JSON, timestamp

---

## REST API Endpoints (examples; use JWT/session + server RBAC)
Base: /api/v1

Authentication
- POST /auth/login {email,password} -> {token, user}
- POST /auth/logout

Users & Roles
- GET /users?role=&status=&q=&page=&limit=
- GET /users/{id}
- POST /users (create)
- PUT /users/{id} (edit)
- PATCH /users/{id}/suspend
- DELETE /users/{id}
- GET /roles & GET /roles/{role}/permissions
- PUT /roles/{role}/permissions

Universities & Programs
- GET /universities?page&limit&country&q
- POST /universities
- PUT /universities/{id}
- DELETE /universities/{id}
- POST /universities/{id}/verify
- GET /universities/{id}/programs
- POST /universities/{id}/programs
- PUT /programs/{id}

Applications
- GET /applications?status&uni&program&daterange&page&limit
- GET /applications/{id}
- PATCH /applications/{id}/status
- POST /applications/{id}/assign-reviewer {reviewer_id}
- POST /applications/{id}/verify-document {doc_id, result}
- GET /applications/flags (fraud)

Payments
- GET /payments?status&date
- GET /payments/{id}
- POST /payments/{id}/verify
- POST /payments/{id}/refund

Communications
- POST /comm/email (bulk)
- POST /comm/sms (bulk)
- POST /comm/announcement

Analytics & Reports
- GET /analytics/overview (KPIs)
- GET /analytics/revenue?range
- GET /analytics/conversion?filters

Logs & Monitoring
- GET /logs?level&service&daterange
- GET /health

Support & Tickets
- GET /tickets?status&assigned&page
- POST /tickets/{id}/reply
- PATCH /tickets/{id}/assign

AI Controls (admin-only)
- GET /ai/models
- POST /ai/models/{id}/retrain
- POST /ai/score-config (enable/disable thresholds)

---

## UI mockups (text / Figma-style layout)
- Sidebar: Sections (Overview, Users, Universities, Applications, Payments, CMS, Analytics, Logs, Support, Settings)
- Topbar: search, quick actions, profile, theme toggle
- Overview: KPI cards, recent applications table, revenue sparkline, active users chart
- Users: table with filters (role, status), row actions (edit/suspend/delete), modal for create/edit, role-permission editor
- Universities: list with verify toggle, manage programs modal
- Applications: advanced table with multi-select bulk actions, reviewer assignment modal, document viewer
- Payments: transactions table, reconciliation view, refund modal
- Analytics: charts (revenue, new users, application funnel), date picker, export CSV
- CMS: WYSIWYG editor for pages, list of posts, create/edit post modal
- Settings: API keys form, backup/restore controls, theme settings
- Support: ticket table with timeline, quick reply, assign, SLA indicators

---

## Frontend Components (recommend React/Preact/Vue)
- Layout components: Sidebar, Topbar, Container, Modal, Table, Pagination, FilterBar, KPI Card
- Module components: UsersList, UserForm, RolesEditor, UniversitiesList, ProgramForm, ApplicationsList, ApplicationDetails, PaymentLedger, AnalyticsDashboard, CMSManager, LogsViewer, TicketsBoard
- Utilities: apiClient (fetch wrapper with auth), authStore (token & role), permissions HOC/guard, date helper, csv export, chart wrapper

---

## Backend Logic (Node/Express example outline)
- Use Express with middleware: helmet, cors, rate-limit, express.json
- Auth: /auth/login -> validate password (bcrypt), issue JWT with role claims, set httponly refresh token cookie
- RBAC middleware: requireRole(roles[]) reads JWT and verifies permissions from DB or cached permission map
- Services: userService, universityService, applicationService, paymentsService, analyticsService
- Background workers: Celery/Redis or Bull for heavy jobs (reconciliation, AI scoring, email sending)
- Document storage: S3-compatible storage with signed URLs
- Payment providers: abstract provider interface; support multi-currency mapping and reconciliation
- Logging & monitoring: structured logging (winston/pino) to ELK / Grafana; expose health endpoints

---

## Security Considerations
- Enforce server-side RBAC for every endpoint (never rely on client).
- Use HTTPS, HSTS, secure cookies, Content Security Policy.
- Hash passwords with Argon2 or bcrypt (work factor).
- Rate-limit sensitive endpoints (login, password reset).
- Audit trail for critical actions (create/delete/suspend/verify).
- Data encryption at rest for PII; rotate API keys and secrets in a secrets manager.
- Use CSP and sanitize any WYSIWYG input to prevent XSS.
- CSRF protection for session-based flows.

---

## Scalability & Future-proofing
- Microservices boundary suggestions: auth, users, universities, applications, payments, analytics.
- Use message queues for async tasks (emails, scoring, reconciliation).
- Cache read-heavy results (Redis) with careful invalidation.
- Use columnar analytics DB/data warehouse for heavy reporting (ClickHouse/Redshift).
- Provide feature flags and AB testing controls for AI/autonomy rollouts.
- Add rate-limiting and autoscaling policies for peak application seasons.

---

## Roadmap & Integration Notes
1. Implement authentication + server-side RBAC first.
2. Build Users & Roles APIs and simple frontend CRUD.
3. Implement Universities + Programs CRUD and verification flows.
4. Implement Applications listing and reviewer assignment workflow.
5. Add Payments integration + reconciliation.
6. Integrate analytics and gradually add AI scoring with human-in-loop testing.
7. Add logs, alerts, and monitoring, plus backup & restore.

