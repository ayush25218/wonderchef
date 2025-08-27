'use client';

import React from 'react';
import { customers } from '../../../lib/data';
import Link from 'next/link';
import { FaUsers, FaCity, FaEnvelope } from 'react-icons/fa';

export default function CustomerReportPage() {
    const totalCustomers = customers.length;
    const cities = [...new Set(customers.map(customer => customer.city))].filter(Boolean);
    const totalCities = cities.length;
    const customersWithEmails = customers.filter(customer => customer.email).length;

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Customer Report</h1>
                    <Link href="/customer/list">
                        <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105">
                            View Customer List
                        </span>
                    </Link>
                </div>

                {/* Report Summary Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                    {/* Total Customers Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-indigo-500">
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                                <FaUsers className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500 truncate">Total Customers</p>
                                <p className="mt-1 text-3xl font-semibold text-gray-900">{totalCustomers}</p>
                            </div>
                        </div>
                    </div>

                    {/* Customers by City Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-emerald-500">
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full">
                                <FaCity className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500 truncate">Cities Covered</p>
                                <p className="mt-1 text-3xl font-semibold text-gray-900">{totalCities}</p>
                            </div>
                        </div>
                    </div>

                    {/* Customers with Emails Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
                                <FaEnvelope className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500 truncate">Customers with Email</p>
                                <p className="mt-1 text-3xl font-semibold text-gray-900">{customersWithEmails}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Breakdown Section */}
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Breakdown</h2>
                    <p className="text-gray-600 mb-4">A breakdown of customer distribution by city:</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    City
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Number of Customers
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {cities.map(city => {
                                const cityCustomers = customers.filter(c => c.city === city).length;
                                return (
                                    <tr key={city} className="hover:bg-gray-50 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{city}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cityCustomers}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    {cities.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No city data available for a detailed breakdown.</p>
                    )}
                </div>
            </div>
        </div>
    );
}