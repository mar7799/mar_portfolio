## mar-portfolio — Quick agent guide

Purpose: help an AI agent get immediately productive in this small React + Vite + Tailwind portfolio.

- Project type: Vite + React (JSX). Main entry: `index.html` -> `src/main.jsx` -> `src/App.jsx`.
- Build / run commands (from `package.json`):
  - dev: `npm run dev` (starts Vite dev server)
  - build: `npm run build` (produces `dist`)
  - preview: `npm run preview` (serve built site locally)
  - lint: `npm run lint` (uses `eslint.config.js`)
  - deploy: `npm run deploy` (runs `gh-pages -d dist`) — note: `gh-pages` CLI may not be installed as a dependency here.

Architecture notes (what to read first):
- `vite.config.js` sets `base: '/mar_portfolio/'` for GitHub Pages — keep this in mind when changing asset paths or routing.
- Styling: Tailwind is configured; `src/index.css` imports Tailwind and adds small base tweaks. Tailwind content paths are in `tailwind.config.js`.
- Components: small, component-per-file pattern with default exports (e.g. `src/components/Header.jsx` exports default `Header`). Prefer adding new components under `src/components/`.

Key patterns and examples (code specific):
- Single-page anchored sections: `src/Portfolio.jsx` uses Section components with ids for sections such as skills, projects, and experience. Navigation links are plain anchor tags that jump to those ids — modify `src/Portfolio.jsx` when adding/removing sections.
- Theme handling: `src/Portfolio.jsx` contains `useTheme()` which toggles a `dark` class on `document.documentElement` and persists choice to `localStorage`. When changing theme behavior, check Tailwind dark-mode behavior (project currently toggles `dark` class on root). If theme toggles don't work, verify `tailwind.config.js` has `darkMode: 'class'`.
- Static assets: files in `src/assets/` are imported directly (example: `import my_resume from './assets/Amram M Full Stack.docx'`). Be careful with spaces in filenames when editing or renaming.

Linting & conventions:
- ESLint is configured in `eslint.config.js` using `@eslint/js` + `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- Project rule: `no-unused-vars` is set to ignore identifiers that begin with an uppercase letter or underscore (pattern `^[A-Z_]`). That means exported React components or intentionally prefixed vars are exempt.

Editing tips for PRs and quick fixes:
- Small UI changes: update `src/Portfolio.jsx` or add a new file in `src/components/`. Use default exports for components (consistent with existing files).
- Adding routes/pages: this is a single-page anchored layout — adding client-side routing requires introducing a router (not present). Prefer keeping sections as anchored in-page unless the user requests routing.
- Deploy considerations: keep `vite.config.js` base in sync with GitHub Pages settings; `package.json`'s `deploy` uses `gh-pages` CLI but it is not listed in devDependencies here — either add it or document that deploy may require a global install.

Files to read when changing behavior:
- `vite.config.js` (base path, plugins)
- `tailwind.config.js` and `src/index.css` (styling / dark-mode)
- `eslint.config.js` (lint rules and globals)
- `src/Portfolio.jsx` (main app UI, theme, sections, examples of Card/Section patterns)

If you need to make a change that might break builds, run these checks locally in order:
1. `npm run lint` — catch obvious lint errors
2. `npm run build` — ensure production build succeeds
3. `npm run preview` — sanity-check the built output

If any information above is unclear or you want the file to include more examples (small PR template, testing steps, or how to add a new project card), tell me which section to expand and I'll iterate.
