"use client"
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface DonationStats {
  total_amount: number;
}

interface DonationData {
  amount: number | null;
  status: string;
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
  const target = 75000; // ₹75,000 target

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch verified donations from Supabase
      const { data: donations, error: donationsError } = await supabase
        .from("donations")
        .select("amount, status")
        .in("status", ["verified", "pending_verification"]);

      if (donationsError) {
        console.error("Error fetching donations:", donationsError);
        throw donationsError;
      }

      // Calculate total amount from verified donations only
      const totalAmount = donations
        ?.reduce((sum: number, d: DonationData) => sum + (d.amount || 0), 0) || 0;
      
      setStats({ total_amount: totalAmount });
      
      // Start animations after data is loaded
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

  const progress = stats ? Math.min((stats.total_amount / target) * 100, 100) : 0;
  const currentAmount = stats?.total_amount || 0;
  
  // Animated values
  const animatedAmount = useAnimatedNumber(animationStarted ? currentAmount : 0, 2500);
  const animatedProgress = useAnimatedNumber(animationStarted ? progress : 0, 3000);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="w-48 h-48 border-4 border-red-200 rounded-full animate-pulse">
            <div className="absolute inset-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
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
            className="absolute inset-2 w-48 h-48 text-gray-200 dark:text-gray-700 transition-all duration-500"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path 
              d="M50 85.5C25.5 70.5 10 55.5 10 40.5C10 28.5 18 20.5 30 20.5C38 20.5 45 24.5 50 30.5C55 24.5 62 20.5 70 20.5C82 20.5 90 28.5 90 40.5C90 55.5 74.5 70.5 50 85.5Z"
            />
          </svg>
          
          {/* Filled Heart (Progress) */}
          <div className="absolute inset-2 w-48 h-48 overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full transition-all duration-1000 ease-out"
              viewBox="0 0 100 100"
              fill="url(#heartGradient)"
              style={{
                filter: `drop-shadow(0 0 ${Math.min(animatedProgress / 4, 15)}px rgba(239, 68, 68, 0.6))`,
                transform: `scale(${1 + (animatedProgress / 1000)})`
              }}
            >
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
                <clipPath id="heartClip">
                  <path d="M50 85.5C25.5 70.5 10 55.5 10 40.5C10 28.5 18 20.5 30 20.5C38 20.5 45 24.5 50 30.5C55 24.5 62 20.5 70 20.5C82 20.5 90 28.5 90 40.5C90 55.5 74.5 70.5 50 85.5Z" />
                </clipPath>
              </defs>
              
              <g clipPath="url(#heartClip)">
                {/* Progress fill */}
                <rect
                  x="0"
                  y={100 - animatedProgress}
                  width="100"
                  height={animatedProgress}
                  fill="url(#heartGradient)"
                />
                
                {/* Subtle highlight effect */}
                {animatedProgress > 20 && (
                  <g>
                    <rect
                      x="10"
                      y={95 - animatedProgress * 0.8}
                      width="80"
                      height="2"
                      fill="rgba(255, 255, 255, 0.3)"
                      rx="1"
                    />
                  </g>
                )}
              </g>
              
              {/* Heart outline */}
              <path 
                d="M50 85.5C25.5 70.5 10 55.5 10 40.5C10 28.5 18 20.5 30 20.5C38 20.5 45 24.5 50 30.5C55 24.5 62 20.5 70 20.5C82 20.5 90 28.5 90 40.5C90 55.5 74.5 70.5 50 85.5Z"
                fill="none"
                stroke="rgba(185, 28, 28, 0.3)"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          
          {/* Progress Text */}
          <div className="absolute inset-2 flex items-center justify-center">
            <div className="text-center transform transition-all duration-500 hover:scale-110">
              <div className="text-4xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-1 transition-all duration-300">
                {Math.round(animatedProgress)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                Complete
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Progress Details */}
        <div className="space-y-4">
          {/* Main amount with counting animation */}
          <div className="relative">
            <div className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
              {formatAmount(animatedAmount)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Actual amount raised
            </div>
          </div>
          
          <div className="text-xl text-gray-600 dark:text-gray-400 font-medium">
            raised of {formatAmount(target)} goal
          </div>
          
          {/* Progress Card */}
          <div className="relative bg-white border border-primary-100 p-6 rounded-xl shadow-sm">
            <div className="relative">
              <div className="text-lg font-semibold text-primary-800 mb-2 text-center">
                {Math.round(animatedProgress)}% Goal Achievement
              </div>
              <div className="text-sm text-neutral-600 font-medium text-center mb-4">
                {formatAmount(target - animatedAmount)} remaining to reach target
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-primary-100 rounded-lg h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg transition-all duration-3000 ease-out"
                  style={{ width: `${animatedProgress}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Achievement badges */}
          {animatedProgress >= 25 && (
            <div className="flex justify-center gap-2 flex-wrap">
              {animatedProgress >= 25 && (
                <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-semibold border border-primary-200">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Quarter Milestone
                </div>
              )}
              {animatedProgress >= 50 && (
                <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-semibold border border-primary-200">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Halfway Reached
                </div>
              )}
              {animatedProgress >= 75 && (
                <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-semibold border border-primary-200">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Nearly Complete
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}