// app/purchases/list/page.js
"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import { Filter, Search } from "lucide-react";

const purchaseHistory = [
    { invoice: '#PO-1001', date: 'Aug 19, 2025', vendor: 'Vendor A', amount: 5000.00, status: 'Paid' },
    { invoice: '#PO-1002', date: 'Aug 18, 2025', vendor: 'Vendor B', amount: 2500.50, status: 'Pending' },
    { invoice: '#PO-1003', date: 'Aug 17, 2025', vendor: 'Vendor C', amount: 12000.00, status: 'Paid' },
    { invoice: '#PO-1004', date: 'Aug 16, 2025', vendor: 'Vendor A', amount: 3500.00, status: 'Paid' },
    { invoice: '#PO-1005', date: 'Aug 15, 2025', vendor: 'Vendor B', amount: 800.00, status: 'Pending' },
    { invoice: '#PO-1006', date: 'Aug 14, 2025', vendor: 'Vendor C', amount: 9500.00, status: 'Paid' },
    { invoice: '#PO-1007', date: 'Aug 13, 2025', vendor: 'Vendor A', amount: 750.50, status: 'Paid' },
    { invoice: '#PO-1008', date: 'Aug 12, 2025', vendor: 'Vendor B', amount: 15000.00, status: 'Pending' },
    { invoice: '#PO-1009', date: 'Aug 11, 2025', vendor: 'Vendor C', amount: 6200.00, status: 'Paid' },
    { invoice: '#PO-1010', date: 'Aug 10, 2025', vendor: 'Vendor A', amount: 4800.00, status: 'Paid' },
];

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredPurchases = purchaseHistory.filter(purchase => {
        const matchesSearch = purchase.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || purchase.invoice.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || purchase.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPurchases.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Purchase History" />
            <div className="p-6">
                <div className="card bg-white shadow-xl rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h3 className="font-bold text-xl text-gray-800">Purchase Transactions</h3>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="relative flex-1">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by vendor..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                />
                            </div>
                            <div className="relative">
                                <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Invoice</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Vendor</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((purchase, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-indigo-600 whitespace-nowrap">{purchase.invoice}</td>
                                        <td className="px-6 py-4">{purchase.date}</td>
                                        <td className="px-6 py-4">{purchase.vendor}</td>
                                        <td className="px-6 py-4">₹{purchase.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${purchase.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {purchase.status}
                                                </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No transactions found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                        <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPurchases.length)} of {filteredPurchases.length} entries</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}