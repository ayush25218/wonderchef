'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMoneyBillWave, FaHistory } from 'react-icons/fa';

export default function VendorPaymentsPage() {
    const [paymentData, setPaymentData] = useState({
        vendorName: '',
        amount: '',
        paymentDate: '',
        notes: '',
    });

    const [vendors, setVendors] = useState([]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); // 'success', 'error', 'loading'

    // Fetch vendors list to populate the dropdown
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch('/api/vendors');
                if (!response.ok) {
                    throw new Error('Failed to fetch vendors list');
                }
                const data = await response.json();
                setVendors(data);
            } catch (err) {
                console.error('Error fetching vendors:', err);
                // Set a user-friendly message for the error
                setMessage('Error fetching vendors list. Please try again later.');
            }
        };
        fetchVendors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('Processing payment...');

        try {
            // API call to record the payment
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Payment recorded successfully!');
                setPaymentData({
                    vendorName: '',
                    amount: '',
                    paymentDate: '',
                    notes: '',
                });
            } else {
                setStatus('error');
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || 'Failed to record payment.'}`);
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Record Vendor Payment</h1>
                    <Link href="/vendor/payments/history">
                        <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition duration-300 transform hover:scale-105">
                            <FaHistory className="mr-2 h-4 w-4" />
                            Payment History
                        </span>
                    </Link>
                </div>

                {/* Main Form Card */}
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Vendor Name Dropdown */}
                        <div>
                            <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">Vendor Name</label>
                            <select
                                id="vendorName"
                                name="vendorName"
                                value={paymentData.vendorName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                            >
                                <option value="">Select a Vendor</option>
                                {vendors.map((vendor) => (
                                    <option key={vendor.id} value={vendor.name}>
                                        {vendor.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Amount & Date Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                <div className="mt-1 relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">₹</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        value={paymentData.amount}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                        placeholder="0.00"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm" id="amount-currency">INR</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">Payment Date</label>
                                <input
                                    type="date"
                                    id="paymentDate"
                                    name="paymentDate"
                                    value={paymentData.paymentDate}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                />
                            </div>
                        </div>

                        {/* Notes Field */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={paymentData.notes}
                                onChange={handleChange}
                                rows="3"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 transform hover:scale-105"
                            disabled={status === 'loading'}
                        >
                            <FaMoneyBillWave className="mr-2 h-5 w-5" />
                            {status === 'loading' ? 'Recording...' : 'Record Payment'}
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