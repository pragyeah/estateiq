"use client"

import { Button } from "@/components/ui/button"

type SidebarProperty = {
  id: string
  address: string | null
  last_valuation: number | null
  appreciation_rate: number | null
}

interface MapSidebarProps {
  properties: SidebarProperty[]
  selectedId?: string | null
  onSelect: (id: string) => void
}

export function MapSidebar({ properties, selectedId, onSelect }: MapSidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col gap-3 rounded-xl border bg-card p-3 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          My properties
        </p>
        <span className="text-xs text-muted-foreground">{properties.length}</span>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto">
        {properties.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No properties yet. Add one to see it on the map.
          </p>
        ) : (
          properties.map((p) => {
            const rate = p.appreciation_rate ?? 0
            const color =
              rate > 0.5 ? "bg-emerald-500/15 text-emerald-500" : rate < -0.5 ? "bg-rose-500/15 text-rose-500" : "bg-amber-500/15 text-amber-500"

            return (
              <Button
                key={p.id}
                variant={p.id === selectedId ? "secondary" : "ghost"}
                size="sm"
                className="flex h-auto w-full flex-col items-start gap-1 px-2 py-2"
                onClick={() => onSelect(p.id)}
              >
                <span className="line-clamp-1 text-left text-xs font-medium">
                  {p.address ?? "Untitled property"}
                </span>
                <span className="flex w-full items-center justify-between text-[11px] text-muted-foreground">
                  <span>
                    {p.last_valuation != null ? `$${p.last_valuation.toLocaleString()}` : "No valuation"}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] ${color}`}>
                    {rate > 0 ? `+${rate.toFixed(1)}%` : `${rate.toFixed(1)}%`}
                  </span>
                </span>
              </Button>
            )
          })
        )}
      </div>
    </aside>
  )
}


