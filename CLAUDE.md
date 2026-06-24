# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Krill is a standalone React UI component library (design system), extracted from Skiff's
`nightwatch-ui`. Single npm package at the repo root — not a monorepo. React 17 is a
peerDependency (not installed at root); `npm ls` warnings about missing react/react-dom are
expected.

## Commands

- `npm run build` — runs `build.js`, which builds CJS + ESM bundles via esbuild and emits type
  declarations via `tsc -b`, in parallel.
- `npm run watch` — same as build, but sets `WATCH=1` first. On Windows PowerShell this must be
  `$env:WATCH=1; npm run build` (the package.json script's `WATCH=1 npm run build` syntax is
  POSIX-only).
- `npm run emit-ts` — `tsc --build` only, no bundling.
- `npm run clean` — removes `dist/`.
- `npm run lint` — ESLint (flat config in `eslint.config.js`, TypeScript + React + react-hooks
  rules, plus a Node-globals override for the CommonJS scripts `build.js`/`demo/serve.js`).
  Added fresh during /init setup; the pre-existing component code under `src/` has ~38 unfixed
  findings (mostly `no-extra-boolean-cast` and a couple of `react-hooks/set-state-in-effect`)
  that predate this config — don't treat them as caused by your current change unless you touch
  that file.
- `npm run demo` — runs `demo/serve.js` (esbuild's `serve()` API, browser platform, not the
  library's node-targeted `build.js`), which bundles two entries directly from `src/`:
  - the component showcase at `http://localhost:4000` (`demo/App.tsx`)
  - a working email-client demo built from krill components, mock data only, at
    `http://localhost:4000/email/` (`demo/email/`)
  Styles auto-inject: `esbuild-sass-plugin` runs with `type: 'style'` (in `build.js`,
  `demo/serve.js`, and `docs/serve.js`), so any entry that transitively imports a `.scss` file
  (e.g. via `Surface.tsx`) gets a `<style>` tag injected at import time — no separate CSS file is
  produced, and no `<link>` in `index.html` is needed.
- No test framework or Storybook exist yet.
- Format with `npx prettier --write <file>` (no npm script wraps this). Style: single quotes, no
  trailing commas, 2-space indent, 120 print width — see `.prettierrc`.

## Component structure

Each component lives in `src/components/ComponentName/` with:
`ComponentName.tsx`, `ComponentName.types.ts`, `ComponentName.styles.ts`,
`ComponentName.constants.ts` (if needed), `index.ts` (re-exports).

When adding a new component:

1. Export it from the barrel `src/index.ts`.
2. Add its entry point to the `entryPoints` array in `build.js` (this repo's convention is to
   always add new components there, matching the existing 10 entries — even though the main
   bundle already includes everything transitively via the `src/index.ts` barrel).

## Hooks

`src/hooks/` mostly holds internal implementation details (`useClickOutside`, `useKeyboardNavigation`,
`useMousePosition`) that are NOT re-exported from `src/index.ts`. `useOnEscapePress`, `useHotkeys`, and
`useSwipe` are the exception — they're deliberately public, curated one-by-one in `src/index.ts`'s
`export { ... } from './hooks';` line rather than via `export * from './hooks'`. When adding a new
hook, default to internal-only unless there's a reason consumers need it directly.

## Styling conventions

- Styled-components v5, not CSS modules/Tailwind/Emotion (MUI/emotion are deps but barely used).
- Styled-component props that are style-only (not meant to reach the DOM) are prefixed with `$`,
  e.g. `$size`, `$type` — follow this for any new styled props.
- Colors come from CSS custom properties (e.g. `var(--cta-primary-default)`) resolved via the
  `getThemedColor()` utility, not hardcoded values. The library does not inject these variables
  itself — a consuming app's theme/global CSS must define them.

## Conventions

- Conventional commits (`feat:`, `fix:`, `chore:`, etc.) for commit messages.
