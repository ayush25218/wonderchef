'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default function AddNewVendorPage() {
    const [vendorData, setVendorData] = useState({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
    });

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); // 'success', 'error', 'loading'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('Adding vendor...');

        try {
            const response = await fetch('/api/vendors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vendorData),
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Vendor added successfully!');
                setVendorData({
                    name: '',
                    contactPerson: '',
                    email: '',
                    phone: '',
                    address: '',
                });
            } else {
                setStatus('error');
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || 'Failed to add vendor.'}`);
            }
        } catch (error) {
            setStatus('error');
            console.error('Submission error:', error);
            setMessage('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Add a New Vendor</h1>
                    <Link href="/vendor/list">
                        <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105">
                            View Vendor List
                        </span>
                    </Link>
                </div>

                {/* Main Form Card */}
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Grid for Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Vendor Name</label>
                                <input id="name" name="name" type="text" autocomplete="off" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" value={vendorData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
                                <input id="contactPerson" name="contactPerson" autocomplete="off" type="text" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" value={vendorData.contactPerson} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input id="email" name="email" autocomplete="off" type="email" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" value={vendorData.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input id="phone" name="phone" type="tel" autocomplete="off" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" value={vendorData.phone} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Full-width Address Field */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea id="address" name="address" autocomplete="off" rows="4" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" value={vendorData.address} onChange={handleChange} />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Adding...' : 'Add Vendor'}
                        </button>
                    </form>

                    {/* Status Message */}
                    {message && (
                        <div className="mt-8">
                            <div className={`px-4 py-3 rounded-lg relative text-center ${status === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`} role="alert">
                                <span className="block sm:inline">{message}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}