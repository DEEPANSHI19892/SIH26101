
import {
  FaGlobe,
  FaUniversalAccess,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold">
                Skill Intelligence Platform
              </h3>

              <p className="text-sm text-slate-400 mt-3 leading-6">
                AI-enabled competency assessment and personalised
                learning platform for public-sector capacity building.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                Platform
              </h4>

              <div className="mt-3 space-y-2 text-sm text-slate-400">
                <button
                  onClick={() => onNavigate("home")}
                  className="block hover:text-white"
                >
                  Home
                </button>

                <button
                  onClick={() => onNavigate("about")}
                  className="block hover:text-white"
                >
                  About Platform
                </button>

                <button
                  onClick={() => onNavigate("features")}
                  className="block hover:text-white"
                >
                  Features
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">
                Information
              </h4>

              <div className="mt-3 space-y-3 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <FaUniversalAccess />
                  Accessibility
                </div>

                <div className="flex items-center gap-2">
                  <FaLock />
                  Privacy & Security
                </div>

                <div className="flex items-center gap-2">
                  <FaGlobe />
                  Site Information
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">
                Contact
              </h4>

              <div className="flex items-start gap-3 mt-3 text-sm text-slate-400">
                <FaEnvelope className="mt-1" />

                <span>
                  Help & Support
                  <br />
                  Platform Support Centre
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between gap-3 text-xs text-slate-400">
        <p>
          © 2026 Skill Intelligence Platform. All Rights Reserved.
        </p>

        <p>
          SIH26101 Prototype · Smart Education
        </p>
      </div>
    </footer>
  );
};

export default Footer;