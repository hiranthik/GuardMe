// components/dashboard/StatCard.tsx
'use client';
import { RiArrowDownSFill, RiArrowUpSFill } from '@remixicon/react';
import { Card } from '@tremor/react';

// This interface defines exactly what the component expects
interface StatCardProps {
  name: string;
  stat: string;
  previousStat: string;
  change: string;
  changeType: 'positive' | 'negative';
}

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function StatCard({ name, stat, previousStat, change, changeType }: StatCardProps) {
  return (
    <Card className="ring-1 ring-gray-200">
      <dt className="text-tremor-default font-medium text-tremor-content">
        {name}
      </dt>
      <dd className="mt-1 flex items-baseline space-x-2.5">
        <p className="text-tremor-metric font-semibold text-tremor-content-strong">
          {stat}
        </p>
        <p className="text-tremor-default text-tremor-content">
          from {previousStat}
        </p>
      </dd>
      <dd className="mt-4 flex items-center space-x-2">
        <p className="flex items-center space-x-0.5">
          {changeType === 'positive' ? (
            <RiArrowUpSFill className="size-5 shrink-0 text-emerald-700" />
          ) : (
            <RiArrowDownSFill className="size-5 shrink-0 text-red-700" />
          )}
          <span className={classNames(
            changeType === 'positive' ? 'text-emerald-700' : 'text-red-700',
            'text-tremor-default font-medium',
          )}>
            {change}
          </span>
        </p>
        <p className="text-tremor-default text-tremor-content italic">
          from last month
        </p>
      </dd>
    </Card>
  );
}