# changes.md

Chronological record of modifications to the Kinetous monorepo. Append new entries; do not
rewrite history.

---

## 2026-10-21 — Monorepo restructuring: two apps on shared `@repo/*` packages

### Summary

The repository previously carried a Turborepo scaffold (`@repo/*` packages holding only template
files) alongside two applications that had been copied in **mid-migration**: their local
`auth/`, `db/`, `hooks/`, and `components/ui/` folders had been deleted and imports rewritten to
`@repo/*`, but the packages themselves were empty templates and the app `package.json`/
`tsconfig`/`next.config` files were inconsistent. This entry records the work that turned the
tree into a coherent, verified monorepo.

Affected: entire repository (root config, both apps, all `packages/*`).

### Structure changes

- **`apps/web`** — company/marketing site. **`apps/blog`** — publishing app (`/publish`, public
  posts). Both target one shared Postgres database and better-auth setup.
- Removed the leftover `apps/api` fulfillment app (already deleted on disk; git index updated).
- Consolidated shared code into `packages/`:
  - `@repo/ui` — moved all shadcn/Base UI primitives, `ai-elements/*`, blog components, editor
    extensions, SEO components, `Silk`, `footer2`, `icon-tile`, and the editor lib helpers
    (`heading-ids`, `render-code-block`, `reading-time`, `editor-extensions`) from both apps.
  - `@repo/db` — moved `blog/queries`, blog Zod schemas (`blog-schema.ts`), result helpers, and
    the canonical `drizzle/` migration history + `drizzle.config.ts`. Auth tables moved to
    `packages/db/src/schemas/auth-schema.ts` (see *Cycle fix* below).
  - `@repo/auth` — `auth.ts`, `auth-client.ts`, and a new `guard.ts`
    (`requireUser`/`requireOwner`/`AuthError`) replacing each app's `lib/auth-guard.ts`.
  - `@repo/hooks` — `use-mobile`.
  - `@repo/eslint-config` — new shared flat configs (`base.js`, `react-internal.js`).
  - `@repo/typescript-config` — unchanged template bases, now actually referenced by every
    package/app.

### Dependency-cycle fix (design)

`@repo/auth` and `@repo/db` were mutually dependent because the Drizzle schema contained the
better-auth tables. Resolved by:

- Keeping auth tables inside `@repo/db` (`schemas/auth-schema.ts`) so the schema has zero
  dependency on the auth server.
- Moving write actions that need the current user (blog **add / update / remove**) into the app
  that owns them: `apps/blog/lib/actions/blog.ts`. These were previously split across the apps and
  a now-missing `packages/db/src/blog/update-blog.ts`.
- Resulting flow is one-directional: `apps/* → @repo/auth → @repo/db`, and `@repo/ui → @repo/hooks`.

### Security fixes folded in during the move

- `addBlog` now forces `authorId` to the authenticated user's id (previously the client-supplied
  `authorId` was inserted directly, letting any caller attribute a post to any user).
- `updateBlog` and `removeBlog` now verify ownership via `requireOwner` before mutating
  (previously any user could edit/delete any post by id).

### Unrecoverable files deleted during junk cleanup

The cleanup removed untracked / template files that were not recoverable from git. Reconstructed
approximations were written where the code depended on them:

- `packages/ui/src/footer2.tsx` — the lost package version was replaced with the variant copied
  from `apps/web/components/footer2.tsx` (shadcnblocks-style defaults, relative hrefs). **This
  is a functional substitution, not the original file** — review the footer copy/links.
- `packages/ui/src/Silk.tsx` — reconstructed R3F silk-shader component from usage sites.
- `apps/blog/lib/actions/blog.ts` — reconstructed blog add/update/remove server actions (see
  security fixes above), replacing the lost `packages/db/src/blog/update-blog.ts`.

### Package / config work

- **package.json**: removed bogus deps (`Kinetous`, `pnpm`, `cn`), moved shadcn tooling to
  `devDependencies`, added missing `@repo/*` workspace deps, pruned unused deps. Every workspace
  that imports a package now declares it directly (bun uses a hoisted store but links per
  workspace).
