# Real-Time Bus Tracking System (Simulation-Based)

Final-year capstone project that simulates IoT GPS updates for 5 buses in Punjab and streams location updates in real-time using Socket.io.

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, Google Maps JavaScript API, Socket.io Client
- Backend: Node.js, Express, MongoDB (Mongoose), Socket.io, REST APIs

## Project Structure

- `backend/` - REST API, simulation service, socket server, MongoDB models
- `frontend/` - React app with live map, bus selector, ETA cards, admin dashboard

What happens on startup:

- Connects to MongoDB
- Seeds 5 routes + 5 buses if DB is empty
- Starts simulation tick every 5 seconds
- Emits `busLocationUpdate` over Socket.io

## Simulation Logic

- Implemented in `backend/services/simulationService.js`
- Every 5 seconds:
  - each bus moves to next coordinate on its route
  - speed is slightly randomized
  - ETA is recalculated (`distance / speed`)
  - status updates (`Running` or `Delayed`)
  - location history is stored in `Location` collection
  - update is emitted via Socket.io event `busLocationUpdate`

## Features Implemented

### User Side

- Live bus tracking on Google Map
- Dropdown to filter a single bus or show all buses
- Route polyline highlight when one bus is selected
- Dynamic ETA to next stop
- Real-time marker updates via Socket.io
- Analytics cards: total, running, delayed, average speed

### Admin Side

- Hardcoded login (`admin` / `admin123`)
- View all bus live statuses
- Add new routes
- Edit existing routes
- Delay alerts panel

## API Endpoints

- `GET /api/health`
- `POST /api/admin/login`
- `GET /api/buses`
- `GET /api/buses/:id`
- `GET /api/buses/analytics/summary`
- `GET /api/routes`
- `POST /api/routes` (admin headers required)
- `PUT /api/routes/:id` (admin headers required)

Admin headers for protected routes:

- `x-admin-username`
- `x-admin-password`

## Notes

- This is simulation-based IoT; no physical GPS hardware is needed.
- Backend emits updates at a fixed 5-second interval.
- Frontend build has been validated successfully.
