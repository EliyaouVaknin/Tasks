# Task Management Application

This is a full-stack task management application built using Vite with React for the front end and Node.js with Express for the back end. The application supports role-based access (Admin/User), JWT authentication, task management features, and API integration.

## Features
- User authentication (JWT-based login & registration)
- Role-based access control (Admin/User)
- Task management (Create, Read, Update, Delete)
- Responsive UI built with React, Vite and React Bootstrap
- Secure API built with Node.js & Express (require JWT token)

## Tech Stack
### Frontend
- Vite
- React
- React Router
- React Bootstrap

### Backend
- Node.js
- Express.js
- JWT for authentication

## Installation & Setup
### Prerequisites
- Node.js (>= 16.x)
- npm

### Clone the Repository
```sh
git clone https://github.com/EliyaouVaknin/Tasks.git
cd .\Tasks\
```

### Backend Setup
1. Navigate to the server directory:
```sh
cd .\backend\
```
2. Install dependencies:
```sh
npm install
```
3. Start the backend server:
```sh
node .\Server.js
```

### Frontend Setup
1. Navigate to the client directory (if you still in backend folder):
```sh
cd .. 
```
2. Install dependencies:
```sh
npm install
```
3. Start the frontend server:
```sh
npm run dev
```

## Usage
1. Open the application in your browser (e.g., `http://localhost:5173` if using Vite's default port).
2. Register or log in as a user or admin.
3. Manage tasks based on user roles.

## API Endpoints
| Method | Endpoint       | Description                 |
|--------|---------------|-----------------------------|
| POST   | /api/register | Register a new user      |
| POST   | /api/login | Login and receive JWT     |
| GET    | /api/tasks | Get all tasks |
| POST   | /api/tasks | Create a new task   |
| PUT    | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

---
Made with ❤️ by Eliyahu.

