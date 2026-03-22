"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload, ImageIcon } from "lucide-react"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    setResult(null)
    // Clean up old object URLs to avoid memory leaks
    if (preview) URL.revokeObjectURL(preview)
    setPreview(selected ? URL.createObjectURL(selected) : null)
  }

  const handleDetect = async () => {
    if (!file) return

    setLoading(true)
    setResult(null)

    try {
      const form = new FormData()
      form.append("file", file)

      // Using the relative path since your API is now verified at /api/detect
      const res = await fetch("/api/detect", {
        method: "POST",
        body: form,
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.details || "Detection failed on server")
      }

      const data = await res.json()
      
      /**
       * Gradio Response Handling:
       * Usually data looks like: { data: [ { url: "...", name: "..." } ] }
       * or sometimes just: { data: [ "https://url-to-image.png" ] }
       */
      if (data?.data?.[0]) {
        const output = data.data[0]
        let finalUrl = ""

        if (typeof output === "object" && output.url) {
          finalUrl = output.url
        } else if (typeof output === "string") {
          finalUrl = output
        }

        // Fix for relative URLs: If it doesn't start with http, prefix with the HF Space origin
        if (finalUrl && !finalUrl.startsWith("http")) {
          finalUrl = `https://aumfaldu-traffic-sign-recognition-backend.hf.space/file=${finalUrl}`
        }

        setResult(finalUrl)
      } else {
        throw new Error("No detection data received from the model.")
      }
    } catch (err: any) {
      console.error("Detection Error:", err)
      alert(err.message || "Something went wrong during detection.")
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
        {/* Upload Card */}
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
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium"
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
                  Detecting...
                </>
              ) : (
                "Run Detection"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result Card */}
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
                onError={() => alert("Failed to load result image. Check if Gradio Space is active.")}
              />
            ) : (
              <div className="text-center space-y-2">
                <p className="text-muted-foreground italic text-sm">
                  {loading
                    ? "Model is analyzing image..."
                    : "Result image will appear here"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
