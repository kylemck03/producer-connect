'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/shared/Button'
import Image from 'next/image'
import React from 'react'

export const HomeHero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900/90 to-gray-900/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Where <span className="gradient-text">Producers</span> Connect
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join a community of music producers. Collaborate on projects,
              share your work, and take your production to the next level.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" variant="default">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8"
          >
          </motion.div>
        </div>
      </div>
    </div>
  )
}
