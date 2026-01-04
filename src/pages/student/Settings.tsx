/**
 * Profile/Settings Page
 * 
 * Design choices:
 * - Display user info clearly at top
 * - Accessibility preferences with large controls
 * - Font size, line spacing, theme options
 * - Simple sliders and toggles
 * - Clear labels and feedback
 */

import { StudentLayout } from '@/components/layout/StudentLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { LexiCard } from '@/components/ui/lexi-card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Type, AlignLeft, Palette, Volume2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

// Theme options
const themes = [
  { id: 'default', name: 'Default', color: 'bg-background' },
  { id: 'cream', name: 'Cream', color: 'bg-lexi-cream' },
  { id: 'blue-tint', name: 'Blue Tint', color: 'bg-lexi-blue-tint' },
  { id: 'green-tint', name: 'Green Tint', color: 'bg-lexi-green-tint' },
];

// Font options
const fonts = [
  { id: 'lexend', name: 'Lexend' },
  { id: 'open-dyslexic', name: 'OpenDyslexic' },
];

export default function StudentSettings() {
  const { profile, signOut } = useAuth();
  const { preferences, updatePreferences } = useAccessibility();

  return (
    <StudentLayout pageTitle="Profile">
      <div className="mx-auto max-w-2xl space-y-8">
        
        {/* User info section */}
        <section>
          <LexiCard>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-foreground">
                  {profile?.full_name || 'Student'}
                </h2>
                <p className="text-muted-foreground">
                  {profile?.email || 'Student account'}
                </p>
              </div>
            </div>
          </LexiCard>
        </section>

        {/* Accessibility Settings */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-medium text-foreground">
            <Eye className="h-5 w-5" />
            Display Settings
          </h2>

          {/* Font Family */}
          <LexiCard>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Type className="h-5 w-5 text-muted-foreground" />
                <Label className="text-lg text-foreground">Font Style</Label>
              </div>
              <div className="flex gap-3">
                {fonts.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => updatePreferences({ font_family: font.id as 'lexend' | 'open-dyslexic' })}
                    className={cn(
                      'flex-1 rounded-xl border-2 px-4 py-3 text-base font-medium transition-all',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      preferences.font_family === font.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    )}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>
          </LexiCard>

          {/* Font Size */}
          <LexiCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-muted-foreground" />
                  <Label className="text-lg text-foreground">Text Size</Label>
                </div>
                <span className="text-lg font-medium text-primary">
                  {preferences.font_size}px
                </span>
              </div>
              <Slider
                value={[preferences.font_size]}
                onValueChange={([value]) => updatePreferences({ font_size: value })}
                min={14}
                max={28}
                step={2}
                className="py-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Smaller</span>
                <span>Larger</span>
              </div>
            </div>
          </LexiCard>

          {/* Line Spacing */}
          <LexiCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlignLeft className="h-5 w-5 text-muted-foreground" />
                  <Label className="text-lg text-foreground">Line Spacing</Label>
                </div>
                <span className="text-lg font-medium text-primary">
                  {preferences.line_spacing.toFixed(1)}
                </span>
              </div>
              <Slider
                value={[preferences.line_spacing * 10]}
                onValueChange={([value]) => updatePreferences({ line_spacing: value / 10 })}
                min={14}
                max={28}
                step={2}
                className="py-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Compact</span>
                <span>Spacious</span>
              </div>
            </div>
          </LexiCard>

          {/* Background Theme */}
          <LexiCard>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <Label className="text-lg text-foreground">Background Color</Label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => updatePreferences({ background_theme: theme.id as 'default' | 'cream' | 'blue-tint' | 'green-tint' })}
                    className={cn(
                      'flex h-14 items-center justify-center rounded-xl border-2 text-base font-medium transition-all',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      theme.color,
                      preferences.background_theme === theme.id
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>
          </LexiCard>
        </section>

        {/* Reading Aids */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-medium text-foreground">
            <Volume2 className="h-5 w-5" />
            Reading Aids
          </h2>

          {/* Reading Ruler */}
          <LexiCard>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-lg text-foreground">Reading Ruler</Label>
                <p className="text-sm text-muted-foreground">
                  Highlight line while reading
                </p>
              </div>
              <Switch
                checked={preferences.reading_ruler_enabled}
                onCheckedChange={(checked) => updatePreferences({ reading_ruler_enabled: checked })}
              />
            </div>
          </LexiCard>

          {/* TTS Speed */}
          <LexiCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg text-foreground">Speech Speed</Label>
                <span className="text-lg font-medium text-primary">
                  {preferences.tts_speed.toFixed(1)}x
                </span>
              </div>
              <Slider
                value={[preferences.tts_speed * 10]}
                onValueChange={([value]) => updatePreferences({ tts_speed: value / 10 })}
                min={5}
                max={20}
                step={1}
                className="py-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Slower</span>
                <span>Faster</span>
              </div>
            </div>
          </LexiCard>

          {/* Reduced Motion */}
          <LexiCard>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-lg text-foreground">Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations
                </p>
              </div>
              <Switch
                checked={preferences.reduced_motion}
                onCheckedChange={(checked) => updatePreferences({ reduced_motion: checked })}
              />
            </div>
          </LexiCard>
        </section>

        {/* Sign Out */}
        <section className="pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={signOut}
            className="h-14 w-full text-base text-muted-foreground"
          >
            Sign Out
          </Button>
        </section>
      </div>
    </StudentLayout>
  );
}
