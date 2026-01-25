"use client"
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface DonationStats {
  total_donations: number;
  total_amount: number;
  average_amount: number | null;
  max_amount: number | null;
  receipts_processed: number;
  high_confidence_receipts: number;
  verified_donations: number;
  pending_donations: number;
}

export default function DonationStats() {
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Try to fetch from the view first
      const { data: viewData, error } = await supabase
        .from("donation_stats")
        .select("*")
        .single();

      if (error) {
        // Fallback: calculate stats directly from donations table
        const { data: donations, error: donationsError } = await supabase
          .from("donations")
          .select("*");

        if (donationsError) throw donationsError;

        // Calculate stats manually
        const total = donations?.length || 0;
        const verified = donations?.filter(d => d.status === 'verified').length || 0;
        const pending = donations?.filter(d => d.status === 'pending_verification').length || 0;
        const totalAmount = donations?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;
        const averageAmount = total > 0 ? totalAmount / total : 0;
        
        // Calculate max amount more safely
        let maxAmount = 0;
        if (donations && donations.length > 0) {
          // Convert amounts to numbers and filter out null/undefined/NaN values
          const amounts = donations
            .map(d => {
              let amount = d.amount;
              // Handle different data types
              if (typeof amount === 'string') {
                amount = parseFloat(amount);
              } else if (typeof amount === 'number') {
                amount = amount;
              } else {
                amount = 0;
              }
              return isNaN(amount) ? 0 : amount;
            })
            .filter(amount => amount > 0);
          
          maxAmount = amounts.length > 0 ? Math.max(...amounts) : 0;
        }
        
        const receiptsProcessed = donations?.filter(d => d.receipt_processing_status === 'completed').length || 0;
        const highConfidence = donations?.filter(d => d.receipt_confidence && d.receipt_confidence >= 0.8).length || 0;

        const calculatedData = {
          total_donations: total,
          total_amount: totalAmount,
          average_amount: averageAmount || null,
          max_amount: maxAmount || null,
          receipts_processed: receiptsProcessed,
          high_confidence_receipts: highConfidence,
          verified_donations: verified,
          pending_donations: pending
        };
        
        setStats(calculatedData);
      } else {
        // Handle case where view might not have max_amount and average_amount fields yet
        
        // If the view doesn't have max_amount or average_amount, calculate them manually
        let maxAmount = viewData.max_amount;
        const averageAmount = viewData.average_amount;
        
        if (maxAmount === null || maxAmount === undefined) {
          // Calculate max_amount manually
          const { data: donationsForMax, error: maxError } = await supabase
            .from("donations")
            .select("amount");
          
          if (!maxError && donationsForMax && donationsForMax.length > 0) {
            const amounts = donationsForMax
              .map(d => {
                let amount = d.amount;
                if (typeof amount === 'string') {
                  amount = parseFloat(amount);
                } else if (typeof amount === 'number') {
                  amount = amount;
                } else {
                  amount = 0;
                }
                return isNaN(amount) ? 0 : amount;
              })
              .filter(amount => amount > 0);
            
            maxAmount = amounts.length > 0 ? Math.max(...amounts) : 0;
          }
        }
        
        const viewDataWithDefaults = {
          ...viewData,
          average_amount: averageAmount || null,
          max_amount: maxAmount || null
        };
        setStats(viewDataWithDefaults);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return "₹0";
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Main Statistics Loading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Max and Average Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="relative">
      {/* Creative Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 w-64 h-64 bg-primary-100 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-50 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      {/* Main Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        {/* Verified Donations Card */}
        <div className="group relative bg-white rounded-2xl shadow-sm border border-primary-100 p-6 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-transparent rounded-full -translate-y-10 translate-x-10 opacity-60"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="text-3xl lg:text-4xl font-bold text-primary-800 mb-2 font-mono">
              {stats.verified_donations}
            </div>
            
            <div className="text-base font-semibold text-primary-700 mb-1">
              Verified Donations
            </div>
            
            <div className="text-sm text-neutral-600">
              Successfully processed
            </div>
            
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Total Amount Card */}
        <div className="group relative bg-white rounded-2xl shadow-sm border border-primary-100 p-6 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-transparent rounded-full -translate-y-10 translate-x-10 opacity-60"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div className="text-3xl lg:text-4xl font-bold text-primary-800 mb-2 font-mono">
              {formatAmount(stats.total_amount)}
            </div>
            
            <div className="text-base font-semibold text-primary-700 mb-1">
              Total Raised
            </div>
            
            <div className="text-sm text-neutral-600">
              From all donations
            </div>
            
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-primary-400 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
        
        {/* Pending Donations Card */}
        <div className="group relative bg-white rounded-2xl shadow-sm border border-primary-100 p-6 hover:shadow-lg transition-all duration-300 overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-50 to-transparent rounded-full -translate-y-10 translate-x-10 opacity-60"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="text-3xl lg:text-4xl font-bold text-amber-800 mb-2 font-mono">
              {stats.pending_donations}
            </div>
            
            <div className="text-base font-semibold text-amber-700 mb-1">
              Pending Verification
            </div>
            
            <div className="text-sm text-neutral-600">
              Awaiting review
            </div>
            
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>

      {/* Secondary Statistics - Creative Layout */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {/* Maximum Donation Card */}
          <div className="group relative bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-sm border border-primary-100 p-6 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-100 rounded-full opacity-30"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Highest Single</p>
                    <p className="text-base font-semibold text-primary-700">Donation</p>
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-800 font-mono">
                  {formatAmount(stats.max_amount)}
                </div>
              </div>
              
              <div className="ml-4">
                <div className="w-16 h-16 bg-primary-100/50 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Average Donation Card */}
          <div className="group relative bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-sm border border-primary-100 p-6 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-100 rounded-full opacity-30"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.293a1 1 0 00-1.414-1.414L10 9.172 8.707 7.879a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10l1.293 1.293L8 12.586l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0L10 13.414l1.293 1.293a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L12 12.586 10.707 11.293 12 10l1.293 1.293a1 1 0 001.414-1.414l-2-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Average</p>
                    <p className="text-base font-semibold text-primary-700">Contribution</p>
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-800 font-mono">
                  {formatAmount(stats.average_amount)}
                </div>
              </div>
              
              <div className="ml-4">
                <div className="w-16 h-16 bg-primary-100/50 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-sm font-medium">
            <div className="w-2 h-2 bg-primary-600 rounded-full mr-2 animate-pulse"></div>
            Live statistics updated in real-time
          </div>
        </div>
      </div>
    </div>
  );
} 