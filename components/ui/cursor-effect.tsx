"use client"

import { useEffect, useState } from "react"

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const hideCursor = () => setIsVisible(false)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseleave", hideCursor)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseleave", hideCursor)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Large background spotlight effect */}
      <div
        className="fixed pointer-events-none z-10"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          transition: "all 0.1s ease-out"
        }}
      >
        <div
          className="w-[500px] h-[500px] rounded-full opacity-[0.12] dark:opacity-[0.08]"
          style={{
            background: `radial-gradient(circle,
              rgba(59, 130, 246, 0.3) 0%,
              rgba(59, 130, 246, 0.15) 25%,
              rgba(59, 130, 246, 0.08) 50%,
              transparent 70%
            )`
          }}
        />
      </div>

      {/* Smaller inner glow */}
      <div
        className="fixed pointer-events-none z-20"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          transition: "all 0.05s ease-out"
        }}
      >
        <div
          className="w-[200px] h-[200px] rounded-full opacity-15 dark:opacity-10"
          style={{
            background: `radial-gradient(circle,
              rgba(139, 92, 246, 0.25) 0%,
              rgba(139, 92, 246, 0.12) 40%,
              transparent 70%
            )`
          }}
        />
      </div>
    </>
  )
}