# CS453 Midterm Exam - Course Task Tracker API

## Overview

This project implements a REST-style HTTP API using Express.js for managing course tasks. The API stores data in an in-memory array and supports creating, retrieving, updating, and deleting tasks using standard HTTP methods.

No database or authentication is used, as specified in the assignment requirements.

---

## Features

- Express.js REST API
- JSON request and response bodies
- In-memory task storage
- Automatic task ID generation
- Request logging middleware
- Task validation middleware
- Appropriate HTTP status codes
- OpenAPI specification
- Node.js client demonstrating API usage

---

## Requirements

- Node.js (version 18 or newer)
- npm

---

## Installation

Clone the repository and install dependencies.

```bash
npm install
```

---

## Starting the Server

Run:

```bash
npm start
```

The server will start on:

```
http://localhost:3000
```

You should see something similar to:

```
Server listening on http://localhost:3000
```

---

## Running the Client

Leave the server running in one terminal.

Open another terminal and run:

```bash
npm run client
```

The client demonstrates the following operations:

1. Health check
2. Create a task
3. List all tasks
4. Retrieve a task by ID
5. Update a task
6. Delete a task

Console output is displayed for each request and response.

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Replace an existing task |
| PATCH | `/api/tasks/:id` | Partially update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Task Format

Example task object:

```json
{
  "id": "1",
  "title": "Watch Week 3 lecture",
  "course": "CS453",
  "completed": false
}
```

---

## Expected HTTP Status Codes

| Status | Meaning |
|---------|---------|
| 200 OK | Successful GET, PUT, or PATCH request |
| 201 Created | Resource successfully created |
| 204 No Content | Resource successfully deleted |
| 400 Bad Request | Invalid request data |
| 404 Not Found | Requested task does not exist |
| 500 Internal Server Error | Unexpected server error |

---

## Project Structure

```
.
├── src
│   ├── server.js
│   ├── routes
│   │   └── tasks.js
│   └── middleware
│       ├── logger.js
│       ├── validateTask.js
│       └── errorHandler.js
├── client.js
├── answers.md
├── openapi.yaml
├── README.md
├── package.json
└── package-lock.json
```

---

## Middleware

The project includes:

- Request logging middleware
    - Logs HTTP method
    - Request path
    - Response status code
    - Request processing time

- Validation middleware
    - Validates required task fields
    - Returns HTTP 400 for invalid input

---

## OpenAPI

The API contract is documented in:

```
openapi.yaml
```

This specification documents:

- API metadata
- Endpoints
- Request schemas
- Response schemas
- Path parameters
- Error responses

---

## Notes

- Task data is stored only in memory.
- Restarting the server resets all tasks.
- No database is required.
- No authentication is implemented, as specified in the assignment.
