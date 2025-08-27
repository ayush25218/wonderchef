export default function KPI({ label, value, sub, styledata }) {
  return (
    <div className={`card ${styledata}`}>
      <div className="text-slate-500 text-sm">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}
