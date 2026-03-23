"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://dl-project-cnn-backend.onrender.com/predict";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setInputImage(URL.createObjectURL(e.target.files[0]));
      setOutputImage(null);
    }
  };

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file); 

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();
      setOutputImage(`data:image/png;base64,${data.image}`);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">DL Project</h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Upload an image and get real-time predictions from your deep learning model.
        </p>
      </section>

      <section className="py-24 px-6 md:px-20 flex flex-col items-center space-y-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file:border file:border-gray-300 file:rounded-lg file:px-4 file:py-2 file:bg-white dark:file:bg-gray-700 file:text-gray-700 dark:file:text-gray-100 cursor-pointer"
        />

        {inputImage && (
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-semibold">Input Image:</h3>
            <img src={inputImage} alt="Input" className="max-w-xs rounded-lg shadow" />
          </div>
        )}

        <button
          onClick={handlePredict}
          disabled={!file || loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-lg shadow disabled:opacity-50 transition"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {outputImage && (
          <div className="flex flex-col items-center space-y-4 mt-6">
            <h3 className="text-xl font-semibold">Output Image:</h3>
            <img src={outputImage} alt="Prediction" className="max-w-xs rounded-lg shadow" />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center bg-gray-200 dark:bg-gray-800 mt-auto">
        <p className="text-gray-700 dark:text-gray-300">
          &copy; {new Date().getFullYear()} DL Project. All rights reserved.
        </p>
      </footer>
    </main>
  );
}