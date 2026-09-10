
import { FaChartLine } from "react-icons/fa";
import ProgressBar from "./ProgressBar";

const SkillCard = ({ skill }) => {
  const levelStyles = {
    Beginner: "bg-red-50 text-red-800 border-red-200",
    Intermediate: "bg-amber-50 text-amber-800 border-amber-200",
    Advanced: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  return (
    <div className="bg-white border border-slate-200">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center text-[#1E3A8A]">
              <FaChartLine />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                {skill.name}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {skill.description}
              </p>
            </div>
          </div>

          <span
            className={`px-2.5 py-1 text-xs font-semibold border ${
              levelStyles[skill.level]
            }`}
          >
            {skill.level}
          </span>
        </div>

        <ProgressBar value={skill.score} label="Current proficiency" />
      </div>
    </div>
  );
};

export default SkillCard;