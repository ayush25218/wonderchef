// app/purchases/report/page.js
"use client";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import Header from "../../../components/Header";
import { DollarSign, Truck, Clock } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Mock Data
const mockData = {
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        data: [15000, 18000, 25000, 20000, 30000, 28000, 35000],
    },
    yearly: {
        labels: ['2022', '2023', '2024', '2025'],
        data: [180000, 220000, 280000, 350000],
    },
};

const vendorData = {
    labels: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D'],
    data: [45000, 30000, 25000, 15000],
};

const pendingBills = [
    { invoice: '#PO-1002', vendor: 'Vendor B', amount: 2500.50, dueDate: 'Aug 25, 2025' },
    { invoice: '#PO-1005', vendor: 'Vendor B', amount: 800.00, dueDate: 'Sep 01, 2025' },
    { invoice: '#PO-1008', vendor: 'Vendor B', amount: 15000.00, dueDate: 'Sep 10, 2025' },
];

export default function Page() {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    const [volumeData, setVolumeData] = useState(mockData.monthly);

    useEffect(() => {
        setVolumeData(mockData[selectedPeriod]);
    }, [selectedPeriod]);

    const totalPurchases = 155000;
    const pendingAmount = 18300.50;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Purchase Reports" />
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
                            <h4 className="text-2xl font-bold text-gray-800">₹{pendingAmount.toLocaleString()}</h4>
                        </div>
                    </section>
                    <section className="card p-6 flex items-center gap-4 bg-white shadow-xl rounded-2xl">
                        <div className="p-3 rounded-full bg-pink-100 text-pink-600">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Vendors</p>
                            <h4 className="text-2xl font-bold text-gray-800">4</h4>
                        </div>
                    </section>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <section className="card p-6 bg-white shadow-xl rounded-2xl lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl text-gray-800">Monthly Purchase Volume</h3>
                            <div className="flex gap-2 p-1 bg-gray-100 rounded-md">
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
                            <Line
                                data={{
                                    labels: volumeData.labels,
                                    datasets: [{
                                        label: 'Purchase Volume',
                                        data: volumeData.data,
                                        borderColor: 'rgb(79, 70, 229)',
                                        backgroundColor: 'rgba(79, 70, 229, 0.5)',
                                        tension: 0.4,
                                    }]
                                }}
                                options={chartOptions}
                            />
                        </div>
                    </section>

                    <section className="card p-6 bg-white shadow-xl rounded-2xl">
                        <h3 className="font-bold text-xl text-gray-800">Purchases by Vendor</h3>
                        <div className="h-64 flex items-center justify-center">
                            <Bar
                                data={{
                                    labels: vendorData.labels,
                                    datasets: [{
                                        label: 'Purchase Amount',
                                        data: vendorData.data,
                                        backgroundColor: ['#4f46e5', '#8b5cf6', '#a855f7', '#6366f1'],
                                    }]
                                }}
                                options={chartOptions}
                            />
                        </div>
                    </section>
                </div>

                {/* Pending Bills Table */}
                <section className="card p-6 bg-white shadow-xl rounded-2xl">
                    <h3 className="font-bold text-xl text-gray-800">Pending Bills</h3>
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Invoice</th>
                                <th className="px-6 py-3">Vendor</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Due Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pendingBills.map((bill, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-indigo-600">{bill.invoice}</td>
                                    <td className="px-6 py-4">{bill.vendor}</td>
                                    <td className="px-6 py-4">₹{bill.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4">{bill.dueDate}</td>
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