"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RepublicDayFlowers() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if today is Republic Day (January 26)
    const today = new Date();
    const month = today.getMonth(); // 0-11, January is 0
    const date = today.getDate();
    setIsVisible(month === 0 && date === 26);
  }, []);

  // Tricolor flowers
  const flowers = Array.from({ length: 30 }).map((_, i) => ({
    id: `flower-${i}`,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 20 + Math.random() * 30,
    rotation: Math.random() * 360,
    color: ["#FF9933", "#FFFFFF", "#138808"][Math.floor(Math.random() * 3)],
  }));

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          initial={{ y: -100, opacity: 0, rotate: flower.rotation }}
          animate={{
            y: "100vh",
            opacity: [0, 1, 1, 0.8, 0],
            rotate: flower.rotation + 720 + (Math.random() * 360),
            x: [
              0,
              (Math.random() - 0.5) * 150,
              (Math.random() - 0.5) * 150,
              (Math.random() - 0.5) * 100,
            ],
          }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{
            left: `${flower.left}%`,
          }}
        >
          {/* Flower SVG - Marigold style */}
          <svg
            width={flower.size}
            height={flower.size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer petals */}
            <ellipse cx="20" cy="8" rx="4" ry="6" fill={flower.color} opacity="0.9" />
            <ellipse cx="32" cy="12" rx="4" ry="6" fill={flower.color} opacity="0.9" />
            <ellipse cx="32" cy="28" rx="4" ry="6" fill={flower.color} opacity="0.9" />
            <ellipse cx="20" cy="32" rx="4" ry="6" fill={flower.color} opacity="0.9" />
            <ellipse cx="8" cy="28" rx="4" ry="6" fill={flower.color} opacity="0.9" />
            <ellipse cx="8" cy="12" rx="4" ry="6" fill={flower.color} opacity="0.9" />
            {/* Middle petals */}
            <ellipse cx="20" cy="6" rx="3" ry="5" fill={flower.color} opacity="0.8" />
            <ellipse cx="34" cy="20" rx="3" ry="5" fill={flower.color} opacity="0.8" />
            <ellipse cx="20" cy="34" rx="3" ry="5" fill={flower.color} opacity="0.8" />
            <ellipse cx="6" cy="20" rx="3" ry="5" fill={flower.color} opacity="0.8" />
            {/* Inner layer */}
            <circle cx="20" cy="20" r="6" fill={flower.color} opacity="0.7" />
            {/* Center - Navy blue */}
            <circle cx="20" cy="20" r="3" fill="#000080" opacity="0.9" />
            <circle cx="20" cy="20" r="1.5" fill="#FFD700" opacity="0.8" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
