"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export function BirthdayCountdown() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // 💖 Set your real start date here
    const startDate = new Date("2023-01-31")

    const updateTime = () => {
      const now = new Date()

      let years = now.getFullYear() - startDate.getFullYear()
      let months = now.getMonth() - startDate.getMonth()
      let days = now.getDate() - startDate.getDate()

      // Adjust days
      if (days < 0) {
        months--
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        days += prevMonth.getDate()
      }

      // Adjust months
      if (months < 0) {
        years--
        months += 12
      }

      // Time (same day difference)
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      setTimeElapsed({ years, months, days, hours, minutes, seconds })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeBlocks = [
    { label: "Years", value: timeElapsed.years },
    { label: "Months", value: timeElapsed.months },
    { label: "Days", value: timeElapsed.days },
    { label: "Hours", value: timeElapsed.hours },
    { label: "Minutes", value: timeElapsed.minutes },
    { label: "Seconds", value: timeElapsed.seconds },
  ]

  return (
    <section className="py-16 px-4 relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif text-center text-foreground mb-4">
        Time We&apos;ve Been In Love 💕
      </h2>

      <p className="text-center text-muted-foreground mb-12">
        And counting every beautiful second...
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
        {timeBlocks.map((block, index) => (
          <Card
            key={block.label}
            className="p-4 md:p-6 bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-primary/20 shadow-xl text-center animate-float"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-3xl md:text-4xl font-bold text-primary block">
              {block.value.toString().padStart(2, "0")}
            </span>
            <span className="text-sm text-muted-foreground">
              {block.label}
            </span>
          </Card>
        ))}
      </div>
    </section>
  )
}