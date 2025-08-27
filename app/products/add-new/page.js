// app/products/add-new/page.js
"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import { PlusCircle, Image as ImageIcon } from "lucide-react";

export default function Page() {
    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Product Added:", { name, sku, category, price, stock, imageFile });
        alert("Product Added Successfully!");

        // Optionally, reset the form after submission
        setName("");
        setSku("");
        setCategory("");
        setPrice("");
        setStock("");
        setImageFile(null);
        setImagePreview(null);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Add New Product" />
            <ProductHeader />
            <div className="p-6">
                <div className="card p-8 bg-white shadow-xl rounded-2xl max-w-4xl mx-auto">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Product Details Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Product Details</h3>
                                <p className="text-sm text-gray-500 mt-1">Fill in the basic product information.</p>
                            </div>
                            <div className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                        autocomplete="off"
                                    />
                                </div>
                                {/* SKU */}
                                <div>
                                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                                    <input
                                        type="text"
                                        id="sku"
                                        value={sku}
                                        onChange={(e) => setSku(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                        autocomplete="off"
                                    />
                                </div>
                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-8"></div>

                        {/* Pricing & Stock Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Pricing & Stock</h3>
                                <p className="text-sm text-gray-500 mt-1">Set the price and current stock levels.</p>
                            </div>
                            <div className="space-y-6">
                                {/* Price */}
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                    <input
                                        type="number"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        min="0"
                                        required
                                        autocomplete="off"
                                    />
                                </div>
                                {/* Stock */}
                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        id="stock"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        min="0"
                                        required
                                        autocomplete="off"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-8"></div>

                        {/* Image Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Product Image</h3>
                                <p className="text-sm text-gray-500 mt-1">Upload a high-quality image of the product.</p>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Product Preview" className="h-48 w-48 rounded-md object-cover shadow-lg" />
                                ) : (
                                    <div className="h-48 w-48 rounded-md flex items-center justify-center bg-gray-100 text-gray-400 border border-gray-300 border-dashed">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                                        Upload Image
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        autocomplete="off"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusCircle size={24} className="mr-2" /> Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}