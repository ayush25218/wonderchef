// app/products/categories/page.js
"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import { ChevronDown, ChevronUp, Plus, Tag } from "lucide-react";
import { motion } from "framer-motion";
import FullPageLoader from "../../../components/FullPageLoader";

// Mock data, replace with database data
const categoriesData = [
  {
    name: "Appliances",
    slug: "appliances",
    subcategories: [
      { name: "Small Appliances", slug: "small-appliances" },
      { name: "Large Appliances", slug: "large-appliances" },
    ],
  },
  {
    name: "Kitchenware",
    slug: "kitchenware",
    subcategories: [
      { name: "Cookware", slug: "cookware" },
      { name: "Bakeware", slug: "bakeware" },
      { name: "Cutlery", slug: "cutlery" },
    ],
  },
  {
    name: "Drinkware",
    slug: "drinkware",
    subcategories: [
      { name: "Mugs", slug: "mugs" },
      { name: "Glassware", slug: "glassware" },
    ],
  },
];

export default function Page() {
  const [openCategory, setOpenCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState({
    categorySlug: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCategoryToggle = (slug) => {
    setOpenCategory(openCategory === slug ? null : slug);
  };

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000)); // simulate API call
    console.log("New Category added:", newCategory);
    alert(`New Category "${newCategory}" added!`);
    setNewCategory("");
    setLoading(false);
  };

  const handleNewSubcategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000)); // simulate API call
    console.log("New Subcategory added:", newSubcategory);
    alert(
      `New Subcategory "${newSubcategory.name}" added to "${newSubcategory.categorySlug}"!`
    );
    setNewSubcategory({ categorySlug: "", name: "" });
    setLoading(false);
  };

  if (loading)
    return <FullPageLoader message="Loading Categories..." loading={true} />;

  return (
    <div className="bg-slate-50 min-h-screen relative">
      <Header title="Categories & Subcategories" />
      <ProductHeader />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Category/Subcategory List */}
        <section className="card p-6 bg-white shadow-2xl rounded-2xl lg:col-span-2">
          <h3 className="font-bold text-2xl text-gray-800 mb-4">
            Manage Categories
          </h3>
          <div className="space-y-3">
            {categoriesData.map((category) => (
              <div
                key={category.slug}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => handleCategoryToggle(category.slug)}
                  className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-colors rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <Tag size={18} className="text-indigo-600" />
                    <span>{category.name}</span>
                  </div>
                  {openCategory === category.slug ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>

                {/* Dropdown menu */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openCategory === category.slug ? "auto" : 0,
                    opacity: openCategory === category.slug ? 1 : 0,
                  }}
                  className="overflow-hidden"
                  transition={{ duration: 0.3 }}
                >
                  <ul className="py-2 px-4 space-y-1">
                    {category.subcategories.map((sub) => (
                      <li key={sub.slug}>
                        <a
                          href={`/products/categories/${sub.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* Right side: Add New Forms */}
        <section className="bg-gradient-to-br from-white to-slate-50 p-8 shadow-2xl rounded-2xl border border-gray-200">
          <h3 className="font-bold text-2xl text-gray-800 mb-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm shadow">
              +
            </span>
            Add New
          </h3>

          <div className="space-y-10">
            {/* Add New Category Form */}
            <form
              onSubmit={handleNewCategorySubmit}
              className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Add Category
              </h4>
              <div>
                <label
                  htmlFor="newCategory"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  New Category Name
                </label>
                <input
                  type="text"
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                  placeholder="Enter category name..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg"
              >
                <Plus size={18} className="mr-2" /> Add Category
              </button>
            </form>

            {/* Add New Subcategory Form */}
            <form
              onSubmit={handleNewSubcategorySubmit}
              className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Add Subcategory
              </h4>

              <div>
                <label
                  htmlFor="parentCategory"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Parent Category
                </label>
                <select
                  id="parentCategory"
                  value={newSubcategory.categorySlug}
                  onChange={(e) =>
                    setNewSubcategory({
                      ...newSubcategory,
                      categorySlug: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                  required
                >
                  <option value="">Select a category</option>
                  {categoriesData.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="newSubcategory"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  New Subcategory Name
                </label>
                <input
                  type="text"
                  id="newSubcategory"
                  value={newSubcategory.name}
                  onChange={(e) =>
                    setNewSubcategory({
                      ...newSubcategory,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                  placeholder="Enter subcategory name..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg"
              >
                <Plus size={18} className="mr-2" /> Add Subcategory
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
