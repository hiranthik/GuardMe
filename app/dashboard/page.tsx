"use client";

import { useQuery} from "@tanstack/react-query";
import { signOut } from "next-auth/react";


type SurveyStats = {
  totalResponses:number;
  averageRating:number;

};

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery<SurveyStats>({
    queryKey: ["survey-stats"],
    queryFn: async () => {
      const res = await fetch("/api/survey");
      if (!res.ok) throw new Error("Failed to fetch survey stats");
      return res.json();
    },

    // 🔥 Poll every 30 seconds
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <main className="p-8">
      <h1>Dashboard</h1>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mb-4"
      >
        Log out
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading stats</p>}

      {data && (
        <div>
          <p>Total Responses: {data.totalResponses}</p>
          <p>Average Rating: {data.averageRating}</p>
        </div>
      )}
    </main>
  );
}
