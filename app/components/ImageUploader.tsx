"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [inputImage, setInputImage] = useState<string | null>(null); // preview
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setInputImage(URL.createObjectURL(selectedFile));
      setOutputImage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Server-side fetch via Next.js API route
      const res = await fetch("/api/predict", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();
      setOutputImage(`data:image/png;base64,${data.image}`);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* File input */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* Input image preview */}
      {inputImage && (
        <div className="flex flex-col items-center space-y-2">
          <h3 className="font-semibold">Input Image:</h3>
          <img src={inputImage} alt="Input Preview" className="max-w-xs rounded shadow" />
        </div>
      )}

      {/* Upload / Predict button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {/* Output image preview */}
      {outputImage && (
        <div className="flex flex-col items-center space-y-2 mt-4">
          <h3 className="font-semibold">Output Image:</h3>
          <img src={outputImage} alt="Prediction" className="max-w-xs rounded shadow" />
        </div>
      )}
    </div>
  );
}
