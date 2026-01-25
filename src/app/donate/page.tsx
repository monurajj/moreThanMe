"use client";

import { motion } from "framer-motion";
import { Heart, Users, Gift } from "lucide-react";
import DonationForm from "../../components/DonationForm";
import DonationStats from "../../components/DonationStats";
import HeartProgress from "../../components/HeartProgress";

export default function DonatePage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-12 sm:translate-x-24 lg:translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-12 sm:-translate-x-20 lg:-translate-x-32"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
              <Gift className="w-10 h-10 text-white" />
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight"
            >
              Make a Difference Today
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Your contribution, no matter the size, has the power to transform lives and create lasting positive change in our community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Fundraising Goal Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-20"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Subtle decorative background elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50 rounded-full -translate-y-20 translate-x-8 sm:translate-x-12 lg:translate-x-20 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-50 rounded-full translate-y-16 -translate-x-8 sm:-translate-x-12 lg:-translate-x-16 opacity-40"></div>
            
            <div className="text-center relative z-10">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                Our Mission Goal
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-primary-800 leading-tight">
                Our Fundraising Goal
              </h2>
              
              <p className="text-lg sm:text-xl text-neutral-600 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
                Help us reach our target of ₹75,000 to make a meaningful impact in our community. Every contribution brings us closer to our mission.
              </p>
              
              {/* Heart Progress */}
              <div className="flex justify-center">
                <div className="max-w-3xl w-full">
                  <HeartProgress />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Donation Form Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 lg:mb-20"
        >
          <DonationForm />
        </motion.section>

        {/* Impact Statistics Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16 lg:mb-20"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8 sm:p-12 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-28 h-28 bg-primary-50 rounded-full -translate-y-14 -translate-x-8 sm:-translate-x-12 lg:-translate-x-14 opacity-40"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-50 rounded-full translate-y-16 translate-x-8 sm:translate-x-12 lg:translate-x-16 opacity-30"></div>
            
            <div className="text-center relative z-10">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                Our Impact
              </span>
              
              <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-primary-800">
                Making a Real Difference
              </h3>
              
              <p className="text-lg sm:text-xl text-neutral-600 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
                See how your contributions are transforming lives and creating lasting positive change in our community.
              </p>
              
              <DonationStats />
            </div>
          </div>
        </motion.section>

        {/* Inspirational Quote Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="bg-gradient-to-r from-primary-700 to-primary-600 p-8 sm:p-12 rounded-2xl shadow-lg text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 -translate-x-6 sm:-translate-x-8 lg:-translate-x-10"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 translate-x-4 sm:translate-x-6 lg:translate-x-8"></div>
            
            <blockquote className="text-white relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              
              <p className="text-xl sm:text-2xl lg:text-3xl font-light italic mb-6 leading-relaxed">
                &ldquo;The greatest gift is not found in a store or under a tree, but in the hearts of true friends.&rdquo;
              </p>
              
              <footer className="text-base sm:text-lg text-white/90 font-medium">
                — Cindy Lew
              </footer>
            </blockquote>
          </div>
        </motion.section>

        {/* Meet Our Family Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16 lg:mb-20"
        >
          <div className="bg-gradient-to-r from-primary-800 to-primary-700 p-8 sm:p-12 rounded-2xl shadow-lg text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-6 sm:translate-x-8 lg:translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-6 sm:-translate-x-8 lg:-translate-x-10"></div>
            
            <div className="text-white relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                <Users className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Meet Our Amazing Family
              </h3>
              
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join our community of compassionate donors who are making a real difference. 
                See the faces and stories behind our mission.
              </p>
              
              <a 
                href="/our-family"
                className="inline-flex items-center justify-center bg-white text-primary-700 font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-primary-50"
              >
                <Users className="w-5 h-5 mr-2" />
                Meet Our Family
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
} 