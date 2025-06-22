# 🧑‍💻 Job Portal Backend

This is a RESTful API backend for a **Job Portal Application**, built using **Node.js**, **Express.js**, **MongoDB**, and **Swagger** for API documentation. It allows users to register, log in, manage job listings, update profiles, and view application statistics.

## 🚀 Features

- 🔐 User Registration and Login with JWT Authentication
- 📝 Create, Read, Update, and Delete Job Posts
- 📊 Get Job Statistics (by status & monthly applications)
- 👤 Update User Profile
- 🧹 Input Sanitization and Error Handling
- 🔒 Helmet, Mongo Sanitize for Security
- 📄 Swagger API Documentation (`/api-docs`)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Security:** Helmet, express-mongo-sanitize
- **Documentation:** Swagger (OpenAPI 3.0)
- **Others:** CORS, dotenv, morgan

---

## Installation

```bash
git clone https://github.com/your-username/job-portal-backend.git
cd job-portal-backend
npm install
```
Set up your `.env` file based on the `.env.example` (must include Mongo URI, JWT secret, etc).

## Running the Project

```bash
npm run server
```

## API Documentation

Once the server is running, navigate to:
```
http://localhost:8080/api-docs
```

This opens the Swagger UI interface where all routes are documented.

## Folder Structure

```
├── config/ # Swagger & DB config
├── controllers/ # Business logic
├── middlewares/ # Custom middleware (auth, error, sanitizer)
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── .env # Environment variables (ignored)
├── server.js # Entry point
└── package.json
```

## Author

**Sajal Pakira**  
🔗 [GitHub](https://github.com/sajal-pakira)  
📸 [Instagram](https://www.instagram.com/sajal_pakira?igsh=MXNkNHdvdnc3aDF3ZA==)

---

## 🧪 API Endpoints Overview

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| POST   | `/api/v1/auth/register`  | Register a new user 🆕   |
| POST   | `/api/v1/auth/login`     | Login user 🔐            |
| PUT    | `/api/v1/user/update`    | Update user profile ✏️   |
| DELETE | `/api/v1/user/delete`    | Delete user account 🗑️  |
| POST   | `/api/v1/job/create`     | Create a job post 🧾     |
| GET    | `/api/v1/job/get`        | Get all jobs for user 📃 |
| PATCH  | `/api/v1/job/update/:id` | Update job post 🔄       |
| DELETE | `/api/v1/job/delete/:id` | Delete job post ❌        |
| GET    | `/api/v1/job/stats`      | Get job stats 📊         |


© 2025 Job Portal API - All rights reserved.
