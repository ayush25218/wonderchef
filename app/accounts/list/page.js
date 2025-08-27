'use client';

import React, { useState } from 'react';
import { accounts } from '../lib/data';
import Link from 'next/link';

export default function AccountListPage() {
    const [currentAccounts, setCurrentAccounts] = useState(accounts);
    const [message, setMessage] = useState('');

    const handleDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this account?');
        if (isConfirmed) {
            const accountIndex = currentAccounts.findIndex(a => a.id === id);
            if (accountIndex > -1) {
                // Directly modify the imported array (for this mock setup)
                accounts.splice(accountIndex, 1);
                setCurrentAccounts([...accounts]);
                setMessage('Account deleted successfully.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Account List</h1>
                <div className="flex space-x-4">
                    <Link href="/account/add">
                        <p className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                            + Add New Account
                        </p>
                    </Link>
                    <Link href="/account/report">
                        <p className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300">
                            View Report
                        </p>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Account Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bank
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Balance
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {currentAccounts.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                No accounts found.
                            </td>
                        </tr>
                    ) : (
                        currentAccounts.map((account) => (
                            <tr key={account.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.bankName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">₹{account.balance.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => handleDelete(account.id)} className="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            {message && <p className="mt-4 text-center text-sm font-medium text-gray-600">{message}</p>}
        </div>
    );
}