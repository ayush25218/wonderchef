"use client";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";

// यह नकली डेटा है जिसे आप अपने डेटाबेस से बदल सकते हैं
const mockInvoiceData = {
    invoiceNumber: "INV-2025-08-001",
    date: "August 19, 2025",
    seller: {
        name: "WonderChef",
        address: "123 Main Street, Anytown, USA",
        email: "contact@wonderchef.com",
    },
    customer: {
        name: "John Doe",
        address: "456 Oak Avenue, Somewhere, USA",
        email: "john.doe@example.com",
    },
    items: [
        { id: 1, description: 'Premium Coffee Beans (1kg)', quantity: 2, unitPrice: 25.00 },
        { id: 2, description: 'Gourmet Chocolate Bar', quantity: 3, unitPrice: 5.50 },
        { id: 3, description: 'Artisanal Honey (500g)', quantity: 1, unitPrice: 18.75 },
    ],
    taxRate: 5, // 5% tax
};

export default function Page() {
    const [invoice, setInvoice] = useState(mockInvoiceData);
    const [subtotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const newSubtotal = invoice.items.reduce(
            (sum, item) => sum + item.quantity * item.unitPrice, 0
        );
        const taxAmount = newSubtotal * (invoice.taxRate / 100);
        const finalTotal = newSubtotal + taxAmount;

        setSubtotal(newSubtotal);
        setTotalAmount(finalTotal);
    }, [invoice]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Invoice & Receipt" />
            <div className="p-6">
                <div className="card p-8 bg-white shadow-xl rounded-2xl max-w-4xl mx-auto">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                            <p className="text-sm text-gray-500 mt-1">Invoice #{invoice.invoiceNumber}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition">
                                Print / Download
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
                                Share
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-b border-gray-200 py-6 my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-gray-800">BILLED FROM</h4>
                            <p className="text-sm text-gray-600 mt-2">{invoice.seller.name}</p>
                            <p className="text-xs text-gray-500">{invoice.seller.address}</p>
                            <p className="text-xs text-gray-500">{invoice.seller.email}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">BILLED TO</h4>
                            <p className="text-sm text-gray-600 mt-2">{invoice.customer.name}</p>
                            <p className="text-xs text-gray-500">{invoice.customer.address}</p>
                            <p className="text-xs text-gray-500">{invoice.customer.email}</p>
                        </div>
                    </div>

                    {/* Invoice Items Table */}
                    <div className="mt-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-600 rounded-lg overflow-hidden">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3 text-right">Quantity</th>
                                    <th className="px-6 py-3 text-right">Unit Price</th>
                                    <th className="px-6 py-3 text-right">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoice.items.map((item) => (
                                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.description}</td>
                                        <td className="px-6 py-4 text-right">{item.quantity}</td>
                                        <td className="px-6 py-4 text-right">₹{item.unitPrice.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right">₹{(item.quantity * item.unitPrice).toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Totals Summary */}
                    <div className="mt-8 flex justify-end">
                        <div className="w-full max-w-sm space-y-2 text-right">
                            <div className="flex justify-between text-base font-medium text-gray-700">
                                <span>Subtotal:</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-700">
                                <span>Tax ({invoice.taxRate}%):</span>
                                <span>₹{(subtotal * (invoice.taxRate / 100)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-4 mt-4 text-2xl font-bold text-indigo-600">
                                <span>Total:</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}