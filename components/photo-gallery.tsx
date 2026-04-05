"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Placeholder photos - replace with your actual photos
const photos = [
  { id: 1, caption: "Preyush💕", placeholder: "📸", src: "/images/preyush.jpeg" },
  { id: 2, caption: "Traditional Vibes🥰", placeholder: "🥰", src: "/images/traditional.jpeg" },
  { id: 3, caption: "College cuties 🫂", placeholder: "🫂", src: "/images/collegecuties.jpeg" },
  { id: 4, caption: "Love birds 👩🏻‍❤️‍👨🏼", placeholder: "👩🏻‍❤️‍👨🏼", src: "/images/lovebirds.jpeg" },
  { id: 5, caption: "Buddies 🤗", placeholder: "🤗", src: "/images/buddies.jpeg" },
  { id: 6, caption: "Forever and always 💍", placeholder: "💍", src: "/images/forever.jpeg" },
]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

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
  }

  const currentPhoto = photos.find((p) => p.id === selectedPhoto)

  return (
    <section className="py-16 px-4 relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif text-center text-foreground mb-4">
        Our Photo Memories 📷
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        Click any photo to view it larger!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {photos.map((photo, index) => (
          <Card
            key={photo.id}
            className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-primary/20 shadow-xl cursor-pointer hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-4 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedPhoto(photo.id)}
          >
            <span className="text-6xl mb-2">{photo.placeholder}</span>
            <p className="text-sm text-muted-foreground text-center">{photo.caption}</p>
          </Card>
        ))}
      </div>

      <Dialog open={selectedPhoto !== null} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm border-primary/20">
          <DialogTitle className="text-xl font-serif text-center text-foreground">
            {currentPhoto?.caption}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Photo memory from our journey together
          </DialogDescription>
          <div className="relative flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg overflow-hidden min-h-[300px] max-h-[70vh]">
            {currentPhoto?.src ? (
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            ) : (
              <div className="text-center p-8">
                <span className="text-8xl block mb-4">{currentPhoto?.placeholder}</span>
                <p className="text-sm text-muted-foreground">
                  Add your photo to /public/images folder
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4">
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
