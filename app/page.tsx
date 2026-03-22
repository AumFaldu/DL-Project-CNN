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
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setResult(null)

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile))
    } else {
      setPreview(null)
    }
  }

  const handleDetect = async () => {
    if (!file) return
    setLoading(true)
    setResult(null)

    try {
      // Convert file → Base64
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
      })

      // Call Next API
      const res = await fetch("/api/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      })

      if (!res.ok) throw new Error("Detection failed on server")

      const data = await res.json()

      // ⭐ New Gradio response
      if (data.output) {
        const output = data.output

        const finalImage = output.startsWith("data:image")
          ? output
          : `data:image/png;base64,${output}`

        setResult(finalImage)
      }

    } catch (err) {
      console.error(err)
      alert("Something went wrong during detection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Traffic Sign Recognition
        </h1>
        <p className="text-muted-foreground">
          Upload an image to detect and classify traffic signs using YOLOv8.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="overflow-hidden">
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />

            {preview && (
              <div className="relative mt-4 rounded-lg overflow-hidden border bg-muted aspect-video flex items-center justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-contain w-full h-full"
                />
              </div>
            )}

            <Button
              onClick={handleDetect}
              className="w-full"
              disabled={!file || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Run Detection"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Detection Result
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] bg-muted/30">
            {result ? (
              <div className="rounded-lg overflow-hidden border bg-background w-full h-full">
                <img
                  src={result}
                  alt="Result"
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <div className="text-center p-6">
                <p className="text-muted-foreground italic">
                  {loading
                    ? "Analyzing image..."
                    : "Processed image will appear here."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
