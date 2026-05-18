# GigFlow – Smart Leads Dashboard

GigFlow is a production-style MERN SaaS dashboard for managing sales leads with JWT authentication, role-based access control, advanced filtering, CSV export, and a modern responsive UI.

## Features

- JWT authentication with persistent login
- Role-based access control for `Admin` and `Sales User`
- Leads CRUD with assignment-aware permissions
- Advanced filtering with combined status, source, search, and sorting
- Debounced search and paginated list views
- CSV export for filtered lead data
- Responsive dashboard with dark mode
- Reusable UI components, skeletons, and toast notifications
- Dockerized frontend, backend, and MongoDB

## Tech Stack

- Frontend: React, TypeScript, TailwindCSS, React Router, Axios, React Hook Form, Zod, Zustand, TanStack Query, Framer Motion, Lucide React
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcryptjs, Zod

## Setup

### Prerequisites

- Node.js 20+
- MongoDB running locally or via Docker

### Install

```bash
npm install
npm install --workspace frontend
npm install --workspace backend
```

### Environment Variables

Copy the provided `.env.example` files:

- `frontend/.env.example`
- `backend/.env.example`

### Run Locally

```bash
npm run dev
```

Backend runs on `http://localhost:5000`
Frontend runs on `http://localhost:5173`

### Seed Demo Users

Run the backend seed script to create demo accounts:

```bash
npm run seed --workspace backend
```

Demo credentials are documented inside `backend/src/scripts/seed.ts`.
The seed also creates sample leads so the dashboard is populated on first launch.

## API Endpoints

See `docs/API.md` for complete request/response examples.

## Deployment

- Frontend: Vercel-ready via `npm run build` in `frontend`
- Backend: Render/Railway-ready via `npm run build` in `backend`
- Docker: `docker-compose up --build`

## Screenshots

Add screenshots here for:

- Login page
- Dashboard
- Leads list
- Lead details
- Create/edit lead

## Project Structure

See the frontend and backend folders for scalable feature-based architecture.
