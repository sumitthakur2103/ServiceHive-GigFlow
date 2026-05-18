# GigFlow Smart Leads Dashboard

GigFlow is a production-style MERN SaaS dashboard for managing sales leads with JWT authentication, role-based access control, advanced filtering, pagination, CSV export, and a modern responsive UI.

## Live Demo

`https://service-hive-gig-flow-frontend-a144.vercel.app`

## Overview

GigFlow is built to feel like a startup-grade internal sales dashboard. It includes:

- secure user authentication with JWT
- admin and sales-user role separation
- lead lifecycle management
- searchable and filterable lead lists
- dashboard analytics and recent activity
- CSV export of filtered leads
- modern responsive UI with dark mode
- Docker support for local development

## Key Features

### Authentication

- User registration
- User login
- Persistent session storage on the frontend
- Protected routes
- Logout support
- Password hashing with bcryptjs

### Role Based Access Control

- `Admin`
  - can view all leads
  - can create, update, and delete leads
  - can reassign leads
  - can view users for assignment
  - can create additional admin accounts
- `Sales User`
  - can only view leads assigned to them
  - can update only assigned leads
  - cannot delete unassigned leads

### Leads Management

- Create lead
- Edit lead
- Delete lead
- Lead details page
- Lead activity timestamps
- Lead assignment

### Advanced Filtering

- Filter by status
- Filter by source
- Search by name or email
- Sort by latest or oldest
- Combined filters work together

### Pagination

- 10 records per page
- Backend skip/limit pagination
- Pagination metadata in API responses

### CSV Export

- Export current filtered lead set
- Download CSV from the UI

### Dashboard UI

- Modern SaaS layout
- Sidebar navigation
- Top navbar
- Responsive design
- Dark mode and light mode
- Skeleton loaders
- Empty states
- Toast notifications
- Smooth page transitions

## Tech Stack

### Frontend

- React
- TypeScript
- TailwindCSS
- React Router
- Axios
- React Hook Form
- Zod
- Zustand
- TanStack Query
- Framer Motion
- Lucide React

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod

### DevOps

- Docker
- Docker Compose
- ESLint
- Prettier

## Project Structure

```text
gigflow/
  frontend/
    src/
      components/
      constants/
      hooks/
      layouts/
      pages/
      routes/
      services/
      store/
      types/
      utils/
    Dockerfile
    nginx.conf
    .env.example
  backend/
    src/
      config/
      constants/
      controllers/
      middleware/
      models/
      routes/
      scripts/
      services/
      types/
      utils/
      validators/
    Dockerfile
    .env.example
  docker-compose.yml
  docs/
    API.md
```

## Prerequisites

- Node.js 20 or higher
- npm 10 or higher
- MongoDB Atlas or local MongoDB
- Docker Desktop, if you want containerized local development

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/gigflow-smart-leads-dashboard.git
cd gigflow-smart-leads-dashboard
```

### 2. Install dependencies

From the repo root:

```bash
npm install
```

Install workspace dependencies if needed:

```bash
npm install --workspace frontend
npm install --workspace backend
```

### 3. Configure environment variables

Copy the example files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=replace_with_a_long_secure_secret
CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

### Without Docker

Start backend and frontend from the repo root:

```bash
npm run dev
```

Backend:

- `http://localhost:5000`

Frontend:

- `http://localhost:5173`

### With Docker

Run the full stack:

```bash
docker compose up --build
```

This starts:

- MongoDB
- backend API
- frontend app

## Seed Demo Data

The backend includes a seed script that creates demo users and sample leads.

Run it from the repo root:

```bash
npm run seed --workspace backend
```

Demo accounts:

- Admin
  - Email: `admin@gigflow.com`
  - Password: `Password123!`
- Sales User
  - Email: `sales@gigflow.com`
  - Password: `Password123!`

## API Base URL

Local development:

- `http://localhost:5000/api`

Production:

your backend deployed url + `api`

See the full API reference in [docs/API.md].

## Main API Endpoints

### Authentication

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Leads

- `GET /leads`
- `GET /leads/:id`
- `POST /leads`
- `PUT /leads/:id`
- `DELETE /leads/:id`
- `GET /leads/stats`
- `GET /leads/export/csv`

### Users

- `GET /users`

### Admin

- `POST /admin/setup`

## Deployment

### Frontend on Vercel

1. Import the GitHub repo into Vercel.
2. Set the root directory to `frontend`.
3. Build command:

```bash
npm run build
```

4. Output directory:

```bash
dist
```

5. Add environment variable:

```env
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

### Backend on Render

1. Create a new Render Web Service.
2. Connect the same GitHub repo.
3. Set the root directory to `backend`.
4. Build command:

```bash
npm install && npm run build
```

5. Start command:

```bash
npm start
```

6. Add environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_secret
CLIENT_URL=https://your-frontend-domain.vercel.app
```

### MongoDB

Use MongoDB Atlas for production.

Recommended setup:

- free `M0` cluster for evaluation
- Node.js driver connection string
- whitelist your IP for development

## Docker Deployment Notes

The repository includes:

- `frontend/Dockerfile`
- `backend/Dockerfile`
- `docker-compose.yml`
- `frontend/nginx.conf`

Docker is ideal for:

- local development
- reproducible demo environments
- container-based deployment on a VPS

Example:

```bash
docker compose up --build
```

## Troubleshooting

### Backend login fails from Vercel

Make sure:

- `CLIENT_URL` in Render is set to your exact Vercel origin
- `VITE_API_URL` in Vercel includes `/api`
- the frontend is using the deployed backend URL, not localhost

### Build fails on Vercel

Make sure:

- the root directory is `frontend`
- the build command is `npm run build`
- the production API URL is set in Vercel environment variables

### Leads do not show for Sales User

This is expected only if no leads are assigned to that user.

### CSV export does not work

Check that:

- you are logged in
- the backend API is reachable
- your active filters are valid

## Screenshots

Add screenshots here before submitting:

- Login page
- Dashboard
- Leads list
- Lead details
- Create/edit lead
- CSV export

## Security Notes

- Do not commit `.env` files
- Rotate secrets if they were shared publicly
- Use a strong `JWT_SECRET`
- Use MongoDB Atlas credentials only in deployment environments

## License

This project is provided for internship assignment evaluation and portfolio use.
