'use client';

import AwarenessSnapshot from '@/components/dashboard/charts/AwarenessSnapshot';
import CampusLiteracyChart from '@/components/dashboard/charts/CampusLiteracyChart';
import LiteracyTrendChart from '@/components/dashboard/charts/LiteracyTrendChart';
import { Methodology } from '@/components/dashboard/charts/Methodology';
import SubgroupAnalysisTable from '@/components/dashboard/charts/SubgroupAnalysisTable';
import { TopBarriers } from '@/components/dashboard/charts/TopBarriers';
import KPICards from '@/components/dashboard/kpis/KPICards';
import Sidebar from '@/components/dashboard/Sidebar';
import { useQuery } from '@tanstack/react-query';

interface DashboardClientProps {
  role: string | null | undefined;
}

export default function DashboardClient({ role }: DashboardClientProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['surveyData'],
    queryFn: () => fetch('/api/survey').then((res) => res.json()),
    refetchInterval: 30000,
  });

  if (isLoading) return <div className="p-8">Loading stats...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading data.</div>;

  const rows = data?.rows || [];

  const handleExport = () => {
    const csv = rows.map((row: any[]) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survey-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-8 w-full">

      {/* Sidebar — only pass onExport if admin */}
      <Sidebar onExport={role === 'admin' ? handleExport : undefined} />

      {/* Main content */}
      <div className="flex-1 space-y-8 min-w-0">

        {/* KPI Cards */}
        <section id="overview" className="scroll-mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <KPICards rawData={rows} />
          </div>
        </section>

        {/* Literacy */}
        <section id="literacy" className="scroll-mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
            <div className="lg:col-span-2">
              <LiteracyTrendChart rawData={rows} />
            </div>
            <div className="lg:col-span-1" id="awareness">
              <AwarenessSnapshot rawData={rows} />
            </div>
          </div>
        </section>

        {/* Access and Usage */}
        <section id="access" className="scroll-mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <CampusLiteracyChart rawData={rows} />
            <SubgroupAnalysisTable rawData={rows} />
          </div>
        </section>

        {/* Barriers */}
        <section id="barriers" className="scroll-mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <TopBarriers rawData={rows} />
            <Methodology />
          </div>
        </section>

      </div>
    </div>
  );
}