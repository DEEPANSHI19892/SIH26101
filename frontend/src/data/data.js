export const initialProfile = {
  name: "Ananya Sharma",
  designation: "Deputy Statistical Officer",
  department: "Ministry of Statistics & Programme Implementation",
  jobRole: "Data & Statistical Analysis",
  experience: "6 Years",
  education: "M.Sc. Statistics",
  previousTraining: [
    "Official Statistics Fundamentals",
    "Data Quality & Validation",
    "Excel for Government Analytics"
  ]
};

export const proficiencyLevels = {
  Beginner: 40,
  Intermediate: 65,
  Advanced: 90
};

export const initialCompetencies = [
  {
    id: "python",
    name: "Python",
    description: "Programming and data processing",
    level: "Beginner",
    score: 40,
    baseline: 40
  },
  {
    id: "sql",
    name: "SQL",
    description: "Database querying and management",
    level: "Intermediate",
    score: 65,
    baseline: 55
  },
  {
    id: "sampling",
    name: "Sampling Methods",
    description: "Survey sampling and methodology",
    level: "Advanced",
    score: 90,
    baseline: 80
  },
  {
    id: "statistics",
    name: "Statistical Analysis",
    description: "Statistical techniques and interpretation",
    level: "Intermediate",
    score: 65,
    baseline: 60
  },
  {
    id: "visualization",
    name: "Data Visualization",
    description: "Charts, dashboards and data storytelling",
    level: "Beginner",
    score: 40,
    baseline: 35
  },
  {
    id: "aiml",
    name: "AI / ML",
    description: "Applied artificial intelligence and ML",
    level: "Beginner",
    score: 40,
    baseline: 25
  }
];

export const recommendations = [
  {
    id: 1,
    title: "Python for Data Analysis",
    source: "NSSTA / TPAC",
    priority: "HIGH",
    duration: "6 Weeks",
    mode: "Online",
    description:
      "Build practical Python skills for government data processing, cleaning and analysis.",
    skill: "Python"
  },
  {
    id: 2,
    title: "Data Visualization with Power BI",
    source: "Learning Catalogue",
    priority: "HIGH",
    duration: "4 Weeks",
    mode: "Online",
    description:
      "Develop interactive dashboards and communicate statistical insights effectively.",
    skill: "Data Visualization"
  },
  {
    id: 3,
    title: "Applied AI & Machine Learning",
    source: "iGOT-Ready",
    priority: "HIGH",
    duration: "8 Weeks",
    mode: "Blended",
    description:
      "Understand practical AI and ML concepts for public-sector analytics.",
    skill: "AI / ML"
  },
  {
    id: 4,
    title: "Advanced SQL for Analysts",
    source: "Learning Catalogue",
    priority: "MEDIUM",
    duration: "3 Weeks",
    mode: "Online",
    description:
      "Strengthen querying, joins, aggregation and analytical database skills.",
    skill: "SQL"
  },
  {
    id: 5,
    title: "Statistical Analysis Refresher",
    source: "NSSTA / TPAC",
    priority: "MEDIUM",
    duration: "3 Weeks",
    mode: "Online",
    description:
      "Refresh statistical reasoning and analytical methods used in official statistics.",
    skill: "Statistical Analysis"
  },
  {
    id: 6,
    title: "Advanced Survey Sampling",
    source: "iGOT-Ready",
    priority: "LOW",
    duration: "2 Weeks",
    mode: "Online",
    description:
      "Extend existing sampling expertise with advanced survey methodology.",
    skill: "Sampling Methods"
  }
];

export const quizQuestions = [
  {
    id: 1,
    skill: "Python",
    question: "Which Python library is commonly used for tabular data analysis?",
    options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"],
    answer: "Pandas"
  },
  {
    id: 2,
    skill: "SQL",
    question: "Which SQL clause is used to filter grouped results?",
    options: ["WHERE", "ORDER BY", "HAVING", "GROUP BY"],
    answer: "HAVING"
  },
  {
    id: 3,
    skill: "Data Visualization",
    question: "Which visualization is generally suitable for showing a trend over time?",
    options: ["Line chart", "Pie chart", "Gauge", "Treemap"],
    answer: "Line chart"
  },
  {
    id: 4,
    skill: "Statistics",
    question: "What does the mean represent?",
    options: [
      "Middle observation",
      "Most frequent observation",
      "Arithmetic average",
      "Range of observations"
    ],
    answer: "Arithmetic average"
  },
  {
    id: 5,
    skill: "AI / ML",
    question: "Which is an example of supervised learning?",
    options: [
      "K-means clustering",
      "Linear regression with labelled data",
      "PCA",
      "Association rule mining"
    ],
    answer: "Linear regression with labelled data"
  }
];

export const trainingHistory = [
  {
    course: "Official Statistics Fundamentals",
    date: "2025",
    score: "88%",
    status: "Completed"
  },
  {
    course: "Data Quality & Validation",
    date: "2025",
    score: "82%",
    status: "Completed"
  },
  {
    course: "Excel for Government Analytics",
    date: "2024",
    score: "91%",
    status: "Completed"
  }
];