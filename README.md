# Reverie Revival

Next.js (App Router) storefront with a full admin panel backed by Prisma + Supabase Postgres.

## Setup

1) Install dependencies:

```
npm install
```

2) Add your Supabase Postgres URI and admin credentials to `.env`:

```
DATABASE_URL="postgresql://postgres:<password>@db.<project>.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:<password>@db.<project>.supabase.co:5432/postgres"
ADMIN_EMAIL="admin@reverierevival.co"
ADMIN_PASSWORD="change-me"
```

3) Push the schema, generate Prisma Client, and seed:

```
npm run prisma:push
npm run prisma:generate
npm run prisma:seed
```

4) (Optional) Open Prisma Studio:

```
npm run prisma:studio
```

5) Start the dev server:

```
npm run dev
```

## URLs

- Storefront: http://localhost:3000
- Starter page: http://localhost:3000/starter
- Admin login: http://localhost:3000/admin/login

## Admin Notes

- Admin routes are protected by httpOnly session cookies.
- Admin seed uses `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- All admin mutations log to `/admin/audit`.
- Seed pulls storefront catalog data from `src/app/data/products.ts`.
