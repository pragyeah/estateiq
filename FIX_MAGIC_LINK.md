# Fix Magic Link Authentication

## Why Magic Links Might Not Work

Magic links require specific Supabase configuration. Here's how to fix it:

## Step 1: Configure Supabase Redirect URLs

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Select your project

2. **Navigate to Authentication → URL Configuration:**
   - Go to **Authentication** → **Settings**
   - Scroll to **URL Configuration** section

3. **Add Redirect URLs:**
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: Add these (one per line):
     ```
     http://localhost:3000/**
     http://localhost:3000/dashboard
     http://localhost:3000/auth/callback
     ```
   - Click **Save**

## Step 2: Configure Email Service

Magic links require email to be configured:

1. **Go to Authentication → Settings → Email Auth**
2. **Check Email Provider:**
   - Supabase provides a free email service (limited)
   - For production, you should configure SMTP

3. **Verify Email Templates:**
   - Go to **Authentication** → **Email Templates**
   - Make sure **Magic Link** template is enabled
   - Check that email sending is not disabled

## Step 3: Check Email Settings

1. **Go to Project Settings → Auth:**
   - Check **Enable email confirmations** (can be ON or OFF for magic links)
   - Magic links work regardless of this setting

2. **Test Email Sending:**
   - Go to **Authentication** → **Users**
   - Try sending a test email if available

## Step 4: Create Auth Callback Route (If Missing)

Magic links redirect to a callback URL. Let's make sure we handle it:

The code already uses `${window.location.origin}/dashboard` as redirect, but we should also handle the auth callback properly.

## Step 5: Test Magic Link

1. **Go to:** http://localhost:3000/login
2. **Enter your email**
3. **Click "Send Magic Link"**
4. **Check your email** (and spam folder)
5. **Click the link in the email**
6. **Should redirect to dashboard**

## Common Issues

### Issue 1: "Email not sent" or No Email Received

**Causes:**
- Email service not configured
- Email went to spam
- Invalid email address
- Supabase email quota exceeded (free tier has limits)

**Solutions:**
1. Check spam folder
2. Verify email address is correct
3. Check Supabase Dashboard → **Settings** → **Billing** for email quota
4. Configure custom SMTP (for production)

### Issue 2: "Invalid redirect URL"

**Cause:**
- Redirect URL not in Supabase allowed list

**Solution:**
- Add the redirect URL to Supabase Dashboard → **Authentication** → **Settings** → **Redirect URLs**

### Issue 3: Magic Link Works But Doesn't Sign In

**Cause:**
- Callback handler not working
- Session not being saved

**Solution:**
- Check browser console for errors
- Verify cookies are being set
- Check middleware is handling auth correctly

## Quick Fix Checklist

- [ ] Redirect URLs configured in Supabase (including `http://localhost:3000/**`)
- [ ] Site URL set to `http://localhost:3000`
- [ ] Email service is enabled
- [ ] Email templates are configured
- [ ] Dev server restarted after any changes
- [ ] Checked spam folder for magic link email
- [ ] Browser console checked for errors (F12)

## Testing

1. **Send Magic Link:**
   - Go to login page
   - Enter email
   - Click "Send Magic Link"
   - Should see "Check your email" message

2. **Check Email:**
   - Look in inbox and spam
   - Should receive email from Supabase
   - Email should contain a link

3. **Click Link:**
   - Click the link in email
   - Should redirect to dashboard
   - Should be signed in

## Still Not Working?

1. **Check Browser Console (F12):**
   - Look for errors when clicking "Send Magic Link"
   - Share any error messages

2. **Check Supabase Logs:**
   - Go to Supabase Dashboard → **Logs**
   - Look for auth-related errors

3. **Verify Environment Variables:**
   - Make sure `.env.local` has correct Supabase URL and key
   - Restart dev server after changes

4. **Test with Diagnostic Page:**
   - Go to http://localhost:3000/test-auth
   - Run diagnostic tests
   - Check if sign up test works (uses same auth system)

