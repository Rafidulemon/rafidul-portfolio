import { notFound } from "next/navigation";
import BlogEditor from "../../../_components/BlogEditor";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  return <BlogEditor postId={id} />;
}
