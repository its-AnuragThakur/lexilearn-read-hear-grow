/**
 * Subject Selection Page
 * 
 * Design choices:
 * - Large subject cards, one per row
 * - Clear spacing between cards
 * - No secondary information overload
 * - Simple icons and text only
 * - Maximum 70ch width for readability
 */

import { Link } from 'react-router-dom';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LexiCard, LexiProgress } from '@/components/ui/lexi-card';
import { BookOpen, Calculator, Globe, Beaker, Palette, Music } from 'lucide-react';

// Sample subjects - would come from database
const subjects = [
  { 
    id: 'english', 
    name: 'English', 
    icon: BookOpen, 
    progress: 35,
    description: 'Reading and writing skills'
  },
  { 
    id: 'math', 
    name: 'Mathematics', 
    icon: Calculator, 
    progress: 20,
    description: 'Numbers and problem solving'
  },
  { 
    id: 'science', 
    name: 'Science', 
    icon: Beaker, 
    progress: 45,
    description: 'Discover how things work'
  },
  { 
    id: 'geography', 
    name: 'Geography', 
    icon: Globe, 
    progress: 10,
    description: 'Learn about our world'
  },
  { 
    id: 'art', 
    name: 'Art', 
    icon: Palette, 
    progress: 60,
    description: 'Express your creativity'
  },
  { 
    id: 'music', 
    name: 'Music', 
    icon: Music, 
    progress: 0,
    description: 'Explore sounds and rhythm'
  },
];

export default function SubjectSelection() {
  return (
    <StudentLayout pageTitle="Choose a Subject">
      <div className="mx-auto max-w-2xl">
        
        {/* Simple instruction */}
        <p className="mb-8 text-lg text-muted-foreground">
          Tap a subject to start learning
        </p>

        {/* Subject list - one card per row, large tap targets */}
        <div className="space-y-4">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            
            return (
              <Link 
                key={subject.id} 
                to={`/student/subjects/${subject.id}/units`}
                className="block"
              >
                <LexiCard className="min-h-[88px]">
                  <div className="flex items-center gap-5">
                    {/* Icon */}
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <h2 className="text-xl font-medium text-foreground">
                        {subject.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {subject.description}
                      </p>
                      
                      {/* Progress bar */}
                      {subject.progress > 0 && (
                        <div className="flex items-center gap-3 pt-1">
                          <LexiProgress value={subject.progress} className="flex-1" />
                          <span className="text-sm font-medium text-primary">
                            {subject.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </LexiCard>
              </Link>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}
