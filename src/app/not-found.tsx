import Link from "next/link";
import { Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-lg mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-100 text-primary-600 mb-8">
          <Sparkles className="w-10 h-10" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-4">
          Oops! Page not found
        </h1>
        <p className="text-xl text-neutral-600 leading-relaxed mb-6">
          We think our team is busy creating impact—and might have forgotten to build this page.
        </p>
        <p className="text-neutral-500 mb-10">
          No worries! Head back home and explore what we&apos;re up to.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
