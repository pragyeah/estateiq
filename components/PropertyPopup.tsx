"use client"

import { Button } from "@/components/ui/button"

interface PropertyPopupProps {
  address: string | null
  beds: number | null
  baths: number | null
  sqft: number | null
  lastValuation: number | null
  appreciationRate: number | null
  onViewAnalysis?: () => void
}

export function PropertyPopup({
  address,
  beds,
  baths,
  sqft,
  lastValuation,
  appreciationRate,
  onViewAnalysis,
}: PropertyPopupProps) {
  return (
    <div className="space-y-2 text-xs">
      <div>
        <p className="font-medium text-sm">{address ?? "Untitled property"}</p>
        <p className="text-[11px] text-muted-foreground">
          {beds ?? "–"} bd • {baths ?? "–"} ba • {sqft ? `${sqft.toLocaleString()} sqft` : "– sqft"}
        </p>
      </div>
      <div className="space-y-1 text-[11px]">
        <p>
          Last valuation:{" "}
          <span className="font-medium">
            {lastValuation != null ? `$${lastValuation.toLocaleString()}` : "Not available"}
          </span>
        </p>
        <p>
          Appreciation:{" "}
          <span className="font-medium">
            {appreciationRate != null ? `${appreciationRate.toFixed(2)}%` : "Not available"}
          </span>
        </p>
      </div>
      {onViewAnalysis && (
        <Button size="sm" className="w-full" onClick={onViewAnalysis}>
          View full analysis
        </Button>
      )}
    </div>
  )
}


