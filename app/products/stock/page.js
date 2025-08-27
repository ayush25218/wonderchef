// app/products/stock/page.js
"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import { AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";

// Mock data, you should replace this with data from your database
const lowStockAlerts = [
    { id: 2, name: 'Eco-Friendly Water Bottle', sku: 'WB-001', stock: 25 },
    { id: 4, name: 'Super Air Fryer', sku: 'AF-202', stock: 10 },
    { id: 7, name: 'Compact Toaster', sku: 'TOA-404', stock: 0 },
    { id: 10, name: 'Espresso Machine', sku: 'ES-700', stock: 5 },
];

const allProducts = [
    { id: 1, name: 'Smart Blender 9000', stock: 150 },
    { id: 2, name: 'Eco-Friendly Water Bottle', stock: 25 },
    { id: 3, name: 'Pro Chef Knife Set', stock: 80 },
    { id: 4, name: 'Super Air Fryer', stock: 10 },
    { id: 5, name: 'Ceramic Coffee Mug', stock: 300 },
    { id: 6, name: 'Silicone Spatula Set', stock: 75 },
    { id: 7, name: 'Compact Toaster', stock: 0 },
    { id: 8, name: 'Cast Iron Skillet', stock: 45 },
    { id: 9, name: 'Digital Kitchen Scale', stock: 120 },
    { id: 10, name: 'Espresso Machine', stock: 5 },
];

export default function Page() {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [adjustmentType, setAdjustmentType] = useState("in"); // 'in' or 'out'

    const handleStockAdjustment = (e) => {
        e.preventDefault();
        if (!selectedProduct || !quantity) {
            alert("Please select a product and enter a quantity.");
            return;
        }

        const product = allProducts.find(p => p.id.toString() === selectedProduct);
        const adjustment = parseInt(quantity);
        const newStock = adjustmentType === 'in' ? product.stock + adjustment : product.stock - adjustment;

        if (newStock < 0) {
            alert("Error: Stock cannot be negative.");
            return;
        }

        console.log(`Adjusting stock for ${product.name}: ${adjustmentType === 'in' ? '+' : '-'}${adjustment}. New stock: ${newStock}`);
        alert(`Stock for ${product.name} adjusted. New stock: ${newStock}`);

        // Reset form
        setSelectedProduct("");
        setQuantity("");
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Stock Management" />
            <ProductHeader />
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left side: Stock Adjustments Form */}
                <section className="card p-6 bg-white shadow-xl rounded-2xl lg:col-span-2">
                    <h3 className="font-bold text-xl text-gray-800">Stock Adjustment</h3>
                    <p className="text-sm text-gray-500 mt-1">Easily update stock levels for any product.</p>
                    <form onSubmit={handleStockAdjustment} className="mt-6 space-y-6">
                        {/* Product Selection */}
                        <div>
                            <label htmlFor="productSelect" className="block text-sm font-medium text-gray-700">Select Product</label>
                            <select
                                id="productSelect"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="">-- Choose a product --</option>
                                {allProducts.map(product => (
                                    <option key={product.id} value={product.id}>{product.name} (Current: {product.stock})</option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity and Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    min="1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Adjustment Type</label>
                                <div className="mt-2 flex space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="stockIn"
                                            name="adjustmentType"
                                            value="in"
                                            checked={adjustmentType === 'in'}
                                            onChange={(e) => setAdjustmentType(e.target.value)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                        />
                                        <label htmlFor="stockIn" className="ml-2 text-sm text-gray-700 flex items-center gap-1">
                                            <ArrowUp size={16} className="text-green-500" /> Stock In
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="stockOut"
                                            name="adjustmentType"
                                            value="out"
                                            checked={adjustmentType === 'out'}
                                            onChange={(e) => setAdjustmentType(e.target.value)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                        />
                                        <label htmlFor="stockOut" className="ml-2 text-sm text-gray-700 flex items-center gap-1">
                                            <ArrowDown size={16} className="text-red-500" /> Stock Out
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                Update Stock
                            </button>
                        </div>
                    </form>
                </section>

                {/* Right side: Low Stock Alerts */}
                <section className="card p-6 bg-white shadow-xl rounded-2xl">
                    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                        <AlertTriangle size={24} className="text-yellow-500" />
                        Low Stock Alerts
                    </h3>
                    <div className="mt-4 space-y-4">
                        {lowStockAlerts.length > 0 ? (
                            lowStockAlerts.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-red-600">{item.stock}</p>
                                        <p className="text-xs text-gray-500">units left</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 bg-green-50 rounded-lg border border-green-200">
                                <p>All products are sufficiently stocked!</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}