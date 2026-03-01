"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const CONTACT_TYPES = [
  { value: "individual", label: "Individual" },
  { value: "ngo", label: "NGO" },
  { value: "company", label: "Company" },
  { value: "other", label: "Other" },
] as const;

export default function ContactFormSection() {
  const [name, setName] = useState("");
  const [type, setType] = useState("individual");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, email, phone: phone.trim() || undefined, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to send message");
        return;
      }
      setSent(true);
      setName("");
      setType("individual");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 sm:p-10 border border-primary-200 text-center shadow-sm"
      >
        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-7 h-7 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold text-primary-800 mb-2">Message sent!</h3>
        <p className="text-neutral-600">Thank you for reaching out. We&apos;ll get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-5"
    >
      <h3 className="text-xl font-bold text-primary-800 mb-4">Send us a message</h3>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-700 mb-1">Name <span className="text-red-500">*</span></label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-type" className="block text-sm font-medium text-neutral-700 mb-1">I am</label>
        <select
          id="contact-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {CONTACT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-700 mb-1">Contact email <span className="text-red-500">*</span></label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-neutral-700 mb-1">Contact phone number</label>
        <input
          id="contact-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="+91 9876543210"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700 mb-1">Message <span className="text-red-500">*</span></label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
          placeholder="Your message..."
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold inline-flex items-center justify-center gap-2"
      >
        {loading ? "Sending..." : "Send message"}
        <Send className="w-4 h-4" />
      </button>
    </motion.form>
  );
}
