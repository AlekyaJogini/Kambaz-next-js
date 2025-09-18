import { redirect } from "next/navigation";

export default function CoursesPage({ params }: { params: { cid: string } }) {
  const { cid } = params;

  // Optional: Check if cid is valid
  if (!cid) {
    // Handle the error case as needed, for instance, you can redirect to a 404 page or a default path
    redirect("/404");
    return null; // Return null to satisfy the function signature
  }

  redirect(`/Courses/${cid}/Home`);
}