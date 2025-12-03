"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

interface AddPropertyFormProps {
  userId: string
  onCreated?: () => void
}

async function geocodeAddress(address: string): Promise<{ lat: number | null; lng: number | null }> {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  if (!token) return { lat: null, lng: null }

  const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`)
  url.searchParams.set("access_token", token)
  url.searchParams.set("limit", "1")

  const res = await fetch(url.toString())
  if (!res.ok) return { lat: null, lng: null }

  const data = await res.json()
  const feature = data.features?.[0]
  if (!feature || !Array.isArray(feature.center)) return { lat: null, lng: null }

  const [lng, lat] = feature.center
  return { lat: typeof lat === "number" ? lat : null, lng: typeof lng === "number" ? lng : null }
}

export function AddPropertyForm({ userId, onCreated }: AddPropertyFormProps) {
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { lat, lng } = await geocodeAddress(address)

      const { error: insertError } = await supabase.from("properties").insert({
        user_id: userId,
        address,
        latitude: lat,
        longitude: lng,
      })

      if (insertError) {
        setError(insertError.message)
      } else {
        setAddress("")
        if (onCreated) onCreated()
      }
    } catch (err) {
      setError("Failed to create property. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-sm">
      {error && (
        <p className="rounded-md bg-destructive/10 px-2 py-1 text-xs text-destructive">
          {error}
        </p>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="address">Add property by address</Label>
        <Input
          id="address"
          placeholder="123 Main St, City, State"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" size="sm" className="w-full" disabled={isLoading || !address.trim()}>
        {isLoading ? "Adding..." : "Add property"}
      </Button>
    </form>
  )
}


