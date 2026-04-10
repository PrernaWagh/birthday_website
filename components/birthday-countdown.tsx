"use client"

import { useEffect, useState } from "react"

// Replace with your happy birthday GIF URL
const BIRTHDAY_GIF = "" // e.g., "https://media.giphy.com/media/..." or "/birthday.gif"

export function BirthdayCountdown() {
  const [countdownNumber, setCountdownNumber] = useState<number | null>(null)
  const [showMessage, setShowMessage] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isCountdownDone, setIsCountdownDone] = useState(false)

  useEffect(() => {
    // Start countdown when component mounts
    const timer = setTimeout(() => {
      setHasStarted(true)
      setCountdownNumber(3)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!hasStarted || countdownNumber === null) return

    if (countdownNumber > 0) {
      const timer = setTimeout(() => {
        setCountdownNumber(countdownNumber - 1)
      }, 1300)
      return () => clearTimeout(timer)
    } else if (countdownNumber === 0) {
      const timer = setTimeout(() => {
        setShowMessage(true)
        setCountdownNumber(null)
      }, 1300)
      return () => clearTimeout(timer)
    }
  }, [countdownNumber, hasStarted])

  // Auto-hide the countdown section and fade to next content
  useEffect(() => {
    if (showMessage) {
      const hideTimer = setTimeout(() => {
        setIsCountdownDone(true)
      }, 3200)
      return () => clearTimeout(hideTimer)
    }
  }, [showMessage])

  // If countdown is done, don't render anything - page flows to next section
  if (isCountdownDone) {
    return null
  }

  // Countdown number section - part of page flow
  if (countdownNumber !== null) {
    return (
      <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-accent/30 overflow-hidden">
        <style>{`
          @keyframes count-scale {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            70% {
              transform: scale(1.1);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          .countdown-num {
            animation: count-scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            font-size: clamp(100px, 30vw, 500px);
            font-weight: 900;
            text-shadow: 0 0 30px rgba(200, 100, 150, 0.8), 0 0 60px rgba(255, 150, 200, 0.4);
            letter-spacing: -0.05em;
          }
        `}</style>

        <div className="text-center">
          <div className="countdown-num text-primary">
            {countdownNumber}
          </div>
        </div>
      </section>
    )
  }

  // Happy Birthday message section - part of page flow
  if (showMessage) {
    return (
      <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 py-12 px-4 overflow-hidden">
        <style>{`
          @keyframes message-scale-in {
            0% {
              opacity: 0;
              transform: scale(0.7) translateY(40px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes hearts-rise {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-150px) rotate(360deg);
              opacity: 0;
            }
          }
          
          .msg-container {
            animation: message-scale-in 0.8s ease-out forwards;
          }
          
          .floating-heart {
            position: absolute;
            animation: hearts-rise 2.5s ease-in-out forwards;
            pointer-events: none;
          }
        `}</style>

        {/* Floating hearts background */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-heart text-5xl"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-80px",
              animationDelay: `${i * 0.12}s`,
            }}
          >
            💕
          </div>
        ))}

        <div className="msg-container max-w-2xl mx-auto text-center relative z-10">
          {/* GIF Display */}
          <div className="mb-8">
            {BIRTHDAY_GIF ? (
              <img
                src={BIRTHDAY_GIF}
                alt="Happy Birthday Celebration"
                className="w-full max-w-md h-auto rounded-2xl shadow-2xl mx-auto border-4 border-primary/30"
              />
            ) : (
              <div className="text-9xl inline-block animate-bounce-slow mb-4">
                🎉
              </div>
            )}
          </div>

          {/* Main Message */}
          <h1 className="text-6xl md:text-8xl font-serif text-primary mb-4 text-balance drop-shadow-lg">
            Happy Birthday!
          </h1>

          <p className="text-2xl md:text-3xl text-foreground mb-3 font-semibold">
            To My Amazing Love
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
            This special day is all about celebrating YOU and the incredible joy you bring into my life. Wishing you endless happiness, love, and all the beautiful moments you deserve.
          </p>

          {/* Animated celebration elements */}
          <div className="flex justify-center gap-6 text-6xl mb-10">
            <span className="animate-bounce-slow" style={{ animationDelay: "0s" }}>✨</span>
            <span className="animate-bounce-slow" style={{ animationDelay: "0.2s" }}>💖</span>
            <span className="animate-bounce-slow" style={{ animationDelay: "0.4s" }}>✨</span>
          </div>

          <p className="text-muted-foreground text-sm">
            Scroll down to see more surprises waiting for you
          </p>
        </div>
      </section>
    )
  }

  return null
}