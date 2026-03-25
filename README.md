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

## 🎨 Design Decisions

As an enterprise-grade full-stack application, several architectural design choices were made to ensure scalability, security, and developer experience:

1. **Layered Services Architecture:** 
   The application strictly separates Routing from Business Logic on the backend (Controllers), and UI Rendering from API Fetching on the frontend (Services). This decoupled approach allows components to remain cohesive and highly testable.
   
2. **Stateless Authentication (JWT):** 
   Chosen over traditional session cookies to allow the API to remain stateless. This makes horizontal scaling easier and is perfect for serving multiple clients (like a future Mobile App) separated from the server state without CSRF vulnerability concerns.

3. **Advanced Database Aggregations for Filtering/Sorting:** 
   Instead of pulling all tasks into Node.js memory and filtering arrays, searching, sorting, formatting, and pagination are handled directly at the database level using highly efficient MongoDB Aggregation Pipelines. For example, sorting by priority uses custom dynamic weight mapping (High=3, Medium=2, Low=1) within the MongoDB query.

4. **Proxy Configuration for Local Dev:** 
   Vite is configured to proxy `/api` requests directly to `http://localhost:5000`. This completely circumvents complex CORS handling and pre-flight request issues during local development, mimicking a production reverse-proxy environment.

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
git clone https://github.com/PothulaNagaJyothi/Task_Management_System.git
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

## 🧠 What I Learned

Building this MERN stack assignment taught me a lot about connecting a React frontend to a Node.js backend. Here are a few key things I learned along the way:

- **Handling Logins:** Figuring out how to keep a user logged in after they refresh the page was tricky! I learned how to use JSON Web Tokens (JWT) and save them in the browser's `localStorage` so the user doesn't have to keep re-typing their password.
- **Working with MongoDB Queries:** When adding the "Overdue" feature, I initially wasn't sure how to filter the dates. Instead of returning all tasks and filtering them in React, I learned how to write better MongoDB queries using `$lt` and `$ne` to filter out tasks where the due date has already passed right at the database level.
- **Keeping Code Organized:** As the project grew, having all the API routes and database logic in one file became really confusing. I learned the value of refactoring by splitting the code into different folders (like `controllers` for the logic and `routes` for the URLs), which made it way easier to read, debug, and understand.

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

## 👨‍💻 Author
**Pothula Naga Jyothi**

*Engineered thoughtfully with React, Express, and MongoDB.*
