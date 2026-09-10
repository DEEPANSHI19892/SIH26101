import { useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaBook,
  FaEdit,
} from "react-icons/fa";
import Button from "../components/Button";

const Profile = ({ profile, onProfileUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onProfileUpdate(form);
    setEditing(false);
  };

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
                      value={form[field]}
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
                <Button onClick={handleSave}>
                  Save Changes
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setForm(profile);
                    setEditing(false);
                  }}
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
            {profile.previousTraining.map((course) => (
              <div
                key={course}
                className="px-6 py-4 flex items-center gap-3"
              >
                <span className="w-2 h-2 bg-[#D97706]" />
                <span className="text-sm text-slate-700">
                  {course}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;