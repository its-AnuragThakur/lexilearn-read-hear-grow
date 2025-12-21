import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, FileText, BarChart3 } from 'lucide-react';

export default function TeacherDashboard() {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/teacher" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LexiLearn</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/teacher/lessons" className="text-muted-foreground hover:text-foreground">Lessons</Link>
            <Link to="/teacher/reports" className="text-muted-foreground hover:text-foreground">Reports</Link>
            <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="lexi-heading mb-8 text-3xl font-bold">Teacher Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <Link to="/teacher/lessons" className="lexi-card p-6 hover:shadow-lg">
            <FileText className="mb-4 h-10 w-10 text-primary" />
            <h2 className="text-xl font-semibold">Manage Lessons</h2>
            <p className="mt-2 text-sm text-muted-foreground">Create and edit lessons</p>
          </Link>
          <div className="lexi-card p-6">
            <Users className="mb-4 h-10 w-10 text-lexi-sage" />
            <h2 className="text-xl font-semibold">Students</h2>
            <p className="mt-2 text-sm text-muted-foreground">View enrolled students</p>
          </div>
          <Link to="/teacher/reports" className="lexi-card p-6 hover:shadow-lg">
            <BarChart3 className="mb-4 h-10 w-10 text-lexi-amber" />
            <h2 className="text-xl font-semibold">Reports</h2>
            <p className="mt-2 text-sm text-muted-foreground">Student analytics</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
