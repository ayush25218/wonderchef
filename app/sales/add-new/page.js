"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react"; // ✅ icons
import Header from "../../../components/Header";

// Dummy data (replace with DB/API later)
const customers = [
  "Rahul Sharma",
  "Anjali Singh",
  "Vikram Rao",
  "Priya Mehta",
  "Amit Verma",
];
const availableProducts = [
  { id: 1, name: "Premium Coffee Beans", price: 25.0, stock: 50, category: "Beverage" },
  { id: 2, name: "Gourmet Chocolate Bar", price: 5.5, stock: 120, category: "Snacks" },
  { id: 3, name: "Organic Herbal Tea", price: 12.0, stock: 80, category: "Beverage" },
  { id: 4, name: "Artisanal Honey", price: 18.75, stock: 40, category: "Grocery" },
];

export default function Page() {
  const [customer, setCustomer] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(5);
  const [subtotal, setSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [pageLoading, setPageLoading] = useState(true); // ✅ full page loader

  // 🎵 sound effect
  const playSound = () => {
    const audio = new Audio("/sounds/beep-sound.mp3");
    audio.play();
  };

  // Loader 1.5 sec ke liye
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Recalculate totals
  useEffect(() => {
    let newSubtotal = 0;
    products.forEach((p) => {
      newSubtotal += p.quantity * p.price;
    });
    setSubtotal(newSubtotal);

    const discountAmount = newSubtotal * (discount / 100);
    const taxAmount = (newSubtotal - discountAmount) * (taxRate / 100);
    setTotalAmount(newSubtotal - discountAmount + taxAmount);
  }, [products, discount, taxRate]);

  // Add product
  const handleAddProduct = (product) => {
    const exists = products.find((p) => p.id === product.id);
    if (exists) {
      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setProducts([...products, { ...product, quantity: 1 }]);
    }
    playSound();
    setProductSearch("");
    setShowProductDropdown(false);
  };

  // Quantity change
  const handleQuantityChange = (id, qty) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, qty) } : p
      )
    );
  };

  // Remove product
  const handleRemoveProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessPopup(true);
      setProducts([]);
      setCustomer("");
      setCustomerSearch("");
    }, 2000);
  };

  return (
    <>
      {/* ✅ Full Page Loader */}
      <AnimatePresence>
        {pageLoading && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Loader2 className="w-12 h-12 text-white animate-spin" />
              <p className="mt-4 text-white font-semibold text-lg">
                Loading Add Sales...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Actual Page */}
      {!pageLoading && (
        <div className="bg-gradient-to-br from-slate-50 via-indigo-50 to-white min-h-screen w-full relative">
          <Header title="Add New Sale" />
          <div className="p-6">
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl max-w-full mx-auto p-8">
              <form className="space-y-10" onSubmit={handleSubmit}>
                
                {/* Customer Search */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Customer</h3>
                  <div className="relative mt-3">
                    <input
                      type="text"
                      value={customerSearch}
                      onChange={(e) => {
                        setCustomerSearch(e.target.value);
                        setShowCustomerDropdown(true);
                      }}
                      placeholder="Search customer..."
                      className="w-full rounded-xl border border-slate-200 shadow-sm px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {showCustomerDropdown && customerSearch && (
                      <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-slate-200 z-10 max-h-48 overflow-y-auto">
                        {customers
                          .filter((c) =>
                            c.toLowerCase().includes(customerSearch.toLowerCase())
                          )
                          .map((c, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setCustomer(c);
                                setCustomerSearch(c);
                                setShowCustomerDropdown(false);
                              }}
                              className="px-4 py-2 cursor-pointer hover:bg-indigo-50"
                            >
                              {c}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Search */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Products</h3>
                  <div className="relative mt-3">
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value);
                        setShowProductDropdown(true);
                      }}
                      placeholder="Search product..."
                      className="w-full rounded-xl border border-slate-200 shadow-sm px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {showProductDropdown && productSearch && (
                      <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-slate-200 z-10 max-h-56 overflow-y-auto">
                        {availableProducts
                          .filter((p) =>
                            p.name.toLowerCase().includes(productSearch.toLowerCase())
                          )
                          .map((p) => (
                            <div
                              key={p.id}
                              onClick={() => handleAddProduct(p)}
                              className="px-4 py-2 cursor-pointer hover:bg-indigo-50 flex justify-between"
                            >
                              <span>{p.name}</span>
                              <span className="text-slate-500 text-sm">₹{p.price}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Table */}
                <div className="overflow-x-auto mt-6">
                  <table className="w-full border border-slate-200 rounded-xl overflow-hidden text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="py-3 px-4 text-left">Product</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Quantity</th>
                        <th className="py-3 px-4">Subtotal</th>
                        <th className="py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((p) => (
                          <tr key={p.id} className="border-t hover:bg-slate-50">
                            <td className="py-3 px-4">{p.name}</td>
                            <td className="py-3 px-4 text-center">{p.category}</td>
                            <td className="py-3 px-4 text-center">₹{p.price.toFixed(2)}</td>
                            <td className="py-3 px-4 text-center">
                              <input
                                type="number"
                                min="1"
                                value={p.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(p.id, parseInt(e.target.value))
                                }
                                className="w-16 text-center rounded-md border border-slate-300"
                              />
                            </td>
                            <td className="py-3 px-4 text-center font-medium">
                              ₹{(p.price * p.quantity).toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => handleRemoveProduct(p.id)}
                                className="text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="py-6 text-center text-slate-400 italic">
                            No products added yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-inner space-y-3 max-w-md ml-auto">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Discount (%)</span>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-20 text-right rounded-md border border-slate-300 px-2 py-1"
                    />
                    <span>- ₹{(subtotal * (discount / 100)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax ({taxRate}%)</span>
                    <span>
                      ₹{((subtotal - subtotal * (discount / 100)) * (taxRate / 100)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-indigo-700 border-t pt-3">
                    <span>Total</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Recording...
                      </>
                    ) : (
                      "Record Sale"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

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
                  <h2 className="text-2xl font-bold text-slate-800">Sale Recorded!</h2>
                  <p className="text-slate-500">Your sale has been successfully saved.</p>
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
      )}
    </>
  );
}
