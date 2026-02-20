"use client"

import { PixelDog } from "@/components/pixel-dog"

type DogMood = "idle" | "happy" | "eating" | "sleeping" | "walking"

interface PetRoomProps {
  mood: DogMood
  petName: string
}

export function PetRoom({ mood, petName }: PetRoomProps) {
  const moodLabels: Record<DogMood, string> = {
    idle: "Chillin",
    happy: "So Happy!",
    eating: "Nom Nom",
    sleeping: "Zzz...",
    walking: "Walkin!",
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">{petName}</h2>
          <p className="text-xs text-muted-foreground">Your office companion</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[oklch(0.75_0.12_155)] opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[oklch(0.75_0.12_155)]" />
          </span>
          <span className="text-xs font-semibold text-muted-foreground">
            {moodLabels[mood]}
          </span>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-2xl border-2 border-border/60 bg-[#fef9f0]">
        <div className="absolute inset-0">
          <PixelDog mood={mood} />
        </div>
      </div>
    </div>
  )
}
