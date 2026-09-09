
import {
  FaArrowRight,
  FaCheckCircle,
  FaClipboardCheck,
  FaLightbulb,
  FaBookOpen,
  FaChartLine,
  FaBrain,
  FaUsers,
  FaShieldAlt,
  FaDatabase,
  FaChevronRight,
} from "react-icons/fa";

function Home({ onNavigate }) {

     
  const features = [
    {
      icon: <FaClipboardCheck />,
      title: "Competency Assessment",
      text: "Assess your current proficiency across the skills required for your role.",
    },
    {
      icon: <FaBrain />,
      title: "AI Skill Gap Analysis",
      text: "Identify high-priority competency gaps using assessment-driven insights.",
    },
    {
      icon: <FaBookOpen />,
      title: "Personalized Learning",
      text: "Discover learning resources aligned with the competencies you need to develop.",
    },
    {
      icon: <FaLightbulb />,
      title: "Smart Recommendations",
      text: "Receive targeted training recommendations based on your individual gaps.",
    },
    {
      icon: <FaClipboardCheck />,
      title: "Adaptive Quizzes",
      text: "Test your understanding and identify areas that need further revision.",
    },
    {
      icon: <FaChartLine />,
      title: "Progress Analytics",
      text: "Track competency improvement and learning progress over time.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create your profile",
      text: "Add your role, department, experience and professional background.",
    },
    {
      number: "02",
      title: "Assess your competencies",
      text: "Evaluate your proficiency across role-relevant skills.",
    },
    {
      number: "03",
      title: "Identify skill gaps",
      text: "Understand which competencies require immediate attention.",
    },
    {
      number: "04",
      title: "Get recommendations",
      text: "Receive targeted learning pathways based on your gaps.",
    },
    {
      number: "05",
      title: "Learn and test",
      text: "Complete learning activities and validate your understanding.",
    },
    {
      number: "06",
      title: "Track improvement",
      text: "Monitor your progress and strengthen your professional capabilities.",
    },
  ];

  return (
  <section className="bg-slate-50">
      {/* Hero */}
    <section className="border-b border-slate-200 bg-white">
         <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          {/* Hero content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-800">
              <span className="h-2 w-2 rounded-full bg-amber-600" />
              Competency-driven learning
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Build the skills you need for{" "}
              <span className="text-blue-900">better public service.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              An AI-enabled skill intelligence platform that helps government
              officials assess their competencies, identify skill gaps, discover
              relevant learning opportunities and track professional growth.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => onNavigate("login")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-950"
              >
                Start Your Assessment
                <FaArrowRight className="text-xs" />
              </button>

              <button
                onClick={() => onNavigate("features")}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore Platform
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600" />
                Role-based
              </span>

              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600" />
                Competency-driven
              </span>

              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600" />
                Data-informed
              </span>
            </div>
          </div>

          {/* Product preview */}
          <div className="relative">
            <div className="border border-slate-200 bg-slate-50 p-3 shadow-sm">
              <div className="border border-slate-200 bg-white">
                {/* Preview header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Skill Intelligence
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Competency Overview
                    </p>
                  </div>

                  <div className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Active
                  </div>
                </div>

                {/* Score */}
                <div className="grid grid-cols-2 gap-4 p-5">
                  <div className="border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Overall Score</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      68%
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Current competency
                    </p>
                  </div>

                  <div className="border border-red-100 bg-red-50 p-4">
                    <p className="text-xs text-red-700">Priority Gaps</p>
                    <p className="mt-2 text-3xl font-bold text-red-800">3</p>
                    <p className="mt-1 text-xs text-red-700">
                      Need attention
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="px-5 pb-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      Competency levels
                    </p>
                    <span className="text-xs text-slate-500">
                      6 competencies
                    </span>
                  </div>

                  {[
                    ["Python", 40, "High gap"],
                    ["SQL", 65, "Medium"],
                    ["Statistics", 65, "Medium"],
                    ["Data Visualization", 40, "High gap"],
                    ["AI / ML", 40, "High gap"],
                  ].map(([name, score, status]) => (
                    <div key={name} className="mb-4 last:mb-0">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-700">
                          {name}
                        </span>

                        <span
                          className={`text-[11px] font-semibold ${
                            status === "High gap"
                              ? "text-red-700"
                              : "text-amber-700"
                          }`}
                        >
                          {score}%
                        </span>
                      </div>

                      <div className="h-2 bg-slate-100">
                        <div
                          className={`h-full ${
                            status === "High gap"
                              ? "bg-red-500"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendation */}
                <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        Recommended next step
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Python for Data Analysis
                      </p>
                    </div>

                    <FaChevronRight className="text-xs text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden border border-slate-200 bg-white p-4 shadow-sm sm:block">
              <p className="text-xs font-semibold text-slate-900">
                Personalized
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Learning recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform purpose */}
     {/* Platform Purpose */}
<section
  id="about"
  className="border-b border-slate-200 bg-slate-50"
>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
              Why this platform
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Move from generic training to targeted competency development.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Government officials have different roles, responsibilities and
              skill requirements. Our platform connects an individual's role,
              competency assessment and learning journey so that training is
              focused on what the official actually needs to develop.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="border border-slate-200 bg-white p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center bg-blue-50 text-blue-900">
                <FaClipboardCheck />
              </div>

              <h3 className="font-bold text-slate-900">Assess</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Understand your current level across important professional
                competencies.
              </p>
            </div>

            <div className="border border-slate-200 bg-white p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center bg-amber-50 text-amber-700">
                <FaBrain />
              </div>

              <h3 className="font-bold text-slate-900">Identify</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Identify the skills that require attention and prioritize
                competency gaps.
              </p>
            </div>

            <div className="border border-slate-200 bg-white p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center bg-emerald-50 text-emerald-700">
                <FaBookOpen />
              </div>

              <h3 className="font-bold text-slate-900">Develop</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Follow relevant learning pathways and measure improvement over
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      {/* How it works */}
<section
  id="how-it-works"
  className="border-b border-slate-200 bg-white"
>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              From assessment to measurable improvement
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              A simple, connected learning journey designed around the
              competencies required for your role.
            </p>
          </div>

          <div className="mt-12 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`border-slate-200 p-6 ${
                  index % 3 !== 2 ? "lg:border-r" : ""
                } ${index < 3 ? "lg:border-b" : ""} ${
                  index % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <span className="text-sm font-bold text-amber-600">
                  {step.number}
                </span>

                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      {/* Features */}
<section
  id="features"
  className="bg-slate-50"
>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                Platform capabilities
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                One platform for the complete learning journey
              </h2>
            </div>

            <button
              onClick={() => onNavigate("login")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-blue-950"
            >
              Get started
              <FaArrowRight className="text-xs" />
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border border-slate-200 bg-white p-6 transition hover:border-slate-300"
              >
                <div className="flex h-11 w-11 items-center justify-center bg-slate-100 text-blue-900">
                  {feature.icon}
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government focus */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                Built for public service
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Designed around roles, competencies and continuous learning.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                The platform is designed to support a competency-based approach
                where learning is connected to the responsibilities and
                capabilities required for effective public service.
              </p>

              <button
                onClick={() => onNavigate("login")}
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-950"
              >
                Begin your learning journey
                <FaArrowRight className="text-xs" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-slate-200 bg-slate-50 p-6">
                <FaUsers className="text-xl text-blue-900" />
                <h3 className="mt-4 font-bold text-slate-900">
                  Role-based learning
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Connect learning priorities to the responsibilities of each
                  government role.
                </p>
              </div>

              <div className="border border-slate-200 bg-slate-50 p-6">
                <FaDatabase className="text-xl text-blue-900" />
                <h3 className="mt-4 font-bold text-slate-900">
                  Data-informed insights
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Turn assessment and learning data into actionable development
                  insights.
                </p>
              </div>

              <div className="border border-slate-200 bg-slate-50 p-6">
                <FaShieldAlt className="text-xl text-blue-900" />
                <h3 className="mt-4 font-bold text-slate-900">
                  Government-ready design
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Clear, accessible and structured for institutional use.
                </p>
              </div>

              <div className="border border-slate-200 bg-slate-50 p-6">
                <FaChartLine className="text-xl text-blue-900" />
                <h3 className="mt-4 font-bold text-slate-900">
                  Continuous development
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Track improvement instead of treating training as a one-time
                  activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-400">
            Start today
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Understand your skills. Close your gaps. Keep growing.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300">
            Begin with a competency assessment and discover a learning path
            aligned with your professional development needs.
          </p>

          <button
            onClick={() => onNavigate("login")}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-amber-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-amber-700"
          >
            Get Started
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </section>
    </section>
  );
}

export default Home;