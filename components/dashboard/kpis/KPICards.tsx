'use client';
import { StatCard } from './StatCard';
 
interface KPICardsProps {
  rawData: any[];
}
 
function calcPct(count: number, total: number) {
  if (total === 0) return 0;
  return parseFloat(((count / total) * 100).toFixed(1));
}
 
function parseRowDate(timestampRaw: any): Date | null {
  const tsStr = String(timestampRaw);
 
  const mdyMatch = tsStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (mdyMatch) {
    const date = new Date(
      parseInt(mdyMatch[3]),
      parseInt(mdyMatch[1]) - 1,
      parseInt(mdyMatch[2])
    );
    if (!isNaN(date.getTime())) return date;
  }
 
  const isoMatch = tsStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const date = new Date(
      parseInt(isoMatch[1]),
      parseInt(isoMatch[2]) - 1,
      parseInt(isoMatch[3])
    );
    if (!isNaN(date.getTime())) return date;
  }
 
  return null;
}
 
export default function KPICards({ rawData }: KPICardsProps) {
  if (!rawData || rawData.length === 0) return null;
 
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const currentStart = new Date(todayMidnight.getTime() - 30 * MS_PER_DAY);
  const previousStart = new Date(todayMidnight.getTime() - 60 * MS_PER_DAY);
 
  const empty = { totalScore: 0, count: 0, awareness: 0, access: 0, atRisk: 0 };
  const current = { ...empty };
  const previous = { ...empty };
 
  rawData.forEach((row) => {
    const scoreRaw     = Array.isArray(row[29]) ? row[29][0] : row[29]; // col AD = index 29
    const quickHelpRaw = Array.isArray(row[16]) ? row[16][0] : row[16]; // col Q  = index 15
    const accessRaw    = Array.isArray(row[6])  ? row[6][0]  : row[6];  // col G  = index 6
    const timestampRaw = Array.isArray(row[0])  ? row[0][0]  : row[0];  // col A  = index 0
 
    const score = parseFloat(String(scoreRaw).trim());
    if (isNaN(score)) return;
 
    const isAwareness = String(quickHelpRaw).toLowerCase().includes('by calling 988');
    const isAccess    = String(accessRaw).toLowerCase().includes('yes');
    const isAtRisk    = (score / 20) * 100 < 50;
 
    const date = parseRowDate(timestampRaw);
    if (!date) return;
 
    if (date >= currentStart && date <= todayMidnight) {
      current.totalScore += score;
      current.count += 1;
      if (isAwareness) current.awareness += 1;
      if (isAccess)    current.access += 1;
      if (isAtRisk)    current.atRisk += 1;
    } else if (date >= previousStart && date < currentStart) {
      previous.totalScore += score;
      previous.count += 1;
      if (isAwareness) previous.awareness += 1;
      if (isAccess)    previous.access += 1;
      if (isAtRisk)    previous.atRisk += 1;
    }
  });
 
  const literacyNow  = calcPct(current.totalScore, current.count * 20);
  const awarenessNow = calcPct(current.awareness,  current.count);
  const accessNow    = calcPct(current.access,     current.count);
  const atRiskNow    = calcPct(current.atRisk,     current.count);
 
  const literacyPrev  = calcPct(previous.totalScore, previous.count * 20);
  const awarenessPrev = calcPct(previous.awareness,  previous.count);
  const accessPrev    = calcPct(previous.access,     previous.count);
  const atRiskPrev    = calcPct(previous.atRisk,     previous.count);
 
  function diff(
    now: number,
    prev: number,
    invertDirection = false
  ): { change: string; changeType: 'positive' | 'negative' } {
    if (prev === 0) return { change: '0%', changeType: 'positive' };
    const delta = parseFloat((now - prev).toFixed(1));
    const isUp = delta >= 0;
    return {
      change: `${Math.abs(delta)}%`,
      changeType: (invertDirection ? !isUp : isUp) ? 'positive' : 'negative',
    };
  }
 
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
      ...diff(atRiskNow, atRiskPrev, true),
    },
  ];

  rawData.forEach((row) => {
  console.log('Q value:', row[16]); // add this line temporarily
  console.log('T value:', row[18]);
  console.log('AA value:', row[25]);
  // ... rest of your code
});
 
  return (
    <>
      {cards.map((card) => (
        <StatCard key={card.name} {...card} />
      ))}
    </>
  );
}