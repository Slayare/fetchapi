"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { PetStats } from "@/components/pet-stats";
import { PetRoom } from "@/components/pet-room";
import { ActivityFeed, type ActivityItem } from "@/components/activity-feed";
import { Card, CardContent } from "@/components/ui/card";
import { Dog } from "lucide-react";

type DogMood = "idle" | "happy" | "eating" | "sleeping" | "walking";

const COLLEAGUES = ["Patricia", "Marcus", "Emily", "Raj", "Sofia", "Jordan", "Aiko", "Leon"];

function getRandomColleague() {
  return COLLEAGUES[Math.floor(Math.random() * COLLEAGUES.length)];
}

export default function OfficePetDashboard() {
  const [hunger, setHunger] = useState(70);
  const [happiness, setHappiness] = useState(65);
  const [energy, setEnergy] = useState(80);
  const [mood, setMood] = useState<DogMood>("idle");
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isFeeding, setIsFeeding] = useState(false);
  const [isPetting, setIsPetting] = useState(false);
  const [isWalking, setIsWalking] = useState(false);

  const moodTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addActivity = useCallback((type: "feed" | "pet" | "walk", user?: string) => {
    const newActivity: ActivityItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type,
      user: user || "You",
      timestamp: new Date(),
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 50));
  }, []);

  const setTemporaryMood = useCallback((newMood: DogMood, duration: number) => {
    if (moodTimeout.current) clearTimeout(moodTimeout.current);
    setMood(newMood);
    moodTimeout.current = setTimeout(() => {
      setMood("idle");
    }, duration);
  }, []);

  const handleFeed = useCallback(() => {
    setIsFeeding(true);
    setTemporaryMood("eating", 2000);
    setHunger((h) => Math.min(100, h + 20));
    setEnergy((e) => Math.min(100, e + 5));
    addActivity("feed");
    setTimeout(() => setIsFeeding(false), 2000);
  }, [setTemporaryMood, addActivity]);

  const handlePet = useCallback(() => {
    setIsPetting(true);
    setTemporaryMood("happy", 2500);
    setHappiness((h) => Math.min(100, h + 20));
    setEnergy((e) => Math.min(100, e + 3));
    addActivity("pet");
    setTimeout(() => setIsPetting(false), 2500);
  }, [setTemporaryMood, addActivity]);

  const handleWalk = useCallback(() => {
    setIsWalking(true);
    setTemporaryMood("walking", 3000);
    setHappiness((h) => Math.min(100, h + 10));
    setEnergy((e) => Math.max(0, e - 15));
    setHunger((h) => Math.max(0, h - 10));
    addActivity("walk");
    setTimeout(() => setIsWalking(false), 3000);
  }, [setTemporaryMood, addActivity]);

  // Passive stat decay
  useEffect(() => {
    const decay = setInterval(() => {
      setHunger((h) => Math.max(0, h - 0.5));
      setHappiness((h) => Math.max(0, h - 0.3));
      setEnergy((e) => Math.max(0, e - 0.2));
    }, 3000);
    return () => clearInterval(decay);
  }, []);

  // Sleeping when energy is very low
  useEffect(() => {
    if (energy < 15 && mood === "idle") {
      setMood("sleeping");
    }
  }, [energy, mood]);

  // Simulate colleague actions
  useEffect(() => {
    const colleagueAction = setInterval(() => {
      if (Math.random() < 0.3) {
        const actions: ("feed" | "pet" | "walk")[] = ["feed", "pet", "walk"];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const colleague = getRandomColleague();
        addActivity(action, colleague);

        // Apply small stat boosts from colleagues
        if (action === "feed") setHunger((h) => Math.min(100, h + 5));
        if (action === "pet") setHappiness((h) => Math.min(100, h + 5));
        if (action === "walk") {
          setHappiness((h) => Math.min(100, h + 3));
          setEnergy((e) => Math.max(0, e - 3));
        }
      }
    }, 8000);
    return () => clearInterval(colleagueAction);
  }, [addActivity]);

  // Force re-render for relative timestamps
  const [, setTick] = useState(0);
  useEffect(() => {
    const ticker = setInterval(() => setTick((t) => t + 1), 10000);
    return () => clearInterval(ticker);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-6 flex items-center gap-3">
        <div className="flex items-center justify-center rounded-xl bg-primary/10 p-2.5">
          <Dog className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl text-balance">
            Fetch API
          </h1>
          <p className="text-xs text-muted-foreground">
            Everyone&apos;s favorite virtual companion
          </p>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-min">
        {/* Left Panel - Stats & Actions */}
        <Card className="order-2 md:order-1 md:col-span-1 lg:col-span-1 border-border/60 bg-card/80 backdrop-blur-sm">
          <CardContent className="h-full">
            <PetStats
              hunger={hunger}
              happiness={happiness}
              energy={energy}
              onFeed={handleFeed}
              onPet={handlePet}
              onWalk={handleWalk}
              isFeeding={isFeeding}
              isPetting={isPetting}
              isWalking={isWalking}
            />
          </CardContent>
        </Card>

        {/* Center Panel - Pet Room */}
        <Card className="order-1 md:order-2 md:col-span-2 lg:col-span-2 min-h-[320px] md:min-h-[420px] border-border/60 bg-card/80 backdrop-blur-sm">
          <CardContent className="h-full">
            <PetRoom mood={mood} petName="Biscuit" />
          </CardContent>
        </Card>

        {/* Right Panel - Activity Feed */}
        <Card className="order-3 md:col-span-3 lg:order-3 lg:col-span-1 min-h-[300px] max-h-[500px] border-border/60 bg-card/80 backdrop-blur-sm">
          <CardContent className="h-full">
            <ActivityFeed activities={activities} />
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Biscuit has been the office pet since 2024. Be kind, keep them happy!
        </p>
      </footer>
    </div>
  );
}
