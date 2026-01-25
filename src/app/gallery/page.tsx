"use client";
import { useState } from "react";
import PhotoGallery from "@/components/PhotoGallery";

// Enhanced photo metadata for filtering/search
const photos = [
  {
    src: "/bookdonation.jpg",
    alt: "Book Donation to Read India Library",
    category: "Education",
    tags: ["book donation", "library", "education", "books"],
    description: "Book donation to Read India Library."
  },
  {
    src: "/galleryImage01.jpeg",
    alt: "Read India Library",
    category: "Education",
    tags: ["library", "children", "books"],
    description: "Children reading in the Read India Library."
  },
  {
    src: "/galleryImage02.jpeg",
    alt: "Health Camp",
    category: "Health",
    tags: ["health", "camp", "community"],
    description: "Community health camp organized for villagers."
  },
  {
    src: "/galleryImage03.jpeg",
    alt: "Women Empowerment",
    category: "Empowerment",
    tags: ["women", "empowerment", "training"],
    description: "Skill training session for women empowerment."
  },
  {
    src: "/galleryImage04.jpeg",
    alt: "School Event",
    category: "Education",
    tags: ["school", "event", "children"],
    description: "Annual event at the local school."
  },
  {
    src: "/diwali1.mp4",
    alt: "Diwali Celebration 1",
    category: "Celebration",
    tags: ["diwali celebration", "festival", "community"],
    description: "Celebrating Diwali with the community."
  },
  {
    src: "/diwali2.mp4",
    alt: "Diwali Celebration 2",
    category: "Celebration",
    tags: ["diwali celebration", "festival", "community"],
    description: "Diwali festivities and joy."
  },
  {
    src: "/diwali3.jpg",
    alt: "Diwali Celebration 3",
    category: "Celebration",
    tags: ["diwali celebration", "festival", "lights"],
    description: "Diwali celebrations with lights and decorations."
  },
  {
    src: "/diwali4.mp4",
    alt: "Diwali Celebration 4",
    category: "Celebration",
    tags: ["diwali celebration", "festival", "celebration"],
    description: "Community Diwali celebration."
  },
  {
    src: "/diwali5.mp4",
    alt: "Diwali Celebration 5",
    category: "Celebration",
    tags: ["diwali celebration", "festival", "community"],
    description: "Sharing Diwali joy with everyone."
  },
  {
    src: "/diwali6.mp4",
    alt: "Diwali Celebration 6",
    category: "Celebration",
    tags: ["diwali celebration", "festival", "happiness"],
    description: "Diwali moments and memories."
  },
];

const categories = ["All", ...Array.from(new Set(photos.map(p => p.category)))];

export default function GalleryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = category === "All" ? true : photo.category === category;
    const matchesSearch = search
      ? photo.description.toLowerCase().includes(search.toLowerCase()) ||
        photo.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        {/* Category Filter */}
        <select
          className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* Search Bar */}
        <input
          type="text"
          className="border rounded px-4 py-2 text-base w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search by description or tags..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <PhotoGallery photos={filteredPhotos} />
    </div>
  );
}