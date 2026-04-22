import { Link, useLocation } from "react-router-dom";

const linkClass = (active) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    active
      ? "bg-accent text-slate-950"
      : "bg-white/5 text-slate-200 hover:bg-white/15"
  }`;

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="brand-font text-xl font-bold tracking-wide text-accent">
            Punjab Transit Pulse
          </p>
          <p className="text-xs text-slate-400">
            Simulation-Based IoT Bus Tracking
          </p>
        </div>

        <nav className="flex gap-2">
          <Link to="/" className={linkClass(location.pathname === "/")}>
            Live Tracker
          </Link>
          <Link
            to="/admin"
            className={linkClass(location.pathname === "/admin")}
          >
            Admin Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
