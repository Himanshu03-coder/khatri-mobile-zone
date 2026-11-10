import React from 'react'

export type CardVariant = 
  | 'default' 
  | 'surface-1' 
  | 'surface-2' 
  | 'featured' 
  | 'bento' 
  | 'admin' 
  | 'glass'
  | 'spotlight-violet'
  | 'spotlight-orange'
  | 'spotlight-magenta'
  | 'spotlight-coral'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  className?: string
  children?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ variant = 'default', className = '', children, ...props }) => {
  const variantClass: Record<CardVariant, string> = {
    default: 'framer-card',
    'surface-1': 'framer-card',
    'surface-2': 'framer-card-featured',
    featured: 'framer-card-featured',
    bento: 'framer-card',
    admin: 'bg-[#141414] border border-[#262626] rounded-[20px] p-6',
    glass: 'bg-[#141414]/90 backdrop-blur-md border border-[#262626] rounded-[20px] p-6',
    'spotlight-violet': 'spotlight-card-violet',
    'spotlight-orange': 'spotlight-card-orange',
    'spotlight-magenta': 'spotlight-card-magenta',
    'spotlight-coral': 'spotlight-card-coral',
  }

  return (
    <div className={`${variantClass[variant]} ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export default Card
