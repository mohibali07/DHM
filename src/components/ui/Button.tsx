'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', ...props }, ref) => {
    const baseStyles = "relative px-8 py-4 rounded-full font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 group"
    const variants = {
      primary: "bg-white text-black hover:bg-accent hover:text-white",
      secondary: "border border-white/20 hover:border-white text-white",
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
