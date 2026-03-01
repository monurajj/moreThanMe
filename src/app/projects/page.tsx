"use client";
import Image from "next/image";
import { ProjectCard } from "../../components/ProjectCard";
import Button from "../../components/Button";
import Link from "next/link";
import { useState, useEffect } from "react";

type Project = {
  title: string;
  description: string;
  location: string;
  budget: string;
  status: string;
  progress: number;
};

export default function WhatWeDoPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [heroUrl, setHeroUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setProjects(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/assets")
      .then((r) => r.json())
      .then((d) => {
        const aboutImg = Array.isArray(d) ? d.find((a: { category?: string }) => a.category === "About") : null;
        if (aboutImg?.url) setHeroUrl(aboutImg.url);
        else if (Array.isArray(d) && d.length > 0) setHeroUrl(d[0].url);
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-white dark:from-blue-950 dark:to-gray-950 rounded-3xl shadow-lg my-12 overflow-hidden">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt="What We Do"
            fill
            className="object-cover object-center opacity-70"
            style={{ zIndex: 1 }}
          />
        )}
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
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500 py-12">No projects yet. Add projects in the admin panel.</p>
        )}
      </section>

      {/* Impact Stats - from donations API */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
          Our Impact
        </h2>
        <ImpactStats />
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
          Whether you&apos;re a student, mentor, or supporter, your involvement fuels our mission. Together, we can create ripples of kindness that reach every corner of our society.
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

function ImpactStats() {
  const [stats, setStats] = useState<{ totalDonors?: number; totalAmount?: number }>({});

  useEffect(() => {
    fetch("/api/donations/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const donors = stats.totalDonors ?? 0;
  const amount = stats.totalAmount ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <p className="text-5xl font-extrabold mb-2 text-blue-600">{donors}+</p>
        <p className="text-xl font-semibold">Donors</p>
      </div>
      <div>
        <p className="text-5xl font-extrabold mb-2 text-green-600">₹{(amount / 1000).toFixed(0)}K+</p>
        <p className="text-xl font-semibold">Raised</p>
      </div>
      <div>
        <p className="text-5xl font-extrabold mb-2 text-purple-600">Growing</p>
        <p className="text-xl font-semibold">Community</p>
      </div>
    </div>
  );
}
