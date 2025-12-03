"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"

interface AddCreditsDialogProps {
  userId: string
  onUpdated?: () => void
}

export function AddCreditsDialog({ userId, onUpdated }: AddCreditsDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddCredits = async () => {
    setIsLoading(true)
    const supabase = createClient()

    const { data: billing } = await supabase
      .from("billing")
      .select("id, credits")
      .eq("user_id", userId)
      .maybeSingle()

    const current = billing?.credits ?? 0

    if (billing?.id) {
      await supabase.from("billing").update({ credits: current + 20 }).eq("id", billing.id)
    } else {
      await supabase.from("billing").insert({
        user_id: userId,
        plan: "free",
        credits: current + 20,
      })
    }

    setIsLoading(false)
    setOpen(false)
    if (onUpdated) onUpdated()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="w-full">
          Add credits
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add analysis credits</DialogTitle>
          <DialogDescription>
            Billing is not connected yet. For now, you can simulate purchasing credits to continue
            testing EstateIQ.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 text-sm">
          <p>You’ll receive an additional 20 credits on your account.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddCredits} disabled={isLoading}>
            {isLoading ? "Adding..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


