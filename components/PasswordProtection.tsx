"use client"

import { useState, useEffect } from "react"

interface PasswordProtectionProps {
  onSuccess: () => void
}

const CORRECT_PASSWORD = "0714"

export function PasswordProtection({ onSuccess }: PasswordProtectionProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [shakeError, setShakeError] = useState(false)
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ emoji: string; style: any }>>([])

  // Generate floating emojis only on client side to avoid hydration mismatch
  useEffect(() => {
    const emojis = ["🎂", "🎁", "🎈", "✨", "💝", "🎉", "🎊", "💕", "🌸", "🌟", "🎀", "🦄", "🌈", "⭐", "💖"]
    const generatedEmojis = emojis.map((emoji) => ({
      emoji,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${3 + Math.random() * 3}s`,
        opacity: 0.3 + Math.random() * 0.4,
      }
    }))
    setFloatingEmojis(generatedEmojis)
  }, [])

  const handleNumberClick = (num: string) => {
    if (password.length < 4) {
      setPassword(prev => prev + num)
      setError("")
    }
  }

  const handleDelete = () => {
    setPassword(prev => prev.slice(0, -1))
    setError("")
  }

  const handleSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      onSuccess()
    } else {
      setError("❌ Wrong password! Try again ❌")
      setShakeError(true)
      setPassword("")
      setTimeout(() => setShakeError(false), 500)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .shake-animation {
          animation: shake 0.3s ease-in-out;
        }
        .floating-emoji {
          position: absolute;
          animation: float 4s ease-in-out infinite;
          opacity: 0.6;
          pointer-events: none;
        }
      `}</style>

      {/* Floating decorations - rendered only on client side after mount */}
      {floatingEmojis.map((item, i) => (
        <div
          key={i}
          className="floating-emoji text-4xl md:text-6xl"
          style={item.style}
        >
          {item.emoji}
        </div>
      ))}

      {/* Main Password Container */}
      <div className="relative z-10 h-full flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 transform transition-all duration-500 hover:scale-105">
            {/* Lock Icon */}
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-br from-pink-500 to-rose-500 rounded-full p-4 shadow-lg animate-bounce">
                <span className="text-5xl">🔐</span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-serif text-center text-gray-800 mb-2">
              Secret Birthday Zone
            </h2>
            <p className="text-center text-gray-600 text-sm md:text-base mb-6">
              Enter the special code to unlock your surprise! 🎁
            </p>

            {/* Password Display */}
            <div className="mb-6">
              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center gap-2 md:gap-3 mb-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 md:w-14 md:h-14 rounded-xl border-2 ${
                        password.length > i
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-300 bg-white"
                      } flex items-center justify-center transition-all duration-300`}
                    >
                      <span className="text-xl md:text-2xl font-bold text-pink-600">
                        {password[i] || "•"}
                      </span>
                    </div>
                  ))}
                </div>
                {error && (
                  <p className={`text-red-500 text-xs md:text-sm mt-2 font-semibold ${shakeError ? "shake-animation" : ""}`}>
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Number Keypad */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-pink-50 hover:to-rose-50 text-gray-800 font-bold text-xl md:text-2xl py-3 md:py-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-200"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleDelete}
                className="bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 font-bold text-lg md:text-xl py-3 md:py-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                ⌫
              </button>
              <button
                onClick={() => handleNumberClick("0")}
                className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-pink-50 hover:to-rose-50 text-gray-800 font-bold text-xl md:text-2xl py-3 md:py-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                0
              </button>
              <button
                onClick={handleSubmit}
                disabled={password.length !== 4}
                className={`bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base md:text-xl py-3 md:py-4 rounded-xl shadow-md transform transition-all duration-200 ${
                  password.length === 4
                    ? "hover:scale-105 hover:shadow-xl cursor-pointer animate-pulse"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                🔓 UNLOCK
              </button>
            </div>

            {/* Hint */}
            <p className="text-center text-xs text-gray-500 mt-4">
              💝 Hint: Our special date (DDMM) 💝
            </p>
            
            {/* Decorative text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                ✨ Only special people can enter ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}