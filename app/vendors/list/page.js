'use client';

import React from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

// Dummy data
const vendors = [
  {
    id: 1,
    name: 'Shakti Traders Pvt. Ltd.',
    contactPerson: 'Rajesh Kumar',
    email: 'rajesh@shaktitraders.com',
    phone: '+91 9876543210',
    address: 'Pachira, Araria, Bihar',
    gst: '10ABCDE1234F1Z5',
    status: 'Active',
    createdAt: '2025-07-12',
  },
  {
    id: 2,
    name: 'Universal Supplies',
    contactPerson: 'Anjali Sharma',
    email: 'anjali@universalsupplies.com',
    phone: '+91 9123456789',
    address: 'Sector 62, Noida, UP',
    gst: '09XYZAB5678L2C6',
    status: 'Inactive',
    createdAt: '2025-06-01',
  },
  {
    id: 3,
    name: 'Global Mart Enterprises',
    contactPerson: 'Amit Verma',
    email: 'amit@globalmart.com',
    phone: '+91 9988776655',
    address: 'Bandra, Mumbai, Maharashtra',
    gst: '27LMNOP3456K7H8',
    status: 'Active',
    createdAt: '2025-08-20',
  },
];

export default function VendorsListPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">
            Vendor Management
          </h1>
          <Link
            href="/vendor/add-new"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105"
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
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-x-auto">
            <div className="p-6">
              <table className="min-w-full text-sm text-gray-700 table-auto">
                <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800 uppercase text-xs font-semibold tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left whitespace-nowrap">Vendor Name</th>
                    <th className="px-6 py-4 text-left whitespace-nowrap">Contact Person</th>
                    <th className="px-6 py-4 text-left whitespace-nowrap">Email</th>
                    <th className="px-6 py-4 text-left whitespace-nowrap">Phone</th>
                    <th className="px-6 py-4 text-left whitespace-nowrap">Address</th>
                    <th className="px-6 py-4 text-left whitespace-nowrap">GST Number</th>
                    <th className="px-6 py-4 text-left whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-left whitespace-nowrap">Created At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                    <tr
                      key={vendor.id}
                      className="hover:bg-indigo-50 transition duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {vendor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {vendor.contactPerson}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-indigo-600 font-medium">
                        {vendor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {vendor.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{vendor.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-700">
                        {vendor.gst}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            vendor.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {vendor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {vendor.createdAt}
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
