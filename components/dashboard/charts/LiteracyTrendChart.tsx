'use client';

import { useState } from 'react';
import { DateRangePicker, DateRangePickerValue } from '@tremor/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LiteracyTrendChartProps {
  rawData: any[];
}

export default function LiteracyTrendChart({ rawData }: LiteracyTrendChartProps) {

  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: undefined,
    to: undefined,
  });

  if (!rawData || rawData.length === 0) {
    return <div className="p-10 bg-white rounded-xl border border-gray-200">No data available</div>;
  }

  const dateMap: Record<string, {
    totalScore: number; count: number;
    firstYearScore: number; firstYearCount: number;
    intlScore: number; intlCount: number;
  }> = {};

  rawData.forEach((row) => {
    const scoreRaw     = Array.isArray(row[29]) ? row[29][0] : row[29]; // col AD = index 29
    const yearRaw      = Array.isArray(row[2])  ? row[2][0]  : row[2];  // col C  = index 2
    const domIntRaw    = Array.isArray(row[5])  ? row[5][0]  : row[5];  // col F  = index 5
    const timestampRaw = Array.isArray(row[0])  ? row[0][0]  : row[0];  // col A  = index 0

    const score = parseFloat(String(scoreRaw).trim());
    if (isNaN(score)) return;

    const isFirstYear     = String(yearRaw).toLowerCase().includes('first');
    const isInternational = String(domIntRaw).toLowerCase().includes('international');

    // Handle both ISO and Google Sheets date formats
    const rawStr = String(timestampRaw);
    const parsed = new Date(rawStr);
    let date: string | null = null;

    if (!isNaN(parsed.getTime())) {
      date = parsed.toISOString().split('T')[0];
    } else {
      const parts = rawStr.split(' ')[0].split('/');
      if (parts.length === 3) {
        const [m, d, y] = parts;
        date = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      }
    }

    if (!date) return;

    if (!dateMap[date]) {
      dateMap[date] = { totalScore: 0, count: 0, firstYearScore: 0, firstYearCount: 0, intlScore: 0, intlCount: 0 };
    }

    dateMap[date].totalScore += score;
    dateMap[date].count += 1;
    if (isFirstYear)     { dateMap[date].firstYearScore += score; dateMap[date].firstYearCount += 1; }
    if (isInternational) { dateMap[date].intlScore      += score; dateMap[date].intlCount      += 1; }
  });

  const dates = Object.keys(dateMap).sort();

  const allChartData = dates.map((date) => {
    const d = dateMap[date];
    return {
      date,
      Overall:       d.count          > 0 ? Math.round((d.totalScore     / d.count          / 20) * 100) : null,
      'First Year':  d.firstYearCount > 0 ? Math.round((d.firstYearScore / d.firstYearCount / 20) * 100) : null,
      International: d.intlCount      > 0 ? Math.round((d.intlScore      / d.intlCount      / 20) * 100) : null,
    };
  });

  const filteredData = allChartData.filter((item) => {
    if (!dateRange.from && !dateRange.to) return true;
    const itemDate = new Date(item.date);
    if (dateRange.from && itemDate < dateRange.from) return false;
    if (dateRange.to   && itemDate > dateRange.to)   return false;
    return true;
  });

  const chartData = filteredData.map((item) => ({
    ...item,
    label: new Date(item.date + 'T00:00:00').toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  const allValues = chartData.flatMap(d => [d.Overall, d['First Year'], d.International]).filter(Boolean) as number[];
  const minVal = allValues.length > 0 ? Math.floor(Math.min(...allValues) / 5) * 5 - 5 : 0;

  const CustomLegend = () => (
    <div className="flex items-center gap-6">
      {[
        { label: 'Overall',       color: '#3b82f6' },
        { label: 'First Year',    color: '#8b5cf6' },
        { label: 'International', color: '#06b6d4' },
      ].map(({ label, color }) => (
        <div key={label} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-sm text-gray-600 font-medium">{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 bg-white rounded-xl border border-gray-200 shadow-sm w-full">

      {/* Header row with title + legend */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h3 className="text-lg font-bold text-gray-800">
          Literacy Trends
        </h3>
        <CustomLegend />
      </div>

      {/* Tremor DateRangePicker */}
      <div className="flex items-center gap-4 mb-6">
        <DateRangePicker
          value={dateRange}
          onValueChange={(value) => setDateRange(value)}
          enableSelect={false}
        />
        <button
          onClick={() => setDateRange({ from: undefined, to: undefined })}
          className="text-sm text-slate-500 hover:text-slate-700 underline"
        >
          Reset
        </button>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              domain={[minVal, 100]}
              width={45}
            />
            <Tooltip
              formatter={(value) => [`${value}%`]}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
            />
            <Line
              type="monotone"
              dataKey="Overall"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }}
              activeDot={{ r: 7 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="First Year"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              dot={{ r: 5, fill: '#8b5cf6', strokeWidth: 0 }}
              activeDot={{ r: 7 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="International"
              stroke="#06b6d4"
              strokeWidth={2.5}
              dot={{ r: 5, fill: '#06b6d4', strokeWidth: 0 }}
              activeDot={{ r: 7 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}