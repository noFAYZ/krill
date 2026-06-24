# Krill

A standalone React UI component library, extracted from Skiff's `nightwatch-ui` design system.

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

Outputs CJS + ESM bundles to `dist/`, built with esbuild and type-checked/declared with `tsc`.

## Watch

```bash
npm run watch
```

## Demo

```bash
npm run demo
```

Serves a showcase of every exported component at `http://localhost:4000` (see `demo/App.tsx`).
Bundled with esbuild directly against `src/`, so changes show up on refresh without a separate build step.

The same command also serves a working email client demo, built entirely out of krill components
(`Sidebar`/`MailboxList`/`ThreadView`/`ComposeDialog`), at `http://localhost:4000/email/`
(see `demo/email/`). It has mock data and in-memory state only — no backend.
