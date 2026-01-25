This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# NGO Website – Frontend Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Directory Structure](#directory-structure)
4. [Main Pages & Features](#main-pages--features)
5. [Key Components](#key-components)
6. [Data Models](#data-models)
7. [User Flows](#user-flows)
8. [Backend Requirements](#backend-requirements)
9. [Assets & Styling](#assets--styling)
10. [Next Steps](#next-steps)

---







## Project Overview

This is a modern, student-driven NGO website for Rishihood University, built with Next.js (App Router), React, and Tailwind CSS. The site showcases the NGO’s mission, projects, volunteers, and provides ways for users to join, donate, and contact the organization.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React, SVGs
- **Package Management:** npm

---

## Directory Structure

```
ngo-website/
  ├── public/                # Static assets (images, SVGs)
  ├── src/
  │   ├── app/               # Next.js app directory (pages/routes)
  │   │   ├── about/         # About page
  │   │   ├── contact/       # Contact page
  │   │   ├── donate/        # Donate page
  │   │   ├── gallery/       # Gallery page
  │   │   ├── join/          # Join page
  │   │   ├── joinUs/        # Join Us page
  │   │   ├── media/         # Media page
  │   │   ├── projects/      # Projects page
  │   │   ├── transparency/  # Transparency page
  │   │   ├── layout.tsx     # App layout
  │   │   ├── page.tsx       # Home page
  │   │   └── globals.css    # Global styles
  │   └── components/        # Reusable React components
  ├── package.json
  └── tailwind.config.js
```

---

## Main Pages & Features

### 1. Home (`/`)
- **Hero Section:** Tagline, background image, CTA buttons ("Join Us", "Donate Now").
- **What We Do:** List of services (Family support, Health benefits, Scholarships, Therapy).
- **Mission:** Animated mission statement.
- **Who We Help:** Cards for Communities, Students, Partners.
- **Student Volunteers:** Grid of volunteer stories (name, story, image).
- **Photo Gallery:** Displays gallery images.
- **Social Icons:** Links to social media.

### 2. About (`/about`)
- NGO’s history, vision, and values.

### 3. Contact (`/contact`)
- Contact form or contact information.

### 4. Donate (`/donate`)
- Donation form or instructions.

### 5. Join Us (`/joinUs`)
- Volunteer sign-up form.

### 6. Gallery (`/gallery`)
- Extended photo gallery.

### 7. Projects (`/projects`)
- List and details of projects.

### 8. Transparency (`/transparency`)
- Financials, reports, and transparency documents.

### 9. Media (`/media`)
- Media coverage and press releases.

---

## Key Components

- **Navbar:** Main navigation.
- **Footer:** Site footer.
- **Button:** Reusable button.
- **TestimonialSlider:** Carousel for testimonials.
- **VolunteerStoryCard:** Card for volunteer stories.
- **PartnersSection:** Partner logos/info.
- **PhotoGallery:** Gallery grid/slider.
- **SocialIcons:** Social media links.
- **ProjectCard:** Project info card.
- **TeamCard:** Team member info.
- **DonationForm:** Donation form.
- **ProgressBar:** Progress indicator.
- **Chart:** For statistics/impact.

---

## Data Models

### Student Volunteer
```ts
type StudentVolunteer = {
  name: string;
  story: string;
  imageUrl: string;
};
```

### Gallery Photo
```ts
type Photo = {
  src: string;
  alt: string;
  // (Backend should consider: category, tags, description)
};
```

### Service (What We Do)
```ts
type Service = {
  icon: string; // SVG or icon component
  title: string;
  description: string;
};
```

### Who We Help Card
```ts
type HelpCard = {
  icon: string; // SVG or icon component
  title: string;
  description: string;
};
```

---

## User Flows

- **Join Us:** User clicks "Join Us" → `/joinUs` → fills volunteer form.
- **Donate:** User clicks "Donate Now" → `/donate` → fills donation form.
- **Navigation:** Navbar links to all main pages.
- **Gallery:** User views images, potential for modal/expanded view.
- **Contact:** User fills contact form.

---

## Backend Requirements

To support the frontend, the backend should provide:

1. **Volunteer Management**
   - CRUD for volunteers (name, story, image).
   - Volunteer sign-up form submissions.

2. **Donations**
   - Donation form submissions (amount, donor info, payment integration).
   - Donation history (for transparency).

3. **Projects**
   - CRUD for projects (title, description, images, status).

4. **Gallery**
   - CRUD for gallery images (src, alt, category, tags, description).

5. **Testimonials**
   - CRUD for testimonials (author, content, image).

6. **Partners**
   - CRUD for partner organizations (name, logo, description).

7. **Contact**
   - Contact form submissions (name, email, message).

8. **Team**
   - CRUD for team members (name, role, bio, image).

9. **Transparency**
   - Upload and display financial reports, documents.

10. **Media**
    - CRUD for media coverage (title, link, date, description).

**Authentication/authorization** is recommended for admin features.

---

## Assets & Styling

- **Images:** Located in `public/` (gallery, partners, etc.).
- **SVGs:** For icons and illustrations.
- **Tailwind CSS:** Utility-first styling.
- **Framer Motion:** Animations for sections and icons.

---

## Next Steps

- Define backend API endpoints for each data model.
- Plan database schema to match frontend data needs.
- Set up authentication for admin panel.
- Integrate file uploads (images, documents).
- Integrate payment gateway for donations.
- Document API for frontend-backend integration.

---

## Appendix: Example API Endpoints

| Resource      | Endpoint                | Methods      | Description                    |
|---------------|-------------------------|--------------|--------------------------------|
| Volunteers    | `/api/volunteers`       | GET, POST    | List/add volunteers            |
| Volunteer     | `/api/volunteers/:id`   | GET, PUT, DELETE | Get/update/delete volunteer |
| Donations     | `/api/donations`        | GET, POST    | List/add donations             |
| Projects      | `/api/projects`         | GET, POST    | List/add projects              |
| Gallery       | `/api/gallery`          | GET, POST    | List/add gallery images        |
| Testimonials  | `/api/testimonials`     | GET, POST    | List/add testimonials          |
| Partners      | `/api/partners`         | GET, POST    | List/add partners              |
| Contact       | `/api/contact`          | POST         | Submit contact form            |
| Team          | `/api/team`             | GET, POST    | List/add team members          |
| Transparency  | `/api/transparency`     | GET, POST    | List/add reports               |
| Media         | `/api/media`            | GET, POST    | List/add media coverage        |

---

**This documentation can be shared with your backend team to kickstart API and database design. If you need a more detailed API contract or database schema, let me know!**

---

## Supabase Integration

This project uses [Supabase](https://supabase.com/) as its backend-as-a-service for database, authentication, and storage needs.

- The Supabase client is initialized in `src/lib/supabaseClient.ts` using your project URL and anon key.
- To use Supabase in your components or API routes, import the client:

```ts
import { supabase } from '../lib/supabaseClient';
```

- Update the keys in `src/lib/supabaseClient.ts` if you change your Supabase project or rotate keys.
- For advanced usage (auth, storage, etc.), refer to the [Supabase JS docs](https://supabase.com/docs/reference/javascript/introduction).

---

# NGO Website

A modern, responsive website for NGOs with donation management, receipt processing, and admin dashboard.

## Features

- **Modern UI/UX**: Clean, responsive design with dark mode support
- **Donation Management**: Complete donation tracking and verification system
- **AI-Powered Receipt Processing**: Upload donation receipts and automatically extract payment details using OpenAI's Vision API
- **Admin Dashboard**: Comprehensive dashboard for managing donations and viewing analytics
- **QR Code Generation**: Easy UPI payment integration
- **Email Notifications**: Automated email notifications for donations
- **Real-time Statistics**: Live donation statistics and trends

## AI Receipt Processing

The website now includes an advanced receipt processing feature powered by OpenAI's GPT-4 Vision API:

- **Upload Receipts**: Users can upload screenshots of their donation receipts
- **Automatic Data Extraction**: AI extracts payment amount, transaction ID, payment method, and other details
- **Confidence Scoring**: Each extraction includes a confidence score
- **Auto-fill Forms**: High-confidence extractions automatically populate the donation form
- **Admin Review**: Admins can view and manage processed receipts in the dashboard

## Setup

### Prerequisites

- Node.js 18+ 
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ngo-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add the following environment variables to `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Email Configuration (optional)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

4. Set up the database:
   - Run the SQL commands from `supabase-schema.sql` in your Supabase SQL editor
   - This will create the donations table with receipt processing fields

5. Update the UPI ID:
   - Replace `"your-ngo@upi"` in `src/components/DonationForm.tsx` with your actual UPI ID

6. Start the development server:
```bash
npm run dev
```

## Environment Variables

### Required

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for admin functions)
- `OPENAI_API_KEY`: Your OpenAI API key for receipt processing

### Optional

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: For email notifications

## Database Schema

The application uses the following main tables:

### donations
- `id`: UUID primary key
- `name`: Donor name
- `email`: Donor email
- `amount`: Donation amount
- `transaction_id`: Payment transaction ID
- `status`: Verification status (pending_verification, verified, rejected)
- `receipt_processing_status`: Receipt processing status
- `receipt_parsed_data`: JSON data from AI processing
- `receipt_confidence`: AI confidence score
- `created_at`: Timestamp

## API Routes

- `/api/parse-receipt`: Processes receipt images using OpenAI Vision API
- `/api/send-donation-email`: Sends email notifications for donations

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- View all donations with receipt processing status
- Verify or reject donations
- View AI-extracted receipt data
- Monitor donation statistics
- View donation trends

## Receipt Processing Workflow

1. **User Upload**: User uploads a receipt screenshot
2. **AI Processing**: OpenAI Vision API analyzes the image
3. **Data Extraction**: AI extracts payment details with confidence scores
4. **Auto-fill**: High-confidence data auto-fills the donation form
5. **Manual Review**: User can review and edit extracted data
6. **Submission**: Data is stored in Supabase with processing metadata
7. **Admin Review**: Admins can view and manage processed receipts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
# moreThanMe