- Added missing direct deps discovered during the build: `drizzle-orm`, `drizzle-zod`, and
  `@calcom/embed-react` (blog); `highlight.js` and `@tailwindcss/typography` (both apps, used by
  `app/globals.css`). The app CSS now imports
  `@import "highlight.js/styles/atom-one-dark.css"` (bare specifier) instead of a relative
  `../node_modules/...` path that Turbopack could not resolve through bun's symlink layout.
- **tiptap alignment**: all `@tiptap/*` packages are pinned to a single `^3.32.0` across
  `apps/blog` and `@repo/ui`. The previous `3.30.x` vs `3.32.x` split produced duplicate
  installs and broke `ChainedCommands` type augmentation (`toggleBold`, `setDetails`,
  `setTextAlign`, `setColor`, …).
- **tsconfig**: all packages extend `@repo/typescript-config/{base,react-library}.json` with
  Bundler resolution and `noEmit`; both apps extend `nextjs.json` and keep `@/* → ./*`. Both apps
  gained a `typecheck` script.
- **next.config.ts** (both apps): added `turbopack.root: "../../"` so the production build can
  resolve `next` and `@repo/*` through the single root store. Removed the old `fs.watch` content
  watcher and `next-mdx-remote`. Kept `transpilePackages: [@repo/ui, @repo/db, @repo/auth,
  @repo/hooks]`.
- **turbo.json**: replaced the stale Shopify/fulfillment env lists with the actual variable names;
  secrets are in `globalPassThroughEnv` (not cache-keyed), public vars in `globalEnv`.
- **Root `.env`** was rebuilt (values silently sourced from `apps/web/.env.local`) with the 15
  names the code uses; `.env.example` rewritten to match.
- **`.gitignore`**: added `*.tsbuildinfo`, `*.tmp`, and `*:Zone.Identifier` (Windows NTFS
  artifacts that had polluted the tree).

### Code fixes required by the stricter shared config

`noUncheckedIndexedAccess` (now inherited by the apps) surfaced real unchecked accesses. Fixed
defensively rather than weakening the config:

- `@repo/db` blog query counts (`countRows[0]?.count ?? 0`).
- web: breadcrumb `all[0]` spread (navbar), `project.image[0]` guard (our-work), mobile feature
  nav `features[safeIndex]` guard (our-services).
- blog: breadcrumb, alignment/lists/text-style dropdown `?.icon` guards, color-dropdown index
  guards, command-palette label/emoji guards, tag-input `.at(-1)`, `addBlog` returning-row guard.
- `@repo/ui`: `glowing-border` HSL tuple/index guards, `blog-body` node-mapping typing,
  `reading-time` now accepts a JSON string body, `callout` uses `NodeViewProps`, removed an unused
  `useIsMobile` import and an unused `slugger`.

### React Compiler lint fixes (blog)

Rewrote effects that synchronously `setState` (flagged by the React Compiler lint rule) to the
render-time adjustment pattern in `bubble-menu`, `command-palette`, `link-popover`, and
`publish/[blogSlug]/page.tsx`; removed leftover debug `console.log`s in that page. Deleted dead
navigation-context code (`nav-context-provider`, `use-navigation`, `set-sections` and its
`NavigationProvider` wrapper in `layout.tsx`) that was never rendered.

### Verification

All three checks ran clean on 2026-10-21:

- `bun run typecheck` — 6/6 tasks pass.
- `bun run lint` — 6/6 tasks pass (0 errors; warnings remain in app code and are allowed by the
  app lint scripts).
- `bun run build` — both apps build (web: 25 routes, blog: 15 routes).

### Known issues / follow-ups

- **Missing route**: `apps/web/(blog)/posts/[slug]/page.tsx` is absent (lost with the
  `kinetous-blog-seo-rewrite.zip` snapshot). `packages/ui/src/blog/blog-body.tsx` is therefore
  currently orphaned — nothing imports it. Restore the post-detail page to re-wire it, or remove
  the orphan if the web blog section is intentionally retired.
