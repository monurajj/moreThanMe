"use client"
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function JoinPage() {

  const [form, setForm] = useState({
    name: "",
    universityEmail: "",
    enrollment: "",
    batch: "2023",
    course: "CSAI",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Check if university email is valid
    if (!form.universityEmail.endsWith('rishihood.edu.in')) {
      setLoading(false);
      setError('Only Rishihood University emails (@rishihood.edu.in) can sign up.');
      return;
    }
    // 1. Check if user already exists
    const { data: existing, error: selectError } = await supabase
      .from('volunteers')
      .select('id')
      .eq('university_email', form.universityEmail)
      .maybeSingle();
    if (selectError) {
      setLoading(false);
      setError('There was an error checking your registration. Please try again.');
      router.push("/joinUs/status?status=error");
      return;
    }
    if (existing) {
      setLoading(false);
      router.push("/joinUs/status?status=already");
      return;
    }
    // 2. Insert new user
    const { error: insertError } = await supabase.from('volunteers').insert([
      {
        name: form.name,
        university_email: form.universityEmail,
        enrollment: form.enrollment,
        batch: form.batch,
        course: form.course,
        phone: form.phone,
        message: form.message,
        created_at: new Date().toISOString(),
      },
    ]);
    setLoading(false);
    if (insertError) {
      console.error(insertError); // Log the error for debugging
      // Check for unique constraint violation (Postgres error code 23505 or message)
      if (
        insertError.code === '23505' ||
        (insertError.details && insertError.details.toLowerCase().includes('duplicate key value')) ||
        (insertError.message && insertError.message.toLowerCase().includes('duplicate'))
      ) {
        router.push("/joinUs/status/already");
      } else {
        setError("There was an error submitting your form. Please try again.");
        router.push("/joinUs/status?status=error");
      }
    } else {
      router.push("/joinUs/status/welcome");
    }
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Join Us</h1>
      <p className="mb-8 text-gray-700 dark:text-gray-300">Become a volunteer and help us make a difference! Fill out the form below to join our team at Rishihood University.</p>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6 border border-blue-100 dark:border-blue-700 mb-12"
      >
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="universityEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            University Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="universityEmail"
            name="universityEmail"
            required
            placeholder="yourname@rishihood.edu.in"
            value={form.universityEmail}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="enrollment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enrollment Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="enrollment"
            name="enrollment"
            required
            placeholder="e.g. RU2023XXXX"
            value={form.enrollment}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="batch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Batch <span className="text-red-500">*</span>
          </label>
          <select
            id="batch"
            name="batch"
            required
            value={form.batch}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Course <span className="text-red-500">*</span>
          </label>
          <select
            id="course"
            name="course"
            required
            value={form.course}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option value="BTECH">B.Tech</option>
            <option value="BDES">B.Des</option>
            <option value="BBA">BBA</option>
            <option value="PSYCH">Psychology</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="e.g. 9876543210"
          />
        </div>
        
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Why do you want to join? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
} 