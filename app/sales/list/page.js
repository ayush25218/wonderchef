"use client";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FullPageLoader from "../../../components/FullPageLoader";

const salesHistory = [
  { invoice: "#INV-1001", customer: "John Doe", product: "iPhone 15", category: "Electronics", qty: 1, amount: 150000, date: "Aug 19, 2025", status: "Paid" },
  { invoice: "#INV-1002", customer: "Jane Smith", product: "AirPods Pro", category: "Accessories", qty: 2, amount: 7500, date: "Aug 18, 2025", status: "Paid" },
  { invoice: "#INV-1003", customer: "Bob Johnson", product: "Nike Shoes", category: "Fashion", qty: 1, amount: 12000, date: "Aug 17, 2025", status: "Paid" },
  { invoice: "#INV-1004", customer: "Alice Brown", product: "Study Table", category: "Furniture", qty: 1, amount: 5000, date: "Aug 16, 2025", status: "Pending" },
  { invoice: "#INV-1005", customer: "Chris Green", product: "Samsung TV", category: "Electronics", qty: 1, amount: 21000, date: "Aug 15, 2025", status: "Paid" },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  // Loader simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredSales = salesHistory.filter((sale) => {
    const matchesSearch =
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || sale.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <FullPageLoader message="Loading Sales List..." loading={loading} />;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <Header title="Sales History" />
      <motion.div
        className="p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 md:p-8 border border-slate-200">
          {/* Filters */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-bold text-2xl text-gray-800">Sales Transactions</h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by invoice, customer, product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                />
              </div>
              <div className="relative">
                <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                >
                  <option value="All">All Statuses</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-md">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="text-xs uppercase bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3">Invoice</th>
                  <th className="px-6 py-3">Customer Name</th>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {currentItems.length > 0 ? (
                    currentItems.map((sale, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white border-b hover:bg-indigo-50/40 transition"
                      >
                        <td className="px-6 py-4 font-medium text-indigo-600">{sale.invoice}</td>
                        <td className="px-6 py-4">{sale.customer}</td>
                        <td className="px-6 py-4">{sale.product}</td>
                        <td className="px-6 py-4">{sale.category}</td>
                        <td className="px-6 py-4">{sale.qty}</td>
                        <td className="px-6 py-4 font-semibold">₹{sale.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">{sale.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                              sale.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {sale.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-6 text-center text-gray-500 italic">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <motion.div
            className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSales.length)} of {filteredSales.length} entries
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Next
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
