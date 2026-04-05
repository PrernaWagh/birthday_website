"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-20">
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="animate-bounce-slow mb-8">
          <span className="text-8xl md:text-9xl">🎂</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary mb-6 animate-pulse-slow">
          Happy Birthday
        </h1>
        
        <h2 className="text-3xl md:text-5xl font-serif text-foreground/80 mb-8">
          My Dearest Love! 💕
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Today is all about celebrating the most amazing person in my life. 
          You bring so much joy, love, and happiness into every moment we share together.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-4xl animate-float">
          <span>🎈</span>
          <span>🎁</span>
          <span>🎉</span>
          <span>💝</span>
          <span>🌹</span>
          <span>✨</span>
        </div>
      </div>
      
      <div className="absolute bottom-10 animate-bounce">
        <svg
          className="w-8 h-8 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
