'use client';

import React, { useState } from 'react';
import { customers } from '../../../lib/data';
import Link from 'next/link';
import { FaUserPlus } from 'react-icons/fa';

export default function AddNewCustomerPage() {
  const [customerData, setCustomerData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    address: '',
    company: '',
    gst: '',
    notes: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate unique ID
    const newCustomer = {
      id: customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
      ...customerData,
    };

    customers.push(newCustomer);

    setMessage('🎉 New customer added successfully!');
    setCustomerData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      country: '',
      address: '',
      company: '',
      gst: '',
      notes: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <FaUserPlus className="text-indigo-600" />
            Add New Customer
          </h1>
          <Link href="/customer/list">
            <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105">
              View Customer List
            </span>
          </Link>
        </div>

        {/* Main Form */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  value={customerData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  autoComplete="off"
                  value={customerData.contactPerson}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  value={customerData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="off"
                  value={customerData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Address Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={customerData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={customerData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={customerData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
            </div>

            {/* Full Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={customerData.address}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>

            {/* Company + GST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company / Organization</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={customerData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="gst" className="block text-sm font-medium text-gray-700">GST / Tax ID</label>
                <input
                  type="text"
                  id="gst"
                  name="gst"
                  value={customerData.gst}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={customerData.notes}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
            >
              Add Customer
            </button>
          </form>

          {/* Success Message */}
          {message && (
            <div className="mt-8">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center font-medium">
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
