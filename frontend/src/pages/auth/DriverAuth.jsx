import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

const DriverAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/driver/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }

      login(data.user, data.token);
      navigate("/driver-panel");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="glass-panel w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="brand-font text-3xl font-bold text-slate-50">
            SmartBus Tracker
          </h1>
          <p className="text-sm text-slate-400">Driver Login</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="driver@example.com"
                className="w-full bg-slate-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-800/50 border border-white/10 rounded-lg pl-10 pr-12 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-accent"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent/90 text-slate-950 font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center">
          <Link to="/" className="text-accent hover:text-accent/80 text-sm">
            Back to home
          </Link>
        </div>

        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
          <p className="text-sm text-blue-300">
            <strong>Demo Credentials:</strong>
            <br />
            Email: driver@smartbus.com
            <br />
            Password: driver123
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverAuth;
