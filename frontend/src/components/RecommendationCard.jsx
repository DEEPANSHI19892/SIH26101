
import {
  FaBookOpen,
  FaClock,
  FaLaptop,
  FaArrowRight,
} from "react-icons/fa";

const RecommendationCard = ({ course, onStart }) => {
  const priorityStyles = {
    HIGH: "bg-red-50 text-red-800 border-red-200",
    MEDIUM: "bg-amber-50 text-amber-800 border-amber-200",
    LOW: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  return (
    <div className="bg-white border border-slate-200">
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span
            className={`px-2.5 py-1 text-xs font-bold border ${
              priorityStyles[course.priority]
            }`}
          >
            {course.priority} PRIORITY
          </span>

          <span className="text-xs text-slate-500">
            {course.source}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          {course.title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-6">
          {course.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <FaClock className="text-[#D97706]" />
            {course.duration}
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <FaLaptop className="text-[#D97706]" />
            {course.mode}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FaBookOpen />
            <span>Skill: {course.skill}</span>
          </div>

          <button
            onClick={() => onStart?.(course)}
            className="text-sm font-semibold text-[#1E3A8A] hover:text-[#D97706] flex items-center gap-2"
          >
            Start Learning
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;