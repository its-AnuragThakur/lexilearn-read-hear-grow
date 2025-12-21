import { useReadingRuler } from '@/hooks/useReadingRuler';

export function ReadingRuler() {
  const { enabled, position, color } = useReadingRuler();

  if (!enabled) return null;

  return (
    <div
      className="reading-ruler pointer-events-none fixed left-0 right-0 z-50 h-12"
      style={{
        top: `${position}px`,
        backgroundColor: `${color}40`,
        boxShadow: `0 0 10px ${color}30`,
      }}
      aria-hidden="true"
    />
  );
}
