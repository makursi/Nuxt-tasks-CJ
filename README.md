# Nuxt Tasks

A simple task management app built with Nuxt 4, Drizzle ORM + SQLite (Turso/LibSQL), and Pico CSS.

## Usage

```bash
npm install
npm run dev          # Start dev server at http://localhost:3000
npm run db:generate  # Generate migrations after schema changes
npm run db:migrate   # Apply migrations to local SQLite DB
npm run build        # Production build
```

## Project Structure

```
├── app/
│   ├── pages/            # File-based routes
│   │   ├── index.vue     # / — task list
│   │   ├── create.vue    # /create — new task form
│   │   └── [id].vue      # /:id — edit task
│   ├── components/       # Vue components
│   ├── layouts/          # Layout templates
│   └── lib/db/           # Drizzle schema + migrations
├── server/api/           # REST API (Nitro)
│   ├── task.get.ts       # GET    /api/task
│   ├── task.post.ts      # POST   /api/task
│   ├── [id].get.ts       # GET    /api/:id
│   ├── [id].put.ts       # PUT    /api/:id
│   └── [id].delete.ts    # DELETE /api/:id
├── nuxt.config.ts
└── tasks_db.db           # Local SQLite database
```
