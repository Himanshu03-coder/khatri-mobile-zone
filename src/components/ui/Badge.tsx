import React from 'react'

export type BadgeVariant = 'default' | 'muted' | 'accent' | 'blue' | 'success' | 'green' | 'amber' | 'deal' | 'cyan'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  dot?: boolean
  className?: string
  children?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', dot = false, className = '', children, ...props }) => {
  let badgeStyle = 'bg-[#1c1c1c] text-[#999999] border border-[#262626]'
  let dotColor = '#999999'

  if (variant === 'accent' || variant === 'blue' || variant === 'cyan') {
    badgeStyle = 'bg-[#0099ff]/10 text-[#0099ff] border border-[#0099ff]/25'
    dotColor = '#0099ff'
  } else if (variant === 'success' || variant === 'green') {
    badgeStyle = 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/25'
    dotColor = '#22c55e'
  } else if (variant === 'amber') {
    badgeStyle = 'bg-[#ff7a3d]/10 text-[#ff7a3d] border border-[#ff7a3d]/25'
    dotColor = '#ff7a3d'
  } else if (variant === 'deal') {
    badgeStyle = 'bg-[#ff5577]/10 text-[#ff5577] border border-[#ff5577]/25'
    dotColor = '#ff5577'
  } else if (variant === 'default' || variant === 'muted') {
    badgeStyle = 'bg-[#1c1c1c] text-[#999999] border border-[#262626]'
    dotColor = '#999999'
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[12px] font-medium tracking-tight ${badgeStyle} ${className}`.trim()}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </span>
  )
}

export default Badge
