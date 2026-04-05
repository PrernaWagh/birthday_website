"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface WishCard {
  id: number
  message: string
  emoji: string
  color: string
}

const wishes: WishCard[] = [
  {
    id: 1,
    message: "You make every day feel like a celebration. Happy Birthday, my love!",
    emoji: "🎂",
    color: "from-pink-200 to-rose-300",
  },
  {
    id: 2,
    message: "Another year of loving you is the greatest gift I could ask for.",
    emoji: "💝",
    color: "from-rose-200 to-pink-300",
  },
  {
    id: 3,
    message: "Here&apos;s to more adventures, laughter, and endless love together!",
    emoji: "🎈",
    color: "from-pink-300 to-rose-200",
  },
  {
    id: 4,
    message: "You are my sunshine, my soulmate, and my everything. I love you!",
    emoji: "☀️",
    color: "from-amber-100 to-pink-200",
  },
  {
    id: 5,
    message: "May all your birthday wishes come true, because you deserve the world!",
    emoji: "⭐",
    color: "from-rose-100 to-pink-300",
  },
  {
    id: 6,
    message: "Forever grateful for the day you were born. Happy Birthday, babe!",
    emoji: "🌹",
    color: "from-red-200 to-rose-300",
  },
]

export function GiftCards() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const toggleCard = (id: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <section className="py-16 px-4 relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif text-center text-foreground mb-4">
        Birthday Wishes For You 💌
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        Click each card to reveal your special message!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {wishes.map((wish, index) => (
          <div
            key={wish.id}
            className="perspective-1000 cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => toggleCard(wish.id)}
          >
            <div
              className={`relative w-full h-64 transition-transform duration-700 transform-style-3d ${
                flippedCards.has(wish.id) ? "rotate-y-180" : ""
              }`}
            >
              {/* Front of card */}
              <Card
                className={`absolute inset-0 backface-hidden bg-gradient-to-br ${wish.color} border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center animate-float`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center">
                  <span className="text-6xl block mb-4 animate-bounce">{wish.emoji}</span>
                  <p className="text-foreground/80 font-medium">Tap to open!</p>
                </div>
              </Card>
              {/* Back of card */}
              <Card
                className={`absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br ${wish.color} border-2 border-primary/20 shadow-xl p-6 flex items-center justify-center`}
              >
                <p className="text-lg text-foreground/90 text-center font-medium leading-relaxed">
                  {wish.message}
                </p>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
