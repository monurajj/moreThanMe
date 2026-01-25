"use client";
import Image from "next/image";

interface VolunteerStoryCardProps {
  name: string;
  story: string;
  imageUrl?: string;
}

export function VolunteerStoryCard({ name, story, imageUrl }: VolunteerStoryCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
      {imageUrl && (
        <Image src={imageUrl} alt={name} width={64} height={64} className="w-16 h-16 rounded-full mb-2 object-cover" />
      )}
      <div className="font-bold mb-1">{name}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{story}</div>
    </div>
  );
} 