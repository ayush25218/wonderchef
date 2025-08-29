// app/purchases/list/page.js
"use client";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FullPageLoader from "../../../components/FullPageLoader";

const purchaseHistory = [
  {
    vendor: "Vendor A",
    branch: "Delhi",
    product: "iPhone 15",
    unit: "pcs",
    qty: 10,
    purchaseDate: "Aug 19, 2025",
    purchaseRate: 120000,
    discount: 5000,
    total: 115000,
    sellingPrice: 150000,
    status: "Paid",
  },
  {
    vendor: "Vendor B",
    branch: "Mumbai",
    product: "AirPods Pro",
    unit: "pcs",
    qty: 20,
    purchaseDate: "Aug 18, 2025",
    purchaseRate: 6000,
    discount: 200,
    total: 118000,
    sellingPrice: 7500,
    status: "Pending",
  },
  {
    vendor: "Vendor C",
    branch: "Bangalore",
    product: "Nike Shoes",
    unit: "pairs",
    qty: 15,
    purchaseDate: "Aug 17, 2025",
    purchaseRate: 8000,
    discount: 500,
    total: 115000,
    sellingPrice: 12000,
    status: "Paid",
  },
  {
    vendor: "Vendor A",
    branch: "Chennai",
    product: "Samsung TV",
    unit: "pcs",
    qty: 5,
    purchaseDate: "Aug 16, 2025",
    purchaseRate: 18000,
    discount: 1000,
    total: 89000,
    sellingPrice: 21000,
    status: "Paid",
  },
  {
    vendor: "Vendor B",
    branch: "Hyderabad",
    product: "Study Table",
    unit: "pcs",
    qty: 8,
    purchaseDate: "Aug 15, 2025",
    purchaseRate: 4000,
    discount: 500,
    total: 31000,
    sellingPrice: 5000,
    status: "Pending",
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;

  // Loader simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredPurchases = purchaseHistory.filter((purchase) => {
    const matchesSearch =
      purchase.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || purchase.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPurchases.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return <FullPageLoader message="Loading Purchases..." loading={loading} />;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <Header title="Purchase History" />
      <motion.div
        className="p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-slate-200">
          {/* Filters */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-bold text-2xl text-gray-800">
            Purchase Transactions
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by vendor or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                />
              </div>
              <div className="relative">
                <Filter
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
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
          <div className="overflow-x-auto w-full rounded-xl border border-slate-200 shadow-md">
            <table className="min-w-max text-sm text-left text-gray-600 table-auto">
              <thead className="text-xs uppercase bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700">
                <tr>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Vendor Name</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Branch</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Product</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Unit</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Qty</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Purchase Date</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Purchase Rate</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Discount</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Total</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Selling Price</th>
                  <th className="px-3 py-3 whitespace-nowrap text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {currentItems.length > 0 ? (
                    currentItems.map((purchase, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white border-b hover:bg-indigo-50/40 transition"
                      >
                        <td className="px-6 py-4 font-medium text-indigo-600 whitespace-nowrap">
                          {purchase.vendor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {purchase.branch}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {purchase.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {purchase.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {purchase.qty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {purchase.purchaseDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ₹{purchase.purchaseRate.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ₹{purchase.discount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 font-semibold whitespace-nowrap">
                          ₹{purchase.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ₹{purchase.sellingPrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                              purchase.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {purchase.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="11"
                        className="px-6 py-6 text-center text-gray-500 italic whitespace-nowrap"
                      >
                        No purchase transactions found.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <motion.div
            className="mt-8 flex justify-between items-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredPurchases.length)} of{" "}
              {filteredPurchases.length} entries
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
