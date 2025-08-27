"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import { Filter, Search } from "lucide-react";

const salesHistory = [
    { invoice: '#INV-1001', date: 'Aug 19, 2025', customer: 'John Doe', amount: 150.00, status: 'Paid' },
    { invoice: '#INV-1002', date: 'Aug 18, 2025', customer: 'Jane Smith', amount: 75.50, status: 'Paid' },
    { invoice: '#INV-1003', date: 'Aug 17, 2025', customer: 'Bob Johnson', amount: 300.25, status: 'Paid' },
    { invoice: '#INV-1004', date: 'Aug 16, 2025', customer: 'Alice Brown', amount: 50.00, status: 'Pending' },
    { invoice: '#INV-1005', date: 'Aug 15, 2025', customer: 'Chris Green', amount: 210.00, status: 'Paid' },
    { invoice: '#INV-1006', date: 'Aug 14, 2025', customer: 'Sarah Miller', amount: 95.00, status: 'Paid' },
    { invoice: '#INV-1007', date: 'Aug 13, 2025', customer: 'David Wilson', amount: 125.75, status: 'Paid' },
    { invoice: '#INV-1008', date: 'Aug 12, 2025', customer: 'Emily Clark', amount: 45.00, status: 'Paid' },
    { invoice: '#INV-1009', date: 'Aug 11, 2025', customer: 'Michael White', amount: 180.00, status: 'Pending' },
    { invoice: '#INV-1010', date: 'Aug 10, 2025', customer: 'Olivia Davis', amount: 220.00, status: 'Paid' },
];

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // डेटा को खोज और फ़िल्टर के आधार पर फ़िल्टर करें
    const filteredSales = salesHistory.filter(sale => {
        const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) || sale.invoice.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || sale.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // पेजिनेशन के लिए डेटा को विभाजित करें
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Sales History" />
            <div className="p-6">
                <div className="card bg-white shadow-xl rounded-2xl p-6">
                    {/* फ़िल्टर और खोज सेक्शन */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h3 className="font-bold text-xl text-gray-800">Sales Transactions</h3>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="relative flex-1">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by customer..."
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

                    {/* टेबल */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Invoice</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Customer</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((sale, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-indigo-600 whitespace-nowrap">{sale.invoice}</td>
                                        <td className="px-6 py-4">{sale.date}</td>
                                        <td className="px-6 py-4">{sale.customer}</td>
                                        <td className="px-6 py-4">₹{sale.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${sale.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {sale.status}
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

                    {/* पेजिनेशन कंट्रोल */}
                    <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                        <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSales.length)} of {filteredSales.length} entries</span>
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