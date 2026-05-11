# SmartBus Tracker - API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

JWT Token Required for:

- Passenger routes (my-tickets, create-tickets)
- Driver routes (status updates)
- Admin routes (ticket management, fleet management)

## Health Check

```
GET /api/health
Response: { status: "ok", service: "smartbus-tracker-backend" }
```

---

## Authentication APIs

### Passenger Registration

```
POST /api/auth/passenger/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "password": "password123"
}
Response: {
  "success": true,
  "message": "Passenger registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "passenger"
  }
}
```

### Passenger Login

```
POST /api/auth/passenger/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: Same as registration
```

### Driver Login

```
POST /api/auth/driver/login
Body: {
  "email": "driver@example.com",
  "password": "password123"
}
Response: {
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Driver Name",
    "email": "driver@example.com",
    "role": "driver",
    "busAssigned": "bus_id"
  }
}
```

### Admin Login

```
POST /api/auth/admin/login
Body: {
  "username": "admin",
  "password": "admin123"
}
Response: {
  "success": true,
  "message": "Admin login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "admin",
    "name": "Administrator",
    "email": "admin@smartbus.com",
    "role": "admin"
  }
}
```

---

## Bus APIs

### Get All Buses

```
GET /api/buses
Response: [
  {
    "id": "bus_id",
    "busNumber": "TS-01-AB-1001",
    "name": "SmartBus 1",
    "speed": 45,
    "status": "Running",
    "delayMinutes": 0,
    "delayReason": "none",
    "currentLocation": { "lat": 17.3629, "lng": 78.4745 },
    "currentPassengers": 35,
    "capacity": 50,
    "route": {
      "id": "route_id",
      "name": "Hyderabad Central -> Secunderabad Station",
      "from": "Hyderabad",
      "to": "Secunderabad",
      "points": [...]
    },
    "etaToNextStop": 12,
    "nextStop": { "stopName": "Abids" }
  }
]
```

### Get Bus by ID

```
GET /api/buses/:id
Response: Single bus object (same structure as above)
```

### Get Bus Analytics

```
GET /api/buses/analytics/summary
Response: {
  "total": 3,
  "running": 2,
  "delayed": 1,
  "avgSpeed": 45
}
```

### Update Bus Status (Driver/Admin Only)

```
PUT /api/buses/:busId/status
Headers: { "Authorization": "Bearer token" }
Body: {
  "status": "Delayed",
  "delayReason": "traffic",
  "delayMinutes": 15
}
Response: {
  "success": true,
  "message": "Bus status updated",
  "bus": { ... }
}
```

---

## Route APIs

### Get All Routes

```
GET /api/routes
Response: [
  {
    "id": "route_id",
    "name": "Hyderabad Central -> Secunderabad Station",
    "from": "Hyderabad",
    "to": "Secunderabad",
    "points": [
      { "lat": 17.3629, "lng": 78.4745, "stopName": "Hyderabad Central Bus Station" },
      { "lat": 17.3735, "lng": 78.4821, "stopName": "Abids" },
      ...
    ]
  }
]
```

### Get Route by ID

```
GET /api/routes/:id
Response: Single route object
```

### Create Route (Admin Only)

```
POST /api/routes
Headers: { "Authorization": "Bearer token" }
Body: {
  "name": "New Route",
  "from": "City A",
  "to": "City B",
  "points": [
    { "lat": 17.3629, "lng": 78.4745, "stopName": "Stop 1" },
    { "lat": 17.3735, "lng": 78.4821, "stopName": "Stop 2" }
  ]
}
Response: { "success": true, "route": { ... } }
```

### Update Route (Admin Only)

```
PUT /api/routes/:id
Headers: { "Authorization": "Bearer token" }
Body: Same as create
Response: { "success": true, "route": { ... } }
```

---

## Ticket APIs

### Create Ticket (Passenger Only)

```
POST /api/tickets
Headers: { "Authorization": "Bearer token" }
Body: {
  "category": "bus_late",
  "message": "Bus was 15 minutes late"
}
Response: {
  "success": true,
  "message": "Ticket created successfully",
  "ticket": {
    "id": "ticket_id",
    "passenger": "passenger_id",
    "category": "bus_late",
    "message": "Bus was 15 minutes late",
    "status": "open",
    "priority": "medium"
  }
}
```

### Get My Tickets (Passenger Only)

```
GET /api/tickets/my-tickets
Headers: { "Authorization": "Bearer token" }
Response: [
  {
    "id": "ticket_id",
    "category": "bus_late",
    "message": "...",
    "status": "open",
    "priority": "medium",
    "createdAt": "2024-05-11T..."
  }
]
```

### Get Ticket Messages

```
GET /api/tickets/:ticketId/messages
Headers: { "Authorization": "Bearer token" }
Response: [
  {
    "id": "message_id",
    "ticket": "ticket_id",
    "sender": { "name": "John Doe", "email": "john@example.com" },
    "senderRole": "passenger",
    "message": "I am facing this issue",
    "createdAt": "2024-05-11T..."
  }
]
```

### Add Ticket Message

```
POST /api/tickets/:ticketId/message
Headers: { "Authorization": "Bearer token" }
Body: {
  "message": "Thank you for reporting"
}
Response: {
  "success": true,
  "message": "Message added successfully",
  "ticketMessage": { ... }
}
```

### Get All Tickets (Admin Only)

```
GET /api/tickets
Headers: { "Authorization": "Bearer token" }
Response: [
  {
    "id": "ticket_id",
    "passenger": { "name": "John", "email": "john@example.com", "mobile": "9876543210" },
    "category": "bus_late",
    "status": "open",
    "priority": "medium"
  }
]
```

### Update Ticket Status (Admin Only)

```
PUT /api/tickets/:ticketId/status
Headers: { "Authorization": "Bearer token" }
Body: {
  "status": "resolved"
}
Response: {
  "success": true,
  "message": "Ticket status updated",
  "ticket": { ... }
}
```

---

## Socket.io Events

### Connection Events

```
connect - Client connects to server
disconnect - Client disconnects

Example:
const socket = io('http://localhost:5000');
socket.on('connect', () => console.log('Connected'));
```

### Bus Updates

```
busLocationUpdate - Emitted every 5 seconds with current bus location
{
  "id": "bus_id",
  "busNumber": "TS-01-AB-1001",
  "name": "SmartBus 1",
  "speed": 45,
  "status": "Running",
  "currentLocation": { "lat": 17.3629, "lng": 78.4745 },
  "etaToNextStop": 12,
  "nextStop": { "stopName": "Abids" },
  "currentPassengers": 35
}
```

---

## Status Enums

### Bus Status

- Running
- Delayed
- Heavy Traffic
- Breakdown
- Inactive

### Delay Reasons

- traffic
- road_construction
- weather
- mechanical
- crowd
- none

### Ticket Category

- bus_late
- overcrowding
- driver_behavior
- skipped_stop
- cleanliness
- lost_item
- wrong_eta
- other

### Ticket Status

- open
- in_progress
- resolved

### User Roles

- passenger
- driver
- admin

---

## Error Responses

### Unauthorized

```
{
  "success": false,
  "message": "No token provided"
}
Status Code: 401
```

### Forbidden

```
{
  "success": false,
  "message": "Insufficient permissions"
}
Status Code: 403
```

### Server Error

```
{
  "success": false,
  "message": "Error message"
}
Status Code: 500
```

---

## Environment Variables Required

```
MONGODB_URI=mongodb://localhost:27017/smartbus-tracker
PORT=5000
FRONTEND_URL=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your_secret_key
```
