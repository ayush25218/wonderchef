// app/purchases/orders/page.js
"use client";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Filter, FileText } from "lucide-react";
import FullPageLoader from "../../../components/FullPageLoader";

const purchaseOrders = [
    { orderId: '#PO-2001', date: 'Aug 19, 2025', vendor: 'Vendor A', amount: 5000.00, status: 'Pending' },
    { orderId: '#PO-2002', date: 'Aug 18, 2025', vendor: 'Vendor B', amount: 2500.50, status: 'Approved' },
    { orderId: '#PO-2003', date: 'Aug 17, 2025', vendor: 'Vendor C', amount: 12000.00, status: 'Completed' },
    { orderId: '#PO-2004', date: 'Aug 16, 2025', vendor: 'Vendor A', amount: 3500.00, status: 'Approved' },
    { orderId: '#PO-2005', date: 'Aug 15, 2025', vendor: 'Vendor B', amount: 800.00, status: 'Pending' },
    { orderId: '#PO-2006', date: 'Aug 14, 2025', vendor: 'Vendor C', amount: 9500.00, status: 'Completed' },
    { orderId: '#PO-2007', date: 'Aug 13, 2025', vendor: 'Vendor A', amount: 750.50, status: 'Pending' },
    { orderId: '#PO-2008', date: 'Aug 12, 2025', vendor: 'Vendor B', amount: 15000.00, status: 'Approved' },
];

export default function Page() {
    const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  // Loader simulation
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }, []);

    const filteredOrders = purchaseOrders.filter(order => {
        return filterStatus === "All" || order.status === filterStatus;
    });

    if (loading)
        return <FullPageLoader message="Loading Order..." loading={loading} />;

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Purchase Orders" />
            <div className="p-6">
                <div className="card bg-white shadow-xl rounded-2xl p-6">
                    {/* Header and Filter */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h3 className="font-bold text-xl text-gray-800">Order List</h3>
                        <div className="relative">
                            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Order ID</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Vendor</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-indigo-600 whitespace-nowrap">{order.orderId}</td>
                                        <td className="px-6 py-4">{order.date}</td>
                                        <td className="px-6 py-4">{order.vendor}</td>
                                        <td className="px-6 py-4">₹{order.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                  ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'Approved' ? 'bg-indigo-100 text-indigo-800' :
                                                        'bg-green-100 text-green-800'}`}>
                                                    {order.status}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-indigo-600 hover:text-indigo-900 transition-colors">
                                                <FileText size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No orders found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}