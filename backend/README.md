# NoteBox Backend API

Backend API for NoteBox - A lightweight application for quick note-taking with search and tag categorization.

## Features

- RESTful API architecture
- TypeScript for type safety
- SQL Server database integration
- Multi-tenancy support
- Comprehensive error handling
- Request validation with Zod
- CORS and security middleware

## Prerequisites

- Node.js 18+ 
- SQL Server 2019+
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run database migrations (to be implemented)

## Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## API Documentation

### Base URL
- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check
```
GET /health
```

Returns API health status.

### API Endpoints

Endpoints will be documented here as features are implemented.

## Project Structure

```
src/
├── api/              # API controllers
├── config/           # Configuration files
├── instances/        # Service instances
├── middleware/       # Express middleware
├── routes/           # Route definitions
├── services/         # Business logic
├── utils/            # Utility functions
└── server.ts         # Application entry point
```

## Environment Variables

See `.env.example` for all available configuration options.

## License

ISC
