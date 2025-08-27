// app/products/categories/page.js
"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import ProductHeader from "../../../components/ProductHeader";
import { ChevronDown, ChevronUp, Plus, Tag } from "lucide-react";

// Mock data, you should replace this with data from your database
const categoriesData = [
    {
        name: 'Appliances',
        slug: 'appliances',
        subcategories: [
            { name: 'Small Appliances', slug: 'small-appliances' },
            { name: 'Large Appliances', slug: 'large-appliances' },
        ],
    },
    {
        name: 'Kitchenware',
        slug: 'kitchenware',
        subcategories: [
            { name: 'Cookware', slug: 'cookware' },
            { name: 'Bakeware', slug: 'bakeware' },
            { name: 'Cutlery', slug: 'cutlery' },
        ],
    },
    {
        name: 'Drinkware',
        slug: 'drinkware',
        subcategories: [
            { name: 'Mugs', slug: 'mugs' },
            { name: 'Glassware', slug: 'glassware' },
        ],
    },
];

export default function Page() {
    const [openCategory, setOpenCategory] = useState(null);
    const [newCategory, setNewCategory] = useState("");
    const [newSubcategory, setNewSubcategory] = useState({ categorySlug: '', name: '' });

    const handleCategoryToggle = (slug) => {
        setOpenCategory(openCategory === slug ? null : slug);
    };

    const handleNewCategorySubmit = (e) => {
        e.preventDefault();
        console.log("New Category added:", newCategory);
        alert(`New Category "${newCategory}" added!`);
        setNewCategory("");
    };

    const handleNewSubcategorySubmit = (e) => {
        e.preventDefault();
        console.log("New Subcategory added:", newSubcategory);
        alert(`New Subcategory "${newSubcategory.name}" added to "${newSubcategory.categorySlug}"!`);
        setNewSubcategory({ categorySlug: '', name: '' });
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Categories & Subcategories" />
            <ProductHeader />
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left side: Category/Subcategory List */}
                <section className="card p-6 bg-white shadow-xl rounded-2xl lg:col-span-2">
                    <h3 className="font-bold text-xl text-gray-800">Manage Categories</h3>
                    <div className="mt-4 space-y-2">
                        {categoriesData.map(category => (
                            <div key={category.slug} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => handleCategoryToggle(category.slug)}
                                    className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Tag size={18} className="text-indigo-600" />
                                        <span>{category.name}</span>
                                    </div>
                                    {openCategory === category.slug ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {/* Dropdown menu */}
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden
                                    ${openCategory === category.slug ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <ul className="py-2 px-4 space-y-1">
                                        {category.subcategories.map(sub => (
                                            <li key={sub.slug}>
                                                <a href={`/products/categories/${sub.slug}`} className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                                    {sub.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Right side: Add New Forms */}
                <section className="card p-6 bg-white shadow-xl rounded-2xl">
                    <h3 className="font-bold text-xl text-gray-800">Add New</h3>
                    <div className="mt-4 space-y-6">
                        {/* Add New Category Form */}
                        <form onSubmit={handleNewCategorySubmit} className="space-y-4">
                            <div>
                                <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700">New Category Name</label>
                                <input
                                    type="text"
                                    id="newCategory"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                <Plus size={18} className="mr-2" /> Add Category
                            </button>
                        </form>

                        <div className="border-t border-gray-200 pt-6"></div>

                        {/* Add New Subcategory Form */}
                        <form onSubmit={handleNewSubcategorySubmit} className="space-y-4">
                            <div>
                                <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700">Parent Category</label>
                                <select
                                    id="parentCategory"
                                    value={newSubcategory.categorySlug}
                                    onChange={(e) => setNewSubcategory({ ...newSubcategory, categorySlug: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categoriesData.map(cat => (
                                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="newSubcategory" className="block text-sm font-medium text-gray-700">New Subcategory Name</label>
                                <input
                                    type="text"
                                    id="newSubcategory"
                                    value={newSubcategory.name}
                                    onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
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