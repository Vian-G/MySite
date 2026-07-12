import React from 'react';
import { cn } from '@/lib/utils';

interface PhysicalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'metal' | 'graphite' | 'rust';
  size?: 'sm' | 'md' | 'lg';
}

export const PhysicalButton = React.forwardRef<HTMLButtonElement, PhysicalButtonProps>(
  ({ className, variant = 'graphite', size = 'md', children, ...props }, ref) => {
    
    const variants = {
      metal: 'bg-secondary text-secondary-foreground border-foreground/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)] hover:bg-[#C0BDA3]',
      graphite: 'bg-[#2B2D2A] text-[#F1EDE4] border-[#1B1C1A] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.2),0_1px_1px_rgba(0,0,0,0.3)] hover:bg-[#353733]',
      rust: 'bg-primary text-primary-foreground border-[#8A2B1B] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(184,66,45,0.2),0_1px_1px_rgba(0,0,0,0.2)] hover:bg-[#C94D36]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-[2px] border font-sans font-medium',
          'transition-all duration-75 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
          'active:translate-y-[1px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_0px_0px_rgba(0,0,0,0)]',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PhysicalButton.displayName = 'PhysicalButton';
