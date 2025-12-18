# Reverie Revival

Next.js (App Router) starter wired for Prisma + Supabase Postgres. A single `Reverie` model is included to get migrations and reads working immediately.

## Setup

1) Install dependencies (already run once):  
`npm install`

2) Add your Supabase Postgres URI to `.env`:

```
DATABASE_URL="postgresql://postgres:<password>@db.<project>.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:<password>@db.<project>.supabase.co:5432/postgres"
```

3) Push the schema and generate Prisma Client:

```
npm run prisma:push
npm run prisma:generate
```

4) (Optional) Open Prisma Studio to edit reveries:  
`npm run prisma:studio`

5) Start the dev server:  
`npm run dev`

Visit http://localhost:3000 to see the landing page. Once your database URL is set and the schema is pushed, recent reveries will render automatically.
