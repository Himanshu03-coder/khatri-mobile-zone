import React from 'react'

interface BrandLogoProps {
  className?: string
  title?: string
}

/**
 * Khatri Mobile Zone brand mark — rounded black squircle housing the tablet/smartphone icon.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'w-7 h-7',
  title = 'Khatri Mobile Zone Logo',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      className={`${className} flex-shrink-0 rounded-[20%] ring-1 ring-white/15`}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect width="600" height="600" rx="105" fill="#000000" />
      <svg
        x="65"
        y="65"
        width="470"
        height="470"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.04"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="10" height="14" x="3" y="8" rx="2" />
        <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
        <path d="M8 18h.01" />
      </svg>
    </svg>
  )
}

export default BrandLogo
