
import {
  FaChartBar,
  FaClipboardCheck,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";
import ProgressBar from "../components/ProgressBar";
import RecommendationCard from "../components/RecommendationCard";

const Dashboard = ({
  user,
  competencies,
  recommendations,
  onNavigate,
}) => {
  const highGaps = competencies.filter((item) => item.score <= 40);

  const averageScore = Math.round(
    competencies.reduce((sum, item) => sum + item.score, 0) /
      competencies.length
  );

  return (
    <main className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#0F172A] text-white p-7 md:p-9">
          <p className="text-sm text-slate-300">
            Welcome back
          </p>

          <h1 className="text-2xl md:text-3xl font-bold mt-2">
            {user?.name || "Ananya Sharma"}
          </h1>

          <p className="text-slate-300 mt-2">
            {user?.designation || "Government Official"}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("assessment")}
              className="bg-[#D97706] text-white px-5 py-2.5 text-sm font-semibold"
            >
              Update Assessment
            </button>

            <button
              onClick={() => onNavigate("recommendations")}
              className="bg-white/10 border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/20"
            >
              View Learning
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {[
            {
              label: "Competencies Assessed",
              value: competencies.length,
              icon: FaClipboardCheck,
            },
            {
              label: "Average Proficiency",
              value: `${averageScore}%`,
              icon: FaChartBar,
            },
            {
              label: "Priority Skill Gaps",
              value: highGaps.length,
              icon: FaChartBar,
            },
            {
              label: "Learning Recommendations",
              value: recommendations.length,
              icon: FaBookOpen,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="bg-white border border-slate-200 p-5"
              >
                <Icon className="text-[#D97706]" />

                <p className="text-sm text-slate-500 mt-4">
                  {item.label}
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white border border-slate-200">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Competency Overview
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Current proficiency levels
                </p>
              </div>

              <button
                onClick={() => onNavigate("assessment")}
                className="text-sm font-semibold text-[#1E3A8A]"
              >
                Update
              </button>
            </div>

            <div className="p-6 space-y-6">
              {competencies.map((skill) => (
                <ProgressBar
                  key={skill.id}
                  value={skill.score}
                  label={skill.name}
                />
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">
                Priority Gaps
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Skills requiring attention
              </p>
            </div>

            <div className="divide-y divide-slate-200">
              {highGaps.length > 0 ? (
                highGaps.map((skill) => (
                  <div key={skill.id} className="p-5">
                    <div className="flex justify-between gap-3">
                      <span className="font-semibold text-sm text-slate-800">
                        {skill.name}
                      </span>

                      <span className="text-xs font-bold text-red-700">
                        {skill.score}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      Development priority
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-5 text-sm text-slate-500">
                  No high-priority gaps identified.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recommended Learning
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Courses selected according to your competency gaps.
              </p>
            </div>

            <button
              onClick={() => onNavigate("recommendations")}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#1E3A8A]"
            >
              View all
              <FaArrowRight />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {recommendations.slice(0, 2).map((course) => (
              <RecommendationCard
                key={course.id}
                course={course}
                onStart={() => onNavigate("quiz")}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;