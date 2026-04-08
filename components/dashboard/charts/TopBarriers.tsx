'use client';

import { Card } from '@tremor/react';

interface TopBarriersProps {
  rawData:any[];
}

export function TopBarriers({ rawData }: TopBarriersProps) {

  if (!rawData || rawData.length === 0) {
    return <Card className="p-6 h-48 flex items-center justify-center">No data available</Card>;
  }

  const barrierCount:Record<string, number> = {};

  rawData.forEach((row) => {
    const barrierRaw = Array.isArray(row[28]) ? row[28][0] : row[28]; 
    if (!barrierRaw) return;

    const barriers= String(barrierRaw).split(/[,;]/).map((b) => b.trim()).filter(Boolean);
    barriers.forEach((barrier) => {
      barrierCount[barrier] =(barrierCount[barrier] || 0) + 1;
    });
  });

  const sorted= Object.entries(barrierCount).sort((a, b) => b[1] - a[1]);
  const maxCount =sorted[0]?.[1] || 1;

  const getColor =(count: number) => {
    const intensity =count / maxCount;
    const opacity= 0.2 + intensity * 0.8;

    return {
      backgroundImage:`linear-gradient(
        135deg,
        rgba(196, 167, 255, ${opacity * 0.4}) 0%,
        rgba(167, 139, 250, ${opacity}) 50%,
        rgba(139, 92, 246, ${opacity}) 100%
      )`,
      color:intensity > 0.5 ?'#000000':'#000000',
    };
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Top Barriers by Demographic
      </h3>

      <div className="flex flex-wrap gap-3 mb-6">
      {sorted.map(([barrier, count]) => (
        <span
            key={barrier}
            style={getColor(count)}
            className="px-6 py-2 rounded-xl border text-sm font-medium shadow-sm cursor-default"
            title={`${count} response${count !== 1 ? 's' : ''}`}
        >
          {barrier}
          </span>
        ))}
      </div>

      <p className="text-xs text-slate-400 italic">
        Legend: lighter = lower frequency; darker = higher frequency. Ordered by most common.
      </p>
    </Card>
  );
}