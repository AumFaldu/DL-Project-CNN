"use client";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">About DL Project</h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Learn more about our deep learning project for traffic sign detection.
        </p>
      </section>

      {/* About Content Section */}
      <section className="py-24 px-6 md:px-20 space-y-16">
        {/* Project Overview */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:space-x-12 space-y-8 md:space-y-0">
          <img
            src="/images/traffic-signs.png"
            alt="Traffic Signs"
            className="w-full md:w-1/2 rounded-lg shadow"
          />
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

        {/* About the Developer */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:space-x-12 space-y-8 md:space-y-0">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">About the Developer</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              This project is developed by Aum Faldu, an undergraduate computer science student
              passionate about AI, deep learning, and full-stack development. The project demonstrates
              practical use of modern deep learning techniques for real-world applications.
            </p>
          </div>
          <img
            src="/images/developer.jpg"
            alt="Developer"
            className="w-full md:w-1/2 rounded-lg shadow"
          />
        </div>
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
