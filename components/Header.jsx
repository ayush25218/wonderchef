"use client";
import { Bell, Download, Info, CalendarDays } from "lucide-react";

export default function Header({ title = "Dashboard" }) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="text-lg font-semibold">{title}</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-xl bg-slate-100 text-sm flex items-center gap-2"><CalendarDays size={16}/>Last 7 days</button>
          <button className="px-3 py-2 rounded-xl bg-slate-100 text-sm flex items-center gap-2"><Download size={16}/>Export</button>
          <button className="px-3 py-2 rounded-xl bg-slate-100"><Bell size={16}/></button>
          <button className="px-3 py-2 rounded-xl bg-slate-100"><Info size={16}/></button>
          <div className="h-8 w-8 rounded-full bg-slate-200" title="Evan Morales"></div>
        </div>
      </div>
    </header>
  );
}
