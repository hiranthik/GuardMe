'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts';
import { Card } from '@tremor/react';

interface CampusChartProps {
  rawData: any[];
}

export default function CampusLiteracyChart({ rawData }: CampusChartProps) {
  // ✅ Track total earned + total possible
  const stats: Record<string, { total: number; maxTotal: number }> = {
    'Sault Ste. Marie': { total: 0, maxTotal: 0 },
    'Brampton': { total: 0, maxTotal: 0 },
    'Timmins': { total: 0, maxTotal: 0 },
  };

  if (!rawData || rawData.length === 0) {
    return <Card>No data available</Card>;
  }

  // ✅ Safe parsing
  rawData.forEach((row) => {
    const campus = row[1];
    const scoreStr = row[0];

    if (!scoreStr || !campus) return;

    const [scoreRaw, maxRaw] = String(scoreStr).split('/');
    const score = parseFloat(scoreRaw?.trim());
    const max = parseFloat(maxRaw?.trim());

    if (stats[campus] && !isNaN(score) && !isNaN(max)) {
      stats[campus].total += score;
      stats[campus].maxTotal += max;
    }
  });

  // ✅ Correct percentage calculation
  const chartData = Object.keys(stats).map((name) => ({
    name,
    value:
      stats[name].maxTotal > 0
        ? Math.round((stats[name].total / stats[name].maxTotal) * 100)
        : 0,
  }));

  // 🎨 Per-bar colors
  const COLORS: Record<string, string> = {
    'Sault Ste. Marie': '#9374dd',
    'Brampton': '#7274e7',
    'Timmins': '#22c7e4',
  };

  return (
    <Card >
      <h3 className="text-lg font-bold mb-4">By Campus — Literacy</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barCategoryGap="15%">
          <XAxis 
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#838388', fontSize: 11, fontWeight: 500 }} />
          
          <YAxis 
          domain={[0, 100]} 
          tickFormatter={(v) => `${v}%`}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#838388', fontSize: 11, fontWeight: 500 }} />
          
          <CartesianGrid
          vertical={false}
          stroke="#e5e0f0"
          strokeWidth={1}
          />

          <Tooltip
            formatter={(value) =>
              typeof value === 'number' ? `${value}%` : value
            }
          />

          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || '#8884d8'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}