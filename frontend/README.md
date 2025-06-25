# Frontend

This directory contains the React application built with Vite.

## Development


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Configuration

API requests use the `API_BASE` constant exported from `src/config.js`. Create a `.env` file based on the provided `.env.example` and set `VITE_API_BASE_URL` to the base URL of your backend API.

Run the development server with hot reload:

```bash
cd frontend
npm install
npm run dev
```

## Production build

To generate a production build run:

```bash
cd frontend
npm run build
```

