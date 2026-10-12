import type { Metadata } from "next";
import ServicesSection from "../components/services/ServicesSection";
import { getContent } from "../lib/content/store";

export const metadata: Metadata = {
  title: "Services | Md. Rafidul Islam",
  description:
    "Web development, AI integration, SaaS products, mobile apps, APIs, UI/UX design, A/B testing, performance and consulting by Md. Rafidul Islam.",
};

const ServicesPage = async () => {
  const services = await getContent("services");
  return <ServicesSection services={services} titleAs="h1" showProcess showCta />;
};

export default ServicesPage;
