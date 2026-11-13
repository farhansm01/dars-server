# Dars — Server

REST API for the Dars LMS. Handles course and lecture CRUD. Write routes are protected by JWT authentication.

## Tech Stack

- **Express 5** — TypeScript
- **MongoDB** — native driver
- **jose-cjs** — JWT verification via JWKS

## Local Setup

### Prerequisites

- Node.js 18+
- A running MongoDB instance (local or Atlas)
- `dars-client` running on port 3000 (required for JWKS verification)

### 1. Clone and install

```bash
git clone <repo-url>
cd dars-server
npm install
```

### 2. Create environment file

Create a `.env` file in the root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGIN=http://localhost:3000
```

### 3. Start the development server

```bash
npm run dev
```

API runs at `http://localhost:5000`

## API Endpoints

### Courses

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/courses` | Public | Get all courses |
| GET | `/api/courses/:id` | Public | Get a single course |
| POST | `/api/courses` | 🔒 Required | Create a course |
| PUT | `/api/courses/:id` | 🔒 Required | Update a course |
| DELETE | `/api/courses/:id` | 🔒 Required | Delete a course |

### Lectures

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/courses/:courseId/lectures` | Public | Get lectures for a course |
| POST | `/api/courses/:courseId/lectures` | 🔒 Required | Add a lecture |
| GET | `/api/lectures/:id` | Public | Get a single lecture |
| PUT | `/api/lectures/:id` | 🔒 Required | Update a lecture |
| DELETE | `/api/lectures/:id` | 🔒 Required | Delete a lecture |

## Authentication

Protected routes require an `Authorization: Bearer <token>` header. The token is a JWT issued by the `dars-client` Better Auth server and verified against its JWKS endpoint at `{CLIENT_URL}/api/auth/jwks`.

