/**
 * Unit Selection Page
 * 
 * Design choices:
 * - Simple vertical list of units
 * - Large clickable areas (min 72px)
 * - Minimal text per unit
 * - Clear completion indicators
 * - Back navigation prominent
 */

import { Link, useParams } from 'react-router-dom';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LexiCard } from '@/components/ui/lexi-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';

// Sample units - would come from database based on subject
const getUnitsForSubject = (subjectId: string) => {
  const unitsBySubject: Record<string, Array<{ id: string; name: string; topicCount: number; completed: boolean }>> = {
    english: [
      { id: 'unit-1', name: 'Basic Reading', topicCount: 5, completed: true },
      { id: 'unit-2', name: 'Vocabulary Building', topicCount: 8, completed: false },
      { id: 'unit-3', name: 'Reading Comprehension', topicCount: 6, completed: false },
      { id: 'unit-4', name: 'Writing Skills', topicCount: 7, completed: false },
    ],
    math: [
      { id: 'unit-1', name: 'Numbers', topicCount: 4, completed: true },
      { id: 'unit-2', name: 'Addition', topicCount: 5, completed: false },
      { id: 'unit-3', name: 'Subtraction', topicCount: 5, completed: false },
      { id: 'unit-4', name: 'Word Problems', topicCount: 6, completed: false },
    ],
    science: [
      { id: 'unit-1', name: 'Living Things', topicCount: 6, completed: true },
      { id: 'unit-2', name: 'Plants', topicCount: 5, completed: true },
      { id: 'unit-3', name: 'Animals', topicCount: 7, completed: false },
      { id: 'unit-4', name: 'Our Bodies', topicCount: 8, completed: false },
    ],
  };
  
  return unitsBySubject[subjectId] || [
    { id: 'unit-1', name: 'Introduction', topicCount: 4, completed: false },
    { id: 'unit-2', name: 'Basics', topicCount: 5, completed: false },
    { id: 'unit-3', name: 'Practice', topicCount: 6, completed: false },
  ];
};

const subjectNames: Record<string, string> = {
  english: 'English',
  math: 'Mathematics',
  science: 'Science',
  geography: 'Geography',
  art: 'Art',
  music: 'Music',
};

export default function UnitSelection() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const units = getUnitsForSubject(subjectId || '');
  const subjectName = subjectNames[subjectId || ''] || 'Subject';

  return (
    <StudentLayout pageTitle={subjectName}>
      <div className="mx-auto max-w-2xl">
        
        {/* Back button - clear navigation */}
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="mb-6 -ml-2 h-12 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link to="/student/subjects">
            <ArrowLeft className="h-5 w-5" />
            <span>All Subjects</span>
          </Link>
        </Button>

        {/* Simple instruction */}
        <p className="mb-8 text-lg text-muted-foreground">
          Choose a unit to explore
        </p>

        {/* Unit list - vertical, simple */}
        <div className="space-y-4">
          {units.map((unit, index) => (
            <Link 
              key={unit.id} 
              to={`/student/subjects/${subjectId}/units/${unit.id}/topics`}
              className="block"
            >
              <LexiCard isCompleted={unit.completed} className="min-h-[72px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Unit number */}
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-lg font-medium text-muted-foreground">
                      {index + 1}
                    </div>
                    
                    {/* Unit info */}
                    <div>
                      <h2 className="text-lg font-medium text-foreground">
                        {unit.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {unit.topicCount} topics
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow indicator */}
                  <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </LexiCard>
            </Link>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
