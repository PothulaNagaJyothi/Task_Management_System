# Task Management System - Backend

🚀 **Live API Endpoint:** [https://task-management-system-yin1.onrender.com/api](https://task-management-system-yin1.onrender.com/api)

This is the backend service for the Task Management System, built with **Node.js**, **Express**, and **MongoDB**. 

It serves a secured, robust RESTful API adopting an **industry-standard Layered Architecture** (Controller-Route-Service pattern) ensuring clean separation of logic.

## 📁 Architecture Overview

All core business logic lies within the `src` folder:
- `/src/controllers` handles all database operations and exact payload formulations.
- `/src/routes` binds HTTP paths directly to the designated controllers without bloating logic inline.
- `/src/models` stores the Mongoose definitions for `User` and `Task`.
- `/src/middleware` stores authentication interceptors like the JWT bearer verifier.
- `/src/config` isolates database connections.
- `/src/app.js` is the isolated Express instance, keeping `/server.js` purely as an entry execution point.

## 🚀 Features
- **RESTful Architecture:** Consistent URL naming, HTTP verbs, and data payloads.
- **Overdue Task Automation:** Dynamic logic calculates date thresholds to safely identify Overdue tasks via MongoDB aggregation querying.
- **JWT Authentication:** Completely stateless and highly secure.

## 🛠️ Setup Instructions

### Environment Setup
Create a `.env` file at the root of the `./backend/` directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development
JWT_SECRET=super_secret_jwt_string
```

### Scripts
- `npm run dev`: Uses nodemon to watch the codebase for changes while developing.
- `npm start`: Standard command invoking `node server.js` for production execution.
