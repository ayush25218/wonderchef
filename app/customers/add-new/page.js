'use client';

import React, { useState } from 'react';
import { customers } from '../../../lib/data';
import Link from 'next/link';

export default function AddNewCustomerPage() {
    const [customerData, setCustomerData] = useState({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        city: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a unique ID for the new customer
        const newCustomer = {
            id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
            ...customerData,
        };

        // Add the new customer to the dummy data
        customers.push(newCustomer);

        // Set a success message and clear the form
        setMessage('New customer added successfully!');
        setCustomerData({
            name: '',
            contactPerson: '',
            email: '',
            phone: '',
            city: '',
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Add a New Customer</h1>
                    <Link href="/customer/list">
                        <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105">
                            View Customer List
                        </span>
                    </Link>
                </div>

                {/* Main Form Card */}
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Grid for Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer Name</label>
                                <input type="text" id="name" autocomplete="off" name="name" value={customerData.name} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" />
                            </div>
                            <div>
                                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
                                <input type="text" id="contactPerson" autocomplete="off" name="contactPerson" value={customerData.contactPerson} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" name="email" autocomplete="off" value={customerData.email} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phone" name="phone" autocomplete="off" value={customerData.phone} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" />
                            </div>
                        </div>

                        {/* City Field */}
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input type="text" id="city" name="city" autocomplete="off" value={customerData.city} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105">
                            Add Customer
                        </button>
                    </form>

                    {/* Success Message */}
                    {message && (
                        <div className="mt-8">
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative text-center" role="alert">
                                <span className="block sm:inline">{message}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}