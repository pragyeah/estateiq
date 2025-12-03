import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MapDashboard } from "@/components/MapDashboard"
import { ThemeToggle } from "@/components/theme-toggle"
import LogoutButton from "@/components/auth/logout-button"

export default async function MapPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: properties } = await supabase
    .from("properties")
    .select(
      "id, address, price, beds, baths, sqft, latitude, longitude, last_valuation, appreciation_rate"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-semibold tracking-tight">EstateIQ · Map</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </header>
      <MapDashboard userId={user.id} properties={(properties ?? []) as any} />
    </div>
  )
}


