"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2, Upload, ImageIcon, TrafficCone, AlertCircle } from "lucide-react"

export default function TrafficSignDetector() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
      if (result) URL.revokeObjectURL(result)
    }
  }, [preview, result])

  const handleFile = (selected: File | null) => {
    if (!selected) return
    setFile(selected)
    setResult(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(selected))
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile?.type.startsWith("image/")) {
      handleFile(droppedFile)
    }
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

      if (!response.ok) throw new Error("Detection failed")

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      setResult(imageUrl)
    } catch (error) {
      console.error(error)
      alert("Detection failed. The free-tier server might be waking up. Please try again in a few seconds!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-2xl mb-2">
            <TrafficCone className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Traffic Sign AI
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Powered by YOLOv8. Upload a road photo to instantly identify and classify traffic signage with high precision.
          </p>
        </header>

        <main className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column: Upload */}
          <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 flex items-center gap-3">
              <Upload className="w-5 h-5 text-blue-500" />
              <h2 className="font-bold text-xl text-slate-800">Input Image</h2>
            </div>

            <div className="p-8 space-y-6 flex-1 flex flex-col">
              {/* Drag & Drop Area */}
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all duration-200 flex flex-col items-center justify-center min-h-[300px] overflow-hidden
                  ${isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/50'}
                `}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFile(e.target.files?.[0] || null)}
                />

                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain absolute inset-0 p-2" />
                ) : (
                  <div className="text-center p-6">
                    <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium text-sm">Click or drag image to upload</p>
                    <p className="text-slate-400 text-xs mt-1">Supports JPG, PNG, WEBP</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleDetect}
                disabled={!file || loading}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-3
                  ${!file || loading 
                    ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-200 hover:-translate-y-0.5'}
                `}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Signs...</span>
                  </>
                ) : (
                  <span>Run Detection</span>
                )}
              </button>
            </div>
          </section>

          {/* Right Column: Result */}
          <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-indigo-500" />
              <h2 className="font-bold text-xl text-slate-800">Detection Result</h2>
            </div>

            <div className="p-8 flex-1 flex flex-col items-center justify-center bg-slate-50/30">
              {result ? (
                <div className="relative group animate-in fade-in zoom-in duration-300">
                   <img
                    src={result}
                    className="rounded-2xl border border-slate-200 shadow-2xl max-h-[450px] w-full object-contain bg-black"
                    alt="Processed detection"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Processed Successfully
                  </div>
                </div>
              ) : (
                <div className="text-center max-w-[240px] space-y-4">
                  <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-300">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 font-medium">No results yet</p>
                    <p className="text-slate-400 text-xs leading-relaxed italic">
                      {loading ? "Our neural network is mapping the boxes..." : "Upload an image on the left and click 'Run Detection'"}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Server Alert (Conditional) */}
            <div className="px-8 pb-8">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-xs text-amber-700 leading-snug">
                  <b>Note:</b> The backend is hosted on a free Render instance. If it hasn't been used recently, the first request may take up to 50 seconds to boot the server.
                </p>
              </div>
            </div>
          </section>

        </main>

        <footer className="text-center text-slate-400 text-sm">
          Built with React, Tailwind CSS, and YOLOv8
        </footer>
      </div>
    </div>
  )
}
