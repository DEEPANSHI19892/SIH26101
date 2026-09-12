import { useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Progress from "./pages/Progress";

import {
  initialProfile,
  initialCompetencies,
  recommendations,
  quizQuestions as fallbackQuizQuestions,
  trainingHistory,
  proficiencyLevels,
} from "./data/data";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // ✅ Read login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("token") ? true : false;
  });

  // ✅ Read user from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [profile, setProfile] = useState(initialProfile);
  const [competencies, setCompetencies] = useState(initialCompetencies);

  // ✅ Quiz state now uses backend
  const [quizQuestions, setQuizQuestions] = useState(fallbackQuizQuestions);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  // --------------------------------
  // NAVIGATION
  // --------------------------------
  const navigate = async (page) => {
    const homeSections = ["about", "how-it-works", "features"];

    if (homeSections.includes(page)) {
      setCurrentPage("home");
      setTimeout(() => {
        const element = document.getElementById(page);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return;
    }

    // ✅ When navigating to quiz, fetch questions from backend
    if (page === "quiz") {
      await fetchQuizFromBackend();
    }

    setCurrentPage(page);
  };

  // --------------------------------
  // FETCH QUIZ FROM BACKEND
  // --------------------------------
  const fetchQuizFromBackend = async () => {
    try {
      setQuizLoading(true);
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:8000";

      const response = await axios.get(`${API_URL}/api/quiz`);

      if (
        response.data.questions &&
        response.data.questions.length > 0
      ) {
        // Format backend questions to match frontend structure
        const formatted = response.data.questions.map((q) => ({
          id: q.id,
          skill: q.skill || "General",
          question: q.question,
          options: q.options,
          // ✅ No `answer` field — that stays on backend
        }));

        setQuizQuestions(formatted);
        setQuizAnswers({}); // Reset answers
      }
    } catch (err) {
      console.warn(
        "Backend quiz fetch failed, using fallback questions:",
        err.message
      );
      // Keep using fallback questions from data.js
    } finally {
      setQuizLoading(false);
    }
  };

  // --------------------------------
  // LOGIN
  // --------------------------------
  const handleLogin = (loginData) => {
    const storedUser = localStorage.getItem("user");
    const userData = storedUser
      ? JSON.parse(storedUser)
      : {
          name: profile.name,
          designation: profile.designation,
          department: profile.department,
          email: loginData.email,
        };

    setUser(userData);
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  // --------------------------------
  // LOGOUT
  // --------------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage("home");
  };

  // --------------------------------
  // PROFILE UPDATE
  // --------------------------------
  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);

    setUser((prev) =>
      prev
        ? {
            ...prev,
            name: updatedProfile.name,
            designation: updatedProfile.designation,
            department: updatedProfile.department,
          }
        : prev
    );
  };

  // --------------------------------
  // COMPETENCY UPDATE
  // --------------------------------
  const handleUpdateCompetency = (id, level) => {
    const score = proficiencyLevels[level];

    setCompetencies((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, level, score } : skill
      )
    );
  };

  // --------------------------------
  // QUIZ ANSWER
  // --------------------------------
  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // --------------------------------
  // QUIZ SUBMIT — Send to backend
  // --------------------------------
  const handleQuizSubmit = async () => {
    const unanswered = quizQuestions.some(
      (question) => !quizAnswers[question.id]
    );

    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:8000";
      const token = localStorage.getItem("token");

      // ✅ Submit to backend
      const response = await axios.post(
        `${API_URL}/api/quiz/submit`,
        {
          quizId: 1,
          answers: quizAnswers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Use BACKEND result (not local scoring)
      const backendResult = response.data;

      const details = backendResult.detailedResults?.map((item) => ({
        id: item.questionId,
        skill: item.skill || "General",
        question: item.question,
        correct: item.isCorrect,
        userAnswer: item.yourAnswer,
        correctAnswer: item.correctAnswer,
        explanation: item.explanation,
      })) || [];

      const weakSkills = [
        ...new Set(
          details.filter((d) => !d.correct).map((d) => d.skill)
        ),
      ];

      setQuizResult({
        correct: backendResult.correctAnswers || 0,
        incorrect: backendResult.wrongAnswers || 0,
        total: backendResult.totalQuestions || 0,
        percentage: backendResult.percentage || 0,
        weakSkills,
        details,
      });

      setCurrentPage("result");
    } catch (err) {
      console.error("Quiz submit error:", err);

      // ✅ Fallback: local scoring if backend fails
      const details = quizQuestions.map((question) => ({
        id: question.id,
        skill: question.skill,
        question: question.question,
        correct: quizAnswers[question.id] === question.answer,
      }));

      const correct = details.filter((item) => item.correct).length;
      const incorrect = details.length - correct;
      const percentage = Math.round((correct / details.length) * 100);

      const weakSkills = [
        ...new Set(
          details
            .filter((item) => !item.correct)
            .map((item) => item.skill)
        ),
      ];

      setQuizResult({
        correct,
        incorrect,
        total: details.length,
        percentage,
        weakSkills,
        details,
      });

      setCurrentPage("result");
    }
  };

  // --------------------------------
  // PAGE CONTENT
  // --------------------------------
  const renderPage = () => {
    if (!isLoggedIn) {
      switch (currentPage) {
        case "login":
          return <Login onLogin={handleLogin} onNavigate={navigate} />;
        default:
          return <Home onNavigate={navigate} />;
      }
    }

    switch (currentPage) {
      case "profile":
        return (
          <Profile profile={profile} onProfileUpdate={handleProfileUpdate} />
        );

      case "assessment":
        return (
          <Assessment
            competencies={competencies}
            onUpdateCompetency={handleUpdateCompetency}
            onNavigate={navigate}
          />
        );

      case "dashboard":
        return (
          <Dashboard
            user={user}
            competencies={competencies}
            recommendations={recommendations}
            onNavigate={navigate}
          />
        );

      case "recommendations":
        return (
          <Recommendations
            recommendations={recommendations}
            onNavigate={navigate}
          />
        );

      case "quiz":
        return (
          <Quiz
            questions={quizQuestions}
            answers={quizAnswers}
            onAnswer={handleQuizAnswer}
            onSubmit={handleQuizSubmit}
            onNavigate={navigate}
            loading={quizLoading}
          />
        );

      case "result":
        return <Result result={quizResult} onNavigate={navigate} />;

      case "progress":
        return (
          <Progress
            competencies={competencies}
            trainingHistory={trainingHistory}
          />
        );

      default:
        return (
          <Dashboard
            user={user}
            competencies={competencies}
            recommendations={recommendations}
            onNavigate={navigate}
          />
        );
    }
  };

  const isLoginPage = currentPage === "login";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {!isLoginPage && (
        <Header
          isLoggedIn={isLoggedIn}
          user={user}
          currentPage={currentPage}
          onNavigate={navigate}
          onLogout={handleLogout}
        />
      )}

      <div className="flex-1">{renderPage()}</div>

      {!isLoginPage && <Footer onNavigate={navigate} />}
    </div>
  );
}

export default App;