"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp } from "lucide-react";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

export default function TransparencyPage() {
  const router = useRouter();

  return (
    <main>
      {/* Hero Section */}
      <section className="w-full bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-8 shadow-sm">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-primary-800 mb-8 leading-tight"
            >
              Transparency & Impact
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              We believe in complete transparency. Here&apos;s our journey and commitment to creating meaningful change through student-led initiatives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => router.push("/joinUs")}
                className="bg-transparent hover:bg-primary-50 text-primary-600 border-2 border-primary-600 font-semibold py-3 px-8 rounded-lg text-lg">
                Join Our Mission
              </Button>
              <Button 
                onClick={() => router.push("/donate")} 
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg text-lg">
                Support Our Foundation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact in the Making Section */}
      <section className="w-full bg-neutral-50 py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-8">
              Building Our Foundation
            </span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-primary-800 mb-8 leading-tight"
            >
              Impact in the Making
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm p-12 border border-primary-100 max-w-4xl mx-auto"
            >
              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  We believe that transparency isn&apos;t just about showing what we&apos;ve done—it&apos;s about being honest about where we are and where we&apos;re going. 
                  Right now, we&apos;re in the exciting phase of building our foundation and preparing to make our first meaningful impact.
                </p>
                <p>
                  Our team of dedicated students from Rishihood University is working tirelessly to identify the most pressing needs in our community 
                  and develop sustainable solutions that will create lasting positive change.
                </p>
                
                <div className="bg-primary-50 p-8 rounded-xl border border-primary-200 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <TrendingUp className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-primary-800 text-xl mb-3">Our Commitment to You</h3>
                      <p className="text-primary-700 font-medium leading-relaxed">
                        Soon, this page will be filled with stories of lives changed, communities transformed, and hope restored. 
                        We can&apos;t wait to share our impact journey with you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mt-8"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Chinese Proverb Quote Section */}
      <section className="w-full bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 py-32 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left: Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20">
                  The Right Time is Now
                </span>
                
                <blockquote className="relative">
                  <div className="absolute -top-4 -left-4 text-6xl text-white/20 font-serif leading-none">&ldquo;</div>
                  <p className="text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-8 leading-tight relative pl-8">
                    The best time to plant a tree was{" "}
                    <span className="font-medium text-orange-200">20 years ago</span>. 
                    The second best time is{" "}
                    <span className="font-medium text-orange-200">now</span>.
                  </p>
                  <div className="absolute -bottom-4 -right-4 text-6xl text-white/20 font-serif leading-none rotate-180">&rdquo;</div>
                </blockquote>
                
                <motion.footer
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-4 pl-8"
                >
                  <div className="w-12 h-0.5 bg-orange-300"></div>
                  <span className="text-xl text-orange-100 font-medium">Chinese Proverb</span>
                </motion.footer>
              </motion.div>
            </div>
            
            {/* Right: Visual Element */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/30 flex items-center justify-center relative overflow-hidden">
                  {/* Inner glow */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-300/30 to-transparent"></div>
                  
                  {/* Center icon/symbol */}
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="text-white/80 text-sm font-medium">Plant</div>
                    <div className="text-orange-200 text-xs">Today</div>
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute top-8 right-8 w-2 h-2 bg-orange-300/60 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-16 left-12 w-1 h-1 bg-orange-200/80 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-8">
              Be Part of Something Bigger
            </span>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6 leading-tight"
            >
              Join Us in Creating Impact
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Be part of our journey from the beginning. Your support today will help us build the foundation for tomorrow&apos;s impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                onClick={() => router.push("/donate")} 
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg text-lg">
                Make a Donation
              </Button>
              <Button
                onClick={() => router.push("/joinUs")}
                className="bg-transparent hover:bg-primary-50 text-primary-600 border-2 border-primary-600 font-semibold py-3 px-8 rounded-lg text-lg">
                Join Our Team
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 