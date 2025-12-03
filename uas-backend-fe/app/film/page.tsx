import { redirect } from "next/navigation";

export default function FilmListPage() {
  // Redirect /film to homepage since listing page is removed
  redirect("/");
  return null;
}
