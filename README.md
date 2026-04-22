# MERN Real-Time Bus Tracking System (Simulation-Based)

Final-year capstone project that simulates IoT GPS updates for 5 buses in Punjab and streams location updates in real-time using Socket.io.

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, Google Maps JavaScript API, Socket.io Client
- Backend: Node.js, Express, MongoDB (Mongoose), Socket.io

## Project Structure

- `backend/` - REST API, simulation service, socket server, MongoDB models
- `frontend/` - React app with live map, bus selector, ETA cards, admin dashboard

## 1) Backend Setup (Step-by-step)

1. Open terminal:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` from example:

```bash
copy .env.example .env
```

4. Update `.env` values if needed:

- `MONGO_URI` (required)
- `PORT` (default 5000)
- `FRONTEND_URL` (default `http://localhost:5173`)
- `ADMIN_USERNAME` and `ADMIN_PASSWORD` (defaults `admin/admin123`)

5. Start backend:

```bash
npm run dev
```

What happens on startup:

- Connects to MongoDB
- Seeds 5 routes + 5 buses if DB is empty
- Starts simulation tick every 5 seconds
- Emits `busLocationUpdate` over Socket.io

## 2) Simulation Logic

- Implemented in `backend/services/simulationService.js`
- Every 5 seconds:
  - each bus moves to next coordinate on its route
  - speed is slightly randomized
  - ETA is recalculated (`distance / speed`)
  - status updates (`Running` or `Delayed`)
  - location history is stored in `Location` collection
  - update is emitted via Socket.io event `busLocationUpdate`

## 3) Frontend Setup (Step-by-step)

1. Open second terminal:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env`:

```bash
copy .env.example .env
```

4. Set Google Maps key:

- `VITE_GOOGLE_MAPS_API_KEY=your_key_here`
- `VITE_API_BASE_URL=http://localhost:5000/api`
- `VITE_SOCKET_URL=http://localhost:5000`

5. Start frontend:

```bash
npm run dev
```

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
