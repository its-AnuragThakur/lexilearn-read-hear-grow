/**
 * Topic Selection Page
 * 
 * Design choices:
 * - Topic list with name and completion indicator
 * - No nested menus
 * - Clear tap/click targets (min 64px)
 * - Simple visual completion states
 * - Optional progress for each topic
 */

import { Link, useParams } from 'react-router-dom';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LexiCard } from '@/components/ui/lexi-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

// Sample topics - would come from database
const getTopicsForUnit = (unitId: string) => {
  const topicsByUnit: Record<string, Array<{ id: string; name: string; completed: boolean }>> = {
    'unit-1': [
      { id: 'topic-1', name: 'Introduction to Letters', completed: true },
      { id: 'topic-2', name: 'Vowels and Consonants', completed: true },
      { id: 'topic-3', name: 'Simple Words', completed: true },
      { id: 'topic-4', name: 'Reading Short Sentences', completed: false },
      { id: 'topic-5', name: 'Practice Reading', completed: false },
    ],
    'unit-2': [
      { id: 'topic-1', name: 'Common Words', completed: true },
      { id: 'topic-2', name: 'Word Families', completed: false },
      { id: 'topic-3', name: 'Synonyms', completed: false },
      { id: 'topic-4', name: 'Antonyms', completed: false },
      { id: 'topic-5', name: 'Using New Words', completed: false },
      { id: 'topic-6', name: 'Word Games', completed: false },
      { id: 'topic-7', name: 'Review', completed: false },
      { id: 'topic-8', name: 'Quiz', completed: false },
    ],
  };
  
  return topicsByUnit[unitId] || [
    { id: 'topic-1', name: 'Getting Started', completed: false },
    { id: 'topic-2', name: 'Key Concepts', completed: false },
    { id: 'topic-3', name: 'Examples', completed: false },
    { id: 'topic-4', name: 'Practice', completed: false },
  ];
};

export default function TopicSelection() {
  const { subjectId, unitId } = useParams<{ subjectId: string; unitId: string }>();
  const topics = getTopicsForUnit(unitId || '');
  
  // Calculate progress
  const completedCount = topics.filter(t => t.completed).length;
  const totalCount = topics.length;

  return (
    <StudentLayout pageTitle="Topics">
      <div className="mx-auto max-w-2xl">
        
        {/* Back button */}
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="mb-6 -ml-2 h-12 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link to={`/student/subjects/${subjectId}/units`}>
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Units</span>
          </Link>
        </Button>

        {/* Progress summary - simple */}
        <div className="mb-8 rounded-xl bg-muted/50 p-4">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">{completedCount}</span> of {totalCount} topics completed
          </p>
        </div>

        {/* Topic list */}
        <div className="space-y-3">
          {topics.map((topic, index) => (
            <Link 
              key={topic.id} 
              to={`/student/topics/${topic.id}`}
              className="block"
            >
              <LexiCard 
                isCompleted={topic.completed}
                className="min-h-[64px] py-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Topic number or check */}
                    {topic.completed ? (
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-success" />
                    ) : (
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/30 text-sm text-muted-foreground">
                        {index + 1}
                      </div>
                    )}
                    
                    {/* Topic name */}
                    <h2 className="text-lg text-foreground">
                      {topic.name}
                    </h2>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </LexiCard>
            </Link>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
