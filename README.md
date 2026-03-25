# 🚀 Task Management System

A full-stack, responsive, and robust **Task Management System** built with the popular **MERN Stack** (MongoDB, Express, React, Node.js). 

This application provides a seamless way for users to create, track, manage, and analyze their daily tasks with an elegant user interface and highly secure backend architecture.

---

## 🏗️ Architecture & Tech Stack

This project is divided into two scalable, decoupled services: a React Single Page Application (SPA) frontend and a RESTful Node.js API backend.

### **Frontend**
- **Framework:** React 18
- **Build Tool:** Vite (for exceptionally fast Hot Module Replacement and optimized production builds)
- **Routing:** React Router v6
- **Data Visualization:** Recharts (for dynamic analytics, progress bars, and charts)
- **Icons:** Lucide React
- **Styling:** Modern, Responsive CSS 

### **Backend**
- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Database:** MongoDB & Mongoose (ODM)
- **Authentication:** JSON Web Tokens (JWT) for stateless sessions
- **Security:** bcryptjs for secure password hashing & standard Cross-Origin Resource Sharing (CORS) configurations

---

## 🎨 Design Decisions

As an enterprise-grade full-stack application, several architectural design choices were made to ensure scalability, security, and developer experience:

1. **Stateless Authentication (JWT):** 
   Chosen over traditional session cookies to allow the API to remain stateless. This makes horizontal scaling easier and is perfect for serving multiple clients (like a future Mobile App) decoupled from the server state without CSRF vulnerability concerns.
   
2. **RESTful Resource Endpoints:** 
   The API is built strictly around domain resources (`/api/tasks`, `/api/auth`), ensuring predictability and rigorous adherence to REST standards.

3. **Advanced Database Aggregations for Filtering/Sorting:** 
   Instead of pulling all tasks into Node.js memory and filtering arrays, searching, sorting, formatting, and pagination are handled directly at the database level using highly efficient MongoDB Aggregation Pipelines. For example, sorting by priority uses custom dynamic weight mapping (High=3, Medium=2, Low=1) within the DB query.

4. **Proxy Configuration for Local Dev:** 
   Vite is configured to proxy `/api` requests directly to `http://localhost:5000`. This completely circumvents complex CORS handling and pre-flight request issues during local development, mirroring a production reverse-proxy environment.

5. **Componentized React Architecture:** 
   The interface is broken down into highly cohesive, isolated, and reusable components. State is maintained at optimal levels to prevent unnecessary waterfall re-renders.

---

## ⚙️ Setup & Installation

To run this project locally, follow these steps.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster URI)
- Git installed on your local machine

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Task_Management_System.git
cd Task_Management_System
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

```
**Environment Configuration:**
Create a `.env` file in the `backend` directory `(backend/.env)` and configure the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development
JWT_SECRET=generate_a_secure_jwt_secret_key_here
```
**Start the backend development server:**
```bash
npm run dev
# Server will automatically start on http://localhost:5000
```

### 3. Frontend Setup
Open a **new terminal window**:
```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
# App will automatically open or be available at http://localhost:3000
```

---

## 📡 API Endpoints Reference

The backend exposes a highly functional, secured REST API wrapped in `/api`.
Base URL during development: `http://localhost:5000/api`

### **Authentication (`/api/auth`)**
All Auth routes are publicly accessible.

| Method | Endpoint | Description | Request Body |
|--------|----------------------|--------------------------------|----------------------------------|
| `POST` | `/register` | Register a new user account | `{ name, email, password }` |
| `POST` | `/login` | Authenticate & receive JWT | `{ email, password }` |

### **Tasks (`/api/tasks`)**
*⚠️ All Task routes require an `Authorization` header with a valid Bearer token.*
Format: `Authorization: Bearer <your_jwt_token>`

| Method | Endpoint | Description | Query Params / Body Supported |
|--------|----------------------|------------------------------------|---------------------------------|
| `GET` | `/` | Get all tasks (paginated/filtered) | **Query**: `status`, `priority`, `search`, `sortBy`, `order`, `page`, `limit` |
| `GET` | `/analytics` | Get task statistics & charts data | - |
| `POST` | `/` | Create a new task | **Body**: `{ title, description, status, priority, dueDate }` |
| `PATCH`| `/:id` | Partially update a task | **Body**: `{ title, status, description... }` |
| `PATCH`| `/:id/complete`| Shortcut endpoint to mark as Done | - |
| `DELETE`| `/:id` | Delete a task permanently | - |

---

> **Note:** For specific underlying details, you may also refer to `./frontend/README.md` and `./backend/README.md`.
