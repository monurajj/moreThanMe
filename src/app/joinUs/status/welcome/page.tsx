"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type ConfettiParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
};

export default function WelcomeStatusPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  const welcomeMessages = [
    "You&apos;re now part of something bigger! 🌟",
    "Together, we create positive change 🚀",
    "Your journey with us begins now! 💫"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Generate confetti particles
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setConfetti(newConfetti);

    // Rotate welcome messages
    const interval = setInterval(() => {
      // setCurrentMessage((prev) => (prev + 1) % welcomeMessages.length); // This line is removed
    }, 3000);

    return () => clearInterval(interval);
  }, [welcomeMessages.length]);

  return (
    <main className="relative min-h-screen bg-gradient-to-br  verflow-hidden">
      {/* Soft geometric background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <svg width="60" height="60" viewBox="0 0 60 60" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#10b981" opacity="0.3"/>
                <circle cx="0" cy="0" r="1" fill="#059669" opacity="0.2"/>
                <circle cx="60" cy="60" r="1" fill="#059669" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        {confetti.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.4
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 p-8 max-w-5xl mx-auto min-h-screen flex flex-col justify-center items-center">
        <div 
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* University branding section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center bg-white rounded-lg px-4 py-2 shadow-md">
              <div className="text-xl mr-2">🎓</div>
              <div className="text-base font-semibold text-gray-800">
                Rishihood University
              </div>
            </div>
          </div>

          {/* Celebration icon */}
          <div className="text-center mb-6">
            <div className="text-6xl">🎉</div>
          </div>

          {/* Main welcome card */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg max-w-xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to Our Family!
              </h1>
              
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg px-6 py-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">💚</div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-green-800">
                      You&apos; re Now Part of Something Special
                    </h3>
                    <p className="text-green-700 text-sm">
                      Thank you for joining our student-led mission to create positive change.
                    </p>
                  </div>
                </div>  
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>🏠</span>
              Go to Home
            </button>
          </div>

          {/* Simple footer */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Student-led initiative by Rishihood University
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </main>
  );
}