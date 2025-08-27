"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Header from "../../components/Header";
import { DollarSign, Clock, Truck, Plus, List, FileText } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data
const mockPurchaseData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [{
    label: 'Monthly Purchases',
    data: [15000, 18000, 25000, 20000, 30000, 28000, 35000],
    borderColor: 'rgb(79, 70, 229)',
    backgroundColor: 'rgba(79, 70, 229, 0.5)',
    tension: 0.4,
  }]
};

const recentPurchases = [
  { invoice: '#PO-1010', vendor: 'Vendor A', amount: 4800.00, status: 'Paid' },
  { invoice: '#PO-1009', vendor: 'Vendor C', amount: 6200.00, status: 'Paid' },
  { invoice: '#PO-1008', vendor: 'Vendor B', amount: 15000.00, status: 'Pending' },
];

export default function Page() {
  const totalPurchases = 155000;
  const pendingBills = 18300.50;
  const totalVendors = 4;

  return (
      <div className="bg-slate-50 min-h-screen">
        <Header title="Purchases Dashboard" />
        <div className="p-6 space-y-6">

          {/* KPI Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <Truck size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Purchases</p>
                <h4 className="text-2xl font-bold text-gray-800">₹{totalPurchases.toLocaleString()}</h4>
              </div>
            </section>
            <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Bills</p>
                <h4 className="text-2xl font-bold text-gray-800">₹{pendingBills.toLocaleString()}</h4>
              </div>
            </section>
            <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
              <div className="p-3 rounded-full bg-pink-100 text-pink-600">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Vendors</p>
                <h4 className="text-2xl font-bold text-gray-800">{totalVendors}</h4>
              </div>
            </section>
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Purchase Trends Chart */}
            <section className="card p-6 bg-white shadow-xl rounded-2xl lg:col-span-2">
              <h3 className="font-bold text-xl text-gray-800">Purchase Trends</h3>
              <div className="mt-6 h-64">
                <Line data={mockPurchaseData} />
              </div>
            </section>

            {/* Quick Actions */}
            <section className="card p-6 bg-white shadow-xl rounded-2xl">
              <h3 className="font-bold text-xl text-gray-800">Quick Actions</h3>
              <div className="mt-4 space-y-3">
                <a href="/purchases/add-new" className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Plus size={20} className="text-indigo-600" />
                  <span className="font-medium text-gray-800">Add New Purchase</span>
                </a>
                <a href="/purchases/list" className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <List size={20} className="text-indigo-600" />
                  <span className="font-medium text-gray-800">Purchase History</span>
                </a>
                <a href="/purchases/orders" className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <FileText size={20} className="text-indigo-600" />
                  <span className="font-medium text-gray-800">View Purchase Orders</span>
                </a>
              </div>
            </section>
          </div>

          {/* Recent Purchases Table */}
          <section className="card p-6 bg-white shadow-xl rounded-2xl">
            <h3 className="font-bold text-xl text-gray-800">Recent Purchases</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Invoice</th>
                  <th className="px-6 py-3">Vendor</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                </tr>
                </thead>
                <tbody>
                {recentPurchases.map((purchase, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{purchase.invoice}</td>
                      <td className="px-6 py-4">{purchase.vendor}</td>
                      <td className="px-6 py-4 text-right">₹{purchase.amount.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
  );
}