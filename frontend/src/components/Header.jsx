import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

const Header = ({ isLoggedIn, user, currentPage, onNavigate, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const publicLinks = [
    {
      label: "Home",
      page: "home",
    },
    {
      label: "About Platform",
      page: "about",
    },
    {
      label: "How It Works",
      page: "how-it-works",
    },
    {
      label: "Features",
      page: "features",
    },
  ];

  const privateLinks = [
    {
      label: "Dashboard",
      page: "dashboard",
    },
    {
      label: "Assessment",
      page: "assessment",
    },
    {
      label: "Learning",
      page: "recommendations",
    },
    {
      label: "Quiz",
      page: "quiz",
    },
    {
      label: "Progress",
      page: "progress",
    },
  ];

  const links = isLoggedIn ? privateLinks : publicLinks;

  const handleNavigation = (page) => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* Government strip */}
      {/* <div className="bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-xs">
          <span>Government Learning & Capacity Building Platform</span>

          <span className="hidden sm:block text-slate-300">
            भारत सरकार · Government of India
          </span>
        </div>
      </div> */}

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigation("home")}
            className="flex items-center text-left"
          >
            <img
              src="/Logo.png"
              alt="Samarth Setu"
              className="h-20 w-auto object-contain"
            />
          </button>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavigation(link.page)}
                className={`
                  px-4 py-3 text-sm font-medium
                  transition-colors
                  ${
                    currentPage === link.page
                      ? "text-[#1E3A8A] bg-slate-50"
                      : "text-slate-700 hover:text-[#1E3A8A] hover:bg-slate-50"
                  }
                `}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavigation("login")}
                  className="px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] border border-slate-300 hover:bg-slate-50"
                >
                  Sign In
                </button>

                <button
                  onClick={() => handleNavigation("login")}
                  className="px-4 py-2.5 text-sm font-semibold bg-[#D97706] text-white hover:bg-[#B45309]"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 border border-slate-300 px-3 py-2"
                >
                  <div className="w-8 h-8 bg-[#1E3A8A] text-white flex items-center justify-center">
                    <FaUser className="text-xs" />
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800">
                      {user?.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {user?.designation}
                    </p>
                  </div>

                  <FaChevronDown className="text-xs text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-sm">
                    <button
                      onClick={() => handleNavigation("profile")}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50"
                    >
                      My Profile
                    </button>

                    <button
                      onClick={() => handleNavigation("dashboard")}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50"
                    >
                      Dashboard
                    </button>

                    <div className="border-t border-slate-200" />

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-xl text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavigation(link.page)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </button>
            ))}

            {!isLoggedIn && (
              <button
                onClick={() => handleNavigation("login")}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-[#1E3A8A]"
              >
                Sign In
              </button>
            )}

            {isLoggedIn && (
              <>
                <button
                  onClick={() => handleNavigation("profile")}
                  className="w-full text-left px-4 py-3 text-sm"
                >
                  My Profile
                </button>

                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-700"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
