# How to Get API Keys for EstateIQ

## 1. OpenAI API Key (for Real AI Analysis)

### Step-by-Step Instructions:

1. **Go to OpenAI Platform**
   - Visit: https://platform.openai.com/
   - Sign in or create an account

2. **Navigate to API Keys**
   - Click on your profile icon (top right)
   - Select **"API keys"** from the dropdown menu
   - Or go directly to: https://platform.openai.com/api-keys

3. **Create a New API Key**
   - Click **"+ Create new secret key"** button
   - Give it a name (e.g., "EstateIQ Production")
   - Click **"Create secret key"**
   - **⚠️ IMPORTANT**: Copy the key immediately! It will only be shown once.
   - The key will look like: `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

4. **Add Credits/Billing**
   - OpenAI requires you to add payment information to use the API
   - Go to: https://platform.openai.com/account/billing
   - Click **"Add payment method"**
   - Add your credit card
   - Set up usage limits if desired (recommended for cost control)

5. **Usage & Pricing**
   - OpenAI charges per token used
   - For EstateIQ analysis, you'll use the GPT models
   - Check current pricing at: https://openai.com/pricing
   - You can set usage limits in billing settings to control costs

### Add to Your Project:

**For Local Development:**
- Add to `.env.local`:
  ```
  OPENAI_API_KEY=sk-proj-your-actual-key-here
  ```

**For Vercel Deployment:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add `OPENAI_API_KEY` with your key
- Select all environments (Production, Preview, Development)

---

## 2. Mapbox Token (for Map Features)

### Step-by-Step Instructions:

1. **Create a Mapbox Account**
   - Visit: https://account.mapbox.com/
   - Click **"Sign up"** (or sign in if you have an account)
   - You can sign up with GitHub, Google, or email

2. **Get Your Access Token**
   - After signing in, you'll be taken to your account page
   - Scroll down to the **"Access tokens"** section
   - You'll see a **"Default public token"** (starts with `pk.eyJ...`)
   - Click **"Copy"** to copy the token
   - Or click on the token to see more details

3. **Create a Custom Token (Optional)**
   - You can create multiple tokens for different projects
   - Click **"Create a token"**
   - Give it a name (e.g., "EstateIQ")
   - Set scopes (for EstateIQ, you need: `styles:read`, `fonts:read`, `datasets:read`)
   - Click **"Create token"**
   - Copy the token

4. **Free Tier Limits**
   - Mapbox free tier includes: **50,000 map loads per month**
   - This is usually enough for development and small projects
   - Check your usage at: https://account.mapbox.com/

### Add to Your Project:

**For Local Development:**
- Add to `.env.local`:
  ```
  NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNs...
  ```

**For Vercel Deployment:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add `NEXT_PUBLIC_MAPBOX_TOKEN` with your token
- Select all environments (Production, Preview, Development)

---

## Quick Reference

### OpenAI API Key
- **Where to get**: https://platform.openai.com/api-keys
- **Format**: `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Cost**: Pay-per-use (requires payment method)
- **Required for**: Real AI property analysis (instead of mock data)

### Mapbox Token
- **Where to get**: https://account.mapbox.com/
- **Format**: `pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNs...`
- **Cost**: Free tier: 50k requests/month, then pay-as-you-go
- **Required for**: Map features (property map, geocoding)

---

## Security Notes

### ⚠️ Important Security Tips:

1. **Never commit API keys to Git**
   - Your `.env.local` file is already in `.gitignore`
   - Never add keys to your code or commit them

2. **Use Environment Variables**
   - Always use environment variables for API keys
   - Never hardcode keys in your source code

3. **Rotate Keys Regularly**
   - If a key is exposed, revoke it immediately
   - Create new keys periodically for security

4. **Set Usage Limits**
   - For OpenAI, set usage limits in billing settings
   - Monitor usage regularly to avoid unexpected charges

5. **Use Different Keys for Different Environments**
   - Consider using separate keys for development and production
   - This helps track usage and isolate issues

---

## Troubleshooting

### OpenAI API Issues

**"Invalid API key"**
- Verify you copied the entire key (they're long!)
- Check for extra spaces before/after the key
- Make sure you're using the correct key format (`sk-proj-...`)

**"Insufficient quota"**
- Check your billing settings
- Verify payment method is active
- Check usage limits in billing dashboard

**"Rate limit exceeded"**
- You're making too many requests too quickly
- Implement rate limiting or wait before retrying

### Mapbox Issues

**"Map not loading"**
- Verify token is correct (starts with `pk.`)
- Check token hasn't been revoked
- Verify token has correct scopes/permissions

**"Invalid token"**
- Make sure you copied the entire token
- Check for extra spaces
- Verify token is still active in Mapbox dashboard

**"Quota exceeded"**
- You've exceeded the free tier limit (50k requests/month)
- Upgrade your Mapbox plan or wait for next month

---

## Cost Estimates

### OpenAI (for AI Analysis)
- **GPT-4**: ~$0.03-0.06 per analysis (varies by input size)
- **GPT-3.5 Turbo**: ~$0.001-0.002 per analysis (cheaper option)
- EstateIQ currently uses mock data, so no cost until you integrate real AI

### Mapbox (for Maps)
- **Free tier**: 50,000 map loads/month
- **After free tier**: $0.50 per 1,000 requests
- EstateIQ uses Mapbox for:
  - Displaying property maps
  - Geocoding addresses (converting addresses to coordinates)

---

## Next Steps

1. ✅ Get your OpenAI API key (if you want real AI analysis)
2. ✅ Get your Mapbox token (required for map features)
3. ✅ Add both to your `.env.local` file for local development
4. ✅ Add both to Vercel environment variables for production
5. ✅ Test your application to verify everything works

**Note**: EstateIQ will work without OpenAI API key (uses mock data), but Mapbox token is required for the map features to work.

