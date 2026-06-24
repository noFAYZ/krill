---
name: use-krill
description: Look up exact component props/imports before writing JSX that uses krill (in this repo's demo/docs, or any app that imports from 'krill'). Use whenever adding or reviewing code that imports a krill component, or when asked to build a UI with krill.
---

Krill has 80+ components. Don't guess prop names, types, or defaults from memory or from how a
similarly-named prop works in another library — `llms.txt` is the generated, authoritative
reference for every exported component's exact props.

1. Find `llms.txt` and grep it for the component name to get its real prop list, types, and
   defaults: `grep -A 20 "^#### DatePicker" llms.txt`
   - Inside this repo: it's at the repo root.
   - In a consuming app: it ships with the package at `node_modules/krill/llms.txt`.
2. If the component isn't in `llms.txt`, it doesn't have a docs registry entry yet — read its real
   types instead of guessing:
   - Inside this repo: `src/components/<Name>/<Name>.types.ts`.
   - In a consuming app: `src/` isn't published. Use your editor's go-to-definition on the import,
     or read `node_modules/krill/dist/src/index.d.ts` directly.
   - If you're working inside this repo, also consider adding a registry entry
     (`docs/registry/*.tsx`) so it shows up in `llms.txt` next time.
3. After adding or editing any `docs/registry/*.tsx` entry (repo-internal only), run `npm run llms`
   to regenerate `llms.txt` — it's generated, don't hand-edit it.
4. Only ever import from the package root: `import { X } from 'krill'`. `package.json`'s
   `exports` field exposes just `.` and `./dist/esm/index.css` — no subpath (`krill/dist/...`,
   `krill/components/...`) resolves for a consumer, in Node or any bundler that respects
   `exports`.

Core conventions (see `CLAUDE.md` for the full list; consuming apps get the same list inlined at
the top of `llms.txt`):

- Styled-component props that are style-only (not meant to reach the DOM) are `$`-prefixed, e.g.
  `$size`, `$color`. Don't pass those names as public component props.
- Most components accept `forceTheme?: ThemeMode` to render in a fixed theme regardless of the
  page's ambient one. Colors are CSS custom properties resolved via `getThemedColor()` /
  `getAccentColorValues()` — never hardcode hex values.
- Dates use `dayjs` (`Dayjs` type), not native `Date`, across DateField/DatePicker/TimeField/etc.
- Consumers must `import 'krill/dist/esm/index.css'` once, app-wide — krill never auto-injects it.
- React 17 is a peerDependency, not bundled.
