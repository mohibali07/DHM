'use client'

import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, ...props }, ref) => {
    return (
      <div className="relative group">
        <select
          ref={ref}
          className={`w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-accent transition-colors peer appearance-none ${className}`}
          {...props}
        >
          <option value="" disabled selected hidden></option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-black text-white">
              {option.label}
            </option>
          ))}
        </select>
        <label
          className="absolute left-0 top-4 text-gray-500 transition-all duration-300 pointer-events-none
          peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-accent
          peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full peer-focus:w-full" />
        
        {/* Custom Arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
