"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Star, Heart, Trophy, Award, Calendar, DollarSign, User } from "lucide-react";
import { fetchRecentDonors, fetchTopDonors, fetchTopContributors } from "../services/api";

const DonorShowcase = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [recentDonors, setRecentDonors] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [topContributors, setTopContributors] = useState([]);
  const [loading, setLoading] = useState({ recent: true, top: true, contributors: true });
  const [error, setError] = useState({ recent: null, top: null, contributors: null });

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch recent donors (INR only, public consent, limit 6)
      const recentResult = await fetchRecentDonors({
        limit: 6,
        currency: 'INR',
        publicOnly: true
      });
      setRecentDonors(recentResult.data || []);
      setLoading(prev => ({ ...prev, recent: false }));
    } catch (error) {
      console.error('Error fetching recent donors:', error);
      setError(prev => ({ ...prev, recent: error.message }));
      setLoading(prev => ({ ...prev, recent: false }));
    }

    try {
      // Fetch top donors (INR only, public consent, limit 5)
      const topResult = await fetchTopDonors({
        limit: 5,
        currency: 'INR',
        publicOnly: true
      });
      setTopDonors(topResult.data || []);
      setLoading(prev => ({ ...prev, top: false }));
    } catch (error) {
      console.error('Error fetching top donors:', error);
      setError(prev => ({ ...prev, top: error.message }));
      setLoading(prev => ({ ...prev, top: false }));
    }

    try {
      // Fetch top contributors (INR only, public consent, limit 5)
      const contributorsResult = await fetchTopContributors({
        limit: 5,
        currency: 'INR',
        publicOnly: true
      });
      setTopContributors(contributorsResult.data || []);
      setLoading(prev => ({ ...prev, contributors: false }));
    } catch (error) {
      console.error('Error fetching top contributors:', error);
      setError(prev => ({ ...prev, contributors: error.message }));
      setLoading(prev => ({ ...prev, contributors: false }));
    }
  };

  const formatAmount = (amount, currency = 'INR') => {
    return `${currency} ${parseFloat(amount).toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

  const renderLoadingState = () => (
    <div className="text-center py-8 px-4">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 text-sm sm:text-base">Loading amazing donors...</p>
    </div>
  );

  const renderErrorState = (errorMessage) => (
    <div className="text-center py-8 px-4">
      <p className="text-red-600 mb-4 text-sm sm:text-base">{errorMessage}</p>
      <button 
        onClick={fetchAllData}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
      >
        Try Again
      </button>
    </div>
  );

  const renderRecentDonors = () => {
    if (loading.recent) return renderLoadingState();
    if (error.recent) return renderErrorState(error.recent);
    if (!recentDonors.length) return <p className="text-center text-gray-600 py-8 px-4 text-sm sm:text-base">No recent donors to display</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-0">
        {recentDonors.map((donor, index) => (
          <motion.div
            key={donor._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-3 sm:p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center mb-3">
              <ProfileImage donor={donor} size="w-8 h-8 sm:w-10 sm:h-10" />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{donor.donorName}</h4>
                <p className="text-xs text-gray-500">{formatDate(donor.donationDate)}</p>
              </div>
            </div>

            <div className="text-center mb-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg py-2 px-2 sm:px-3">
                <p className="text-sm sm:text-lg font-bold">{formatAmount(donor.donationAmount, donor.donationCurrency)}</p>
                <p className="text-xs opacity-90">Recent Donation</p>
              </div>
            </div>

            {donor.campaign && (
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full truncate max-w-full">
                  {donor.campaign}
                </span>
              </div>
            )}

            {donor.message && (
              <div className="mb-3">
                <p className="text-gray-700 text-xs italic line-clamp-2">
                  "{donor.message.length > 60 ? donor.message.substring(0, 60) + '...' : donor.message}"
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <Heart className="w-4 h-4 text-pink-500" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderTopDonors = () => {
    if (loading.top) return renderLoadingState();
    if (error.top) return renderErrorState(error.top);
    if (!topDonors.length) return <p className="text-center text-gray-600 py-8 px-4 text-sm sm:text-base">No top donors to display</p>;

    return (
      <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
        {topDonors.map((donor, index) => (
          <motion.div
            key={donor._id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-lg p-3 sm:p-4 border border-yellow-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg mr-3 sm:mr-4 flex-shrink-0">
                  #{index + 1}
                </div>
                <ProfileImage donor={donor} size="w-8 h-8 sm:w-10 sm:h-10" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate">{donor.donorName}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{formatDate(donor.donationDate)}</p>
                  {donor.campaign && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1 truncate max-w-full">
                      {donor.campaign}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-lg sm:text-2xl font-bold text-yellow-600">
                  {formatAmount(donor.donationAmount, donor.donationCurrency)}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Top Donation</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderTopContributors = () => {
    if (loading.contributors) return renderLoadingState();
    if (error.contributors) return renderErrorState(error.contributors);
    if (!topContributors.length) return <p className="text-center text-gray-600 py-8 px-4 text-sm sm:text-base">No top contributors to display</p>;

    return (
      <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
        {topContributors.map((contributor, index) => (
          <motion.div
            key={contributor._id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-3 sm:p-4 border border-purple-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg mr-3 sm:mr-4 flex-shrink-0">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <ProfileImage donor={contributor} size="w-8 h-8 sm:w-10 sm:h-10" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate">{contributor.donorName}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                    <span className="text-xs sm:text-sm text-gray-600">
                      {contributor.totalDonations} donations
                    </span>
                    <span className="hidden sm:inline text-xs text-gray-500">•</span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      Avg: {formatAmount(contributor.averageAmount, contributor.currency)}
                    </span>
                  </div>
                  {contributor.campaigns && contributor.campaigns.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {contributor.campaigns.slice(0, 2).map((campaign, idx) => (
                        <span key={idx} className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full truncate max-w-full">
                          {campaign}
                        </span>
                      ))}
                      {contributor.campaigns.length > 2 && (
                        <span className="text-xs text-gray-500">+{contributor.campaigns.length - 2} more</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-lg sm:text-2xl font-bold text-purple-600">
                  {formatAmount(contributor.totalAmount, contributor.currency)}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Total Contribution</p>
                <p className="text-xs text-gray-500">
                  Since {formatDate(contributor.firstDonation)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const tabs = [
    { id: 'recent', label: 'Recent Donors', icon: Calendar, count: recentDonors.length },
    { id: 'top', label: 'Top Donations', icon: Award, count: topDonors.length },
    { id: 'contributors', label: 'Top Contributors', icon: Trophy, count: topContributors.length }
  ];

  return (
    <div className="mb-8 sm:mb-12">
      <div className="text-center mb-4 sm:mb-6 px-4 sm:px-0">
        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text mb-2">
          Our Amazing Donors Community
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">Discover the incredible people making a difference</p>
      </div>

      {/* Tab Navigation - Responsive */}
      <div className="flex justify-center mb-4 sm:mb-6 px-2 sm:px-0">
        <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap justify-center gap-1 sm:gap-0 w-full sm:w-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-medium hidden xs:inline">{tab.label}</span>
                <span className="font-medium xs:hidden">{tab.label.split(' ')[0]}</span>
                {tab.count > 0 && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px] sm:min-h-[400px]">
        {activeTab === 'recent' && renderRecentDonors()}
        {activeTab === 'top' && renderTopDonors()}
        {activeTab === 'contributors' && renderTopContributors()}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-6 sm:mt-8 px-4 sm:px-0">
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

export default DonorShowcase; 