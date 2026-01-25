import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export function TeamCard({ name, role, bio, imageUrl }: TeamCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
      {imageUrl && (
        <Image src={imageUrl} alt={name} width={64} height={64} className="w-16 h-16 rounded-full mb-2 object-cover" />
      )}
      <div className="font-bold mb-1">{name}</div>
      <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">{role}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{bio}</div>
    </div>
  );
} 