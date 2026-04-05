"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

// Replace with your video URL when ready
const VIDEO_SRC: string | null = "/video/HAPPY BIRTHDAY.mp4" // e.g., "/my-video.mp4" or a URL

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasVideo = VIDEO_SRC !== null && VIDEO_SRC.length > 0

  const togglePlay = () => {
    if (!hasVideo || !videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!hasVideo || !videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <section className="py-16 px-4 relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif text-center text-foreground mb-4">
        My Birthday Boy
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        With his 20 years journey
      </p>
      
      <Card className="max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-primary/20 shadow-2xl">
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          {hasVideo && VIDEO_SRC ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              src={VIDEO_SRC}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/30 to-accent/30">
              <span className="text-6xl mb-4">📹</span>
              <p className="text-foreground/80 text-center px-4">
                Add your special video here!
                <br />
                <span className="text-sm text-muted-foreground">
                  Replace VIDEO_SRC in the code
                </span>
              </p>
            </div>
          )}
          
          {/* Video controls */}
          {hasVideo && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={togglePlay}
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={toggleMute}
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </section>
  )
}
