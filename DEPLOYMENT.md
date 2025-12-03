# Deployment Guide - EstateIQ to Vercel

## Prerequisites

1. **GitHub Repository**: Your code should be pushed to a GitHub repository
2. **Vercel Account**: Sign up at https://vercel.com (free tier works great)
3. **Environment Variables**: Have these ready (see below)

## Step-by-Step Deployment

### 1. Push to GitHub

If you haven't already, initialize git and push your code:

```bash
git init
git add .
git commit -m "Initial commit: EstateIQ platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Vercel will auto-detect Next.js settings
5. **Before clicking Deploy**, add environment variables (see below)
6. Click **Deploy**

**Option B: Via Vercel CLI**

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts, and add environment variables when asked.

### 3. Add Environment Variables in Vercel

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add each variable below:

#### Required Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

#### Optional (for real AI analysis):

```
OPENAI_API_KEY=your_openai_api_key
```

**Important**: 
- Add these for **Production**, **Preview**, and **Development** environments
- After adding variables, **redeploy** your project (Settings → Deployments → Redeploy)

### 4. Post-Deployment Setup

#### Supabase Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Create a bucket named `uploads`
3. Set it to **Public** (or configure RLS policies as needed)

#### Supabase Database Migrations

Run your migration manually the first time:

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `migrations/001_init.sql`
3. Paste and run it

After that, GitHub Actions will handle future migrations automatically.

### 5. Verify Deployment

1. Visit your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
2. Test:
   - Sign up / Login
   - Upload a file
   - Add a property
   - View the map
   - Run an analysis

## Troubleshooting

- **Build fails**: Check Vercel build logs for missing dependencies
- **Auth not working**: Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- **Map not loading**: Check `NEXT_PUBLIC_MAPBOX_TOKEN` is set
- **File upload fails**: Ensure Supabase Storage bucket `uploads` exists and is configured

## Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

