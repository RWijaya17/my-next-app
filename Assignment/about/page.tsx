'use client'

import { useMemo } from 'react'

export default function AboutPage() {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-6 py-12 text-gray-800"
      role="main"
    >
      <section className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center border border-gray-200">
        <header>
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            🌐 About This Site
          </h1>
          <p className="text-gray-600 mb-6">
            Information about the author and how to use this website.
          </p>
        </header>

        {/* Author Info */}
        <div className="space-y-2 mb-8 text-lg">
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{' '}
            Christoffer Raffaelo Wijaya
          </p>
          <p>
            <span className="font-semibold text-gray-700">
              Student Number:
            </span>{' '}
            22586644
          </p>
        </div>

        {/* Instructional Video */}
        <figure className="w-full max-w-lg mx-auto">
          <video
            controls
            preload="metadata"
            className="w-full rounded-xl shadow-md border border-gray-200"
            aria-describedby="video-description"
          >
            <source src="/how-to-use.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <figcaption
            id="video-description"
            className="mt-3 text-sm text-gray-500 italic"
          >
            🎥 A short guide on how to use this website.
          </figcaption>
        </figure>

        {/* Footer */}
        <footer className="mt-8 text-sm text-gray-500">
          © {currentYear} Christoffer Raffaelo Wijaya — All rights reserved.
        </footer>
      </section>
    </main>
  )
}
   