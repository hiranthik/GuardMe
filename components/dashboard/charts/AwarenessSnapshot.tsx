'use client';

import { Card, DonutChart, List, ListItem } from '@tremor/react';

const chartData = [
  { name: 'Quick help', amount: 60, color: 'bg-blue-500' },
  { name: 'Crisis resource', amount: 55, color: 'bg-indigo-500' },
  { name: 'After-hours path', amount: 60, color: 'bg-cyan-500' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AwarenessSnapshot() {
  return (
    <Card className="max-w-md mx-auto p-6 border-blue-200">
      <h3 className="text-lg font-bold text-slate-800 mb-8 px-6 ">
        Awareness Snapshot
      </h3>

      {/* Top Metric Cards */}
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

      {/* The Chart Area */}
      <div className="flex flex-col items-center">
        <DonutChart
          data={chartData}
          category="amount"
          index="name"
          colors={['blue', 'indigo', 'cyan']}
          showLabel={false}
          className="h-52 w-52"
         
          variant="donut"
         
        />

        {/* Legend using the List component logic from the working example */}
        <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-3">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <span
                className={classNames(
                  item.color,
                  'h-2 w-6 rounded-full shrink-0'
                )}
                aria-hidden={true}
              />
              <span className="text-sm font-medium text-slate-600 truncate">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}