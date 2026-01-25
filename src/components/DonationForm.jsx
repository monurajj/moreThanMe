"use client";
import { motion } from "framer-motion";
import { Heart, Upload, Camera, AlertCircle } from "lucide-react";

const DonationForm = ({ 
  showModal, 
  setShowModal, 
  formData, 
  setFormData, 
  handleInputChange, 
  handleImageUpload, 
  handleFormSubmit, 
  validationErrors, 
  getUploadStatus, 
  renderImagePreview, 
  paymentMethods, 
  isLoading 
}) => {
  if (!showModal) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 p-2"
        >
          <span className="text-2xl">×</span>
        </button>

        <h3 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          Submit Your Donation for Verification
        </h3>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm italic text-blue-700 text-center">
            "Your generosity creates ripples of hope that touch countless lives. Thank you for making a difference!"
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Required Fields Section */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Required Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 mb-2" htmlFor="donorName">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="donorName"
                  id="donorName"
                  value={formData.donorName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.donorName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {validationErrors.donorName && (
                  <p className="text-red-600 text-sm mt-1">{validationErrors.donorName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-800 mb-2" htmlFor="donorEmail">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="donorEmail"
                  id="donorEmail"
                  value={formData.donorEmail}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.donorEmail ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {validationErrors.donorEmail && (
                  <p className="text-red-600 text-sm mt-1">{validationErrors.donorEmail}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-800 mb-2" htmlFor="donationAmount">
                  Donation Amount (₹) *
                </label>
                <input
                  type="number"
                  name="donationAmount"
                  id="donationAmount"
                  value={formData.donationAmount}
                  onChange={handleInputChange}
                  min="1"
                  step="0.01"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.donationAmount ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {validationErrors.donationAmount && (
                  <p className="text-red-600 text-sm mt-1">{validationErrors.donationAmount}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-800 mb-2" htmlFor="paymentMethod">
                  Payment Method *
                </label>
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.paymentMethod ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
                {validationErrors.paymentMethod && (
                  <p className="text-red-600 text-sm mt-1">{validationErrors.paymentMethod}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-800 mb-2" htmlFor="paymentScreenshot">
                Payment Screenshot/Proof *
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors ${
                validationErrors.paymentScreenshot ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}>
                <input
                  type="file"
                  name="paymentScreenshot"
                  id="paymentScreenshot"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'paymentScreenshot')}
                  className="hidden"
                />
                <label htmlFor="paymentScreenshot" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">
                    {formData.paymentScreenshotFile ? 'Image uploaded ✓' : 'Click to upload payment screenshot'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG, GIF up to 5MB</p>
                  {getUploadStatus('paymentScreenshot') && (
                    <p className={`text-sm mt-2 ${getUploadStatus('paymentScreenshot').color}`}>
                      {getUploadStatus('paymentScreenshot').text}
                    </p>
                  )}
                </label>
              </div>
              {validationErrors.paymentScreenshot && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.paymentScreenshot}</p>
              )}
              {renderImagePreview(formData.paymentScreenshot, 'paymentScreenshot')}
            </div>
          </div>

          {/* Optional Fields Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-4">Additional Information (Optional)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-800 mb-2" htmlFor="donorPhone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="donorPhone"
                  id="donorPhone"
                  value={formData.donorPhone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-2" htmlFor="transactionId">
                  Transaction ID
                </label>
                <input
                  type="text"
                  name="transactionId"
                  id="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="donorProfileImage">
                Your Profile Picture (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  name="donorProfileImage"
                  id="donorProfileImage"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'donorProfileImage')}
                  className="hidden"
                />
                <label htmlFor="donorProfileImage" className="cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">
                    {formData.donorProfileImageFile ? 'Image uploaded ✓' : 'Click to upload your photo'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG, GIF up to 5MB</p>
                  {getUploadStatus('donorProfileImage') && (
                    <p className={`text-sm mt-2 ${getUploadStatus('donorProfileImage').color}`}>
                      {getUploadStatus('donorProfileImage').text}
                    </p>
                  )}
                </label>
              </div>
              {renderImagePreview(formData.donorProfileImage, 'donorProfileImage')}
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="message">
                Message (Optional)
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="3"
                maxLength="500"
                placeholder="Share why you're donating or any message you'd like to convey..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.message.length}/500 characters
              </p>
            </div>

            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                name="publicDataConsent"
                id="publicDataConsent"
                checked={formData.publicDataConsent}
                onChange={handleInputChange}
                className="mr-3 mt-1"
              />
              <label htmlFor="publicDataConsent" className="text-gray-800 text-sm">
                I consent to having my name, donation amount, and message displayed publicly on the foundation's website to inspire others to donate. 
                <span className="text-blue-600 font-medium"> This helps motivate more people to contribute!</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  Submit Donation
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-gray-800 py-3 px-8 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default DonationForm; 