'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('users');

  // --- Mock Data States ---
  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Alice Admin', email: 'alice@example.com', role: 'Admin' },
    { id: 'usr-2', name: 'Bob Sales', email: 'bob@example.com', role: 'Sales Staff' },
    { id: 'usr-3', name: 'Charlie Manager', email: 'charlie@example.com', role: 'Manager' },
  ]);

  const [settings, setSettings] = useState({
    currency: 'INR',
    taxRate: 18,
    discounts: true,
    invoicePrefix: 'INV-',
    paymentMethod: 'Bank Transfer',
  });

  const [roles, setRoles] = useState([
    'Admin',
    'Sales Staff',
    'Manager',
  ]);

  const [permissions, setPermissions] = useState({
    'Admin': ['all'],
    'Sales Staff': ['view-customers', 'add-payments', 'view-reports'],
    'Manager': ['view-all', 'approve-discounts'],
  });

  const [integrations, setIntegrations] = useState([
    { name: 'SMS Gateway', status: 'Connected' },
    { name: 'Email Provider', status: 'Not Connected' },
    { name: 'WhatsApp API', status: 'Connected' },
    { name: 'Payment Gateway', status: 'Connected' },
  ]);

  // --- Form Data States ---
  const [newUserData, setNewUserData] = useState({ name: '', email: '', role: 'Sales Staff' });
  const [newRole, setNewRole] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // --- Handlers ---
  const handleUserChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const newUser = { id: uuidv4(), ...newUserData };
    setUsers([...users, newUser]);
    setNewUserData({ name: '', email: '', role: 'Sales Staff' });
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setPermissions({ ...permissions, [newRole]: [] });
      setNewRole('');
    }
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleTogglePermission = (role, permission) => {
    const newPermissions = { ...permissions };
    if (newPermissions[role].includes(permission)) {
      newPermissions[role] = newPermissions[role].filter(p => p !== permission);
    } else {
      newPermissions[role].push(permission);
    }
    setPermissions(newPermissions);
  };

  // --- UI Components ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800">User Management</h2>
              <form onSubmit={handleUserSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-8">
                <input type="text" name="name" autocomplete="off" placeholder="Full Name" value={newUserData.name} onChange={handleUserChange} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="email" name="email" autocomplete="off" placeholder="Email" value={newUserData.email} onChange={handleUserChange} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                <select name="role" value={newUserData.role} onChange={handleUserChange} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
                <button type="submit" className="md:col-span-3 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Add User</button>
              </form>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
        );
      case 'system':
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800">System Settings</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Currency</label>
                  <input type="text" name="currency" autocomplete="off" value={settings.currency} onChange={handleSettingsChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
                  <input type="number" name="taxRate" autocomplete="off" value={settings.taxRate} onChange={handleSettingsChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex items-center">
                  <input id="discounts" name="discounts" autocomplete="off" type="checkbox" checked={settings.discounts} onChange={handleSettingsChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  <label htmlFor="discounts" className="ml-2 block text-sm text-gray-900">Enable Discounts</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Invoice Prefix</label>
                  <input type="text" name="invoicePrefix" autocomplete="off" value={settings.invoicePrefix} onChange={handleSettingsChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Default Payment Method</label>
                  <input type="text" name="paymentMethod" autocomplete="off" value={settings.paymentMethod} onChange={handleSettingsChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </form>
            </div>
        );
      case 'permissions':
        const allPermissions = ['add-data', 'view-reports', 'manage-users', 'approve-transactions', 'export-data'];
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Permissions & Roles</h2>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Manage Roles</h3>
                <form onSubmit={handleAddRole} className="flex gap-2">
                  <input type="text" autocomplete="off" placeholder="New Role Name" value={newRole} onChange={(e) => setNewRole(e.target.value)} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Add Role</button>
                </form>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select a Role to Edit Permissions:</label>
                <select onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">-- Select Role --</option>
                  {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              {selectedRole && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Permissions for {selectedRole}</h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {allPermissions.map(permission => (
                          <label key={permission} className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={permissions[selectedRole]?.includes(permission) || false}
                                onChange={() => handleTogglePermission(selectedRole, permission)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                autocomplete="off"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">
                        {permission.replace(/-/g, ' ')}
                      </span>
                          </label>
                      ))}
                    </div>
                  </div>
              )}
            </div>
        );
      case 'integrations':
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Integrations</h2>
              <div className="space-y-4">
                {integrations.map((integration) => (
                    <div key={integration.name} className="flex justify-between items-center p-4 border border-gray-200 rounded-md shadow-sm">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-700">{integration.name}</span>
                      </div>
                      <div className="flex items-center">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${integration.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {integration.status}
                    </span>
                        <button className="ml-4 text-sm text-indigo-600 hover:text-indigo-800">
                          {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Settings</h1>

        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button onClick={() => setActiveTab('users')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>User Management</button>
            <button onClick={() => setActiveTab('system')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'system' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>System Settings</button>
            <button onClick={() => setActiveTab('permissions')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'permissions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>Permissions & Roles</button>
            <button onClick={() => setActiveTab('integrations')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'integrations' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>Integrations</button>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
  );
}