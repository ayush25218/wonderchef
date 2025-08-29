// app/products/stock/page.js
"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import { AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";

const lowStockAlerts = [
  { id: 2, name: "Eco-Friendly Water Bottle", sku: "WB-001", stock: 25 },
  { id: 4, name: "Super Air Fryer", sku: "AF-202", stock: 10 },
  { id: 7, name: "Compact Toaster", sku: "TOA-404", stock: 0 },
  { id: 10, name: "Espresso Machine", sku: "ES-700", stock: 5 },
];

const allProducts = [
  { id: 1, name: "Smart Blender 9000", stock: 150 },
  { id: 2, name: "Eco-Friendly Water Bottle", stock: 25 },
  { id: 3, name: "Pro Chef Knife Set", stock: 80 },
  { id: 4, name: "Super Air Fryer", stock: 10 },
  { id: 5, name: "Ceramic Coffee Mug", stock: 300 },
  { id: 6, name: "Silicone Spatula Set", stock: 75 },
  { id: 7, name: "Compact Toaster", stock: 0 },
  { id: 8, name: "Cast Iron Skillet", stock: 45 },
  { id: 9, name: "Digital Kitchen Scale", stock: 120 },
  { id: 10, name: "Espresso Machine", stock: 5 },
];

export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [adjustmentType, setAdjustmentType] = useState("in");

  const handleStockAdjustment = (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) {
      alert("Please select a product and enter a quantity.");
      return;
    }

    const product = allProducts.find((p) => p.id.toString() === selectedProduct);
    const adjustment = parseInt(quantity);
    const newStock =
      adjustmentType === "in" ? product.stock + adjustment : product.stock - adjustment;

    if (newStock < 0) {
      alert("Error: Stock cannot be negative.");
      return;
    }

    console.log(
      `Adjusting stock for ${product.name}: ${
        adjustmentType === "in" ? "+" : "-"
      }${adjustment}. New stock: ${newStock}`
    );
    alert(`Stock for ${product.name} adjusted. New stock: ${newStock}`);

    setSelectedProduct("");
    setQuantity("");
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 via-white to-slate-200 min-h-screen">
      <Header title="Stock Management" />
      <ProductHeader />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Stock Adjustment Form */}
        <section className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-2xl p-8 transition-transform hover:scale-[1.01]">
          <h3 className="font-bold text-2xl text-slate-800">Stock Adjustment</h3>
          <p className="text-sm text-slate-500 mt-1">
            Easily update stock levels for any product.
          </p>

          <form onSubmit={handleStockAdjustment} className="mt-8 space-y-6">
            {/* Product Selection */}
            <div>
              <label
                htmlFor="productSelect"
                className="block text-sm font-semibold text-slate-700"
              >
                Select Product
              </label>
              <select
                id="productSelect"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">-- Choose a product --</option>
                {allProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (Current: {product.stock})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity + Adjustment Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Adjustment Type
                </label>
                <div className="mt-3 flex space-x-6">
                  <label
                    htmlFor="stockIn"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border transition-colors ${
                      adjustmentType === "in"
                        ? "bg-green-100 border-green-400 text-green-700"
                        : "border-slate-300 text-slate-600"
                    }`}
                  >
                    <input
                      type="radio"
                      id="stockIn"
                      name="adjustmentType"
                      value="in"
                      checked={adjustmentType === "in"}
                      onChange={(e) => setAdjustmentType(e.target.value)}
                      className="hidden"
                    />
                    <ArrowUp size={18} /> Stock In
                  </label>
                  <label
                    htmlFor="stockOut"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border transition-colors ${
                      adjustmentType === "out"
                        ? "bg-red-100 border-red-400 text-red-700"
                        : "border-slate-300 text-slate-600"
                    }`}
                  >
                    <input
                      type="radio"
                      id="stockOut"
                      name="adjustmentType"
                      value="out"
                      checked={adjustmentType === "out"}
                      onChange={(e) => setAdjustmentType(e.target.value)}
                      className="hidden"
                    />
                    <ArrowDown size={18} /> Stock Out
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition-transform"
            >
              Update Stock
            </button>
          </form>
        </section>

        {/* Low Stock Alerts */}
        <section className="bg-white/80 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-2xl p-8 transition-transform hover:scale-[1.01]">
          <h3 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
            <AlertTriangle size={24} className="text-yellow-500" />
            Low Stock Alerts
          </h3>

          <div className="mt-6 space-y-4">
            {lowStockAlerts.length > 0 ? (
              lowStockAlerts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-white shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        item.stock === 0 ? "text-red-600" : "text-orange-600"
                      }`}
                    >
                      {item.stock}
                    </p>
                    <p className="text-xs text-slate-500">units left</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-green-700 bg-green-50 rounded-xl border border-green-200">
                ✅ All products are sufficiently stocked!
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
