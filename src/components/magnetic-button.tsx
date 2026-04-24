import { useRef, useState, useEffect } from "react"

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  size?: "md" | "lg"
  className?: string
}

export function MagneticButton({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  className = "" 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseStyles = "relative overflow-hidden rounded-full font-medium transition-all duration-300 ease-out backdrop-blur-md"
  
  const variantStyles = {
    primary: "bg-foreground/95 text-background hover:bg-foreground hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/20 hover:scale-[1.02] active:scale-[0.98]"
  }
  
  const sizeStyles = {
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base"
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}
