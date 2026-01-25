"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flag } from "lucide-react";

export default function RepublicDayBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Auto-hide after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Confetti particles
  const confetti = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    color: ["#FF9933", "#FFFFFF", "#138808", "#000080"][Math.floor(Math.random() * 4)],
  }));

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
        >
          {/* Confetti Container */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {confetti.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{ y: -20, opacity: 1, rotate: 0 }}
                  animate={{
                    y: 800,
                    opacity: [1, 1, 0],
                    rotate: 360,
                    x: [0, (Math.random() - 0.5) * 100, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${particle.left}%`,
                    backgroundColor: particle.color,
                  }}
                />
              ))}
            </div>
          )}

          {/* Main Banner */}
          <div className="relative bg-gradient-to-r from-[#FF9933] via-white to-[#138808] py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Left: Flag Icon with Animation */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden sm:flex items-center mr-4"
              >
                <Flag className="w-8 h-8 text-[#000080]" />
              </motion.div>

              {/* Center: Text Content */}
              <div className="flex-1 text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1,
                  }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
                >
                  <motion.span
                    className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF9933] drop-shadow-lg"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(255, 153, 51, 0)",
                        "0 0 20px rgba(255, 153, 51, 0.8)",
                        "0 0 0px rgba(255, 153, 51, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🇮🇳
                  </motion.span>
                  <motion.h2
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-[#000080]"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Happy Republic Day 2025
                  </motion.h2>
                  <motion.span
                    className="text-lg sm:text-xl md:text-2xl font-bold text-[#138808] drop-shadow-lg"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(19, 136, 8, 0)",
                        "0 0 20px rgba(19, 136, 8, 0.8)",
                        "0 0 0px rgba(19, 136, 8, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    🇮🇳
                  </motion.span>
                </motion.div>
                <motion.p
                  className="text-xs sm:text-sm md:text-base text-[#000080] font-semibold mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  जय हिन्द! Celebrating 76 Years of Democracy & Unity
                </motion.p>
              </div>

              {/* Right: Close Button */}
              <motion.button
                onClick={() => setIsVisible(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Close banner"
              >
                <X className="w-5 h-5 text-[#000080]" />
              </motion.button>
            </div>

            {/* Animated Wave Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ width: "200%" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
