# 🚀 Task Management System

A full-stack, responsive, and robust **Task Management System** built with the popular **MERN Stack** (MongoDB, Express, React, Node.js). 

This application provides a seamless way for users to create, track, manage, and analyze their daily tasks with an elegant user interface, comprehensive analytics, and a highly secure backend architecture.

---

## 🎯 Important Links
- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

---

## 🌟 Key Features

- **User Authentication:** Secure JWT-based registration and login system.
- **Task Management:** Full CRUD operations (Create, Read, Update, Delete).
- **Advanced Filtering:** Sort, search, and filter tasks dynamically by priorities, statuses, or due dates.
- **Smart Due Dates:** Automatically detects and categorizes "Overdue" tasks to ensure you never miss deadlines.
- **Analytics Dashboard:** Graphical charts and KPIs measuring total completions, pending tasks, and overdue items.
- **Responsive Layout:** Beautiful, glass-morphism inspired UI engineered to work perfectly on any device.

---

## 🏗️ Architecture & Folder Structure

This project follows an industry-standard, scalable architecture separating concerns into a React Single Page Application frontend and a layered RESTful Node.js backend.

```text
Task_Management_System/
├── backend/                  # REST API Server
│   ├── src/
│   │   ├── config/           # Database connections & environment setup
│   │   ├── controllers/      # Extracted business logic handlers
│   │   ├── middleware/       # Custom Express middlewares (e.g. JWT Auth)
│   │   ├── models/           # Mongoose schemas representing DB entities
│   │   ├── routes/           # Express routing definitions
│   │   └── app.js            # Express application instance setup
│   ├── server.js             # Entry point hooking up DB and App
│   └── package.json          
│
├── frontend/                 # React UI Client
│   ├── src/
│   │   ├── api/              # Centralized Axios API instances
│   │   ├── assets/           # Static images and SVGs
│   │   ├── components/       # Shared reusable UI elements (Modals, Buttons)
│   │   ├── context/          # Global React state (AuthContext)
│   │   ├── pages/            # Application Views (Tasks, Dashboard)
│   │   ├── services/         # API Service wrappers (Data fetching layer)
│   │   ├── App.jsx           # Primary routing configuration
│   │   └── index.css         # Global Styles & Theme CSS Variables
│   ├── vite.config.js        # Build and dev server configurations
│   └── package.json          
│
└── README.md                 # Project Overview
```

---

## ⚙️ Quick Setup & Installation

To run this project locally, follow these steps.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Local or Atlas)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Task_Management_System.git
cd Task_Management_System
```

### 2. Backend Setup
Create your environment variables and start the server:
```bash
cd backend
npm install
```
Add `.env` inside the `backend` folder:
```text
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here
```
Run it:
```bash
npm run dev
# Running on http://localhost:5000
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:3000
```

---

## 📡 API Endpoints Overview

The backend exposes a highly functional REST API wrapped in `/api`.

### **Authentication (`/api/auth`)**
| Method | Endpoint | Description |
|--------|----------------------|--------------------------------|
| `POST` | `/register` | Register a new user account |
| `POST` | `/login` | Authenticate & receive JWT |

### **Tasks (`/api/tasks`)** *(Requires Bearer Token)*
| Method | Endpoint | Description |
|--------|----------------------|------------------------------------|
| `GET` | `/` | Get tasks (Supports searching & Overdue status filtering) |
| `GET` | `/analytics` | Get task statistics & chart distributions |
| `POST` | `/` | Create a new task |
| `PATCH`| `/:id` | Partially update a task |
| `PATCH`| `/:id/complete`| Mark task as Done |
| `DELETE`| `/:id` | Delete a task |

---

*Engineered thoughtfully with React, Express, and MongoDB.*
