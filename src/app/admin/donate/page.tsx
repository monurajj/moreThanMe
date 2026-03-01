"use client";

import { useState, useEffect } from "react";

interface Donation {
  id: string;
  name: string;
  amount: number;
  transaction_id: string;
  status: string;
  created_at: string;
  receipt_processing_status?: string;
  receipt_confidence?: number;
}

export default function AdminDonatePage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDonations = async () => {
    const res = await fetch("/api/admin/donations", { credentials: "include" });
    const data = await res.json().catch(() => []);
    if (Array.isArray(data)) setDonations(data);
  };

  const fetchStats = async () => {
    const res = await fetch("/api/admin/donation-stats", { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    setStats({
      total: data.total_donations ?? 0,
      verified: data.verified_donations ?? 0,
      pending: data.pending_donations ?? 0,
      totalAmount: data.total_amount_verified ?? 0,
    });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchDonations(), fetchStats()]);
      setLoading(false);
    })();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    const res = await fetch("/api/admin/donations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      await fetchDonations();
      await fetchStats();
    }
    setUpdatingId(null);
  };

  const formatDate = (dateInput: string | { toDate?: () => Date } | unknown) => {
    const d =
      typeof dateInput === "object" && dateInput && "toDate" in dateInput && typeof (dateInput as { toDate: () => Date }).toDate === "function"
        ? (dateInput as { toDate: () => Date }).toDate()
        : new Date(String(dateInput));
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Donate
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Verify and manage donations. Same Supabase DB as the main site.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Verified</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">{stats.verified}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Pending</p>
          <p className="text-xl font-bold text-yellow-600 dark:text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount (₹)</p>
          <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
            {stats.totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Donor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 dark:text-white">{d.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{d.transaction_id}</div>
                  </td>
                  <td className="px-4 py-3 font-medium">₹{d.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        d.status === "verified"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : d.status === "rejected"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{formatDate(d.created_at)}</td>
                  <td className="px-4 py-3">
                    {d.status === "pending_verification" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(d.id, "verified")}
                          disabled={updatingId === d.id}
                          className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 font-medium disabled:opacity-50"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => updateStatus(d.id, "rejected")}
                          disabled={updatingId === d.id}
                          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {donations.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">No donations yet.</div>
        )}
      </div>
    </>
  );
}
