"use client";

import { useState, useEffect } from "react";
import { History } from "lucide-react";

interface SendRecord {
  id: string;
  newsletter_id: string | null;
  subject: string;
  recipient_count: number;
  sent_at: string;
  sent_by: string | null;
}

export default function NewsletterSendHistory() {
  const [sends, setSends] = useState<SendRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/newsletter-sends", { credentials: "include" })
      .then((r) => r.ok && r.json())
      .then((d) => setSends(d.sends || []))
      .catch(() => setSends([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <History className="w-5 h-5 text-primary-600" />
        Past newsletter sends
      </h3>
      {sends.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No sends yet. Send history will appear here after you send newsletters.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Subject</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Recipients</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sent by</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sends.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{s.subject}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{s.recipient_count}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{s.sent_by || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{formatDate(s.sent_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
