// app/products/list/page.js
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import FullPageLoader from "../../../components/FullPageLoader";
import { Search, Edit, Trash2 } from "lucide-react";

// Mock Data
const mockProducts = [
  { id: 1, name: "Smart Blender 9000", sku: "BL-9000", category: "Appliances", price: 5000, stock: 150 },
  { id: 2, name: "Eco-Friendly Water Bottle", sku: "WB-001", category: "Kitchenware", price: 550, stock: 25 },
  { id: 3, name: "Pro Chef Knife Set", sku: "KN-012", category: "Kitchenware", price: 2800, stock: 80 },
  { id: 4, name: "Super Air Fryer", sku: "AF-202", category: "Appliances", price: 7500, stock: 10 },
  { id: 5, name: "Ceramic Coffee Mug", sku: "MUG-303", category: "Drinkware", price: 250, stock: 300 },
  { id: 6, name: "Silicone Spatula Set", sku: "ST-555", category: "Cookware", price: 400, stock: 75 },
  { id: 7, name: "Compact Toaster", sku: "TOA-404", category: "Appliances", price: 1500, stock: 0 },
  { id: 8, name: "Cast Iron Skillet", sku: "SK-101", category: "Cookware", price: 1200, stock: 45 },
  { id: 9, name: "Digital Kitchen Scale", sku: "SCALE-01", category: "Gadgets", price: 850, stock: 120 },
  { id: 10, name: "Espresso Machine", sku: "ES-700", category: "Appliances", price: 15000, stock: 5 },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 7;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // 800ms fake load
    return () => clearTimeout(timer);
  }, []);

  // Filtering
  const filteredProducts = mockProducts.filter((product) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowerCaseSearch) ||
      product.sku.toLowerCase().includes(lowerCaseSearch) ||
      product.category.toLowerCase().includes(lowerCaseSearch)
    );
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleEdit = (productId) => alert(`Editing product with ID: ${productId}`);
  const handleDelete = (productId) => {
    if (confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
      alert(`Product with ID: ${productId} deleted.`);
    }
  };

  if (loading) return <FullPageLoader message="Loading Product List..." loading={true} />;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header title="Product List" />
      <ProductHeader />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-6 transition-transform transform hover:-translate-y-1"
        >
          {/* Header + Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h3 className="font-bold text-xl text-gray-800">All Products</h3>
            <div className="flex gap-2 w-full md:w-1/3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, SKU, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-2 w-full rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>
              <select className="border rounded-full px-3 py-2 focus:ring-indigo-200 focus:ring-2">
                <option>All Categories</option>
                <option>Appliances</option>
                <option>Kitchenware</option>
                <option>Cookware</option>
                <option>Drinkware</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-t-lg">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">SKU</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {currentItems.length > 0 ? (
                    currentItems.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white border-b hover:bg-indigo-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                        <td className="px-6 py-4">{product.sku}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              product.stock > 50
                                ? "bg-green-100 text-green-800"
                                : product.stock > 0
                                ? "bg-yellow-100 text-yellow-800 animate-pulse"
                                : "bg-red-100 text-red-800 animate-ping"
                            }`}
                          >
                            {product.stock > 0 ? product.stock : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="bg-indigo-50 p-2 rounded-full hover:bg-indigo-100 transition"
                            title="Edit"
                          >
                            <Edit size={16} className="text-indigo-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-50 p-2 rounded-full hover:bg-red-100 transition"
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No products found.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
            <span>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
              {filteredProducts.length} entries
            </span>
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-4 py-2 rounded-full transition ${
                    currentPage === idx + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
