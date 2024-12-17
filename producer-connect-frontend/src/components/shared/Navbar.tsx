'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from './Button'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import React from 'react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-dark/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold gradient-text">
              ProducerConnect
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/discover" className="text-gray-300 hover:text-white">
              Discover
            </Link>
            <Link href="/collaborate" className="text-gray-300 hover:text-white">
              Collaborate
            </Link>
            <Link href="/learn" className="text-gray-300 hover:text-white">
              Learn
            </Link>
            <Button variant="default" size="sm">
              Sign In
            </Button>
            <Button variant="secondary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/discover"
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Discover
              </Link>
              <Link
                href="/collaborate"
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Collaborate
              </Link>
              <Link
                href="/learn"
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Learn
              </Link>
              <div className="space-y-2 pt-2">
                <Button variant="default" size="sm" className="w-full">
                  Sign In
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
