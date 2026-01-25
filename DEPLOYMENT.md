# Deployment Guide

This guide will help you deploy your NGO website to Vercel (recommended) or Render.

## Deploy to Vercel (Recommended)

Vercel is the recommended platform for Next.js applications, offering seamless integration, automatic deployments, and excellent performance.

### Prerequisites

1. **GitHub Repository**: Make sure your code is pushed to a GitHub repository
2. **Supabase Project**: Ensure your Supabase project is set up and running
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier available)

### Step 1: Deploy via Vercel Dashboard

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository (`monurajj/moreThanMe`)
   - Vercel will automatically detect it's a Next.js project

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `pnpm run build` (or leave default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install` (or leave default)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add the following variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key (if using)
     NEXT_PUBLIC_ADMIN_SECRET=your_admin_secret
     ```
   - Make sure to add them for all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - Your app will be available at `https://your-project-name.vercel.app`

### Step 2: Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches (creates preview URLs)
- **Development**: Pull requests get preview deployments

### Step 3: Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Configure DNS**
   - Add the CNAME or A record as instructed by Vercel
   - SSL certificate is automatically provisioned

### Vercel Configuration

The `vercel.json` file is already configured in your repository with:
- Build command: `pnpm run build`
- Development command: `pnpm run dev`
- Framework: Next.js
- Region: US East (iad1)

---

## Deploy to Render

This guide will help you deploy your NGO website to Render.

## Prerequisites

1. **GitHub Repository**: Make sure your code is pushed to a GitHub repository
2. **Supabase Project**: Ensure your Supabase project is set up and running
3. **Render Account**: Sign up at [render.com](https://render.com)

## Step 1: Prepare Your Repository

1. Make sure all your changes are committed and pushed to GitHub
2. Verify that your `package.json` has the correct scripts:
   ```json
   {
     "scripts": {
       "dev": "next dev --turbopack",
       "build": "next build",
       "start": "next start",
       "lint": "next lint"
     }
   }
   ```

## Step 2: Deploy on Render

### Option A: Using Render Dashboard

1. **Sign in to Render**
   - Go to [render.com](https://render.com)
   - Sign in with your GitHub account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure the Service**
   - **Name**: `ngo-website` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Branch**: `main` (or your default branch)

4. **Add Environment Variables**
   - Go to the "Environment" tab
   - Add these environment variables:
     ```
     NODE_ENV=production
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

### Option B: Using render.yaml (Recommended)

1. **The render.yaml file is already created** in your repository
2. **Push your code** to GitHub
3. **In Render Dashboard**:
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file
   - Add your environment variables in the dashboard

## Step 3: Configure Environment Variables

### Get Your Supabase Credentials

1. **Go to your Supabase Dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Open your project

2. **Get the URL and Key**
   - Go to Settings → API
   - Copy the "Project URL" (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - Copy the "anon public" key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

3. **Add to Render**
   - In your Render service dashboard
   - Go to "Environment" tab
   - Add these variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
     ```

## Step 4: Verify Deployment

1. **Check Build Logs**
   - Monitor the build process in Render dashboard
   - Ensure there are no build errors

2. **Test Your App**
   - Once deployed, visit your Render URL
   - Test all major functionality:
     - Home page
     - Contact page
     - Donation form
     - Join Us form
     - Transparency page

3. **Check Environment Variables**
   - Verify that Supabase connection works
   - Test form submissions

## Step 5: Custom Domain (Optional)

1. **In Render Dashboard**
   - Go to your service settings
   - Click "Custom Domains"
   - Add your domain

2. **Configure DNS**
   - Add a CNAME record pointing to your Render URL
   - Wait for DNS propagation

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Environment Variables Not Working**
   - Double-check variable names (case-sensitive)
   - Ensure variables are added to the correct service
   - Redeploy after adding variables

3. **Supabase Connection Issues**
   - Verify your Supabase URL and key
   - Check if your Supabase project is active
   - Ensure your database is properly set up

### Useful Commands

```bash
# Check if your app builds locally
npm run build

# Test production build locally
npm run start

# Check for linting issues
npm run lint
```

## Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)

## Your Render URL

Once deployed, your app will be available at:
`https://your-app-name.onrender.com`

You can find this URL in your Render dashboard under your service details. 