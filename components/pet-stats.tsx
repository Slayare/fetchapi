"use client"

import { UtensilsCrossed, Heart, Footprints } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PetStatsProps {
  hunger: number
  happiness: number
  energy: number
  onFeed: () => void
  onPet: () => void
  onWalk: () => void
  isFeeding: boolean
  isPetting: boolean
  isWalking: boolean
}

function StatBar({
  label,
  value,
  color,
  icon,
}: {
  label: string
  value: number
  color: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </div>
        <span className="text-xs font-bold text-muted-foreground tabular-nums">
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            color
          )}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          role="progressbar"
          aria-valuenow={Math.round(value)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${Math.round(value)}%`}
        />
      </div>
    </div>
  )
}

export function PetStats({
  hunger,
  happiness,
  energy,
  onFeed,
  onPet,
  onWalk,
  isFeeding,
  isPetting,
  isWalking,
}: PetStatsProps) {
  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Pet Stats</h2>
        <p className="text-xs text-muted-foreground">
          Keep your pup happy and healthy
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <StatBar
          label="Hunger"
          value={hunger}
          color="bg-[oklch(0.68_0.12_340)]"
          icon={<UtensilsCrossed className="size-4" />}
        />
        <StatBar
          label="Happiness"
          value={happiness}
          color="bg-[oklch(0.82_0.1_85)]"
          icon={<Heart className="size-4" />}
        />
        <StatBar
          label="Energy"
          value={energy}
          color="bg-[oklch(0.72_0.1_200)]"
          icon={<Footprints className="size-4" />}
        />
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <Button
          onClick={onFeed}
          disabled={isFeeding || isPetting || isWalking}
          className={cn(
            "w-full gap-2 rounded-xl font-bold transition-all",
            "bg-[oklch(0.68_0.12_340)] text-[oklch(0.99_0.005_280)] hover:bg-[oklch(0.63_0.12_340)]",
            isFeeding && "animate-pulse"
          )}
          size="lg"
        >
          <UtensilsCrossed className="size-4" />
          {isFeeding ? "Feeding..." : "Feed"}
        </Button>
        <Button
          onClick={onPet}
          disabled={isFeeding || isPetting || isWalking}
          className={cn(
            "w-full gap-2 rounded-xl font-bold transition-all",
            "bg-[oklch(0.82_0.1_85)] text-[oklch(0.28_0.02_280)] hover:bg-[oklch(0.77_0.1_85)]",
            isPetting && "animate-pulse"
          )}
          size="lg"
        >
          <Heart className="size-4" />
          {isPetting ? "Petting..." : "Pet"}
        </Button>
        <Button
          onClick={onWalk}
          disabled={isFeeding || isPetting || isWalking}
          className={cn(
            "w-full gap-2 rounded-xl font-bold transition-all",
            "bg-[oklch(0.72_0.1_200)] text-[oklch(0.99_0.005_280)] hover:bg-[oklch(0.67_0.1_200)]",
            isWalking && "animate-pulse"
          )}
          size="lg"
        >
          <Footprints className="size-4" />
          {isWalking ? "Walking..." : "Walk"}
        </Button>
      </div>
    </div>
  )
}
