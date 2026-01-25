"use client";

import { motion } from "framer-motion";
import Button from "../components/Button";
import { Users, HeartHandshake, GraduationCap } from "lucide-react";
import PhotoGallery from "../components/PhotoGallery";
import { useRouter } from "next/navigation";
import Image from "next/image";



const photos = [
  { src: "/bookdonation.jpg", alt: "bookdonation to read india libbrary", category: "Education", tags: ["book donation", "library", "education"], description: "Book donation to Read India Library." },
  { src: "/diwali1.mp4", alt: "Diwali Celebration 1", category: "Celebration", tags: ["diwali celebration"], description: "Celebrating Diwali with the community." },
  { src: "/diwali2.mp4", alt: "Diwali Celebration 2", category: "Celebration", tags: ["diwali celebration"], description: "Diwali festivities and joy." },
  { src: "/diwali3.jpg", alt: "Diwali Celebration 3", category: "Celebration", tags: ["diwali celebration"], description: "Diwali celebrations with lights and decorations." },
  { src: "/diwali4.mp4", alt: "Diwali Celebration 4", category: "Celebration", tags: ["diwali celebration"], description: "Community Diwali celebration." },
  { src: "/diwali5.mp4", alt: "Diwali Celebration 5", category: "Celebration", tags: ["diwali celebration"], description: "Sharing Diwali joy with everyone." },
  { src: "/diwali6.mp4", alt: "Diwali Celebration 6", category: "Celebration", tags: ["diwali celebration"], description: "Diwali moments and memories." },
  { src: "/galleryImage01.jpeg", alt: "Read India Library", category: "Education", tags: [], description: "" },
  { src: "/galleryImage02.jpeg", alt: "Health Camp", category: "Health", tags: [], description: "" },
];

export default function Home() {
  const router = useRouter();
  const handleJoin = () => {
    router.push("/joinUs");
  }
  const handleDonate = () => {
    router.push("/donate");
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col bg-neutral-800 -mt-20">
        {/* Hero Content Wrapper */}
        <div className="flex-1 flex items-center">
          {/* Background Image */}
          <Image
            src="https://res.cloudinary.com/dpuhlmcth/image/upload/v1753466891/DSC1803-scaled_enhcsi.jpg"
            alt="Children smiling"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="absolute inset-0 w-full h-full z-0 opacity-90"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 flex flex-col justify-center px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 w-full max-w-3xl sm:max-w-4xl mt-20 sm:mt-24 text-center md:text-left items-center md:items-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-600/90 text-white text-sm font-medium mb-6">
                Student-Led Initiative
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight"
            >
              Students for Society.
              <span className="block text-primary-100">Hearts for India.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-neutral-200 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
            >
              A student-driven movement from Rishihood University, giving back to India—one act of kindness at a time.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Button
              onClick={handleJoin}
               className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-semibold py-3 px-8 rounded-lg shadow-sm text-lg w-full sm:w-auto">
                Join Us
              </Button>
              <Button onClick={handleDonate} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg shadow-sm text-lg w-full sm:w-auto">
                Donate Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>


            {/* What We Do Section */}
      <section className="w-full bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
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
                  Our Impact
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6 leading-tight">
                  Empowering Change, One Initiative at a Time
                </h2>
                <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
                  We empower children and families through holistic support, health initiatives, educational opportunities, and compassionate care—led by the students of Rishihood University.
                </p>
              </motion.div>

              {/* Services Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-800 mb-2">Family Support</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">Guidance, counseling, and resources for families to nurture and uplift their children.</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 7L9 19l-5.5-5.5 1.41-1.41L9 16.17l10.59-10.59L21 7z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-800 mb-2">Health Benefits</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">Student-led health camps, wellness drives, and awareness programs for children and families.</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-800 mb-2">Scholarships</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">Financial aid and educational support to help children pursue their dreams.</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 17.17L18.59 18.59 13 13.41V7h-2v6.41l-5.59 5.18L4 17.17l8-7.17z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-800 mb-2">Therapy</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">Therapeutic activities and emotional support to help children grow with confidence and joy.</p>
                    </div>
                  </div>
                </div>
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
                  src="/aboutusImage.png"
                  alt="Children playing outdoors"
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



            {/* Mission Section */}
      <section className="w-full bg-neutral-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-8">
              Our Mission
            </span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-primary-800 mb-8 leading-tight"
            >
              To ignite a culture of giving back
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
                Led by the students of Rishihood University, we uplift communities across India through compassion, service, and student-powered change.
              </p>
              
              <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-6"></div>
              
              <p className="text-lg text-neutral-500 italic">
                &ldquo;We believe every act of kindness—no matter how small—can spark hope and transform lives.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              Our Community
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">Who We Help</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Building bridges between students, communities, and organizations to create lasting positive impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 text-center border border-neutral-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-4">Communities in Need</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We support underprivileged children and families across India, providing essentials, education, and hope for a brighter future.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 text-center border border-neutral-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <GraduationCap className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-4">Empowered Students</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We empower Rishihood University students to lead service projects, develop leadership, and make a real impact in society.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 text-center border border-neutral-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <HeartHandshake className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-4">Partner Organizations</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We collaborate with NGOs, schools, and local groups to amplify our reach and create lasting change together.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

                   {/* Student Volunteers Section */}
      <section className="w-full bg-primary-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white text-primary-700 text-sm font-medium mb-8 shadow-sm">
              Our Legacy
            </span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-primary-800 mb-8 leading-tight"
            >
              Forged by Vision,<br />
              <span className="text-neutral-700">Fueled by Passion</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-neutral-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Harnessing the combined energy of future leaders and innovators, this initiative was born from a shared commitment to create meaningful impact. It stands as a testament to what&apos;s possible when education meets purpose-driven action.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-sm p-8 max-w-lg mx-auto border border-primary-100"
            >
              <p className="text-neutral-500 text-sm mb-3">
                A collective endeavor by the students of
              </p>
              <h3 className="text-2xl font-bold text-primary-800">
                Rishihood University × Newton School
              </h3>
              <p className="text-primary-600 font-semibold mt-2">
                Batch of 2023
              </p>
              <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mt-4"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              Our Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-800 mb-6">Photo Gallery</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Capturing moments of impact, compassion, and community service across our initiatives.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PhotoGallery photos={photos} />
          </motion.div>
        </div>
      </section>
    </main>
  );
} 
