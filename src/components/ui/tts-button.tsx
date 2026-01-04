/**
 * TTSButton - Text-to-Speech control
 * 
 * Design choices:
 * - Clear visual state (playing/paused/stopped)
 * - Large touch target (48px minimum)
 * - Simple one-button interaction
 * - Clear feedback on state change
 */

import { useTTS } from '@/hooks/useTTS';
import { Button } from '@/components/ui/button';
import { Volume2, Pause, StopCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface TTSButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function TTSButton({ 
  text, 
  className,
  variant = 'outline',
  size = 'lg',
}: TTSButtonProps) {
  const { speak, stop, togglePlayPause, isPlaying, isPaused } = useTTS();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (isPlaying || isPaused) {
      if (isPaused) {
        togglePlayPause();
      } else {
        stop();
      }
    } else {
      setIsLoading(true);
      speak({
        text,
        onStart: () => setIsLoading(false),
        onEnd: () => setIsLoading(false),
      });
      // Fallback in case onStart doesn't fire immediately
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const getIcon = () => {
    if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
    if (isPlaying && !isPaused) return <Pause className="h-5 w-5" />;
    if (isPaused) return <Volume2 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  const getLabel = () => {
    if (isLoading) return 'Loading...';
    if (isPlaying && !isPaused) return 'Pause';
    if (isPaused) return 'Resume';
    return 'Listen';
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      aria-label={getLabel()}
    >
      {getIcon()}
      <span className="ml-2">{getLabel()}</span>
    </Button>
  );
}
