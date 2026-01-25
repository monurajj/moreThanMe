"use client"
import Image from "next/image";
import { ProjectCard } from "../../components/ProjectCard";
import Button from "../../components/Button";
import Link from "next/link";

const projects = [
  {
    title: "Education for Every Child",
    description:
      "We provide scholarships, mentorship, and school supplies to children from underserved communities, ensuring that no dream is left behind.",
    location: "Sonipat & Nearby Villages",
    budget: "₹2,00,000",
    status: "Ongoing",
    progress: 85,
  },
  {
    title: "Health & Hygiene Camps",
    description:
      "Our student volunteers organize health checkups, awareness drives, and distribute hygiene kits to promote well-being in rural and urban slums.",
    location: "Sonipat, Haryana",
    budget: "₹1,20,000",
    status: "Seasonal",
    progress: 60,
  },
  {
    title: "Community Empowerment",
    description:
      "We empower women and youth through skill-building workshops, financial literacy sessions, and leadership training, fostering self-reliance.",
    location: "Rishihood University & Partner Communities",
    budget: "₹80,000",
    status: "Ongoing",
    progress: 70,
  },
  {
    title: "Youth Leadership Incubator",
    description:
      "Our flagship program develops the next generation of changemakers by giving students hands-on experience in social projects and grassroots leadership.",
    location: "Rishihood University Campus",
    budget: "₹50,000",
    status: "Annual",
    progress: 90,
  },
  {
    title: "Green India Initiative",
    description:
      "From tree plantation drives to clean-up campaigns, we inspire environmental stewardship and climate action among youth and local residents.",
    location: "Sonipat & Surroundings",
    budget: "₹30,000",
    status: "Ongoing",
    progress: 40,
  },
];

export default function WhatWeDoPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-white dark:from-blue-950 dark:to-gray-950 rounded-3xl shadow-lg my-12 overflow-hidden">
        <Image
          src="/whatwedoImage.png"
          alt="What We Do"
          fill
          className="object-cover object-center opacity-70"
          style={{ zIndex: 1 }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 w-full max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 drop-shadow-lg">
            What We Do
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-6 font-medium drop-shadow">
            Student-powered compassion. Community-driven change. Discover how we uplift lives, nurture leaders, and build a better tomorrow—one act of kindness at a time.
          </p>
        </div>
      </section>

      {/* Focus Areas / Projects */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-primary">
          Our Key Initiatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-5xl font-extrabold mb-2 text-blue-600">500+</p>
            <p className="text-xl font-semibold">Volunteers Mobilized</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold mb-2 text-green-600">20+</p>
            <p className="text-xl font-semibold">Projects Completed</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold mb-2 text-purple-600">10,000+</p>
            <p className="text-xl font-semibold">Lives Touched</p>
          </div>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-8 max-w-2xl mx-auto">
          Every number is a story—of a child going to school, a family receiving care, a student discovering purpose, and a community growing stronger. Our impact is measured in hope, not just statistics.
        </p>
      </section>



      {/* Call to Action */}
      <section className="w-full bg-blue-700 dark:bg-blue-900 text-white py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Join the Movement. Be the Change.
        </h2>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Whether you’re a student, mentor, or supporter, your involvement fuels our mission. Together, we can create ripples of kindness that reach every corner of our society.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/donate">
            <Button className="hover:cursor-pointer text-blue-700 font-bold px-10 py-5 rounded-full shadow-xl mr-4">Donate Now</Button>
          </Link>
          <Link href="/contact">
            <Button className="border-2 border-white hover:cursor-pointer text-white font-bold px-10 py-5 rounded-full shadow-xl">Get Involved</Button>
          </Link>
        </div>
      </section>
    </main>
  );
} 