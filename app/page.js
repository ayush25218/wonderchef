'use client';
import { useState, useEffect } from "react";
import Header from "../components/Header";
import KPI from "../components/KPI";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Truck, Users, Activity, Loader2 } from "lucide-react";

// Chart.js को रजिस्टर करें
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

// स्टॉक अलर्ट पॉप-अप कॉम्पोनेंट
const LowStockAlert = ({ onClose }) => {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-40 overflow-y-auto h-full w-full z-50 flex justify-center items-center backdrop-blur-sm p-4 animate-fade-in">
        <div className="relative p-8 w-full max-w-sm mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-2xl transform transition-all duration-300 scale-95 animate-zoom-in">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-200">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4.354a9 9 0 1113.876 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Low Stock Alert!</h3>
            <div className="mt-2 text-sm text-gray-600 font-medium">
              Some of your key products are running low. Please restock them soon!
            </div>
          </div>
          <div className="mt-6">
            <button
                onClick={onClose}
                type="button"
                className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-3 bg-red-500 text-base font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
            >
              Acknowledge
            </button>
          </div>
        </div>
      </div>
  );
};

export default function Page() {
  const [showLowStockAlert, setShowLowStockAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // नकली डेटा (Mock Data)
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [300, 450, 600, 500, 750, 900, 850],
      borderColor: 'rgb(129, 140, 248)',
      backgroundColor: 'rgba(129, 140, 248, 0.7)',
      fill: true,
      tension: 0.4
    }]
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: true }, y: { display: true } }, // Display scales for better context
  };

  const stockData = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [{
      data: [80, 15, 5],
      backgroundColor: ['#4f46e5', '#f97316', '#ef4444'],
      hoverOffset: 4
    }]
  };

  const profitData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Profit',
      data: [15000, 18000, 22000, 20500],
      backgroundColor: 'rgba(74, 222, 128, 0.8)',
      borderColor: 'rgb(74, 222, 128)',
      borderWidth: 1,
    }]
  };

  // नकली स्टॉक डेटा (Low stock = quantity < 10)
  const lowStockProducts = [
    { name: 'Apples', quantity: 5 },
    { name: 'Grapes', quantity: 8 },
  ];

  // नकली लेनदेन डेटा
  const recentTransactions = [
    { date: 'Aug 19, 2024', product: 'Organic Apples', quantity: 20, sale: '$60.00', profit: '$30.00' },
    { date: 'Aug 18, 2024', product: 'Fresh Bananas', quantity: 50, sale: '$100.00', profit: '$40.00' },
    { date: 'Aug 17, 2024', product: 'Premium Coffee', quantity: 15, sale: '$75.00', profit: '$35.00' },
    { date: 'Aug 17, 2024', product: 'Local Honey', quantity: 5, sale: '$25.00', profit: '$12.00' },
  ];

  useEffect(() => {
    // Simulating data fetch with a timeout
    setTimeout(() => {
      setIsLoading(false);
      if (lowStockProducts.length > 0) {
        setShowLowStockAlert(true);
      }
    }, 1500); // 1.5 second loading time
  }, []);

  if (isLoading) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-slate-50 z-[100]">
          <Loader2 size={64} className="animate-spin text-indigo-600" />
        </div>
    );
  }

  return (
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 lg:p-12">
        <Header title="Dashboard" />

        {/* --- KPI Section --- */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="card bg-gradient-to-br from-indigo-50 to-white shadow-md text-gray-800 p-4 rounded-xl">
            <KPI label="Total Sales" value="$87,493" sub="3.4% since last month" icon={TrendingUp} color="text-indigo-600" />
          </div>
          <div className="card bg-gradient-to-br from-green-50 to-white shadow-md text-gray-800 p-4 rounded-xl">
            <KPI label="Total Purchases" value="$53,112" sub="2.1% since last month" icon={TrendingUp} color="text-green-600" />
          </div>
          <div className="card bg-gradient-to-br from-purple-50 to-white shadow-md text-gray-800 p-4 rounded-xl">
            <KPI label="Profit" value="$34,381" sub="5.8% since last month" icon={TrendingUp} color="text-purple-600" />
          </div>
          <div className="card bg-gradient-to-br from-yellow-50 to-white shadow-md text-gray-800 p-4 rounded-xl">
            <KPI label="Total Customers" value="1,245" sub="10.2% new this month" icon={Users} color="text-yellow-600" />
          </div>
        </div>

        {/* --- Main Sections: Charts and Tables --- */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Overview & Recent Transactions */}
          <section className="card lg:col-span-2 bg-white shadow-lg rounded-2xl p-6">
            <h3 className="font-bold text-xl text-gray-800">Sales Overview</h3>
            <p className="text-sm text-gray-500 mt-1">Total sales, daily/weekly/monthly revenue</p>
            <div className="mt-6 h-64">
              <Line data={salesData} options={salesOptions} />
            </div>

            {/* Detailed Sales Table */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-700 mb-4">Recent Sales Transactions</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 rounded-lg overflow-hidden">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Product</th>
                    <th scope="col" className="px-6 py-3">Quantity</th>
                    <th scope="col" className="px-6 py-3">Sale Amount</th>
                    <th scope="col" className="px-6 py-3">Profit</th>
                  </tr>
                  </thead>
                  <tbody>
                  {recentTransactions.map((transaction, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{transaction.date}</td>
                        <td className="px-6 py-4">{transaction.product}</td>
                        <td className="px-6 py-4">{transaction.quantity}</td>
                        <td className="px-6 py-4">{transaction.sale}</td>
                        <td className="px-6 py-4 text-green-600 font-medium">{transaction.profit}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Stock Overview (Doughnut Chart) */}
          <section className="card bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center">
            <h3 className="font-semibold text-lg text-gray-800">Stock Overview</h3>
            <p className="text-sm text-gray-500 mt-1 text-center">In-stock, low-stock, and out-of-stock items</p>
            <div className="mt-6 w-full max-w-xs h-64 flex items-center justify-center">
              <Doughnut data={stockData} />
            </div>
          </section>
        </div>

        {/* --- Other Summaries: Purchases, Vendors, Customers --- */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Purchases Overview */}
          <section className="card bg-white shadow-lg rounded-2xl p-6 lg:col-span-2">
            <h3 className="font-semibold text-lg text-gray-800">Purchases Overview</h3>
            <p className="text-sm text-gray-500 mt-1">Recent purchases and pending orders</p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Vendor</th>
                  <th scope="col" className="px-6 py-3">Order ID</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <td className="px-6 py-4 font-medium">Vendor A</td>
                  <td className="px-6 py-4">#P-2024-01</td>
                  <td className="px-6 py-4">Aug 15, 2024</td>
                  <td className="px-6 py-4 text-green-600">Completed</td>
                  <td className="px-6 py-4">$1,200</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <td className="px-6 py-4 font-medium">Vendor B</td>
                  <td className="px-6 py-4">#P-2024-02</td>
                  <td className="px-6 py-4">Aug 14, 2024</td>
                  <td className="px-6 py-4 text-yellow-500">Pending</td>
                  <td className="px-6 py-4">$850</td>
                </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Vendors & Customers Summary */}
          <section className="card bg-white shadow-lg rounded-2xl p-6">
            <h3 className="font-semibold text-lg text-gray-800">Vendors & Customers</h3>
            <p className="text-sm text-gray-500 mt-1">Top vendors and top customers</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Top Vendor: <span className="font-medium float-right text-indigo-600">Supplier A</span></li>
              <li>New Vendors: <span className="font-medium float-right text-gray-800">3 this month</span></li>
              <hr className="my-2 border-slate-200" />
              <li>Top Customer: <span className="font-medium float-right text-indigo-600">John Doe</span></li>
              <li>New Customers: <span className="font-medium float-right text-gray-800">15 this month</span></li>
            </ul>
          </section>
        </div>

        {/* --- Financials and Alerts --- */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profit & Loss Summary */}
          <section className="card bg-white shadow-lg rounded-2xl p-6">
            <h3 className="font-semibold text-lg text-gray-800">Profit & Loss Summary</h3>
            <div className="mt-4 h-56">
              <Bar data={profitData} options={{ maintainAspectRatio: false }} />
            </div>
          </section>

          {/* Notifications & Alerts */}
          <section className="card bg-white shadow-lg rounded-2xl p-6">
            <h3 className="font-semibold text-lg text-gray-800">Notifications & Alerts</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="p-2 rounded-full bg-red-100"><TrendingDown size={16} className="text-red-600" /></span>
                <div className="flex-1">
                  <p className="font-medium">Low Stock: <span className="text-red-600">Apples</span></p>
                  <p className="text-xs">Only 5 units left. Restock now!</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="p-2 rounded-full bg-orange-100"><DollarSign size={16} className="text-orange-600" /></span>
                <div className="flex-1">
                  <p className="font-medium">Due Payment: <span className="text-orange-600">#INV-987</span></p>
                  <p className="text-xs">Payment due in 2 days from Vendor C.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="p-2 rounded-full bg-blue-100"><ShoppingBag size={16} className="text-blue-600" /></span>
                <div className="flex-1">
                  <p className="font-medium">New Order: <span className="text-blue-600">#ORD-12345</span></p>
                  <p className="text-xs">A new order has been placed by a customer.</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* Low Stock Alert Pop-up */}
        {showLowStockAlert && (
            <LowStockAlert onClose={() => setShowLowStockAlert(false)} />
        )}
      </main>
  );
}