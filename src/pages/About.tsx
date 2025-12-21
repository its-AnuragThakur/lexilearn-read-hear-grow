import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Heart, 
  Target, 
  Users,
  ArrowRight,
  Globe,
  Lightbulb,
  Shield
} from 'lucide-react';

export default function About() {
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
            <Link to="/about" className="font-medium text-foreground">About</Link>
            <Link to="/accessibility" className="text-muted-foreground hover:text-foreground">Accessibility</Link>
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
        <section className="bg-gradient-to-b from-lexi-teal-light/30 to-transparent py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="lexi-heading mb-6 text-4xl font-bold md:text-5xl">
                Our Mission
              </h1>
              <p className="lexi-text text-xl text-muted-foreground">
                We believe every student deserves access to education that works for them. 
                LexiLearn was created to break down the barriers that traditional learning 
                platforms create for dyslexic learners.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="lexi-heading mb-4 text-3xl font-bold">The Problem</h2>
                  <p className="lexi-text mb-4 text-muted-foreground">
                    Students with dyslexia struggle with traditional learning platforms due to:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-destructive" />
                      Heavy reliance on dense text
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-destructive" />
                      Poor typography and visual clutter
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-destructive" />
                      Lack of assistive tools like text-to-speech
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-destructive" />
                      No adjustable layouts or personalization
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-destructive/10 p-8 text-center">
                  <div className="text-6xl font-bold text-destructive">15-20%</div>
                  <p className="mt-2 text-lg text-muted-foreground">
                    of students have some form of dyslexia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="lexi-heading mb-12 text-center text-3xl font-bold">Our Solution</h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-2xl border border-border/50 bg-background p-6">
                  <Lightbulb className="mb-4 h-10 w-10 text-lexi-amber" />
                  <h3 className="mb-2 text-xl font-semibold">Multisensory Learning</h3>
                  <p className="lexi-text text-muted-foreground">
                    Combine reading, listening, and interactive practice for better comprehension.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background p-6">
                  <Target className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">Personalized Experience</h3>
                  <p className="lexi-text text-muted-foreground">
                    Customize fonts, colors, spacing, and audio to match individual needs.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background p-6">
                  <Heart className="mb-4 h-10 w-10 text-lexi-coral" />
                  <h3 className="mb-2 text-xl font-semibold">Encouraging Environment</h3>
                  <p className="lexi-text text-muted-foreground">
                    Calm design with positive feedback to build confidence.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background p-6">
                  <Users className="mb-4 h-10 w-10 text-lexi-sage" />
                  <h3 className="mb-2 text-xl font-semibold">Connected Community</h3>
                  <p className="lexi-text text-muted-foreground">
                    Teachers and parents can track progress and provide support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="lexi-heading mb-12 text-center text-3xl font-bold">Our Values</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Accessibility First</h3>
                  <p className="text-sm text-muted-foreground">
                    Every feature designed with dyslexic learners in mind
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-lexi-sage-light">
                    <Heart className="h-8 w-8 text-lexi-sage" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Empathy</h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding and supporting each learner's unique journey
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
                    <Globe className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Inclusion</h3>
                  <p className="text-sm text-muted-foreground">
                    Equal learning opportunities for everyone
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-primary/10 to-lexi-sage-light py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="lexi-heading mb-4 text-3xl font-bold">Join Our Mission</h2>
            <p className="lexi-text mx-auto mb-8 max-w-xl text-muted-foreground">
              Help us make education accessible for all students.
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
