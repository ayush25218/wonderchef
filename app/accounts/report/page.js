'use client';

import React from 'react';
import { accounts } from '../lib/data';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function AccountReportPage() {
  const totalAccounts = accounts.length;
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const activeAccounts = accounts.filter(acc => acc.status === 'Active').length;
  const inactiveAccounts = accounts.filter(acc => acc.status === 'Inactive').length;

  const topAccounts = accounts.slice(0, 5);

  const chartData = accounts.map(acc => ({
    name: acc.name,
    value: acc.balance,
  }));

  const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#0ea5e9', '#9333ea'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        Account Report
        </h1>
        <Link href="/account/list">
          <p className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
            Back to List
          </p>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Accounts</h2>
          <p className="text-2xl font-extrabold text-indigo-600 mt-3">{totalAccounts}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Balance</h2>
          <p className="text-2xl font-extrabold text-green-600 mt-3">
            ₹{totalBalance.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">Active Accounts</h2>
          <p className="text-2xl font-extrabold text-blue-600 mt-3">{activeAccounts}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">Inactive Accounts</h2>
          <p className="text-2xl font-extrabold text-red-600 mt-3">{inactiveAccounts}</p>
        </div>
      </div>

      {/* Chart + Recent Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Balance Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Accounts */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Accounts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-indigo-50 text-indigo-700 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Balance</th>
                </tr>
              </thead>
              <tbody>
                {topAccounts.map((acc, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">{acc.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          acc.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {acc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      ₹{acc.balance.toLocaleString('en-IN')}
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
