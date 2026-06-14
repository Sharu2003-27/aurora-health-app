# Backend README

This is a minimal runnable backend scaffold for the Aurora MVP.

Prereqs
- Node.js 18+
- npm

Run locally (dev)

```bash
cd backend
npm install
cp .env.example .env
# optionally edit .env to set JWT_SECRET and PORT
npm run dev
```

Notes
- This initial scaffold uses in-memory storage so the server works immediately without a database. In a later commit this will be migrated to Prisma + SQLite for persistence.
- API endpoints:
  - GET /api/health
  - POST /api/auth/register { email, password, name }
  - POST /api/auth/login { email, password }
  - POST /api/hydration { amountMl } (requires Authorization: Bearer <token>)
  - GET /api/hydration (requires auth)
  - POST /api/sleep { start, end, notes } (requires auth)
  - GET /api/sleep (requires auth)
  - POST /api/ai/assistant { message } (requires auth)
