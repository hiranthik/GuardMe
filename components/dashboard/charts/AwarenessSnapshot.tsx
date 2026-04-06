'use client';

import { Card, DonutChart } from '@tremor/react';

interface AwarenessSnapshotProps {
  rawData: any[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AwarenessSnapshot({ rawData }: AwarenessSnapshotProps) {

  if (!rawData || rawData.length === 0) {
    return <Card className="p-6 h-72 flex items-center justify-center">No data available</Card>;
  }

  const total = rawData.length;
  let quickHelp = 0;
  let crisis = 0;
  let afterHours = 0;

  rawData.forEach((row) => {
   const quickHelpRaw = Array.isArray(row[16]) ? row[16][0] : row[16];
   if (String(quickHelpRaw).toLowerCase().includes('by calling 988')) quickHelp += 1; // column Q
   
    const crisisRaw = Array.isArray(row[18]) ? row[18][0] : row[18];
    if (String (crisisRaw).toLowerCase().includes('crisis')) crisis +=1;

    const afterHoursRaw = Array.isArray(row[19]) ? row[19][0] : row[19]; // column T
     if (String (afterHoursRaw).toLowerCase().includes('988 and guard me')) afterHours +=1;
  });

  const chartData = [
    { name: 'Quick help', amount: Math.round((quickHelp / total) * 100), color: 'bg-blue-500' },
    { name: 'Crisis resources', amount: Math.round((crisis / total) * 100), color: 'bg-indigo-500' },
    { name: 'After-hours path', amount: Math.round((afterHours / total) * 100), color: 'bg-cyan-500' },
  ];

  return (

    <Card className="max-w-md mx-auto p-6 Card">
      <h3 className="text-lg font-bold mb-4">
        Awareness Snapshot
      </h3>

      <div className="grid grid-cols-3 gap-2 mb-8">
        {chartData.map((item) => (
          <div key={item.name} className="border border-blue-100 p-3 bg-white">
            <p className="text-[10px] font-bold text-slate-500 uppercase leading-tight">
              {item.name} <br /> PATH
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {item.amount}%
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <DonutChart
          data={chartData}
          category="amount"
          index="name"
          colors={['blue', 'indigo', 'cyan']}
          showLabel={false}
          className="h-52 w-52"
          variant="donut"
          valueFormatter={(value) => `${value}%`}
        />

        <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-3">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <span
                className={classNames(item.color, 'h-2 w-6 rounded-full shrink-0')}
                aria-hidden={true}
              />
              <span className="text-sm font-medium text-slate-600 leading-none">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}