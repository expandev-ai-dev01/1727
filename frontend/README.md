# NoteBox

Lightweight application for creating quick notes with search and tag categorization.

## Features

- Create quick notes with title and content
- Search functionality
- Tag categorization

## Tech Stack

- React 19.2.0
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router 7.9.3
- TanStack Query 5.90.2
- Axios 1.12.2
- React Hook Form 7.63.0
- Zod 4.1.11

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── app/                 # Application configuration
│   ├── App.tsx         # Root component
│   └── router.tsx      # Routing configuration
├── assets/             # Static assets
│   └── styles/         # Global styles
├── core/               # Core utilities and components
│   ├── components/     # Shared components
│   ├── lib/           # Library configurations
│   ├── types/         # Global types
│   └── utils/         # Utility functions
├── domain/            # Business domains
├── pages/             # Page components
│   ├── layouts/       # Layout components
│   └── Home/          # Home page
└── main.tsx           # Application entry point
```

## API Configuration

The application connects to a backend API with the following structure:

- External (public) endpoints: `/api/v1/external/`
- Internal (authenticated) endpoints: `/api/v1/internal/`

Configure the API URL in `.env`:

```
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## License

Private project