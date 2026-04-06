'use client';
import { StatCard } from './StatCard';

interface KPICardsProps {
  rawData: any[];
}

function calcPct(count: number, total: number) {
  if (total === 0) return 0;
  return parseFloat(((count / total) * 100).toFixed(1));
}

export default function KPICards({ rawData }: KPICardsProps) {
  if (!rawData || rawData.length === 0) return null;

  const monthMap: Record<string, { 
    totalScore: number; 
    count: number; 
    awareness: number; 
    access: number; 
    atRisk: number 
  }> = {};

  rawData.forEach((row) => {
    const scoreRaw     = Array.isArray(row[0])  ? row[0][0]  : row[0];
    const quickHelpRaw = Array.isArray(row[16]) ? row[16][0] : row[16];
    const accessRaw    = Array.isArray(row[6])  ? row[6][0]  : row[6];
    const timestampRaw = Array.isArray(row[27]) ? row[27][0] : row[27];

    const score = parseFloat(String(scoreRaw).split('/')[0].trim());
    if (isNaN(score)) return;

    const isAwareness = String(quickHelpRaw).toLowerCase().includes('by calling 988');
    const isAccess    = String(accessRaw).toLowerCase().includes('yes');
    const isAtRisk    = (score / 20) * 100 < 50;

    const dateStr = String(timestampRaw).split(' ')[0].split('T')[0];
    const date    = new Date(dateStr);
    if (isNaN(date.getTime())) return;

    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthMap[monthKey]) {
      monthMap[monthKey] = { totalScore: 0, count: 0, awareness: 0, access: 0, atRisk: 0 };
    }

    monthMap[monthKey].totalScore += score;
    monthMap[monthKey].count      += 1;
    if (isAwareness) monthMap[monthKey].awareness += 1;
    if (isAccess)    monthMap[monthKey].access    += 1;
    if (isAtRisk)    monthMap[monthKey].atRisk    += 1;
  });

  // Sort months and pick the two most recent
  const sortedMonths = Object.keys(monthMap).sort();
  const latestKey    = sortedMonths[sortedMonths.length - 1];
  const prevKey      = sortedMonths[sortedMonths.length - 2];

  const current  = latestKey ? monthMap[latestKey] : { totalScore: 0, count: 0, awareness: 0, access: 0, atRisk: 0 };
  const previous = prevKey   ? monthMap[prevKey]   : { totalScore: 0, count: 0, awareness: 0, access: 0, atRisk: 0 };

  // Current percentages
  const literacyNow  = calcPct(current.totalScore, current.count * 20);
  const awarenessNow = calcPct(current.awareness,  current.count);
  const accessNow    = calcPct(current.access,     current.count);
  const atRiskNow    = calcPct(current.atRisk,     current.count);

  // Previous percentages
  const literacyPrev  = calcPct(previous.totalScore, previous.count * 20);
  const awarenessPrev = calcPct(previous.awareness,  previous.count);
  const accessPrev    = calcPct(previous.access,     previous.count);
  const atRiskPrev    = calcPct(previous.atRisk,     previous.count);

  const diff = (current: number, prev: number) => {
    if (prev === 0) return { change: '0%', changeType: 'positive' as const };
    const delta = parseFloat((current - prev).toFixed(1));
    return {
      change: `${Math.abs(delta)}%`,
      changeType: delta >= 0 ? 'positive' as const : 'negative' as const,
    };
  };

  const cards = [
    {
      name: 'Literacy',
      stat: `${literacyNow}%`,
      previousStat: `${literacyPrev}%`,
      ...diff(literacyNow, literacyPrev),
    },
    {
      name: 'Awareness',
      stat: `${awarenessNow}%`,
      previousStat: `${awarenessPrev}%`,
      ...diff(awarenessNow, awarenessPrev),
    },
    {
      name: 'Access',
      stat: `${accessNow}%`,
      previousStat: `${accessPrev}%`,
      ...diff(accessNow, accessPrev),
    },
    {
      name: 'At Risk',
      stat: `${atRiskNow}%`,
      previousStat: `${atRiskPrev}%`,
      ...diff(atRiskNow, atRiskPrev),
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <StatCard key={card.name} {...card} />
      ))}
    </>
  );
}