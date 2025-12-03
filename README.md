# EstateIQ - Real Estate Intelligence Platform

A full-stack real estate intelligence platform built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Supabase, and Mapbox.

## 🚀 Quick Start (5 minutes)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd "real estate"
npm install
```

### 2. Set Up Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier works)

2. **Run the database migration:**
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor**
   - Copy the contents of `migrations/001_init.sql`
   - Paste and run it (this creates all tables: `uploads`, `properties`, `analyses`, `analytics_logs`, `billing`)

3. **Create Storage Bucket:**
   - Go to **Storage** in your Supabase dashboard
   - Click **New bucket**
   - Name it: `uploads`
   - Make it **Public** (or set up RLS policies if you prefer private)
   - Click **Create bucket**

4. **Get your API keys:**
   - Go to **Settings** → **API**
   - Copy your **Project URL** and **anon/public key**

### 3. Set Up Mapbox (Optional but Recommended)

1. **Create a Mapbox account** at [mapbox.com](https://mapbox.com) (free tier: 50k requests/month)

2. **Get your access token:**
   - Go to your [Mapbox account page](https://account.mapbox.com/)
   - Copy your **Default public token**

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Mapbox (Required for map features)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# OpenAI (Optional - for real AI analysis instead of mock data)
OPENAI_API_KEY=your_openai_api_key
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNs...
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create Your First Account

1. Click **Sign Up** on the landing page
2. Enter your email and password
3. Check your email for the confirmation link (if email confirmation is enabled in Supabase)
4. Sign in and start using EstateIQ!

---

## 📋 What You Get

### ✅ Fully Implemented Features

- **🔐 Authentication**
  - Email/password signup and login
  - Magic link (passwordless) authentication
  - Protected routes with middleware
  - Session management

- **🏠 Property Management**
  - Add properties with address geocoding
  - View properties on an interactive Mapbox map
  - Color-coded markers (green = appreciating, red = depreciating, yellow = neutral)
  - Property details sidebar

- **📊 AI Analysis Engine**
  - Run AI-powered property valuations
  - Get market trends, risk scores, and appreciation rates
  - View detailed analysis reports
  - Credit-based system (each analysis costs 1 credit)

- **📤 File Uploads**
  - Drag-and-drop file uploader
  - Support for CSV, Excel, PDF
  - Files stored in Supabase Storage
  - Upload history tracking

- **💳 Billing & Credits**
  - Credit system (20 free credits on signup)
  - Add credits functionality (UI ready, Stripe integration pending)
  - Credit tracking and usage logs

- **📈 Dashboard**
  - Overview of properties, uploads, and analyses
  - Recent reports and analytics activity
  - Quick access to map and analysis tools

- **🎨 Modern UI**
  - Clean, minimal design (Linear/Notion aesthetic)
  - Dark mode support
  - Fully responsive
  - Built with shadcn/ui components

### 🚧 Ready for Enhancement

- **OpenAI Integration**: Currently uses mock data. Replace the mock in `app/api/analyze/route.ts` with a real OpenAI API call.
- **Stripe Billing**: Credit purchase UI is ready; connect to Stripe for payments.
- **Email Notifications**: Supabase auth emails work; add custom notification emails if needed.

---

## 🗂️ Project Structure

```
├── app/
│   ├── (auth)/              # Auth routes (login, signup)
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── page.tsx        # Main dashboard
│   │   └── map/            # Map dashboard
│   ├── api/
│   │   └── analyze/        # AI analysis endpoint
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── auth/               # Auth components
│   ├── ui/                 # shadcn/ui components
│   ├── PropertyMap.tsx     # Mapbox map component
│   ├── MapSidebar.tsx      # Property list sidebar
│   ├── AddPropertyForm.tsx # Property creation form
│   ├── FileUploader.tsx    # File upload component
│   ├── UploadCard.tsx      # Upload UI card
│   ├── RunAnalysisCard.tsx # Analysis runner
│   └── AddCreditsDialog.tsx # Credits modal
├── lib/
│   └── supabase/           # Supabase client utilities
│       ├── client.ts       # Browser client
│       └── server.ts       # Server client
├── migrations/
│   └── 001_init.sql        # Database schema
├── docs/
│   └── roadmap.md         # Product roadmap
└── middleware.ts           # Route protection
```

---

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Maps**: Mapbox GL JS
- **File Uploads**: Supabase Storage
- **Deployment**: Vercel-ready

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel's dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all the same variables from `.env.local` to your Vercel project settings.

---

## 🔒 Security Notes

- **RLS Policies**: Supabase uses Row Level Security. Make sure to set up RLS policies in your Supabase dashboard to restrict data access by user.
- **API Keys**: Never commit `.env.local` to git. It's already in `.gitignore`.
- **Supabase Service Role**: Keep your service role key secret and never expose it to the client.

---

## 📝 Database Schema

The migration creates 5 main tables:

- `uploads` - File upload metadata
- `properties` - Property listings with geocoded coordinates
- `analyses` - AI analysis results
- `analytics_logs` - Usage tracking
- `billing` - User credits and subscription plans

See `migrations/001_init.sql` for full schema details.

---

## 🐛 Troubleshooting

### "Module not found" errors
- Run `npm install` to ensure all dependencies are installed
- Make sure you're using Node.js 18+

### Map not loading
- Check that `NEXT_PUBLIC_MAPBOX_TOKEN` is set in `.env.local`
- Restart your dev server after adding the token

### Database errors
- Ensure you've run the migration in Supabase SQL Editor
- Check that your Supabase URL and anon key are correct

### Auth not working
- Verify Supabase project settings
- Check that email confirmation is configured correctly in Supabase Auth settings

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Mapbox Documentation](https://docs.mapbox.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## 📄 License

MIT

---

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

**Built with ❤️ using Next.js, Supabase, and Mapbox**
