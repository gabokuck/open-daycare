<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack & shape

- Next.js 16.3.6, React 19.2.8. **App Router only** — there is no `pages/`.
- Single package, no monorepo. `tsconfig.json` maps `@/*` to the **repo root** (not `src/*`).
- Tailwind v4 via `@tailwindcss/postcss` (`postcss.config.mjs`). `app/globals.css` uses `@import "tailwindcss"` and `@theme inline` — do **not** reintroduce v3 `@tailwind base/components/utilities` directives.
- ESLint v9 flat config (`eslint.config.mjs`); extends `eslint-config-next/core-web-vitals` and `.../typescript`. Do not add a legacy `.eslintrc`.

## Scripts (`package.json`)

- `npm run dev` — `next dev` on :3000. Running it rewrites the `nextjs-agent-rules` block above.
- `npm run build` — `next build` (also performs the typecheck).
- `npm run lint` — `eslint`.
- **No `test` script, no test runner installed.** Use `npx tsc --noEmit` for an isolated typecheck when you don't want a full build.

## App entrypoints

- `app/layout.tsx` — root layout. Already uses the Next 16 typed-routes prop type `LayoutProps<"/">`; keep that style for new layouts.
- `app/page.tsx` — the only route so far (the create-next-app landing page). Replace it when implementing the daycare screens.
- `app/globals.css` — Tailwind v4 entry; do not duplicate Tailwind setup elsewhere.

## Spec-driven workflow

Three repo-local entry points drive feature work:

- `/spec` (`.agents/skills/spec`) — produces a spec into `specs/<name>/spec.md`. Use before writing any non-trivial feature.
- `/spec-impl` (`.agents/skills/spec-impl`) — implements an approved spec on a branch named after the spec.
- `/spec-verify` (`.opencode/command/spec-verify`) — verifies an approved spec against its acceptance criteria via the `spec-verifier` subagent (Playwright + Context7 + build/lint). Edits `specs/<name>.md` flipping `- [ ]` → `- [x]` for criteria that pass and appending inline `— FAIL: …` notes for the ones that don't.

The `spec-verifier` subagent lives at `.opencode/agent/spec-verifier.md` with read/search permissions set to `allow` and edit restricted to `specs/**/*.md`; no per-file approval is required for verification work.

## Reference material (read-only)

- `references/pantallas/*.dc.html` — 17 static HTML mocks using a custom `<x-dc>` element that loads `pantallas/support.js`. These are design references, not Next code; do not import them.
- `references/screenshots/*.png` — visual references matching the mocks above.

## MCPs

- Playwright — declared in `opencode.json`. All Playwright output (screenshots, console logs, page snapshots) **must** land in `.playwright-mcp/`; the folder is already in `.gitignore`.
- Context7 — fetch current docs for Next.js, Tailwind v4, etc. Training data is older than Next 16.

## Agents

- `spec-verifier`: Verifies the acceptance criteria of a spec file. Reviews the implementation against each criterion, edits the spec flipping `- [ ]` → `- [x]` for criteria that pass and appending inline `— FAIL: …` notes for the ones that don't. Uses Playwright MCP to compare screenshots against `references/` and Context7 MCP to validate Next.js / Tailwind v4 best practices. Read/search permissions are `allow`; edit is restricted to `specs/**/*.md`.


## Reglas de código

- Usar código limpio, nombres, funciones, variables etc. en inglés