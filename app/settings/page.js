'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, XCircle, Settings, Users, Shield, Plug } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('users');

  // --- Mock Data ---
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

  // --- Tab Content ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="backdrop-blur-xl bg-white/60 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" /> User Management
            </h2>
            <form onSubmit={handleUserSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-8">
              <input type="text" name="name" autoComplete="off" placeholder="Full Name"
                     value={newUserData.name} onChange={handleUserChange}
                     className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"/>
              <input type="email" name="email" autoComplete="off" placeholder="Email"
                     value={newUserData.email} onChange={handleUserChange}
                     className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"/>
              <select name="role" value={newUserData.role} onChange={handleUserChange}
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                {roles.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
              <button type="submit"
                      className="md:col-span-3 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
                + Add User
              </button>
            </form>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-indigo-50 text-indigo-700">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'system':
        return (
          <div className="backdrop-blur-xl bg-white/60 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Settings className="w-6 h-6 text-indigo-600"/> System Settings
            </h2>
            <form className="space-y-5">
              {Object.entries(settings).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                  {typeof value === 'boolean' ? (
                    <input type="checkbox" name={key} checked={value} onChange={handleSettingsChange}
                           className="h-5 w-5 text-indigo-600 rounded"/>
                  ) : (
                    <input type={typeof value === 'number' ? 'number' : 'text'} name={key} value={value}
                           onChange={handleSettingsChange}
                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"/>
                  )}
                </div>
              ))}
            </form>
          </div>
        );
      case 'permissions':
        const allPermissions = ['add-data', 'view-reports', 'manage-users', 'approve-transactions', 'export-data'];
        return (
          <div className="backdrop-blur-xl bg-white/60 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-600"/> Permissions & Roles
            </h2>
            <form onSubmit={handleAddRole} className="flex gap-3 mb-6">
              <input type="text" placeholder="New Role Name" value={newRole} onChange={(e) => setNewRole(e.target.value)}
                     className="flex-grow px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"/>
              <button type="submit"
                      className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition">+ Add Role
              </button>
            </form>
            <select onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole}
                    className="w-full mb-6 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
              <option value="">-- Select Role --</option>
              {roles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            {selectedRole && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allPermissions.map(permission => (
                  <label key={permission}
                         className="flex items-center p-4 border rounded-xl bg-white shadow-sm cursor-pointer hover:bg-gray-50">
                    <input type="checkbox"
                           checked={permissions[selectedRole]?.includes(permission) || false}
                           onChange={() => handleTogglePermission(selectedRole, permission)}
                           className="h-5 w-5 text-indigo-600"/>
                    <span className="ml-3 text-gray-700">{permission.replace(/-/g, ' ')}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      case 'integrations':
        return (
          <div className="backdrop-blur-xl bg-white/60 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Plug className="w-6 h-6 text-indigo-600"/> Integrations
            </h2>
            <div className="space-y-4">
              {integrations.map(integration => (
                <div key={integration.name}
                     className="flex justify-between items-center p-4 rounded-xl bg-white shadow-sm border hover:shadow-md transition">
                  <span className="font-semibold text-gray-800">{integration.name}</span>
                  <div className="flex items-center gap-3">
                    {integration.status === 'Connected' ? (
                      <CheckCircle className="w-5 h-5 text-green-600"/>
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600"/>
                    )}
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${integration.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {integration.status}
                    </span>
                    <button className="text-sm text-indigo-600 hover:underline">
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">⚙️ Settings</h1>
      <div className="max-w-5xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-6 mb-10 border-b border-gray-200">
          <button onClick={() => setActiveTab('users')}
                  className={`pb-3 px-4 flex items-center gap-2 font-medium ${activeTab === 'users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <Users className="w-5 h-5"/> Users
          </button>
          <button onClick={() => setActiveTab('system')}
                  className={`pb-3 px-4 flex items-center gap-2 font-medium ${activeTab === 'system' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <Settings className="w-5 h-5"/> System
          </button>
          <button onClick={() => setActiveTab('permissions')}
                  className={`pb-3 px-4 flex items-center gap-2 font-medium ${activeTab === 'permissions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <Shield className="w-5 h-5"/> Permissions
          </button>
          <button onClick={() => setActiveTab('integrations')}
                  className={`pb-3 px-4 flex items-center gap-2 font-medium ${activeTab === 'integrations' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <Plug className="w-5 h-5"/> Integrations
          </button>
        </div>
        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
