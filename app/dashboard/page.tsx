import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardClient from "./DashBoardClient";


export default async function DashboardPage(){
  const userSession = await auth();
  if(!userSession)redirect('/login')
    if (!userSession.user.role) redirect('/unauthorized')

      return (
        
        <div className="min-h-screen">
          <DashboardHeader/>
          <main className="p-8 w-full max-w-[1400px] mx-auto">
            <DashboardClient role={sessionStorage.user.role}></DashboardClient>
        </main>
        </div>
      )
}