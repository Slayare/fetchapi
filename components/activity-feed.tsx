"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { UtensilsCrossed, Heart, Footprints } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ActivityItem {
  id: string
  type: "feed" | "pet" | "walk"
  user: string
  timestamp: Date
}

const activityIcons = {
  feed: UtensilsCrossed,
  pet: Heart,
  walk: Footprints,
}

const activityColors = {
  feed: "bg-[oklch(0.68_0.12_340)]/15 text-[oklch(0.58_0.14_340)]",
  pet: "bg-[oklch(0.82_0.1_85)]/20 text-[oklch(0.62_0.12_85)]",
  walk: "bg-[oklch(0.72_0.1_200)]/15 text-[oklch(0.52_0.12_200)]",
}

const activityMessages = {
  feed: "fed the dog",
  pet: "pet the dog",
  walk: "walked the dog",
}

function formatTime(date: Date) {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)

  if (diffSec < 5) return "just now"
  if (diffSec < 60) return `${diffSec}s ago`
  if (diffMin < 60) return `${diffMin}m ago`
  return `${diffHr}h ago`
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">Activity Feed</h2>
        <p className="text-xs text-muted-foreground">
          Recent actions from the office
        </p>
      </div>

      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="flex flex-col gap-2">
          {activities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Heart className="size-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                No activity yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Interact with the dog to get started!
              </p>
            </div>
          )}
          {activities.map((activity, index) => {
            const Icon = activityIcons[activity.type]
            return (
              <div
                key={activity.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-3 transition-all",
                  "bg-card/60 border border-border/50",
                  index === 0 && "animate-in fade-in slide-in-from-top-2 duration-300"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-lg p-2",
                    activityColors[activity.type]
                  )}
                >
                  <Icon className="size-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">
                      {activityMessages[activity.type]}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
