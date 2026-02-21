# UNIGAT Server (TypeScript + Prisma)

Quick scaffold for a production-ready backend using TypeScript and Prisma (Postgres).

Getting started (dev):

1. Start Postgres with Docker Compose

```bash
docker-compose up -d
```

2. Install packages

```bash
npm install
```

3. Generate Prisma client and run migrations

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

4. Start dev server

```bash
npm run dev
```

Auth & OAuth

- POST `/api/auth/register` {email,password,name} -> {token, refresh, user}
- POST `/api/auth/login` {email,password} -> {token, refresh, user}
- POST `/api/auth/refresh` {id, token} -> rotates and returns new {token, refresh}
- POST `/api/auth/logout` {id} -> revokes refresh token
- POST `/api/auth/google` {id_token} -> verifies Google id_token and returns {token, refresh, user}

Notes:
- Add `GOOGLE_CLIENT_ID` to your `.env` when using Google OAuth. The server expects the client to obtain a Google `id_token` and send it to `/api/auth/google` for verification.

