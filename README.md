# 🛠️ Corporate IT Support Ticketing System

A full-stack **MERN-style application** for reporting and tracking technical issues. It uses a React/Vite client, an Express API, and MongoDB through Mongoose. Passwords are hashed with bcryptjs, and login issues a JWT; ticket API routes do not currently verify that token or enforce user roles.

---

## 👥 User Roles & Access Boundaries
*   **Employee Component:** Can register, log in, submit a technical issue, and view the ticket list. The list is global rather than limited to the signed-in employee's tickets.
*   **IT Admin Component:** Can view and filter the global ticket list and mark pending tickets as "Fixed". The admin action is hidden in the employee interface, but the API does not enforce this restriction.
*   **Role selection:** Registration allows the user to select `employee` or `admin`; the server accepts the submitted role. Do not treat the current role-based UI as an authorization boundary.

---

## 📝 User Stories & System Acceptance Metrics
*   **Story:** As an Employee, I want to report a technical system failure so that the IT department can address it.
    *   *Current behavior:* The client checks that title and description are present. The ticket schema also requires both fields. The API does not require an authenticated session.
*   **Story:** As an IT Admin, I want to mark open issues as resolved so that historical tracking remains accurate.
    *   *Current behavior:* The UI only shows the action to users with the `admin` role, and clicking it changes the ticket status to `Fixed`. The API endpoint does not verify the caller's role.

---

## 🔌 Core API Documentation Contract

| HTTP Method & Path | Access in Current Code | Functional Task | Success Response Status |
| :--- | :--- | :--- | :--- |
| `POST /api/auth/register` | Public; role may be supplied | Registers an account and hashes its password | `201 Created` |
| `POST /api/auth/login` | Public | Verifies credentials and returns a one-day JWT and user details | `200 OK` |
| `POST /api/tickets` | Public; no token verification | Creates a ticket with `Pending` status | `201 Created` |
| `GET /api/tickets` | Public; returns all tickets | Lists tickets newest first | `200 OK` |
| `PATCH /api/tickets/:id/fix` | Public; no role verification | Changes a ticket status to `Fixed` | `200 OK` |
| `GET /api/health` | Public | Returns a backend health message | `200 OK` |

---

## 📁 Monorepo Layout Map
```text
company-it-ticket-system/
├── client/              # React Interface Layer (Vite Setup)
│   ├── src/
│   │   ├── services/api.js # Axios API client
│   │   └── App.jsx      # Login, registration, and ticket dashboard
├── server/              # Node/Express Application Interface
│   ├── server.js         # Express app, MongoDB connection, and API mounts
│   ├── src/
│   │   ├── models/      # Mongoose Schema Definitions
│   │   ├── controllers/ # Authentication and ticket handlers
│   │   └── routes/      # API endpoint mappings
```

---

## ⚙️ Environmental Parameters & Quick Start Setup

### 1. Server Configuration
Create `server/.env` with a MongoDB connection string and a private JWT signing secret:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_private_signing_secret
```
`PORT` defaults to `5000` if omitted. The server connects to MongoDB using `MONGODB_URI`.

### 2. Launch Instructions
To run the full application ecosystem simultaneously on your computer, execute these commands in two separate terminal windows:

*   **Terminal 1 (Backend API Engine):**
    ```bash
    cd server
    npm install
    node server.js
    ```
*   **Terminal 2 (Frontend Interface Application):**
    ```bash
    cd client
    npm install
    npm run dev
    ```

The client uses the hosted Render API by default. Before running the client locally, set the `baseURL` in `client/src/services/api.js` to `http://localhost:5000/api`.

The client also provides `npm run build` and `npm run lint`. The server package does not currently define a test script.
