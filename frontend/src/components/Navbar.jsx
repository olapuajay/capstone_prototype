import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

const linkClass = (active) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    active
      ? "bg-accent text-slate-950"
      : "bg-white/5 text-slate-200 hover:bg-white/15"
  }`;

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="hover:opacity-80 transition">
          <p className="brand-font text-xl font-bold tracking-wide text-accent">
            SmartBus Tracker
          </p>
          <p className="text-xs text-slate-400">
            {user
              ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel`
              : "Simulation-Based IoT Bus Tracking"}
          </p>
        </Link>

        <nav className="flex gap-2 items-center">
          <LanguageSwitcher />
          {!user ? (
            <>
              <Link to="/" className={linkClass(location.pathname === "/")}>
                {t("nav.home")}
              </Link>
              <Link
                to="/tracker"
                className={linkClass(location.pathname === "/tracker")}
              >
                {t("nav.tracker")}
              </Link>
              <Link
                to="/auth/passenger"
                className={linkClass(location.pathname === "/auth/passenger")}
              >
                {t("nav.passengerLogin")}
              </Link>
              <Link
                to="/auth/driver"
                className={linkClass(location.pathname === "/auth/driver")}
              >
                {t("nav.driverLogin")}
              </Link>
              <Link
                to="/admin"
                className={linkClass(location.pathname === "/admin")}
              >
                {t("nav.adminLogin")}
              </Link>
            </>
          ) : user.role === "passenger" ? (
            <>
              <Link
                to="/passenger-dashboard"
                className={linkClass(
                  location.pathname === "/passenger-dashboard",
                )}
              >
                {t("nav.dashboard")}
              </Link>
              <Link
                to="/tracker"
                className={linkClass(location.pathname === "/tracker")}
              >
                {t("nav.tracker")}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition"
              >
                {t("common.logout")}
              </button>
            </>
          ) : user.role === "driver" ? (
            <>
              <Link
                to="/driver-panel"
                className={linkClass(location.pathname === "/driver-panel")}
              >
                {t("nav.panel")}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition"
              >
                {t("common.logout")}
              </button>
            </>
          ) : user.role === "admin" ? (
            <>
              <Link
                to="/admin"
                className={linkClass(location.pathname === "/admin")}
              >
                {t("nav.dashboard")}
              </Link>
              <Link
                to="/tracker"
                className={linkClass(location.pathname === "/tracker")}
              >
                {t("nav.tracker")}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition"
              >
                {t("common.logout")}
              </button>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
