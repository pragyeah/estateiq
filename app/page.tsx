import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-background">
      <header className="border-b bg-background/60 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-[#0A84FF] shadow-sm" />
            <span className="text-lg font-semibold tracking-tight">EstateIQ</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-16">
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 bg-zinc-50 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              AI-powered insights for serious property owners
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                AI-Powered Real Estate Intelligence for Property Owners
              </h1>
              <p className="max-w-xl text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
                Upload your data. Get instant valuations, trends, and insights across your entire portfolio—
                powered by AI, mapped with precision.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Free plan includes 20 analysis credits. No card required.
              </p>
            </div>

            <div className="grid gap-4 text-sm text-zinc-600 dark:text-zinc-300 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200/60 bg-white/40 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
                <p className="text-xs font-medium text-zinc-500">Smart Valuation</p>
                <p className="mt-2 text-sm">AI-driven pricing using rents, expenses, comps, and market data.</p>
              </div>
              <div className="rounded-xl border border-zinc-200/60 bg-white/40 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
                <p className="text-xs font-medium text-zinc-500">Market Trend AI</p>
                <p className="mt-2 text-sm">See appreciation, risk, and neighborhood momentum at a glance.</p>
              </div>
              <div className="rounded-xl border border-zinc-200/60 bg-white/40 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
                <p className="text-xs font-medium text-zinc-500">Geomap Tracking</p>
                <p className="mt-2 text-sm">Visualize your portfolio on a live map with color-coded signals.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-[#0A84FF]/20 via-emerald-500/10 to-rose-500/20 blur-3xl" />
            <div className="relative rounded-3xl border border-zinc-200/70 bg-zinc-50/70 p-4 shadow-xl shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="flex items-center justify-between border-b border-zinc-200/80 px-3 pb-3 pt-1 text-xs text-zinc-500 dark:border-zinc-800">
                <span>Portfolio Overview</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                  Live demo
                </span>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl bg-white p-3 dark:bg-zinc-900">
                    <p className="text-[11px] text-zinc-500">Portfolio value</p>
                    <p className="mt-1 text-base font-semibold">$12.4M</p>
                    <p className="mt-1 text-[11px] text-emerald-500">+6.2% YoY</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 dark:bg-zinc-900">
                    <p className="text-[11px] text-zinc-500">Avg. cap rate</p>
                    <p className="mt-1 text-base font-semibold">5.4%</p>
                    <p className="mt-1 text-[11px] text-zinc-400">Stable</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 dark:bg-zinc-900">
                    <p className="text-[11px] text-zinc-500">Occupancy</p>
                    <p className="mt-1 text-base font-semibold">97%</p>
                    <p className="mt-1 text-[11px] text-emerald-500">Healthy</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-zinc-200/80 bg-zinc-100/60 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900/60">
                  <p className="mb-2 text-[11px] font-medium text-zinc-500">
                    Example insight
                  </p>
                  <p className="text-[11px] text-zinc-700 dark:text-zinc-200">
                    “Downtown multifamily units are appreciating at{" "}
                    <span className="font-semibold text-emerald-500">7.8% annually</span> driven by tech job
                    growth and sub-5% vacancy. Consider refinancing in the next 6–9 months.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Pricing for every kind of owner
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Start free and scale into Pro or Enterprise as your portfolio grows.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 text-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <p className="text-xs font-medium text-zinc-500">Free</p>
              <p className="mt-2 text-2xl font-semibold">$0</p>
              <p className="mt-1 text-xs text-zinc-500">20 analysis credits</p>
              <div className="mt-4 space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                <p>• Up to 10 properties</p>
                <p>• Basic AI valuations</p>
                <p>• CSV & PDF uploads</p>
              </div>
            </div>
            <div className="relative flex flex-col rounded-2xl border border-[#0A84FF] bg-[#0A84FF]/5 p-6 text-sm shadow-sm shadow-[#0A84FF]/30 dark:bg-[#0A84FF]/10">
              <div className="absolute right-4 top-4 rounded-full bg-[#0A84FF] px-2 py-0.5 text-[10px] font-medium text-white">
                Most popular
              </div>
              <p className="text-xs font-medium text-[#0A84FF]">Pro</p>
              <p className="mt-2 text-2xl font-semibold">$49/mo</p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-200">Unlimited properties, 200 credits</p>
              <div className="mt-4 space-y-2 text-xs text-zinc-700 dark:text-zinc-100">
                <p>• Advanced AI insights</p>
                <p>• Map-based portfolio tracking</p>
                <p>• Valuation history & logs</p>
              </div>
            </div>
            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 text-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <p className="text-xs font-medium text-zinc-500">Enterprise</p>
              <p className="mt-2 text-2xl font-semibold">Let’s talk</p>
              <p className="mt-1 text-xs text-zinc-500">Custom credits & SLAs</p>
              <div className="mt-4 space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                <p>• Teams & roles</p>
                <p>• API & data exports</p>
                <p>• Dedicated success partner</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background/60 py-6 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 md:flex-row">
          <p>© {new Date().getFullYear()} EstateIQ. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="mailto:founder@example.com" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Contact
            </a>
            <Link href="/login" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
