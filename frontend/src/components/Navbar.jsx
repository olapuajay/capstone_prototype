import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const closeMenu = () => setMenuOpen(false);

  // Reusable desktop/mobile link components (keeps things DRY without re‑rendering logic)
  const navLinks = (
    <>
      <LanguageSwitcher />
      {!user ? (
        <>
          <Link to="/" className={linkClass(location.pathname === "/")} onClick={closeMenu}>
            {t("nav.home")}
          </Link>
          <Link to="/tracker" className={linkClass(location.pathname === "/tracker")} onClick={closeMenu}>
            {t("nav.tracker")}
          </Link>
          <Link to="/auth/passenger" className={linkClass(location.pathname === "/auth/passenger")} onClick={closeMenu}>
            {t("nav.passengerLogin")}
          </Link>
          <Link to="/auth/driver" className={linkClass(location.pathname === "/auth/driver")} onClick={closeMenu}>
            {t("nav.driverLogin")}
          </Link>
          <Link to="/admin" className={linkClass(location.pathname === "/admin")} onClick={closeMenu}>
            {t("nav.adminLogin")}
          </Link>
        </>
      ) : user.role === "passenger" ? (
        <>
          <Link to="/passenger-dashboard" className={linkClass(location.pathname === "/passenger-dashboard")} onClick={closeMenu}>
            {t("nav.dashboard")}
          </Link>
          <Link to="/tracker" className={linkClass(location.pathname === "/tracker")} onClick={closeMenu}>
            {t("nav.tracker")}
          </Link>
          <button
            onClick={() => { handleLogout(); closeMenu(); }}
            className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition"
          >
            {t("common.logout")}
          </button>
        </>
      ) : user.role === "driver" ? (
        <>
          <Link to="/driver-panel" className={linkClass(location.pathname === "/driver-panel")} onClick={closeMenu}>
            {t("nav.panel")}
          </Link>
          <button
            onClick={() => { handleLogout(); closeMenu(); }}
            className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition"
          >
            {t("common.logout")}
          </button>
        </>
      ) : user.role === "admin" ? (
        <>
          <Link to="/admin" className={linkClass(location.pathname === "/admin")} onClick={closeMenu}>
            {t("nav.dashboard")}
          </Link>
          <Link to="/tracker" className={linkClass(location.pathname === "/tracker")} onClick={closeMenu}>
            {t("nav.tracker")}
          </Link>
          <button
            onClick={() => { handleLogout(); closeMenu(); }}
            className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition"
          >
            {t("common.logout")}
          </button>
        </>
      ) : null}
    </>
  );

  return (
    <header className="top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur relative">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="hover:opacity-80 transition" onClick={closeMenu}>
          <p className="brand-font text-xl font-bold tracking-wide text-accent">
            SmartBus Tracker
          </p>
          <p className="text-xs text-slate-400">
            {user
              ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel`
              : "Simulation-Based IoT Bus Tracking"}
          </p>
        </Link>

        {/* Desktop navigation (hidden on small screens) */}
        <nav className="hidden md:flex gap-2 items-center">
          {navLinks}
        </nav>

        {/* Hamburger button (visible on small screens) */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            // X icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu dropdown (visible when open) */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur border-b border-white/10 z-20 p-4 flex flex-col gap-2">
          {navLinks}
        </div>
      )}
    </header>
  );
};

export default Navbar;