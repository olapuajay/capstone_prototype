import axios from "axios";
import { useMemo, useState } from "react";
import Loader from "../components/Loader";
import { useBusContext } from "../context/BusContext";

const ADMIN_DEFAULT = { username: "admin", password: "admin123" };

const AdminDashboard = () => {
  const { apiBase, buses, routes, loading, refreshData } = useBusContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingRouteId, setEditingRouteId] = useState("");
  const [credentials, setCredentials] = useState(ADMIN_DEFAULT);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    from: "",
    to: "",
    pointsJson:
      '[{"lat":31.1828,"lng":75.7022,"stopName":"Stop A"},{"lat":31.326,"lng":75.5762,"stopName":"Stop B"}]',
  });

  const delayAlerts = useMemo(
    () =>
      buses.filter((bus) => bus.status === "Delayed" && bus.delayMinutes > 0),
    [buses],
  );

  const onLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await axios.post(`${apiBase}/admin/login`, credentials);
      setIsAuthenticated(true);
    } catch {
      setError("Invalid credentials. Use admin / admin123");
    }
  };

  const onSubmitRoute = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const points = JSON.parse(form.pointsJson);

      const payload = {
        name: form.name,
        from: form.from,
        to: form.to,
        points,
      };

      const headers = {
        "x-admin-username": credentials.username,
        "x-admin-password": credentials.password,
      };

      if (editingRouteId) {
        await axios.put(`${apiBase}/routes/${editingRouteId}`, payload, {
          headers,
        });
      } else {
        await axios.post(`${apiBase}/routes`, payload, { headers });
      }

      setEditingRouteId("");
      setForm({
        ...form,
        name: "",
        from: "",
        to: "",
      });
      await refreshData();
    } catch {
      setError("Failed to save route. Ensure points JSON is valid.");
    }
  };

  const startEditRoute = (route) => {
    setEditingRouteId(route._id);
    setForm({
      name: route.name,
      from: route.from,
      to: route.to,
      pointsJson: JSON.stringify(route.points, null, 2),
    });
  };

  const cancelEditRoute = () => {
    setEditingRouteId("");
    setForm({
      name: "",
      from: "",
      to: "",
      pointsJson:
        '[{"lat":31.1828,"lng":75.7022,"stopName":"Stop A"},{"lat":31.326,"lng":75.5762,"stopName":"Stop B"}]',
    });
  };

  if (loading) {
    return <Loader label="Loading admin panel..." />;
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto max-w-md">
        <form
          onSubmit={onLogin}
          className="glass-panel card-enter space-y-3 p-6"
        >
          <h2 className="brand-font text-2xl font-bold text-white">
            Admin Login
          </h2>
          <p className="text-sm text-slate-400">
            Use hardcoded credentials to manage buses and routes.
          </p>
          <input
            value={credentials.username}
            onChange={(event) =>
              setCredentials((prev) => ({
                ...prev,
                username: event.target.value,
              }))
            }
            className="w-full rounded-xl border border-white/15 bg-slate-800 px-3 py-2 text-sm"
            placeholder="Username"
          />
          <input
            type="password"
            value={credentials.password}
            onChange={(event) =>
              setCredentials((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            className="w-full rounded-xl border border-white/15 bg-slate-800 px-3 py-2 text-sm"
            placeholder="Password"
          />
          {error && <p className="text-sm text-warning">{error}</p>}
          <button className="w-full rounded-xl bg-accent px-4 py-2 text-sm font-bold text-slate-950">
            Sign In
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-panel card-enter p-4">
          <h3 className="brand-font text-xl font-semibold">Live Bus Status</h3>
          <div className="mt-3 space-y-2 text-sm">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <div>
                  <p className="font-semibold">{bus.name}</p>
                  <p className="text-xs text-slate-400">{bus.route?.name}</p>
                </div>
                <div className="text-right">
                  <p
                    className={
                      bus.status === "Delayed" ? "text-warning" : "text-accent"
                    }
                  >
                    {bus.status}
                  </p>
                  <p className="text-xs text-slate-400">{bus.speed} km/h</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmitRoute}
          className="glass-panel card-enter space-y-3 p-4"
        >
          <h3 className="brand-font text-xl font-semibold">
            {editingRouteId ? "Edit Route" : "Add Route"}
          </h3>
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            className="w-full rounded-xl border border-white/15 bg-slate-800 px-3 py-2 text-sm"
            placeholder="Route Name"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.from}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, from: event.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-slate-800 px-3 py-2 text-sm"
              placeholder="From"
              required
            />
            <input
              value={form.to}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, to: event.target.value }))
              }
              className="w-full rounded-xl border border-white/15 bg-slate-800 px-3 py-2 text-sm"
              placeholder="To"
              required
            />
          </div>
          <textarea
            rows={5}
            value={form.pointsJson}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, pointsJson: event.target.value }))
            }
            className="w-full rounded-xl border border-white/15 bg-slate-800 px-3 py-2 font-mono text-xs"
            placeholder='[{"lat":31.1,"lng":75.3,"stopName":"A"}, ...]'
            required
          />
          {error && <p className="text-sm text-warning">{error}</p>}
          <div className="flex gap-2">
            <button className="rounded-xl bg-accent px-4 py-2 text-sm font-bold text-slate-950">
              {editingRouteId ? "Update Route" : "Add Route"}
            </button>
            {editingRouteId && (
              <button
                type="button"
                onClick={cancelEditRoute}
                className="rounded-xl border border-white/20 px-4 py-2 text-sm"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="glass-panel card-enter p-4">
        <h3 className="brand-font text-xl font-semibold">Delay Alerts</h3>
        {delayAlerts.length === 0 ? (
          <p className="mt-2 text-sm text-slate-400">
            No active delays right now.
          </p>
        ) : (
          <div className="mt-3 space-y-2 text-sm">
            {delayAlerts.map((bus) => (
              <p
                key={bus.id}
                className="rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-warning"
              >
                {bus.name} is delayed by {bus.delayMinutes} mins on{" "}
                {bus.route?.name}
              </p>
            ))}
          </div>
        )}

        <p className="mt-4 text-xs text-slate-500">
          Hardcoded admin credentials: admin / admin123
        </p>
      </div>

      <div className="glass-panel card-enter p-4">
        <h3 className="brand-font text-xl font-semibold">Configured Routes</h3>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {routes.map((route) => (
            <div
              key={route._id}
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
            >
              <p className="font-semibold">{route.name}</p>
              <p className="text-xs text-slate-400">
                {route.from} to {route.to}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Points: {route.points?.length || 0}
              </p>
              <button
                onClick={() => startEditRoute(route)}
                className="mt-2 rounded-lg border border-accent/40 px-3 py-1 text-xs text-accent"
              >
                Edit Route
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
