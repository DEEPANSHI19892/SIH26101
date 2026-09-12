import { useState } from "react";
import {
  FaClipboardCheck,
  FaArrowLeft,
  FaArrowRight,
  FaFilePdf,
  FaMagic,
  FaUpload,
} from "react-icons/fa";
import axios from "axios";
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
  const [file, setFile] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadError("");
    setUploadSuccess("");
  };

  const handleGenerate = async () => {
    if (!file) {
      setUploadError("Please select a PDF file first.");
      return;
    }

    if (!file.name.endsWith(".pdf")) {
      setUploadError("Only PDF files are allowed.");
      return;
    }

    setGenerating(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:8000";
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("skill", "General");

      const response = await axios.post(
        `${API_URL}/api/quiz/generate`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGeneratedQuestions(response.data.questions);
      setUploadSuccess(
        `✅ Successfully generated ${response.data.questions.length} MCQs from PDF!`
      );
    } catch (err) {
      console.error("MCQ generation error:", err);
      if (err.response?.data?.detail) {
        setUploadError(`Error: ${err.response.data.detail}`);
      } else {
        setUploadError("Failed to generate MCQs. Please try again.");
      }
    } finally {
      setGenerating(false);
    }
  };

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

        {/* ================================ */}
        {/* AI MCQ GENERATOR (TRAINER MODE) */}
        {/* ================================ */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-[#1E3A8A] p-6 mb-6 rounded">
          <div className="flex items-center gap-3 mb-4">
            <FaMagic className="text-[#1E3A8A] text-xl" />
            <h2 className="text-lg font-bold text-[#1E3A8A]">
              AI MCQ Generator — Trainer Tool
            </h2>
          </div>

          <p className="text-sm text-slate-600 mb-4">
            Upload training material (PDF) and let AI generate context-aware MCQs instantly.
          </p>

          <div className="flex flex-col md:flex-row gap-3">
            <label className="flex-1 flex items-center gap-3 bg-white border border-slate-300 px-4 py-3 cursor-pointer hover:border-[#1E3A8A]">
              <FaUpload className="text-slate-500" />
              <span className="text-sm text-slate-600 truncate">
                {file ? file.name : "Choose PDF file..."}
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              onClick={handleGenerate}
              disabled={!file || generating}
              className={`
                px-6 py-3 font-semibold text-white flex items-center justify-center gap-2
                ${
                  !file || generating
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-[#1E3A8A] hover:bg-[#152C6B]"
                }
              `}
            >
              <FaFilePdf />
              {generating ? "Generating..." : "Generate MCQs"}
            </button>
          </div>

          {uploadError && (
            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm rounded">
              {uploadError}
            </div>
          )}

          {uploadSuccess && (
            <div className="mt-3 bg-green-50 border border-green-200 text-green-700 px-4 py-2 text-sm rounded">
              {uploadSuccess}
            </div>
          )}

          {generatedQuestions.length > 0 && (
            <div className="mt-5">
              <h3 className="font-bold text-slate-800 mb-3">
                AI-Generated Questions Preview:
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {generatedQuestions.map((q, idx) => (
                  <div
                    key={q.id || idx}
                    className="bg-white border border-slate-200 p-4 rounded"
                  >
                    <p className="font-semibold text-slate-800 mb-2">
                      {idx + 1}. {q.question}
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {q.options.map((opt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-semibold text-[#1E3A8A]">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* ================================ */}
        {/* END AI MCQ GENERATOR */}
        {/* ================================ */}

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