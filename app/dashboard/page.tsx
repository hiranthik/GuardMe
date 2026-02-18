// app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/logout/LogoutButton";
import DashboardClient from "./DashBoardClient"; // Import the client wrapper
import { LiteracyCard } from "@/components/dashboard/kpis/LiteracyCard";
import { AwarenessCard } from "@/components/dashboard/kpis/AwarenessCard";
import { AccessCard } from "@/components/dashboard/kpis/AccessCard";
import { AtRiskCardCard } from "@/components/dashboard/kpis/AtRiskCard";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header / Nav */}
      <nav className="flex justify-between items-center p-4 bg-white border-b shadow-sm">
        <span className="font-bold text-xl text-blue-600">GuardME</span>
        <LogoutButton />
      </nav>

      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Welcome back, {session.user?.name}</h1>
        
        {/* Render the Client Component that does the fetching */}
        <DashboardClient />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        <LiteracyCard />
        <AwarenessCard />
        <AccessCard/>
        <AtRiskCardCard/>
        </div>
      </main>
    </div>
  );
}