import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, BarChart3, Settings, Sparkles } from 'lucide-react';

export default function StudentDashboard() {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/student" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LexiLearn</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/student/lessons" className="text-muted-foreground hover:text-foreground">Lessons</Link>
            <Link to="/student/practice" className="text-muted-foreground hover:text-foreground">Practice</Link>
            <Link to="/student/progress" className="text-muted-foreground hover:text-foreground">Progress</Link>
            <Link to="/student/settings" className="text-muted-foreground hover:text-foreground">Settings</Link>
            <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="lexi-heading text-3xl font-bold">Welcome back, {profile?.full_name || 'Learner'}! 👋</h1>
          <p className="mt-2 text-muted-foreground">Ready to continue your learning adventure?</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/student/lessons" className="lexi-card p-6 transition-all hover:shadow-lg">
            <Play className="mb-4 h-10 w-10 text-primary" />
            <h2 className="text-xl font-semibold">Continue Learning</h2>
            <p className="mt-2 text-sm text-muted-foreground">Pick up where you left off</p>
          </Link>
          <Link to="/student/practice" className="lexi-card p-6 transition-all hover:shadow-lg">
            <Sparkles className="mb-4 h-10 w-10 text-lexi-amber" />
            <h2 className="text-xl font-semibold">Practice</h2>
            <p className="mt-2 text-sm text-muted-foreground">Games, quizzes & flashcards</p>
          </Link>
          <Link to="/student/progress" className="lexi-card p-6 transition-all hover:shadow-lg">
            <BarChart3 className="mb-4 h-10 w-10 text-lexi-sage" />
            <h2 className="text-xl font-semibold">My Progress</h2>
            <p className="mt-2 text-sm text-muted-foreground">See how far you've come</p>
          </Link>
          <Link to="/student/settings" className="lexi-card p-6 transition-all hover:shadow-lg">
            <Settings className="mb-4 h-10 w-10 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="mt-2 text-sm text-muted-foreground">Customize your experience</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
