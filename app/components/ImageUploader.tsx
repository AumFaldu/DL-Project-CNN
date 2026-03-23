"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    // This fetch goes to a **Next.js server API route**
    const res = await fetch("/api/predict", { method: "POST", body: formData });
    const data = await res.json();
    setOutputImage(`data:image/png;base64,${data.image}`);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>
      {outputImage && <img src={outputImage} alt="Prediction" />}
    </div>
  );
}