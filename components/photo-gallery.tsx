"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, ChevronLeftCircle, ChevronRightCircle, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

// Add as many photos as you want here!
const photos = [
  { id: 1, caption: "Preyush💕", src: "/images/preyush.jpeg", audioSrc: "/audio/phir_kabhi.mp3" },
  { id: 2, caption: "Traditional Vibes🥰", src: "/images/traditional.jpeg", audioSrc: "/audio/saathiya.mp3" },
  { id: 3, caption: "College cuties 🫂", src: "/images/collegecuties.jpeg", audioSrc: "/audio/malang_sajna.mp3" },
  { id: 4, caption: "Love birds 👩🏻‍❤️‍👨🏼", src: "/images/lovebirds.jpeg", audioSrc: "/audio/kauntujhe.mp3" },
  { id: 5, caption: "Buddies 🤗", src: "/images/buddies.jpeg", audioSrc: "/audio/tum_jo_aaye.mp3" },
  { id: 6, caption: "Forever and always 💍", src: "/images/forever.jpeg", audioSrc: "/audio/tuhiremitwa.mp3" },
]

// Default romantic background music for the gallery
const DEFAULT_GALLERY_AUDIO = "/audio/sufiyana.mp3"

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [audioErrors, setAudioErrors] = useState<Record<number, boolean>>({})
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioVolume, setAudioVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Create audio element once
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.loop = true
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  // Handle user interaction to enable audio
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true)
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
    
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)
    
    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [])

  // Handle audio playback when dialog opens/closes
  useEffect(() => {
    if (selectedPhoto !== null && audioRef.current && userInteracted) {
      const currentPhoto = photos.find(p => p.id === selectedPhoto)
      const audioSrc = currentPhoto?.audioSrc || DEFAULT_GALLERY_AUDIO
      
      // Only change src if different from current
      if (audioRef.current.src !== window.location.origin + audioSrc) {
        audioRef.current.src = audioSrc
        audioRef.current.load() // Reload the audio
      }
      
      audioRef.current.volume = isMuted ? 0 : audioVolume
      
      // Play audio
      const playAudio = async () => {
        try {
          if (audioRef.current) {
            await audioRef.current.play()
            setIsAudioPlaying(true)
          }
        } catch (error) {
          console.log("Audio play failed:", error)
          setIsAudioPlaying(false)
          // Show error state
          if (audioRef.current && audioRef.current.error) {
            setAudioErrors(prev => ({ ...prev, [selectedPhoto]: true }))
          }
        }
      }
      
      playAudio()
    } else if (selectedPhoto === null && audioRef.current) {
      // Pause audio when dialog closes
      audioRef.current.pause()
      setIsAudioPlaying(false)
    }
  }, [selectedPhoto, userInteracted])

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current && selectedPhoto !== null) {
      audioRef.current.volume = isMuted ? 0 : audioVolume
    }
  }, [audioVolume, isMuted, selectedPhoto])

  const navigatePhoto = (direction: "prev" | "next") => {
    if (selectedPhoto === null) return
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto)
    if (direction === "prev") {
      const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
      setSelectedPhoto(photos[newIndex].id)
    } else {
      const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1
      setSelectedPhoto(photos[newIndex].id)
    }
    // Clear error for new photo
    setAudioErrors(prev => ({ ...prev, [selectedPhoto]: false }))
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  const toggleAudio = () => {
    if (audioRef.current && selectedPhoto !== null) {
      if (isAudioPlaying) {
        audioRef.current.pause()
        setIsAudioPlaying(false)
      } else {
        audioRef.current.play()
          .then(() => setIsAudioPlaying(true))
          .catch(err => {
            console.log("Audio play failed:", err)
            setAudioErrors(prev => ({ ...prev, [selectedPhoto]: true }))
          })
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setAudioVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const currentPhoto = photos.find((p) => p.id === selectedPhoto)

  return (
    <section className="py-16 px-4 relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif text-center text-foreground mb-4">
        Incredible memories with you 📷
      </h2>
      <p className="text-center text-muted-foreground mb-12">
         Our love story in pictures 📸 → Scroll sideways like you're stalking my Instagram, click to zoom in on my handsome/pretty face! 😘
      </p>

      {/* Horizontal Slider Container */}
      <div className="relative max-w-7xl mx-auto group">
        {/* Left Navigation Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0"
          aria-label="Scroll left"
        >
          <ChevronLeftCircle className="h-8 w-8 text-primary" />
        </button>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 scroll-smooth"
          style={{
            scrollbarWidth: "thin",
            msOverflowStyle: "auto"
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              height: 8px;
            }
            div::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}</style>
          
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="flex-none w-80 animate-fade-in cursor-pointer group/card"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                {/* Fixed size container for all images */}
                <div className="w-80 h-80 relative bg-gray-100 flex items-center justify-center overflow-hidden">
                  {!imageErrors[photo.id] ? (
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                      onError={() => setImageErrors(prev => ({ ...prev, [photo.id]: true }))}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <span className="text-6xl mb-3">📸</span>
                      <p className="text-sm text-muted-foreground text-center">
                        Image not found
                      </p>
                    </div>
                  )}
                  {/* Audio indicator badge - Only show if there's audio */}
                  {(photo.audioSrc || DEFAULT_GALLERY_AUDIO) && (
                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
                      <Volume2 className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                {/* Fixed height for caption area */}
                <div className="p-4 text-center min-h-[80px] flex items-center justify-center">
                  <p className="font-medium text-foreground">{photo.caption}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Scroll right"
        >
          <ChevronRightCircle className="h-8 w-8 text-primary" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center gap-2 mt-8">
        <div className="h-1 w-12 bg-primary/30 rounded-full" />
        <div className="h-1 w-12 bg-primary/30 rounded-full" />
        <div className="h-1 w-12 bg-primary/30 rounded-full" />
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        ← Scroll horizontally or use navigation buttons →
      </p>

      {/* Dialog with Audio Controls */}
      <Dialog open={selectedPhoto !== null} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm border-primary/20">
          <DialogTitle className="text-xl font-serif text-center text-foreground">
            {currentPhoto?.caption}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Photo memory from our journey together
          </DialogDescription>
          
          <div className="relative flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg overflow-hidden min-h-[400px] max-h-[70vh]">
            {currentPhoto?.src && !imageErrors[currentPhoto.id] ? (
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            ) : (
              <div className="text-center p-8">
                <span className="text-8xl block mb-4">📸</span>
                <p className="text-sm text-muted-foreground">
                  Image not available
                </p>
              </div>
            )}
          </div>

          {/* Audio Player Controls - Only show when dialog is open */}
          {selectedPhoto !== null && (
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleAudio}
                    className="h-8 w-8"
                  >
                    {isAudioPlaying ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : audioVolume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(isMuted ? 0 : audioVolume) * 100}%, #fbcfe8 ${(isMuted ? 0 : audioVolume) * 100}%, #fbcfe8 100%)`
                    }}
                  />
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {currentPhoto?.audioSrc ? "✨ Memory Audio" : "🎵 Background Music"}
                </div>
              </div>
              
              {audioErrors[selectedPhoto] && (
                <p className="text-xs text-center text-red-500 mt-2">
                  ⚠️ Audio not available. Please check file format and path.
                </p>
              )}
              
              {!userInteracted && (
                <p className="text-xs text-center text-amber-600 mt-2">
                  ℹ️ Click anywhere on the page first to enable audio
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between mt-2">
            <Button variant="outline" onClick={() => navigatePhoto("prev")}>
              <ChevronLeft className="h-5 w-5 mr-2" /> Previous
            </Button>
            <Button variant="outline" onClick={() => navigatePhoto("next")}>
              Next <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}