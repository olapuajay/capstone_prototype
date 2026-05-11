import { useState, useEffect } from "react";
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

const PassengerDashboard = () => {
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
      const response = await fetch("http://localhost:5000/api/buses");
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
      const response = await fetch(
        "http://localhost:5000/api/tickets/my-tickets",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
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
      const response = await fetch("http://localhost:5000/api/tickets", {
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
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="brand-font text-3xl font-bold text-slate-50">
            Welcome, {user?.name}!
          </h1>
          <p className="text-slate-400">Track buses and manage complaints</p>
        </div>
        <button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
          className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/30 transition"
        >
          Logout
        </button>
      </div>

      {/* Live Tracker */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 overflow-hidden">
          <h2 className="font-semibold text-slate-100 mb-4">
            Live Bus Tracker
          </h2>
          <MapView selectedBusId={selectedBusId} />
        </div>

        <div className="space-y-4">
          <div className="glass-panel p-4">
            <h3 className="font-semibold text-slate-100 mb-3">Select Bus</h3>
            <select
              value={selectedBusId || ""}
              onChange={(e) => setSelectedBusId(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-slate-100"
            >
              <option value="">Choose a bus</option>
              {buses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.name} - {bus.busNumber}
                </option>
              ))}
            </select>
          </div>

          {selectedBusId && buses.find((b) => b.id === selectedBusId) && (
            <div className="glass-panel p-4 space-y-3">
              <h3 className="font-semibold text-slate-100">Bus Details</h3>
              {(() => {
                const bus = buses.find((b) => b.id === selectedBusId);
                return (
                  <>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <span className="text-slate-400">Bus:</span>
                        <span>{bus.name}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={14} className="text-accent" />
                        <span className="text-slate-400">ETA:</span>
                        <span className="text-accent font-semibold">
                          {bus.etaToNextStop || "-"} mins
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={14} className="text-accent" />
                        <span className="text-slate-400">Next Stop:</span>
                        <span>{bus.nextStop?.stopName || "-"}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Users size={14} className="text-accent" />
                        <span className="text-slate-400">Passengers:</span>
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
                My Complaints
              </h2>
              <button
                onClick={() => setShowTicketForm(!showTicketForm)}
                className="flex items-center gap-2 rounded-full bg-accent/20 px-3 py-2 text-sm text-accent hover:bg-accent/30 transition"
              >
                <Plus size={16} />
                New Complaint
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
                  <option value="bus_late">Bus Late</option>
                  <option value="overcrowding">Overcrowding</option>
                  <option value="driver_behavior">Driver Behavior</option>
                  <option value="skipped_stop">Skipped Stop</option>
                  <option value="cleanliness">Cleanliness</option>
                  <option value="lost_item">Lost Item</option>
                  <option value="wrong_eta">Wrong ETA</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  value={ticketData.message}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, message: e.target.value })
                  }
                  placeholder="Describe your issue..."
                  className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-slate-100 text-sm resize-none"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateTicket}
                    className="flex-1 bg-accent text-slate-950 font-semibold py-2 rounded text-sm hover:bg-accent/90 transition"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowTicketForm(false)}
                    className="flex-1 bg-slate-700 text-slate-100 font-semibold py-2 rounded text-sm hover:bg-slate-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {tickets.length === 0 ? (
                <p className="text-slate-400 text-sm py-8 text-center">
                  No complaints yet
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
            <p className="text-xs text-slate-400 mt-1">Total Buses</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="text-2xl font-bold text-accent">{tickets.length}</p>
            <p className="text-xs text-slate-400 mt-1">My Complaints</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              {buses.filter((b) => b.status === "Running").length}
            </p>
            <p className="text-xs text-slate-400 mt-1">Running Buses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;
