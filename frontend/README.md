# Task Management System - Frontend

🚀 **Live Deployment:** [https://task-management-system-one-jade.vercel.app/](https://task-management-system-one-jade.vercel.app/)

This is the UI layer for the Task Management System, serving as an interactive Single Page Application built rapidly via **React** and **Vite**.

## 📁 Architecture & Refactoring

The codebase follows a strictly organized directory map ensuring maximum reusability and clean states:
- `/src/components`: Independent interface fragments like `TaskModal` and `ConfirmModal`.
- `/src/pages`: Distinct page outlines like the `Dashboard` and the main `Tasks` view.
- `/src/services`: Decoupled wrappers handling `getAnalyticsCall` and `getTasksCall`, entirely isolating DOM logic from Axios logic.
- `/src/api/axios.js`: The central Axios instance controlling baseline baseURL proxies and dynamic Header injection.
- `/src/context`: Provider wrappers sharing live User and Authentication status down the React tree.

## ✨ Highlights
- **Service Abstraction Layer:** By migrating API calls to `src/services`, components remain strictly presentation-focused.
- **Graphical Dashboard:** Recharts generates dynamic SVGs illustrating "Completed", "Pending", and "Overdue" task breakdowns.
- **Live Filtering and Badging:** React state seamlessly cascades custom highlighting, alerting users instantly when a Task turns "Overdue" based on midnight thresholds.
- **Prominent Pagination Logic:** Secured edge-cases to gracefully fade out navigation buttons preventing out-of-bounds page requests while keeping UI completely understandable.

## 💻 Running Locally
- `npm install` installs libraries (React Router, Lucide, Recharts)
- `npm run dev` boots the Hot Module Replacement server via Vite on `http://localhost:3000`.

**Note:** Vite uses an integrated `/api` proxy under `vite.config.js` pointing towards `http://localhost:5000` to magically sidestep standard browser CORS issues during local development. Ensure the backend exists concurrently.
