"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload, ImageIcon } from "lucide-react"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
      if (result) URL.revokeObjectURL(result)
    }
  }, [preview, result])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    setResult(null)

    if (preview) URL.revokeObjectURL(preview)
    setPreview(selected ? URL.createObjectURL(selected) : null)
  }

  const handleDetect = async () => {
    if (!file) return

    setLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch(
        "https://dl-project-cnn-backend.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error("Detection failed")
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)

      setResult(imageUrl)
    } catch (error) {
      console.error(error)
      alert("Detection failed. Server may be sleeping 😴 Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Traffic Sign Recognition
        </h1>
        <p className="text-muted-foreground">
          Upload an image to detect traffic signs using YOLOv8
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Image
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-background"
            />

            {preview && (
              <div className="rounded-lg overflow-hidden border bg-muted aspect-video flex items-center justify-center">
                <img
                  src={preview}
                  className="object-contain w-full h-full"
                  alt="preview"
                />
              </div>
            )}

            <Button
              onClick={handleDetect}
              disabled={!file || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Waking Server & Detecting...
                </>
              ) : (
                "Run Detection"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Detection Result
            </CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-center min-h-[320px] bg-muted/30 rounded-md border border-dashed mx-6 mb-6">
            {result ? (
              <img
                src={result}
                className="rounded-lg border shadow-sm object-contain max-h-[400px]"
                alt="result"
              />
            ) : (
              <p className="text-muted-foreground italic text-sm">
                {loading
                  ? "Model is analyzing image..."
                  : "Result image will appear here"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
