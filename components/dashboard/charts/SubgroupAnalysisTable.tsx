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

const subgroupData = [
  {
    group: 'First-year - International',
    literacy: '58.3%',
    awareness: '41.2%',
    access: '41.2%',
    count: 17,
  },
  {
    group: 'First-year - Domestic',
    literacy: '60.1%',
    awareness: '53.8%',
    access: '30.8%',
    count: 13,
  },
  {
    group: 'Upper-year - International',
    literacy: '67.1%',
    awareness: '72.2%',
    access: '36.1%',
    count: 36,
  },
  {
    group: 'Upper-year - Domestic',
    literacy: '70%',
    awareness: '59.3%',
    access: '40.7%',
    count: 54,
  },
];

export default function SubgroupAnalysisTable() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">
          Subgroup Analysis
        </h3>
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
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              GROUP
            </TableHeaderCell>
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              LITERACY
            </TableHeaderCell>
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              AWARENESS
            </TableHeaderCell>
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              ACCESS
            </TableHeaderCell>
            <TableHeaderCell className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              COUNT
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subgroupData.map((item) => (
            <TableRow key={item.group} className="hover:bg-slate-50/50 transition-colors">
              <TableCell className="text-sm font-semibold text-slate-700 max-w-[150px] whitespace-normal leading-tight">
                {item.group}
              </TableCell>
              <TableCell className="text-sm font-medium text-slate-600">
                {item.literacy}
              </TableCell>
              <TableCell className="text-sm font-medium text-slate-600">
                {item.awareness}
              </TableCell>
              <TableCell className="text-sm font-medium text-slate-600">
                {item.access}
              </TableCell>
              <TableCell className="text-sm font-medium text-slate-600">
                {item.count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Visual Scrollbar Indicator from screenshot */}
      <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full w-4/5 bg-slate-300 rounded-full" />
      </div>
    </Card>
  );
}