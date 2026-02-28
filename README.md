# Nuxt App

Welcome to your new Nuxt application! This is a modern full-stack Vue framework with server-side rendering capabilities.

## Project Information

- **Framework**: Nuxt 4 (based on Vue 3)
- **Server Engine**: Nitro for universal deployment
- **Rendering**: Server-Side Rendering (SSR) with static generation options
- **Package Manager**: npm

## Features

- File-based routing system
- Auto-imports for components, composables, and utilities
- Built-in server routes for API endpoints
- State management with useState
- Server-side rendering for improved SEO
- Hot module replacement during development

## Prerequisites

Before running this project, ensure you have:
- Node.js (version 16.10 or higher)
- npm (version 7 or higher)

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

To run the application in development mode with hot reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

To build the application for production:

```bash
npm run build
```

### Generate Static Site

To generate a static version of the site:

```bash
npm run generate
```

### Preview Production Build

To locally preview the production build:

```bash
npm run preview
```

## Project Structure

```
├── app/
│   └── app.vue          # Main application component
├── public/              # Static assets
├── .nuxt/               # Nuxt-generated files (git-ignored)
├── node_modules/        # Project dependencies
├── nuxt.config.ts       # Nuxt configuration
├── package.json         # Project metadata and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Key Technologies Used

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [Nuxt](https://nuxt.com/) - Vue framework for production
- [Nitro](https://nitro.unjs.io/) - Server engine for universal deployment
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build application for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build locally
- `npm run postinstall` - Prepare Nuxt project (runs automatically after install)

## Additional Notes

- The project uses the minimal template which provides a clean starting point
- Server routes can be added in an `server/` directory (create if needed)
- Middleware can be added in a `middleware/` directory (create if needed)
- Plugins can be added in a `plugins/` directory (create if needed)

## Troubleshooting

If you encounter issues:
1. Ensure all dependencies are installed (`npm install`)
2. Clear Nuxt cache if needed (`rm -rf .nuxt` then `npm run dev`)
3. Check that your Node.js version meets the requirements

## Learn More
Check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about Nuxt and its features.