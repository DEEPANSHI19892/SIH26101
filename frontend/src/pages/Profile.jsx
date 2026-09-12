import { useState, useEffect } from "react";
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaBook,
  FaEdit,
} from "react-icons/fa";
import axios from "axios";
import Button from "../components/Button";

const Profile = ({ profile: initialProfileProp, onProfileUpdate }) => {
  const [profile, setProfile] = useState(initialProfileProp);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initialProfileProp);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // ✅ Fetch profile from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const API_URL =
          import.meta.env.VITE_API_URL || "http://localhost:8000";
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
        setForm(response.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile. Showing cached data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:8000";
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/api/profile`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(response.data);
      setForm(response.data);
      onProfileUpdate(response.data);
      setEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <p className="text-slate-500">Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Home / Profile
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Employee Profile
              </h1>
              <p className="text-slate-500 mt-2">
                View and manage your professional information.
              </p>
            </div>

            {!editing && (
              <Button onClick={() => setEditing(true)} variant="secondary">
                <FaEdit className="mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200">
          <div className="bg-[#0F172A] text-white px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 border border-white/20 flex items-center justify-center text-xl">
                <FaUser />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  {profile.name}
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  {profile.designation}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-bold text-slate-900 mb-5">
              Official Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                ["name", "Full Name"],
                ["designation", "Designation"],
                ["department", "Department"],
                ["jobRole", "Job Role"],
                ["experience", "Experience"],
                ["education", "Educational Qualification"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                    {label}
                  </label>

                  {editing ? (
                    <input
                      value={form[field] || ""}
                      onChange={(e) =>
                        handleChange(field, e.target.value)
                      }
                      className="w-full border border-slate-300 px-3 py-2.5 outline-none focus:border-[#1E3A8A]"
                    />
                  ) : (
                    <div className="border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800">
                      {profile[field]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {editing && (
              <div className="mt-6 flex gap-3">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setForm(profile);
                    setEditing(false);
                  }}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white border border-slate-200">
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <FaBook className="text-[#D97706]" />
              <h2 className="font-bold text-slate-900">
                Previous Training
              </h2>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {profile.previousTraining?.length > 0 ? (
              profile.previousTraining.map((course) => (
                <div
                  key={course}
                  className="px-6 py-4 flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-[#D97706]" />
                  <span className="text-sm text-slate-700">
                    {course}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-sm text-slate-500">
                No previous training records.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;