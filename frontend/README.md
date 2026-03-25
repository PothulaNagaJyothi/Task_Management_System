# Task Management System - Frontend

This is the frontend application for the Task Management System, built with **React**, **Vite**, and **React Router**.

## Features
- **Task Management Interface:** Create, update, and manage your tasks.
- **Analytics/Charts:** Uses recharts for data visualization.
- **Icons:** Uses lucide-react for elegant iconography.
- **Fast Development:** Powered by Vite for lightning-fast HMR.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Locally preview the production build after running `npm run build`.

## Integration

The frontend proxies API requests under `/api` to the backend server running at `http://localhost:5000` during development (configured in `vite.config.js`). Ensure the backend is running concurrently for full functionality.
