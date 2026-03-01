"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import { Users, HeartHandshake, GraduationCap } from "lucide-react";
import PhotoGallery from "../components/PhotoGallery";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HERO_IMAGE = "/hero.jpg";
const FEATURED_CAROUSEL_INTERVAL_MS = 4500;

const isVideoUrl = (src: string) =>
  src.toLowerCase().includes("/video/") || src.toLowerCase().endsWith(".mp4") || src.toLowerCase().endsWith(".webm");

export default function Home() {
  const [photos, setPhotos] = useState<{ src: string; alt: string; category: string; tags: string[]; description: string }[]>([]);
  const [aboutImageUrl, setAboutImageUrl] = useState<string | null>(null);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);

  useEffect(() => {
    fetch("/api/gallery/featured")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPhotos(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/assets")
      .then((r) => r.json())
      .then((data) => {
        const aboutImg = Array.isArray(data) ? data.find((a: { category?: string }) => a.category === "About") : null;
        if (aboutImg?.url) setAboutImageUrl(aboutImg.url);
        else if (Array.isArray(data) && data.length > 0) setAboutImageUrl(data[0].url);
      })
      .catch(() => {});
  }, []);

  const featuredImagesOnly = photos.filter((p) => p.src && !isVideoUrl(p.src));
  const hasFeaturedImages = featuredImagesOnly.length > 0;

  useEffect(() => {
    if (!hasFeaturedImages) return;
    const t = setInterval(() => {
      setFeaturedImageIndex((i) => (i + 1) % featuredImagesOnly.length);
    }, FEATURED_CAROUSEL_INTERVAL_MS);
    return () => clearInterval(t);
  }, [hasFeaturedImages, featuredImagesOnly.length]);

  const router = useRouter();
  const handleJoin = () => {
    router.push("/joinUs");
  }
  const handleDonate = () => {
    router.push("/donate");
  }

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section - full viewport width, starts below navbar */}
      <section className="relative w-full min-w-full min-h-screen flex flex-col bg-neutral-800 hero-section overflow-hidden">
        {/* Hero Content Wrapper */}
        <div className="flex-1 flex items-center relative min-w-full">
          {/* Background Image - local file in public folder */}
          <div className="absolute inset-0 left-0 right-0 w-full min-w-full z-0 bg-neutral-800">
            <Image
              src={HERO_IMAGE}
              alt="Children smiling"
              fill
              sizes="100vw"
              className="object-cover object-center w-full h-full opacity-90"
            />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 left-0 right-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
          {/* Content - padded below navbar so it doesn't get covered */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 flex flex-col justify-center px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 w-full max-w-3xl sm:max-w-4xl pt-28 sm:pt-32 text-center md:text-left items-center md:items-start"
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
              A student-driven movement from Rishihood University <span className="text-gray-400">&</span> Newton School of Technology, giving back to India—one act of kindness at a time.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Button
                onClick={handleJoin}
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-semibold py-3 px-8 rounded-lg shadow-sm text-lg w-full sm:w-auto"
              >
                Join Us
              </Button>
              <Button
                onClick={handleDonate}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg shadow-sm text-lg w-full sm:w-auto"
              >
                Donate Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>


            {/* What We Do Section */}
      <section className="w-full bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Row 1: Our Impact label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex justify-center"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium">
              Our Impact
            </span>
          </motion.div>

          {/* Row 2: Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-primary-800 mb-4 leading-tight"
          >
            Empowering Change, One Initiative at a Time
          </motion.h2>

          {/* Row 3: Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-600 mb-12 leading-relaxed"
          >
            We empower youth through education, career guidance, skill development, and environmental conservation—led by the students of Rishihood University.
          </motion.p>

          {/* Two columns: Cards (left) | Image (right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          >
            {/* Left column: 4 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-800 mb-2">Education</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">Access to quality education and learning opportunities to help children and youth reach their full potential.</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-800 mb-2">Career Guidance</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">Mentorship and guidance to help youth navigate career paths and make informed decisions for their future.</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-800 mb-2">Skill Development</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">Practical training and workshops to build employability skills and empower youth for the future.</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L4 21h4l2-6h4l2 6h4L12 3z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-800 mb-2">Environmental Conservation</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">Initiatives and awareness programs to protect our planet and promote sustainable practices in communities.</p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Right column: Featured image */}
            {(hasFeaturedImages || aboutImageUrl) && (
              <div className="w-full max-w-lg mx-auto lg:mx-0 lg:max-w-full">
                <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-lg bg-primary-100">
                  {hasFeaturedImages ? (
                    <>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={featuredImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={featuredImagesOnly[featuredImageIndex].src}
                            alt={featuredImagesOnly[featuredImageIndex].alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 512px"
                            className="object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>
                      {featuredImagesOnly.length > 1 && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                          {featuredImagesOnly.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setFeaturedImageIndex(i)}
                              className={`h-2 rounded-full transition-all ${
                                i === featuredImageIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                              }`}
                              aria-label={`Go to image ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : aboutImageUrl ? (
                    <Image
                      src={aboutImageUrl}
                      alt="Our impact"
                      fill
                      sizes="(max-width: 1024px) 100vw, 512px"
                      className="object-cover"
                    />
                  ) : null}
                  <div className="absolute -inset-2 bg-primary-100/50 rounded-2xl -z-10" />
                </div>
              </div>
            )}
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
                  We support underprivileged children and communities across India, providing essentials, education, and hope for a brighter future.
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
            {photos.length > 0 ? (
              <PhotoGallery photos={photos} />
            ) : (
              <p className="text-center text-neutral-500 py-12">No gallery images yet. Add media in the admin panel.</p>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
} 
