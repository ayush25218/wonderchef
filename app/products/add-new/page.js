// app/products/add-new/page.js
"use client";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import {
  PlusCircle,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import FullPageLoader from "../../../components/FullPageLoader";

export default function Page() {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("active");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  // Full page loader simulation
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSubmitLoading(false);
    setSuccessPopup(true);

    // Reset form
    setName("");
    setSku("");
    setCategory("");
    setBrand("");
    setPrice("");
    setStock("");
    setDescription("");
    setTags("");
    setStatus("active");
    setImageFile(null);
    setImagePreview(null);
  };

  if (pageLoading) return <FullPageLoader message="Loading Add Product..." loading={true} />;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <Header title="Add New Product" />
      <ProductHeader />
      <div className="p-6">
        <div className="max-w-full mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">
            Product Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Submit Loader overlay */}
            {submitLoading && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 rounded-3xl">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
              </div>
            )}

            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                placeholder="Enter product name"
                required
                autoComplete="off"
              />
            </div>

            {/* SKU & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">SKU / Product Code</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                  placeholder="Enter SKU"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                  placeholder="Enter brand name"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                placeholder="Enter category"
                autoComplete="off"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                  placeholder="Enter price"
                  min="0"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Stock Quantity</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                placeholder="Enter product description"
                rows="4"
                autoComplete="off"
              />
            </div>

            {/* Tags & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Tags / Keywords</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                  placeholder="Separate tags by comma"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
              <div className="flex flex-col items-center justify-center space-y-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-52 w-52 object-cover rounded-2xl shadow-lg"
                  />
                ) : (
                  <div className="h-52 w-52 flex items-center justify-center bg-gray-100 rounded-2xl border border-dashed border-gray-300 text-gray-400">
                    <ImageIcon size={48} />
                  </div>
                )}
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
                    Upload Image
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                    autoComplete="off"
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={submitLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition flex items-center justify-center"
              >
                {submitLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2" /> Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {successPopup && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-4 max-w-sm w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-800">Product Added!</h2>
              <p className="text-slate-500">Your product has been successfully added.</p>
              <button
                onClick={() => setSuccessPopup(false)}
                className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-600 transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
