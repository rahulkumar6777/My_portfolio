# Rahul Kumar — Portfolio

A responsive React portfolio with a dark navy and electric blue design, an interactive Three.js cloud infrastructure scene inspired by DomainDrop and DeployHub, selected projects, capabilities, and a contact form. Fonts and images are served locally.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
cd frontend
npm install
npm run dev
```

Vite serves the website at `http://localhost:5173`. In a second terminal, run the existing email backend:

```sh
cd backend
npm install
node index.js
```

The frontend proxies `/api/contact` to the backend on port 5000. The backend requires `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`, and `RECEIVER_EMAIL` in `backend/.env`. Keep credentials out of source control. Without the backend or working SMTP settings, the form displays an error; the direct email link is always available.

## Build and check

```sh
npm run build
npm run lint
npm run preview
```

The production output is in `frontend/dist`. The existing root Dockerfile builds it and copies it into the Express server's `dist` directory. `npm run preview` only previews the static frontend; contact delivery requires the backend.

## Editing content

- `src/Data/PortfolioData.jsx`: personal details, social links, and project source/live URLs.
- `src/pages/Project.jsx`: featured project presentation and descriptions.
- `src/pages/About.jsx`: biography and capabilities.
- `public/images`: project screenshots and portrait.
- `src/index.css`: responsive layouts, typography, colors, and interactions.
- `src/components/HeroScene.jsx`: server racks, database and deployment nodes, animated data connections, lighting, and controls.

The 3D library loads separately from the main page. The scene responds to pointer movement, mouse dragging, and keyboard arrow keys when focused. It can be paused, respects reduced-motion preferences, stops animating while hidden or offscreen, and shows a static illustration when WebGL is unavailable. The contact form preserves input on errors and reports success only after the backend confirms delivery.
