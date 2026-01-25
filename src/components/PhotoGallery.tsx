import Image from "next/image";
import Link from "next/link";

interface Photo {
  src: string;
  alt: string;
  category: string;
  tags: string[];
  description: string;
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const isVideo = (src: string) => {
    return src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm');
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl shadow-lg group"
          >
            {isVideo(photo.src) ? (
              <video
                src={photo.src}
                className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <Image
                src={photo.src}
                alt={photo.alt}
                width={400}
                height={270}
                className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {photo.alt}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/gallery">
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-colors duration-200 text-lg">
            View Full Gallery
          </button>
        </Link>
      </div>
    </div>
  );
} 