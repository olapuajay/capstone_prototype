import Bus from "../models/Bus.js";
import LocationHistory from "../models/LocationHistory.js";
import { calculateEtaMinutes } from "../utils/etaCalculator.js";

const TICK_INTERVAL_MS = 5000;
let simulationInterval;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const createPayload = (busDoc, etaToNextStop, nextStop) => ({
  id: busDoc._id,
  busNumber: busDoc.busNumber,
  name: busDoc.name,
  speed: busDoc.speed,
  status: busDoc.status,
  delayMinutes: busDoc.delayMinutes,
  delayReason: busDoc.delayReason,
  currentPointIndex: busDoc.currentPointIndex,
  currentLocation: busDoc.currentLocation,
  route: busDoc.route,
  etaToNextStop,
  nextStop,
  currentPassengers: busDoc.currentPassengers,
  capacity: busDoc.capacity,
});

const simulateTick = async (io) => {
  const buses = await Bus.find().populate("route");

  for (const bus of buses) {
    const points = bus.route?.points || [];

    if (points.length < 2) {
      continue;
    }

    const nextPointIndex = (bus.currentPointIndex + 1) % points.length;
    const nextPoint = points[nextPointIndex];

    const speedJitter = Math.random() * 6 - 3;
    const nextSpeed = clamp(Math.round(bus.speed + speedJitter), 30, 65);
    const etaToNextStop = calculateEtaMinutes(
      bus.currentLocation,
      nextPoint,
      nextSpeed,
    );

    // Randomly determine delay reason (5% chance of delay)
    const shouldBeDelayed = Math.random() < 0.05;
    let delayReason = "none";
    const delayReasons = [
      "traffic",
      "road_construction",
      "weather",
      "mechanical",
      "crowd",
    ];

    const isDelayed = etaToNextStop > 30 || shouldBeDelayed;
    if (isDelayed) {
      delayReason =
        delayReasons[Math.floor(Math.random() * delayReasons.length)];
    }

    bus.speed = nextSpeed;
    bus.currentPointIndex = nextPointIndex;
    bus.currentLocation = { lat: nextPoint.lat, lng: nextPoint.lng };
    bus.status = isDelayed ? "Delayed" : "Running";
    bus.delayMinutes = isDelayed ? Math.max(1, etaToNextStop - 30) : 0;
    bus.delayReason = delayReason;
    bus.currentPassengers = clamp(
      bus.currentPassengers + Math.floor(Math.random() * 5 - 2),
      0,
      bus.capacity,
    );
    bus.lastUpdateTime = new Date();

    await bus.save();

    await LocationHistory.create({
      bus: bus._id,
      lat: nextPoint.lat,
      lng: nextPoint.lng,
      speed: nextSpeed,
    });

    io.emit(
      "busLocationUpdate",
      createPayload(bus, etaToNextStop, {
        lat: nextPoint.lat,
        lng: nextPoint.lng,
        stopName: nextPoint.stopName,
      }),
    );
  }
};

export const startSimulationService = (io) => {
  if (simulationInterval) {
    return;
  }

  simulationInterval = setInterval(async () => {
    try {
      await simulateTick(io);
    } catch (error) {
      console.error("Simulation tick failed:", error.message);
    }
  }, TICK_INTERVAL_MS);

  console.log(`Simulation service started (${TICK_INTERVAL_MS / 1000}s tick)`);
};
