import { useState } from "react";

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
  quizQuestions,
  trainingHistory,
  proficiencyLevels,
} from "./data/data";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(initialProfile);

  const [competencies, setCompetencies] =
    useState(initialCompetencies);

  const [quizAnswers, setQuizAnswers] = useState({});

  const [quizResult, setQuizResult] = useState(null);

  // --------------------------------
  // NAVIGATION
  const navigate = (page) => {
  const homeSections = ["about", "how-it-works", "features"];

  if (homeSections.includes(page)) {
    setCurrentPage("home");

    // Wait for Home to be rendered, then scroll
    setTimeout(() => {
      const element = document.getElementById(page);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return;
  }

  setCurrentPage(page);
};
   
  // --------------------------------
  // LOGIN
  // --------------------------------

  const handleLogin = (loginData) => {
    setUser({
      name: profile.name,
      designation: profile.designation,
      department: profile.department,
      email: loginData.email,
    });

    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  // --------------------------------
  // LOGOUT
  // --------------------------------

  const handleLogout = () => {
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
        skill.id === id
          ? {
              ...skill,
              level,
              score,
            }
          : skill
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
  // QUIZ SUBMIT
  // --------------------------------

  const handleQuizSubmit = () => {
    const unanswered = quizQuestions.some(
      (question) => !quizAnswers[question.id]
    );

    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const details = quizQuestions.map((question) => ({
      id: question.id,
      skill: question.skill,
      question: question.question,
      correct:
        quizAnswers[question.id] === question.answer,
    }));

    const correct = details.filter(
      (item) => item.correct
    ).length;

    const incorrect = details.length - correct;

    const percentage = Math.round(
      (correct / details.length) * 100
    );

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
  };

  // --------------------------------
  // PAGE CONTENT
  // --------------------------------

  const renderPage = () => {
    if (!isLoggedIn) {
      switch (currentPage) {
        case "login":
          return (
            <Login
              onLogin={handleLogin}
              onNavigate={navigate}
            />
          );

        default:
          return (
            <Home
              onNavigate={navigate}
            />
          );
      }
    }

    switch (currentPage) {
      case "profile":
        return (
          <Profile
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
          />
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
          />
        );

      case "result":
        return (
          <Result
            result={quizResult}
            onNavigate={navigate}
          />
        );

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

  // --------------------------------
  // LOGIN HAS NO HEADER / FOOTER
  // --------------------------------

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

      <div className="flex-1">
        {renderPage()}
      </div>

      {!isLoginPage && (
        <Footer
          onNavigate={navigate}
        />
      )}

    </div>
  );
}

export default App;