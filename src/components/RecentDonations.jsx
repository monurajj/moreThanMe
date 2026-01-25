"use client";
import { motion } from "framer-motion";
import { Users, TrendingUp, Star, Heart } from "lucide-react";

const RecentDonations = ({ donations, donationsLoading, donationsError, fetchPublicDonations, formatAmount, formatDate }) => {
  // Component to render profile image or fallback
  const ProfileImage = ({ donor, size = "w-10 h-10" }) => {
    const hasProfileImage = donor.donorProfileImage && 
                           donor.donorProfileImage !== "https://temp-placeholder.com/profile.jpg" &&
                           donor.donorProfileImage !== "https://res.cloudinary.com/example/image/upload/profile.jpg";

    if (hasProfileImage) {
      return (
        <div className={`${size} rounded-full overflow-hidden mr-3 border-2 border-gray-200 flex-shrink-0`}>
          <img
            src={donor.donorProfileImage}
            alt={`${donor.donorName}'s profile`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, hide it and show fallback
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback that shows when image fails to load */}
          <div 
            className={`${size} bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 flex-shrink-0`}
            style={{ display: 'none' }}
          >
            {donor.donorName.charAt(0).toUpperCase()}
          </div>
        </div>
      );
    }

    // Fallback to first letter
    return (
      <div className={`${size} bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 flex-shrink-0`}>
        {donor.donorName.charAt(0).toUpperCase()}
      </div>
    );
  };

  if (donationsLoading) {
    return (
      <div className="text-center mb-8 sm:mb-12 px-4">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm sm:text-base">Loading recent donations...</p>
      </div>
    );
  }

  if (donationsError) {
    return (
      <div className="text-center mb-8 sm:mb-12 px-4">
        <p className="text-red-600 mb-4 text-sm sm:text-base">{donationsError}</p>
        <button 
          onClick={fetchPublicDonations}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!donations || donations.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 sm:mb-12">
      <div className="text-center mb-4 sm:mb-6 px-4 sm:px-0">
        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text mb-2">
          Recent Generous Donations
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">Be inspired by these amazing donors!</p>
      </div>

      {/* Statistics Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-200 mx-2 sm:mx-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-lg sm:text-2xl font-bold text-blue-600">{donations.length}</p>
            <p className="text-xs sm:text-sm text-gray-600">Recent Donors</p>
          </div>
          <div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-green-600" />
            <p className="text-lg sm:text-2xl font-bold text-green-600">
              {formatAmount(
                donations.reduce((sum, donation) => sum + parseFloat(donation.donationAmount), 0),
                donations[0]?.donationCurrency || 'INR'
              )}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Total Raised</p>
          </div>
          <div>
            <Star className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-lg sm:text-2xl font-bold text-yellow-600">
              {formatAmount(
                donations.reduce((sum, donation) => sum + parseFloat(donation.donationAmount), 0) / donations.length,
                donations[0]?.donationCurrency || 'INR'
              )}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Average Donation</p>
          </div>
        </div>
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 px-2 sm:px-0">
        {donations.slice(0, 6).map((donation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-3 sm:p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {/* Donor Profile Section */}
            <div className="flex items-center mb-3">
              <ProfileImage donor={donation} size="w-8 h-8 sm:w-10 sm:h-10" />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{donation.donorName}</h4>
                <p className="text-xs text-gray-500">{formatDate(donation.donationDate)}</p>
              </div>
            </div>

            {/* Donation Amount */}
            <div className="text-center mb-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg py-2 px-2 sm:px-3">
                <p className="text-sm sm:text-lg font-bold">{formatAmount(donation.donationAmount, donation.donationCurrency)}</p>
                <p className="text-xs opacity-90">Generous Donation</p>
              </div>
            </div>

            {/* Campaign */}
            {donation.campaign && (
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full truncate max-w-full">
                  {donation.campaign}
                </span>
              </div>
            )}

            {/* Message */}
            {donation.message && (
              <div className="mb-3">
                <p className="text-gray-700 text-xs italic line-clamp-2">
                  "{donation.message.length > 60 ? donation.message.substring(0, 60) + '...' : donation.message}"
                </p>
              </div>
            )}

            {/* Decorative Elements */}
            <div className="flex justify-center">
              <Heart className="w-4 h-4 text-pink-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center px-4 sm:px-0">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 sm:p-4 border border-pink-200">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-pink-600" />
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
            Inspired by these generous donors? Join them in making a difference!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentDonations; 