"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, DollarSign, TrendingDown, Wallet, Plus, Pencil, Trash2 } from "lucide-react";

interface Expenditure {
  id: string;
  amount: number;
  reason: string;
  date: string;
  created_at?: unknown;
}

function getWeekKey(dateStr: string): string {
  const d = new Date(dateStr);
  const start = new Date(d);
  start.setDate(d.getDate() - d.getDay());
  return start.toISOString().slice(0, 10);
}

function getMonthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatMonth(key: string): string {
  const [y, m] = key.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function formatWeek(key: string): string {
  const d = new Date(key);
  const end = new Date(d);
  end.setDate(d.getDate() + 6);
  return `${d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${end.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;
}

export default function AdminTransparencyPage() {
  const [totalFunding, setTotalFunding] = useState(0);
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editReason, setEditReason] = useState("");
  const [editDate, setEditDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [newReason, setNewReason] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));

  const totalExpenditure = expenditures.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const remainingBalance = totalFunding - totalExpenditure;

  const byMonth: Record<string, { total: number; items: Expenditure[] }> = {};
  const byWeek: Record<string, { total: number; items: Expenditure[] }> = {};
  expenditures.forEach((e) => {
    const monthKey = getMonthKey(e.date);
    const weekKey = getWeekKey(e.date);
    if (!byMonth[monthKey]) byMonth[monthKey] = { total: 0, items: [] };
    if (!byWeek[weekKey]) byWeek[weekKey] = { total: 0, items: [] };
    const amt = Number(e.amount) || 0;
    byMonth[monthKey].total += amt;
    byMonth[monthKey].items.push(e);
    byWeek[weekKey].total += amt;
    byWeek[weekKey].items.push(e);
  });
  const monthKeys = Object.keys(byMonth).sort().reverse();
  const weekKeys = Object.keys(byWeek).sort().reverse();

  const fetchFunding = async () => {
    const res = await fetch("/api/admin/donation-stats", { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    setTotalFunding(Number(data.total_amount_verified) || 0);
  };

  const fetchExpenditures = async () => {
    const res = await fetch("/api/admin/expenditures", { credentials: "include" });
    const data = await res.json().catch(() => []);
    setExpenditures(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchFunding(), fetchExpenditures()]);
      setLoading(false);
    })();
  }, []);

  const startEdit = (e: Expenditure) => {
    setEditingId(e.id);
    setEditAmount(String(e.amount));
    setEditReason(e.reason);
    setEditDate(e.date.slice(0, 10));
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/expenditures?id=${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: Number(editAmount), reason: editReason, date: editDate }),
      });
      if (res.ok) {
        await fetchExpenditures();
        setEditingId(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const removeExpenditure = async (id: string) => {
    if (!confirm("Delete this expenditure entry?")) return;
    const res = await fetch(`/api/admin/expenditures?id=${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) await fetchExpenditures();
    if (editingId === id) setEditingId(null);
  };

  const addExpenditure = async () => {
    const amt = Number(newAmount);
    if (!newReason.trim() || isNaN(amt) || amt < 0 || !newDate) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/expenditures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: amt, reason: newReason.trim(), date: newDate }),
      });
      if (res.ok) {
        await fetchExpenditures();
        setAdding(false);
        setNewAmount("");
        setNewReason("");
        setNewDate(new Date().toISOString().slice(0, 10));
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-10 h-10 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm mb-4">
          ← Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Transparency</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Total funding is auto-calculated from verified donations. Add expenditures to track spending and see remaining balance.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total funding (donations)</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">₹{totalFunding.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total expenditure</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">₹{totalExpenditure.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Remaining balance</p>
              <p className={`text-xl font-bold ${remainingBalance >= 0 ? "text-gray-900 dark:text-white" : "text-red-600 dark:text-red-400"}`}>
                ₹{remainingBalance.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expenditure list + Add */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">All expenditures</h3>
          {!adding && (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700"
            >
              <Plus className="w-4 h-4" /> Add expenditure
            </button>
          )}
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {adding && (
            <div className="p-4 flex flex-wrap items-end gap-3 bg-primary-50/50 dark:bg-primary-900/10">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="0"
                  className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Reason</label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="e.g. Health camp supplies"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addExpenditure}
                  disabled={saving || !newReason.trim() || !newAmount || Number(newAmount) < 0}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
                >
                  Save
                </button>
                <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm">
                  Cancel
                </button>
              </div>
            </div>
          )}
          {expenditures.length === 0 && !adding ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">No expenditures yet. Add one to track spending.</div>
          ) : (
            expenditures.map((e) =>
              editingId === e.id ? (
                <div key={e.id} className="p-4 flex flex-wrap items-end gap-3 bg-gray-50 dark:bg-gray-700/30">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      min={0}
                      value={editAmount}
                      onChange={(ev) => setEditAmount(ev.target.value)}
                      className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs text-gray-500 mb-1">Reason</label>
                    <input
                      type="text"
                      value={editReason}
                      onChange={(ev) => setEditReason(ev.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Date</label>
                    <input
                      type="date"
                      value={editDate}
                      onChange={(ev) => setEditDate(ev.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveEdit} disabled={saving} className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm disabled:opacity-50">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div key={e.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{e.reason}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(e.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-900 dark:text-white">₹{Number(e.amount).toLocaleString("en-IN")}</p>
                    <button type="button" onClick={() => startEdit(e)} className="text-primary-600 hover:underline text-sm flex items-center gap-1">
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button type="button" onClick={() => removeExpenditure(e.id)} className="text-red-600 hover:underline text-sm flex items-center gap-1">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>

      {/* Monthly breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expenditure by month</h3>
        {monthKeys.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No data yet.</p>
        ) : (
          <div className="space-y-3">
            {monthKeys.map((key) => (
              <div key={key} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">{formatMonth(key)}</span>
                <span className="text-primary-600 dark:text-primary-400 font-semibold">₹{byMonth[key].total.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expenditure by week</h3>
        {weekKeys.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No data yet.</p>
        ) : (
          <div className="space-y-3">
            {weekKeys.slice(0, 12).map((key) => (
              <div key={key} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 text-sm">{formatWeek(key)}</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{byWeek[key].total.toLocaleString("en-IN")}</span>
              </div>
            ))}
            {weekKeys.length > 12 && <p className="text-gray-500 text-sm">Showing latest 12 weeks.</p>}
          </div>
        )}
      </div>
    </>
  );
}
