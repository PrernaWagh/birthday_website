"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-16 px-4 relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif text-center text-foreground mb-4">
        A Letter For You 💌
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        Click the envelope to read my heartfelt message
      </p>

      <div className="max-w-2xl mx-auto">
        {!isOpen ? (
          <Card
            className="p-12 bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-primary/20 shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setIsOpen(true)}
          >
            <div className="text-center">
              <span className="text-8xl block mb-6 animate-bounce">💌</span>
              <p className="text-foreground/80 font-medium text-lg">
                Click to open your special letter!
              </p>
            </div>
          </Card>
        ) : (
          <Card className="p-8 md:p-12 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-primary/20 shadow-2xl animate-fade-in">
            <div className="font-serif text-foreground/90 space-y-4 text-lg leading-relaxed">
              <p className="text-2xl text-primary">My Dearest Love,</p>
              
              <p>
                On this special day, I want you to know just how much you mean to me. 
                Every moment with you is a treasure, every laugh we share is a melody, 
                and every day I spend by your side is a blessing.
              </p>
              
              <p>
                You are not just my partner, but my best friend, my confidant, 
                and my greatest adventure. Your smile lights up my world, 
                and your love makes everything better.
              </p>
              
              <p>
                As you celebrate another year of life, I celebrate another year 
                of loving you. Thank you for being the amazing person you are, 
                for your kindness, your patience, and your unconditional love.
              </p>
              
              <p>
                Here&apos;s to many more birthdays together, many more memories to create, 
                and a lifetime of happiness ahead of us.
              </p>
              
              <p className="text-xl text-primary pt-4">
                With all my love, forever and always,
                <br />
                Your One and Only 💕
              </p>
            </div>
            
            <Button
              variant="outline"
              className="mt-8"
              onClick={() => setIsOpen(false)}
            >
              Close Letter
            </Button>
          </Card>
        )}
      </div>
    </section>
  )
}
