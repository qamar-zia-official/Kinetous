# CHANGES

Canonical chronological changelog: [`changes.md`](./changes.md). This file records the responsive
adjustments made in this pass.

## 2026-10-26 — Responsive adjustments across marketing, blog, account, and editor screens

### Summary

Kept the existing visual design and made targeted responsive fixes where content could overflow,
clip, collide, or become unreadable on small and mid-sized viewports. No colors, typography scales,
spacing systems, or layout concepts were redesigned. Existing uncommitted work in the repository was
preserved.

### What changed

- **Portfolio carousel** (`apps/web/app/(company)/sections/porfolio/port1.tsx`)
  - Tech-stack pills now wrap instead of forcing horizontal overflow.
  - Pill text scales down on phones.
  - Fixed carousel controls are centered with a transform, capped to the viewport width, and raised
    above the chat widget on small screens (`bottom-24`) before returning to `bottom-4` at `sm`.
- **Portfolio detail dialog** (`apps/web/app/(company)/sections/porfolio/port-details.tsx`)
  - Moved the `800px` minimum width (`lg:min-w-200`) from `md` to `lg`; at 768–889px the min-width
    previously beat the `90vw` max-width and overflowed.
  - Added `max-h-[85vh]` and vertical scrolling to the dialog, and switched the prose body to
    `overflow-y-auto`.
- **Process detail dialog** (`apps/web/app/(company)/sections/our-process/process-item.tsx`)
  - Moved `md:min-w-200` to `lg:min-w-200` for the same 768–889px overflow issue.
  - Added `max-h-[85vh]` and vertical scrolling.
- **Blog headings** (`apps/web` and `apps/blog` blog index and post routes)
  - Replaced fixed `text-5xl` headings with responsive steps (`text-4xl sm:text-5xl` on indexes,
    `text-3xl sm:text-4xl md:text-5xl` on posts) so long titles fit narrow screens.
- **Footer** (`packages/ui/src/footer2.tsx`)
  - Reduced card padding on phones (`p-6 sm:p-10 lg:p-12`) instead of `p-12` at every size.
  - Tightened the mobile grid gap.
  - Legal links wrap (`flex-wrap`) instead of forcing a single row.
- **Blog cards and pagination** (`packages/ui/src/blog/`)
  - Tag groups on cards can wrap and are capped to the card width.
  - Pagination items wrap and center on narrow screens.
- **Account signup** (`apps/web` and `apps/blog`)
  - Replaced `h-screen` with `min-h-screen` plus vertical padding so short/landscape viewports can
    scroll instead of clipping.
  - Stacked the error message below the card by making the page a column layout.
- **Publish editor** (`apps/blog/app/publish/[blogSlug]/`)
  - Reduced editor page padding on phones and restored it at `sm`/`lg`.
  - Replaced the fixed `4rem` title with `clamp(2rem, 6vw, 4rem)`.
  - Capped the floating toolbar to `calc(100vw - 2rem)` so its existing horizontal scroll stays
    inside the viewport.
- **Experiments heading** (`apps/web/app/(company)/experiments/page.tsx`)
  - Made the page heading responsive (`text-3xl sm:text-4xl`).

Unrelated pre-existing working-tree edits (navbar links, card texture removal, back-button variant,
and the blog layout padding removal) were left untouched.

### Verification

- `bun run typecheck` passes (6/6 tasks). `apps/blog/.next` was removed first because stale generated
  route validators referenced deleted `/posts` routes.
- `bun run lint` passes (6/6 tasks, 0 errors; warnings are pre-existing).
- `bun run build` succeeds for both apps.
- No browser automation is available in this environment, so the changes were verified by static
  review plus typecheck, lint, and production builds rather than screenshots.

### Follow-up

- Check the portfolio dialog, fixed carousel controls, footer, and publish toolbar on physical
  small-screen devices when browser testing is available.
