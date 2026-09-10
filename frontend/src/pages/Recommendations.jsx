import { useMemo, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import RecommendationCard from "../components/RecommendationCard";

const Recommendations = ({
  recommendations,
  onNavigate,
}) => {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("ALL");

  const filtered = useMemo(() => {
    return recommendations.filter((course) => {
      const matchesSearch =
        course.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        course.skill
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesPriority =
        priority === "ALL" || course.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }, [recommendations, search, priority]);

  return (
    <main className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Home / Learning Catalogue
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-3">
            Recommended Learning
          </h1>

          <p className="text-slate-500 mt-2 max-w-3xl">
            Learning opportunities recommended according to your
            competency profile and identified development needs.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses or competencies"
                className="w-full border border-slate-300 pl-11 pr-4 py-3 outline-none focus:border-[#1E3A8A]"
              />
            </div>

            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-slate-300 pl-11 pr-4 py-3 bg-white outline-none focus:border-[#1E3A8A]"
              >
                <option value="ALL">All Priorities</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-sm text-slate-500">
          Showing {filtered.length} learning opportunities
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <RecommendationCard
              key={course.id}
              course={course}
              onStart={() => onNavigate("quiz")}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white border border-slate-200 p-10 text-center">
            <h3 className="font-semibold text-slate-900">
              No learning opportunities found
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Try changing your search or priority filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Recommendations;