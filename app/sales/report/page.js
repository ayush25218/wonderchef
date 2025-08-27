"use client";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import Header from "../../../components/Header";
import { DollarSign, ShoppingBag, TrendingUp } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Mock Data, you should replace this with data from your database
const mockData = {
    weekly: {
        revenue: { labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'], data: [2200, 3500, 4100, 3800] },
        topProducts: { labels: ['P A', 'P B', 'P C', 'P D'], data: [85, 70, 55, 40] },
    },
    monthly: {
        revenue: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], data: [3000, 4500, 6000, 5000, 7500, 9000, 8500] },
        topProducts: { labels: ['Prod A', 'Prod B', 'Prod C', 'Prod D', 'Prod E'], data: [150, 120, 90, 80, 50] },
    },
    yearly: {
        revenue: { labels: ['2022', '2023', '2024', '2025'], data: [55000, 72000, 98000, 110000] },
        topProducts: { labels: ['Product X', 'Product Y', 'Product Z', 'Product W'], data: [500, 420, 350, 280] },
    },
};

const salesByCustomer = [
    { customer: 'John Doe', totalSales: 15250, lastPurchase: 'Aug 19, 2025' },
    { customer: 'Jane Smith', totalSales: 9800, lastPurchase: 'Aug 18, 2025' },
    { customer: 'Bob Johnson', totalSales: 7500, lastPurchase: 'Aug 17, 2025' },
    { customer: 'Alice Brown', totalSales: 6300, lastPurchase: 'Aug 16, 2025' },
];

export default function Page() {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    const [revenueData, setRevenueData] = useState(mockData.monthly.revenue);
    const [topProductsData, setTopProductsData] = useState(mockData.monthly.topProducts);

    useEffect(() => {
        setRevenueData(mockData[selectedPeriod].revenue);
        setTopProductsData(mockData[selectedPeriod].topProducts);
    }, [selectedPeriod]);

    // KPI Card data
    const totalRevenue = 155550;
    const totalSales = 2150;
    const avgOrderValue = 1250;

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Sales Reports" />
            <div className="p-6 space-y-6">

                {/* KPI Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
                        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                            <h4 className="text-2xl font-bold text-gray-800">₹{totalRevenue.toLocaleString()}</h4>
                        </div>
                    </section>
                    <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
                        <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Sales</p>
                            <h4 className="text-2xl font-bold text-gray-800">{totalSales.toLocaleString()}</h4>
                        </div>
                    </section>
                    <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
                            <h4 className="text-2xl font-bold text-gray-800">₹{avgOrderValue.toLocaleString()}</h4>
                        </div>
                    </section>
                </div>

                {/* Charts and Filters Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <section className="card p-6 bg-white shadow-xl rounded-2xl lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl text-gray-800">Revenue Analysis</h3>
                            <div className="flex gap-2 p-1 bg-gray-100 rounded-md">
                                <button
                                    onClick={() => setSelectedPeriod('weekly')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${selectedPeriod === 'weekly' ? 'bg-white shadow' : 'text-gray-600'}`}>
                                    Weekly
                                </button>
                                <button
                                    onClick={() => setSelectedPeriod('monthly')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${selectedPeriod === 'monthly' ? 'bg-white shadow' : 'text-gray-600'}`}>
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setSelectedPeriod('yearly')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${selectedPeriod === 'yearly' ? 'bg-white shadow' : 'text-gray-600'}`}>
                                    Yearly
                                </button>
                            </div>
                        </div>
                        <div className="h-64">
                            {/* Conditional rendering to prevent TypeError */}
                            {revenueData && revenueData.datasets && revenueData.datasets.length > 0 ? (
                                <Line
                                    data={{
                                        labels: revenueData.labels,
                                        datasets: [{ ...revenueData.datasets[0], data: revenueData.data }]
                                    }}
                                />
                            ) : (
                                <p className="text-center text-gray-500 mt-28">No data available for this period.</p>
                            )}
                        </div>
                    </section>

                    <section className="card p-6 bg-white shadow-xl rounded-2xl">
                        <h3 className="font-bold text-xl text-gray-800">Top Selling Products</h3>
                        <div className="h-64 flex items-center justify-center">
                            {/* Conditional rendering for Bar chart */}
                            {topProductsData && topProductsData.datasets && topProductsData.datasets.length > 0 ? (
                                <Bar
                                    data={{
                                        labels: topProductsData.labels,
                                        datasets: [{ ...topProductsData.datasets[0], data: topProductsData.data }]
                                    }}
                                />
                            ) : (
                                <p className="text-center text-gray-500 mt-28">No data available for this period.</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Sales by Customer Table */}
                <div className="p-6">
                    <section className="card p-6 bg-white shadow-xl rounded-2xl">
                        <h3 className="font-bold text-xl text-gray-800">Sales by Customer</h3>
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3 text-right">Total Sales</th>
                                    <th className="px-6 py-3 text-right">Last Purchase</th>
                                </tr>
                                </thead>
                                <tbody>
                                {salesByCustomer.map((customer, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{customer.customer}</td>
                                        <td className="px-6 py-4 text-right text-green-600 font-semibold">₹{customer.totalSales.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">{customer.lastPurchase}</td>
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