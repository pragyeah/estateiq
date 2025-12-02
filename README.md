# EstateIQ - Real Estate Intelligence Platform

A full-stack real estate intelligence platform built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and Supabase.

## Features

- 🔐 Authentication (Email/Password + Magic Link)
- 🎨 Modern UI with dark mode support
- 📱 Responsive design
- 🛡️ Protected routes with middleware
- ⚡ Server-side rendering with Next.js 14 App Router

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase account and project

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your Supabase project:

   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── dashboard/      # Protected dashboard route
│   ├── login/          # Login page
│   ├── signup/         # Signup page
│   ├── logout/         # Logout route
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── auth/           # Authentication components
│   ├── ui/             # shadcn/ui components
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── utils/
│   └── supabase/       # Supabase client utilities
├── lib/
│   └── utils.ts        # Utility functions
└── middleware.ts       # Route protection middleware
```

## Authentication

The platform supports two authentication methods:

1. **Email/Password**: Traditional email and password authentication
2. **Magic Link**: Passwordless authentication via email link

## Routes

- `/` - Home page (redirects to dashboard if authenticated)
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Protected dashboard (requires authentication)
- `/logout` - Logout route

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database & Auth**: Supabase
- **Deployment**: Vercel (ready)

## License

MIT

