import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import PassengerAuth from "./pages/auth/PassengerAuth";
import DriverAuth from "./pages/auth/DriverAuth";
import PassengerDashboard from "./pages/PassengerDashboard";
import DriverPanel from "./pages/DriverPanel";
import { useAuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ element, role }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-300">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const App = () => {
  const { user, loading } = useAuthContext();

  return (
    <div className="min-h-screen bg-ink bg-mesh-gradient text-slate-100">
      {user && !loading && <Navbar />}
      <main
        className={
          user && !loading
            ? "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
            : "w-full"
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tracker" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/auth/passenger" element={<PassengerAuth />} />
          <Route path="/auth/driver" element={<DriverAuth />} />
          <Route
            path="/passenger-dashboard"
            element={
              <ProtectedRoute
                element={<PassengerDashboard />}
                role="passenger"
              />
            }
          />
          <Route
            path="/driver-panel"
            element={<ProtectedRoute element={<DriverPanel />} role="driver" />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
