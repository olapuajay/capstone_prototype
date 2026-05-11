# SmartBus Tracker

## Smart Real-Time Bus Tracking System for Small Cities

A comprehensive **MERN stack** application that provides real-time GPS tracking, driver management, passenger complaint resolution, and IoT simulation for small to medium-sized urban transit systems. Built with **Socket.io** for real-time updates and **i18next** for multi-language support.

**Status**: 🎉 **Fully Functional Production-Ready Application**

## 🌟 Features

### 🚀 Real-Time Tracking

- Live GPS tracking of buses with Socket.io updates (5-second intervals)
- Interactive Google Maps integration with bus markers and route polylines
- Real-time ETA calculations based on current speed and distance
- Location history tracking for all buses

### 👥 Multi-Role System

- **Passengers**: Track buses, view bus details, submit complaints, manage tickets
- **Drivers**: Update bus status, manage delay information, monitor passenger capacity
- **Admins**: Manage routes, view all buses, manage passengers' complaints, system monitoring

### 🗣️ Multi-Language Support (i18n)

- **English** (en) 🇬🇧
- **Hindi** (hi) 🇮🇳
- **Telugu** (te) 🇮🇳
- Language preference saved to localStorage
- 570+ translation keys covering all UI elements

### 🎯 Core Functionalities

- **Passenger Complaints System**: Report bus-related issues with categories (late, overcrowding, cleanliness, etc.)
- **Driver Status Management**: Update bus status (Running, Delayed, Heavy Traffic, Breakdown, Inactive) with reason codes
- **Route Management**: Admin panel for creating and managing bus routes
- **Passenger Analytics**: Real-time capacity tracking and occupancy visualization
- **Delay Alerts**: Automatic detection and monitoring of delayed buses
- **Authentication**: JWT-based secure authentication for all user roles

### 📱 Responsive Design

- Mobile-first responsive UI with Tailwind CSS
- Modern dark theme with accent colors
- Smooth transitions and animations
- Accessibility features

## 🛠️ Tech Stack

### Frontend

- **Framework**: React (Vite) v18
- **Styling**: Tailwind CSS 3 + Custom CSS Grid
- **State Management**: React Context API
- **Routing**: React Router v6
- **Real-time**: Socket.io Client
- **Maps**: Google Maps JavaScript API
- **i18n**: i18next + react-i18next
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.io
- **Authentication**: JWT (jsonwebtoken) + bcrypt password hashing
- **Environment**: Dotenv for configuration
- **Validation**: Mongoose schema validation

### Database Models

- **User**: Multi-role authentication (passenger, driver, admin)
- **Bus**: Enhanced with driver assignment, status, capacity, and delay tracking
- **Route**: Bus routes with start/end points and configuration
- **Ticket**: Passenger complaints/support tickets with categories and priorities
- **TicketMessage**: Support chat system between passengers and admins
- **LocationHistory**: Indexed historical tracking data for all buses

## 📦 Project Structure

```
capstone_project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # User authentication (passenger, driver, admin)
│   │   ├── busController.js      # Bus management and status updates
│   │   └── ticketController.js   # Complaint/ticket system
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification & role-based access
│   ├── models/
│   │   ├── User.js               # User schema (passenger, driver, admin)
│   │   ├── Bus.js                # Bus with driver, status, capacity
│   │   ├── Route.js              # Route definition
│   │   ├── Ticket.js             # Complaint tickets
│   │   ├── TicketMessage.js      # Support messages
│   │   └── LocationHistory.js    # Historical tracking data
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── busRoutes.js          # Bus endpoints
│   │   ├── routeRoutes.js        # Route endpoints
│   │   └── ticketRoutes.js       # Ticket endpoints
│   ├── services/
│   │   ├── seedDataService.js    # Initial data seeding
│   │   └── simulationService.js  # IoT simulation engine
│   ├── socket/
│   │   └── socketHandler.js      # Real-time Socket.io handlers
│   ├── utils/
│   │   └── etaCalculator.js      # ETA calculation algorithm
│   └── server.js                 # Express app & Socket.io setup
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx            # Navigation with language switcher
    │   │   ├── MapView.jsx           # Google Maps integration
    │   │   ├── BusSelector.jsx       # Bus dropdown selector
    │   │   ├── LanguageSwitcher.jsx  # i18n language switcher
    │   │   └── Loader.jsx            # Loading component
    │   ├── context/
    │   │   ├── AuthContext.jsx       # Auth state management
    │   │   └── BusContext.jsx        # Bus data & Socket.io
    │   ├── pages/
    │   │   ├── Landing.jsx           # Hero & feature showcase
    │   │   ├── Home.jsx              # Live tracker page
    │   │   ├── AdminDashboard.jsx    # Admin panel
    │   │   ├── PassengerDashboard.jsx # Passenger dashboard
    │   │   ├── DriverPanel.jsx       # Driver management page
    │   │   └── auth/
    │   │       ├── PassengerAuth.jsx
    │   │       └── DriverAuth.jsx
    │   ├── i18n/
    │   │   ├── config.js
    │   │   └── locales/
    │   │       ├── en.json           # 570+ English translations
    │   │       ├── hi.json           # 570+ Hindi translations
    │   │       └── te.json           # 570+ Telugu translations
    │   ├── services/
    │   │   └── socket.js             # Socket.io client setup
    │   ├── App.jsx                   # Main routing
    │   ├── main.jsx                  # i18n provider setup
    │   └── styles.css                # Global styles
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🔐 Authentication & Authorization

### Login Endpoints

```
POST /api/auth/passenger/register  # Passenger registration
POST /api/auth/passenger/login     # Passenger login
POST /api/auth/driver/login        # Driver login (demo: driver@smartbus.com/driver123)
POST /api/auth/admin/login         # Admin login (demo: admin/admin123)
```

### JWT Token

- Issued on successful login
- Stored in localStorage
- Attached to all protected API requests
- 7-day expiry for passengers/drivers, 24-hour for admin

## 🧪 Test Credentials

### Admin

```
Username: admin
Password: admin123
```

### Drivers (Pre-seeded)

```
Email: driver@smartbus.com
Password: driver123

