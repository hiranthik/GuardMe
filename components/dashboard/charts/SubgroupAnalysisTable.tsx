'use client';

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Button,
} from '@tremor/react';

interface SubgroupAnalysisTableProps {
  rawData: any[];
}

const GROUPS = [
  'First-year - International',
  'First-year - Domestic',
  'Upper-year - International',
  'Upper-year - Domestic',
];

export default function SubgroupAnalysisTable({ rawData }: SubgroupAnalysisTableProps) {

  const stats: Record<string, { totalScore: number; count: number; access: number; awareness: number }> = {
    'First-year - International': { totalScore: 0, count: 0, access: 0, awareness: 0 },
    'First-year - Domestic':      { totalScore: 0, count: 0, access: 0, awareness: 0 },
    'Upper-year - International': { totalScore: 0, count: 0, access: 0, awareness: 0 },
    'Upper-year - Domestic':      { totalScore: 0, count: 0, access: 0, awareness: 0 },
  };

  if (!rawData || rawData.length === 0) {
    return <Card className="p-6 h-72 flex items-center justify-center">No data available</Card>;
  }

  rawData.forEach((row) => {
    const scoreRaw      = Array.isArray(row[0])  ? row[0][0]  : row[0];  // column A
    const yearRaw       = Array.isArray(row[2])  ? row[2][0]  : row[2];  // column C
    const domIntRaw     = Array.isArray(row[5])  ? row[5][0]  : row[5];  // column F
    const accessRaw     = Array.isArray(row[6])  ? row[6][0]  : row[6];  // column G
    const quickHelpRaw  = Array.isArray(row[16]) ? row[16][0] : row[16]; // column Q
    const confidRaw     = Array.isArray(row[26]) ? row[26][0] : row[26]; // column AA
    const afterHoursRaw = Array.isArray(row[19]) ? row[19][0] : row[19]; // column T

    const score = parseFloat(String(scoreRaw).split('/')[0].trim());
    if (isNaN(score)) return;

    const isFirstYear       = String(yearRaw).toLowerCase().includes('first');
    const isInternational   = String(domIntRaw).toLowerCase().includes('international');
    const isAccess          = String(accessRaw).toLowerCase().includes('yes');
    const isQuickHelp       = String(quickHelpRaw).toLowerCase().includes('by calling 988');
    const isConfidentiality = row[26] === true || String(confidRaw).toLowerCase() === 'true';
    const isAfterHours      = String(afterHoursRaw).toLowerCase().includes('yes');

    const awarenessScore = (isQuickHelp ? 1 : 0) + (isConfidentiality ? 1 : 0) + (isAfterHours ? 1 : 0);

    const year   = isFirstYear     ? 'First-year'    : 'Upper-year';
    const origin = isInternational ? 'International' : 'Domestic';
    const group  = `${year} - ${origin}`;

    if (stats[group]) {
      stats[group].totalScore += score;
      stats[group].count      += 1;
      if (isAccess) stats[group].access += 1;
      stats[group].awareness += awarenessScore;
    }
  });

  const tableData = GROUPS.map((group) => {
    const g = stats[group];
    return {
      group,
      // % of questions this group got right on average
      literacy: g.count > 0
        ? `${((g.totalScore / (g.count * 20)) * 100).toFixed(1)}%`
        : '0%',
      // % of students in this group who said yes to access
      access: g.count > 0
        ? `${((g.access / g.count) * 100).toFixed(1)}%`
        : '0%',
      // % of possible awareness points this group scored (max 3 per student)
      awareness: g.count > 0
        ? `${((g.awareness / (g.count * 3)) * 100).toFixed(1)}%`
        : '0%',
      count: g.count,
    };
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Subgroup Analysis</h3>
        <Button
          variant="secondary"
          size="xs"
          className="rounded-full bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
        >
          Export CSV
        </Button>
      </div>

      <Table>
        <TableHead className="bg-slate-50/50">
          <TableRow>
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">GROUP</TableHeaderCell>
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">LITERACY</TableHeaderCell>
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">ACCESS</TableHeaderCell>
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">AWARENESS</TableHeaderCell>
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">COUNT</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.group} className="hover:bg-slate-50/50 transition-colors">
              <TableCell className="text-sm font-semibold text-slate-700 max-w-[150px] whitespace-normal leading-tight">
                {item.group}
              </TableCell>
              <TableCell className="text-sm font-medium text-slate-600">{item.literacy}</TableCell>
              <TableCell className="text-sm font-medium text-slate-600">{item.access}</TableCell>
              <TableCell className="text-sm font-medium text-slate-600">{item.awareness}</TableCell>
              <TableCell className="text-sm font-medium text-slate-600">{item.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}