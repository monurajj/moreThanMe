"use client";
import { motion } from "framer-motion";
import { Users, BookOpen, GraduationCap, Gift } from "lucide-react";

const DonationTiers = ({ selectedAmount, setSelectedAmount, setFormData, formData, setShowModal }) => {
  const donationTiers = [
    {
      amount: 50,
      title: "Feed 10+ People",
      icon: <Users className="w-8 h-8" />,
      description: "Provide warm, healthy meals to 10+ people in need",
    },
    {
      amount: 100,
      title: "Support Students",
      icon: <BookOpen className="w-8 h-8" />,
      description: "Provide notebooks and pens to 3 rural students",
    },
    {
      amount: 500,
      title: "Skill Development",
      icon: <GraduationCap className="w-8 h-8" />,
      description: "Train a woman in tailoring or digital literacy",
    },
    {
      amount: 1000,
      title: "Classroom Session",
      icon: <Users className="w-8 h-8" />,
      description: "Support a community classroom session for 15+ students",
    },
    {
      amount: 5000,
      title: "Major Project",
      icon: <Gift className="w-8 h-8" />,
      description: "Become a core contributor to major projects",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {donationTiers.map((tier) => (
        <motion.div
          key={tier.amount}
          whileHover={{ scale: 1.02 }}
          className={`bg-white rounded-xl shadow-lg p-6 border-2 cursor-pointer transition-all ${
            selectedAmount === tier.amount
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 hover:border-blue-400"
          }`}
          onClick={() => {
            setSelectedAmount(tier.amount);
            setFormData({ ...formData, donationAmount: tier.amount });
            setShowModal(true);
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-blue-600">{tier.icon}</div>
            <span className="text-2xl font-bold">₹{tier.amount}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{tier.title}</h3>
          <p className="text-gray-600">{tier.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DonationTiers; 