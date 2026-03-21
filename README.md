
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
