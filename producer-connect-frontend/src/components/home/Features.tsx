'use client'
import { motion } from 'framer-motion'
import { 
  UsersIcon, 
  SparklesIcon, 
  ChatBubbleLeftRightIcon,
  MusicalNoteIcon 
} from '@heroicons/react/24/outline'
import React from 'react'

const features = [
  {
    name: 'Connect with Producers',
    description: 'Find and connect with producers who share your vision and style.',
    icon: UsersIcon,
  },
  {
    name: 'AI-Powered Matching',
    description: 'Get matched with collaborators based on your style and preferences.',
    icon: SparklesIcon,
  },
  {
    name: 'Real-time Collaboration',
    description: 'Work together seamlessly with built-in communication tools.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Share Your Work',
    description: 'Showcase your projects and get feedback from the community.',
    icon: MusicalNoteIcon,
  },
]

export const HomeFeatures = () => {
  return (
    <div className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold gradient-text mb-4"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Our platform provides all the tools and features you need to connect,
            collaborate, and create amazing music together.
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute left-0 top-0 -z-10 h-24 w-24 rounded-full bg-primary/10" />
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
