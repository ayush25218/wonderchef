'use client';

import React, { useState } from 'react';
import { customers } from '../../../lib/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CustomerListPage() {
    // The state is now used to trigger a re-render after deletion
    const [customerData, setCustomerData] = useState(customers);
    const router = useRouter();

    const handleDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this customer?');
        if (isConfirmed) {
            const customerIndex = customerData.findIndex(c => c.id === id);
            if (customerIndex > -1) {
                // Use a functional update to ensure state is based on the latest value
                const updatedCustomers = [...customerData];
                updatedCustomers.splice(customerIndex, 1);
                setCustomerData(updatedCustomers);
            }
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Customer List</h1>
                    <Link href="/customer/add-new">
                        <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105">
                            + Add New Customer
                        </span>
                    </Link>
                </div>

                {/* Main Table Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="p-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Contact Person
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {customerData.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.contactPerson}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(customer.id)}
                                            className="text-red-600 hover:text-red-900 font-semibold transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}