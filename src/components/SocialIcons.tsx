import { Twitter, Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";

const socials = [
  { 
    href: "https://wa.me/919876543210", 
    label: "WhatsApp", 
    icon: MessageCircle,
    hoverColor: "hover:bg-green-500 hover:text-white"
  },
  { 
    href: "https://twitter.com/", 
    label: "Twitter", 
    icon: Twitter,
    hoverColor: "hover:bg-blue-400 hover:text-white"
  },
  { 
    href: "https://www.instagram.com/morethanme_ngo?igsh=a21paDNyZWlweGs1", 
    label: "Instagram", 
    icon: Instagram,
    hoverColor: "hover:bg-pink-500 hover:text-white"
  },
  { 
    href: "https://facebook.com/", 
    label: "Facebook", 
    icon: Facebook,
    hoverColor: "hover:bg-blue-600 hover:text-white"
  },
  { 
    href: "https://linkedin.com/", 
    label: "LinkedIn", 
    icon: Linkedin,
    hoverColor: "hover:bg-blue-700 hover:text-white"
  },
];

export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="flex flex-wrap gap-6 sm:gap-8 justify-center w-full">
        {socials.map(({ href, label, icon: Icon, hoverColor }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`group rounded-full bg-white shadow-lg p-4 sm:p-5 flex items-center justify-center transition-all duration-300 hover:scale-110 text-neutral-600 text-2xl sm:text-3xl border border-neutral-200 ${hoverColor}`}
          >
            <Icon size={36} className="transition-colors group-hover:text-white" />
          </a>
        ))}
      </div>
    </div>
  );
} 