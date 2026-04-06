import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader"; // adjust path as needed
import DashboardClient from "./DashBoardClient";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen">
      {/* Integrated Header */}
      <DashboardHeader />

      <main className="p-8 w-full max-w-[1400px] mx-auto">
        <DashboardClient />
      </main>
    </div>
  );
}