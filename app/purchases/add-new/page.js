"use client";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { XCircle, Search, Clipboard } from "lucide-react";
import FullPageLoader from "../../../components/FullPageLoader";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data ---
const mockVendors = [
  { id: 1, name: "Vendor A" },
  { id: 2, name: "Vendor B" },
  { id: 3, name: "Vendor C" },
];

const mockBranches = [
  { id: 1, name: "Main Branch" },
  { id: 2, name: "West Office" },
  { id: 3, name: "East Warehouse" },
];

const mockProducts = [
  { id: 1, name: "Santoor Hand Wash (49)", purchaseRate: 49.0, taxRate: 0.05 },
  { id: 2, name: "Dabur Honey (250g)", purchaseRate: 90.0, taxRate: 0.05 },
  {
    id: 3,
    name: "Britannia Bourbon (100g)",
    purchaseRate: 10.0,
    taxRate: 0.12,
  },
  { id: 4, name: "Aashirvaad Atta (5kg)", purchaseRate: 250.0, taxRate: 0.05 },
  { id: 5, name: "Maggi Noodles (70g)", purchaseRate: 12.0, taxRate: 0.12 },
  { id: 6, name: "Tata Salt (1kg)", purchaseRate: 20.0, taxRate: 0.05 },
];

export default function AddPurchasePage() {
  const [loading, setLoading] = useState(true);
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [purchaseData, setPurchaseData] = useState({
    vendorId: "",
    branchId: "",
    invoiceNumber: "",
    purchaseDate: "",
    receivedDate: "",
    description: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [paymentDetails, setPaymentDetails] = useState({
    paidAmount: 0,
    dueAmount: 0,
    paymentMethods: [],
    cashAmount: 0,
    chequeNumber: "",
    chequeAmount: 0,
    chequeDate: "",
    bankName: "",
    upiAmount: 0,
    upiId: "",
    upiDate: "",
    accountAmount: 0,
    accountNumber: "",
    accountDate: "",
    receivedBy: "",
    receivedDate: "",
    accountTransactionId: "",
    accountTransactionDate: "",
  });

  const [shippingCharge, setShippingCharge] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    let newSubtotal = 0;
    let newTotalTax = 0;
    let newTotalDiscount = 0;

    selectedProducts.forEach((product) => {
      const lineTotal = product.purchaseRate * product.qty;
      const lineTax = lineTotal * (product.taxRate || 0);
      newSubtotal += lineTotal;
      newTotalTax += lineTax;
      newTotalDiscount += parseFloat(product.discount) || 0;
    });

    const finalGrandTotal =
      newSubtotal +
        newTotalTax -
        newTotalDiscount +
        parseFloat(shippingCharge) || 0;

    setSubtotal(newSubtotal);
    setTotalTax(newTotalTax);
    setTotalDiscount(newTotalDiscount);
    setGrandTotal(finalGrandTotal);
    setPaymentDetails((prev) => ({
      ...prev,
      dueAmount: finalGrandTotal - (parseFloat(prev.paidAmount) || 0),
    }));
  }, [selectedProducts, shippingCharge]);

  const handleProductSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 1) {
      const results = mockProducts.filter((p) =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleProductSelect = (product) => {
    if (!selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, qty: 1, discount: 0 },
      ]);
    }
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...selectedProducts];
    newProducts[index][field] = parseFloat(value) || 0;
    setSelectedProducts(newProducts);
  };

  const removeProduct = (index) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newProducts);
  };

  const handlePurchaseDataChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value });
  };

  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    let newMethods = [...paymentDetails.paymentMethods];
    if (newMethods.includes(method)) {
      newMethods = newMethods.filter((m) => m !== method);
    } else {
      newMethods.push(method);
    }
    setPaymentDetails((prev) => ({
      ...prev,
      paymentMethods: newMethods,
    }));
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // fake delay for demo
    setTimeout(() => {
      setLoading(false);
      setSuccessPopup(true); // ✅ popup show
    }, 1500);
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const finalData = {
//       ...purchaseData,
//       selectedProducts,
//       paymentDetails,
//       paymentSummary: {
//         subtotal,
//         totalTax,
//         totalDiscount,
//         shippingCharge,
//         grandTotal,
//       },
//     };
//     console.log("Purchase Order Submitted:", finalData);
//     alert("Purchase Order Submitted Successfully!");
//   };

  const isMethodSelected = (method) =>
    paymentDetails.paymentMethods.includes(method);

  if (loading)
    return (
      <FullPageLoader
        message="Loading Add Purchase Order..."
        loading={loading}
      />
    );

  return (
    <div className="bg-gray-100 w-full min-h-screen font-sans antialiased">
      <Header title="Create Purchase Order" />

      <div className="py-4 px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-6 w-full">
          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* Purchase Order Details */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Purchase Order Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="vendorId"
                    value={purchaseData.vendorId}
                    onChange={handlePurchaseDataChange}
                    required
                    className="w-full rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition px-4 py-3"
                  >
                    <option value="">Select Vendor</option>
                    {mockVendors.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Branch <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="branchId"
                    value={purchaseData.branchId}
                    onChange={handlePurchaseDataChange}
                    required
                    className="w-full rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition px-4 py-3"
                  >
                    <option value="">Select...</option>
                    {mockBranches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Invoice Number
                  </label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={purchaseData.invoiceNumber}
                    onChange={handlePurchaseDataChange}
                    className="w-full rounded-xl border border-gray-300 shadow-sm px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={purchaseData.purchaseDate}
                    onChange={handlePurchaseDataChange}
                    className="w-full rounded-xl border border-gray-300 shadow-sm px-4 py-3"
                  />
                </div>
              </div>
            </div>

            {/* Add Products Section */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Add Products
              </h3>

              {/* Search Box */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search and add products..."
                  value={searchTerm}
                  onChange={handleProductSearch}
                  className="w-full pl-12 pr-4 h-11 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />

                {/* Dropdown */}
                {showDropdown && (
                  <ul className="absolute z-20 w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                    {searchResults.length > 0 ? (
                      searchResults.map((p) => (
                        <li
                          key={p.id}
                          onClick={() => handleProductSelect(p)}
                          className="px-4 py-3 cursor-pointer hover:bg-indigo-50 transition-colors text-sm"
                        >
                          {p.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-gray-500 text-sm">
                        No products found.
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* Selected Products Table (Always visible) */}
            <div className="overflow-x-auto bg-gray-50 rounded-xl p-5 shadow-inner mb-10 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Selected Products
              </h4>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                        Purchase Rate
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                        Discount
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                        Tax (%)
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                        Selling Price
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedProducts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-6 py-6 text-center text-gray-500"
                        >
                          No products selected yet. Use the search above to add
                          items.
                        </td>
                      </tr>
                    ) : (
                      selectedProducts.map((product, index) => {
                        const qty = Number(product.qty) || 0;
                        const rate = Number(product.purchaseRate) || 0;
                        const discount = Number(product.discount) || 0;
                        const tax = Number(product.tax) || 18; // default 18%
                        const subtotal = qty * rate - discount;
                        const total = subtotal + (subtotal * tax) / 100;

                        return (
                          <tr key={product.id}>
                            {/* Product Name */}
                            <td className="px-4 py-3 whitespace-nowrap text-gray-900">
                              {product.name}
                            </td>

                            {/* Unit */}
                            <td className="px-4 py-3 whitespace-nowrap">
                              <select
                                value={product.unit || "Pieces"}
                                onChange={(e) =>
                                  handleProductChange(
                                    index,
                                    "unit",
                                    e.target.value
                                  )
                                }
                                className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              >
                                <option>Pieces</option>
                                <option>Box</option>
                                <option>Pack</option>
                              </select>
                            </td>

                            {/* Quantity */}
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input
                                type="number"
                                min="1"
                                value={product.qty}
                                onChange={(e) =>
                                  handleProductChange(
                                    index,
                                    "qty",
                                    e.target.value
                                  )
                                }
                                className="w-20 h-9 rounded-md border border-gray-300 bg-white px-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500"
                              />
                            </td>

                            {/* Purchase Rate */}
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input
                                type="number"
                                value={product.purchaseRate}
                                onChange={(e) =>
                                  handleProductChange(
                                    index,
                                    "purchaseRate",
                                    e.target.value
                                  )
                                }
                                className="w-24 h-9 rounded-md border border-gray-300 bg-white px-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500"
                              />
                            </td>

                            {/* Discount */}
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input
                                type="number"
                                value={product.discount}
                                onChange={(e) =>
                                  handleProductChange(
                                    index,
                                    "discount",
                                    e.target.value
                                  )
                                }
                                className="w-20 h-9 rounded-md border border-gray-300 bg-white px-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500"
                              />
                            </td>

                            {/* Tax */}
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input
                                type="number"
                                value={product.tax || 18}
                                onChange={(e) =>
                                  handleProductChange(
                                    index,
                                    "tax",
                                    e.target.value
                                  )
                                }
                                className="w-20 h-9 rounded-md border border-gray-300 bg-white px-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500"
                              />
                            </td>

                            {/* Total */}
                            <td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-900">
                              ₹{total.toFixed(2)}
                            </td>

                            {/* Selling Price */}
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input
                                type="number"
                                value={product.sellingPrice || ""}
                                onChange={(e) =>
                                  handleProductChange(
                                    index,
                                    "sellingPrice",
                                    e.target.value
                                  )
                                }
                                className="w-24 h-9 rounded-md border border-gray-300 bg-white px-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500"
                              />
                            </td>

                            {/* Action */}
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <button
                                type="button"
                                onClick={() => removeProduct(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle size={18} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Purchase Description & Payment/Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Purchase Description
                </h3>
                <textarea
                  name="description"
                  value={purchaseData.description}
                  onChange={handlePurchaseDataChange}
                  maxLength="500"
                  rows="8"
                  className="w-full rounded-xl border border-gray-300 shadow-sm p-4"
                  placeholder="Enter purchase description..."
                ></textarea>
                <p className="text-right text-sm text-gray-400 mt-2">
                  {purchaseData.description.length}/500 characters
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Payment Details & Summary
                </h3>
                <div className="bg-gray-50 p-8 rounded-2xl shadow-inner">
                  <div className="space-y-4 text-lg">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-gray-900">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Charge:</span>
                      <span className="font-semibold text-gray-900">
                        <input
                          type="number"
                          value={shippingCharge}
                          onChange={(e) =>
                            setShippingCharge(parseFloat(e.target.value) || 0)
                          }
                          className="w-24 text-right rounded-md border border-gray-300 shadow-sm text-sm font-normal"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Discount:</span>
                      <span className="font-semibold text-red-600">
                        -₹{totalDiscount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tax:</span>
                      <span className="font-semibold text-gray-900">
                        ₹{totalTax.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-dashed border-gray-300 flex justify-between items-center">
                    <span className="text-xl font-extrabold text-gray-900">
                      Grand Total:
                    </span>
                    <span className="text-xl font-extrabold text-indigo-600">
                      ₹{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW FULL-WIDTH PAYMENT METHOD SECTION */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-gray-800">
                Payment Method(s)
              </h4>
              <div className="flex flex-wrap gap-4 mb-8">
                {["cash", "cheque", "upi", "account"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => handlePaymentMethodChange(method)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors border-2 ${
                      isMethodSelected(method)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {method.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Dynamic Payment Details */}
              <div className="space-y-6">
                {isMethodSelected("cash") && (
                  <div className="bg-gray-50 p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Cash Amount
                      </label>
                      <input
                        type="number"
                        name="cashAmount"
                        value={paymentDetails.cashAmount}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Received By
                      </label>
                      <input
                        type="text"
                        name="receivedBy"
                        value={paymentDetails.receivedBy}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Received Date
                      </label>
                      <input
                        type="date"
                        name="receivedDate"
                        value={paymentDetails.receivedDate}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                  </div>
                )}

                {isMethodSelected("cheque") && (
                  <div className="bg-gray-50 p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cheque Amount
                      </label>
                      <input
                        type="number"
                        name="chequeAmount"
                        value={paymentDetails.chequeAmount}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cheque Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="chequeNumber"
                          value={paymentDetails.chequeNumber}
                          onChange={handlePaymentDataChange}
                          className="w-full rounded-md border border-gray-300 shadow-sm pr-12 px-4 py-3"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              paymentDetails.chequeNumber,
                              "chequeNumber"
                            )
                          }
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-600 transition"
                          title="Copy Cheque Number"
                        >
                          <Clipboard size={18} />
                        </button>
                        {copiedField === "chequeNumber" && (
                          <span className="absolute -top-6 right-0 text-xs text-green-600">
                            Copied!
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cheque Date
                      </label>
                      <input
                        type="date"
                        name="chequeDate"
                        value={paymentDetails.chequeDate}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        value={paymentDetails.bankName}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Received By
                      </label>
                      <input
                        type="text"
                        name="receivedBy"
                        value={paymentDetails.receivedBy}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Received Date
                      </label>
                      <input
                        type="date"
                        name="receivedDate"
                        value={paymentDetails.receivedDate}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                  </div>
                )}

                {isMethodSelected("upi") && (
                  <div className="bg-gray-50 p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        UPI Amount
                      </label>
                      <input
                        type="number"
                        name="upiAmount"
                        value={paymentDetails.upiAmount}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction ID
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="upiId"
                          value={paymentDetails.upiId}
                          onChange={handlePaymentDataChange}
                          className="w-full rounded-md border border-gray-300 shadow-sm pr-12 px-4 py-3"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(paymentDetails.upiId, "upiId")
                          }
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-600 transition"
                          title="Copy Transaction ID"
                        >
                          <Clipboard size={18} />
                        </button>
                        {copiedField === "upiId" && (
                          <span className="absolute -top-6 right-0 text-xs text-green-600">
                            Copied!
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Received By
                      </label>
                      <input
                        type="text"
                        name="receivedBy"
                        value={paymentDetails.receivedBy}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                  </div>
                )}

                {isMethodSelected("account") && (
                  <div className="bg-gray-50 p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Transfer Amount
                      </label>
                      <input
                        type="number"
                        name="accountAmount"
                        value={paymentDetails.accountAmount}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction ID
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="accountTransactionId"
                          value={paymentDetails.accountTransactionId}
                          onChange={handlePaymentDataChange}
                          className="w-full rounded-md border border-gray-300 shadow-sm pr-12 px-4 py-3"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              paymentDetails.accountTransactionId,
                              "accountTransactionId"
                            )
                          }
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-600 transition"
                          title="Copy Transaction ID"
                        >
                          <Clipboard size={18} />
                        </button>
                        {copiedField === "accountTransactionId" && (
                          <span className="absolute -top-6 right-0 text-xs text-green-600">
                            Copied!
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Transaction Date
                      </label>
                      <input
                        type="date"
                        name="accountTransactionDate"
                        value={paymentDetails.accountTransactionDate}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Received By
                      </label>
                      <input
                        type="text"
                        name="receivedBy"
                        value={paymentDetails.receivedBy}
                        onChange={handlePaymentDataChange}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm px-4 py-3"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Order"
            )}
          </button>
        </div>
      </form>

      {/* ✅ Success Popup */}
      <AnimatePresence>
        {successPopup && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-4 max-w-sm w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-800">
                Order Submitted!
              </h2>
              <p className="text-slate-500">
                Your Order has been successfully saved.
              </p>
              <button
                onClick={() => setSuccessPopup(false)}
                className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-600 transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      </div>
    </div>
  );
}
