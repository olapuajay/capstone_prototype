const Loader = ({ label = "Loading live data..." }) => {
  return (
    <div className="glass-panel flex min-h-40 flex-col items-center justify-center gap-3 p-6">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-500 border-t-accent" />
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  );
};

export default Loader;
