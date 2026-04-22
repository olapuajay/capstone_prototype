import Bus from "../models/Bus.js";
import { calculateEtaMinutes } from "../utils/etaCalculator.js";

export const initializeSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    try {
      const buses = await Bus.find().populate("route");
      const snapshot = buses.map((bus) => {
        const routePoints = bus.route?.points || [];
        const nextPoint = routePoints.length
          ? routePoints[(bus.currentPointIndex + 1) % routePoints.length]
          : null;
        const etaToNextStop = nextPoint
          ? calculateEtaMinutes(bus.currentLocation, nextPoint, bus.speed)
          : null;
        const nextStop = nextPoint
          ? {
              lat: nextPoint.lat,
              lng: nextPoint.lng,
              stopName: nextPoint.stopName,
            }
          : null;

        return {
          id: bus._id,
          name: bus.name,
          speed: bus.speed,
          status: bus.status,
          delayMinutes: bus.delayMinutes,
          currentPointIndex: bus.currentPointIndex,
          currentLocation: bus.currentLocation,
          route: bus.route,
          etaToNextStop,
          nextStop,
        };
      });

      socket.emit("initialBusState", snapshot);
    } catch (error) {
      console.error("Failed to send socket snapshot:", error.message);
    }

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
