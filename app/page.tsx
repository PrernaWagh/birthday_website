import { FloatingHearts } from "@/components/floating-hearts"
import { Sparkles } from "@/components/sparkles"
import { HeroSection } from "@/components/hero-section"
import { GiftCards } from "@/components/gift-cards"
import { LoveLetter } from "@/components/love-letter"
import { BirthdayCountdown } from "@/components/birthday-countdown"
import { PhotoGallery } from "@/components/photo-gallery"
import { VideoSection } from "@/components/video-section"
import { AudioPlayer } from "@/components/audio-player"
import { QRCodeSection } from "@/components/qr-code-section"
import { Footer } from "@/components/footer"

export default function BirthdayPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary to-background overflow-hidden">
      {/* Countdown Overlay - displays first, then disappears */}
      <BirthdayCountdown />
      
      {/* Background animations */}
      <FloatingHearts />
      <Sparkles />
      
      {/* Main content */}
      <HeroSection />
      
      <div className="relative">
        {/* Decorative divider */}
        <div className="flex justify-center py-8">
          <span className="text-4xl">✨💕✨</span>
        </div>
        
        <LoveLetter />
        
        <div className="flex justify-center py-8">
          <span className="text-4xl">💌🎁💌</span>
        </div>
        
        <GiftCards />
        
        <div className="flex justify-center py-8">
          <span className="text-4xl">📷💝📷</span>
        </div>
        
        <PhotoGallery />
        
        <div className="flex justify-center py-8">
          <span className="text-4xl">🎬🌟🎬</span>
        </div>
        
        <VideoSection />
        
        <div className="flex justify-center py-8">
          <span className="text-4xl">🎵💕🎵</span>
        </div>
        
        <AudioPlayer />
        
        <div className="flex justify-center py-8">
          <span className="text-4xl">📱✨📱</span>
        </div>
        
        <QRCodeSection />
      </div>
      
      <Footer />
    </main>
  )
}
