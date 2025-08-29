'use client';

import React, { useState } from 'react';
import { accounts } from '../lib/data';
import Link from 'next/link';
import { Trash2, PlusCircle, FileText } from 'lucide-react';

export default function AccountListPage() {
    const [currentAccounts, setCurrentAccounts] = useState(accounts);
    const [message, setMessage] = useState('');

    const handleDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this account?');
        if (isConfirmed) {
            const accountIndex = currentAccounts.findIndex(a => a.id === id);
            if (accountIndex > -1) {
                accounts.splice(accountIndex, 1);
                setCurrentAccounts([...accounts]);
                setMessage('✅ Account deleted successfully.');
                setTimeout(() => setMessage(''), 2500);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Account List
                </h1>
                <div className="flex space-x-4">
                    <Link href="/account/add">
                        <p className="flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition transform duration-300 cursor-pointer">
                            <PlusCircle className="w-5 h-5 mr-2" /> Add Account
                        </p>
                    </Link>
                    <Link href="/account/report">
                        <p className="flex items-center bg-white text-gray-800 px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 hover:scale-[1.03] transition transform duration-300 cursor-pointer">
                            <FileText className="w-5 h-5 mr-2" /> View Report
                        </p>
                    </Link>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Account Name</th>
                            <th className="px-6 py-4 font-semibold">Bank</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Balance</th>
                            <th className="px-6 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentAccounts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-6 text-center text-gray-500">
                                    🚫 No accounts found.
                                </td>
                            </tr>
                        ) : (
                            currentAccounts.map((account) => (
                                <tr
                                    key={account.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 text-gray-900 font-medium">{account.name}</td>
                                    <td className="px-6 py-4">{account.bankName}</td>
                                    <td className="px-6 py-4">{account.type}</td>
                                    <td className="px-6 py-4 font-bold text-green-600">
                                        ₹{account.balance.toLocaleString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDelete(account.id)}
                                            className="inline-flex items-center bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 hover:scale-105 transition"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Message */}
            {message && (
                <div className="mt-6 text-center">
                    <p className="inline-block bg-green-100 text-green-700 px-6 py-3 rounded-xl font-medium shadow-md animate-bounce">
                        {message}
                    </p>
                </div>
            )}
        </div>
    );
}
