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

// Topic data per subject and unit
const topicsBySubjectUnit: Record<string, Record<string, Array<{ id: string; name: string; completed: boolean }>>> = {
  english: {
    'unit-1': [
      { id: 'eng-topic-1', name: 'Introduction to Letters', completed: true },
      { id: 'eng-topic-2', name: 'Vowels and Consonants', completed: true },
      { id: 'eng-topic-3', name: 'Simple Words', completed: true },
      { id: 'eng-topic-4', name: 'Reading Short Sentences', completed: false },
      { id: 'eng-topic-5', name: 'Practice Reading', completed: false },
    ],
    'unit-2': [
      { id: 'eng-topic-6', name: 'Common Words', completed: true },
      { id: 'eng-topic-7', name: 'Word Families', completed: false },
      { id: 'eng-topic-8', name: 'Synonyms', completed: false },
    ],
  },
  math: {
    'unit-1': [
      { id: 'math-topic-1', name: 'Counting 1 to 10', completed: true },
      { id: 'math-topic-2', name: 'Counting 11 to 20', completed: true },
      { id: 'math-topic-3', name: 'Number Order', completed: false },
      { id: 'math-topic-4', name: 'Number Shapes', completed: false },
    ],
    'unit-2': [
      { id: 'math-topic-5', name: 'What is Addition?', completed: true },
      { id: 'math-topic-6', name: 'Adding to 10', completed: false },
      { id: 'math-topic-7', name: 'Adding Doubles', completed: false },
    ],
    'unit-3': [
      { id: 'math-topic-8', name: 'What is Subtraction?', completed: false },
    ],
  },
  science: {
    'unit-1': [
      { id: 'sci-topic-1', name: 'What are Living Things?', completed: true },
      { id: 'sci-topic-2', name: 'Animals', completed: true },
      { id: 'sci-topic-3', name: 'Plants', completed: false },
    ],
    'unit-2': [
      { id: 'sci-topic-4', name: 'Seeds and Growth', completed: false },
    ],
  },
  geography: {
    'unit-1': [
      { id: 'geo-topic-1', name: 'What is Geography?', completed: false },
      { id: 'geo-topic-2', name: 'Maps and Directions', completed: false },
    ],
  },
  art: {
    'unit-1': [
      { id: 'art-topic-1', name: 'Primary Colours', completed: true },
      { id: 'art-topic-2', name: 'Shapes in Art', completed: true },
    ],
  },
  music: {
    'unit-1': [
      { id: 'music-topic-1', name: 'What is Music?', completed: false },
      { id: 'music-topic-2', name: 'Musical Instruments', completed: false },
    ],
  },
};

const getTopicsForUnit = (subjectId: string, unitId: string) => {
  return topicsBySubjectUnit[subjectId]?.[unitId] || [
    { id: 'topic-1', name: 'Getting Started', completed: false },
    { id: 'topic-2', name: 'Key Concepts', completed: false },
    { id: 'topic-3', name: 'Examples', completed: false },
    { id: 'topic-4', name: 'Practice', completed: false },
  ];
};

export default function TopicSelection() {
  const { subjectId, unitId } = useParams<{ subjectId: string; unitId: string }>();
  const topics = getTopicsForUnit(subjectId || '', unitId || '');
  
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
