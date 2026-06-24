---
name: new-component
description: Scaffold a new Krill design-system component (files, barrel export, build.js entry). Use when asked to add/create a new component, e.g. "/new-component Card".
---

Scaffold a new component named `$ARGUMENTS` under `src/components/<Name>/`, following the
existing pattern (see `src/components/Divider/` as reference).

1. Create `src/components/<Name>/<Name>.tsx`:
   - `import * as React from 'react';` and `import styled from 'styled-components';`
   - A `React.FC<<Name>Props>` functional component with named export `default`.
   - Accept at least `className`, `style`, and `forceTheme?: ThemeMode` props for consistency
     with other components.
   - Any styled-components props that are style-only (not meant to reach the DOM) get a `$`
     prefix, e.g. `$size`, `$color`.

2. Create `src/components/<Name>/<Name>.types.ts`:
   - Export a `<Name>Props` interface with JSDoc comments per prop (`/** ... */`), matching the
     style in `Divider.types.ts`.

3. Create `src/components/<Name>/<Name>.styles.ts` (only if the component needs styled-component
   helpers beyond what's inline in the `.tsx` file).

4. Create `src/components/<Name>/index.ts`:
   ```ts
   export { default } from './<Name>';
   export { <Name>Props } from './<Name>.types';
   ```

5. Add a barrel export line to `src/index.ts`, alphabetically among the other component exports:
   ```ts
   export { default as <Name>, <Name>Props } from './components/<Name>';
   ```

6. Add `'src/components/<Name>/index.ts'` to the `entryPoints` array in `build.js`, alongside the
   other component entries.

7. Format the new/edited files with `npx prettier --write <files>` (single quotes, no trailing
   commas, 2-space indent — see `.prettierrc`).

There is no test framework or Storybook in this repo — don't add test/story files unless asked.
