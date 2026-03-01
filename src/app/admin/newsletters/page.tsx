"use client";

import Link from "next/link";
import AddNewsletterForm from "@/components/newsletters/AddNewsletterForm";
import SendNewsletterEmail from "@/components/newsletters/SendNewsletterEmail";
import NewsletterSendHistory from "@/components/newsletters/NewsletterSendHistory";
import { ArrowLeft } from "lucide-react";

export default function AdminNewslettersPage() {
  return (
    <>
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Newsletter Management
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Create newsletters, then send email notifications to selected users.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Step 1: Create newsletter</h3>
          <AddNewsletterForm />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Step 2: Send to users</h3>
          <SendNewsletterEmail />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Step 3: Past sends</h3>
          <NewsletterSendHistory />
        </div>
      </div>

      <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-3">
          Instructions
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-primary-800 dark:text-primary-200">
          <li>Create a newsletter above (title, description, category) and upload a PDF file via Cloudinary</li>
          <li>In &quot;Send to users&quot;, select the newsletter, choose recipients, then send</li>
          <li>All newsletters and send history are saved in the database</li>
        </ol>
        <p className="mt-4 text-xs text-primary-700 dark:text-primary-300">
          PDFs are stored on Cloudinary. Max file size: 10MB.
        </p>
      </div>
    </>
  );
}
