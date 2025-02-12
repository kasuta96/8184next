import React, { useState } from "react"
import StarIcon from "./StarIcon"

interface EditableRatingProps {
  onClick: (index: number) => void
  transition?: boolean
  ratingValue: number
  stars?: number
  size?: number
  fillColor?: string
  emptyColor?: string
  className?: string
  children?: React.ReactNode
}

export function Rating({
  ratingValue,
  onClick,
  stars = 5,
  size = 25,
  transition = false,
  fillColor = "#f1a545",
  emptyColor = "#cccccc",
  className = "",
}: EditableRatingProps): JSX.Element {
  const [hoverValue, setHoverValue] = useState(ratingValue || null)

  return (
    <span className={className}>
      {[...Array(stars)].map((_, index) => (
        <span
          key={index}
          onMouseEnter={() => setHoverValue(index + 1)}
          onMouseLeave={() => setHoverValue(null)}
          onClick={() => onClick && onClick(index + 1)}
          aria-hidden="true"
          style={{
            color:
              (hoverValue || ratingValue) && (hoverValue || ratingValue) > index
                ? fillColor
                : emptyColor,
            width: size,
            height: size,
            cursor: "pointer",
            transition: transition ? "color 0.2s ease-in-out 0s" : "",
            display: "inline-flex",
          }}
        >
          <StarIcon size={size} />
        </span>
      ))}
    </span>
  )
}
