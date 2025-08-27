"use client";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";

// यह नकली डेटा है जिसे आप अपने डेटाबेस से बदल सकते हैं
const availableProducts = [
    { id: 1, name: 'Premium Coffee Beans', price: 25.00 },
    { id: 2, name: 'Gourmet Chocolate Bar', price: 5.50 },
    { id: 3, name: 'Organic Herbal Tea', price: 12.00 },
    { id: 4, name: 'Artisanal Honey', price: 18.75 },
];

export default function Page() {
    const [customer, setCustomer] = useState("");
    const [products, setProducts] = useState([{ productId: '', quantity: 1, price: 0 }]);
    const [discount, setDiscount] = useState(0);
    const [taxRate, setTaxRate] = useState(5); // 5% टैक्स रेट
    const [subtotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("Cash");

    // जब भी products, discount, या taxRate बदलता है, तो कुल राशि की गणना करें
    useEffect(() => {
        let newSubtotal = 0;
        products.forEach(p => {
            newSubtotal += p.quantity * p.price;
        });
        setSubtotal(newSubtotal);

        const discountAmount = newSubtotal * (discount / 100);
        const taxAmount = (newSubtotal - discountAmount) * (taxRate / 100);
        const finalTotal = newSubtotal - discountAmount + taxAmount;
        setTotalAmount(finalTotal);
    }, [products, discount, taxRate]);

    const handleProductChange = (index, event) => {
        const newProducts = [...products];
        const { name, value } = event.target;
        newProducts[index][name] = value;

        // अगर उत्पाद बदला गया है, तो उसकी कीमत भी अपडेट करें
        if (name === 'productId') {
            const selectedProduct = availableProducts.find(p => p.id === parseInt(value));
            if (selectedProduct) {
                newProducts[index].price = selectedProduct.price;
            }
        }
        setProducts(newProducts);
    };

    const addProductRow = () => {
        setProducts([...products, { productId: '', quantity: 1, price: 0 }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sale Recorded:", { customer, products, discount, totalAmount, paymentMethod });
        alert("Sale Recorded Successfully!");
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header title="Add New Sale" />
            <div className="p-6">
                <div className="card p-8 bg-white shadow-xl rounded-2xl max-w-4xl mx-auto">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Customer Details */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Customer Details</h3>
                            <div className="mt-4">
                                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer Name</label>
                                <input
                                    type="text"
                                    id="customer"
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Enter customer name"
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Product Details</h3>
                            <div className="mt-4 space-y-4">
                                {products.map((product, index) => (
                                    <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                                        <div className="sm:col-span-2">
                                            <label htmlFor={`product-${index}`} className="block text-sm font-medium text-gray-700">Product</label>
                                            <select
                                                id={`product-${index}`}
                                                name="productId"
                                                value={product.productId}
                                                onChange={(e) => handleProductChange(index, e)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <option value="">Select a product</option>
                                                {availableProducts.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">Quantity</label>
                                            <input
                                                type="number"
                                                id={`quantity-${index}`}
                                                name="quantity"
                                                value={product.quantity}
                                                onChange={(e) => handleProductChange(index, e)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                min="1"
                                            />
                                        </div>
                                        <div className="text-right">
                                            <label className="block text-sm font-medium text-gray-700">Price</label>
                                            <p className="mt-2 text-md font-semibold text-gray-900">₹{product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addProductRow}
                                    className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add another Product
                                </button>
                            </div>
                        </div>

                        {/* Financial Details */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Financial Details</h3>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                                    <input
                                        type="number"
                                        id="discount"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="payment" className="block text-sm font-medium text-gray-700">Payment Method</label>
                                    <select
                                        id="payment"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option>Cash</option>
                                        <option>Card</option>
                                        <option>UPI</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="border-t border-gray-200 pt-8">
                            <div className="flex justify-between text-lg font-medium text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-medium text-gray-600">
                                <span>Tax ({taxRate}%)</span>
                                <span>₹{((subtotal * (taxRate / 100))).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold text-indigo-600 mt-4">
                                <span>Total Amount</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Record Sale
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}