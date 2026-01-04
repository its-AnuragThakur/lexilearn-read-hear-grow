/**
 * Progress Page
 * 
 * Design choices:
 * - Visual progress bars only
 * - No tables or complex data
 * - Minimal numeric data
 * - Large, clear visualizations
 * - Encouraging messaging
 */

import { StudentLayout } from '@/components/layout/StudentLayout';
import { LexiCard, LexiProgress } from '@/components/ui/lexi-card';

// Sample progress data - would come from database
const progressData = {
  overall: 32,
  subjects: [
    { name: 'English', progress: 45, color: 'bg-primary' },
    { name: 'Mathematics', progress: 25, color: 'bg-lexi-amber' },
    { name: 'Science', progress: 55, color: 'bg-lexi-sage' },
    { name: 'Geography', progress: 10, color: 'bg-lexi-coral' },
  ],
  streakDays: 5,
  topicsCompleted: 12,
};

export default function StudentProgress() {
  return (
    <StudentLayout pageTitle="My Progress">
      <div className="mx-auto max-w-2xl space-y-8">
        
        {/* Overall progress - main visual */}
        <section>
          <LexiCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-foreground">
                  Overall Progress
                </h2>
                <span className="text-2xl font-semibold text-primary">
                  {progressData.overall}%
                </span>
              </div>
              
              {/* Large progress bar */}
              <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                <div 
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progressData.overall}%` }}
                />
              </div>

              {/* Encouraging message */}
              <p className="text-muted-foreground">
                {progressData.overall < 25 
                  ? "Great start! Keep learning every day."
                  : progressData.overall < 50
                  ? "You're making good progress!"
                  : progressData.overall < 75
                  ? "More than halfway there. Amazing!"
                  : "Almost done! You're doing great!"}
              </p>
            </div>
          </LexiCard>
        </section>

        {/* Simple stats - minimal */}
        <section className="grid gap-4 sm:grid-cols-2">
          <LexiCard>
            <div className="text-center">
              <p className="text-3xl font-semibold text-primary">
                {progressData.streakDays}
              </p>
              <p className="mt-1 text-muted-foreground">
                Day streak
              </p>
            </div>
          </LexiCard>
          
          <LexiCard>
            <div className="text-center">
              <p className="text-3xl font-semibold text-success">
                {progressData.topicsCompleted}
              </p>
              <p className="mt-1 text-muted-foreground">
                Topics completed
              </p>
            </div>
          </LexiCard>
        </section>

        {/* Subject progress - visual bars */}
        <section className="space-y-4">
          <h2 className="text-xl font-medium text-foreground">
            By Subject
          </h2>
          
          <div className="space-y-4">
            {progressData.subjects.map((subject) => (
              <LexiCard key={subject.name} className="py-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-foreground">
                      {subject.name}
                    </span>
                    <span className="font-medium text-muted-foreground">
                      {subject.progress}%
                    </span>
                  </div>
                  <LexiProgress value={subject.progress} />
                </div>
              </LexiCard>
            ))}
          </div>
        </section>

        {/* Simple encouragement */}
        <section className="rounded-xl bg-success/10 p-6 text-center">
          <p className="text-lg text-success">
            Keep going! Every small step counts.
          </p>
        </section>
      </div>
    </StudentLayout>
  );
}