- **Footer**: `@repo/ui/footer2` is the substituted copy described above; confirm the intended
  package version.
- **`SECRETE` spelling** (`GOOGLE_CLIENT_SECRETE`, `GITHUB_CLIENT_SECRETE`) is intentional and
  consistent between code and env files; leave as-is unless both are renamed together.
- The apps report lint **warnings** (unused vars, `<img>`, exhaustive-deps) that were pre-existing
  app code; the app `lint` scripts do not fail on warnings. Clean up opportunistically.

---

## 2026-10-21 — SEO content layer: all public copy moved into validated `.ts` content files

### Summary

Repositioned the public site around **e-commerce fulfillment & logistics automation** and moved
every piece of public-page copy out of JSX into Zod-validated `.ts` content files under
`apps/web/content/`. Markdown-bearing content (service pages, case studies, legal pages) is rendered
through one shared renderer, so long-form copy is editable without touching components.

Affected: `apps/web` (all public routes, layout, navbar, sitemap, robots), `apps/blog` (restored
public post routes), `packages/ui` (blog card link base).

### Content layer (`apps/web/content/`)

- `schemas.ts` — shared Zod schemas/types; `technologies` is optional so service entries type-check
  under `satisfies`.
- `site.ts` — site-wide name, positioning, contact, CTA, nav, footer sections and legal links.
- `services.ts` — service array (flagship / adjacent / supporting tiers) with Markdown bodies,
  capabilities, engagement process, reliability principles, FAQ.
- `case-studies.ts` — three representative fulfillment scenarios, each with a visible
  "representative scenario, not a client account" disclosure plus Markdown architecture sections.
- `about.ts`, `pricing.ts`, `team.ts` (team + contact), `legal.ts` (privacy + terms), `home.ts`,
  `overview.ts` — remaining public copy.

### Rendering and pages

- New shared `Markdown` component (`app/components/markdown.tsx`): `react-markdown` + `remark-gfm` +
  `rehype-slug` + `rehype-highlight`, `tone="light" | "dark"`, and a client `CodeBlock` with a copy
  button. `hast` types are avoided (not hoisted) in favour of a local structural type.
- New shared `LegalDocumentView` for `/privacy` and `/terms`.
- `/services` and `/services/[slug]` rewritten from `content/services.ts` (metadata, canonicals,
  Open Graph, breadcrumbs, FAQ/Service/ItemList JSON-LD). `services-seo.ts` deleted.
- `/case-studies` and `/case-studies/[slug]` created.
- `/pricing`, `/team`, `/contact`, `/overview` rewritten to render from their content files; the
  contact body was extracted into `sections/contact/contact-body.tsx` so `/about` can reuse it
  without nesting `<main>` inside `<main>`.
- `/about` components (hero, founder, capabilities, principles, process, long-term, founder note)
  now read from `content/about.ts`; the truncated "Eng.. Capabilities" anchor labels are fixed via
  a new `anchors` list in the content file.
- Homepage hero, rotating strip, "why" section, systems heading, anchor list and the services
  carousel now read from `content/home.ts` / `content/services.ts`.
- Layout metadata, Open Graph, Twitter card, Organization/ProfessionalService JSON-LD and the footer
  are driven by `content/site.ts`; the footer no longer renders the stale `/cases`, `/help`, `/docs`,
  `/community` links.
- Navbar gained real `Case Studies` and `Pricing` entries; mega-menu blurbs are derived from the
  service content so they cannot drift.

### Correctness and SEO fixes

- `sitemap.ts` now covers `/case-studies`, `/case-studies/[slug]`, `/privacy`, `/terms`, and the
  service detail pages; `robots.ts` allows the new routes.
- Anchor ids `#process`, `#reliability`, `#faq` added to `/services` so the footer links resolve.
- Homepage carousel: `/cases/*` links (404s) replaced with `/case-studies`, and `/audit` replaced
  with the real `https://audit.kinetous.com`; the floating chat widget now opens on `#chat`.
