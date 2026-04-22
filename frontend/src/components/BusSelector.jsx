const BusSelector = ({ buses, selectedBusId, onChange }) => {
  return (
    <div className="glass-panel card-enter p-4">
      <label
        htmlFor="bus-selector"
        className="mb-2 block text-sm font-semibold text-slate-300"
      >
        Select a Bus
      </label>
      <select
        id="bus-selector"
        value={selectedBusId}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/15 bg-slate-800 px-3 py-2 text-sm text-white outline-none ring-accent transition focus:ring-2"
      >
        <option value="ALL">All Buses</option>
        {buses.map((bus) => (
          <option key={bus.id} value={bus.id}>
            {bus.name} - {bus.route?.name || "Unassigned route"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BusSelector;
