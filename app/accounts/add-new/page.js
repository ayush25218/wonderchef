'use client';

import React, { useState } from 'react';
import { accounts } from '../lib/data';
import Link from 'next/link';

export default function AddAccountPage() {
    const [accountData, setAccountData] = useState({
        name: '',
        accountNumber: '',
        bankName: '',
        type: '',
        balance: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAccount = {
            id: accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1,
            ...accountData,
            balance: parseFloat(accountData.balance),
        };

        accounts.push(newAccount);

        setMessage('New account added successfully!');
        setAccountData({
            name: '',
            accountNumber: '',
            bankName: '',
            type: '',
            balance: '',
        });
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Add a New Account</h1>
                    <Link href="/account/list">
                        <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105">
                            View Account List
                        </span>
                    </Link>
                </div>

                {/* Main Form Card */}
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Grid for Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Account Name</label>
                                <input id="name" name="name" autocomplete="off" type="text" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="e.g., Personal Savings, Business Checking" value={accountData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
                                <input id="bankName" name="bankName" autocomplete="off" type="text" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="e.g., State Bank of India" value={accountData.bankName} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
                                <input id="accountNumber" name="accountNumber" autocomplete="off" type="text" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="e.g., 1234567890" value={accountData.accountNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Account Type</label>
                                <select id="type" name="type" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" value={accountData.type} onChange={handleChange}>
                                    <option value="">Select an Account Type</option>
                                    <option value="Checking">Checking</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Cash">Cash</option>
                                </select>
                            </div>
                        </div>

                        {/* Balance Field */}
                        <div>
                            <label htmlFor="balance" className="block text-sm font-medium text-gray-700">Current Balance</label>
                            <div className="mt-1 relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">₹</span>
                                </div>
                                <input id="balance" name="balance" type="number" step="0.01" required className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="0.00" value={accountData.balance} onChange={handleChange} />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm" id="price-currency">INR</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105">
                            Add Account
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