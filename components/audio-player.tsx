"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"

// Replace with your audio URL when ready
const AUDIO_SRC: string | null = null // e.g., "/our-song.mp3" or a URL

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasAudio = AUDIO_SRC !== null && AUDIO_SRC.length > 0

  useEffect(() => {
    if (!hasAudio) return
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0)
    }

    const setAudioDuration = () => {
      setDuration(audio.duration || 0)
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", setAudioDuration)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", setAudioDuration)
    }
  }, [hasAudio])

  const togglePlay = () => {
    if (!hasAudio || !audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!hasAudio || !audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleProgressChange = (value: number[]) => {
    if (!hasAudio || !audioRef.current || !duration) return
    const newTime = (value[0] / 100) * duration
    audioRef.current.currentTime = newTime
    setProgress(value[0])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <section className="py-16 px-4 relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif text-center text-foreground mb-4">
        Our Song 🎵
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        Press play and let the music speak my love for you
      </p>

      <Card className="max-w-md mx-auto p-6 bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-primary/20 shadow-2xl">
        {hasAudio && AUDIO_SRC && (
          <audio ref={audioRef} loop src={AUDIO_SRC} />
        )}

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
            <Music className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Our Special Song</h3>
            <p className="text-sm text-muted-foreground">
              {hasAudio ? "Press play to listen" : "Add AUDIO_SRC in the code"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              className="rounded-full"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
              size="icon"
              onClick={togglePlay}
              className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            <div className="w-10" /> {/* Spacer for symmetry */}
          </div>
        </div>
      </Card>
    </section>
  )
}
