"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type HeartBeat = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

export default function AlreadyStatusPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [heartBeats, setHeartBeats] = useState<HeartBeat[]>([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Generate subtle floating elements representing community impact
    const newHeartBeats = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3
    }));
    setHeartBeats(newHeartBeats);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34,197,94,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating community elements */}
      <div className="absolute inset-0 overflow-hidden">
        {heartBeats.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-emerald-200 opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              animation: `gentle-float ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 p-8 max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center">
        <div 
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Community icon with gentle animation */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="text-7xl mb-4 animate-pulse">
                🤝
              </div>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                💚
              </div>
            </div>
          </div>

          {/* Main message card */}
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-2xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                Welcome Back to Our
                <span className="block text-emerald-600 mt-2">
                  Community Family
                </span>
              </h1>
              
              <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-lg px-6 py-5 mb-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                      You&apos;re Already Making a Difference
                    </h3>
                    <p className="text-emerald-700 leading-relaxed">
                      Thank you for being a valued member of our mission to create positive change. 
                      Your continued support helps us build stronger communities together.
                    </p>
                  </div>
                </div>
              </div>

              {/* Impact stats or community message */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="text-sm font-medium text-blue-800">Global Impact</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="text-sm font-medium text-purple-800">Community Driven</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">💝</div>
                  <div className="text-sm font-medium text-orange-800">Hearts United</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={() => router.push("/")}
              className="group px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>🏠</span>
              Return to Home
            </button>
            
            <button
              onClick={() => router.push("/projects")}
              className="group px-8 py-3 bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 rounded-lg font-semibold text-lg hover:shadow-md transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>📊</span>
              View Our Impact
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm mb-4">
              Together, we&apos;re building a better tomorrow
            </p>
            <div className="flex justify-center items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-1">
                <span className="text-lg">🔒</span>
                <span className="text-xs">Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-lg">🌱</span>
                <span className="text-xs">Sustainable</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-lg">🤲</span>
                <span className="text-xs">Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentle-float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-15px) rotate(180deg); 
            opacity: 0.4;
          }
        }
      `}</style>
    </main>
  );
}