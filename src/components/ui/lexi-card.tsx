/**
 * LexiCard - Dyslexia-friendly card component
 * 
 * Design choices:
 * - Large click/tap area (min 72px height)
 * - Clear visual feedback on interaction
 * - Soft shadows, no harsh edges
 * - Left-aligned text only
 * - Generous padding for readability
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LexiCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'button' | 'article';
  isActive?: boolean;
  isCompleted?: boolean;
}

export function LexiCard({ 
  children, 
  className, 
  onClick, 
  as: Component = 'div',
  isActive = false,
  isCompleted = false,
}: LexiCardProps) {
  const isInteractive = !!onClick || Component === 'button';

  return (
    <Component
      onClick={onClick}
      className={cn(
        // Base styles - soft, readable
        'relative block w-full rounded-2xl bg-card p-6 text-left',
        'border-2 border-border/50',
        
        // Interactive states
        isInteractive && [
          'cursor-pointer',
          'transition-all duration-150 ease-out',
          'hover:border-primary/30 hover:shadow-md',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'active:scale-[0.98]',
        ],
        
        // Active state
        isActive && 'border-primary bg-primary/5',
        
        // Completed state
        isCompleted && 'border-success/50 bg-success/5',
        
        className
      )}
    >
      {/* Completion indicator */}
      {isCompleted && (
        <div 
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground"
          aria-label="Completed"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      
      {children}
    </Component>
  );
}

// Simple progress indicator for cards
interface LexiProgressProps {
  value: number; // 0-100
  className?: string;
}

export function LexiProgress({ value, className }: LexiProgressProps) {
  return (
    <div 
      className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className="h-full rounded-full bg-primary transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
