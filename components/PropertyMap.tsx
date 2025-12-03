"use client"

import { useEffect, useMemo, useRef } from "react"
import mapboxgl from "mapbox-gl"

type BasicProperty = {
  id: string
  address: string | null
  latitude: number | null
  longitude: number | null
  last_valuation: number | null
  appreciation_rate: number | null
  beds: number | null
  baths: number | null
  sqft: number | null
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

interface PropertyMapProps {
  properties: BasicProperty[]
  onSelectProperty?: (id: string) => void
}

export function PropertyMap({ properties, onSelectProperty }: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  const center = useMemo(() => {
    const withCoords = properties.filter(
      (p) => typeof p.latitude === "number" && typeof p.longitude === "number"
    )
    if (!withCoords.length) {
      return { lng: -98.5795, lat: 39.8283, zoom: 3 } // US center
    }
    const lat = withCoords.reduce((acc, p) => acc + (p.latitude || 0), 0) / withCoords.length
    const lng = withCoords.reduce((acc, p) => acc + (p.longitude || 0), 0) / withCoords.length
    return { lng, lat, zoom: 9 }
  }, [properties])

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !mapboxgl.accessToken) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [center.lng, center.lat],
      zoom: center.zoom,
    })

    map.addControl(new mapboxgl.NavigationControl(), "top-right")
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [center.lat, center.lng, center.zoom])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const markers: mapboxgl.Marker[] = []
    let popup: mapboxgl.Popup | null = null

    properties.forEach((property) => {
      if (typeof property.latitude !== "number" || typeof property.longitude !== "number") return

      const rate = property.appreciation_rate ?? 0
      const color =
        rate > 0.5 ? "#22c55e" : rate < -0.5 ? "#f43f5e" : "#eab308" // green / red / yellow

      const el = document.createElement("div")
      el.className = "rounded-full shadow-md ring-2 ring-white"
      el.style.backgroundColor = color
      el.style.width = "14px"
      el.style.height = "14px"

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([property.longitude!, property.latitude!])
        .addTo(map)

      el.onclick = () => {
        if (onSelectProperty) onSelectProperty(property.id)

        if (popup) {
          popup.remove()
        }

        const html = `
          <div style="font-size:12px;max-width:220px">
            <div style="font-weight:600;margin-bottom:2px">${property.address ?? "Untitled property"}</div>
            <div style="color:#6b7280;margin-bottom:4px">
              ${property.beds ?? "–"} bd • ${property.baths ?? "–"} ba • ${
          property.sqft ? `${property.sqft.toLocaleString()} sqft` : "– sqft"
        }
            </div>
            <div style="margin-bottom:4px">
              <div>Last valuation: <strong>${
                property.last_valuation != null
                  ? `$${property.last_valuation.toLocaleString()}`
                  : "Not available"
              }</strong></div>
              <div>Appreciation: <strong>${
                property.appreciation_rate != null
                  ? `${property.appreciation_rate.toFixed(2)}%`
                  : "Not available"
              }</strong></div>
            </div>
            <div style="margin-top:4px;font-size:11px;">
              <span style="display:inline-block;padding:4px 8px;border-radius:999px;border:1px solid #e5e7eb;cursor:default;">
                View full analysis
              </span>
            </div>
          </div>
        `

        popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat([property.longitude!, property.latitude!])
          .setHTML(html)
          .addTo(map)
      }

      markers.push(marker)
    })

    return () => {
      markers.forEach((m) => m.remove())
      if (popup) popup.remove()
    }
  }, [properties, onSelectProperty])

  return (
    <div className="h-full w-full rounded-xl border bg-card">
      <div ref={mapContainerRef} className="h-full w-full rounded-xl" />
    </div>
  )
}


