import Image from "next/image";

const partners = [
  { name: "Partner One", logo: "/partner1.png" },
  { name: "Partner Two", logo: "/partner2.png" },
  { name: "Partner Three", logo: "/partner3.png" },
];

export default function PartnersSection() {
  return (
    <section className="py-8">
      <h2 className="text-xl font-bold mb-4 text-center">Our Partners & Supporters</h2>
      <div className="flex flex-wrap justify-center gap-8 items-center">
        {partners.map((partner) => (
          <div key={partner.name} className="flex flex-col items-center">
            <Image src={partner.logo} alt={partner.name} width={100} height={60} className="object-contain mb-2" />
            <span className="text-xs text-gray-500">{partner.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 