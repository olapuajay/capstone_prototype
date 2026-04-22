import Bus from "../models/Bus.js";
import { calculateEtaMinutes } from "../utils/etaCalculator.js";

const shapeBusPayload = (busDoc) => {
  const routePoints = busDoc.route?.points || [];
  const nextPointIndex = routePoints.length
    ? (busDoc.currentPointIndex + 1) % routePoints.length
    : 0;
  const nextStop = routePoints[nextPointIndex] || null;
  const etaToNextStop = nextStop
    ? calculateEtaMinutes(busDoc.currentLocation, nextStop, busDoc.speed)
    : null;

  return {
    id: busDoc._id,
    name: busDoc.name,
    speed: busDoc.speed,
    status: busDoc.status,
    delayMinutes: busDoc.delayMinutes,
    currentPointIndex: busDoc.currentPointIndex,
    currentLocation: busDoc.currentLocation,
    route: {
      id: busDoc.route?._id,
      name: busDoc.route?.name,
      from: busDoc.route?.from,
      to: busDoc.route?.to,
      points: routePoints,
    },
    etaToNextStop,
    nextStop,
  };
};

export const getAllBuses = async (_req, res) => {
  try {
    const buses = await Bus.find().populate("route").sort({ name: 1 });
    return res.json(buses.map(shapeBusPayload));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate("route");

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    return res.json(shapeBusPayload(bus));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBusAnalytics = async (_req, res) => {
  try {
    const buses = await Bus.find();

    const total = buses.length;
    const running = buses.filter((bus) => bus.status === "Running").length;
    const delayed = buses.filter((bus) => bus.status === "Delayed").length;
    const avgSpeed = total
      ? Math.round(buses.reduce((sum, bus) => sum + bus.speed, 0) / total)
      : 0;

    return res.json({ total, running, delayed, avgSpeed });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
