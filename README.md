# Simple Node.js HTTP Server with Request Parsing

This project is a basic **Node.js HTTP server** built without Express or other frameworks.  
It demonstrates how to:

- Create an HTTP server using Node.js' built-in `http` module
- Parse incoming request headers and data
- Handle GET and POST requests
- Extract query parameters and request body
- Send structured JSON responses

---

## 🚀 Features
- **Pure Node.js** — no external frameworks
- Handles multiple request methods (GET, POST)
- Parses URL query parameters
- Parses JSON request bodies
- Returns clean JSON responses

---

## 📂 Project Structure
📁 Project folder
├── index.html # Login page
├── index.js # Frontend JS for login
├── dashboard.html # Protected dashboard page
├── dashboard.js # Frontend JS for logout
├── server.js # Node.js HTTP server
└── README.md # Project documentation


---

## ⚙️ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

2.  **Run the server**
    node server.js

3.  **Open in browser**
    http://localhost:3000

## 🔑 Default Login
    
    | Username | Password |
    | -------- | -------- |
    | admin    | 12345    |

## 🛠 How It Works
-  Login: Sends a POST request to /login. If credentials match, sets an auth=true cookie.

-  Dashboard: Server checks the cookie on /dashboard request.
   If auth is not "true", it redirects to /.

-  Logout: Calls /logout which clears the cookie and redirects to /.

## 📜 Example Request Flow Diagram

    sequenceDiagram
    participant User
    participant Server

    User->>Server: POST /login {username, password}
    Server-->>User: Set-Cookie auth=true, redirect to /dashboard

    User->>Server: GET /dashboard
    Server-->>User: If cookie auth=true -> Serve dashboard.html
    Server-->>User: Else -> Redirect to /

    User->>Server: GET /logout
    Server-->>User: Set-Cookie auth=false, redirect to /


[![Backend-Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)
