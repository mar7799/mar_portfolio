import React from 'react'

// Minimal shadcn-style button primitive
// Props: variant: 'default' | 'ghost', size: 'sm' | 'md' | 'lg', className, children, ...rest
export default function Button({ variant = 'default', size = 'md', className = '', children, ...rest }) {
  const base = 'inline-flex appearance-none items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer'
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400',
    ghost: 'border border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }
  const classes = [base, variants[variant] || variants.default, sizes[size] || sizes.md, className].join(' ')
  return (
    <button type={rest.type || 'button'} className={classes} {...rest}>
      {children}
    </button>
  )
}
