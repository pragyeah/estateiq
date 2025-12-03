import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

type AnalyzePayload =
  | {
      property_id: string
      previous_valuation?: number | null
      last_valuation?: number | null
    }
  | {
      data: unknown
    }

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json().catch(() => null)) as AnalyzePayload | null
  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  // Basic credit check
  const { data: billing } = await supabase
    .from("billing")
    .select("id, credits")
    .eq("user_id", user.id)
    .maybeSingle()

  const credits = billing?.credits ?? 20
  if (credits <= 0) {
    return NextResponse.json(
      { error: "No credits remaining", code: "NO_CREDITS" },
      { status: 402 }
    )
  }

  // Placeholder: call to OpenAI would go here
  // AI Prompt:
  // You are an AI real estate analyst.
  //
  // Given property financials, historical rents, expenses, comps, market trends, tax data,
  // and uploaded documents, produce a structured analysis.
  //
  // Return JSON:
  // {
  //   "valuation_estimate": number,
  //   "valuation_confidence": number,
  //   "is_appreciating": boolean,
  //   "appreciation_reason": string,
  //   "appreciation_rate": number,
  //   "market_trend": string,
  //   "risk_score": number,
  //   "summary": string
  // }
  //
  // Focus on:
  // - historical income/rent changes
  // - comparable sales
  // - occupancy trends
  // - local economic indicators
  // - cap rate movement
  // - vacancy data
  // - neighborhood price momentum

  const mockValuation = 500000
  const mockPrev = "property_id" in body && body.previous_valuation != null ? body.previous_valuation : mockValuation * 0.95
  const appreciationRate =
    mockPrev && mockPrev !== 0 ? ((mockValuation - mockPrev) / mockPrev) * 100 : 0

  const aiOutput = {
    valuation_estimate: mockValuation,
    valuation_confidence: 0.82,
    is_appreciating: appreciationRate > 0,
    appreciation_reason:
      "Strong rent growth, low vacancy, and positive neighborhood price momentum.",
    appreciation_rate: appreciationRate,
    market_trend: appreciationRate > 0 ? "Upward" : "Flat",
    risk_score: 0.32,
    summary:
      "The property shows resilient cash flows and benefits from favorable market dynamics, suggesting continued moderate appreciation.",
  }

  let propertyId: string | null = null
  if ("property_id" in body && body.property_id) {
    propertyId = body.property_id
    await supabase
      .from("properties")
      .update({
        previous_valuation: mockPrev,
        last_valuation: aiOutput.valuation_estimate,
        appreciation_rate: aiOutput.appreciation_rate,
      })
      .eq("id", body.property_id)
      .eq("user_id", user.id)
  }

  const { data: analysis } = await supabase
    .from("analyses")
    .insert({
      user_id: user.id,
      property_id: propertyId,
      ai_output: aiOutput,
    })
    .select("id")
    .single()

  // Decrement credits
  if (billing?.id) {
    await supabase
      .from("billing")
      .update({ credits: credits - 1 })
      .eq("id", billing.id)
  } else {
    await supabase.from("billing").insert({
      user_id: user.id,
      plan: "free",
      credits: credits - 1,
    })
  }

  await supabase.from("analytics_logs").insert({
    user_id: user.id,
    action: "ai_analyze",
    metadata: {
      analysis_id: analysis?.id,
      property_id: propertyId,
      credits_before: credits,
      credits_after: credits - 1,
    },
  })

  return NextResponse.json({
    analysis_id: analysis?.id,
    ...aiOutput,
  })
}


