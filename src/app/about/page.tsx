"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col bg-neutral-800">
        {/* Hero Content Wrapper */}
        <div className="flex-1 flex items-center">
          {/* Background Image */}
          <Image
            src="/aboutusImage.png"
            alt="About Us - Children and families"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="absolute inset-0 w-full h-full z-0 opacity-90"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 flex flex-col justify-center px-4 sm:px-8 md:px-24 py-12 sm:py-16 w-full max-w-3xl sm:max-w-4xl mt-24 text-center md:text-left items-center md:items-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-600/90 text-white text-sm font-medium mb-6">
                About Our Initiative
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight"
            >
              Discover Our Story.
              <span className="block text-primary-100">Meet Our Mission.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-neutral-200 mb-8 max-w-2xl leading-relaxed"
            >
              Empowering change, one act of kindness at a time. Meet the passionate students and discover the mission behind our movement.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <Button
                onClick={() => router.push("/joinUs")}
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-semibold py-3 px-8 rounded-lg shadow-sm text-lg w-full sm:w-auto">
                Join Our Mission
              </Button>
              <Button 
                onClick={() => router.push("/donate")} 
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg shadow-sm text-lg w-full sm:w-auto">
                Support Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Our Story Section */}
      <section className="w-full bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            {/* Left: Content */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
                  Our Journey
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6 leading-tight">
                  Our Story
                </h2>
                <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
                  Founded by passionate students, our NGO began as a small initiative to help local communities. 
                  Today, we unite students, partners, and volunteers to create a ripple effect of positive change 
                  across India.
                </p>
                <p className="text-lg text-neutral-500 leading-relaxed">
                  Every project, every act of kindness, and every smile shared is a step toward a 
                  brighter future for all.
                </p>
              </motion.div>
            </div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 max-w-lg"
            >
              <div className="relative">
                <Image
                  src="/whatwedoImage.png"
                  alt="Our Story"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg object-cover w-full h-auto"
                />
                <div className="absolute -inset-2 bg-primary-100/50 rounded-2xl -z-10"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How We Started Section */}
      <section className="w-full bg-primary-50 py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white text-primary-700 text-sm font-medium mb-8 shadow-sm">
              Our Beginning
            </span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-primary-800 mb-8 leading-tight"
            >
              How We Started
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-neutral-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              From a simple idea during internships to a student-powered movement of change across India.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-sm p-10 max-w-4xl mx-auto border border-primary-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="space-y-6">
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    The idea for our NGO came to us quite unexpectedly—while we were just chilling out during our internships. 
                    In those moments of reflection, we realized that even a small act of kindness could make a big difference 
                    in someone&apos;s life.
                  </p>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    It wasn&apos;t about the amount we could give, but about the satisfaction and joy of helping those in need.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Inspired by this thought, we began discussing our vision with our teachers and mentors. Their encouragement, 
                    especially from Paroksh sir, gave us the confidence to take the first step.
                  </p>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    With their support, what started as a simple idea among friends quickly grew into a movement dedicated 
                    to spreading hope and compassion.
                  </p>
                </div>
              </div>
              
              <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mt-8"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 