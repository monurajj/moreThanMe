"use client";

import Link from "next/link";
import {
  MessageSquare,
  DollarSign,
  UserCircle,
  Newspaper,
  ArrowRight,
  Shield,
  ImageIcon,
} from "lucide-react";

const sections = [
  {
    title: "Manage Admins",
    description: "Create, delete, or update passwords for admin users. Super admin only.",
    href: "/admin/admins",
    icon: Shield,
    color: "bg-indigo-500",
  },
  {
    title: "Manage Contact",
    description: "View and manage contact form submissions and contact details.",
    href: "/admin/managecontact",
    icon: MessageSquare,
    color: "bg-blue-500",
  },
  {
    title: "Donate",
    description: "Verify and manage donations, view stats and receipts.",
    href: "/admin/donate",
    icon: DollarSign,
    color: "bg-amber-500",
  },
  {
    title: "Team",
    description: "Everyone who joins via Join Us appears here. Assign roles (Volunteer, Core, etc.), mark Founding members, and manage who appears on Our Family.",
    href: "/admin/team",
    icon: UserCircle,
    color: "bg-violet-500",
  },
  {
    title: "Manage Assets",
    description: "Upload and manage images and videos for the main page gallery.",
    href: "/admin/assets",
    icon: ImageIcon,
    color: "bg-teal-500",
  },
  {
    title: "Newsletters",
    description: "Add and manage newsletters (PDFs in storage).",
    href: "/admin/newsletters",
    icon: Newspaper,
    color: "bg-rose-500",
  },
];

export default function AdminPage() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a section below to manage your site. All data uses the same Supabase DB.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className={`${section.color} p-4 flex items-center justify-center`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                  {section.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                  Open
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
        <p className="text-sm text-primary-800 dark:text-primary-200">
          <strong>Quick stats:</strong> Use Donate for donation verification, Team to manage everyone who joined (volunteers + roles), and Newsletters to publish PDFs.
        </p>
      </div>
    </>
  );
}
