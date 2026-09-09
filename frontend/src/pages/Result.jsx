
import {
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
} from "react-icons/fa";
import Button from "../components/Button";

const Result = ({ result, onNavigate }) => {
  if (!result) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            No assessment result available
          </h1>

          <p className="text-slate-500 mt-2">
            Complete the assessment to view your result.
          </p>

          <div className="mt-6">
            <Button onClick={() => onNavigate("quiz")}>
              Start Assessment
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Home / Assessment / Result
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-3">
            Assessment Result
          </h1>

          <p className="text-slate-500 mt-2">
            Summary of your competency knowledge assessment.
          </p>
        </div>

        <div className="bg-white border border-slate-200">
          <div className="bg-[#0F172A] text-white p-8 text-center">
            <p className="text-sm text-slate-300">
              Overall Assessment Score
            </p>

            <div className="text-5xl font-bold mt-3">
              {result.percentage}%
            </div>

            <p className="text-slate-300 mt-3">
              {result.correct} correct out of {result.total}
            </p>
          </div>

          <div className="grid md:grid-cols-3 border-b border-slate-200">
            <div className="p-6 text-center border-b md:border-b-0 md:border-r border-slate-200">
              <p className="text-sm text-slate-500">
                Correct
              </p>

              <p className="text-2xl font-bold text-emerald-700 mt-1">
                {result.correct}
              </p>
            </div>

            <div className="p-6 text-center border-b md:border-b-0 md:border-r border-slate-200">
              <p className="text-sm text-slate-500">
                Incorrect
              </p>

              <p className="text-2xl font-bold text-red-700 mt-1">
                {result.incorrect}
              </p>
            </div>

            <div className="p-6 text-center">
              <p className="text-sm text-slate-500">
                Questions
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {result.total}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white border border-slate-200">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">
              Competency-wise Result
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {result.details?.map((item) => (
              <div
                key={item.id}
                className="p-5 flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.skill}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {item.question}
                  </p>
                </div>

                {item.correct ? (
                  <FaCheckCircle className="text-emerald-600 text-xl shrink-0" />
                ) : (
                  <FaTimesCircle className="text-red-600 text-xl shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {result.weakSkills?.length > 0 && (
          <div className="mt-6 bg-red-50 border border-red-200 p-6">
            <h2 className="font-bold text-red-900">
              Areas Requiring Attention
            </h2>

            <div className="flex flex-wrap gap-2 mt-4">
              {result.weakSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white border border-red-200 text-sm text-red-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => onNavigate("recommendations")}>
            View Recommended Learning
            <FaArrowRight className="ml-2" />
          </Button>

          <Button
            variant="secondary"
            onClick={() => onNavigate("dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Result;