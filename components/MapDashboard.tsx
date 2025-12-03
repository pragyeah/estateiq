"use client"

import { useState } from "react"
import { MapSidebar } from "@/components/MapSidebar"
import { PropertyMap } from "@/components/PropertyMap"
import { AddPropertyForm } from "@/components/AddPropertyForm"

type MapProperty = {
  id: string
  address: string | null
  price: number | null
  beds: number | null
  baths: number | null
  sqft: number | null
  latitude: number | null
  longitude: number | null
  last_valuation: number | null
  appreciation_rate: number | null
}

interface MapDashboardProps {
  userId: string
  properties: MapProperty[]
}

export function MapDashboard({ userId, properties }: MapDashboardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    properties[0]?.id ?? null
  )

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-4 px-4 py-4 lg:flex-row">
      <div className="flex w-full flex-col gap-4 lg:w-[320px]">
        <MapSidebar
          properties={properties}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        <div className="rounded-xl border bg-card p-3">
          <AddPropertyForm userId={userId} />
        </div>
      </div>
      <div className="h-[480px] flex-1 rounded-xl border bg-card lg:h-[calc(100vh-7rem)]">
        <PropertyMap
          properties={properties}
          onSelectProperty={handleSelect}
        />
      </div>
    </main>
  )
}


