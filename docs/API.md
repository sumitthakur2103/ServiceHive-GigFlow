# GigFlow API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register

`POST /auth/register`

Request:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "Password123!"
}
```

Response:

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "role": "Sales User"
    }
  }
}
```

### Login

`POST /auth/login`

Request:

```json
{
  "email": "admin@gigflow.com",
  "password": "Password123!"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "name": "Admin User",
      "email": "admin@gigflow.com",
      "role": "Admin"
    }
  }
}
```

### Me

`GET /auth/me`

Headers:

`Authorization: Bearer <token>`

Response:

```json
{
  "success": true,
  "message": "Profile loaded",
  "data": {
    "user": {
      "id": "user_id",
      "name": "Admin User",
      "email": "admin@gigflow.com",
      "role": "Admin"
    }
  }
}
```

## Leads

All lead routes require authentication.

### List Leads

`GET /leads`

Query parameters:

- `status=Qualified`
- `source=Instagram`
- `search=Rahul`
- `sort=latest|oldest`
- `page=1`
- `limit=10`

Example:

`GET /leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1&limit=10`

Response:

```json
{
  "success": true,
  "message": "Leads fetched",
  "data": [],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

### Lead Details

`GET /leads/:id`

Response:

```json
{
  "success": true,
  "message": "Lead fetched",
  "data": {
    "_id": "lead_id",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "status": "Qualified",
    "source": "Instagram",
    "assignedTo": {
      "id": "user_id",
      "name": "Admin User",
      "email": "admin@gigflow.com",
      "role": "Admin"
    },
    "createdAt": "2026-05-18T10:00:00.000Z",
    "updatedAt": "2026-05-18T10:10:00.000Z"
  }
}
```

### Create Lead

`POST /leads`

Admin only.

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Website",
  "assignedTo": "user_id"
}
```

### Update Lead

`PUT /leads/:id`

Admin can update any lead. Sales users can update assigned leads only.

### Delete Lead

`DELETE /leads/:id`

Admin only.

## Users

### List Users

`GET /users`

Admin only. Returns a list of users for lead assignment dropdowns.

## Admin

### Create Admin Account

`POST /admin/setup`

Admin only. Creates or updates a user as an admin account.

Request:

```json
{
  "name": "Second Admin",
  "email": "admin2@gigflow.com",
  "password": "Password123!"
}
```

### Stats

`GET /leads/stats`

Returns total leads, breakdown by status, and recent leads.

### Export CSV

`GET /leads/export/csv`

Supports the same filters as list endpoints and exports the current filtered result set.

## Status Codes

- `200` success
- `201` created
- `400` validation error
- `401` unauthorized
- `403` forbidden
- `404` not found
- `409` conflict
- `500` server error
