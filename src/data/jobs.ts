import { companies } from "./companies";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type Experience = "Entry" | "Mid" | "Senior" | "Lead" | "Principal";
export type CompanySize = "1-50" | "51-200" | "201-1000" | "1,001-5,000" | "5,001-10,000" | "10,000+";

export interface Job {
  id: string;
  title: string;
  companySlug: string;
  location: string;
  workMode: WorkMode;
  type: JobType;
  experience: Experience;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  skills: string[];
  postedDaysAgo: number;
  featured: boolean;
  urgent: boolean;
  applicants: number;
  matchScore: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  benefits: string[];
  techStack: string[];
  industry: string;
  category: string;
}

const titles = [
  "Senior Frontend Engineer", "Staff Software Engineer", "Product Designer", "ML Research Scientist",
  "Data Engineer", "Backend Engineer, Payments", "iOS Engineer", "Android Engineer",
  "Engineering Manager", "Site Reliability Engineer", "Security Engineer", "DevOps Engineer",
  "Product Manager, Growth", "UX Researcher", "Full-Stack Engineer", "AI Platform Engineer",
  "Cloud Solutions Architect", "Data Scientist", "Applied Scientist", "Motion Designer",
  "Design Systems Lead", "Growth Marketing Manager", "Developer Relations Engineer", "Technical Program Manager",
  "Machine Learning Engineer", "Infrastructure Engineer", "Platform Engineer", "Analytics Engineer",
  "Solutions Engineer", "Customer Success Engineer", "Enterprise Account Executive", "Content Designer",
  "Brand Designer", "Video Producer", "Head of Design", "VP of Engineering",
  "Principal Engineer, Distributed Systems", "GPU Software Engineer", "Robotics Engineer", "Compiler Engineer",
  "Blockchain Engineer", "Game Engine Programmer", "AR/VR Engineer", "Firmware Engineer",
  "QA Automation Engineer", "Prompt Engineer", "AI Product Manager", "Technical Writer",
  "Data Analyst", "Business Systems Analyst", "Recruiter, Technical", "People Partner",
];

const locations = [
  "San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Boston, MA",
  "London, UK", "Berlin, Germany", "Amsterdam, Netherlands", "Toronto, Canada", "Dublin, Ireland",
  "Bangalore, India", "Singapore", "Sydney, Australia", "Tokyo, Japan", "Paris, France",
  "Los Angeles, CA", "Chicago, IL", "Denver, CO", "Remote — US", "Remote — Global",
];

const skillsPool = [
  "React", "TypeScript", "Node.js", "Python", "Go", "Rust", "Kubernetes", "AWS", "GCP", "Azure",
  "PostgreSQL", "GraphQL", "Next.js", "Swift", "Kotlin", "Terraform", "Docker", "Kafka",
  "PyTorch", "TensorFlow", "LLMs", "Figma", "Design Systems", "Prototyping", "SQL", "dbt",
  "Airflow", "Snowflake", "Spark", "Elixir", "Ruby", "Rails", "Java", "C++", "CUDA",
];

const categories = ["Engineering", "Design", "Product", "Data & AI", "Marketing", "Sales", "People"];

function rand<T>(arr: T[], seed: number): T { return arr[seed % arr.length]; }
function pickN<T>(arr: T[], n: number, seed: number): T[] {
  const out: T[] = []; const used = new Set<number>();
  for (let i = 0; i < n; i++) {
    let idx = (seed * (i + 3) * 7) % arr.length;
    while (used.has(idx)) idx = (idx + 1) % arr.length;
    used.add(idx); out.push(arr[idx]);
  }
  return out;
}

const experiences: Experience[] = ["Entry", "Mid", "Senior", "Lead", "Principal"];
const types: JobType[] = ["Full-time", "Full-time", "Full-time", "Contract", "Part-time", "Internship"];
const modes: WorkMode[] = ["Remote", "Hybrid", "On-site", "Remote", "Hybrid"];

export const jobs: Job[] = Array.from({ length: 56 }, (_, i) => {
  const seed = i + 1;
  const company = companies[seed % companies.length];
  const title = titles[i % titles.length];
  const exp = rand(experiences, seed);
  const salaryBase = 70000 + ((seed * 13) % 12) * 15000 + (exp === "Senior" ? 60000 : exp === "Lead" ? 90000 : exp === "Principal" ? 130000 : exp === "Mid" ? 20000 : 0);
  const salaryMin = Math.round(salaryBase / 1000) * 1000;
  const salaryMax = salaryMin + 30000 + ((seed * 7) % 6) * 10000;
  const cat = rand(categories, seed);
  return {
    id: `job-${seed}`,
    title,
    companySlug: company.slug,
    location: rand(locations, seed * 3),
    workMode: rand(modes, seed),
    type: rand(types, seed),
    experience: exp,
    salaryMin, salaryMax,
    currency: "USD",
    skills: pickN(skillsPool, 5, seed),
    postedDaysAgo: (seed * 5) % 30,
    featured: seed % 6 === 0,
    urgent: seed % 9 === 0,
    applicants: 12 + ((seed * 17) % 380),
    matchScore: 62 + ((seed * 11) % 36),
    description: `We're looking for a ${title} to join ${company.name}. You'll work on high-impact projects that ship to millions of users, collaborate across disciplines, and help shape the technical direction of the team. This role blends deep craft with product thinking — bring both.`,
    responsibilities: [
      `Own end-to-end delivery of features across the ${cat.toLowerCase()} stack`,
      "Collaborate with product, design, and cross-functional partners",
      "Mentor teammates and raise the technical bar across the org",
      "Define architecture and drive technical decisions",
      "Ship reliable, observable, well-tested software",
    ],
    requirements: [
      `${exp === "Entry" ? "0-2" : exp === "Mid" ? "3-5" : exp === "Senior" ? "5+" : "8+"} years of experience in a related role`,
      "Excellent communication and collaboration skills",
      "Strong problem-solving and systems-thinking abilities",
      "Comfort operating in ambiguity and fast-moving environments",
    ],
    preferred: [
      "Experience at a high-growth technology company",
      "Contributions to open source or public technical writing",
      "Familiarity with modern observability and CI/CD tooling",
    ],
    benefits: company.benefits,
    techStack: pickN(skillsPool, 6, seed * 2),
    industry: company.industry,
    category: cat,
  };
});

export const getJob = (id: string) => jobs.find((j) => j.id === id);
export const getJobsByCompany = (slug: string) => jobs.filter((j) => j.companySlug === slug);

export const formatSalary = (min: number, max: number, currency = "USD") => {
  const fmt = (n: number) => `${currency === "USD" ? "$" : ""}${Math.round(n / 1000)}k`;
  return `${fmt(min)} – ${fmt(max)}`;
};

export const trendingSearches = [
  "AI Engineer", "Remote React", "Product Designer", "Machine Learning", "Rust", "Staff Engineer", "Design Systems",
];

export const categoriesList = [
  { name: "Engineering", icon: "Code2", count: jobs.filter(j => j.category === "Engineering").length },
  { name: "Design", icon: "Palette", count: jobs.filter(j => j.category === "Design").length },
  { name: "Product", icon: "Layers", count: jobs.filter(j => j.category === "Product").length },
  { name: "Data & AI", icon: "Sparkles", count: jobs.filter(j => j.category === "Data & AI").length },
  { name: "Marketing", icon: "Megaphone", count: jobs.filter(j => j.category === "Marketing").length },
  { name: "Sales", icon: "TrendingUp", count: jobs.filter(j => j.category === "Sales").length },
  { name: "People", icon: "Users", count: jobs.filter(j => j.category === "People").length },
];
