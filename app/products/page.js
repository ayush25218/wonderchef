// app/products/page.js
"use client";
import { useState } from "react";
import Header from "../../components/Header";
import ProductHeader from "../../components/ProductHeader";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Box, Package, TrendingUp } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data for the chart and recent products
const mockStockValueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [{
    label: 'Inventory Value',
    data: [50000, 52000, 55000, 51000, 58000, 62000, 65000],
    borderColor: 'rgb(79, 70, 229)',
    backgroundColor: 'rgba(79, 70, 229, 0.5)',
    tension: 0.4,
  }]
};

const recentProducts = [
  { name: 'Product A', sku: 'SKU-001', stock: 150 },
  { name: 'Product B', sku: 'SKU-002', stock: 25 },
  { name: 'Product C', sku: 'SKU-003', stock: 80 },
];

export default function Page() {
  // KPI Data (You'll get this from your database)
  const totalProducts = 250;
  const stockValue = 650000;
  const outOfStockItems = 5;

  return (
      <div className="bg-slate-50 min-h-screen">
        <Header title="Product Management" />
        <ProductHeader />
        <div className="p-6 space-y-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <Box size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <h4 className="text-2xl font-bold text-gray-800">{totalProducts}</h4>
              </div>
            </section>
            <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
              <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Stock Value</p>
                <h4 className="text-2xl font-bold text-gray-800">₹{stockValue.toLocaleString()}</h4>
              </div>
            </section>
            <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                <h4 className="text-2xl font-bold text-gray-800">{outOfStockItems}</h4>
              </div>
            </section>
          </div>

          {/* Main Content: Chart & Recent Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="card p-6 bg-white shadow-xl rounded-2xl">
              <h3 className="font-bold text-xl text-gray-800">Inventory Value Trend</h3>
              <div className="mt-6 h-64">
                <Line data={mockStockValueData} />
              </div>
            </section>
            <section className="card p-6 bg-white shadow-xl rounded-2xl">
              <h3 className="font-bold text-xl text-gray-800">Recent Product Activity</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-6 py-3">SKU</th>
                    <th className="px-6 py-3 text-right">Stock</th>
                  </tr>
                  </thead>
                  <tbody>
                  {recentProducts.map((product, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4">{product.sku}</td>
                        <td className="px-6 py-4 text-right">{product.stock}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

        </div>
      </div>
  );
}