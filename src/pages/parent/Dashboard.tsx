import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, BarChart3, MessageSquare } from 'lucide-react';

export default function ParentDashboard() {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/parent" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LexiLearn</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/parent/progress" className="text-muted-foreground hover:text-foreground">Progress</Link>
            <Link to="/parent/feedback" className="text-muted-foreground hover:text-foreground">Feedback</Link>
            <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="lexi-heading mb-8 text-3xl font-bold">Parent Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Link to="/parent/progress" className="lexi-card p-6 hover:shadow-lg">
            <BarChart3 className="mb-4 h-10 w-10 text-primary" />
            <h2 className="text-xl font-semibold">Child's Progress</h2>
            <p className="mt-2 text-sm text-muted-foreground">View learning progress</p>
          </Link>
          <Link to="/parent/feedback" className="lexi-card p-6 hover:shadow-lg">
            <MessageSquare className="mb-4 h-10 w-10 text-lexi-sage" />
            <h2 className="text-xl font-semibold">Teacher Feedback</h2>
            <p className="mt-2 text-sm text-muted-foreground">Communication from teachers</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
