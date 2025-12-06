'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          ref={ref}
          className={`w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-accent transition-colors peer ${className}`}
          placeholder=" "
          {...props}
        />
        <label
          className="absolute left-0 top-4 text-gray-500 transition-all duration-300 pointer-events-none
          peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-accent
          peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full peer-focus:w-full" />
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
