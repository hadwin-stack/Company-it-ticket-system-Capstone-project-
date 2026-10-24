# 🛠️ Corporate IT Support Ticketing System

A production-ready full-stack **MERN Architecture Application** designed to manage technical issues within a corporate environment. This application features secure user accounts, password encryption, and role-based access control separating staff workflows from administrative tasks.

---

## 👥 User Roles & Access Boundaries
*   **Employee Component:** Can register, log in, submit a new technical issue ticket, and review a customized history log of submitted tickets.
*   **IT Admin Component:** Accesses a global administrative command console to review all active corporate issues, apply data filter states, and authorize closures by marking tickets as "Fixed".

---

## 📝 User Stories & System Acceptance Metrics
*   **Story:** As an Employee, I want to report a technical system failure so that the IT department can address it.
    *   *Acceptance Criteria:* Validation parameters require both title and description input fields. Unauthorized sessions are blocked from submission routes.
*   **Story:** As an IT Admin, I want to mark open issues as resolved so that historical tracking remains accurate.
    *   *Acceptance Criteria:* The administrative execution button is strictly hidden from regular employee sessions. Clicking the button updates the record field status globally across the cloud data matrix.

---

## 🔌 Core API Documentation Contract

| HTTP Method & Path | Security Layer | Functional Task | Target Response Status |
| :--- | :--- | :--- | :--- |
| `POST /api/auth/register` | Public Access | Registers a new user account profile | `201 Created` |
| `POST /api/auth/login` | Public Access | Authorizes session and returns a secure JWT pass | `200 OK` |
| `POST /api/tickets` | Logged-in Employee | Inserts a new support problem entry | `201 Created` |
| `GET /api/tickets` | Logged-in Session | Fetches matching collection models from Atlas | `200 OK` |
| `PATCH /api/tickets/:id/fix` | Verified IT Admin | Modifies ticket data status field to "Fixed" | `200 OK` |

---

## 📁 Monorepo Layout Map
```text
company-it-ticket-system/
├── client/              # React Interface Layer (Vite Setup)
│   ├── src/
│   │   ├── services/    # Centralized Axios API Client
│   │   └── App.jsx      # Navigation Routes & Workspace Dashboards
├── server/              # Node/Express Application Interface
│   ├── src/
│   │   ├── models/      # Mongoose Schema Definitions
│   │   ├── controllers/ # Encrypted Logic Engines
│   │   └── routes/      # Endpoints URL Mappings
└── .gitignore           # Project File Safety Shield
```

---

## ⚙️ Environmental Parameters & Quick Start Setup

### 1. Server Configuration
Create a secure configuration file named `server/.env` containing the following architecture labels:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_custom_session_signing_secret
```

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
