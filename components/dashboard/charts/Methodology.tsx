import { Card } from "@tremor/react";

export function Methodology() {
  const definitions = [
    { label: "Literacy score", desc: "percent correct across scored items; multi-select items are counted correct only if they match the key exactly." },
    { label: "Awareness (quick help)", desc: "percent selecting an approved quick-help path (for example 9-8-8, GuardMe, Wellness email) on scenario items." },
    { label: "Access", desc: "percent reporting prior use of campus mental-health services." },
    { label: "Privacy", desc: "small-N suppression at n < 5; only aggregates leave the server." },
  ];

  return (
    <Card className="p-6 bg-white/50">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Methodology & Definitions
      </h3>
      
      <ul className="space-y-3">
        {definitions.map((item) => (
          <li key={item.label} className="flex items-start space-x-2">
            <span className="text-slate-400 mt-1.5 text-xs">•</span>
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-700">{item.label}: </span>
              {item.desc}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}