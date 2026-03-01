"use client";
import { useState, useEffect } from "react";
import PhotoGallery from "@/components/PhotoGallery";

type Photo = { src: string; alt: string; category: string; tags: string[]; description: string };

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("/api/assets")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPhotos(
            data.map((a: { url: string; alt?: string; title?: string; category?: string; description?: string; tags?: string[] }) => ({
              src: a.url,
              alt: a.alt || a.title || "Gallery",
              category: a.category || "General",
              tags: Array.isArray(a.tags) ? a.tags : [],
              description: a.description || "",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const categories = ["All", ...Array.from(new Set(photos.map((p) => p.category)))];
  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory = category === "All" ? true : photo.category === category;
    const matchesSearch = search
      ? photo.description.toLowerCase().includes(search.toLowerCase()) ||
        photo.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <select
          className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          className="border rounded px-4 py-2 text-base w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search by description or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {photos.length > 0 ? (
        <PhotoGallery photos={filteredPhotos} />
      ) : (
        <p className="text-center text-neutral-500 py-12">No gallery images yet. Add media in the admin panel.</p>
      )}
    </div>
  );
}