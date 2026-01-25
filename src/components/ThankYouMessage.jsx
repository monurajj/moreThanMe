"use client";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star, TrendingUp } from "lucide-react";

const ThankYouMessage = ({ thankYouMessage, setThankYouMessage }) => {
  if (!thankYouMessage) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-2xl w-10/12 max-w-sm border-2 border-green-200 shadow-2xl"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {/* Celebration Animation */}
        <div className="text-center mb-3">
          <div className="relative">
            <Heart className="w-10 h-10 mx-auto mb-2 text-pink-500 animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-3 h-3 text-yellow-500 animate-bounce" />
            </div>
            <div className="absolute -top-1 -left-1">
              <Star className="w-3 h-3 text-blue-500 animate-spin" />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
          🎉 Thank You So Much! 🎉
        </h3>
        <p className="text-xs text-center text-gray-600 mb-3">
          धन्यवाद! Your generous heart makes us proud!
        </p>
        
        <div className="text-center mb-3">
          <p className="text-xs text-gray-700 mb-2 leading-relaxed">
            Your donation has been submitted successfully! You've taken a beautiful step towards making the world better.
          </p>
          
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-2 mb-3 border border-pink-200">
            <p className="text-xs italic text-pink-700 font-medium">
              "The best gifts are not found in stores, but in hearts like yours."
            </p>
            <p className="text-xs text-pink-600 mt-1">— Your kindness will return to you</p>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-white rounded-lg p-2 mb-3 shadow-lg border border-green-200">
          <h4 className="font-semibold text-green-700 mb-1 flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3" />
            Your Impact Journey Begins
          </h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <span>Confirmation within 24-48 hours</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              <span>Email updates coming your way</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <span>See the impact of your contribution</span>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-2 mb-3 border border-blue-200">
          <p className="text-xs italic text-blue-700 text-center font-medium">
            "You didn't just donate money, you brought a smile to someone's face."
          </p>
        </div>

        {/* Social Sharing Encouragement */}
        <div className="text-center text-xs text-gray-600 mb-3">
          <p className="mb-1">💝 Share your kindness and inspire others!</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setThankYouMessage(false)}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center gap-1 shadow-lg text-xs"
          >
            <Heart className="w-3 h-3" />
            Continue Spreading Love
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThankYouMessage;