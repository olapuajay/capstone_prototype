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
    busNumber: busDoc.busNumber,
    name: busDoc.name,
    speed: busDoc.speed,
    status: busDoc.status,
    delayMinutes: busDoc.delayMinutes,
    delayReason: busDoc.delayReason,
    currentPointIndex: busDoc.currentPointIndex,
    currentLocation: busDoc.currentLocation,
    currentPassengers: busDoc.currentPassengers,
    capacity: busDoc.capacity,
    route: {
      id: busDoc.route?._id,
      name: busDoc.route?.name,
      from: busDoc.route?.from,
      to: busDoc.route?.to,
      points: routePoints,
    },
    etaToNextStop,
    nextStop,
    driver: busDoc.driver,
    lastUpdateTime: busDoc.lastUpdateTime,
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

export const updateBusStatus = async (req, res) => {
  try {
    const { busId } = req.params;
    const { status, delayReason, delayMinutes } = req.body;

    // Set manual status to expire in 30 minutes
    const manualStatusUntil = new Date(Date.now() + 30 * 60 * 1000);

    const bus = await Bus.findByIdAndUpdate(
      busId,
      {
        status,
        delayReason: delayReason || "none",
        delayMinutes: delayMinutes || 0,
        lastUpdateTime: new Date(),
        manualStatusUntil,
      },
      { new: true },
    ).populate("route");

    return res.json({
      success: true,
      message: "Bus status updated",
      bus: shapeBusPayload(bus),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
