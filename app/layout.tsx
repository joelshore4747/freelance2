import type React from "react"
import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Studio Duo - Freelance Design & Development",
  description:
    "Professional freelance design and development studio specializing in modern web solutions, UI/UX design, and full-stack development.",
  generator: "v0.app",
  keywords: ["freelance", "design", "development", "web design", "UI/UX", "full-stack"],
  authors: [{ name: "Studio Duo" }],
  openGraph: {
    title: "Studio Duo - Freelance Design & Development",
    description: "Professional freelance design and development studio specializing in modern web solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Duo - Freelance Design & Development",
    description: "Professional freelance design and development studio specializing in modern web solutions.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans ${inter.variable} ${plusJakartaSans.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
