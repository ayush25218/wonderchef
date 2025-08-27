// app/products/brands/page.js
"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import { Plus, Edit, Trash2, Globe } from "lucide-react";

// Mock data, you should replace this with data from your database
const brandsData = [
    { id: 1, name: 'WonderChef', products: 50 },
    { id: 2, name: 'Kitchen King', products: 120 },
    { id: 3, name: 'EcoWare', products: 35 },
    { id: 4, name: 'Fusion Appliances', products: 80 },
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
        <div className="bg-slate-50 min-h-screen">
            <Header title="Brands Management" />
            <ProductHeader />
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left side: Brands List */}
                <section className="card p-6 bg-white shadow-xl rounded-2xl lg:col-span-2">
                    <h3 className="font-bold text-xl text-gray-800">All Brands</h3>
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Brand Name</th>
                                <th scope="col" className="px-6 py-3 text-right">Products Count</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {brandsData.length > 0 ? (
                                brandsData.map((brand) => (
                                    <tr key={brand.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                            <Globe size={18} className="text-indigo-600" />
                                            {brand.name}
                                        </td>
                                        <td className="px-6 py-4 text-right">{brand.products}</td>
                                        <td className="px-6 py-4 flex justify-end gap-2">
                                            <button onClick={() => handleEditBrand(brand.id)} className="text-indigo-600 hover:text-indigo-900 transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDeleteBrand(brand.id)} className="text-red-600 hover:text-red-900 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No brands found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Right side: Add New Brand Form */}
                <section className="card p-6 bg-white shadow-xl rounded-2xl">
                    <h3 className="font-bold text-xl text-gray-800">Add New Brand</h3>
                    <form onSubmit={handleAddBrand} className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="newBrand" className="block text-sm font-medium text-gray-700">Brand Name</label>
                            <input
                                type="text"
                                id="newBrand"
                                value={newBrandName}
                                onChange={(e) => setNewBrandName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            <Plus size={18} className="mr-2" /> Add Brand
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}