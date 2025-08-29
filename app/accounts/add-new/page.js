'use client';

import React, { useState } from 'react';
import { accounts } from '../lib/data';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AddAccountPage() {
    const [accountData, setAccountData] = useState({
        name: '',
        accountNumber: '',
        bankName: '',
        branchName: '',
        ifsc: '',
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

        setMessage('🎉 New account added successfully!');
        setAccountData({
            name: '',
            accountNumber: '',
            bankName: '',
            branchName: '',
            ifsc: '',
            type: '',
            balance: '',
        });
    };

    return (
        <div className="bg-gradient-to-br from-indigo-100 via-white to-purple-100 min-h-screen py-12 px-6 flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 text-center sm:text-left">
                        Add New Bank Account
                    </h1>
                    <Link href="/account/list">
                        <span className="inline-flex items-center px-6 py-3 rounded-full shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
                            View Accounts
                        </span>
                    </Link>
                </div>

                {/* Modern Card */}
                <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Grid Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Account Name</label>
                                <input id="name" name="name" autoComplete="off" type="text" required 
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    placeholder="e.g., Personal Savings"
                                    value={accountData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="bankName" className="block text-sm font-semibold text-gray-700">Bank Name</label>
                                <input id="bankName" name="bankName" autoComplete="off" type="text" required 
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    placeholder="e.g., HDFC Bank"
                                    value={accountData.bankName} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="branchName" className="block text-sm font-semibold text-gray-700">Branch Name</label>
                                <input id="branchName" name="branchName" autoComplete="off" type="text" required 
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    placeholder="e.g., Andheri West"
                                    value={accountData.branchName} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="ifsc" className="block text-sm font-semibold text-gray-700">IFSC Code</label>
                                <input id="ifsc" name="ifsc" autoComplete="off" type="text" required 
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    placeholder="e.g., HDFC0001234"
                                    value={accountData.ifsc} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="accountNumber" className="block text-sm font-semibold text-gray-700">Account Number</label>
                                <input id="accountNumber" name="accountNumber" autoComplete="off" type="text" required 
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    placeholder="e.g., 1234567890"
                                    value={accountData.accountNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="type" className="block text-sm font-semibold text-gray-700">Account Type</label>
                                <select id="type" name="type" required 
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    value={accountData.type} onChange={handleChange}>
                                    <option value="">Select Type</option>
                                    <option value="Checking">Checking</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Cash">Cash</option>
                                </select>
                            </div>
                        </div>

                        {/* Balance */}
                        <div>
                            <label htmlFor="balance" className="block text-sm font-semibold text-gray-700">Opening Balance</label>
                            <div className="mt-2 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">₹</span>
                                </div>
                                <input id="balance" name="balance" type="number" step="0.01" required 
                                    className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    placeholder="0.00"
                                    value={accountData.balance} onChange={handleChange} />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">INR</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            type="submit" 
                            className="w-full py-4 px-4 rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 transition-all"
                        >
                            🚀 Add Account
                        </motion.button>
                    </form>

                    {/* Success Message */}
                    {message && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8"
                        >
                            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow text-center font-medium">
                                {message}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
