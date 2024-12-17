import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import React from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Producer Connect',
  description: 'Connect, collaborate, and create with music producers worldwide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-background text-white min-h-screen bg-gradient-to-b from-background-dark to-background`}>
        {children}
      </body>
    </html>
  )
}
