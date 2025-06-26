
//crear-archivo-readme.md
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
     MONGODB_URI=mongodb://localhost:27017/NuevoPrueba
     PORT=5000 # optional, defaults to 5000
     ```
3. Start development servers:
   - Backend: `npm run dev` inside `backend`.
   - Frontend: `npm run dev` inside `frontend`.

## Deployment

- Build the frontend using `npm run build` in `frontend` and serve the generated `dist` folder with a static web server.
- Run the backend with Node (e.g., `node src/index.js`) or a process manager such as PM2.
- Ensure all environment variables are set on the production server and MongoDB is accessible.


# Proyecto

This repository contains two separate projects:

- `backend/` – Express based API.
- `frontend/` – React application built with Vite.

## Development

Run each project individually from its directory.

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Building the frontend

For a production build of the React app:

```bash
cd frontend
npm run build
```


 main

