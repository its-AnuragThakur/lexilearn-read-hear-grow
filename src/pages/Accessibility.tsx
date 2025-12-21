import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Volume2, 
  Type, 
  Palette, 
  MousePointer, 
  Keyboard,
  Monitor,
  Check,
  ArrowRight
} from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LexiLearn</span>
          </Link>
          
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/accessibility" className="font-medium text-foreground">Accessibility</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-lexi-sage-light/30 to-transparent py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="lexi-heading mb-6 text-4xl font-bold md:text-5xl">
                Accessibility Features
              </h1>
              <p className="lexi-text text-xl text-muted-foreground">
                LexiLearn is designed from the ground up to be accessible to all learners, 
                especially those with dyslexia. Here's how we make learning easier.
              </p>
            </div>
          </div>
        </section>

        {/* WCAG Compliance */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 rounded-2xl bg-primary/10 p-8">
                <h2 className="lexi-heading mb-4 text-2xl font-bold">WCAG 2.2 Compliant</h2>
                <p className="lexi-text text-muted-foreground">
                  LexiLearn follows the Web Content Accessibility Guidelines (WCAG) 2.2 
                  at the AA level, ensuring our platform is accessible to users with various 
                  disabilities including visual, auditory, motor, and cognitive impairments.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* Text-to-Speech */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">Text-to-Speech</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Read any content aloud
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Adjustable playback speed (0.5x - 2x)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Multiple voice options
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Play, pause, resume controls
                    </li>
                  </ul>
                </div>

                {/* Typography */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lexi-sage-light">
                    <Type className="h-6 w-6 text-lexi-sage" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">Dyslexia-Friendly Typography</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Lexend font (designed for readability)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      OpenDyslexic font option
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Adjustable font size (14px - 28px)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Customizable line & letter spacing
                    </li>
                  </ul>
                </div>

                {/* Colors */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                    <Palette className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">Color & Contrast</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Multiple background themes
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Cream, blue-tint, green-tint options
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      High contrast mode
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Dark mode support
                    </li>
                  </ul>
                </div>

                {/* Reading Ruler */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-warning/20">
                    <MousePointer className="h-6 w-6 text-warning" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">Reading Ruler</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Visual guide follows cursor
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Helps focus on one line
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Customizable highlight color
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Toggle on/off easily
                    </li>
                  </ul>
                </div>

                {/* Keyboard Navigation */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Keyboard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">Keyboard Navigation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Full keyboard accessibility
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Clear focus indicators
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Skip-to-content link
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Logical tab order
                    </li>
                  </ul>
                </div>

                {/* Screen Reader */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lexi-sage-light">
                    <Monitor className="h-6 w-6 text-lexi-sage" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">Screen Reader Support</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      ARIA labels throughout
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Semantic HTML structure
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Descriptive alt text
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-success" />
                      Live region announcements
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="lexi-heading mb-8 text-center text-2xl font-bold">
                Additional Accessibility Features
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'Reduced motion option',
                  'Minimal visual clutter',
                  'Calm, non-distracting colors',
                  'Large click/touch targets',
                  'Clear, simple language',
                  'Consistent navigation',
                  'Error prevention & recovery',
                  'Progress auto-save',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-lg bg-background p-4">
                    <Check className="h-5 w-5 text-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="lexi-heading mb-4 text-3xl font-bold">Experience It Yourself</h2>
            <p className="lexi-text mx-auto mb-8 max-w-xl text-muted-foreground">
              Create a free account to explore all accessibility features and customize 
              your learning experience.
            </p>
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">LexiLearn</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">About</Link>
              <Link to="/accessibility" className="hover:text-foreground">Accessibility</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 LexiLearn</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
