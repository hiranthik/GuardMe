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

interface CampusChart {
  rawData:any[];
}

export default function CampusLiteracyChart({rawData}:CampusChart) {
  const campusData: Record<string, {total: number;count:number }> = {
    'Sault Ste. Marie': {total: 0,count:0},
    'Brampton':{ total: 0,count:0},
    'Timmins':{total: 0, count:0},
  };

  if (!rawData || rawData.length === 0) {
    return <Card>No data available</Card>;
  }

  rawData.forEach((row) => {
    const campus = Array.isArray(row[1])? row[1][0]:row[1]; 
    const rawScore = Array.isArray(row[29])?row[29][0]:row[29]; 

    if (!rawScore||!campus)return;

    const score = parseFloat(String(rawScore).trim())

    if (campusData[campus] && !isNaN(score)) {
      campusData[campus].total += score;
      campusData[campus].count += 1;
    }
  });

  const chartData = Object.keys(campusData).map((name) => ({
    name,
    value: campusData[name].count > 0
      ? Math.round((campusData[name].total / campusData[name].count / 20) * 100)
      : 0,
  }))

  const barChartColors: Record<string, string> = {
    'Sault Ste. Marie':'#9374dd',
    'Brampton':'#7274e7',
    'Timmins':'#22c7e4',
  }

  return (
    <Card>
      <h3 className="text-lg font-bold mb-4">By Campus — Literacy Rates</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barCategoryGap="15%">
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#838388', fontSize: 11,fontWeight:500 }}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            axisLine={false}
            tickLine={false}
            tick={{ fill:'#838388',fontSize:11, fontWeight: 500 }}
          />
          <CartesianGrid
            vertical={false}
            stroke="#e5e0f0"
            strokeWidth={1}
          />
          <Tooltip
            formatter={(value) =>
              typeof value ==='number' ? `${value}%`: value
            }
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={barChartColors[entry.name]||'#8884d8'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}