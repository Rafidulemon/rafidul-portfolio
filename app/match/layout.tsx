import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Job Match | Md. Rafidul Islam",
  description:
    "Paste a job description and get an honest, AI-generated match report against Md. Rafidul Islam's real experience and projects.",
};

export default function MatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
