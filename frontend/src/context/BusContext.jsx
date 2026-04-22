import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { socket } from "../services/socket";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const BusContext = createContext(null);

export const BusProvider = ({ children }) => {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState("ALL");
  const [analytics, setAnalytics] = useState({
    total: 0,
    running: 0,
    delayed: 0,
    avgSpeed: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchInitialData = async () => {
    setLoading(true);

    try {
      const [busRes, routeRes, analyticsRes] = await Promise.all([
        axios.get(`${API_BASE}/buses`),
        axios.get(`${API_BASE}/routes`),
        axios.get(`${API_BASE}/buses/analytics/summary`),
      ]);

      setBuses(busRes.data);
      setRoutes(routeRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error("Failed to load initial data", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();

    socket.connect();

    socket.on("initialBusState", (snapshot) => {
      setBuses(snapshot);
    });

    socket.on("busLocationUpdate", (update) => {
      setBuses((prev) =>
        prev.map((bus) =>
          String(bus.id) === String(update.id)
            ? {
                ...bus,
                ...update,
                route: update.route || bus.route,
              }
            : bus,
        ),
      );
    });

    return () => {
      socket.off("initialBusState");
      socket.off("busLocationUpdate");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const total = buses.length;
    const running = buses.filter((bus) => bus.status === "Running").length;
    const delayed = buses.filter((bus) => bus.status === "Delayed").length;
    const avgSpeed = total
      ? Math.round(
          buses.reduce((sum, bus) => sum + (bus.speed || 0), 0) / total,
        )
      : 0;

    setAnalytics({ total, running, delayed, avgSpeed });
  }, [buses]);

  const selectedBus = useMemo(
    () => buses.find((bus) => String(bus.id) === String(selectedBusId)) || null,
    [buses, selectedBusId],
  );

  const value = {
    apiBase: API_BASE,
    buses,
    routes,
    analytics,
    loading,
    selectedBus,
    selectedBusId,
    setSelectedBusId,
    refreshData: fetchInitialData,
  };

  return <BusContext.Provider value={value}>{children}</BusContext.Provider>;
};

export const useBusContext = () => {
  const context = useContext(BusContext);

  if (!context) {
    throw new Error("useBusContext must be used inside BusProvider");
  }

  return context;
};
