import { Navbar } from './Navbar'
import { Footer } from './Footer'
import React from 'react'

interface SharedLayoutProps {
  children: React.ReactNode
}

export const SharedLayout = ({ children }: SharedLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
