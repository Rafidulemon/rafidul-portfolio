import { redirect } from "next/navigation";
import { isAdmin } from "@/app/lib/admin/guard";
import AdminShell from "../_components/AdminShell";

// Never cache or prerender anything behind the login.
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  // Middleware already redirects, but the layout re-checks so protection never depends on it alone.
  if (!(await isAdmin())) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
