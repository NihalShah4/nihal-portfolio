import HomeClient from "./HomeClient";

// Projects: pulled from your existing content/projects.ts
import { projects as allProjects } from "@/content/projects";

type ProjectItem = {
  title: string;
  slug: string;
  outcome: string;
  tags: string[];
  tech: string[];
};

export default async function Page() {
  // Normalize projects into the shape HomeClient expects
  const featuredProjects: ProjectItem[] = (allProjects || []).map((p: any) => ({
    title: p.title,
    slug: p.slug,
    outcome: p.outcome,
    tags: p.tags || [],
    tech: p.tech || [],
  }));

  return <HomeClient featuredProjects={featuredProjects} />;
}
