import BusSelector from "../components/BusSelector";
import Loader from "../components/Loader";
import MapView from "../components/MapView";
import { useBusContext } from "../context/BusContext";

const StatCard = ({ title, value, tone = "default" }) => {
  const toneClass =
    tone === "good"
      ? "text-accent"
      : tone === "warn"
        ? "text-warning"
        : "text-slate-100";

  return (
    <div className="glass-panel card-enter p-4">
      <p className="text-xs uppercase tracking-wider text-slate-400">{title}</p>
      <p className={`mt-2 text-2xl font-bold ${toneClass}`}>{value}</p>
    </div>
  );
};

const Home = () => {
  const {
    buses,
    analytics,
    loading,
    selectedBus,
    selectedBusId,
    setSelectedBusId,
  } = useBusContext();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard title="Total Buses" value={analytics.total} />
        <StatCard title="Running" value={analytics.running} tone="good" />
        <StatCard title="Delayed" value={analytics.delayed} tone="warn" />
        <StatCard title="Average Speed" value={`${analytics.avgSpeed} km/h`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          <BusSelector
            buses={buses}
            selectedBusId={selectedBusId}
            onChange={setSelectedBusId}
          />

          <div className="glass-panel card-enter p-4">
            <p className="text-sm font-semibold text-slate-200">Live ETA</p>
            {selectedBus ? (
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p>
                  <span className="text-slate-400">Bus:</span>{" "}
                  {selectedBus.name}
                </p>
                <p>
                  <span className="text-slate-400">Route:</span>{" "}
                  {selectedBus.route?.name}
                </p>
                <p>
                  <span className="text-slate-400">Next Stop:</span>{" "}
                  {selectedBus.nextStop?.stopName || "N/A"}
                </p>
                <p>
                  <span className="text-slate-400">ETA:</span>{" "}
                  {selectedBus.etaToNextStop || "-"} mins
                </p>
                <p>
                  <span className="text-slate-400">Status:</span>{" "}
                  {selectedBus.status}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-400">
                Select one bus to view route-focused ETA details.
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-8">
          <MapView buses={buses} selectedBusId={selectedBusId} />
        </div>
      </div>
    </section>
  );
};

export default Home;
