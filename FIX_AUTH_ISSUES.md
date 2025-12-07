# Fix Authentication Issues - Step by Step

## Quick Fix (Most Common Issues)

### Step 1: Restart Your Dev Server

**This is the #1 fix!** Environment variables only load when the server starts.

1. **Stop the dev server:**
   - Go to your terminal where `npm run dev` is running
   - Press `Ctrl+C` to stop it

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Wait for it to fully start** (you'll see "Ready" message)

4. **Refresh your browser** (hard refresh: `Ctrl+Shift+R`)

### Step 2: Check Supabase Project Status

Your Supabase project might be paused (free tier pauses after inactivity).

1. Go to: https://supabase.com/dashboard
2. Check if your project shows as **"Paused"** or **"Active"**
3. If paused, click **"Restore"** or **"Resume"** to reactivate it
4. Wait a minute for it to fully start
5. Try signing in/signing up again

### Step 3: Verify Environment Variables Are Loaded

1. Open your browser console (F12 → Console tab)
2. Try to sign in/sign up
3. Look for console messages that show:
   - "Supabase URL configured: true"
   - "Supabase Key configured: true"
   - "Supabase client created successfully"

If you see "false" or errors, the environment variables aren't loading.

### Step 4: Clear Browser Cache

Sometimes cached data causes issues:

1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache for localhost
3. Try again

## Detailed Troubleshooting

### Check Browser Console for Errors

1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Try signing in/signing up
4. Look for any **red error messages**
5. Share the error message if you see one

### Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Try signing in/signing up
4. Look for requests to Supabase (should see requests to `*.supabase.co`)
5. Check if any requests are **failing** (red status codes)

### Verify Supabase Settings

1. Go to Supabase Dashboard → **Authentication** → **Settings**
2. Check:
   - **Site URL**: Should be `http://localhost:3000` (for development)
   - **Redirect URLs**: Should include `http://localhost:3000/**`
   - **Email Auth**: Should be enabled

### Test Supabase Connection

You can test if Supabase is reachable:

1. Open browser console (F12)
2. Run this command:
   ```javascript
   fetch('https://ecejfakchngghymzqqhi.supabase.co/rest/v1/', {
     headers: {
       'apikey': 'YOUR_ANON_KEY_HERE'
     }
   }).then(r => console.log('Connection:', r.status))
   ```
3. Replace `YOUR_ANON_KEY_HERE` with your actual anon key from `.env.local`
4. If you get a response (even 401/404), Supabase is reachable

## Most Likely Solutions (In Order)

1. ✅ **Restart dev server** (90% of cases)
2. ✅ **Resume Supabase project** if paused
3. ✅ **Check browser console** for specific errors
4. ✅ **Verify Site URL** in Supabase settings
5. ✅ **Clear browser cache**

## Still Not Working?

If none of the above works, check:

1. **Is your Supabase project active?** (Not paused)
2. **Are environment variables correct?** (Check `.env.local`)
3. **Did you restart the dev server?** (After any env var changes)
4. **What error do you see in browser console?** (F12 → Console)
5. **What error do you see in the UI?** (On the login/signup form)

Share the specific error messages and I can help further!

