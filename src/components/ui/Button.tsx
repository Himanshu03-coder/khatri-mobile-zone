import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'translucent' | 'icon' | 'ghost-cyan' | 'ghost' | 'dark-outline' | 'whatsapp' | 'whatsapp-full'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  href?: string
  external?: boolean
  className?: string
  children?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, external, className = '', children, ...props }, ref) => {
    let baseStyles = 'btn-primary'

    if (variant === 'primary' || variant === 'whatsapp' || variant === 'whatsapp-full') {
      baseStyles = 'btn-primary'
    } else if (variant === 'secondary' || variant === 'dark-outline') {
      baseStyles = 'btn-secondary'
    } else if (variant === 'translucent') {
      baseStyles = 'btn-translucent'
    } else if (variant === 'icon') {
      baseStyles = 'btn-icon-circular'
    } else if (variant === 'ghost' || variant === 'ghost-cyan') {
      baseStyles = 'inline-flex items-center justify-center gap-2 text-[14px] font-medium text-[#999999] hover:text-white transition-colors duration-150'
    }

    const sizeStyles = variant === 'icon' ? '' : size === 'sm' ? '!py-1.5 !px-3 !text-[13px]' : size === 'lg' ? '!py-3 !px-6 !text-[15px]' : ''
    const combinedClass = `${baseStyles} ${sizeStyles} ${className}`.trim()

    if (href) {
      return (
        <a
          href={href}
          className={combinedClass}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={combinedClass} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
