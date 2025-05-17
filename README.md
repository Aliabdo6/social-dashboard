# Social Media Dashboard

A modern, responsive social media dashboard built with Next.js, Tailwind CSS, and Recharts. This app provides analytics, post management, followers insights, and customizable settings in a clean UI.

## Features

- 📊 Analytics & charts (Recharts)
- 📝 Post feed and management (create, draft, publish, delete)
- 👥 Followers overview & demographics
- ⚙️ User settings (notifications, privacy, appearance)
- 🌗 Light/Dark theme toggle
- 🟢 Responsive design (mobile & desktop)
- ⚡ Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [lucide-react](https://lucide.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn)

### Installation

```sh
pnpm install
```

### Development

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```sh
pnpm build
```

### Lint

```sh
pnpm lint
```

## Project Structure

- `app/` — Next.js app directory (pages, layouts, routes)
- `components/` — Reusable UI and dashboard components
- `components/ui/` — UI primitives (inputs, buttons, sidebar, etc.)
- `hooks/` — Custom React hooks
- `lib/` — Data mocks and utilities
- `public/` — Static assets
- `styles/` — Global styles

## Customization

- **Theme**: Edit [`tailwind.config.ts`](tailwind.config.ts) and [`app/globals.css`](app/globals.css)
- **UI**: Components use [shadcn/ui](https://ui.shadcn.com/) and [lucide-react](https://lucide.dev/)
- **Charts**: Configurable via chart components in [`components/ui/chart.tsx`](components/ui/chart.tsx)

## License

MIT

---

Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui.
