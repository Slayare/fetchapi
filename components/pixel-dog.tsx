"use client"

import { useEffect, useRef, useState } from "react"

type DogMood = "idle" | "happy" | "eating" | "sleeping" | "walking"

interface PixelDogProps {
  mood: DogMood
}

export function PixelDog({ mood }: PixelDogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    ctx.imageSmoothingEnabled = false

    // Clear
    ctx.clearRect(0, 0, w, h)

    // Draw room background
    drawRoom(ctx, w, h)

    // Draw dog
    drawDog(ctx, w, h, mood, frame)
  }, [mood, frame])

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={240}
      className="w-full h-full"
      style={{ imageRendering: "pixelated" }}
      aria-label={`Pixel art dog in a room, currently ${mood}`}
      role="img"
    />
  )
}

function drawRoom(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Floor
  ctx.fillStyle = "#f0e6d3"
  ctx.fillRect(0, h * 0.65, w, h * 0.35)

  // Floor pattern (tile grid)
  ctx.strokeStyle = "#e0d4bf"
  ctx.lineWidth = 1
  for (let x = 0; x < w; x += 32) {
    ctx.beginPath()
    ctx.moveTo(x, h * 0.65)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = h * 0.65; y < h; y += 20) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }

  // Wall
  ctx.fillStyle = "#fef3e2"
  ctx.fillRect(0, 0, w, h * 0.65)

  // Baseboard
  ctx.fillStyle = "#d4c4a8"
  ctx.fillRect(0, h * 0.65 - 6, w, 6)

  // Window
  const winX = w * 0.68
  const winY = h * 0.08
  const winW = 65
  const winH = 75
  ctx.fillStyle = "#bde0fe"
  ctx.fillRect(winX, winY, winW, winH)
  ctx.strokeStyle = "#f5f0e8"
  ctx.lineWidth = 4
  ctx.strokeRect(winX, winY, winW, winH)
  // Window cross
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(winX + winW / 2, winY)
  ctx.lineTo(winX + winW / 2, winY + winH)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(winX, winY + winH / 2)
  ctx.lineTo(winX + winW, winY + winH / 2)
  ctx.stroke()

  // Sun through window
  ctx.fillStyle = "#ffd166"
  ctx.beginPath()
  ctx.arc(winX + winW * 0.7, winY + winH * 0.3, 10, 0, Math.PI * 2)
  ctx.fill()

  // Small plant on floor
  const plantX = w * 0.84
  const plantY = h * 0.65 - 6
  // Pot
  ctx.fillStyle = "#d4886b"
  ctx.fillRect(plantX - 6, plantY - 14, 12, 14)
  ctx.fillStyle = "#c27856"
  ctx.fillRect(plantX - 7, plantY - 16, 14, 4)
  // Leaves
  ctx.fillStyle = "#7cb97c"
  ctx.beginPath()
  ctx.ellipse(plantX, plantY - 26, 6, 14, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = "#6aaa6a"
  ctx.beginPath()
  ctx.ellipse(plantX - 4, plantY - 22, 5, 10, -0.3, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(plantX + 4, plantY - 22, 5, 10, 0.3, 0, Math.PI * 2)
  ctx.fill()

  // Dog bed
  const bedX = w * 0.12
  const bedY = h * 0.65 + 12
  ctx.fillStyle = "#e8b4c8"
  ctx.beginPath()
  ctx.ellipse(bedX + 22, bedY + 8, 26, 12, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = "#d99ab5"
  ctx.beginPath()
  ctx.ellipse(bedX + 22, bedY + 8, 20, 8, 0, 0, Math.PI * 2)
  ctx.fill()

  // Food bowl
  const bowlX = w * 0.38
  const bowlY = h * 0.65 + 24
  ctx.fillStyle = "#88c9e8"
  ctx.beginPath()
  ctx.ellipse(bowlX, bowlY, 12, 7, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = "#70b8d9"
  ctx.beginPath()
  ctx.ellipse(bowlX, bowlY, 9, 5, 0, 0, Math.PI * 2)
  ctx.fill()
  // Kibble
  ctx.fillStyle = "#c9a96e"
  ctx.fillRect(bowlX - 3, bowlY - 3, 2, 2)
  ctx.fillRect(bowlX + 1, bowlY - 2, 2, 2)
  ctx.fillRect(bowlX - 1, bowlY - 4, 2, 2)
}

function drawDog(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  mood: DogMood,
  frame: number
) {
  const centerX = w * 0.48
  const groundY = h * 0.65
  const dogY = groundY - 10
  const bounce = mood === "happy" ? Math.sin(frame * Math.PI / 2) * 3 : 0
  const walkOffset = mood === "walking" ? Math.sin(frame * Math.PI / 2) * 6 : 0

  const x = centerX + walkOffset
  const y = dogY - bounce

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.08)"
  ctx.beginPath()
  ctx.ellipse(centerX, groundY + 2, 15, 5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Body
  ctx.fillStyle = "#f5d6a0"
  ctx.fillRect(x - 10, y - 20, 20, 18)

  // Body spots
  ctx.fillStyle = "#e8c088"
  ctx.fillRect(x - 5, y - 18, 5, 5)
  ctx.fillRect(x + 1, y - 14, 4, 6)

  // Legs
  const legAnim = mood === "walking" ? Math.sin(frame * Math.PI / 2) * 3 : 0
  ctx.fillStyle = "#f5d6a0"
  // Front legs
  ctx.fillRect(x - 7, y, 4, 10 + legAnim)
  ctx.fillRect(x + 3, y, 4, 10 - legAnim)
  // Back paws
  ctx.fillStyle = "#e8c088"
  ctx.fillRect(x - 7, y + 8 + legAnim, 4, 3)
  ctx.fillRect(x + 3, y + 8 - legAnim, 4, 3)

  // Head
  ctx.fillStyle = "#f5d6a0"
  ctx.fillRect(x - 8, y - 36, 16, 18)

  // Ears
  ctx.fillStyle = "#d4a670"
  ctx.fillRect(x - 10, y - 42, 6, 10)
  ctx.fillRect(x + 4, y - 42, 6, 10)

  // Inner ears
  ctx.fillStyle = "#e8b4c8"
  ctx.fillRect(x - 8, y - 40, 3, 6)
  ctx.fillRect(x + 5, y - 40, 3, 6)

  // Eyes
  if (mood === "sleeping") {
    // Closed eyes (zzz)
    ctx.strokeStyle = "#5a4030"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x - 4, y - 28)
    ctx.lineTo(x - 1, y - 28)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x + 1, y - 28)
    ctx.lineTo(x + 4, y - 28)
    ctx.stroke()

    // Z's
    ctx.fillStyle = "#88c9e8"
    ctx.font = "bold 10px monospace"
    const zBounce = Math.sin(frame * Math.PI / 2) * 2
    ctx.fillText("z", x + 10, y - 36 - zBounce)
    ctx.font = "bold 8px monospace"
    ctx.fillText("z", x + 15, y - 42 - zBounce)
  } else {
    // Open eyes
    ctx.fillStyle = "#5a4030"
    ctx.fillRect(x - 4, y - 30, 3, 3)
    ctx.fillRect(x + 1, y - 30, 3, 3)

    // Eye shine
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(x - 3, y - 30, 1, 1)
    ctx.fillRect(x + 2, y - 30, 1, 1)

    // Happy eyes (^_^)
    if (mood === "happy") {
      ctx.fillStyle = "#f5d6a0"
      ctx.fillRect(x - 4, y - 30, 3, 2)
      ctx.fillRect(x + 1, y - 30, 3, 2)
      ctx.fillStyle = "#5a4030"
      ctx.beginPath()
      ctx.arc(x - 2.5, y - 28, 2, Math.PI, 0)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x + 2.5, y - 28, 2, Math.PI, 0)
      ctx.stroke()
    }
  }

  // Nose
  ctx.fillStyle = "#5a4030"
  ctx.fillRect(x - 2, y - 24, 4, 3)

  // Mouth
  if (mood === "eating") {
    // Open mouth
    ctx.fillStyle = "#d47070"
    ctx.fillRect(x - 3, y - 20, 6, 4)
    // Food particle
    ctx.fillStyle = "#c9a96e"
    const foodBounce = frame % 2
    ctx.fillRect(x - 4 + foodBounce * 2, y - 22 + foodBounce * 2, 2, 2)
  } else if (mood === "happy") {
    // Smile
    ctx.strokeStyle = "#5a4030"
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(x, y - 20, 3, 0, Math.PI)
    ctx.stroke()
  }

  // Tail
  const tailWag = Math.sin(frame * Math.PI / 1.5) * 8
  ctx.fillStyle = "#d4a670"
  ctx.save()
  ctx.translate(x + 10, y - 16)
  ctx.rotate((-30 + tailWag) * Math.PI / 180)
  ctx.fillRect(0, -2, 10, 4)
  ctx.restore()

  // Blush marks when happy
  if (mood === "happy") {
    ctx.fillStyle = "rgba(232, 180, 200, 0.6)"
    ctx.beginPath()
    ctx.ellipse(x - 7, y - 24, 2.5, 2, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(x + 7, y - 24, 2.5, 2, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  // Hearts when being pet
  if (mood === "happy" && frame % 2 === 0) {
    drawHeart(ctx, x - 14, y - 48, 5, "#e8b4c8")
    drawHeart(ctx, x + 12, y - 44, 4, "#fca5a5")
  }
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y + size / 4)
  ctx.quadraticCurveTo(x, y, x + size / 4, y)
  ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4)
  ctx.quadraticCurveTo(x + size / 2, y, x + size * 0.75, y)
  ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4)
  ctx.quadraticCurveTo(x + size, y + size / 2, x + size / 2, y + size * 0.75)
  ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4)
  ctx.fill()
}
