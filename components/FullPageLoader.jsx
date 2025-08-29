"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function FullPageLoader({ loading, message = "Loading..." }) {
  return (
    <AnimatePresence>
      {loading && (
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
            <p className="mt-4 text-white font-semibold text-lg">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
