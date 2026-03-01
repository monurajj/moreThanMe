"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, User } from "lucide-react";

interface Volunteer {
  id: string;
  name: string;
  university_email: string;
  enrollment: string;
  batch: string;
  course: string;
  phone: string | null;
  message: string | null;
  created_at: string;
}

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch("/api/admin/volunteers-list", { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setVolunteers(data.volunteers || []);
      } catch (e) {
        console.error(e);
        setError("Failed to load volunteers.");
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-300">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Volunteers
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          All volunteers from Join Us. Same Supabase DB. Total: {volunteers.length}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Course / Batch
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {volunteers.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {v.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${v.university_email}`}
                      className="inline-flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {v.university_email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {v.course} · {v.batch}
                    {v.enrollment && ` · ${v.enrollment}`}
                  </td>
                  <td className="px-4 py-3">
                    {v.phone ? (
                      <a
                        href={`tel:${v.phone}`}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
                      >
                        <Phone className="w-4 h-4" />
                        {v.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(v.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {volunteers.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No volunteers yet.
          </div>
        )}
      </div>
    </>
  );
}
