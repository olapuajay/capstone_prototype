import Bus from "../models/Bus.js";
import Route from "../models/Route.js";

const defaultRoutes = [
  {
    busName: "Bus 1",
    name: "Ludhiana -> Jalandhar",
    from: "Ludhiana",
    to: "Jalandhar",
    points: [
      { lat: 30.901, lng: 75.8573, stopName: "Ludhiana ISBT" },
      { lat: 31.0075, lng: 75.9512, stopName: "Phillaur" },
      { lat: 31.1828, lng: 75.7022, stopName: "Jalandhar Bus Stand" },
    ],
  },
  {
    busName: "Bus 2",
    name: "Amritsar -> Jalandhar",
    from: "Amritsar",
    to: "Jalandhar",
    points: [
      { lat: 31.634, lng: 74.8723, stopName: "Amritsar ISBT" },
      { lat: 31.6225, lng: 75.371, stopName: "Beas" },
      { lat: 31.326, lng: 75.5762, stopName: "Kartarpur" },
      { lat: 31.326, lng: 75.5762, stopName: "Jalandhar City Entry" },
      { lat: 31.1828, lng: 75.7022, stopName: "Jalandhar Bus Stand" },
    ],
  },
  {
    busName: "Bus 3",
    name: "Patiala -> Chandigarh",
    from: "Patiala",
    to: "Chandigarh",
    points: [
      { lat: 30.3398, lng: 76.3869, stopName: "Patiala Bus Stand" },
      { lat: 30.4835, lng: 76.5948, stopName: "Rajpura" },
      { lat: 30.7046, lng: 76.7179, stopName: "Zirakpur" },
      { lat: 30.7333, lng: 76.7794, stopName: "Chandigarh ISBT" },
    ],
  },
  {
    busName: "Bus 4",
    name: "Mohali -> Chandigarh",
    from: "Mohali",
    to: "Chandigarh",
    points: [
      { lat: 30.7046, lng: 76.7179, stopName: "Mohali Phase 7" },
      { lat: 30.7214, lng: 76.7411, stopName: "Sector 43" },
      { lat: 30.7333, lng: 76.7794, stopName: "Chandigarh ISBT" },
    ],
  },
  {
    busName: "Bus 5",
    name: "Bathinda -> Mansa",
    from: "Bathinda",
    to: "Mansa",
    points: [
      { lat: 30.211, lng: 74.9455, stopName: "Bathinda Bus Stand" },
      { lat: 29.986, lng: 75.2441, stopName: "Maur Mandi" },
      { lat: 29.9889, lng: 75.4017, stopName: "Mansa Bus Stand" },
    ],
  },
];

const randomSpeed = () => Math.round(35 + Math.random() * 15);

export const seedInitialData = async () => {
  const busCount = await Bus.countDocuments();

  if (busCount > 0) {
    return;
  }

  for (const routeSeed of defaultRoutes) {
    const route = await Route.create({
      name: routeSeed.name,
      from: routeSeed.from,
      to: routeSeed.to,
      points: routeSeed.points,
    });

    const startPoint = routeSeed.points[0];

    await Bus.create({
      name: routeSeed.busName,
      route: route._id,
      speed: randomSpeed(),
      currentPointIndex: 0,
      currentLocation: { lat: startPoint.lat, lng: startPoint.lng },
      status: "Running",
      delayMinutes: 0,
    });
  }

  console.log("Seeded initial routes and buses");
};
