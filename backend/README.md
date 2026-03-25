# Task Management System - Backend

This is the backend service for the Task Management System, built with **Node.js**, **Express**, and **MongoDB**.

## Features
- **RESTful API** for task CRUD operations.
- **User Authentication** using JSON Web Tokens (JWT) and bcryptjs.
- **Database Integration** via Mongoose for data persistence.
- **CORS Enabled** for cross-origin requests from the React frontend.

## Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (e.g., MongoDB Atlas or local MongoDB)

## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

### `npm run dev`

Runs the app with **Nodemon** for development.\
The server will automatically restart on file changes.

### `npm start`

Starts the backend server in production mode using node.

## API Endpoints

- **Auth**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Authenticate a user

- **Tasks**
  - `GET /api/tasks` - Get all tasks
  - `POST /api/tasks` - Create a new task
  - `PUT /api/tasks/:id` - Update a task
  - `DELETE /api/tasks/:id` - Delete a task
