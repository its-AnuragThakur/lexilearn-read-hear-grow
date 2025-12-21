import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Volume2, 
  Settings2, 
  Users, 
  Target, 
  Heart,
  ArrowRight,
  Check,
  Sparkles,
  GraduationCap,
  BarChart3
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip Link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">LexiLearn</span>
          </Link>
          
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <Link to="/accessibility" className="text-muted-foreground transition-colors hover:text-foreground">
              Accessibility
            </Link>
            <Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-lexi-teal-light/30 to-transparent" />
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-lexi-sage-light px-4 py-2 text-sm font-medium text-lexi-sage">
                <Sparkles className="h-4 w-4" />
                Designed for dyslexic learners
              </div>
              
              <h1 className="lexi-heading mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Learning Made
                <span className="block text-primary"> Accessible & Fun</span>
              </h1>
              
              <p className="lexi-text mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
                LexiLearn helps dyslexic students read, hear, and understand content 
                in their own way. With text-to-speech, customizable fonts, and 
                interactive practice tools.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/signup">
                  <Button size="lg" className="gap-2 px-8 text-lg">
                    Start Learning Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="px-8 text-lg">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* User type cards */}
              <div className="mt-16 grid gap-4 md:grid-cols-3">
                <Link to="/signup?role=student" className="group">
                  <div className="lexi-card p-6 transition-all hover:border-primary/50">
                    <GraduationCap className="mx-auto mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 text-lg font-semibold">I'm a Student</h3>
                    <p className="text-sm text-muted-foreground">
                      Start learning with personalized tools
                    </p>
                  </div>
                </Link>
                <Link to="/signup?role=teacher" className="group">
                  <div className="lexi-card p-6 transition-all hover:border-primary/50">
                    <BookOpen className="mx-auto mb-4 h-10 w-10 text-lexi-sage" />
                    <h3 className="mb-2 text-lg font-semibold">I'm a Teacher</h3>
                    <p className="text-sm text-muted-foreground">
                      Create lessons & track progress
                    </p>
                  </div>
                </Link>
                <Link to="/signup?role=parent" className="group">
                  <div className="lexi-card p-6 transition-all hover:border-primary/50">
                    <Users className="mx-auto mb-4 h-10 w-10 text-lexi-amber" />
                    <h3 className="mb-2 text-lg font-semibold">I'm a Parent</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor your child's learning journey
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border/50 bg-card py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="lexi-heading mb-4 text-3xl font-bold md:text-4xl">
                Built for How You Learn
              </h2>
              <p className="lexi-text text-lg text-muted-foreground">
                Every feature is designed to reduce cognitive load and make learning enjoyable.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-2xl border border-border/50 bg-background p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Volume2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Text-to-Speech</h3>
                <p className="lexi-text text-muted-foreground">
                  Listen to any content with adjustable speed. Hear lessons while following along visually.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-border/50 bg-background p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lexi-sage-light">
                  <Settings2 className="h-6 w-6 text-lexi-sage" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Personalized Display</h3>
                <p className="lexi-text text-muted-foreground">
                  Adjust fonts, spacing, colors, and contrast to match your reading preferences.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-border/50 bg-background p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                  <Target className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Reading Ruler</h3>
                <p className="lexi-text text-muted-foreground">
                  A visual guide that follows your cursor to help focus on one line at a time.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-2xl border border-border/50 bg-background p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Interactive Practice</h3>
                <p className="lexi-text text-muted-foreground">
                  Word decoding games, flashcards, quizzes, and spelling practice with instant feedback.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-2xl border border-border/50 bg-background p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lexi-sage-light">
                  <BarChart3 className="h-6 w-6 text-lexi-sage" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Progress Tracking</h3>
                <p className="lexi-text text-muted-foreground">
                  Visual charts showing improvement over time. Celebrate every milestone.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-2xl border border-border/50 bg-background p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                  <Heart className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Encouraging Design</h3>
                <p className="lexi-text text-muted-foreground">
                  Calm colors, minimal text, and positive feedback create a stress-free learning environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SDG Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-primary/10 via-lexi-sage-light to-accent/10 p-8 md:p-12">
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex-shrink-0">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary text-4xl font-bold text-primary-foreground">
                    4
                  </div>
                </div>
                <div>
                  <h2 className="lexi-heading mb-4 text-2xl font-bold md:text-3xl">
                    SDG-4: Quality Education
                  </h2>
                  <p className="lexi-text text-muted-foreground">
                    LexiLearn contributes to the United Nations Sustainable Development Goal 4 
                    by providing inclusive, equitable quality education and promoting lifelong 
                    learning opportunities for students with dyslexia.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Inclusive digital education tools',
                      'Support for learners with disabilities',
                      'Equal learning opportunities',
                      'Assistive technology for all'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-5 w-5 text-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border/50 bg-card py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="lexi-heading mb-4 text-3xl font-bold md:text-4xl">
              Ready to Start Learning?
            </h2>
            <p className="lexi-text mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              Join thousands of students who are discovering the joy of learning 
              with tools designed just for them.
            </p>
            <Link to="/signup">
              <Button size="lg" className="gap-2 px-10 text-lg">
                Create Free Account
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
            <p className="text-sm text-muted-foreground">
              © 2024 LexiLearn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
