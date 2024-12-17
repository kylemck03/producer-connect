'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/shared/Button'
import React from 'react'

export const HomeCTA = () => {
  return (
    <div className="bg-dark py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 sm:p-16">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white sm:text-4xl"
              >
                Ready to Start Creating?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-lg text-white/90"
              >
                Join our community of producers and start collaborating today.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex justify-center gap-4"
              >
                <Button size="lg" variant="default" className="bg-white text-primary hover:bg-gray-100">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
