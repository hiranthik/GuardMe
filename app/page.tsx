//homepage
// app/page.tsx
//automatically becomes a child for layout 
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login");
}
