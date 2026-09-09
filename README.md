# Harvest

React frontend boilerplate powered by [Vite](https://vite.dev) and [TypeScript](https://www.typescriptlang.org/).

## Stack

- **React 19** — UI library
- **React Router** — client-side routing
- **Vite** — dev server and build tool
- **TypeScript** — static typing

## Project structure

```
src/
├── components/     # Reusable UI (Header, Footer, …)
├── layouts/        # Page shells (MainLayout)
├── pages/          # Route-level views (Home, About, 404)
├── App.tsx         # Route definitions
├── main.tsx        # App entry point
└── index.css       # Global styles & design tokens
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

## Next steps

- Add pages under `src/pages/` and register routes in `App.tsx`
- Extend shared components in `src/components/`
- Customize colors and typography in `src/index.css`
