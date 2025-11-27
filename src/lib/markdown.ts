import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export interface AboutData {
  name: string;
  title: string;
  university: string;
  year: string;
  bio: string;
  philosophy: { title: string; description: string }[];
}

export interface ExperienceItem {
  title: string;
  period: string;
  details: string[];
}

export interface ExperienceData {
  internships: ExperienceItem[];
  awards: ExperienceItem[];
  certifications: string[];
}

export interface PortfolioProject {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  color: string;
  link: string;
}

export interface ContactData {
  email: string;
  phone: string;
  social: { platform: string; url: string }[];
  message: string;
  availability: string;
}

function parseAboutMarkdown(content: string): AboutData {
  const lines = content.split("\n").filter((line) => line.trim());

  let name = "";
  let title = "";
  let university = "";
  let year = "";
  let bio = "";
  const philosophy: { title: string; description: string }[] = [];

  let currentSection = "";
  let currentPhilosophy: { title: string; description: string } | null = null;

  for (const line of lines) {
    if (line.startsWith("name:")) {
      name = line.replace("name:", "").trim();
    } else if (line.startsWith("title:")) {
      title = line.replace("title:", "").trim();
    } else if (line.startsWith("university:")) {
      university = line.replace("university:", "").trim();
    } else if (line.startsWith("year:")) {
      year = line.replace("year:", "").trim();
    } else if (line.startsWith("## Bio")) {
      currentSection = "bio";
    } else if (line.startsWith("## Philosophy")) {
      currentSection = "philosophy";
    } else if (line.startsWith("### ") && currentSection === "philosophy") {
      if (currentPhilosophy) {
        philosophy.push(currentPhilosophy);
      }
      currentPhilosophy = {
        title: line.replace("### ", "").trim(),
        description: "",
      };
    } else if (currentSection === "bio" && !line.startsWith("#")) {
      bio += (bio ? " " : "") + line;
    } else if (currentPhilosophy && !line.startsWith("#")) {
      currentPhilosophy.description = line;
    }
  }

  if (currentPhilosophy) {
    philosophy.push(currentPhilosophy);
  }

  return { name, title, university, year, bio, philosophy };
}

function parseExperienceMarkdown(content: string): ExperienceData {
  const internships: ExperienceItem[] = [];
  const awards: ExperienceItem[] = [];
  const certifications: string[] = [];

  let currentSection = "";
  let currentItem: ExperienceItem | null = null;

  const lines = content.split("\n");

  const flushCurrentItem = (section: string) => {
    if (!currentItem) return;
    if (section === "internships") internships.push(currentItem);
    else if (section === "awards") awards.push(currentItem);
    currentItem = null;
  };

  for (const line of lines) {
    if (line.startsWith("## 인턴 및 활동")) {
      flushCurrentItem(currentSection);
      currentSection = "internships";
    } else if (line.startsWith("## 수상 경력")) {
      flushCurrentItem(currentSection);
      currentSection = "awards";
    } else if (line.startsWith("## 자격 및 교육")) {
      flushCurrentItem(currentSection);
      currentSection = "certifications";
    } else if (line.startsWith("- **") && currentSection !== "certifications") {
      flushCurrentItem(currentSection);

      const match = line.match(/- \*\*(.+?)\*\* \| (.+)/);
      if (match) {
        currentItem = {
          title: match[1],
          period: match[2],
          details: [],
        };
      }
    } else if (line.startsWith("  - ") && currentItem) {
      currentItem.details.push(line.replace("  - ", "").trim());
    } else if (line.startsWith("- ") && currentSection === "certifications") {
      certifications.push(line.replace("- ", "").trim());
    }
  }

  flushCurrentItem(currentSection);

  return { internships, awards, certifications };
}

function parsePortfolioMarkdown(content: string): PortfolioProject[] {
  const projects: PortfolioProject[] = [];
  const projectBlocks = content.split("---").filter((block) => block.trim());

  for (const block of projectBlocks) {
    if (!block.includes("###")) continue;

    const lines = block.split("\n").filter((line) => line.trim());
    const project: PortfolioProject = {
      title: "",
      category: "",
      year: "",
      description: "",
      tags: [],
      color: "",
      link: "",
    };

    for (const line of lines) {
      if (line.startsWith("### ")) {
        project.title = line.replace("### ", "").trim();
      } else if (line.startsWith("category:")) {
        project.category = line.replace("category:", "").trim();
      } else if (line.startsWith("year:")) {
        project.year = line.replace("year:", "").trim();
      } else if (line.startsWith("description:")) {
        project.description = line.replace("description:", "").trim();
      } else if (line.startsWith("tags:")) {
        project.tags = line
          .replace("tags:", "")
          .trim()
          .split(",")
          .map((t) => t.trim());
      } else if (line.startsWith("color:")) {
        project.color = line.replace("color:", "").trim();
      } else if (line.startsWith("link:")) {
        project.link = line.replace("link:", "").trim();
      }
    }

    if (project.title) {
      projects.push(project);
    }
  }

  return projects;
}

function parseContactMarkdown(content: string): ContactData {
  let email = "";
  let phone = "";
  const social: { platform: string; url: string }[] = [];
  let message = "";
  let availability = "";

  let currentSection = "";
  const lines = content.split("\n");

  for (const line of lines) {
    if (line.startsWith("email:")) {
      email = line.replace("email:", "").trim();
    } else if (line.startsWith("phone:")) {
      phone = line.replace("phone:", "").trim();
    } else if (line.startsWith("availability:")) {
      availability = line.replace("availability:", "").trim();
    } else if (line.startsWith("## Social")) {
      currentSection = "social";
    } else if (line.startsWith("## 협업 문의")) {
      currentSection = "message";
    } else if (line.startsWith("- **") && currentSection === "social") {
      const match = line.match(/- \*\*(.+?)\*\* \| (.+)/);
      if (match) {
        social.push({ platform: match[1], url: match[2] });
      }
    } else if (currentSection === "message" && !line.startsWith("#") && line.trim()) {
      message += (message ? " " : "") + line.trim();
    }
  }

  return { email, phone, social, message, availability };
}

export function getAboutData(): AboutData {
  const filePath = path.join(contentDirectory, "about.md");
  const content = fs.readFileSync(filePath, "utf8");
  return parseAboutMarkdown(content);
}

export function getExperienceData(): ExperienceData {
  const filePath = path.join(contentDirectory, "experience.md");
  const content = fs.readFileSync(filePath, "utf8");
  return parseExperienceMarkdown(content);
}

export function getPortfolioData(): PortfolioProject[] {
  const filePath = path.join(contentDirectory, "portfolio.md");
  const content = fs.readFileSync(filePath, "utf8");
  return parsePortfolioMarkdown(content);
}

export function getContactData(): ContactData {
  const filePath = path.join(contentDirectory, "contact.md");
  const content = fs.readFileSync(filePath, "utf8");
  return parseContactMarkdown(content);
}

