import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertCircle,
  MapPin,
  Clock,
  Users,
  Plus,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import MapView from "../components/MapView";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const PassengerDashboard = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthContext();
  const [buses, setBuses] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketData, setTicketData] = useState({
    category: "bus_late",
    message: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuses();
    fetchTickets();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await fetch(`${API_BASE}/buses`);
      const data = await response.json();
      setBuses(data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${API_BASE}/tickets/my-tickets`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleCreateTicket = async () => {
    if (!ticketData.message.trim()) {
      alert("Please enter a message");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        setTicketData({ category: "bus_late", message: "" });
        setShowTicketForm(false);
        fetchTickets();
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">{t("common.loading")}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="brand-font text-3xl font-bold text-slate-50">
            {t("passenger.dashboard.welcome", { name: user?.name })}
          </h1>
          <p className="text-slate-400">{t("passenger.dashboard.subtitle")}</p>
        </div>
        <button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
          className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/30 transition"
        >
          {t("common.logout")}
        </button>
      </div>

      {/* Live Tracker */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 overflow-hidden">
          <h2 className="font-semibold text-slate-100 mb-4">
            {t("passenger.dashboard.tracker")}
          </h2>
          <MapView selectedBusId={selectedBusId} />
        </div>

        <div className="space-y-4">
          <div className="glass-panel p-4">
            <h3 className="font-semibold text-slate-100 mb-3">
              {t("passenger.dashboard.selectBus")}
            </h3>
            <select
              value={selectedBusId || ""}
              onChange={(e) => setSelectedBusId(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-slate-100"
            >
              <option value="">{t("passenger.dashboard.allBuses")}</option>
              {buses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.name} - {bus.busNumber}
                </option>
              ))}
            </select>
          </div>

          {selectedBusId && buses.find((b) => b.id === selectedBusId) && (
            <div className="glass-panel p-4 space-y-3">
              <h3 className="font-semibold text-slate-100">
                {t("passenger.dashboard.busDetails")}
              </h3>
              {(() => {
                const bus = buses.find((b) => b.id === selectedBusId);
                return (
                  <>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <span className="text-slate-400">
                          {t("driver.panel.name")}:
                        </span>
                        <span>{bus.name}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={14} className="text-accent" />
                        <span className="text-slate-400">
                          {t("passenger.dashboard.eta")}:
                        </span>
                        <span className="text-accent font-semibold">
                          {bus.etaToNextStop || "-"} mins
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={14} className="text-accent" />
                        <span className="text-slate-400">
                          {t("passenger.dashboard.nextStop")}:
                        </span>
                        <span>{bus.nextStop?.stopName || "-"}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Users size={14} className="text-accent" />
                        <span className="text-slate-400">
                          {t("driver.panel.currentPassengers")}:
                        </span>
                        <span>
                          {bus.currentPassengers}/{bus.capacity}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            bus.status === "Running"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {bus.status}
                        </span>
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Complaints Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-100 flex items-center gap-2">
                <MessageSquare size={20} className="text-accent" />
                {t("passenger.dashboard.complaints")}
              </h2>
              <button
                onClick={() => setShowTicketForm(!showTicketForm)}
                className="flex items-center gap-2 rounded-full bg-accent/20 px-3 py-2 text-sm text-accent hover:bg-accent/30 transition"
              >
                <Plus size={16} />
                {t("passenger.dashboard.newComplaint")}
              </button>
            </div>

            {showTicketForm && (
              <div className="mb-4 p-4 bg-slate-800/50 rounded-lg space-y-3">
                <select
                  value={ticketData.category}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, category: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-slate-100 text-sm"
                >
                  <option value="bus_late">
                    {t("passenger.dashboard.categories.bus_late")}
                  </option>
                  <option value="overcrowding">
                    {t("passenger.dashboard.categories.overcrowding")}
                  </option>
                  <option value="driver_behavior">
                    {t("passenger.dashboard.categories.driver_behavior")}
                  </option>
                  <option value="skipped_stop">
                    {t("passenger.dashboard.categories.skipped_stop")}
                  </option>
                  <option value="cleanliness">
                    {t("passenger.dashboard.categories.cleanliness")}
                  </option>
                  <option value="lost_item">
                    {t("passenger.dashboard.categories.lost_item")}
                  </option>
                  <option value="wrong_eta">
                    {t("passenger.dashboard.categories.wrong_eta")}
                  </option>
                  <option value="other">
                    {t("passenger.dashboard.categories.other")}
                  </option>
                </select>
                <textarea
                  value={ticketData.message}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, message: e.target.value })
                  }
                  placeholder={t("passenger.dashboard.message")}
                  className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-slate-100 text-sm resize-none"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateTicket}
                    className="flex-1 bg-accent text-slate-950 font-semibold py-2 rounded text-sm hover:bg-accent/90 transition"
                  >
                    {t("passenger.dashboard.submit")}
                  </button>
                  <button
                    onClick={() => setShowTicketForm(false)}
                    className="flex-1 bg-slate-700 text-slate-100 font-semibold py-2 rounded text-sm hover:bg-slate-600 transition"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {tickets.length === 0 ? (
                <p className="text-slate-400 text-sm py-8 text-center">
                  {t("passenger.dashboard.noComplaints")}
                </p>
              ) : (
                tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="bg-slate-800/50 p-3 rounded-lg border border-white/5 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-100 capitalize">
                        {ticket.category.replace("_", " ")}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {ticket.message.substring(0, 60)}...
                      </p>
                    </div>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2 ${
                        ticket.status === "open"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : ticket.status === "in_progress"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="glass-panel p-4 text-center">
            <p className="text-2xl font-bold text-accent">{buses.length}</p>
            <p className="text-xs text-slate-400 mt-1">
              {t("passenger.dashboard.totalBuses")}
            </p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="text-2xl font-bold text-accent">{tickets.length}</p>
            <p className="text-xs text-slate-400 mt-1">
              {t("passenger.dashboard.totalComplaints")}
            </p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              {buses.filter((b) => b.status === "Running").length}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {t("passenger.dashboard.runningBuses")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;
