"use client";

import { useState } from "react";

export default function About() {
  const modelImages = [
    { src: "/BoxF1_curve.png", alt: "F1 Curve" },
    { src: "/BoxPR_curve.png", alt: "Precision-Recall Curve" },
    { src: "/BoxP_curve.png", alt: "Precision Curve" },
    { src: "/BoxR_curve.png", alt: "Recall Curve" },
    { src: "/confusion_matrix.png", alt: "Confusion Matrix" },
    { src: "/confusion_matrix_normalized.png", alt: "Normalized Confusion Matrix" },
    { src: "/labels.jpg", alt: "Labels" },
    { src: "/results.png", alt: "Results" },
  ];

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Class-wise metrics
  const classMetrics = [
    { name: "Car", precision: 0.751, recall: 0.719, mAP50: 0.756 },
    { name: "Person", precision: 0.789, recall: 0.491, mAP50: 0.581 },
    { name: "Autorickshaw", precision: 0.779, recall: 0.593, mAP50: 0.667 },
    { name: "Truck", precision: 0.782, recall: 0.774, mAP50: 0.819 },
    { name: "Bus", precision: 0.867, recall: 0.767, mAP50: 0.828 },
    { name: "Motorcycle", precision: 0.782, recall: 0.678, mAP50: 0.719 },
    { name: "Bicycle", precision: 0.575, recall: 0.27, mAP50: 0.305 },
    { name: "Animal", precision: 0.663, recall: 0.192, mAP50: 0.26 },
    { name: "Vehicle_fallback", precision: 0.491, recall: 0.099, mAP50: 0.115 },
  ];

  // Additional model details
  const modelDetails = [
    { label: "Optimizer", value: "AdamW" },
    { label: "Learning Rate", value: "0.001" },
    { label: "Loss Function", value: "Cross-Entropy + CIoU" },
    { label: "Training Augmentations", value: "Flip, Rotate, Color Jitter, Mosaic" },
    { label: "Layers", value: "YOLOv8s with 130 layers" },
    { label: "Training Cache", value: "Enabled for faster data loading" },
    { label: "Framework", value: "PyTorch 2.1 + Ultralytics YOLOv8" },
    { label: "Precision", value: "FP16 mixed precision" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">About Our Project</h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Learn more about our deep learning project for traffic sign detection.
        </p>
      </section>

      {/* About Content Section */}
      <section className="py-24 px-6 md:px-20 space-y-16">
        {/* Project Overview */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:space-x-12 space-y-8 md:space-y-0">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              This project leverages deep learning (YOLOv8) to detect traffic signs in real-time images.
              Users can upload an image and instantly get predictions showing detected traffic signs.
              The system is designed to demonstrate practical applications of computer vision in road safety.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-2">Real-Time Detection</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Detect traffic signs quickly and accurately from any image.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Simple upload and predict workflow for easy interaction.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Works seamlessly on desktop and mobile devices with responsive design.
              </p>
            </div>
          </div>
        </div>

        {/* Model Training Details */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Model Training Details</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
            Key parameters and dataset used to train our traffic sign detection model.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Dataset</h3>
              <p>IDD_Detection</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Epochs</h3>
              <p>30</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Batch Size</h3>
              <p>4</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Optimizer</h3>
              <p>AdamW</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Input Image Size</h3>
              <p>640×640</p>
            </div>
          </div>
        </div>

        {/* Model Insights */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Model Insights</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12">
            Visualizations and performance metrics from our traffic sign detection model.
            Click an image to enlarge.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
            {modelImages.map((img) => (
              <div
                key={img.src}
                className="border rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:scale-105 transition cursor-pointer"
                onClick={() => setLightboxImage(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="object-contain w-full h-[400px]"
                />
                <p className="p-2 text-center text-gray-700 dark:text-gray-300">{img.alt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Class-wise Performance */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Class-wise Performance (mAP50)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600 rounded-lg">
              <thead className="bg-gray-200 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left">Class</th>
                  <th className="px-4 py-2">Precision</th>
                  <th className="px-4 py-2">Recall</th>
                  <th className="px-4 py-2">mAP50</th>
                </tr>
              </thead>
              <tbody>
                {classMetrics.map((cls) => (
                  <tr key={cls.name} className="border-t border-gray-300 dark:border-gray-600">
                    <td className="px-4 py-2">{cls.name}</td>
                    <td className="px-4 py-2 text-center">{cls.precision.toFixed(3)}</td>
                    <td className="px-4 py-2 text-center">{cls.recall.toFixed(3)}</td>
                    <td className="px-4 py-2 text-center">{cls.mAP50.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Model Details */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Additional Model Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            {modelDetails.map((detail) => (
              <div key={detail.label} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold mb-2">{detail.label}</h3>
                <p>{detail.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About the Developer */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:space-x-12 space-y-8 md:space-y-0 mt-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">About the Developer</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              This project is developed by Aum Faldu, an undergraduate computer science student
              passionate about AI, deep learning, and full-stack development. The project demonstrates
              practical use of modern deep learning techniques for real-world applications.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Enlarged model visualization"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 text-center bg-gray-200 dark:bg-gray-800 mt-auto">
        <p className="text-gray-700 dark:text-gray-300">
          &copy; {new Date().getFullYear()} DL Project. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
