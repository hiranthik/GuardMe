"use client";

import LiteracyKpiCard from "@/components/LiteracyKpiCard";
import { useQuery } from "@tanstack/react-query";

function computeOverallLiteracy(rows: string[][] | null): number {
  if (!rows || rows.length === 0) return 0;

  const totalStudents = rows.length;
  const totalQuestions = 20;

  const totalCorrect = rows.reduce((sum, row) => {
    const scoreCell = row[0];
    if (!scoreCell) return sum;

    const [scoreStr] = scoreCell.split("/");
    const scoreNum = parseInt(scoreStr.trim(), 10);

    return sum + (isNaN(scoreNum) ? 0 : scoreNum);
  }, 0);

  return (totalCorrect / (totalStudents * totalQuestions)) * 100;
}

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["survey-rows"],
    queryFn: async () => {
      const res = await fetch("/api/survey");
      if (!res.ok) throw new Error("Failed to fetch survey data");
      return res.json();
    },
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const rows = data?.rows ?? [];
  const literacyRate = computeOverallLiteracy(rows);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error loading data</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <LiteracyKpiCard
  literacyScore={literacyRate}
  totalRows={rows.length}
/>
    </main>
  );
}
