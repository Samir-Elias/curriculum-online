# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

This is a personal CV/portfolio site. The repo is split into two largely independent apps:

- `frontend/` — **the active project**. A Create React App (React 19) ejected onto CRACO, deployed to Netlify. This is where nearly all work happens.
- `backend/` — a small FastAPI + MongoDB (`motor`) skeleton exposing `/api` routes. Not wired into the frontend and not part of the deployed site. Treat it as dormant unless the user explicitly points you there.
- `tests/` — only an empty `__init__.py`; no real test suite.

Top-level files like `deploy.sh`, `DEPLOY_GUIDE.md`, and `FRONTEND_MEJORAS_MAÑANA.md` relate to deployment/notes and are not build inputs.

## Commands (run inside `frontend/`)

```bash
npm install           # install dependencies (Node >= 20 per package.json engines)
npm start             # dev server via CRACO (craco start)
npm run build         # production build → frontend/build (published by Netlify)
npm test              # react-scripts test runner via CRACO
```

There is no lint script wired up, though ESLint 9 + plugins are installed as devDependencies. The test runner exists but there are no tests in `src/`.

`DISABLE_HOT_RELOAD=true npm start` fully strips HMR and watch mode — see `frontend/craco.config.js`. That file also sets the `@` → `src` webpack alias.

## Frontend Architecture

Entry flow: `src/index.js` → `src/App.js` → `BrowserRouter` with a single `/` route rendering `components/Resume.jsx`. `App` wraps everything in `ModalProvider` (`src/context/ModalContext.jsx`) and conditionally mounts `LinkedBadge` only after the loading screen finishes.

`Resume.jsx` is the page composition root. It:
- Owns a `showLoading` gate that mounts `LoadingScreen` first and toggles `body.loading` / `html.loading` classes to lock scroll during load.
- Uses an `IntersectionObserver` to track per-section visibility (`hero`, `techstack`, `projects`, `education`, `objective`) in two maps: `isVisible` (current) and `hasBeenVisible` (sticky — used so animations don't replay once a section has been seen).
- Detects mobile via a `window.innerWidth <= 768` resize listener and branches rendering between desktop components and `MobileProjectModal` / `MobileEducationModal`.
- Reads global modal state from `useModal()` so background animations / scroll can react to open modals.

Sections are individual components under `src/components/` (`HeroSection`, `TechStack`, `ProjectsSection`, `EducationSection`, `ObjectiveSection`, `Footer`), plus a shared `BackgroundAnimation` layer. `HeroCardsContainer`, `FallingIconsAnimation`, `MorphingTransition`, and `TransitionManager` are Hero-specific pieces — there are READMEs in `src/components/` (`README_HERO_MODULARIZATION.md`, `README_MOBILE_EDUCATION_MODAL.md`) that document those sub-modules in detail; read them before restructuring Hero or the mobile education modal.

Primitive UI components (`avatar`, `badge`, `button`, `card`) live in `src/components/ui/` and are Radix + `class-variance-authority` wrappers in the shadcn/ui style. `src/lib/` holds the `cn` utility. Animation is Framer Motion throughout; icons are `lucide-react` plus hand-authored SVGs in `src/icons/`.

All resume content (projects, education, tech stack, profile) is centralized in **`src/data/profileData.jsx`**. Editing copy or adding a project/certification almost always means editing this file rather than a component.

## Styling System

Styling is a **hybrid of Tailwind and a large modular CSS tree** — do not assume either is authoritative on its own.

- `src/styles/index.css` is the single aggregator: it pulls in Tailwind layers (`@tailwind base/components/utilities`) and then `@import`s every module under `styles/base/`, `styles/layout/`, `styles/components/`, `styles/effects/`, `styles/themes/`, `styles/utils/`. When adding a new CSS file, register it here or it won't load.
- `styles/components/` is organized by feature, with sub-folders for `hero/`, `projects/`, `education/`, `objective/`. Mobile and desktop variants are usually separate files (e.g. `mobile-projects-unified.css` vs `desktop-projects-fix.css`) — check both when touching layout.
- Some imports in `index.css` are intentionally commented out (`layout/hero.css`, `components/background-animation.css`) to avoid conflicts with newer modules. Don't re-enable them without understanding why they were disabled.
- `tailwind.config.js` and `postcss.config.js` are standard CRA + Tailwind; `tailwindcss-animate` is included.

## Conventions Worth Knowing

- Mobile breakpoint is hardcoded at `768px` in JS (`Resume.jsx`) — keep that in sync with any CSS media queries you add.
- Modal open/close state is **global** via `ModalContext`, not local to a section. If you're adding a new modal, plug into that context so background effects and scroll-locking stay consistent.
- Section animation gating uses `hasBeenVisible[id]` — preserve that "once seen, stays on" behavior when adding sections, otherwise animations will flicker on scroll.
- `frontend/netlify.toml` publishes `frontend/build` and sets `NODE_VERSION=18` in its build env, while `package.json` declares `engines.node >= 20`. Local development should use Node 20; the Netlify env is the one place Node 18 is still pinned.
