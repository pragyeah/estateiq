import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCard } from "@/components/UploadCard"
import { RunAnalysisCard } from "@/components/RunAnalysisCard"
import LogoutButton from "@/components/auth/logout-button"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">EstateIQ</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Overview
            </p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight">Dashboard</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome back, {user.email}. Manage uploads, analyses, and your portfolio in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/map">Open map</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="space-y-4">
            {/* UploadCard is a client component but can receive serializable props from a Server Component */}
            <UploadCard userId={user.id} />
            {/* Client component to trigger AI analysis via /api/analyze */}
            <RunAnalysisCard userId={user.id} />
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Properties map</CardTitle>
                <CardDescription>
                  Visualize your portfolio with color-coded appreciation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Open the interactive map to explore properties by neighborhood, trend, and risk.
                </p>
                <Button asChild size="sm" className="w-full">
                  <Link href="/dashboard/map">Open map dashboard</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Credits</CardTitle>
                <CardDescription>
                  Each AI analysis costs 1 credit. Top up before you run out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Available credits</span>
                  <span className="font-medium">20</span>
                </div>
                <Button size="sm" variant="outline" disabled className="w-full">
                  Add credits (coming soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Recent reports</CardTitle>
              <CardDescription>
                The latest AI analyses across your properties.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                No reports yet. Upload data and run your first analysis to see results here.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Analytics activity</CardTitle>
              <CardDescription>
                A log of AI usage and portfolio events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                No analytics yet. Actions like running analyses and creating properties will appear here.
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

