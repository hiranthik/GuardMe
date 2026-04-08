'use client';

import LogoutButton from "@/components/logout/LogoutButton";

export default function DashboardHeader() {
  return (
    <div className="w-full px-6 py-4 border-b dashboard-header">
      <div className="flex items-center justify-between">
        
  
        <div className="flex items-center gap-3">
    
          <div className="w-5 h-5 rounded-md bg-blue-600 shadow-sm" />
          <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight" suppressHydrationWarning >
              Algoma Wellness
            <span suppressHydrationWarning> : Student Mental Health Survey Dashboard</span>
          </h1>
          </div>
        </div>


        <div className="flex items-center gap-6 text-sm">
          <button className="px-5 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition">
            Resources
          </button>
          <button className="text-blue-600 font-medium hover:underline">
            Settings
          </button>
          
          <LogoutButton />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mt-5">
        {['Campus: All', 'Year: All', 'Student: All', 'Housing: All'].map(
          (filter) => (
            <div
              key={filter}
              className="px-3 py-1 rounded-full bg-white border border-slate-100 text-xs font-medium text-slate-600 shadow-sm"
            >
              {filter}
            </div>
          )
        )}
      </div>
    </div>
  );
}