"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  FileText,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Phone,
} from "lucide-react";

type ProjectItem = {
  title: string;
  slug: string;
  outcome: string;
  tags: string[];
  tech: string[];
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export default function HomeClient({
  featuredProjects,
}: {
  featuredProjects: ProjectItem[];
}) {
  // DS-focused, categorized skills (from your DS resume, cleaned up)
  const skillGroups: Array<{ title: string; items: string[] }> = [
    {
      title: "Programming & Analytics",
      items: ["Python", "SQL", "R", "Excel", "Statistical Analysis", "Regression", "Feature Engineering", "Data Cleaning"],
    },
    {
      title: "Databases & Data Systems",
      items: ["Oracle 19c", "PL/SQL", "Sybase", "DB2", "Data Modeling"],
    },
    {
      title: "Data Visualization & BI",
      items: ["Power BI", "Tableau", "Dashboard Design", "Executive Reporting"],
    },
    {
      title: "Machine Learning & AI",
      items: ["Supervised Learning", "Logistic Regression", "LDA", "KNN", "Ridge", "Lasso", "NLP", "LLM Integration", "Model Evaluation"],
    },
    {
      title: "Frameworks & Platforms",
      items: ["FastAPI", "Oracle APEX", "Streamlit", "GitHub", "Jenkins", "JIRA", "Confluence", "ServiceNow", "Splunk", "Salesforce"],
    },
    {
      title: "Professional Strengths",
      items: ["Stakeholder Management", "Process Optimization", "RCA", "Cross-functional Collaboration", "Team Leadership"],
    },
    {
      title: "Domain Strength",
      items: [
        "Insurance (claims, payments)",
        "Transaction & operational data",
        "Higher-ed analytics",
      ],
    },
  ];

  // Experience (DS-first framing, but grounded in your real roles)
  const experienceItems: Array<{
    title: string;
    company: string;
    location?: string;
    dates: string;
    bullets: string[];
  }> = [
    {
      title: "Senior Data Analyst – AI Initiatives",
      company: "AA2IT",
      location: "Remote",
      dates: "Jul 2025 – Present",
      bullets: [
        "Lead data-driven analysis of client-side business and operational data to identify patterns, inefficiencies, and AI automation opportunities.",
        "Design and deliver analytical insights using Python, SQL, Power BI, and Tableau to support executive decision-making and client strategy discussions.",
        "Develop exploratory data analyses and KPI frameworks to evaluate customer behavior, funnel performance, and operational metrics.",
        "Collaborate directly with clients to translate business questions into structured data problems and analytical workflows.",
        "Support AI-driven initiatives by identifying use cases for automation, predictive analytics, and NLP-based reporting across client engagements.",
        "Partner with engineering teams to define data requirements, validate outputs, and ensure analytical solutions align with business objectives.",
        "Present insight summaries, dashboards, and recommendations to leadership, bridging technical findings with business impact.",
      ],
    },
    {
      title: "AI Integration Intern",
      company: "CampusWorks",
      location: "Madison, NJ",
      dates: "Jan 2025 – May 2025",
      bullets: [
        "Integrated OpenAI GPT-4o with enterprise systems to enable natural language access to institutional data.",
        "Improved data retrieval efficiency by approximately 25 percent through AI-assisted query workflows.",
        "Led cleanup and validation of over 3,400 reports, improving data quality and reducing redundancy by 30 percent.",
        "Developed cross-departmental data mappings and technical documentation to support long-term maintainability.",
      ],
    },
    {
      title: "Senior Data Analyst",
      company: "Cognizant",
      location: "Chennai, India",
      dates: "Mar 2022 – Dec 2023",
      bullets: [
        "Led a team of five analysts while continuing hands-on analytics and reporting responsibilities.",
        "Designed and implemented SOPs for analytics workflows, improving operational efficiency by 20 percent.",
        "Coordinated root cause analysis across multiple cross-functional teams, reducing system downtime by 30 percent.",
        "Oversaw development of automated alerting and task workflows to minimize manual intervention.",
        "Built and maintained centralized documentation in Confluence to support onboarding and process standardization.",
      ],
    },
    {
      title: "Data Analyst",
      company: "Cognizant",
      location: "Chennai, India",
      dates: "Sep 2018 – Mar 2022",
      bullets: [
        "Performed claims data analysis, data corrections, and reporting using SQL, XML, and enterprise data systems.",
        "Supported release validation, defect triage, and deployment planning while maintaining 99.9 percent uptime.",
        "Delivered high-priority ad hoc reports and analytics to support business operations and decision-making.",
        "Collaborated with business teams to streamline workflows and reduce service disruptions by 30 percent.",
        "Built foundational expertise in claims processing, enterprise data systems, and operational analytics.",
      ],
    },
  ];

  const educationItems: Array<{
    degree: string;
    school: string;
    location?: string;
    dates: string;
    highlights?: string[];
  }> = [
    {
      degree: "M.S. in Data Science",
      school: "Drew University",
      location: "Madison, NJ",
      dates: "May 2025",
      highlights: [],
    },
    {
      degree: "B.Tech in Computer Science",
      school: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
      location: "India",
      dates: "Jul 2018",
      highlights: [],
    },
  ];

  const stats = [
    { k: "6+ years", v: "Data + analytics experience" },
    { k: "Python + SQL", v: "Primary stack" },
    { k: "FastAPI + Next.js", v: "Product-style builds" },
    { k: "New York", v: "Location" },
  ];

  // Featured names only (clickable)
  const featuredNames = featuredProjects.slice(0, 6);

  return (
    <div className="page-shell">
      {/* Sticky top nav */}
      <header className="topnav">
        <div className="topnav-inner">
          <a href="#home" className="brand">
            Nihal Shah
          </a>

          <nav className="navlinks" aria-label="Primary">
            <a className="navlink" href="#skills">
              Skills
            </a>
            <a className="navlink" href="#experience">
              Experience
            </a>
            <a className="navlink" href="#education">
              Education
            </a>
            <a className="navlink" href="#projects">
              Projects
            </a>
            <a className="navlink" href="#contact">
              Contact
            </a>
          </nav>

          <div className="nav-cta">
            <a
              className="iconbtn"
              href="https://github.com/NihalShah4"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              className="iconbtn"
              href="https://www.linkedin.com/in/nihalshah4/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              className="iconbtn"
              href="/resume.pdf"
              aria-label="Resume"
              title="Resume"
            >
              <FileText size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="section hero">
        <div className="bg-glow" aria-hidden="true" />

        <div className="container-page hero-grid">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.55 }}
            className="hero-copy"
          >
            <div className="kicker">
              <Sparkles size={16} />
              Data Scientist • Data Engineering • Applied ML • Analytics Systems
            </div>

            <h1 className="hero-title">
              Hi, I’m Nihal.
              <span className="hero-sub">
                Applied AI and Analytics professional with 6+ years of experience 
                building data-driven and AI-enabled systems across financial services 
                and technology environments. Hands-on experience designing NLP- and 
                LLM-powered solutions, analytics pipelines, and decision-support platforms. 
                Strong background in analytics leadership, stakeholder collaboration, 
                and translating business problems into scalable, production-ready AI solutions.
              </span>
            </h1>

            <div className="hero-actions">
              <a className="btn btn-ghost" href="#projects">
                View Projects <ArrowRight size={18} />
              </a>
              <a className="btn btn-ghost" href="#contact">
                Contact <ArrowRight size={18} />
              </a>
            </div>

            <div className="hero-stats">
              {stats.map((s) => (
                <div key={s.v} className="card stat">
                  <div className="stat-k">{s.k}</div>
                  <div className="stat-v">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.55, delay: 0.08 }}
            className="hero-panel"
          >
            <div className="card panel">
              <div className="panel-top">
                <div className="panel-title">What you’ll find</div>
                <div className="panel-badge">Recruiter-friendly</div>
              </div>

              <ul className="panel-list">
                <li>
                  <ArrowRight size={16} />
                  Clear projects with outcomes and tech stack
                </li>
                <li>
                  <ArrowRight size={16} />
                  Applied ML + data engineering work you can validate
                </li>
                <li>
                  <ArrowRight size={16} />
                  Experience written in impact-first bullets
                </li>
              </ul>

              <div className="panel-links">
                <a className="chip" href="#skills">
                  Skills
                </a>
                <a className="chip" href="#experience">
                  Experience
                </a>
                <a className="chip" href="#projects">
                  Projects
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="container-page">
          <div className="section-head">
            <h2 className="section-title">Skills</h2>
            <p className="section-sub">
              Grouped for quick scanning. Built to match data engineering and
              applied ML roles.
            </p>
          </div>

          <div className="grid-2">
            {skillGroups.map((g) => (
              <div key={g.title} className="card">
                <div className="card-title">{g.title}</div>
                <div className="chiprow">
                  {g.items.map((x) => (
                    <span key={x} className="chip chip-solid">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="container-page">
          <div className="section-head">
            <h2 className="section-title">Experience</h2>
            <p className="section-sub">
              Impact-driven bullets with tools and business context.
            </p>
          </div>

          <div className="stack">
            {experienceItems.map((e) => (
              <div key={e.title + e.company} className="card">
                <div className="row">
                  <div className="row-left">
                    <div className="card-title">{e.title}</div>
                    <div className="mutedline">
                      <Briefcase size={16} />
                      <span>
                        {e.company}
                        {e.location ? ` • ${e.location}` : ""}
                      </span>
                    </div>
                  </div>
                  <div className="row-right muted">{e.dates}</div>
                </div>

                <ul className="bullets">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section">
        <div className="container-page">
          <div className="section-head">
            <h2 className="section-title">Education</h2>
            <p className="section-sub">Grad + undergrad, simple and verifiable.</p>
          </div>

          <div className="grid-2">
            {educationItems.map((ed) => (
              <div key={ed.degree + ed.school} className="card">
                <div className="row">
                  <div className="row-left">
                    <div className="card-title">{ed.degree}</div>
                    <div className="mutedline">
                      <GraduationCap size={16} />
                      <span>
                        {ed.school}
                        {ed.location ? ` • ${ed.location}` : ""}
                      </span>
                    </div>
                  </div>
                  <div className="row-right muted">{ed.dates}</div>
                </div>

                {ed.highlights?.length ? (
                  <ul className="bullets">
                    {ed.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="container-page">
          <div className="section-head">
            <h2 className="section-title">Projects</h2>
          </div>

          {/* featured names only */}
          <div className="card">
            <div className="card-title">Featured</div>
            <div className="featured-names">
              {featuredNames.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="featured-link"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>

          {/* 4 cards */}
          <div className="grid-2 mt">
            {featuredProjects.slice(0, 4).map((p) => (
              <div key={p.slug} className="card">
                <div className="row">
                  <div className="row-left">
                    <div className="card-title">{p.title}</div>
                    <div className="muted">{p.outcome}</div>
                  </div>
                  <Link
                    className="iconbtn"
                    href={`/projects/${p.slug}`}
                    aria-label={`Open ${p.title}`}
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <div className="chiprow mt-sm">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="chip chip-solid">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt">
            <Link className="btn btn-ghost" href="/projects">
              View all projects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="container-page">
          <div className="section-head">
            <h2 className="section-title">Contact</h2>
            <p className="section-sub">Simple and direct.</p>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-title">Reach me</div>

              <div className="contact-item">
                <Mail size={18} />
                <a href="mailto:nihalshah4@gmail.com">nihalshah4@gmail.com</a>
              </div>

              <div className="contact-item">
                <Phone size={18} />
                <a href="tel:+18625791974">+1 (862) 579-1974</a>
              </div>

              <div className="contact-item">
                <MapPin size={18} />
                <span>New York, NY</span>
              </div>

              <div className="chiprow mt-sm">
                <a
                  className="btn btn-primary"
                  href="https://www.linkedin.com/in/nihalshah4/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowRight size={18} />
                </a>
                <a
                  className="btn btn-ghost"
                  href="https://github.com/NihalShah4"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowRight size={18} />
                </a>
                <a className="btn btn-ghost" href="/resume.pdf">
                  Resume <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Quick note</div>
              <p className="muted">
                If you’re hiring for data engineering, analytics, or applied ML
                roles, I’m happy to share a short walkthrough of the most
                relevant projects and impact.
              </p>

              <div className="mt">
                <a
                  className="btn btn-primary"
                  href="mailto:nihalshah4@gmail.com?subject=Portfolio%20Inquiry"
                >
                  Email me <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
