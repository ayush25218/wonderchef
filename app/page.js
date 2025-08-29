'use client';
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Loader2 } from "lucide-react";

// Chart.js Register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

// Low Stock Alert
const LowStockAlert = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="relative p-8 w-full max-w-sm mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-200 animate-zoom-in">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 shadow-inner">
            <TrendingDown className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-900">⚠ Low Stock Alert!</h3>
          <div className="mt-2 text-sm text-gray-600 font-medium">
            Some of your key products are running low. Please restock them soon!
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={onClose}
            type="button"
            className="w-full rounded-xl shadow px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-base font-semibold text-white hover:scale-105 transition"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

// KPI Card Component
function KPI({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-slate-500 text-sm">{label}</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-1">{value}</div>
          {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl bg-slate-100 ${color}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const [showLowStockAlert, setShowLowStockAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock Data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [300, 450, 600, 500, 750, 900, 850],
      borderColor: 'rgb(129, 140, 248)',
      backgroundColor: 'rgba(129, 140, 248, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { color: "#f1f5f9" } }, y: { grid: { color: "#f1f5f9" } } },
  };

  const stockData = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [{
      data: [80, 15, 5],
      backgroundColor: ['#4f46e5', '#f97316', '#ef4444'],
      hoverOffset: 6
    }]
  };

  const profitData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Profit',
      data: [15000, 18000, 22000, 20500],
      backgroundColor: 'rgba(74, 222, 128, 0.8)',
      borderColor: 'rgb(74, 222, 128)',
      borderWidth: 2,
    }]
  };

  const lowStockProducts = [
    { name: 'Apples', quantity: 5 },
    { name: 'Grapes', quantity: 8 },
  ];

  const recentTransactions = [
    { date: 'Aug 19, 2024', product: 'Organic Apples', quantity: 20, sale: '$60.00', profit: '$30.00' },
    { date: 'Aug 18, 2024', product: 'Fresh Bananas', quantity: 50, sale: '$100.00', profit: '$40.00' },
    { date: 'Aug 17, 2024', product: 'Premium Coffee', quantity: 15, sale: '$75.00', profit: '$35.00' },
    { date: 'Aug 17, 2024', product: 'Local Honey', quantity: 5, sale: '$25.00', profit: '$12.00' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      if (lowStockProducts.length > 0) {
        setShowLowStockAlert(true);
      }
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-br from-indigo-50 via-slate-50 to-white z-[100]">
        <Loader2 size={64} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white p-6 md:p-10">
      <Header title="📊 Dashboard" />

      {/* KPI Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPI label="Total Sales" value="₹87,493" sub="3.4% since last month" icon={TrendingUp} color="text-indigo-600" />
        <KPI label="Total Purchases" value="₹53,112" sub="2.1% since last month" icon={TrendingUp} color="text-green-600" />
        <KPI label="Profit" value="₹34,381" sub="5.8% since last month" icon={TrendingUp} color="text-purple-600" />
        <KPI label="Total Customers" value="1,245" sub="10.2% new this month" icon={Users} color="text-yellow-600" />
      </div>

      {/* Sales Overview & Stock */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg rounded-3xl p-6 lg:col-span-2">
          <h3 className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Sales Overview</h3>
          <p className="text-sm text-gray-500 mt-1">Total sales, daily/weekly/monthly revenue</p>
          <div className="mt-6 h-64">
            <Line data={salesData} options={salesOptions} />
          </div>
          {/* Table */}
          <div className="mt-8">
            <h4 className="font-semibold text-gray-700 mb-4">Recent Sales Transactions</h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow">
              <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="bg-slate-50 text-xs uppercase text-gray-500 sticky top-0">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Quantity</th>
                    <th className="px-6 py-3">Sale</th>
                    <th className="px-6 py-3">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((t, i) => (
                    <tr key={i} className="odd:bg-white even:bg-slate-50 hover:bg-indigo-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">{t.date}</td>
                      <td className="px-6 py-4">{t.product}</td>
                      <td className="px-6 py-4">{t.quantity}</td>
                      <td className="px-6 py-4">{t.sale}</td>
                      <td className="px-6 py-4 text-green-600 font-medium">{t.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Stock Overview */}
        <section className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg rounded-3xl p-6 flex flex-col items-center">
          <h3 className="font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Stock Overview</h3>
          <p className="text-sm text-gray-500 mt-1 text-center">In-stock, low-stock, and out-of-stock items</p>
          <div className="mt-6 w-full max-w-xs h-64 flex items-center justify-center">
            <Doughnut data={stockData} />
          </div>
        </section>
      </div>

      {/* Profit & Alerts */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg rounded-3xl p-6">
          <h3 className="font-semibold text-lg text-slate-800">Profit & Loss Summary</h3>
          <div className="mt-4 h-56">
            <Bar data={profitData} options={{ maintainAspectRatio: false }} />
          </div>
        </section>

        <section className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg rounded-3xl p-6">
          <h3 className="font-semibold text-lg text-slate-800">Notifications & Alerts</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-600">
              <span className="p-2 rounded-full bg-red-100"><TrendingDown size={16} className="text-red-600" /></span>
              <div><p className="font-medium">Low Stock: <span className="text-red-600">Apples</span></p><p className="text-xs">Only 5 units left.</p></div>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-600">
              <span className="p-2 rounded-full bg-orange-100"><DollarSign size={16} className="text-orange-600" /></span>
              <div><p className="font-medium">Due Payment: <span className="text-orange-600">#INV-987</span></p><p className="text-xs">Due in 2 days.</p></div>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-600">
              <span className="p-2 rounded-full bg-blue-100"><ShoppingBag size={16} className="text-blue-600" /></span>
              <div><p className="font-medium">New Order: <span className="text-blue-600">#ORD-12345</span></p><p className="text-xs">Placed by customer.</p></div>
            </li>
          </ul>
        </section>
      </div>

      {showLowStockAlert && <LowStockAlert onClose={() => setShowLowStockAlert(false)} />}
    </main>
  );
}
