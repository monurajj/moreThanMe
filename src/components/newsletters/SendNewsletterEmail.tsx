"use client";

import { useState, useEffect } from "react";
import { Mail, Send, Users, ChevronDown, ChevronUp } from "lucide-react";

interface Newsletter {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_path: string;
  created_at: string;
}

interface Volunteer {
  id: string;
  name: string | null;
  university_email: string;
  course?: string;
  batch?: string;
}

export default function SendNewsletterEmail() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [selectedNewsletterId, setSelectedNewsletterId] = useState<string>("");
  const [subject, setSubject] = useState("New Newsletter from More Than Me");
  const [description, setDescription] = useState("");
  const [newsletterUrl, setNewsletterUrl] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [showUserList, setShowUserList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/newsletters-list", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/admin/volunteers-list", { credentials: "include" }).then((r) => r.json()),
    ]).then(([newsData, volData]) => {
      setNewsletters(newsData.newsletters || []);
      setVolunteers(volData.volunteers || []);
      setLoadingData(false);
    }).catch(() => setLoadingData(false));
  }, []);

  useEffect(() => {
    if (selectedNewsletterId && newsletters.length) {
      const n = newsletters.find((x) => x.id === selectedNewsletterId);
      if (n) {
        setSubject(`New: ${n.title}`);
        setDescription(n.description || "");
        // Auto-fill link if file_path is a full URL (e.g. Cloudinary)
        if (n.file_path?.startsWith("http://") || n.file_path?.startsWith("https://")) {
          setNewsletterUrl(n.file_path);
        }
      }
    }
  }, [selectedNewsletterId, newsletters]);

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(new Set(volunteers.map((v) => v.university_email)));
    } else {
      setSelectedEmails(new Set());
    }
  };

  const toggleOne = (email: string) => {
    const next = new Set(selectedEmails);
    if (next.has(email)) next.delete(email);
    else next.add(email);
    setSelectedEmails(next);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmails.size === 0) {
      setMessage({ type: "error", text: "Select at least one recipient." });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          subject,
          newsletterId: selectedNewsletterId || undefined,
          newsletterTitle: newsletters.find((n) => n.id === selectedNewsletterId)?.title,
          newsletterDescription: description || undefined,
          newsletterUrl: newsletterUrl || undefined,
          recipients: Array.from(selectedEmails),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Failed to send" });
        return;
      }
      setMessage({ type: "success", text: `Email sent to ${data.sent || 0} recipients.` });
    } catch {
      setMessage({ type: "error", text: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <Mail className="w-5 h-5 text-primary-600" />
        Send newsletter notification
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Create your newsletter, select recipients from existing users, then send.
      </p>

      <form onSubmit={handleSend} className="space-y-6">
        {/* Step 1: Newsletter details */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">1. Newsletter</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select newsletter (optional)
            </label>
            <select
              value={selectedNewsletterId}
              onChange={(e) => setSelectedNewsletterId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">— Create new or type manually —</option>
              {newsletters.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.title} ({n.category})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Brief description for the email body"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link to newsletter (optional)</label>
            <input
              type="url"
              value={newsletterUrl}
              onChange={(e) => setNewsletterUrl(e.target.value)}
              placeholder="https://yoursite.com/newsletters"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Step 2: Select recipients */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4" />
            2. Select recipients
          </h4>
          {volunteers.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No volunteers with email found.</p>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => toggleAll(true)}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Select all
                </button>
                <button
                  type="button"
                  onClick={() => toggleAll(false)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Deselect all
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedEmails.size} of {volunteers.length} selected
                </span>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setShowUserList(!showUserList)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 text-left text-sm font-medium text-gray-900 dark:text-white"
                >
                  {showUserList ? "Hide list" : "Show recipients"}
                  {showUserList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showUserList && (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {volunteers.map((v) => (
                      <label
                        key={v.id}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedEmails.has(v.university_email)}
                          onChange={() => toggleOne(v.university_email)}
                          className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-900 dark:text-white truncate flex-1">
                          {v.name || "—"} · {v.university_email}
                        </span>
                        {(v.course || v.batch) && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                            {v.course} {v.batch}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {message && (
          <div
            className={`rounded-lg p-3 text-sm ${
              message.type === "success"
                ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || volunteers.length === 0 || selectedEmails.size === 0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {loading ? "Sending..." : `Send to ${selectedEmails.size} selected`}
        </button>
      </form>
    </div>
  );
}
