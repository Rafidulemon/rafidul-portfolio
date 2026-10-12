import { notFound } from "next/navigation";
import SectionEditor from "../../_components/SectionEditor";
import { SECTIONS } from "../../_components/specs";

export default function SectionPage({ params }: { params: { section: string } }) {
  if (!SECTIONS[params.section]) notFound();
  return <SectionEditor sectionKey={params.section} />;
}
