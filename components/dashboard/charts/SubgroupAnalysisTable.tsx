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

  const stats: Record<string, { totalScore: number; count: number; access:number }> = {
    'First-year - International': { totalScore: 0, count: 0 , access: 0},
    'First-year - Domestic': { totalScore: 0, count: 0, access: 0 },
    'Upper-year - International': { totalScore: 0, count: 0, access: 0 },
    'Upper-year - Domestic': { totalScore: 0, count: 0, access: 0 },
  };

  if (!rawData || rawData.length === 0) {
    return <Card className="p-6 h-72 flex items-center justify-center">No data available</Card>;
  }

  rawData.forEach((row) => {
    const scoreRaw = Array.isArray(row[0]) ? row[0][0] : row[0];
    const yearRaw = Array.isArray(row[2]) ? row[2][0] : row[2]; // column C
    const domIntRaw = Array.isArray(row[5]) ? row[5][0] : row[5]; // column F
    const accessInt = Array.isArray(row[28]) ?row[28][0] : row[28] // column AC

    const score = parseFloat(String(scoreRaw).split('/')[0].trim());
    const isFirstYear = String(yearRaw).toLowerCase().includes('first');
    const isInternational = String(domIntRaw).toLowerCase().includes('international');
    const isAccess = String(accessInt).toLowerCase().includes('yes');

    const year = isFirstYear ? 'First-year' : 'Upper-year';
    const origin = isInternational ? 'International' : 'Domestic';

    const group = `${year} - ${origin}`;

    if (stats[group]) {
      stats[group].totalScore += score;
      stats[group].count += 1;
      if(isAccess) stats[group].access+=1;
    }
  });
  

  // Total score across ALL students for percentage of whole
  const grandTotal = Object.values(stats).reduce((sum, g) => sum + g.totalScore, 0);
  const totalAccessCount = Object.values(stats).reduce((sum, g) => sum + g.access, 0); 

  const tableData = GROUPS.map((group) => ({
    group,
    literacy: grandTotal > 0
      ? `${((stats[group].totalScore / grandTotal) * 100).toFixed(1)}%` 
      : '0%',
      access: totalAccessCount > 0                                                        
    ? `${((stats[group].access / totalAccessCount) * 100).toFixed(1)}%`
    : '0%',
    count: stats[group].count,
  }
)
);

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
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">COUNT</TableHeaderCell>
             <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">ACCESS</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.group} className="hover:bg-slate-50/50 transition-colors">
              <TableCell className="text-sm font-semibold text-slate-700 max-w-[150px] whitespace-normal leading-tight">
                {item.group}
              </TableCell>
              <TableCell className="text-sm font-medium text-slate-600">{item.literacy}</TableCell>
              <TableCell className="text-sm font-medium text-slate-600">{item.count}</TableCell>
              <TableCell className="text-sm font-medium text-slate-600">{item.access}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}