
import {
  FaArrowUp,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";
import ProgressBar from "../components/ProgressBar";

const Progress = ({
  competencies,
  trainingHistory,
}) => {
  return (
    <main className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Home / Progress
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-3">
            Learning Progress
          </h1>

          <p className="text-slate-500 mt-2">
            Track competency development and completed training.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 p-6">
            <FaArrowUp className="text-emerald-600" />

            <p className="text-sm text-slate-500 mt-4">
              Average Current Proficiency
            </p>

            <p className="text-3xl font-bold text-slate-900 mt-1">
              {Math.round(
                competencies.reduce(
                  (sum, item) => sum + item.score,
                  0
                ) / competencies.length
              )}
              %
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6">
            <FaCheckCircle className="text-emerald-600" />

            <p className="text-sm text-slate-500 mt-4">
              Completed Training
            </p>

            <p className="text-3xl font-bold text-slate-900 mt-1">
              {trainingHistory.length}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6">
            <FaHistory className="text-[#D97706]" />

            <p className="text-sm text-slate-500 mt-4">
              Skills Tracked
            </p>

            <p className="text-3xl font-bold text-slate-900 mt-1">
              {competencies.length}
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white border border-slate-200">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">
              Competency Development
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Baseline compared with current proficiency
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {competencies.map((skill) => {
              const improvement = skill.score - skill.baseline;

              return (
                <div key={skill.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {skill.name}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {skill.description}
                      </p>
                    </div>

                    <div className="text-sm">
                      <span className="text-slate-500">
                        Improvement:
                      </span>{" "}
                      <span
                        className={`font-bold ${
                          improvement > 0
                            ? "text-emerald-700"
                            : "text-slate-600"
                        }`}
                      >
                        +{improvement}%
                      </span>
                    </div>
                  </div>

                  <ProgressBar
                    value={skill.score}
                    label={`Current: ${skill.score}%`}
                  />

                  <div className="mt-3 text-xs text-slate-500">
                    Baseline proficiency: {skill.baseline}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 bg-white border border-slate-200">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">
              Training History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Course
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Year
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Score
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {trainingHistory.map((item) => (
                  <tr key={item.course}>
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {item.course}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {item.date}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {item.score}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Progress;