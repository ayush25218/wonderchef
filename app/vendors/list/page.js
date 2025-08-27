'use client';

import React from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

// Dummy data imported directly. In a real application, this would be fetched from an API.
import { vendors } from '../../../lib/data';

export default function VendorsListPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">
                        Vendor List
                    </h1>
                    <Link
                        href="/vendor/add-new"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105"
                    >
                        <FaPlus className="mr-2 h-4 w-4" />
                        Add New Vendor
                    </Link>
                </div>

                {/* Vendors Table or Empty State */}
                {(!vendors || vendors.length === 0) ? (
                    <div className="bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-200">
                        <p className="text-xl text-gray-600">
                            No vendors found. Please add a new vendor.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                        <div className="p-6 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Vendor Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Contact Person
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Address
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {vendors.map((vendor) => (
                                    <tr key={vendor.id} className="hover:bg-gray-50 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {vendor.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {vendor.contactPerson}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {vendor.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {vendor.phone}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {vendor.address}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
