'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserTie, FaBuilding, FaClipboardList } from 'react-icons/fa';
import moment from 'moment';

// Dummy data for vendor payments. In a real app, you would fetch this from an API.
const dummyPayments = [
    { id: 1, vendor: 'Tech Solutions', amount: 5000, date: '2025-08-15' },
    { id: 2, vendor: 'Marketing Pros', amount: 2500, date: '2025-08-18' },
    { id: 3, vendor: 'Office Supply Co.', amount: 1200, date: '2025-08-19' },
    { id: 4, vendor: 'Tech Solutions', amount: 7500, date: '2025-07-22' },
    { id: 5, vendor: 'Marketing Pros', amount: 3000, date: '2025-07-25' },
    { id: 6, vendor: 'Marketing Pros', amount: 4500, date: '2024-12-10' },
    { id: 7, vendor: 'Office Supply Co.', amount: 900, date: '2025-08-20' },
];

export default function VendorReportPage() {
    const [reportPeriod, setReportPeriod] = useState('daily');
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [summary, setSummary] = useState({
        totalAmount: 0,
        totalPayments: 0,
        uniqueVendors: 0,
    });

    // Function to calculate and filter data based on the selected period
    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const startOfYear = moment().startOf('year').format('YYYY-MM-DD');

        let payments = [];
        if (reportPeriod === 'daily') {
            payments = dummyPayments.filter(p => moment(p.date).isSame(today, 'day'));
        } else if (reportPeriod === 'monthly') {
            payments = dummyPayments.filter(p => moment(p.date).isSame(startOfMonth, 'month'));
        } else if (reportPeriod === 'yearly') {
            payments = dummyPayments.filter(p => moment(p.date).isSame(startOfYear, 'year'));
        }

        const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
        const uniqueVendors = new Set(payments.map(p => p.vendor)).size;

        setFilteredPayments(payments);
        setSummary({
            totalAmount,
            totalPayments: payments.length,
            uniqueVendors,
        });
    }, [reportPeriod]);

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Vendor Payments Report</h1>
                    <Link href="/vendor/payments">
                        <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105">
                            Record New Payment
                        </span>
                    </Link>
                </div>

                {/* Report Period Selector */}
                <div className="mb-10 flex justify-center sm:justify-start">
                    <div className="flex bg-white rounded-full shadow-lg p-1">
                        <button
                            onClick={() => setReportPeriod('daily')}
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${reportPeriod === 'daily' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            Daily
                        </button>
                        <button
                            onClick={() => setReportPeriod('monthly')}
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${reportPeriod === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setReportPeriod('yearly')}
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${reportPeriod === 'yearly' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            Yearly
                        </button>
                    </div>
                </div>

                {/* Report Summary Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                    {/* Total Payments Amount Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-indigo-500">
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                                <FaClipboardList className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-5 text-right">
                                <p className="text-sm font-medium text-gray-500 truncate">Total Payments</p>
                                <p className="mt-1 text-3xl font-semibold text-gray-900">₹{summary.totalAmount.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Number of Transactions Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-emerald-500">
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full">
                                <FaUserTie className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div className="ml-5 text-right">
                                <p className="text-sm font-medium text-gray-500 truncate">Total Transactions</p>
                                <p className="mt-1 text-3xl font-semibold text-gray-900">{summary.totalPayments}</p>
                            </div>
                        </div>
                    </div>

                    {/* Unique Vendors Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
                                <FaBuilding className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-5 text-right">
                                <p className="text-sm font-medium text-gray-500 truncate">Unique Vendors</p>
                                <p className="mt-1 text-3xl font-semibold text-gray-900">{summary.uniqueVendors}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Payments Table */}
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Payments Breakdown</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Vendor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.vendor}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{payment.amount.toLocaleString('en-IN')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{moment(payment.date).format('MMMM Do, YYYY')}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No payments found for this period.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}