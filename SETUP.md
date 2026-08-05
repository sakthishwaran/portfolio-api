# Setting Up a Basic Node.js Application

A generic, step-by-step guide for creating a simple Node.js application from scratch. This is independent of the enterprise Hapi/Bun/Drizzle setup documented in [readme.md](./readme.md) and [ARCHITECTURE.md](./ARCHITECTURE.md) — use it as a quick-start reference for any plain Node.js project.

## Prerequisites

- [Node.js](https://nodejs.org) v18+ (includes `npm`)
- A code editor (e.g. VS Code)
- (Optional) [Git](https://git-scm.com) for version control

Check your installed versions:

```sh
node --version
npm --version
```

## 1. Create the Project Folder

```sh
mkdir my-node-app
cd my-node-app
```

## 2. Initialize `package.json`

```sh
npm init -y
```

This creates a `package.json` with default values. Open it and set sensible values for `name`, `description`, and `main`:

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A basic Node.js application.",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js"
  }
}
```

> `"type": "module"` enables `import`/`export` syntax. Remove it if you prefer `require`/`module.exports`.

## 3. Create the Folder Structure

```text
my-node-app/
├── src/
│   ├── index.js
│   └── routes/
│       └── home.route.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

```sh
mkdir src src/routes
```

## 4. Install Dependencies

A minimal HTTP server only needs Node's built-in `http` module, but most real apps use a framework. [Express](https://expressjs.com) is the most common choice for a "basic" app:

```sh
npm install express
npm install --save-dev nodemon
```

- `express` — minimal web framework for routing and middleware.
- `nodemon` — restarts the server automatically on file changes (dev only).

Update the `dev` script to use it:

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

## 5. Write the Entry Point

**`src/index.js`**

```js
import express from 'express';
import homeRouter from './routes/home.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', homeRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**`src/routes/home.route.js`**

```js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from your basic Node.js app!' });
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
```

## 6. Add Environment Variables

**`.env`**

```env
PORT=3000
```

Install `dotenv` to load it and reference the variable in code:

```sh
npm install dotenv
```

At the very top of `src/index.js`:

```js
import 'dotenv/config';
```

## 7. Add a `.gitignore`

**`.gitignore`**

```text
node_modules
.env
*.log
dist
coverage
```

## 8. Run the Application

```sh
npm run dev     # development, auto-restarts on changes
npm start       # production-style single run
```

Visit `http://localhost:3000` and `http://localhost:3000/health` in your browser or with `curl`:

```sh
curl http://localhost:3000/health
```

## 9. (Optional) Initialize Git

```sh
git init
git add .
git commit -m "Initial commit: basic Node.js app setup"
```

## 10. Next Steps

Once the basics are running, consider growing the project incrementally:

- **Structure**: split routes/controllers/services as the app grows.
- **Validation**: add `zod` or `joi` for request validation.
- **Database**: add an ORM (`drizzle-orm`, `prisma`, `mongoose`) once persistence is needed.
- **Testing**: add `vitest` or `jest` for unit/integration tests.
- **Linting/formatting**: add `eslint` and `prettier`.
- **TypeScript**: migrate to TypeScript for type safety as the codebase grows.

## Quick Reference

| Command | Purpose |
| --- | --- |
| `npm init -y` | Create `package.json` with defaults |
| `npm install <pkg>` | Add a runtime dependency |
| `npm install -D <pkg>` | Add a dev-only dependency |
| `npm start` | Run the app once |
| `npm run dev` | Run the app with auto-restart |