- `/experiments` and `/landing/[slug]` are marked `noindex, follow` (internal/empty routes).
- Removed unused imports flagged by lint in the touched files.

### Blog route consistency

- Restored the missing public post routes in the blog app: `apps/blog/app/(blog)/posts/page.tsx`
  and `apps/blog/app/(blog)/posts/[slug]/page.tsx`. The blog app's nav and sitemap already pointed
  at `/posts`, but no route existed.
- `packages/ui` blog card takes an optional `linkBase` so the marketing-site mirror links to
  `/blog/[slug]` instead of the non-existent `/posts/[slug]`.
- The marketing-site `/blog` mirror canonicalises to the blog domain and is left out of
  `kinetous.com`'s sitemap, so only one URL is indexed for the same content.

### Compatibility

- No database or schema changes; no migrations required.
- Public URLs added: `/case-studies`, `/case-studies/[slug]`, `/privacy`, `/terms`. `/pricing`,
  `/team`, `/contact`, `/overview`, `/about`, `/services` keep their existing paths.
- `packages/ui` change is backwards compatible (`linkBase` is optional and defaults to `/posts`).

### Verification

- `apps/web`: `bun run typecheck` passes; `bun run lint` reports 0 errors (pre-existing warnings
  only); `bun run build` succeeds and prerenders the new routes.
- `apps/blog`: `bun run typecheck` passes after restoring the post routes.

---

## 2026-10-23 — /pricing rewritten in a direct-response voice, with a visible FAQ

### Summary

Rewrote the `/pricing` copy in a blunt, benefit-first direct-response voice: short sentences,
second person, cost drivers stated plainly, and explicit answers to the real buying objections.
Prices were **not** changed — the page keeps the ranges that were already published.

Affected: `apps/web/content/pricing.ts`, `apps/web/app/(company)/pricing/page.tsx`.

### What changed

- `content/pricing.ts`: new hero, two tiers (Fulfillment & Logistics Automation, Ongoing Support &
  Monitoring), four cost drivers, a five-question FAQ, and the closing CTA — all rewritten.
- Added a `faq` block to the pricing content schema and parsed content.
- `app/(company)/pricing/page.tsx`: the `FAQPage` JSON-LD is now generated from the visible FAQ
  content instead of a separate hardcoded block (previously the schema described Q&As that were
  not on the page). The FAQ is also rendered as a visible section.
- Tier grid changed from three columns to two, since the page has two tiers.
- Kept the published ranges ($500–$10,000+ projects; $100–$2,000+ per month for support) and
  avoided new metrics, client claims, or ROI guarantees.

### Verification

- `bun run typecheck` passes for `apps/web`.
- `bun run lint` reports 0 errors (pre-existing warnings only).
- `bun run build` succeeds; `/pricing` is prerendered.
- Served the production build and confirmed the title, H1, both ranges, the visible FAQ, and the
  `FAQPage` JSON-LD render on `/pricing` (HTTP 200).

---

## 2026-10-23 — Harden post body parsing in the blog post routes

### Summary

`apps/blog/app/(blog)/posts/[slug]/page.tsx` and the `apps/web` mirror
`app/(blog)/blog/[slug]/page.tsx` passed `JSON.parse(post.body || "")` to `BlogBody`. `JSON.parse("")`
throws, so any post with a null or empty body crashed the page instead of rendering. Both routes now
use a local `parseBody` helper that falls back to an empty document, and the unused
`TableOfContents` import was removed from the blog route.

Affected: `apps/blog/app/(blog)/posts/[slug]/page.tsx`, `apps/web/app/(blog)/blog/[slug]/page.tsx`.

### Verification

- `bun run typecheck` passes (6/6 tasks).
- `bun run lint` passes (6/6 tasks).

### Follow-up

- `apps/blog` is a nested git repository (`apps/blog/.git`); the parent repo tracks none of its
  files. Committing the monorepo will not include blog changes until this is resolved (remove the
  nested `.git` and add the files, or convert it to a submodule).
