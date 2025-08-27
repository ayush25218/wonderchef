'use client';

import React from 'react';
import { accounts } from '../lib/data';
import Link from 'next/link';

export default function AccountReportPage() {
    const totalAccounts = accounts.length;
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Account Report</h1>
                <Link href="/account/list">
                    <p className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                        Back to List
                    </p>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Accounts Card */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700">Total Accounts</h2>
                    <p className="text-4xl font-bold text-indigo-600 mt-2">{totalAccounts}</p>
                </div>

                {/* Total Balance Card */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700">Total Balance</h2>
                    <p className="text-4xl font-bold text-green-600 mt-2">₹{totalBalance.toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    );
}