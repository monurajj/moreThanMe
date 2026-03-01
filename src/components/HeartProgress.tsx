"use client"
import { useState, useEffect } from "react";
interface DonationStats {
  total_amount: number;
}

// Custom hook for animated counting
const useAnimatedNumber = (targetNumber: number, duration: number = 2000) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (targetNumber === 0) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(targetNumber * easeOutCubic);
      
      setCurrentNumber(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetNumber, duration]);

  return currentNumber;
};

export default function HeartProgress() {
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/donations/stats");
      const data = await res.json().catch(() => ({}));
      const totalAmount = data.total_amount_verified ?? data.total_amount ?? 0;
      setStats({ total_amount: totalAmount });
      setTimeout(() => setAnimationStarted(true), 300);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const currentAmount = stats?.total_amount || 0;
  const animatedAmount = useAnimatedNumber(animationStarted ? currentAmount : 0, 2500);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="w-48 h-48 border-4 border-primary-200 rounded-full animate-pulse">
            <div className="absolute inset-4 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center relative">
      <div className="relative flex flex-col items-center justify-center">
        {/* Heart Container */}
        <div className="relative w-52 h-52 mt-[-70px] transform transition-all duration-1000 hover:scale-105">
          {/* Background Heart (Outline) */}
          <svg
            className="absolute inset-2 w-48 h-48 text-primary-100 dark:text-primary-900/30 transition-all duration-500"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path 
              d="M50 85.5C25.5 70.5 10 55.5 10 40.5C10 28.5 18 20.5 30 20.5C38 20.5 45 24.5 50 30.5C55 24.5 62 20.5 70 20.5C82 20.5 90 28.5 90 40.5C90 55.5 74.5 70.5 50 85.5Z"
            />
          </svg>
          
          {/* Filled Heart (brand color) */}
          <svg
            className="absolute inset-2 w-48 h-48 transition-all duration-1000 ease-out"
            viewBox="0 0 100 100"
            fill="currentColor"
            style={{ filter: "drop-shadow(0 4px 12px rgba(165, 28, 48, 0.25))" }}
          >
            <path 
              className="text-primary-600"
              d="M50 85.5C25.5 70.5 10 55.5 10 40.5C10 28.5 18 20.5 30 20.5C38 20.5 45 24.5 50 30.5C55 24.5 62 20.5 70 20.5C82 20.5 90 28.5 90 40.5C90 55.5 74.5 70.5 50 85.5Z"
            />
          </svg>
          
          {/* Amount Text inside heart */}
          <div className="absolute inset-2 flex items-center justify-center px-4">
            <div className="text-center transform transition-all duration-500">
              <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                {formatAmount(animatedAmount)}
              </div>
            </div>
          </div>
        </div>
        
        {/* Amount Details */}
        <div className="space-y-2 mt-4">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Total amount raised
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-500">
            Every contribution helps us create positive change
          </p>
        </div>
      </div>
    </div>
  );
}
