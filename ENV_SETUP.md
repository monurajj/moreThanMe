# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Supabase Service Role Key (Server-side only)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email Configuration (for donation emails)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Gemini API Configuration (for receipt parsing)
GEMINI_API_KEY=your_gemini_api_key
```

## How to Get These Keys

### 1. Supabase Keys

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` ⚠️

### 2. Email Configuration (Gmail)

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification (enable if not already)
3. App Passwords → Generate new app password
4. Copy the 16-character password → `EMAIL_PASS`
5. Your Gmail address → `EMAIL_USER`

### 3. Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API Key
3. Copy the key → `GEMINI_API_KEY`

## Security Notes

⚠️ **IMPORTANT SECURITY WARNINGS:**

1. **Never commit `.env.local` to Git**
   - Already in `.gitignore`
   - Contains sensitive keys

2. **Service Role Key is POWERFUL**
   - Bypasses all RLS policies
   - Only use in API routes (server-side)
   - Never expose to client-side code
   - Never log or display this key

3. **Public vs Private Keys**
   - `NEXT_PUBLIC_*` variables are exposed to the browser
   - Variables without `NEXT_PUBLIC_` are server-only
   - Service role key should NEVER have `NEXT_PUBLIC_` prefix

## Verification

After setting up `.env.local`:

1. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. **Check if variables are loaded:**
   - Open any API route file
   - Add temporary log: `console.log('Env check:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)`
   - Should print: `Env check: true`
   - Remove the log after verification

3. **Test the newsletter module:**
   - Visit `/newsletters` (should load without errors)
   - Visit `/admin/newsletters` (should show form)
   - Try adding a newsletter

## Troubleshooting

### "Missing Supabase environment variables" Error

**Cause:** `.env.local` file is missing or not loaded

**Solution:**
1. Create `.env.local` in project root
2. Add all required variables
3. Restart dev server
4. Clear Next.js cache: `rm -rf .next`

### "Server configuration error" in API

**Cause:** `SUPABASE_SERVICE_ROLE_KEY` is not set

**Solution:**
1. Go to Supabase Dashboard → Settings → API
2. Copy the **service_role** key (not anon key)
3. Add to `.env.local`: `SUPABASE_SERVICE_ROLE_KEY=your_key`
4. Restart dev server

### Environment variables not updating

**Cause:** Next.js caches environment variables

**Solution:**
1. Stop dev server
2. Delete `.next` folder: `rm -rf .next`
3. Restart: `npm run dev`

## Production Deployment

When deploying (Vercel, Netlify, etc.):

1. Add all environment variables in the hosting platform's dashboard
2. **Never** commit `.env.local` or `.env.production`
3. Use the platform's environment variable management
4. Verify all variables are set before deploying

### Vercel Example:

1. Go to Project Settings → Environment Variables
2. Add each variable:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://your-project.supabase.co`
   - Environment: Production, Preview, Development
3. Repeat for all variables
4. Redeploy

## File Structure

```
more_than_me/
├── .env.local          ← Create this (not in Git)
├── .env.example        ← Template (safe to commit)
├── .gitignore          ← Should include .env.local
└── ...
```

## Quick Copy Template

Copy this to your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email
EMAIL_USER=
EMAIL_PASS=

# Gemini
GEMINI_API_KEY=
```

Then fill in the values!

