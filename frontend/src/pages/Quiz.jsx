import { useState } from "react";
import {
  FaClipboardCheck,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import Button from "../components/Button";
import QuizQuestion from "../components/QuizQuestion";

const Quiz = ({
  questions,
  answers,
  onAnswer,
  onSubmit,
  onNavigate,
}) => {
  const [current, setCurrent] = useState(0);

  const question = questions[current];
  const answered = answers[question.id];

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-7">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Home / Assessment / Quiz
          </p>

          <div className="flex items-center gap-3 mt-3">
            <FaClipboardCheck className="text-[#D97706]" />

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Competency Knowledge Assessment
            </h1>
          </div>

          <p className="text-sm text-slate-500 mt-2">
            Answer the following questions to evaluate your current
            knowledge level.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 mb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-700">
              Question {current + 1} of {questions.length}
            </span>

            <span className="text-slate-500">
              {Math.round(
                ((current + 1) / questions.length) * 100
              )}
              %
            </span>
          </div>

          <div className="mt-3 h-2 bg-slate-200">
            <div
              className="h-full bg-[#1E3A8A] transition-all"
              style={{
                width: `${
                  ((current + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <QuizQuestion
          question={question}
          selectedAnswer={answered}
          onSelect={(answer) =>
            onAnswer(question.id, answer)
          }
        />

        <div className="flex items-center justify-between mt-5">
          <Button
            variant="secondary"
            disabled={current === 0}
            onClick={() =>
              setCurrent((prev) => prev - 1)
            }
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </Button>

          {current < questions.length - 1 ? (
            <Button
              disabled={!answered}
              onClick={() =>
                setCurrent((prev) => prev + 1)
              }
            >
              Next
              <FaArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button
              variant="saffron"
              disabled={!answered}
              onClick={handleSubmit}
            >
              Submit Assessment
            </Button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {questions.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrent(index)}
              className={`
                w-9 h-9 border text-xs font-semibold
                ${
                  index === current
                    ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                    : answers[item.id]
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-white text-slate-600 border-slate-300"
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Quiz;