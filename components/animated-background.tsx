"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 6
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 400 + 300 // Bigger blobs
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        
        // Use the primary/accent colors from the theme (greenish)
        const hue = Math.random() > 0.5 ? 145 : 85 
        this.color = `hsla(${hue}, 60%, 50%, `
        this.opacity = Math.random() * 0.15 + 0.1 // Slightly more opaque
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > width + this.size) this.x = -this.size
        if (this.x < -this.size) this.x = width + this.size
        if (this.y > height + this.size) this.y = -this.size
        if (this.y < -this.size) this.y = height + this.size
      }

      draw() {
        if (!ctx) return
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size
        )

        gradient.addColorStop(0, `${this.color}${this.opacity})`)
        gradient.addColorStop(1, `${this.color}0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height

      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      init()
    }

    init()
    animate()

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 transition-opacity duration-1000"
      style={{ filter: "blur(60px)" }}
    />
  )
}
