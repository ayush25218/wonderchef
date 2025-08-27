'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // ID बनाने के लिए एक लाइब्रेरी

// डमी डेटा सीधे यहीं परिभाषित किया गया है
const initialVendors = [
  { id: '1', name: 'ABC सप्लायर्स', contactPerson: 'राहुल शर्मा', email: 'rahul.sharma@abc.com', phone: '9876543210', address: '123, गांधी नगर, नई दिल्ली' },
  { id: '2', name: 'XYZ ट्रेडिंग', contactPerson: 'प्रियंका सिंह', email: 'priyanka.singh@xyz.com', phone: '9123456789', address: '45, सेक्टर 15, गुरुग्राम' },
  { id: '3', name: 'PQR एंटरप्राइजेज', contactPerson: 'सुनील गुप्ता', email: 'sunil.gupta@pqr.com', phone: '8765432109', address: '78, शिवाजी रोड, मुंबई' },
];

export default function VendorManagementPage() {
  const [vendors, setVendors] = useState(initialVendors);
  const [vendorData, setVendorData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vendorData.name || !vendorData.email) {
      setMessage('कृपया वेंडर का नाम और ईमेल भरें।');
      return;
    }

    const newVendor = {
      id: uuidv4(), // एक अद्वितीय ID बनाएँ
      ...vendorData,
    };

    setVendors((prevVendors) => [...prevVendors, newVendor]);
    setMessage('नया वेंडर सफलतापूर्वक जोड़ा गया!');

    // फॉर्म को रीसेट करें
    setVendorData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('क्या आप वाकई इस वेंडर को हटाना चाहते हैं?');
    if (isConfirmed) {
      setVendors(vendors.filter((vendor) => vendor.id !== id));
      setMessage('वेंडर सफलतापूर्वक हटाया गया।');
    }
  };

  const totalVendors = vendors.length;

  return (
      <div className="container mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">वेंडर प्रबंधन</h1>

        {/* नया वेंडर जोड़ें फॉर्म */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto mb-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">नया वेंडर जोड़ें</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                वेंडर का नाम:
              </label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={vendorData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                संपर्क व्यक्ति:
              </label>
              <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={vendorData.contactPerson}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                ईमेल:
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={vendorData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              वेंडर जोड़ें
            </button>
          </form>
          {message && (
              <p className="mt-4 text-center text-sm font-medium text-gray-600">
                {message}
              </p>
          )}
        </div>

        ---

        {/* वेंडर लिस्ट और रिपोर्ट */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">वेंडर लिस्ट और रिपोर्ट</h2>

          {/* रिपोर्ट सेक्शन */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
            <h3 className="text-xl font-semibold text-gray-700">रिपोर्ट सारांश</h3>
            <p className="text-4xl font-bold text-indigo-600 mt-2">
              {totalVendors}
            </p>
            <p className="text-gray-500 mt-1">कुल वेंडर</p>
          </div>

          {/* लिस्ट सेक्शन */}
          {vendors.length === 0 ? (
              <div className="text-center p-6">
                <p className="text-lg text-gray-600">कोई वेंडर रिकॉर्ड नहीं मिला।</p>
              </div>
          ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      वेंडर का नाम
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      संपर्क व्यक्ति
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ईमेल
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      एक्शन
                    </th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                      <tr key={vendor.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.contactPerson}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                              onClick={() => handleDelete(vendor.id)}
                              className="text-red-600 hover:text-red-900"
                          >
                            हटाएँ
                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
        </div>
      </div>
  );
}