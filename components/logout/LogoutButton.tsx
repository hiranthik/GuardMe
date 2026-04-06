// components/logout/LogoutButton.tsx
'use client';

import { handleLogout } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={() => handleLogout()}
      className="px-4 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 transition text-sm font-medium"
    >
      Sign Out
    </button>
  );
}