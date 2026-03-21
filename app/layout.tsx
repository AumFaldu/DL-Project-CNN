import './globals.css'
import Link from 'next/link'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'Traffic Sign Recognition',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-gray-50">
        <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Traffic Sign Recognition</h1>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/about">About Model</Link>
          </nav>
        </header>

        <main className="p-6">{children}</main>

        <footer className="bg-gray-100 text-gray-600 text-center p-4 mt-10">
          © 2026 Traffic Sign Recognition Project
        </footer>
      </body>
    </html>
  )
}