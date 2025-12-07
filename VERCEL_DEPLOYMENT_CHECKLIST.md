# Vercel Deployment Checklist - EstateIQ

## ✅ Pre-Deployment Verification

### Code Quality
- [x] **Build succeeds**: `npm run build` completed successfully
- [x] **No linting errors**: All TypeScript and ESLint checks passed
- [x] **No TypeScript errors**: Build completed without type errors
- [x] **Git repository**: All changes pushed to GitHub (main branch)

### GitHub Actions
- [x] **Supabase Migrations workflow**: Configured and ready
- [x] **GitHub Secret**: `SUPABASE_DB_URL` should be set (you mentioned you added it)

### Project Structure
- [x] **Next.js configuration**: `next.config.js` present and valid
- [x] **Package.json**: All dependencies listed correctly
- [x] **Environment variables**: `env.example` file documents required variables
- [x] **Git ignore**: `.gitignore` properly excludes sensitive files

---

## 🚀 Vercel Deployment Steps

### Step 1: Import Project to Vercel

1. Go to **https://vercel.com/new**
2. Sign in with your GitHub account (if not already)
3. Click **"Import Git Repository"**
4. Select **`pragyeah/estateiq`** from the list
5. Vercel will auto-detect:
   - Framework: **Next.js**
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 2: Configure Project Settings

**Before clicking "Deploy"**, configure the following:

#### Environment Variables (CRITICAL!)

Click **"Environment Variables"** and add these:

**Required Variables:**

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: Your Supabase project URL
   - Format: `https://[project-ref].supabase.co`
   - Get from: Supabase Dashboard → Settings → API → Project URL
   - ✅ Add to: Production, Preview, Development

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: Your Supabase anon/public key
   - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Get from: Supabase Dashboard → Settings → API → anon/public key
   - ✅ Add to: Production, Preview, Development

3. **NEXT_PUBLIC_MAPBOX_TOKEN**
   - Value: Your Mapbox access token
   - Format: `pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNs...`
   - Get from: https://account.mapbox.com/access-tokens/
   - ✅ Add to: Production, Preview, Development

**Optional Variable:**

4. **OPENAI_API_KEY** (Optional)
   - Value: Your OpenAI API key (if you want real AI analysis)
   - Format: `sk-...`
   - Get from: https://platform.openai.com/api-keys
   - ✅ Add to: Production, Preview, Development (if using)

**Important Notes:**
- Make sure to select **all three environments** (Production, Preview, Development) for each variable
- Double-check that you're using the correct values (copy from your local `.env.local` if you have one)

### Step 3: Deploy

1. Click **"Deploy"** button
2. Wait for the build to complete (usually 2-3 minutes)
3. You'll see a deployment URL like: `https://estateiq-xxx.vercel.app`

### Step 4: Post-Deployment Verification

After deployment, verify these:

#### 1. Check Build Logs
- Go to your Vercel project dashboard
- Click on the deployment
- Check the build logs for any errors
- ✅ Should see: "Build completed successfully"

#### 2. Test the Application

Visit your deployment URL and test:

- [ ] **Homepage loads**: Should see EstateIQ landing page
- [ ] **Sign up works**: Create a test account
- [ ] **Login works**: Sign in with test account
- [ ] **Dashboard loads**: Should see dashboard after login
- [ ] **Map page works**: Navigate to `/dashboard/map`
- [ ] **File upload works**: Try uploading a file
- [ ] **Add property works**: Add a property via the map page
- [ ] **Analysis works**: Run an analysis (if credits available)

#### 3. Check Supabase Setup

Make sure in your Supabase dashboard:

- [ ] **Database tables exist**: Run migration if not done already
  - Go to Supabase Dashboard → SQL Editor
  - Run `migrations/001_init.sql`
- [ ] **Storage bucket exists**: 
  - Go to Supabase Dashboard → Storage
  - Create bucket named `uploads` (if not exists)
  - Set to **Public** or configure RLS policies

#### 4. Verify GitHub Actions

- [ ] Go to: https://github.com/pragyeah/estateiq/actions
- [ ] Check if "Supabase Migrations" workflow shows success
- [ ] If it failed, check the logs and verify `SUPABASE_DB_URL` secret is correct

---

## 🔧 Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check that all dependencies are in `package.json`
- Verify `package-lock.json` is committed

**Error: "Environment variable not found"**
- Go to Vercel → Settings → Environment Variables
- Verify all required variables are added
- Make sure they're added to the correct environment (Production/Preview/Development)

### Runtime Errors

**"Auth not working"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check Supabase project is active
- Verify email confirmation settings in Supabase Auth

**"Map not loading"**
- Check `NEXT_PUBLIC_MAPBOX_TOKEN` is set correctly
- Verify Mapbox token is valid and has quota remaining
- Check browser console for Mapbox errors

**"File upload fails"**
- Verify Supabase Storage bucket `uploads` exists
- Check bucket is set to Public or RLS policies allow uploads
- Verify Supabase project URL and keys are correct

**"Database errors"**
- Run the migration in Supabase SQL Editor
- Check that all tables exist: `uploads`, `properties`, `analyses`, `analytics_logs`, `billing`
- Verify GitHub Actions migration workflow ran successfully

### Redeploy After Changes

If you need to redeploy after adding/changing environment variables:

1. Go to Vercel Dashboard → Your Project
2. Click on **Deployments** tab
3. Find the latest deployment
4. Click the **"..."** menu → **"Redeploy"**
5. Or push a new commit to trigger automatic redeploy

---

## 📋 Quick Reference

### Environment Variables Summary

| Variable | Required | Where to Get |
|----------|----------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | ✅ Yes | https://account.mapbox.com/access-tokens/ |
| `OPENAI_API_KEY` | ⚠️ Optional | https://platform.openai.com/api-keys |

### Important URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/pragyeah/estateiq
- **GitHub Actions**: https://github.com/pragyeah/estateiq/actions
- **Supabase Dashboard**: https://supabase.com/dashboard

---

## ✅ Final Checklist Before Deploying

- [ ] All environment variables ready (have values copied)
- [ ] Supabase project is active and accessible
- [ ] Mapbox token is valid
- [ ] Database migration has been run (or will run via GitHub Actions)
- [ ] Storage bucket `uploads` exists in Supabase
- [ ] GitHub secret `SUPABASE_DB_URL` is set (for migrations)
- [ ] Code is pushed to GitHub main branch
- [ ] Local build succeeds (`npm run build`)

**You're ready to deploy! 🚀**

