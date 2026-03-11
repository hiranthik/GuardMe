'use client';

import { BarChart, Card } from '@tremor/react';

const chartData = [
  {
    name: 'Sault Ste. Marie',
    'Literacy Rate': 65,
  },
  {
    name: 'Brampton',
    'Literacy Rate': 66,
  },
  {
    name: 'Timmins',
    'Literacy Rate': 66,
  },
];

const dataFormatter = (number: number) => {
  return `${number}%`;
};

export default function CampusLiteracyChart() {
  return (
    <Card className="p-86">
      <h3 className="text-lg font-bold text-slate-800 mb-8 px-6 pt-4">
        By Campus — Literacy
      </h3>
      
      <BarChart
        className="mt-4 h-72 px-4"
        data={chartData}
        index="name"
        categories={['Literacy Rate']}
        colors={['blue', 'indigo', 'cyan']} 
        valueFormatter={dataFormatter}
        yAxisWidth={48}
        showLegend={false}
        showGridLines={false}
        // This creates the rounded look from your screenshot
        customTooltip={undefined} 
      />
    </Card>
  );
}