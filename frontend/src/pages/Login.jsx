import { useState } from "react";
import {
  FaLock,
  FaUser,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";
import Button from "../components/Button";

const Login = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      // ✅ Store token and user in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // ✅ Trigger App.jsx login handler
      onLogin({
        email: response.data.user.email,
        password: "",
      });
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Login failed. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] bg-[#F8FAFC] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#1E3A8A] mb-8"
        >
          <FaArrowLeft />
          Back to Home
        </button>

        <div className="grid lg:grid-cols-2 bg-white border border-slate-200">
          <div className="hidden lg:flex bg-[#0F172A] text-white p-12 flex-col justify-between">
            <div>
              <p className="text-sm text-slate-300 uppercase tracking-wider">
                Government Learning Platform
              </p>

              <h1 className="text-3xl font-bold mt-5 leading-tight">
                Competency & Skill Intelligence Platform
              </h1>

              <p className="mt-6 text-slate-300 leading-7">
                Assess your competencies, identify skill gaps and access
                personalised learning recommendations.
              </p>
            </div>

            <div className="border-t border-slate-700 pt-6">
              <div className="flex gap-3 items-start">
                <FaShieldAlt className="mt-1 text-[#F59E0B]" />
                <div>
                  <p className="font-semibold">Secure Access</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Access is intended for authorised users of the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-7 md:p-12">
            <div className="mb-8">
              <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-[#1E3A8A]">
                <FaUser />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-5">
                Sign in
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Enter your registered credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Official Email / User ID
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full border border-slate-300 pl-11 pr-4 py-3 outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              {/* ✅ Error message display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-[#1E3A8A] font-semibold"
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 leading-5">
                Demo credentials: <strong>officer@mospi.gov.in</strong> / <strong>demo123</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;