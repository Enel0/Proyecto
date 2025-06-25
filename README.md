# Proyecto Overview

This repository contains two separate applications:

- **backend** – Node.js + Express API using MongoDB for data storage.
- **frontend** – React application created with Vite.

## Setup

1. Clone the repository and install dependencies for each project:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
2. Configure environment variables:
   - Create `backend/src/.env` with at least:
     ```
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRATION=1h
     PORT=5000 # optional, defaults to 5000
     ```
   - Update MongoDB connection string in `backend/src/db.js` if needed.
3. Start development servers:
   - Backend: `npm run dev` inside `backend`.
   - Frontend: `npm run dev` inside `frontend`.

## Deployment

- Build the frontend using `npm run build` in `frontend` and serve the generated `dist` folder with a static web server.
- Run the backend with Node (e.g., `node src/index.js`) or a process manager such as PM2.
- Ensure all environment variables are set on the production server and MongoDB is accessible.

