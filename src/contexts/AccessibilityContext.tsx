import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { AccessibilityPreferences } from '@/types';

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (updates: Partial<AccessibilityPreferences>) => Promise<void>;
  isLoading: boolean;
}

const defaultPreferences: AccessibilityPreferences = {
  id: '',
  user_id: '',
  font_family: 'lexend',
  font_size: 18,
  line_spacing: 1.8,
  letter_spacing: 0.05,
  background_theme: 'default',
  tts_speed: 1.0,
  tts_voice: null,
  reading_ruler_enabled: false,
  reading_ruler_color: '#ffeb3b',
  high_contrast: false,
  reduced_motion: true,
  updated_at: new Date().toISOString(),
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'lexilearn_accessibility_prefs';

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    // Load from localStorage first for instant application
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Apply preferences to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font family
    if (preferences.font_family === 'open-dyslexic') {
      root.classList.add('font-open-dyslexic');
      root.classList.remove('font-lexend');
    } else {
      root.classList.add('font-lexend');
      root.classList.remove('font-open-dyslexic');
    }

    // Font size
    root.style.setProperty('--base-font-size', `${preferences.font_size}px`);
    document.body.style.fontSize = `${preferences.font_size}px`;

    // Line spacing
    root.style.setProperty('--line-height', `${preferences.line_spacing}`);
    document.body.style.lineHeight = `${preferences.line_spacing}`;

    // Letter spacing
    root.style.setProperty('--letter-spacing', `${preferences.letter_spacing}em`);
    document.body.style.letterSpacing = `${preferences.letter_spacing}em`;

    // Background theme
    root.classList.remove('theme-cream', 'theme-blue-tint', 'theme-green-tint', 'theme-high-contrast');
    if (preferences.background_theme !== 'default') {
      root.classList.add(`theme-${preferences.background_theme}`);
    }

    // High contrast
    if (preferences.high_contrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (preferences.reduced_motion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Store in localStorage for fast loading
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  // Load preferences from database when user is authenticated
  useEffect(() => {
    if (user) {
      loadPreferences();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('accessibility_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading preferences:', error);
      }

      if (data) {
        const prefs = data as unknown as AccessibilityPreferences;
        setPreferences(prefs);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = useCallback(async (updates: Partial<AccessibilityPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    if (user) {
      try {
        const { error } = await supabase
          .from('accessibility_preferences')
          .upsert({
            user_id: user.id,
            ...updates,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        if (error) {
          console.error('Error saving preferences:', error);
        }
      } catch (error) {
        console.error('Error saving preferences:', error);
      }
    }
  }, [preferences, user]);

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        updatePreferences,
        isLoading,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
