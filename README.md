# Krill UI

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg)](./tsconfig.json)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb.svg)](https://reactjs.org/)

**A themeable, TypeScript-first React component library — 84 components, dual CJS/ESM output, zero forced styling decisions.**

Colors resolve from CSS custom properties, not hardcoded values. Types ship with the package, not a separate `@types/krill`. Every export has a generated, machine-readable prop reference ([`llms.txt`](./llms.txt)) that ships in the published tarball.

## Table of contents

- [Features](#features)
- [Install](#install)
- [Quick start](#quick-start)
- [Theming](#theming)
- [Components](#components)
- [Requirements](#requirements)
- [Local development](#local-development)
- [Anatomy of a component](#anatomy-of-a-component)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Themeable, not opinionated** — colors resolve via the exported `getThemedColor()` helper; no default theme stylesheet to fight.
- **TypeScript-first** — full type declarations, `strict` mode, no separate `@types` package.
- **Styles auto-inject** — each component's CSS ships inside its own JS and attaches itself on import; no stylesheet to import or `<link>` separately.
- **One import** — `package.json`'s `exports` exposes nothing but the root barrel; no deep-import paths to learn.
- **Accessibility-linted** — `eslint-plugin-jsx-a11y` runs in CI on every push.
- **Machine-readable docs** — [`llms.txt`](./llms.txt) ships in the package; grep it or feed it to an LLM.
- **Composition-tested** — exercised end-to-end in this repo's demo as a full email-client UI, not just isolated examples.

## Install

```bash
npm install krill react react-dom
```

`react`/`react-dom` are peer dependencies (React 18 or 19) — never bundled.

## Quick start

```tsx
import { Button, Icon } from 'krill';

export function ComposeButton() {
  return (
    <Button icon={Icon.Compose} onClick={() => {}}>
      Compose
    </Button>
  );
}
```

## Theming

No default theme stylesheet ships — colors resolve from CSS custom properties (e.g. `var(--cta-primary-default)`) at render time. A ready-made light/dark variable set is included to start from:

```tsx
import { themeNames, ThemeMode } from 'krill';

function applyTheme(mode: ThemeMode) {
  Object.entries(themeNames[mode]).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value);
  });
}

applyTheme(ThemeMode.DARK);
```

Most components also accept `forceTheme?: ThemeMode` to render in a fixed theme regardless of the page's ambient one (used internally by always-dark floating surfaces like `Dropdown`).

## Components

84 components across seven categories:

| Category     | Count | Examples                                                                  |
| ------------ | ----- | ------------------------------------------------------------------------- |
| Inputs       | 22    | `Button`, `InputField`, `Select`, `Slider`, `Checkbox`, `RichTextEditor`  |
| Data display | 20    | `Table`, `Avatar`, `Typography`, `Chip`, `VirtualizedList`, `CodeBlock`   |
| Layout       | 14    | `Sidebar`, `Tabs`, `Surface`, `TreeView`, `ActionBar`, `Breadcrumbs`      |
| Overlays     | 11    | `Dialog`, `Dropdown`, `Tooltip`, `Popover`, `CommandMenu`, `ConfirmModal` |
| Date & time  | 7     | `DatePicker`, `DateRangePicker`, `TimeField`, `TimeZonePicker`            |
| Feedback     | 6     | `Toast`, `Banner`, `ProgressBar`, `Skeleton`, `EmptyIllustration`         |
| Media        | 4     | `FileImport`, `QrCode`, `ReactPdf`, `Illustration`                        |

<details>
<summary>Full list (84 components)</summary>

**Inputs** — Button / IconButton, Checkbox, ChipInput, CodeInput, ColorSelector, FilterSelect, InputField, InputFieldEndAction, MobileSearch, MobileSelect, NumberInput, PasswordField, RadioButton, RadioCheckbox, RichTextEditor, Select, SelectBox, SelectField, Slider, TextArea, Toggle

**Data display** — AnimatedArrowIcon, Avatar, Badge, Chip, CircleBadge, CodeBlock, CopyToClipboardButton, EncryptionBadge, EventDot, Facepile, Icons, IconText, IconTextWithEndActions, KeyCodeSequence, ListItem, MonoTag, Stepper, Table, Typography, VirtualizedList

**Layout** — ActionBar, Breadcrumbs, BrowserDesktopView, ButtonGroup / ButtonGroupItem, Divider, DottedGrid, Pagination, SelectedItemToolbar, Sidebar, Steps, Surface, Tabs, ThemedBanner, TreeView

**Overlays** — Accordion, CommandMenu, ConfirmModal, ContextMenu, Dialog, Drawer, Dropdown / DropdownItem, DropdownSubmenu, Popover, Portal, Tooltip

**Date & time** — DateDisplay, DateField, DatePicker, DateRangePicker, HourPicker, TimeField, TimeZonePicker

**Feedback** — Banner, CircularProgress, EmptyIllustration, ProgressBar, Skeleton, Toast

**Media** — FileImport, Illustration, QrCode / QrCodeModal, ReactPdf (PdfDocument / PdfPage)

</details>

Look up exact props by grepping `llms.txt` for a component name:

```bash
grep -A 20 "^#### DatePicker" node_modules/krill/llms.txt
```

Or browse the docs site (`npm run docs`).

## Requirements

|                |                                                        |
| -------------- | ------------------------------------------------------ |
| React          | `^18.0.0 \|\| ^19.0.0` (peer dependency)               |
| Node.js        | `>=18` (building from source only, not for consumers)  |
| Module formats | CJS + ESM, both with source maps and type declarations |

React 17 isn't supported — `framer-motion`'s React-19-compatible types require React ≥18, and there's no version covering 17 and 19 together. CI runs both 18 and 19 on every push ([`.github/workflows/ci.yml`](./.github/workflows/ci.yml)).

## Local development

```bash
npm install
npm run build   # CJS + ESM bundles to dist/, plus type declarations
npm run watch   # same, rebuilds on file change
npm run demo    # component showcase + composed UI blocks + a working email-client demo
npm run docs    # searchable docs site with live-rendered examples and full prop tables
npm run lint    # ESLint — TypeScript, React, react-hooks, jsx-a11y
npm run llms    # regenerate llms.txt from docs/registry/*.tsx
```

`npm run demo` serves three things, in increasing order of realism: a raw component showcase (`localhost:4000`), composed UI patterns like a bulk-actions bar or settings panel (`localhost:4000/blocks/`), and a complete email-client UI with mock data (`localhost:4000/email/`). `npm run docs` (`localhost:4100`) is the polished reference — props tables, live examples, full-text search (`⌘K`) — and the source `llms.txt` is generated from.

No test framework or Storybook by design: the demo and docs sites are the manual verification surface, and CI runs build + lint on every push/PR.

## Anatomy of a component

```
src/components/Divider/
├── Divider.tsx        # the component
├── Divider.types.ts   # exported props interface
├── Divider.styles.ts  # styled-components, $-prefixed style-only props
├── Divider.utils.ts   # (optional) non-styled helper logic
└── index.ts           # re-exports
```

New components get exported from `src/index.ts` and added to `build.js`'s entry points. Full conventions in [`CLAUDE.md`](./CLAUDE.md).

## Contributing

[Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, etc.). Read [`CLAUDE.md`](./CLAUDE.md) before structural changes.

## License

MIT — see [`LICENSE`](./LICENSE).
