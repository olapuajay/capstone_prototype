import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Truck, AlertCircle, Send } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const DriverPanel = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthContext();
  const [assignedBus, setAssignedBus] = useState(null);
  const [busStatus, setBusStatus] = useState("Running");
  const [delayReason, setDelayReason] = useState("none");
  const [delayMinutes, setDelayMinutes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAssignedBus();
  }, []);

  const fetchAssignedBus = async () => {
    try {
      if (user?.busAssigned) {
        const response = await fetch(
          `http://localhost:5000/api/buses/${user.busAssigned}`,
        );
        const data = await response.json();
        setAssignedBus(data);
        setBusStatus(data.status);
        setDelayReason(data.delayReason || "none");
        setDelayMinutes(data.delayMinutes || 0);
      }
    } catch (error) {
      console.error("Error fetching bus:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/buses/${assignedBus.id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status: busStatus,
            delayReason,
            delayMinutes: parseInt(delayMinutes),
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setAssignedBus(data.bus);
        setMessage("Status updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("Failed to update status");
    }
  };

  if (loading) {
    return <div className="text-center py-12">{t("common.loading")}</div>;
  }

  if (!assignedBus) {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center space-y-4">
        <AlertCircle size={48} className="mx-auto text-yellow-400" />
        <h2 className="font-semibold text-slate-100">
          {t("driver.panel.noBusAssigned")}
        </h2>
        <p className="text-slate-400">{t("driver.panel.contactAdmin")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="brand-font text-3xl font-bold text-slate-50">
            {t("driver.panel.welcome", { name: user?.name })}
          </h1>
          <p className="text-slate-400">{t("driver.panel.subtitle")}</p>
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bus Information */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-slate-100 flex items-center gap-2">
            <Truck className="text-accent" />
            {t("driver.panel.assignedBus")}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">
                {t("driver.panel.number")}
              </p>
              <p className="text-lg font-bold text-accent">
                {assignedBus.busNumber}
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">
                {t("driver.panel.name")}
              </p>
              <p className="text-lg font-bold text-slate-100">
                {assignedBus.name}
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">
                {t("driver.panel.route")}
              </p>
              <p className="text-lg font-bold text-slate-100">
                {assignedBus.route.name}
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">
                {t("driver.panel.speed")}
              </p>
              <p className="text-lg font-bold text-accent">
                {assignedBus.speed} km/h
              </p>
            </div>
          </div>

          {message && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
              <p className="text-sm text-green-300">{message}</p>
            </div>
          )}

          {/* Status Update Form */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="font-semibold text-slate-100">
              {t("driver.panel.statusUpdate")}
            </h3>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                {t("driver.panel.newStatus")}
              </label>
              <select
                value={busStatus}
                onChange={(e) => setBusStatus(e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2.5 text-slate-100"
              >
                <option value="Running">
                  {t("driver.panel.statuses.Running")}
                </option>
                <option value="Delayed">
                  {t("driver.panel.statuses.Delayed")}
                </option>
                <option value="Heavy Traffic">
                  {t("driver.panel.statuses.Heavy Traffic")}
                </option>
                <option value="Breakdown">
                  {t("driver.panel.statuses.Breakdown")}
                </option>
                <option value="Inactive">
                  {t("driver.panel.statuses.Inactive")}
                </option>
              </select>
            </div>

            {busStatus !== "Running" && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    {t("driver.panel.delayReason")}
                  </label>
                  <select
                    value={delayReason}
                    onChange={(e) => setDelayReason(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2.5 text-slate-100"
                  >
                    <option value="none">
                      {t("driver.panel.reasons.none")}
                    </option>
                    <option value="traffic">
                      {t("driver.panel.reasons.traffic")}
                    </option>
                    <option value="road_construction">
                      {t("driver.panel.reasons.road_construction")}
                    </option>
                    <option value="weather">
                      {t("driver.panel.reasons.weather")}
                    </option>
                    <option value="mechanical">
                      {t("driver.panel.reasons.mechanical")}
                    </option>
                    <option value="crowd">
                      {t("driver.panel.reasons.crowd")}
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    {t("driver.panel.delayMinutes")}
                  </label>
                  <input
                    type="number"
                    value={delayMinutes}
                    onChange={(e) => setDelayMinutes(e.target.value)}
                    min="0"
                    max="120"
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2.5 text-slate-100"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleStatusUpdate}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-slate-950 font-semibold py-2.5 rounded-lg transition"
            >
              <Send size={18} />
              {t("driver.panel.updateBtn")}
            </button>
          </div>
        </div>

        {/* Status Summary */}
        <div className="space-y-4">
          <div
            className={`glass-panel p-6 text-center rounded-lg border ${
              assignedBus.status === "Running"
                ? "border-green-500/30"
                : "border-red-500/30"
            }`}
          >
            <p className="text-xs text-slate-400 mb-2">
              {t("driver.panel.currentStatus")}
            </p>
            <p
              className={`text-2xl font-bold ${
                assignedBus.status === "Running"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {t(`driver.panel.statuses.${assignedBus.status}`)}
            </p>
          </div>

          <div className="glass-panel p-4 rounded-lg">
            <p className="text-xs text-slate-400 mb-2">
              {t("driver.panel.currentPassengers")}
            </p>
            <p className="text-2xl font-bold text-accent">
              {assignedBus.currentPassengers}/{assignedBus.capacity}
            </p>
            <div className="mt-3 bg-slate-800/50 rounded-full h-2">
              <div
                className="bg-accent h-full rounded-full transition-all"
                style={{
                  width: `${(assignedBus.currentPassengers / assignedBus.capacity) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {assignedBus.delayMinutes > 0 && (
            <div className="glass-panel p-4 rounded-lg border border-yellow-500/30">
              <p className="text-xs text-slate-400 mb-2">
                {t("driver.panel.delay")}
              </p>
              <p className="text-sm text-yellow-300">
                <strong>
                  {assignedBus.delayMinutes} {t("driver.panel.delayMinutes")}
                </strong>
              </p>
              <p className="text-xs text-slate-400 mt-1 capitalize">
                {t(`driver.panel.reasons.${assignedBus.delayReason}`)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverPanel;
