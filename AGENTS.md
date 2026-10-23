# AGENTS.md — Kinetous monorepo

Guidance for contributors and AI coding agents working in this repository.

## 1. What this repo is

A Turborepo + Bun monorepo holding two deployable Next.js apps and shared internal packages:

- `apps/web` — the Kinetous company/marketing site (services, pricing, contact, account, chat).
- `apps/blog` — the publishing app (blog editor at `/publish`, public posts, account, chat).

Both apps share one Postgres database, one better-auth configuration, and one Drizzle
schema/migration history that live in `@repo/db`. There is no separate API app; each Next.js app
serves its own routes and `/api/*` handlers.

## 2. Inspect before you change

1. Read this file and any `INSTRUCTIONS.md` in the directory you are touching
   (`packages/ui/INSTRUCTIONS.md`, `packages/typescript-config/INSTRUCTIONS.md`).
2. Read `changes.md` to understand recent work.
3. Locate existing implementations before creating new ones. Prefer reuse over new modules.
4. Do not assume the repository is empty or that examples in this file match the current tree.

## 3. Package boundaries

Dependencies flow in one direction only:

```
apps/*  →  @repo/ui, @repo/db, @repo/auth, @repo/hooks
@repo/auth  →  @repo/db
@repo/ui    →  @repo/hooks   (only)
```

- **`@repo/db` never imports `@repo/auth`.** Auth tables live in
  `packages/db/src/schemas/auth-schema.ts` so the schema has no dependency on the auth server.
  Write actions that need the current user (e.g. blog add/update/remove) live in the app that
  owns them (`apps/blog/lib/actions/blog.ts`), not in the db package.
- **`@repo/ui` is presentational only.** No data fetching, no domain logic, no knowledge of routes
  or the database. If a component needs to know what a "post" or "user" is, it belongs in the app.
- Avoid circular dependencies between packages. Keep provider-specific details out of `@repo/db`
  and `@repo/ui`.

## 4. Imports and path aliases

- Internal packages are imported by workspace name: `@repo/ui/button`, `@repo/db/index`,
  `@repo/db/blog/queries`, `@repo/auth/auth`, `@repo/auth/guard`, `@repo/hooks/use-mobile`.
- Each app maps `@/*` to its **app root** (e.g. `apps/web/app/...` → `@/app/...`).
- Inside `@repo/ui`, use relative imports (`./utils`, `../lib/...`). Never `@/` inside packages.
- `@repo/ui` exports are `"./*.ts": "./src/*.ts"`, `"./*": "./src/*.tsx"`,
  `"./*/*": "./src/*/*.tsx"`. Other packages export `"./*": "./src/*.ts"`.

## 5. Type safety

- Every package extends `@repo/typescript-config`. The shared base enables `strict` and
  `noUncheckedIndexedAccess`; write index accesses defensively (`arr[0] ?? fallback`, `.at(-1)`,
  explicit `if (!x) return`).
- App tsconfigs extend `@repo/typescript-config/nextjs.json` and keep `@/*` path mapping.
- Prefer Zod-inferred types for validated boundaries; keep provider types out of domain code.
- Avoid `any`. If unavoidable, justify it and prefer a narrow cast over a broad one.

## 6. Database and environment

- Schema and migrations live in `packages/db` (`src/schemas/`, `drizzle/`, `drizzle.config.ts`).
  Run migrations with `bun run db:migrate`. Generate new migrations with `bun run db:generate`.
- Env variable names are declared in `turbo.json` (`globalEnv`/`globalPassThroughEnv`). Only
  names are committed; values live in the gitignored root `.env` and app `.env.local` files.
- Note: `GOOGLE_CLIENT_SECRETE` and `GITHUB_CLIENT_SECRETE` are spelled with the trailing `E`
  on purpose — the code reads those exact names. Do not "fix" the spelling without renaming both
  the code and the env files.
- Never log or commit secrets, tokens, or webhook credentials.

## 7. Adding a dependency

- Add the dependency to the workspace that actually imports it. Bun uses a hoisted store at the
  repo root, but with isolated per-workspace linking — a package that imports `x` must declare
  `x` in its own `package.json`, or typechecking/build will fail to resolve it.
- After editing `package.json`, run `bun install`. If a package's `node_modules` gets out of sync
  (stale physical copies shadowing symlinks), `bun install --force` reparses from `package.json`.
- Keep React, tiptap, and other singleton-ish libraries on a single version across packages and
  apps; duplicated versions break context/capability augmentation.

## 8. Coding conventions

- Follow the existing style in the file you are editing (indentation, import ordering, naming).
- No comments unless they explain non-obvious intent; do not narrate the code.
- Keep components and functions small and cohesive. Do not add abstraction for its own sake.
- React 19 / Next 16 App Router. Client components start with `"use client"`.

## 9. Verification

Before reporting a task complete, run the checks relevant to what you changed:

```bash
bun run typecheck   # all packages + apps
bun run lint        # all packages + apps
bun run build       # production build of both apps
```

Never report a check as passing unless you actually ran it and saw it pass. If a check cannot be
run, say why.

## 10. Record every change

- Every modification to code, config, schema, docs, or tests must be recorded in `changes.md`.
  Add a dated entry describing what changed, why, which modules/apps were affected, any
  compatibility or migration implications, what was verified, and any follow-ups.
- Preserve existing entries; append, do not overwrite history.
- Update this file and any affected `INSTRUCTIONS.md` when conventions or responsibilities change.

## 11. Priority order

1. Preserve security and correctness.
2. Preserve existing behavior and contracts.
3. Follow the documented architecture and package boundaries.
4. Reuse existing capabilities.
5. Add tests/verification where appropriate.
6. Update `changes.md` and relevant docs.
7. Report the verified outcome accurately.
