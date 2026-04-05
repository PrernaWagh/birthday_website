"use client"

export function Footer() {
  return (
    <footer className="py-12 px-4 relative z-10 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="text-4xl mb-6 animate-pulse">
          💕✨🎂✨💕
        </div>
        <p className="text-2xl font-serif text-primary mb-4">
          Happy Birthday, My Love!
        </p>
        <p className="text-muted-foreground mb-8">
          Made with all my love, just for you 💝
        </p>
        <div className="flex justify-center gap-2 text-3xl">
          <span className="animate-bounce" style={{ animationDelay: "0s" }}>💖</span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>💗</span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>💓</span>
          <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>💕</span>
          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>💝</span>
        </div>
      </div>
    </footer>
  )
}
