import React from 'react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[13px] font-medium text-[#999999] mb-1.5 tracking-tight">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`framer-input cursor-pointer appearance-none ${error ? '!border-[#ff5577]' : ''} ${className}`.trim()}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            paddingRight: '36px',
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled style={{ background: '#141414', color: '#999999' }}>
              {placeholder}
            </option>
          )}
          {options.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
              style={{ background: '#141414', color: '#ffffff' }}
            >
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-[12px] text-[#ff5577] tracking-tight">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
