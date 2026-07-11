## Part 1 — Conceptual Foundations

### 1. Sockets vs. HTTP

A TCP socket provides a reliable, ordered stream of bytes between two
applications. It handles communication and delivery, but it does not define
what the bytes mean. A raw socket application must define its own commands,
message boundaries, data formats, and error responses.

HTTP adds a standardized request and response protocol on top of the
underlying connection. An HTTP request contains a method, path, headers, and
an optional body. An HTTP response contains a status code, headers, and an
optional body.

Most web APIs use HTTP rather than exposing raw socket protocols because HTTP
is standardized and supported by browsers, servers, clients, proxies, and
development tools. A custom socket protocol would require every client to
implement application-specific message parsing and behavior.

### 2. Request/Response

In the request/response pattern, a client sends a request to a server, the
server processes it, and the server returns a response.

In a TCP command server, the request may be a custom command such as
`UPPER hello`, and the response may be `HELLO`. The application itself must
define how commands and responses are formatted.

In an HTTP API, the request uses an HTTP method, path, headers, and possibly a
body. The response uses an HTTP status code, headers, and possibly a JSON
body.

In an Express route handler, the `req` object represents the incoming HTTP
request and the `res` object is used to construct the response. Express
selects the handler by matching the request's HTTP method and path.

### 3. Statelessness

A stateless API treats each request as an independent operation. Each request
must contain enough information for the server to understand and process it
without relying on hidden context from a previous request.

One advantage is that stateless services are easier to test and scale because
different requests can be handled independently by different server
instances. One disadvantage is that clients may need to repeat information
in multiple requests, which can increase request size and client
responsibility.

Statelessness does not mean that the server cannot store resources. The task
array may still exist on the server; the important point is that the meaning
of a request does not depend on an unfinished conversation with the client.

### 4. HTTP Status Codes

| Situation | Status code | Justification |
|---|---:|---|
| A new resource was successfully created | `201 Created` | The server successfully created a new resource. |
| The client requested an item that does not exist | `404 Not Found` | No resource matched the requested identifier. |
| The client sent JSON missing a required field | `400 Bad Request` | The request body did not satisfy the API's input requirements. |
| The server had an unexpected error | `500 Internal Server Error` | The request could not be completed because of an unexpected server problem. |
| A successful request returns JSON data | `200 OK` | The request succeeded and a representation is included in the response body. |

## Part 2 — API Design

### 1. Resource URIs

| Operation | Method | URI |
|---|---|---|
| Get all tasks | `GET` | `/api/tasks` |
| Get one task by ID | `GET` | `/api/tasks/:id` |
| Create a task | `POST` | `/api/tasks` |
| Replace a task | `PUT` | `/api/tasks/:id` |
| Partially update a task | `PATCH` | `/api/tasks/:id` |
| Delete a task | `DELETE` | `/api/tasks/:id` |

### 2. Method Semantics

| Route | Classification | Explanation |
|---|---|---|
| `GET /api/tasks` | Safe and idempotent | It only retrieves data and repeated requests do not intentionally change server state. |
| `GET /api/tasks/:id` | Safe and idempotent | It retrieves one task without modifying it. |
| `POST /api/tasks` | Neither | It changes server state, and repeating it may create multiple resources. |
| `PUT /api/tasks/:id` | Idempotent but not safe | It replaces a resource, and sending the same replacement repeatedly produces the same final state. |
| `PATCH /api/tasks/:id` | Neither in the general case | It modifies a resource, and some partial-update operations may produce a different result when repeated. |
| `DELETE /api/tasks/:id` | Idempotent but not safe | It changes server state, but repeated deletion leaves the resource absent. |

### 3. JSON Representation

```json
{
  "title": "Complete the CS453 midterm",
  "course": "CS453",
  "completed": false
}

## Part 4 — Middleware

The request logger and task validator are middleware concerns because they
perform cross-cutting work that may apply to multiple routes.

The logger records the HTTP method, path, response status, and elapsed time
for every request. Implementing that behavior as middleware avoids copying
the same timing and logging code into each route handler.

Validation middleware centralizes the rules for acceptable task data. This
keeps route handlers focused on resource operations and ensures that the
same validation behavior and error format are used consistently across
POST, PUT, and PATCH requests.

## Part 7 — Reflection

### 1. Code vs. Contract

An Express route implementation is executable server code. It receives a
real request, performs the requested operation, and produces a real response.

An OpenAPI specification is a machine-readable contract describing how
clients are expected to interact with the API. It describes routes, methods,
parameters, request bodies, responses, and schemas, but it does not by itself
implement the route's application logic.

### 2. Drift

One example of drift is when the OpenAPI document says that a successful
POST request returns `201 Created`, while the Express implementation returns
`200 OK`.

A second example is when the documentation says that `completed` is a
Boolean, but the implementation begins returning it as a string. Drift can
also occur when a route or required field changes in code without the same
change being made in the specification.

### 3. Client Impact

Client developers rely on API documentation to construct requests and parse
responses. Inaccurate documentation can cause clients to call incorrect
paths, send invalid request bodies, misunderstand response schemas, or
handle status codes incorrectly. This can create runtime failures and make
integration unnecessarily difficult.