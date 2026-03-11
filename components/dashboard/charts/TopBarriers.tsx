import { Card, Badge, List, ListItem } from '@tremor/react';

export function TopBarriers() {
  const barriers = [
    { name: "Stigma", color: "bg-blue-50 text-blue-700 border-blue-100" },
    { name: "Wait Times", color: "bg-slate-50 text-slate-700 border-slate-100" },
    { name: "Cost", color: "bg-slate-50 text-slate-700 border-slate-100" },
    { name: "Language", color: "bg-slate-50 text-slate-700 border-slate-100" },
    { name: "Location", color: "bg-slate-50 text-slate-700 border-slate-100" },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Top Barriers by Demographic (Mock)
      </h3>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {barriers.map((barrier) => (
          <span
            key={barrier.name}
            className={`px-6 py-2 rounded-xl border text-sm font-medium shadow-sm cursor-default ${barrier.color}`}
          >
            {barrier.name}
          </span>
        ))}
      </div>
      
      <p className="text-xs text-slate-400 italic">
        Legend: lighter = lower frequency; darker = higher frequency (mock data for layout only).
      </p>
    </Card>
  );
}