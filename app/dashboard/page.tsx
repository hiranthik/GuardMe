"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";


export default function DashboardPage() {
  const [stats, setStats] = useState<{ totalResponses: number; averageRating: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/survey");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <main className="p-8">
      <h1>Dashboard</h1>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>Log out</button>

      {loading && <p>Loading...</p>}
      {!loading && stats && (
        <div>
          <p>Total Responses: {stats.totalResponses}</p>
          <p>Average Rating: {stats.averageRating}</p>
        </div>
      )}
    </main>
  );
}
