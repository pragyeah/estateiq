"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { AddCreditsDialog } from "@/components/AddCreditsDialog"

type PropertyOption = {
  id: string
  address: string | null
  last_valuation: number | null
}

interface RunAnalysisCardProps {
  userId: string
}

type AnalysisResult = {
  valuation_estimate: number
  valuation_confidence: number
  is_appreciating: boolean
  appreciation_rate: number
  market_trend: string
  risk_score: number
  summary: string
}

export function RunAnalysisCard({ userId }: RunAnalysisCardProps) {
  const [properties, setProperties] = useState<PropertyOption[]>([])
  const [selectedId, setSelectedId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [noCredits, setNoCredits] = useState(false)
  const [credits, setCredits] = useState<number | null>(null)

  const loadData = useCallback(async () => {
    const supabase = createClient()
    const [{ data: props }, { data: billing }] = await Promise.all([
      supabase
        .from("properties")
        .select("id, address, last_valuation")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      supabase.from("billing").select("credits").eq("user_id", userId).maybeSingle(),
    ])

    setProperties(props ?? [])
    setCredits(billing?.credits ?? 20)
    setSelectedId((current) => {
      if (!current && props && props.length) {
        return props[0].id
      }
      return current
    })
  }, [userId])

  useEffect(() => {
    void loadData()
  }, [loadData])

  const handleRun = async () => {
    if (!selectedId) return
    setIsLoading(true)
    setError(null)
    setResult(null)
    setNoCredits(false)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: selectedId }),
      })

      const json = await res.json()
      if (!res.ok) {
        if (json.code === "NO_CREDITS") {
          setNoCredits(true)
        } else {
          setError(json.error ?? "Analysis failed")
        }
        return
      }

      setResult({
        valuation_estimate: json.valuation_estimate,
        valuation_confidence: json.valuation_confidence,
        is_appreciating: json.is_appreciating,
        appreciation_rate: json.appreciation_rate,
        market_trend: json.market_trend,
        risk_score: json.risk_score,
        summary: json.summary,
      })
      void loadData()
    } catch (e) {
      setError("Analysis failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">Run analysis</CardTitle>
          <CardDescription>
            Use AI to generate valuations, risk, and market trend insights.
          </CardDescription>
        </div>
        <Button size="sm" onClick={handleRun} disabled={isLoading || !selectedId}>
          {isLoading ? "Running..." : "Run analysis"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {credits != null && (
          <p className="text-xs text-muted-foreground">
            Credits remaining: <span className="font-medium">{credits}</span>
          </p>
        )}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground" htmlFor="property">
            Property
          </label>
          <select
            id="property"
            className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">Select a property</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.address ?? "Untitled property"}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-muted-foreground">
            1 credit per analysis. Attach supporting documents via the upload panel for richer results.
          </p>
        </div>

        {error && (
          <p className="rounded-md bg-destructive/10 px-2 py-1 text-xs text-destructive">
            {error}
          </p>
        )}

        {noCredits && (
          <p className="rounded-md bg-amber-500/10 px-2 py-1 text-xs text-amber-600">
            You’re out of credits. Add more to continue running analyses.
          </p>
        )}

        {result && (
          <div className="mt-2 space-y-1 rounded-md border bg-muted/40 p-3 text-xs">
            <p className="font-medium">Latest result</p>
            <p>
              Valuation:{" "}
              <span className="font-semibold">
                ${result.valuation_estimate.toLocaleString()}
              </span>{" "}
              · {Math.round(result.valuation_confidence * 100)}% confidence
            </p>
            <p>
              Trend: <span className="font-semibold">{result.market_trend}</span> ·{" "}
              {result.appreciation_rate.toFixed(2)}% appreciation · Risk{" "}
              {Math.round(result.risk_score * 100)} / 100
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">{result.summary}</p>
          </div>
        )}

        {noCredits && (
          <div className="pt-1">
            <AddCreditsDialog
              userId={userId}
              onUpdated={() => {
                void loadData()
                setNoCredits(false)
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}


