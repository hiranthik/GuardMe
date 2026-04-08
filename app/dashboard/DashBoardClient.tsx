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

interface DashboardClient0 {
  role: string | null | undefined;
}

export default function DashboardClient1({ role }: DashboardClient0) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['responseData'],
    queryFn: () => fetch('/api/survey').then((res) => res.json()),
    refetchInterval: 30000, //polling every 30secs
    
  });

  if (isLoading) return <div className="p-8">Loading stats...</div>;
  if (error) return <div className="p-8 text-red-500">Failed to load data. Please try again.</div>;

  const rowData = data?.rows || [];

  //exporting datasets for admins
  const handleExport = () => {
    const csvContent = rowData.map((row: any[]) => row.join(',')).join('\n');
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'survey-data.csv';
    downloadLink.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-8 w-full">
      <Sidebar onExport={role === 'admin' ? handleExport : undefined} />
      <div className="flex-1 space-y-8">

  
        <section id="overview" className="scroll-mt-8">
          <div className=" sm:grid-cols-2 lg:grid-cols-4  w-full dashboardcards">
            <KPICards rawData={rowData} />
          </div>
        </section>

    
        <section id="literacy" className="scroll-mt-8">
          <div className="lg:grid-cols-3 dashboardcards">
            <div className="lg:col-span-2">
              <LiteracyTrendChart rawData={rowData} />
            </div>
            <div className="lg:col-span-1" id="awareness">
              <AwarenessSnapshot rawData={rowData} />
            </div>
          </div>
        </section>

      
        <section id="access" className="scroll-mt-8">
          <div className="lg:grid-cols-2 dashboardcards">
            <CampusLiteracyChart rawData={rowData} />
            <SubgroupAnalysisTable rawData={rowData} />
          </div>
        </section>

     
        <section id="barriers" className="scroll-mt-8">
          <div className=" lg:grid-cols-2 dashboardcards w-full">
            <TopBarriers rawData={rowData} />
            <Methodology />
          </div>
        </section>

      </div>
    </div>
  );
}