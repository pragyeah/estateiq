"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

type AllowedFile = File & { preview?: string }

interface FileUploaderProps {
  userId: string
  onUploaded?: () => void
}

const ACCEPTED_TYPES = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
]

export function FileUploader({ userId, onUploaded }: FileUploaderProps) {
  const [files, setFiles] = useState<AllowedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filtered = acceptedFiles.filter((file) => ACCEPTED_TYPES.includes(file.type))
    setFiles(filtered as AllowedFile[])
    setError(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/pdf": [".pdf"],
    },
    multiple: true,
  })

  const handleUpload = async () => {
    if (!files.length) return
    setIsUploading(true)
    setError(null)

    try {
      const supabase = createClient()
      for (const file of files) {
        const path = `${userId}/${Date.now()}-${file.name}`
        const { data, error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(path, file)

        if (uploadError) {
          setError(uploadError.message)
          break
        }

        const fileType = file.type || "application/octet-stream"
        await supabase.from("uploads").insert({
          user_id: userId,
          file_url: data?.path,
          file_type: fileType,
        })
      }

      setFiles([])
      if (onUploaded) onUploaded()
    } catch (err) {
      setError("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-3 text-sm">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 py-6 text-center text-xs text-muted-foreground transition ${
          isDragActive ? "bg-primary/5" : "hover:bg-accent/40"
        }`}
      >
        <input {...getInputProps()} />
        <p className="font-medium">Drag and drop CSV, Excel, or PDF files</p>
        <p className="mt-1 text-[11px]">or click to browse from your device</p>
      </div>
      {error && (
        <p className="rounded-md bg-destructive/10 px-2 py-1 text-xs text-destructive">
          {error}
        </p>
      )}
      {files.length > 0 && (
        <ul className="space-y-1 text-xs text-muted-foreground">
          {files.map((file) => (
            <li key={file.name} className="flex items-center justify-between">
              <span className="line-clamp-1">{file.name}</span>
              <span>{Math.round(file.size / 1024)} KB</span>
            </li>
          ))}
        </ul>
      )}
      <Button
        type="button"
        size="sm"
        className="w-full"
        disabled={isUploading || files.length === 0}
        onClick={handleUpload}
      >
        {isUploading ? "Uploading..." : "Upload files"}
      </Button>
    </div>
  )
}


