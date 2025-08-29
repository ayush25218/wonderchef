'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaPlus, FaUserTie, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaBuilding, FaCreditCard } from 'react-icons/fa';

export default function AddNewVendorPage() {
    const [vendorData, setVendorData] = useState({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        gstNumber: '',
        panNumber: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        website: '',
        status: 'active',
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
                    gstNumber: '',
                    panNumber: '',
                    bankName: '',
                    accountNumber: '',
                    ifscCode: '',
                    website: '',
                    status: 'active',
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
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-full mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h1 className="text-2xl font-extrabold text-gray-900 mb-4 sm:mb-0">
                        Add New Vendor
                    </h1>
                    <Link href="/vendor/list">
                        <span className="inline-flex items-center px-6 py-3 rounded-full shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition duration-300 transform hover:scale-105">
                            View Vendor List
                        </span>
                    </Link>
                </div>

                {/* Main Form Card */}
                <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Grid for Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                    <FaBuilding className="inline mr-2 text-indigo-600" /> Vendor Name *
                                </label>
                                <input id="name" name="name" type="text" autoComplete="off" required
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    value={vendorData.name} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-700">
                                    <FaUserTie className="inline mr-2 text-indigo-600" /> Contact Person *
                                </label>
                                <input id="contactPerson" name="contactPerson" type="text" autoComplete="off" required
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    value={vendorData.contactPerson} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                    <FaEnvelope className="inline mr-2 text-indigo-600" /> Email *
                                </label>
                                <input id="email" name="email" type="email" autoComplete="off" required
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    value={vendorData.email} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                                    <FaPhone className="inline mr-2 text-indigo-600" /> Phone *
                                </label>
                                <input id="phone" name="phone" type="tel" autoComplete="off" required
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    value={vendorData.phone} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Full-width fields */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                                <FaMapMarkerAlt className="inline mr-2 text-indigo-600" /> Address
                            </label>
                            <textarea id="address" name="address" autoComplete="off" rows="3"
                                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                value={vendorData.address} onChange={handleChange} />
                        </div>

                        {/* Extra Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="gstNumber" className="block text-sm font-semibold text-gray-700">GST Number</label>
                                <input id="gstNumber" name="gstNumber" type="text" autoComplete="off"
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={vendorData.gstNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="panNumber" className="block text-sm font-semibold text-gray-700">PAN Number</label>
                                <input id="panNumber" name="panNumber" type="text" autoComplete="off"
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={vendorData.panNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="bankName" className="block text-sm font-semibold text-gray-700">
                                    <FaBuilding className="inline mr-2 text-indigo-600" /> Bank Name
                                </label>
                                <input id="bankName" name="bankName" type="text"
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={vendorData.bankName} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="accountNumber" className="block text-sm font-semibold text-gray-700">
                                    <FaCreditCard className="inline mr-2 text-indigo-600" /> Account Number
                                </label>
                                <input id="accountNumber" name="accountNumber" type="text"
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={vendorData.accountNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="ifscCode" className="block text-sm font-semibold text-gray-700">IFSC Code</label>
                                <input id="ifscCode" name="ifscCode" type="text"
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={vendorData.ifscCode} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="website" className="block text-sm font-semibold text-gray-700">
                                    <FaGlobe className="inline mr-2 text-indigo-600" /> Website
                                </label>
                                <input id="website" name="website" type="url"
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={vendorData.website} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-semibold text-gray-700">Status</label>
                                <select id="status" name="status"
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={vendorData.status} onChange={handleChange}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-4 px-6 rounded-xl shadow-md text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none transition transform hover:scale-[1.02]"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Adding Vendor...' : 'Add Vendor'}
                        </button>
                    </form>

                    {/* Status Message */}
                    {message && (
                        <div className="mt-8">
                            <div className={`px-6 py-4 rounded-xl text-center shadow-md ${status === 'success'
                                ? 'bg-green-100 border border-green-400 text-green-700'
                                : 'bg-red-100 border border-red-400 text-red-700'
                                }`}>
                                {message}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
