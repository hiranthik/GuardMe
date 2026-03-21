'use client';

import { BarChart, Card } from '@tremor/react';

interface CampusChartProps {
  rawData: any[];
}

const dataFormatter = (number: number) => `${number}%`;

export default function CampusLiteracyChart({ rawData }: CampusChartProps) {
  
  const stats: Record<string, { total: number; count: number }> = {
    'Sault Ste. Marie': { total: 0, count: 0 },
    'Brampton': { total: 0, count: 0 },
    'Timmins': { total: 0, count: 0 },
  };

  if (!rawData || rawData.length === 0) {
    return <Card className="p-6 h-72 flex items-center justify-center">No data available</Card>;
  }

  // 👇 replaced block goes here
  rawData.forEach((row) => {
    const campus = row[1];
    const scoreStr = row[0];
    const score = parseFloat(scoreStr.split('/')[0].trim());

    if (stats[campus]) {
      stats[campus].total += score;
      stats[campus].count += 1;
    }
  });

  const chartData = Object.keys(stats).map((name) => ({
    name,
    'Literacy Rate': stats[name].count > 0
      ? Math.round((stats[name].total / stats[name].count / 20) * 100)
      : 0,
  }));
  console.log('First row:', JSON.stringify(rawData[0]));
console.log('Campus names:', [...new Set(rawData.map((r: any) => r[1]))]);
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-8 px-2">
        By Campus — Literacy
      </h3>
      <BarChart
        className="mt-4 h-72"
        data={chartData}
        index="name"
        categories={['Literacy Rate']}
        colors={['blue', 'indigo', 'cyan']}
        valueFormatter={dataFormatter}
        showLegend={false}
        showGridLines={false}
      />
    </Card>
  );

}
