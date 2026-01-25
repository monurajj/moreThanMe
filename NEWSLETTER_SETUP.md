# Newsletter Module Setup Guide

## 📋 Overview

Complete newsletter management system with support for multiple categories (monthly, weekly, annual, special-edition, etc.).

## 🔑 Environment Variables

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Important:** The `SUPABASE_SERVICE_ROLE_KEY` is required for the API routes to bypass RLS policies and perform admin operations.

⚠️ **Never expose the service role key on the client side!** It's only used in API routes (server-side).

## 🗄️ Database Setup

### 1. Run SQL Schema

Execute the following SQL in your Supabase SQL Editor:

```sql
-- Run this file: setup-newsletters.sql
```

This creates:
- `newsletters` table with proper columns
- Indexes for performance
- Row Level Security policies

### 2. Create Storage Bucket

In Supabase Dashboard:

1. Go to **Storage**
2. Click **New Bucket**
3. Name: `newsletters`
4. Make it **Public**
5. Click **Create**

### 3. Configure Storage Policies

In the `newsletters` bucket, set these policies:

**Policy 1: Public Read Access**
```sql
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'newsletters');
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "Authenticated upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'newsletters' AND auth.role() = 'authenticated');
```

## 📁 File Structure in Supabase Storage

In the `newsletters` bucket, organize files like this:

```
newsletters/ (bucket root)
  monthly/
    jan-2025.pdf
    feb-2025.pdf
  weekly/
    week-1-2025.pdf
    week-2-2025.pdf
  annual/
    annual-report-2024.pdf
  special-edition/
    diwali-special.pdf
```

## 🚀 Usage

### For Admins

1. **Upload PDF to Supabase Storage:**
   - Go to Storage → newsletters bucket
   - Create folder structure (monthly, weekly, etc.)
   - Upload PDF file

2. **Add Newsletter Entry:**
   - Visit `/admin/newsletters`
   - Fill out the form:
     - Title: "January 2025 Newsletter"
     - Description: "Updates from January"
     - Category: Select from dropdown
     - File Path: "monthly/jan-2025.pdf" (path from bucket root)
   - Submit

### For Users

- Visit `/newsletters` to view all newsletters
- Organized by category
- Click "View PDF" to open PDF viewer modal
- In the modal:
  - View PDF directly in the app
  - Download PDF
  - Open in new tab
  - Close to return to newsletter list

## 🔗 API Endpoints

### GET /api/newsletters

Returns all newsletters grouped by category:

```json
{
  "monthly": [
    {
      "id": "uuid",
      "title": "January 2025",
      "description": "Monthly updates",
      "category": "monthly",
      "file_path": "newsletters/monthly/jan-2025.pdf",
      "created_at": "2025-01-01T00:00:00Z",
      "url": "https://...supabase.co/storage/v1/object/public/newsletters/..."
    }
  ],
  "weekly": [...]
}
```

### POST /api/newsletters/add

Add a new newsletter entry:

```json
{
  "title": "January 2025 Newsletter",
  "description": "Monthly updates and stories",
  "category": "monthly",
  "file_path": "monthly/jan-2025.pdf"
}
```

**Note:** The file_path can be with or without the "newsletters/" prefix. The API handles both formats.

## 🎨 Components

- **NewsletterList**: Main component that fetches and displays all newsletters
- **NewsletterCategorySection**: Reusable section for each category with modal trigger
- **PDFViewer**: Full-screen modal component for viewing PDFs in-app
- **AddNewsletterForm**: Admin form to add newsletter entries

## 🔐 Security

- Public read access for all newsletters
- Only authenticated users can add/edit/delete
- RLS policies enforce access control

## 📝 Adding New Categories

Categories are dynamic. To add a new category:

1. Upload PDF to new folder in newsletters bucket: `your-category/file.pdf`
2. Use the category name in the form when adding the newsletter
3. It will automatically appear on the newsletters page

No code changes needed!

## 🔍 How It Works

1. **Metadata Storage:** Newsletter information (title, description, category, file_path) is stored in the `newsletters` table
2. **File Storage:** Actual PDF files are stored in Supabase Storage bucket `newsletters`
3. **Signed URLs:** When fetching newsletters, the API generates signed URLs (valid for 1 hour) using Supabase Storage's `createSignedUrl()` method
4. **In-App Viewer:** Frontend displays PDFs in a modal viewer within the app (no redirect to new tab)
5. **Additional Options:** Users can download PDF or open in new tab via modal controls

## ✅ Checklist

- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- [ ] Run `setup-newsletters.sql` in Supabase
- [ ] Create `newsletters` storage bucket (public)
- [ ] Configure storage policies
- [ ] Test upload via Supabase dashboard
- [ ] Test adding newsletter via `/admin/newsletters`
- [ ] Verify display on `/newsletters`

## 🐛 Troubleshooting

**PDFs not loading?**
- Check if signed URL is being generated (check server logs)
- Verify file exists in Supabase Storage at the specified path
- Ensure service role key has storage access permissions
- Check browser console for CORS or iframe errors

**Can't add newsletters?**
- Check authentication
- Verify RLS policies
- Check browser console for errors

**Categories not showing?**
- Ensure at least one newsletter exists for that category
- Check API response at `/api/newsletters`

