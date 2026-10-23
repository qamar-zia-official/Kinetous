# Kinetous monorepo

Turborepo + Bun monorepo for the Kinetous ecommerce/automation studio. It contains two
deployable Next.js applications and a set of shared internal packages.

## Layout

```
apps/
  web/    Company site — marketing pages, services, pricing, contact, account/auth, chat widget
  blog/   Publishing app — blog editor (/publish), public posts, account/auth, chat widget
packages/
  ui/                 @repo/ui — shared shadcn/Base UI primitives, blog + editor components, ai-elements
  db/                 @repo/db — Drizzle schema, client, migrations, blog queries + Zod schemas
  auth/               @repo/auth — better-auth server config, client, ownership guard
  hooks/              @repo/hooks — shared React hooks (use-mobile)
  eslint-config/      @repo/eslint-config — shared flat ESLint configs
  typescript-config/  @repo/typescript-config — shared tsconfig bases
```

Both apps share one Postgres database (Neon) via `DATABASE_URL`, one better-auth setup, and one
Drizzle schema/migration history that live in `@repo/db`.

## Requirements

- Node `>=24`
- Bun `>=1.4.0` (package manager)
- A Postgres database (Neon) with a `DATABASE_URL`

## Setup

```bash
bun install
cp .env.example .env        # fill in values
bun run db:migrate          # apply migrations to the database
```

Each app also supports a gitignored `.env.local` for Next.js-specific overrides. The repo-root
`.env` is the shared source used by tooling (`drizzle-kit`) and declared in `turbo.json`.

## Commands

| Command | Description |
| --- | --- |
| `bun run dev` | Run all apps in dev mode |
| `bun run build` | Build all apps |
| `bun run lint` | Lint all packages and apps |
| `bun run typecheck` | Type-check all packages and apps |
| `bun run db:generate` | Generate a Drizzle migration from schema changes |
| `bun run db:migrate` | Apply pending migrations |
| `bun run db:push` | Push schema directly (dev only) |
| `bun run db:studio` | Open Drizzle Studio |

Target a single workspace with Turbo filters, e.g. `bun run dev --filter=web`.

## Workspace packages

- `@repo/ui` — presentational primitives only; no data fetching or domain logic.
- `@repo/db` — the single source of truth for schema, migrations, and typed queries.
- `@repo/auth` — depends on `@repo/db`; never the reverse.
- `@repo/hooks` — framework-agnostic React hooks.

Import internal packages by their workspace name (`@repo/ui/button`, `@repo/db/index`,
`@repo/auth/auth`, `@repo/hooks/use-mobile`). Within each app, `@/*` maps to the app root.

## Documentation

- `AGENTS.md` — repository conventions and architecture rules for contributors and AI agents.
- `changes.md` — chronological record of project modifications.
- `packages/*/INSTRUCTIONS.md` — package-specific guidance where present.
