"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Flag } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRepublicDay, setIsRepublicDay] = useState(false);

  // Check if today is Republic Day (January 26)
  useEffect(() => {
    const today = new Date();
    const month = today.getMonth(); // 0-11, January is 0
    const date = today.getDate();
    const isRD = month === 0 && date === 26;
    setIsRepublicDay(isRD);
    
    // Add class to body for padding adjustment
    if (isRD) {
      document.body.classList.add('republic-day-navbar');
    } else {
      document.body.classList.remove('republic-day-navbar');
    }
    
    return () => {
      document.body.classList.remove('republic-day-navbar');
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDonate = () => {
    router.push("/donate");
  };
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/our-family", label: "Our Family" },
    { href: "/team", label: "Our Team" },
    // { href: "/projects", label: "What We Do" },
    // { href: "/media", label: "Media" },
    { href: "/newsletters", label: "Newsletters" },
    { href: "/contact", label: "Contact" },
    { href: "/transparency", label: "Transparency" },
  ];
  return (
    <nav className={`fixed top-0 w-full transition-all duration-300 ease-out z-50 ${
      isRepublicDay
        ? 'bg-gradient-to-r from-[#FF9933] via-white to-[#138808] shadow-lg'
        : isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-100' 
          : 'bg-white/90 backdrop-blur-sm shadow-sm border-b border-white/20'
    }`}>
      {/* Republic Day Message - Above Nav Links */}
      {isRepublicDay && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full py-2 px-4 sm:px-8 border-b border-[#000080]/20"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex"
            >
              <Flag className="w-5 h-5 text-[#000080]" />
            </motion.div>
            <motion.h2
              className="text-sm sm:text-base md:text-lg font-extrabold text-[#000080] text-center"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🇮🇳 Happy Republic Day 2025 🇮🇳
            </motion.h2>
            <motion.p
              className="hidden md:block text-xs sm:text-sm text-[#000080] font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              जय हिन्द!
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Main Navbar Content */}
      <div className={`flex items-center justify-between px-4 sm:px-8 ${
        isRepublicDay ? 'py-3' : isScrolled ? 'py-3' : 'py-4'
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center cursor-pointer focus:outline-none focus-visible:outline-none" aria-label="Go to home page">
          <Image
            src="/morethanmelogo.png"
            alt="More Than Me Logo"
            width={150}
            height={40}
            className="h-10 w-auto mr-3"
            priority
          />
          <span className={`font-bold text-2xl transition-all duration-300 hidden lg:inline ${
            isRepublicDay 
              ? 'text-[#000080]' 
              : isScrolled 
                ? 'text-primary-800 scale-95' 
                : 'text-primary-800 scale-100'
          }`}>
            morethan<span className={`italic ml-1 ${isRepublicDay ? 'text-[#000080]' : 'text-primary-600'}`}>me</span>
          </span>
        </Link>
        {/* Hamburger for mobile and tablet */}
        <button
          className={`lg:hidden ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-600 ${
            isRepublicDay ? 'text-[#000080]' : 'text-neutral-700'
          }`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Centered Nav Links - Desktop */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex gap-8 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 px-1 focus:outline-none focus-visible:outline-none group"
              >
                <span className={`transition-colors duration-300 ${
                  isRepublicDay
                    ? pathname === link.href
                      ? "text-[#000080] font-bold"
                      : "text-[#000080]/80 group-hover:text-[#000080]"
                    : pathname === link.href 
                      ? "text-primary-600" 
                      : "text-neutral-700 group-hover:text-primary-600"
                }`}>
                  {link.label}
                </span>
                {/* Animated Underline */}
                <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out ${
                  isRepublicDay ? 'bg-[#000080]' : 'bg-primary-600'
                } ${
                  pathname === link.href 
                    ? "w-full" 
                    : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
          </div>
        </div>
        {/* Donate Button - Desktop */}
        <div className="hidden lg:block">
          <Button
            onClick={handleDonate}
            className={`${
              isRepublicDay
                ? 'bg-[#000080] hover:bg-[#000080]/90 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            } px-6 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus-visible:outline-none`}
          >
            Donate
          </Button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0" 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            zIndex: 9998
          }}
          onClick={() => setMenuOpen(false)} 
        />
      )}
      <div
        className={`fixed top-0 right-0 transform transition-transform duration-300 ease-in-out lg:hidden
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ 
          backgroundColor: isRepublicDay ? '#ffffff' : '#ffffff',
          background: isRepublicDay ? 'linear-gradient(to bottom, #FF9933, #FFFFFF, #138808)' : '#ffffff',
          opacity: '1',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          height: '100vh',
          width: '256px',
          zIndex: 9999,
          boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
          borderLeft: isRepublicDay ? '2px solid #000080' : '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          right: 0
        }}
      >
        <button
          className="self-end p-2 rounded text-neutral-700"
          style={{ 
            backgroundColor: '#ffffff',
            margin: '16px',
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>
        <nav style={{ 
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '0 32px',
          marginTop: '32px',
          fontSize: '18px',
          fontWeight: '500'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="relative rounded transition-all duration-300"
              style={{ 
                backgroundColor: pathname === link.href ? '#fef2f2' : '#ffffff',
                color: pathname === link.href ? '#A51C30' : '#3f3f46',
                padding: '8px 12px',
                textDecoration: 'none',
                border: 'none',
                borderRadius: '6px'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={() => {
              setMenuOpen(false);
              handleDonate();
            }}
            className="rounded-lg font-semibold transition-colors duration-200"
            style={{ 
              backgroundColor: '#A51C30',
              color: '#ffffff',
              padding: '12px 24px',
              marginTop: '16px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Donate
          </Button>
        </nav>
      </div>
    </nav>
  );
} 