'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Overview',        id: 'overview' },
  { label: 'Literacy',        id: 'literacy' },
  { label: 'Awareness',       id: 'awareness' },
  { label: 'Access and Usage',id: 'access' },
  { label: 'Barriers',        id: 'barriers' },
];

export default function Sidebar({ onExport }: { onExport?: () => void }) {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0">
      <div className="sticky top-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        
        <p className="text-[11px] font-bold uppercase text-gray-400 tracking-widest mb-3 px-2">
          Navigation
        </p>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                active === id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-[11px] font-bold uppercase text-gray-400 tracking-widest mb-3 px-2">
            Utilities
          </p>
          <button
            onClick={onExport}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors"
          >
            Export Data
          </button>
        </div>

      </div>
    </aside>
  );
}