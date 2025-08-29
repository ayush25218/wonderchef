'use client';

import React, { useState } from 'react';
import { customers } from '../../../lib/data';
import Link from 'next/link';
import { User, Mail, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomerListPage() {
    const [customerData, setCustomerData] = useState(customers);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this customer?');
        if (isConfirmed) {
            const updatedCustomers = customerData.filter(c => c.id !== id);
            setCustomerData(updatedCustomers);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-6 sm:mb-0">Customer Directory</h1>
                    <Link href="/customer/add-new">
                        <span className="inline-flex items-center px-6 py-3 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer">
                            + Add Customer
                        </span>
                    </Link>
                </div>

                {/* Customers Grid */}
                {customerData.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">No customers found.</div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {customerData.map((customer) => (
                            <div
                                key={customer.id}
                                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 flex items-center justify-center shadow-md">
                                        <User className="w-7 h-7 text-indigo-700" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">
                                            {customer.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">{customer.contactPerson}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <Mail className="w-4 h-4 text-indigo-600" />
                                    <span className="text-sm">{customer.email}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => setSelectedCustomer(customer)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer.id)}
                                        className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-semibold"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {selectedCustomer && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative overflow-hidden"
                            initial={{ y: 50, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCustomer(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 flex items-center justify-center shadow-md mb-4">
                                    <User className="w-10 h-10 text-indigo-700" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                                <p className="text-gray-500 text-sm">{selectedCustomer.contactPerson}</p>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-5 h-5 text-indigo-600" />
                                    <span>{selectedCustomer.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <span className="font-semibold">Phone:</span>
                                    <span>{selectedCustomer.phone || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <span className="font-semibold">Address:</span>
                                    <span>{selectedCustomer.address || "N/A"}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
