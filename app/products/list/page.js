// app/products/list/page.js
"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import { Search, Edit, Trash2 } from "lucide-react";

// Mock data, you should replace this with data from your database
const mockProducts = [
    { id: 1, name: 'Smart Blender 9000', sku: 'BL-9000', category: 'Appliances', price: 5000, stock: 150 },
    { id: 2, name: 'Eco-Friendly Water Bottle', sku: 'WB-001', category: 'Kitchenware', price: 550, stock: 25 },
    { id: 3, name: 'Pro Chef Knife Set', sku: 'KN-012', category: 'Kitchenware', price: 2800, stock: 80 },
    { id: 4, name: 'Super Air Fryer', sku: 'AF-202', category: 'Appliances', price: 7500, stock: 10 },
    { id: 5, name: 'Ceramic Coffee Mug', sku: 'MUG-303', category: 'Drinkware', price: 250, stock: 300 },
    { id: 6, name: 'Silicone Spatula Set', sku: 'ST-555', category: 'Cookware', price: 400, stock: 75 },
    { id: 7, name: 'Compact Toaster', sku: 'TOA-404', category: 'Appliances', price: 1500, stock: 0 },
    { id: 8, name: 'Cast Iron Skillet', sku: 'SK-101', category: 'Cookware', price: 1200, stock: 45 },
    { id: 9, name: 'Digital Kitchen Scale', sku: 'SCALE-01', category: 'Gadgets', price: 850, stock: 120 },
    { id: 10, name: 'Espresso Machine', sku: 'ES-700', category: 'Appliances', price: 15000, stock: 5 },
];

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const filteredProducts = mockProducts.filter(product => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        return (
            product.name.toLowerCase().includes(lowerCaseSearch) ||
            product.sku.toLowerCase().includes(lowerCaseSearch) ||
            product.category.toLowerCase().includes(lowerCaseSearch)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEdit = (productId) => {
        console.log(`Edit product with ID: ${productId}`);
        alert(`Editing product with ID: ${productId}`);
        // Here you would navigate to an edit page or open a modal
    };

    const handleDelete = (productId) => {
        if (confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
            console.log(`Delete product with ID: ${productId}`);
            alert(`Product with ID: ${productId} has been deleted.`);
            // Here you would call an API to delete the product
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Product List" />
            <ProductHeader />
            <div className="p-6">
                <div className="card bg-white shadow-xl rounded-2xl p-6">
                    {/* Header and Search Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h3 className="font-bold text-xl text-gray-800">All Products</h3>
                        <div className="relative w-full md:w-1/3">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products, SKU, or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Product</th>
                                <th scope="col" className="px-6 py-3">SKU</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Stock</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((product, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                                        <td className="px-6 py-4">{product.sku}</td>
                                        <td className="px-6 py-4">{product.category}</td>
                                        <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                  ${product.stock > 50 ? 'bg-green-100 text-green-800' :
                                                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'}`}>
                                                    {product.stock > 0 ? product.stock : 'Out of Stock'}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <button onClick={() => handleEdit(product.id)} className="text-indigo-600 hover:text-indigo-900 transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No products found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                        <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} entries</span>
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