Email: driver2@smartbus.com
Password: driver123

Email: driver3@smartbus.com
Password: driver123
```

### Passengers

```
Register a new account on the passenger login page
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14+
- MongoDB (local or Atlas connection)
- Google Maps API key

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/smartbus
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
EOF

# Start server with auto-reload
npm start
# or
nodemon server.js
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📡 Real-Time Updates (Socket.io)

### Emitted Events

- `busLocationUpdate`: New bus location data (5-second intervals)
- `busStatusChange`: Bus status update (Running, Delayed, etc.)
- `busCapacityChange`: Passenger count update

### Subscribed Events

- `busLocationUpdate`: Listen for new bus coordinates
- System automatically reconnects on disconnect

## 🎨 UI/UX Features

- **Dark Theme**: Easy on eyes with custom accent colors (#3ddc97)
- **Responsive Design**: Works on mobile, tablet, desktop
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Toast-like confirmations
- **Interactive Maps**: Zoom, pan, marker clustering

## 🗺️ Bus Routes (Hyderabad Region)

Three pre-configured routes in Telangana:

1. **Route 1**: Hyderabad Central → Secunderabad
   - Distance: ~12 km
   - Stops: 5

2. **Route 2**: Hyderabad → Gachibowli
   - Distance: ~15 km
   - Stops: 6

3. **Route 3**: Hyderabad → HITEC City
   - Distance: ~18 km
   - Stops: 7

## 🔄 Simulation Logic

The IoT simulation runs every 5 seconds:

1. **Movement**: Each bus moves to the next coordinate on its route
2. **Speed Variation**: Speed varies ±10% randomly
3. **Delay Simulation**: 5% chance of random delay with reason codes
4. **Capacity Fluctuation**: Passenger count changes ±2 within capacity limits
5. **ETA Recalculation**: Real-time ETA based on current position and speed
6. **Data Persistence**: All updates stored in LocationHistory collection
7. **Real-time Broadcasting**: Updates emitted via Socket.io to all connected clients

## 📊 API Endpoints

### Authentication

```
POST   /api/auth/passenger/register
POST   /api/auth/passenger/login
POST   /api/auth/driver/login
POST   /api/auth/admin/login
```

### Buses

```
GET    /api/buses                      # Get all buses
GET    /api/buses/:busId               # Get specific bus details
PUT    /api/buses/:busId/status        # Update bus status (driver/admin only)
```

### Routes

```
GET    /api/routes                     # Get all routes
POST   /api/routes                     # Create route (admin only)
PUT    /api/routes/:routeId            # Update route (admin only)
DELETE /api/routes/:routeId            # Delete route (admin only)
```

### Tickets (Complaints)

```
POST   /api/tickets                    # Create complaint (passenger only)
GET    /api/tickets/my-tickets         # Get passenger's complaints
GET    /api/tickets/:ticketId/messages # Get complaint messages
POST   /api/tickets/:ticketId/message  # Add message to complaint
GET    /api/tickets                    # Get all complaints (admin only)
PUT    /api/tickets/:ticketId/status   # Update complaint status (admin only)
```

## 🌐 Supported Languages

| Language | Code | Status      |
| -------- | ---- | ----------- |
| English  | en   | ✅ Complete |
| Hindi    | hi   | ✅ Complete |
| Telugu   | te   | ✅ Complete |

Change language using the flag buttons in the navbar! 🌍

## ✨ Key Improvements from v1

- ✅ Multi-role user system (Passenger, Driver, Admin)
- ✅ JWT authentication with role-based access control
- ✅ Passenger complaint/ticket system with support chat
- ✅ Driver panel for real-time status management
- ✅ Multi-language support (i18next) for 3 languages
- ✅ Enhanced MongoDB models with relationships
- ✅ Improved UI/UX with responsive design
- ✅ Session persistence (refresh page keeps login)
- ✅ Real-time capacity tracking
- ✅ Delay reason tracking
- ✅ Admin dashboard for complaint management
- ✅ Landing page with feature showcase
- ✅ Professional SaaS-like landing page

## 🐛 Known Issues & Future Enhancements

### Current

- ✅ All core features working
- ✅ Multi-language support implemented
- ✅ Session persistence fixed
- ✅ Real-time updates stable

### Future Enhancements

- [ ] Push notifications for delays
- [ ] Historical route analytics
- [ ] Driver earning dashboard
- [ ] Passenger loyalty program
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Payment integration
- [ ] SMS/Email notifications

## 📧 Support & Contact

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ as a Capstone Project**  
_SmartBus Tracker - Modernizing Public Transportation_ 🚌
