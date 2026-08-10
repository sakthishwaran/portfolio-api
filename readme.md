# Portfolio API

Enterprise-grade backend for the Portfolio application, built with **Bun**, **Hapi.js**, **TypeScript**, **Drizzle ORM**, and **PostgreSQL**.

> For a deeper dive into layer responsibilities, the error-handling pipeline, and how to add new modules, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Prerequisites

- [Bun](https://bun.sh) v1.3+
- PostgreSQL 14+ (local instance or connection string)

## Architecture

The project follows a **feature-first architecture** with a strict request flow:

```
Route -> Controller -> Operation -> Repository -> Drizzle ORM -> PostgreSQL
```

- **`app/src`** — application layer (controllers, operations, repositories, routes, plugins, server bootstrap).
- **`lib`** — reusable configuration, constants, shared database/API schemas, logging, exceptions, and validation.

```text
portfolio-api/
├── app/src/
│   ├── controller/        # HTTP request/response handling only
│   ├── operation/          # Business logic, orchestrates repositories
│   ├── repository/         # Drizzle ORM data access only
│   ├── routes/             # Route definitions
│   ├── plugins/            # Hapi plugins (database, logger, validation)
│   ├── middleware/         # Feature-specific middleware (future use)
│   ├── server.ts
│   ├── bootstrap.ts
│   └── index.ts
└── lib/
    ├── config/             # env, database, app config
    ├── constants/          # API routes, messages, db + app constants
    ├── shared/
    │   ├── schema/db/      # Drizzle table definitions
    │   ├── schema/api/     # Zod request/response DTOs
    │   ├── helper/         # Response helpers
    │   ├── utility/        # Pagination, UUID helpers
    │   ├── validator/      # Zod -> Hapi validation adapter
    │   ├── logger/         # Pino logger
    │   ├── exception/      # AppError + domain exceptions
    │   ├── middleware/     # Centralized error-handling extension
    │   └── types/          # Shared types + Hapi module augmentation
    └── drizzle/            # drizzle-kit config, migrations, seed
```

## Getting Started

1. Copy the environment file and update `DATABASE_URL` (and any other values) for your local setup:

   ```sh
   cp .env.example .env
   ```

2. Install dependencies:

   ```sh
   bun install
   ```

3. Generate and run migrations:

   ```sh
   bun run db:generate
   bun run db:migrate
   ```

4. Start the dev server:

   ```sh
   bun run dev
   ```

The server starts at `http://localhost:4000` (see `.env`). A health check is available at `GET /health`.

## Contact API

| Method | Path                  | Description               |
| ------ | --------------------- | -------------------------- |
| POST   | `/api/v1/contact`     | Submit a contact enquiry    |
| GET    | `/api/v1/contact`     | List enquiries (paginated)  |
| GET    | `/api/v1/contact/:id` | Get a single enquiry        |
| DELETE | `/api/v1/contact/:id` | Delete an enquiry           |

## Adding a New Module

Every feature module follows the same layering:

```
controller -> operation -> repository -> shared schema -> database
```

1. Add the Drizzle table to `lib/shared/schema/db`.
2. Add Zod request/response schemas under `lib/shared/schema/api/<module>`.
3. Add a repository in `app/src/repository`.
4. Add operations in `app/src/operation/<module>`.
5. Add a controller in `app/src/controller/<module>`.
6. Register routes in `app/src/routes` and wire them up in `app/src/server.ts`.

## Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------- |
| `bun run dev`          | Start the server in watch mode        |
| `bun run start`        | Start the server                      |
| `bun run build`        | Build production bundle into dist     |
| `bun run typecheck`    | Run TypeScript in `--noEmit` mode      |
| `bun run lint`         | Lint the project                      |
| `bun run format`       | Format the project with Prettier      |
| `bun run db:generate`  | Generate Drizzle migrations           |
| `bun run db:migrate`   | Apply Drizzle migrations              |
| `bun run db:push`      | Push schema directly to the database  |
| `bun run db:studio`    | Open Drizzle Studio                   |
| `bun run db:seed`      | Seed the database with sample data    |

