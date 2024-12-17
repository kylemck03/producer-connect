import { HomeHero } from '@/components/home/Hero'
import { HomeFeatures } from '@/components/home/Features'
import { HomeCTA } from '@/components/home/CTA'
import { SharedLayout } from '@/components/shared/Layout'
import { ClientLayout } from '@/components/shared/ClientLayout'
import React from 'react'

export default function HomePage() {
  return (
    <SharedLayout>
      <ClientLayout>
        <HomeHero />
        <HomeFeatures />
        <HomeCTA />
      </ClientLayout>
    </SharedLayout>
  )
}
