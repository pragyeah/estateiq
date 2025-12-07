# Authentication Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "Invalid login credentials" or Can't Sign In

**Possible Causes:**
1. **Email confirmation required** - Supabase requires email verification by default
2. Wrong email/password
3. Account doesn't exist

**Solutions:**

#### Check Email Confirmation Status:
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Users**
3. Find your user account
4. Check if email is confirmed (green checkmark)

#### If Email Confirmation is Required:
1. Check your email inbox (and spam folder) for a confirmation email from Supabase
2. Click the confirmation link in the email
3. Then try signing in again

#### Disable Email Confirmation (For Development):
1. Go to Supabase Dashboard → **Authentication** → **Settings**
2. Scroll to **Email Auth** section
3. Find **"Enable email confirmations"**
4. **Toggle it OFF** (for development/testing)
5. Save changes

**Note:** For production, you should keep email confirmation enabled for security.

### Issue 2: "User already registered" on Sign Up

**Solution:**
- The email is already registered
- Try signing in instead of signing up
- Or use a different email address

### Issue 3: No Error Message, But Nothing Happens

**Possible Causes:**
1. Supabase environment variables not loaded
2. Browser console errors
3. Network issues

**Solutions:**

1. **Check Environment Variables:**
   - Make sure `.env.local` exists in the project root
   - Verify it contains:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
     ```
   - **Restart the dev server** after adding/changing environment variables:
     - Stop the server (Ctrl+C)
     - Run `npm run dev` again

2. **Check Browser Console:**
   - Press F12 to open Developer Tools
   - Go to **Console** tab
   - Look for any red error messages
   - Share the error message if you see one

3. **Check Network Tab:**
   - In Developer Tools, go to **Network** tab
   - Try signing in/signing up
   - Look for failed requests (red)
   - Check if requests to Supabase are being made

### Issue 4: "Supabase is not configured"

**Solution:**
- Your `.env.local` file is missing or incomplete
- Create/update `.env.local` with your Supabase credentials
- Restart the dev server

### Issue 5: Magic Link Not Working

**Solution:**
- Check your email inbox (and spam folder)
- Make sure the email address is correct
- Check Supabase Dashboard → **Authentication** → **Settings** → **Email Templates** to verify email sending is configured

## Quick Fixes

### Fix 1: Disable Email Confirmation (Development Only)

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Settings**
4. Scroll to **Email Auth**
5. Toggle **"Enable email confirmations"** OFF
6. Save

**⚠️ Warning:** Only disable this for development. Re-enable it for production!

### Fix 2: Restart Dev Server

After changing environment variables:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Fix 3: Clear Browser Cache

1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache and cookies for localhost

### Fix 4: Check Supabase Project Status

1. Go to Supabase Dashboard
2. Make sure your project is **active** (not paused)
3. Free tier projects pause after inactivity

## Testing Authentication

### Test Sign Up:
1. Go to `/signup`
2. Enter a valid email and password (min 6 characters)
3. Click "Sign Up"
4. If email confirmation is enabled, check your email
5. If disabled, you should be redirected to dashboard immediately

### Test Sign In:
1. Go to `/login`
2. Enter your email and password
3. Click "Sign In"
4. Should redirect to `/dashboard` if successful

## Still Having Issues?

1. **Check Browser Console** (F12 → Console tab) for errors
2. **Check Network Tab** (F12 → Network tab) for failed requests
3. **Verify Supabase Settings:**
   - Project is active
   - Authentication is enabled
   - Email confirmation settings
4. **Verify Environment Variables:**
   - `.env.local` file exists
   - Variables are correct
   - Dev server was restarted after changes

## Common Error Messages

| Error | Solution |
|-------|----------|
| "Invalid login credentials" | Check email/password, or verify email if just signed up |
| "Email not confirmed" | Check email inbox for confirmation link |
| "User already registered" | Sign in instead, or use different email |
| "Password is too weak" | Use a stronger password (min 6 chars, but stronger is better) |
| "Too many requests" | Wait a moment and try again |
| "Supabase is not configured" | Check `.env.local` file and restart dev server |

