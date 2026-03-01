"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "@/components/CloudinaryUpload";

interface WorkItem {
  id: string;
  title: string;
  date: string;
  image_url: string;
  location?: string | null;
  description: string;
  sort_order?: number;
}

export default function AdminWorksPage() {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const fetchWorks = async () => {
    const res = await fetch("/api/admin/works", { credentials: "include" });
    const data = await res.json().catch(() => []);
    setWorks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchWorks();
      setLoading(false);
    })();
  }, []);

  const startEdit = (w: WorkItem) => {
    setEditingId(w.id);
    setEditTitle(w.title);
    setEditDate(w.date || "");
    setEditImageUrl(w.image_url || "");
    setEditLocation(w.location || "");
    setEditDescription(w.description || "");
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/works?id=${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: editTitle,
          date: editDate || undefined,
          image_url: editImageUrl || undefined,
          location: editLocation || null,
          description: editDescription,
        }),
      });
      if (res.ok) {
        await fetchWorks();
        setEditingId(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const removeWork = async (id: string) => {
    if (!confirm("Delete this work/event? It will be removed from the public Our Works page.")) return;
    const res = await fetch(`/api/admin/works?id=${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) await fetchWorks();
    if (editingId === id) setEditingId(null);
  };

  const addWork = async () => {
    if (!newTitle.trim() || !newDate) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: newTitle.trim(),
          date: newDate,
          image_url: newImageUrl || "",
          location: newLocation.trim() || null,
          description: newDescription.trim(),
          sort_order: works.length,
        }),
      });
      if (res.ok) {
        await fetchWorks();
        setAdding(false);
        setNewTitle("");
        setNewDate("");
        setNewImageUrl("");
        setNewLocation("");
        setNewDescription("");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm mb-4">
          ← Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Our Works & Events</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Manage works and events shown on the public <a href="/works" className="text-primary-600 dark:text-primary-400 underline" target="_blank" rel="noopener noreferrer">/works</a> page. Data is stored in Firestore collection <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">works</code>.
        </p>
      </div>

      {loading ? (
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-6">
          {works.map((work) => (
            <div
              key={work.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {editingId === work.id ? (
                <div className="p-4 space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Title"
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <CloudinaryUpload
                      onUpload={(url) => setEditImageUrl(url)}
                      folder="morethanme/works"
                      accept="image/*"
                      maxSizeMB={5}
                    />
                    {editImageUrl && (
                      <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <ImageIcon className="w-4 h-4" /> Image set
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="Location (optional)"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Full description"
                    rows={5}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-y"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} disabled={saving} className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4">
                    <div className="w-full sm:w-40 h-28 rounded-lg bg-gray-100 dark:bg-gray-700 shrink-0 overflow-hidden">
                      {work.image_url ? (
                        <img src={work.image_url} alt={work.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white">{work.title}</div>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {work.date}
                        </span>
                        {work.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {work.location}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{work.description}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => startEdit(work)} className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
                        Edit
                      </button>
                      <button onClick={() => removeWork(work.id)} className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline">
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {adding ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-4 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Title *"
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="Date *"
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <CloudinaryUpload
                  onUpload={(url) => setNewImageUrl(url)}
                  folder="morethanme/works"
                  accept="image/*"
                  maxSizeMB={5}
                />
                {newImageUrl && <span className="text-xs text-green-600 dark:text-green-400">Image set</span>}
              </div>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Location (optional)"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Full description"
                rows={5}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-y"
              />
              <div className="flex gap-2">
                <button
                  onClick={addWork}
                  disabled={saving || !newTitle.trim() || !newDate}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
                >
                  Add work / event
                </button>
                <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="w-full mt-6 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
            >
              + Add work or event
            </button>
          )}
        </div>
      )}
    </>
  );
}
