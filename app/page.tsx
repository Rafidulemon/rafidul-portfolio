import HomeClient from "./components/home/HomeClient";
import { getContent } from "./lib/content/store";

export default async function HomePage() {
  const [about, skills, services, projects] = await Promise.all([
    getContent("about"),
    getContent("skills"),
    getContent("services"),
    getContent("projects"),
  ]);
  return (
    <HomeClient about={about} skills={skills} services={services} projects={projects} />
  );
}
