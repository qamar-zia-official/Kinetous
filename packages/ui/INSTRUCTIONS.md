# packages/ui — INSTRUCTIONS

Package: `@repo/ui` — shared presentational primitives and widget components used by both
`apps/web` and `apps/blog`.

**Presentational only.** No data fetching, no server actions, no domain logic, no knowledge of
routes or the database. If a component needs to know what a "post", "user", or "blog" is at the
domain level, it belongs in an app, not here.

## Layout

```
packages/ui/src/
  *.tsx                 shadcn / Base UI primitives (button, card, dialog, table, select, …)
  utils.ts / utils.tsx  cn() helper + shared tiny utilities
  hooks-reliant.tsx     components may import @repo/hooks (e.g. use-mobile), never an app
  ai-elements/          chat/message rendering (uses `ai`, `streamdown`, `@streamdown/*`)
  blog/                 blog presentation (card, body, callout, pagination, tag filter, TOC)
  editor-extensions/    tiptap node views (callout, iframe)
  lib/                  editor + content helpers (heading-ids, render-code-block, reading-time,
                        editor-extensions registry)
  seo/                  StructuredData
```

Exports: `"./*.ts" → "./src/*.ts"`, `"./*" → "./src/*.tsx"`, `"./*/*" → "./src/*/*.tsx"`.
Import as `@repo/ui/button`, `@repo/ui/blog/blog-card`, `@repo/ui/seo/StructuredData`.

## Rules

1. **Primitives only.** No data fetching, no server actions, no imports from `apps/*`. The only
   internal package dependency is `@repo/hooks`.
2. **Use relative imports inside the package** (`./utils`, `../lib/...`). Never `@/`.
3. **Props are explicit and typed**; no `any`; pass `className` for composition; forward refs
   where form controls need them.
4. **Accessible by default:** bound labels, focus states, `aria-*`, keyboard interaction.
5. **Styling:** Tailwind utilities. Both apps' `globals.css` use `@source`/`@plugin`; confirm new
   class usage is scanned.
6. **Keep singleton deps aligned.** React, tiptap (`@tiptap/*`), and other context/augmentation
   libraries must be a single version across the package and both apps — duplicated versions
   break type augmentation (see `changes.md` 2026-10-21).
7. Every dependency the package imports must be declared in this `package.json`; bun links per
   workspace even though the store is hoisted.

## Verification

`bun run typecheck` and `bun run lint` from this package (or via Turbo from the root) must pass.
