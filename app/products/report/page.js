// app/products/report/page.js
"use client";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DollarSign, Package, Zap, Turtle, Box } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock Data
const mockInventoryValueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Inventory Value",
      data: [500000, 520000, 550000, 510000, 580000, 620000, 650000],
      borderColor: "rgb(79, 70, 229)",
      backgroundColor: "rgba(79, 70, 229, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const lowStockItems = [
  { name: "Super Air Fryer", stock: 10, sku: "AF-202" },
  { name: "Espresso Machine", stock: 5, sku: "ES-700" },
  { name: "Compact Toaster", stock: 0, sku: "TOA-404" },
];

const fastMovingItems = [
  { name: "Ceramic Coffee Mug", sales: 250, sku: "MUG-303" },
  { name: "Smart Blender 9000", sales: 150, sku: "BL-9000" },
  { name: "Digital Kitchen Scale", sales: 100, sku: "SCALE-01" },
];

const slowMovingItems = [
  { name: "Cast Iron Skillet", sales: 15, sku: "SK-101" },
  { name: "Pro Chef Knife Set", sales: 30, sku: "KN-012" },
];

export default function Page() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header title="Inventory Reports" />
      <ProductHeader />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-xl flex items-center gap-4">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Inventory Value</p>
              <h4 className="text-2xl font-bold text-gray-800">₹6,50,000</h4>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xl flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Box size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h4 className="text-2xl font-bold text-gray-800">120</h4>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xl flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
              <Zap size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fast-Moving</p>
              <h4 className="text-2xl font-bold text-gray-800">15</h4>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xl flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <Turtle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Slow-Moving</p>
              <h4 className="text-2xl font-bold text-gray-800">8</h4>
            </div>
          </div>
        </div>

        {/* Chart */}
        <section className="p-6 bg-white rounded-2xl shadow-xl">
          <h3 className="font-bold text-xl text-gray-800">
            Inventory Value Trend
          </h3>
          <div className="mt-6 h-80">
            <Line
              data={mockInventoryValueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </section>

        {/* Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock Items */}
          <section className="p-6 bg-white rounded-2xl shadow-xl">
            <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
              <Package size={24} className="text-red-500" />
              Low/Out of Stock Items
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">SKU</th>
                    <th className="px-6 py-3 text-right">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.length > 0 ? (
                    lowStockItems.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4">{item.sku}</td>
                        <td className="px-6 py-4 text-right font-semibold text-red-600">
                          {item.stock}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No low stock items.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Fast/Slow Moving */}
          <section className="p-6 bg-white rounded-2xl shadow-xl space-y-6">
            {/* Fast */}
            <div>
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                <Zap size={24} className="text-green-500" />
                Fast-Moving Items
              </h3>
              <ul className="mt-4 space-y-2">
                {fastMovingItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.sales} sold
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6"></div>

            {/* Slow */}
            <div>
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                <Turtle size={24} className="text-orange-500" />
                Slow-Moving Items
              </h3>
              <ul className="mt-4 space-y-2">
                {slowMovingItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.sales} sold
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
