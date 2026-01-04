/**
 * Student Dashboard - Simplified, focus-driven design
 * 
 * Design choices:
 * - Simple welcome message as primary element
 * - ONE action: "Continue Learning"
 * - Single progress indicator
 * - No cards, widgets, or information overload
 * - Large touch targets, clear hierarchy
 */

import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useHasCompletedAssessment } from '@/hooks/useAssessment';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LexiCard, LexiProgress } from '@/components/ui/lexi-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function StudentDashboard() {
  const { profile } = useAuth();
  const { hasCompleted, isLoading } = useHasCompletedAssessment();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" />
      </div>
    );
  }

  // Redirect to assessment if not completed
  if (!hasCompleted) {
    return <Navigate to="/student/assessment" replace />;
  }

  // Get first name for friendlier greeting
  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <StudentLayout pageTitle="Home">
      <div className="mx-auto max-w-2xl space-y-10">
        
        {/* Welcome message - simple and warm */}
        <section className="space-y-2">
          <h2 className="text-3xl font-semibold text-foreground">
            Welcome back, {firstName}
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to continue learning?
          </p>
        </section>

        {/* Primary action - Continue Learning */}
        <section>
          <Link to="/student/subjects" className="block">
            <LexiCard className="group">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-medium text-foreground">
                    Continue Learning
                  </h3>
                  <p className="text-muted-foreground">
                    Pick up where you left off
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            </LexiCard>
          </Link>
        </section>

        {/* Single progress indicator */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Your Progress
          </h3>
          <LexiCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Overall completion</span>
                <span className="text-lg font-medium text-primary">25%</span>
              </div>
              <LexiProgress value={25} />
              <p className="text-sm text-muted-foreground">
                Keep going! Every step counts.
              </p>
            </div>
          </LexiCard>
        </section>

        {/* Quick access - minimal */}
        <section className="pt-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 flex-1 text-base"
            >
              <Link to="/student/bookmarks">View Saved Topics</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 flex-1 text-base"
            >
              <Link to="/student/settings">Adjust Settings</Link>
            </Button>
          </div>
        </section>
      </div>
    </StudentLayout>
  );
}
