// app/dashboard/DashboardClient.tsx
'use client';

import { useQuery } from '@tanstack/react-query';


export default function DashboardClient() {
  // Fetch data from your API route (/api/survey)
  const { data, isLoading, error } = useQuery({
    queryKey: ['surveyData'],
    queryFn: () => fetch('/api/survey').then((res) => res.json()),
    refetchInterval: 60000, // Refresh every 60 seconds
  });

  if (isLoading) return <div className="p-8">Loading stats...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading data.</div>;

  // Now we define 'rows' correctly from the API response
  const rows = data?.rows || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    
    </div>
  );
}