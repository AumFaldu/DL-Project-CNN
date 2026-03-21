"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDetect = async () => {
    if (!file) return
    setLoading(true)
    setResult(null)

    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await fetch(
        "https://huggingface.co/spaces/AumFaldu/traffic-sign-recognition-backend/predict/image",
        { method: "POST", body: formData }
      )
      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText || "Prediction failed")
      }

      const blob = await res.blob()
      setResult(URL.createObjectURL(blob))
    } catch (err: any) {
      alert("Error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8">
      {/* Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Traffic Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700"
          />
          <Button onClick={handleDetect} disabled={loading || !file}>
            {loading ? "Detecting..." : "Detect"}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Result */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Prediction Result</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={result} alt="Prediction" className="border rounded w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}