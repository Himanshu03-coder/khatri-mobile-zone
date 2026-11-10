import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  variant?: 'default' | 'search' | 'form'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, variant = 'form', className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[13px] font-medium text-[#999999] mb-1.5 tracking-tight">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3.5 text-[#999999] pointer-events-none flex items-center justify-center">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`framer-input ${icon ? '!pl-10' : ''} ${error ? '!border-[#ff5577]' : ''} ${className}`.trim()}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-[12px] text-[#ff5577] tracking-tight">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
