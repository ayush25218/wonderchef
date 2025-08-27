import Header from "../../components/Header";

export default function Page() {
  return (
    <div>
      <Header title="Reports" />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="card">
          <h3 className="font-semibold">Reports — Quick Actions</h3>
          <ul className="mt-3 list-disc pl-6 text-sm text-slate-700">
            <li>Add New</li>
            <li>View List / History</li>
            <li>Generate Report</li>
          </ul>
        </section>
        <section className="card">
          <h3 className="font-semibold">Reports — Recent Activity</h3>
          <div className="mt-3 h-40 w-full rounded-xl bg-slate-100"></div>
        </section>
      </div>
    </div>
  );
}
