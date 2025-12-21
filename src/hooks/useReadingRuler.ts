import { useState, useEffect, useCallback } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export function useReadingRuler() {
  const { preferences, updatePreferences } = useAccessibility();
  const [position, setPosition] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (preferences.reading_ruler_enabled) {
      setPosition(e.clientY - 24); // Center the ruler on cursor
    }
  }, [preferences.reading_ruler_enabled]);

  useEffect(() => {
    if (preferences.reading_ruler_enabled) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [preferences.reading_ruler_enabled, handleMouseMove]);

  const toggleRuler = useCallback(() => {
    updatePreferences({ reading_ruler_enabled: !preferences.reading_ruler_enabled });
  }, [preferences.reading_ruler_enabled, updatePreferences]);

  const setRulerColor = useCallback((color: string) => {
    updatePreferences({ reading_ruler_color: color });
  }, [updatePreferences]);

  return {
    enabled: preferences.reading_ruler_enabled,
    position,
    color: preferences.reading_ruler_color,
    toggleRuler,
    setRulerColor,
  };
}
