


"use client"

import { useState, useEffect, useCallback } from "react"
import { FileUploader } from "@/components/FileUploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

interface UploadCardProps {
  userId: string
}

type UploadRow = {
  id: string
  file_url: string
  file_type: string | null
  created_at: string
}

export function UploadCard({ userId }: UploadCardProps) {
  const [recentUploads, setRecentUploads] = useState<UploadRow[]>([])

  const refresh = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("uploads")
      .select("id, file_url, file_type, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5)

    setRecentUploads(data ?? [])
  }, [userId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">Upload data</CardTitle>
          <CardDescription>
            Drag and drop CSV, Excel, or PDF files to power AI analysis.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileUploader
          userId={userId}
          onUploaded={() => {
            void refresh()
          }}
        />
        <div className="space-y-1 text-xs text-muted-foreground">
          <p className="font-medium">Recent uploads</p>
          {recentUploads.length === 0 ? (
            <p>No uploads yet.</p>
          ) : (
            <ul className="space-y-1">
              {recentUploads.map((u) => (
                <li key={u.id} className="flex items-center justify-between">
                  <span className="line-clamp-1">{u.file_url}</span>
                  <span>{new Date(u.created_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


