import Bus from "../models/Bus.js";
import Route from "../models/Route.js";
import User from "../models/User.js";

const defaultRoutes = [
  {
    busNumber: "TS-01-AB-1001",
    busName: "SmartBus 1",
    name: "Hyderabad Central -> Secunderabad Station",
    from: "Hyderabad",
    to: "Secunderabad",
    points: [
      {
        lat: 17.3629,
        lng: 78.4745,
        stopName: "Hyderabad Central Bus Station",
      },
      { lat: 17.3735, lng: 78.4821, stopName: "Abids" },
      { lat: 17.3825, lng: 78.4897, stopName: "SD Road" },
      { lat: 17.3915, lng: 78.5001, stopName: "Nampally" },
      { lat: 17.4045, lng: 78.5087, stopName: "Secunderabad Station" },
    ],
  },
  {
    busNumber: "TS-01-AB-1002",
    busName: "SmartBus 2",
    name: "Hyderabad -> Gachibowli",
    from: "Hyderabad",
    to: "Gachibowli",
    points: [
      {
        lat: 17.3629,
        lng: 78.4745,
        stopName: "Hyderabad Central Bus Station",
      },
      { lat: 17.3542, lng: 78.4512, stopName: "Kacheguda Station" },
      { lat: 17.3298, lng: 78.4159, stopName: "Lallaguda" },
      { lat: 17.4328, lng: 78.4427, stopName: "Gachibowli Circle" },
    ],
  },
  {
    busNumber: "TS-01-AB-1003",
    busName: "SmartBus 3",
    name: "Hyderabad -> HITEC City",
    from: "Hyderabad",
    to: "HITEC City",
    points: [
      {
        lat: 17.3629,
        lng: 78.4745,
        stopName: "Hyderabad Central Bus Station",
      },
      { lat: 17.3765, lng: 78.4965, stopName: "Secunderabad" },
      { lat: 17.4536, lng: 78.5515, stopName: "Ameerpet" },
      { lat: 17.4583, lng: 78.6165, stopName: "Madhapur" },
      { lat: 17.4614, lng: 78.6368, stopName: "HITEC City" },
    ],
  },
];

const randomSpeed = () => Math.round(35 + Math.random() * 15);

export const seedInitialData = async () => {
  const busCount = await Bus.countDocuments();
  const userCount = await User.countDocuments();

  if (busCount > 0 && userCount > 0) {
    return;
  }

  // Seed users (drivers) if not already present
  if (userCount === 0) {
    // Create test drivers
    await User.create([
      {
        name: "Rajesh Kumar",
        email: "driver@smartbus.com",
        mobile: "9876543210",
        password: "driver123",
        role: "driver",
        licenseNumber: "DL-01-1234",
        isActive: true,
      },
      {
        name: "Priya Singh",
        email: "driver2@smartbus.com",
        mobile: "9876543211",
        password: "driver123",
        role: "driver",
        licenseNumber: "DL-01-1235",
        isActive: true,
      },
      {
        name: "Vikram Patel",
        email: "driver3@smartbus.com",
        mobile: "9876543212",
        password: "driver123",
        role: "driver",
        licenseNumber: "DL-01-1236",
        isActive: true,
      },
    ]);

    console.log("Seeded 3 test drivers");
  }

  // Seed buses and routes if not already present
  if (busCount === 0) {
    const drivers = await User.find({ role: "driver" });
    const createdBuses = [];

    for (let i = 0; i < defaultRoutes.length; i++) {
      const routeSeed = defaultRoutes[i];
      const route = await Route.create({
        name: routeSeed.name,
        from: routeSeed.from,
        to: routeSeed.to,
        points: routeSeed.points,
      });

      const startPoint = routeSeed.points[0];
      const driver = drivers[i] || null;

      const bus = await Bus.create({
        busNumber: routeSeed.busNumber,
        name: routeSeed.busName,
        route: route._id,
        driver: driver ? driver._id : null,
        speed: randomSpeed(),
        currentPointIndex: 0,
        currentLocation: { lat: startPoint.lat, lng: startPoint.lng },
        status: "Running",
        delayReason: "none",
        delayMinutes: 0,
        capacity: 50,
        currentPassengers: Math.floor(Math.random() * 40) + 10,
      });

      if (driver) {
        createdBuses.push({ driver, bus });
      }
    }

    // Assign buses to drivers
    for (const { driver, bus } of createdBuses) {
      driver.busAssigned = bus._id;
      await driver.save();
    }

    console.log("Seeded 3 initial routes and buses for Telangana");
  }
};
