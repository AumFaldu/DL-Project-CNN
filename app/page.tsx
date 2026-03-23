import ImageUploader from "./components/ImageUploader";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Traffic Sign Detection</h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Upload an image and get real-time predictions from your deep learning model.
        </p>
      </section>

      {/* File Upload & Prediction (Client Component) */}
      <section className="py-24 px-6 md:px-20 flex flex-col items-center">
        <ImageUploader />
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
