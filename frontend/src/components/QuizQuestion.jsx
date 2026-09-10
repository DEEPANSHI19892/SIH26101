

const QuizQuestion = ({
  question,
  selectedAnswer,
  onSelect,
}) => {
  return (
    <div className="bg-white border border-slate-200">
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <span className="text-xs font-bold text-[#D97706] uppercase tracking-wide">
            Competency: {question.skill}
          </span>

          <h2 className="text-xl font-semibold text-slate-900 mt-3 leading-8">
            {question.question}
          </h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const selected = selectedAnswer === option;

            return (
              <button
                key={option}
                onClick={() => onSelect(option)}
                className={`
                  w-full text-left p-4 border transition-colors
                  ${
                    selected
                      ? "border-[#1E3A8A] bg-blue-50"
                      : "border-slate-200 hover:border-slate-400 bg-white"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      w-8 h-8 shrink-0 border flex items-center justify-center
                      text-sm font-semibold
                      ${
                        selected
                          ? "border-[#1E3A8A] bg-[#1E3A8A] text-white"
                          : "border-slate-300 text-slate-600"
                      }
                    `}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>

                  <span
                    className={`text-sm ${
                      selected
                        ? "font-semibold text-slate-900"
                        : "text-slate-700"
                    }`}
                  >
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;