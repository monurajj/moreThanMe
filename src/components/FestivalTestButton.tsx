"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";
import { specialDays } from "@/config/specialDays";
import { useFestivalTest } from "@/contexts/FestivalTestContext";

export default function FestivalTestButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { testFestival, setTestFestival } = useFestivalTest();

  const handleSelectFestival = (festival: typeof specialDays[0] | null) => {
    setTestFestival(festival || null);
    setIsOpen(false);
  };

  return (
    <>
      {/* Test Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Test Festivals"
      >
        <Palette className="w-6 h-6" />
      </motion.button>

      {/* Festival Selector Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-2xl p-4 w-64 max-h-96 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Test Festivals</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handleSelectFestival(null)}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
              >
                Clear (Normal View)
              </button>
              
              {specialDays.map((festival) => (
                <button
                  key={festival.name}
                  onClick={() => handleSelectFestival(festival)}
                  className="w-full text-left px-4 py-3 rounded hover:bg-gray-100 transition-colors border-l-4"
                  style={{
                    borderLeftColor: festival.colors.primary,
                    backgroundColor: testFestival?.name === festival.name ? festival.colors.primary + '10' : undefined,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{festival.emoji}</span>
                    <div>
                      <div className="font-semibold text-gray-800">{festival.name}</div>
                      <div className="text-xs text-gray-500">
                        {festival.month + 1}/{festival.date}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {testFestival && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500">
                  Currently showing: <strong>{testFestival.name}</strong>
                </p>
                <button
                  onClick={() => handleSelectFestival(null)}
                  className="mt-2 w-full px-3 py-1.5 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
