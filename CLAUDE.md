# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build
npm run preview      # Preview production build
npm run generate     # Static generation

# Database (Drizzle + Turso/LibSQL)
npm run db:generate  # Generate migration files from schema changes
npm run db:migrate   # Apply pending migrations to the local SQLite DB
npm run db:studio    # Launch Drizzle Studio to inspect the DB
```

There is no linter, test runner, or type-check command configured.

## Architecture

**Stack**: Nuxt 4 + SQLite (via Turso/LibSQL + Drizzle ORM) + Zod + Pico CSS

**Database**: The `.env` points to `file:tasks_db.db` — a local SQLite file, no external Turso service needed for dev. Drizzle is configured with `casing: "snake_case"` (JS camelCase ↔ DB snake_case). The schema lives in `app/lib/db/schema.ts`; it defines a `tasks` table and two Zod DTOs (`InsertTasksSchema` for create, `PatchTasksSchema` for partial updates). Migrations are in `app/lib/db/migrations/`.

**API layer**: Nitro server routes in `server/api/` — each file exports a `defineEventHandler`. Pattern: `task.get.ts` → `GET /api/task`, `[id].put.ts` → `PUT /api/[id]`. The POST endpoint validates the body with `readValidatedBody(event, InsertTasksSchema.safeParse)`; a failed parse should return 400.

**Frontend**: Pages in `app/pages/` use `<script setup>` with Composition API. There are no Pinia stores — state is fetched directly in components via `useFetch` (SSR-safe) or `$fetch` (for mutations). The default layout (`app/layouts/default.vue`) wraps every page with `AppNavBar` + `<main class="container">`. Styling uses Pico CSS (classless, loaded globally in `nuxt.config.ts`).

**Routing**: File-based — `app/pages/index.vue` → `/`, `app/pages/create.vue` → `/create`, `app/pages/[id].vue` → `/:id`.

**Page responsibilities**:
- `index.vue` — Fetches all tasks via `useFetch("/api/task")`, renders list with edit links and a delete button per task.
- `create.vue` — Form that POSTs to `/api/task`, validates non-empty title client-side, navigates to `/` on success.
- `[id].vue` — Fetches a single task via `useFetch("/api/${id}")`, pre-fills a form, PUTs updates to `/api/${id}`.
