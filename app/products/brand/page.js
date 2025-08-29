// app/products/brands/page.js
"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import { Plus, Edit, Trash2, Globe } from "lucide-react";

// Mock data (replace with DB/API)
const brandsData = [
  { id: 1, name: "WonderChef", products: 50 },
  { id: 2, name: "Kitchen King", products: 120 },
  { id: 3, name: "EcoWare", products: 35 },
  { id: 4, name: "Fusion Appliances", products: 80 },
];

export default function Page() {
  const [newBrandName, setNewBrandName] = useState("");

  const handleAddBrand = (e) => {
    e.preventDefault();
    console.log("New Brand added:", newBrandName);
    alert(`New Brand "${newBrandName}" added!`);
    setNewBrandName("");
  };

  const handleEditBrand = (brandId) => {
    console.log(`Edit brand with ID: ${brandId}`);
    alert(`Editing brand with ID: ${brandId}`);
  };

  const handleDeleteBrand = (brandId) => {
    if (confirm(`Are you sure you want to delete this brand?`)) {
      console.log(`Delete brand with ID: ${brandId}`);
      alert(`Brand with ID: ${brandId} has been deleted.`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 via-white to-slate-200 min-h-screen">
      <Header title="Brands Management" />
      <ProductHeader />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left side: Brands List */}
        <section className="lg:col-span-2 bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-100 p-6 transition-transform hover:scale-[1.01]">
          <h3 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
            <Globe size={22} className="text-indigo-600" />
            All Brands
          </h3>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 shadow-inner">
            <table className="min-w-full text-sm text-left text-slate-700">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 text-xs uppercase tracking-wide">
                <tr>
                  <th scope="col" className="px-6 py-3">Brand Name</th>
                  <th scope="col" className="px-6 py-3 text-right">Products</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {brandsData.length > 0 ? (
                  brandsData.map((brand) => (
                    <tr
                      key={brand.id}
                      className="bg-white border-b hover:bg-indigo-50/70 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <Globe size={18} className="text-indigo-600" />
                        {brand.name}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-700">
                        {brand.products}
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-3">
                        <button
                          onClick={() => handleEditBrand(brand.id)}
                          className="p-2 rounded-xl bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteBrand(brand.id)}
                          className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      No brands found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right side: Add New Brand Form */}
        <section className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-100 p-6 transition-transform hover:scale-[1.01]">
          <h3 className="font-bold text-2xl text-slate-800 mb-4">
            Add New Brand
          </h3>
          <form onSubmit={handleAddBrand} className="space-y-5">
            <div>
              <label
                htmlFor="newBrand"
                className="block text-sm font-medium text-slate-700"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="newBrand"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="Enter brand name..."
                className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
            >
              <Plus size={18} className="mr-2" /> Add Brand
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
