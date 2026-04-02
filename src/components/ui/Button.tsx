'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  icon?: LucideIcon
  isLoading?: boolean
  fullWidth?: boolean
}

/**
 * High-Fidelity Shared Button Component
 * Standardizes interactions and aesthetics across the registry.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading,
  fullWidth,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all active:scale-[0.98] outline-none focus-visible:ring-4 focus-visible:ring-primary-600/20 disabled:opacity-50 disabled:pointer-events-none tracking-tight"
  
  const variants = {
    primary: "bg-primary-600 text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700",
    secondary: "bg-slate-900 text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800",
    outline: "bg-white border-2 border-slate-100 text-slate-900 hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
  }

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
    icon: "h-10 w-10 p-0"
  }

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : Icon && (
        <Icon className={`${children ? 'mr-2' : ''} h-4 w-4`} />
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'
