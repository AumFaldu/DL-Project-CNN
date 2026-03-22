"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (f: File | null) => {
    setFile(f)
    setResult(null)

    if (f) {
      setPreview(URL.createObjectURL(f))
    }
  }

  const handleDetect = async () => {
    if (!file) return
    setLoading(true)

    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const res = reader.result as string
        resolve(res.split(",")[1])
      }
      reader.onerror = reject
    })

    try {
      const res = await fetch("/api/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      })

      const data = await res.json()
      setResult(`data:image/png;base64,${data.data[0]}`)
    } catch (err: any) {
      alert("Detection failed")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Traffic Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />

          {preview && (
            <img src={preview} className="rounded border max-h-72" />
          )}

          <Button onClick={handleDetect} disabled={!file || loading}>
            {loading ? "Detecting..." : "Detect"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Prediction Result</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={result} className="rounded border w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
