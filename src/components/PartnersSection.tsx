"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Partner = { name: string; logo_url: string };

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setPartners(d))
      .catch(() => {});
  }, []);

  if (partners.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold mb-4 text-center">Our Partners & Supporters</h2>
      <div className="flex flex-wrap justify-center gap-8 items-center">
        {partners.map((partner) => (
          <div key={partner.name} className="flex flex-col items-center">
            <Image
              src={partner.logo_url}
              alt={partner.name}
              width={100}
              height={60}
              className="object-contain mb-2"
            />
            <span className="text-xs text-gray-500">{partner.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
