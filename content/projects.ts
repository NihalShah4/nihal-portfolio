export type Project = {
  slug: string;
  title: string;
  outcome: string;
  github: string;
  tags: string[];
  highlights: string[];
  tech: string[];
  // put your screenshots inside: public/projects/<slug>/
  // and list the paths here, for example:
  // "/projects/bank-fraud-rule-explorer/1.png"
  screenshots: string[];
};

export const projects: Project[] = [
  {
    slug: "bank-fraud-rule-explorer",
    title: "Bank Fraud Rule Explorer",
    outcome:
      "A complete end-to-end fraud analytics project demonstrating anomaly detection, feature engineering, rule exploration, and an interactive Streamlit dashboard.",
    github: "https://github.com/NihalShah4/bank-fraud-rule-explorer",
    tags: ["Fraud", "Risk", "Analytics", "Dashboard"],
    highlights: [
      "Explores fraud rules end-to-end with realistic data and interpretable patterns.",
      "Supports interactive exploration to understand rule behavior and tradeoffs.",
      "Built to communicate fraud signals clearly with a practical dashboard workflow.",
    ],
    tech: ["Python", "Pandas", "NumPy", "Streamlit", "Scikit-learn"],
    screenshots: [],
  },
  {
    slug: "global-pr-points-calculator",
    title: "Global PR Points Calculator",
    outcome:
      "A multi-country, client-side platform that allows users to estimate eligibility points for popular Permanent Residency (PR) and skilled-migration programs with modular scoring logic.",
    github: "https://github.com/NihalShah4/global-pr-points-calculator",
    tags: ["Product", "UI", "Logic", "Modular"],
    highlights: [
      "Client-side scoring engine with clean, structured rules per country.",
      "Modular architecture so new countries can be added without refactoring the app.",
      "Designed for fast user flow with clear inputs and readable results.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    screenshots: [],
  },
  {
    slug: "ai-news-research-recommender",
    title: "AI News Research Recommender",
    outcome:
      "A lightweight local web application that ingests recent AI/ML papers and tech articles from multiple public RSS feeds and allows users to search across them.",
    github: "https://github.com/NihalShah4/ai-news-research-recommender",
    tags: ["AI", "NLP", "Search", "Full-stack"],
    highlights: [
      "Ingests multiple RSS feeds into a unified local store for browsing and search.",
      "Supports keyword search across titles and summaries with a clean UI.",
      "Generates short summaries to speed up scanning and research discovery.",
    ],
    tech: ["Python", "FastAPI", "Next.js", "TypeScript", "RSS", "REST APIs"],
    screenshots: [],
  },
  {
    slug: "travel-optimizer",
    title: "Travel Optimizer",
    outcome:
      "A full-stack application that plans efficient multi-country travel routes by selecting travel mode per leg, estimating realistic time, and visualizing routes on a world map.",
    github: "https://github.com/NihalShah4/travel-optimizer",
    tags: ["Optimization", "Maps", "Full-stack", "API"],
    highlights: [
      "Automatically chooses flight vs ground travel using practical distance logic.",
      "Estimates travel time with realistic assumptions and fixed overheads.",
      "Visualizes routes clearly to explain the plan at a glance.",
    ],
    tech: ["Python", "FastAPI", "Next.js", "TypeScript", "Map Visualization"],
    screenshots: [],
  },
];
