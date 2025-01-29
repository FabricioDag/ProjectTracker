import type React from "react"
import "./RingBar.css"

interface RingBarProps {
  progress: number
  size?: number
  strokeWidth?: number
  backgroundColor?: string
  progressColor?: string
}

const RingBar: React.FC<RingBarProps> = ({
  progress,
  size = 70,
  strokeWidth = 5,
  backgroundColor = "#e0e0e0",
  progressColor = "#3498db",
}) => {
  const normalizedProgress = Math.min(1, Math.max(0, progress))
  const circumference = size * Math.PI
  const strokeDashoffset = circumference - normalizedProgress * circumference

  return (
    <div
      className="ring-bar"
      style={
        {
          "--size": `${size}px`,
          "--stroke-width": `${strokeWidth}px`,
          "--background-color": backgroundColor,
          "--progress-color": progressColor,
          "--circumference": `${circumference}px`,
          "--offset": `${strokeDashoffset}px`,
        } as React.CSSProperties
      }
    >
      <svg className="ring-bar__svg" width={size} height={size}>
        <circle
          className="ring-bar__circle ring-bar__circle--background"
          r={(size - strokeWidth) / 2}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="ring-bar__circle ring-bar__circle--progress"
          r={(size - strokeWidth) / 2}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    </div>
  )
}

export  {RingBar}

