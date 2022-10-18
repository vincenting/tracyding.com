import React from 'react'
import IntroCard from '../components/IntroCard/IntroCard'

export default function Home () {
  return (
    <main className="w-full h-screen bg-orange-100 relative">
      <IntroCard className="absolute w-full bottom-5 portrait:bottom-24 md:bottom-1/4" />
    </main>
  )
}
