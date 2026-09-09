import { useState } from "react";
import {
  FaClipboardCheck,
  FaInfoCircle,
} from "react-icons/fa";
import Button from "../components/Button";
import { proficiencyLevels } from "../data/data";

const Assessment = ({
  competencies,
  onUpdateCompetency,
  onNavigate,
}) => {
  const [selected, setSelected] = useState(
    Object.fromEntries(
      competencies.map((skill) => [skill.id, skill.level])
    )
  );

  const handleChange = (id, level) => {
    setSelected((prev) => ({
      ...prev,
      [id]: level,
    }));

    onUpdateCompetency(id, level);
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Home / Assessment
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-3">
            Competency Assessment
          </h1>

          <p className="text-slate-500 mt-2 max-w-3xl">
            Assess your current proficiency across key competencies.
            The results are used to identify development areas and
            generate learning recommendations.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 mb-6 flex gap-4">
          <FaInfoCircle className="text-[#1E3A8A] mt-1" />

          <div>
            <h3 className="font-semibold text-slate-900">
              Assessment Instructions
            </h3>

            <p className="text-sm text-slate-600 mt-1 leading-6">
              Select the proficiency level that best represents your
              current capability. You may update your selection before
              proceeding.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200">
          <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3">
            <FaClipboardCheck className="text-[#D97706]" />

            <div>
              <h2 className="font-bold text-slate-900">
                Competency Assessment
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {competencies.length} competencies
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {competencies.map((skill, index) => (
              <div key={skill.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 border border-slate-300 flex items-center justify-center text-sm font-semibold text-slate-600">
                      {index + 1}
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

                  <div className="flex flex-wrap gap-2">
                    {Object.keys(proficiencyLevels).map((level) => (
                      <button
                        key={level}
                        onClick={() =>
                          handleChange(skill.id, level)
                        }
                        className={`
                          px-4 py-2 border text-sm font-medium
                          ${
                            selected[skill.id] === level
                              ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                              : "bg-white text-slate-700 border-slate-300 hover:border-[#1E3A8A]"
                          }
                        `}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 border-t border-slate-200 bg-slate-50 flex justify-end">
            <Button onClick={() => onNavigate("dashboard")}>
              Save Assessment
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Assessment;