/**
 * Topic Explanation Page - MOST IMPORTANT PAGE
 * 
 * Design choices:
 * - Focus mode layout - single column, no distractions
 * - Length toggle: Short / Medium / Long explanations
 * - Chunked content: one idea per paragraph
 * - Bullet points preferred over paragraphs
 * - Text-to-speech button prominent
 * - Highlight key terms visually
 * - Bookmark and complete buttons clearly separated
 * - Left-aligned text only
 * - Maximum 65ch width for optimal readability
 */

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { Button } from '@/components/ui/button';
import { TTSButton } from '@/components/ui/tts-button';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  topicExplanations, 
  getPlainText, 
  type ExplanationLength, 
  type ContentBlock,
  type Explanation,
} from '@/data/topicExplanations';

export default function TopicExplanation() {
  const { topicId } = useParams<{ topicId: string }>();
  const [length, setLength] = useState<ExplanationLength>('medium');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const topic = topicExplanations[topicId || 'topic-2'];
  
  if (!topic) {
    return (
      <StudentLayout pageTitle="Topic Not Found">
        <div className="mx-auto max-w-2xl text-center py-12">
          <p className="text-lg text-muted-foreground">This topic hasn't been added yet.</p>
          <Button asChild className="mt-4">
            <Link to="/student/subjects">Back to Subjects</Link>
          </Button>
        </div>
      </StudentLayout>
    );
  }

  const currentExplanation = topic.explanations[length] as Explanation;
  const plainText = getPlainText(currentExplanation.content);

  const lengthOptions: { value: ExplanationLength; label: string }[] = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' },
  ];

  return (
    <StudentLayout pageTitle={topic.name}>
      <div className="mx-auto max-w-2xl">
        
        {/* Back navigation */}
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="mb-4 -ml-2 h-12 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link to="/student/subjects">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
        </Button>

        {/* Topic header with TTS */}
        <header className="mb-8 space-y-4">
          <p className="text-sm text-muted-foreground">
            {topic.subjectName} / {topic.unitName}
          </p>
          <TTSButton 
            text={plainText} 
            className="w-full justify-center sm:w-auto"
          />
        </header>

        {/* Length toggle */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Explanation length:
          </p>
          <div className="flex gap-2">
            {lengthOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLength(option.value)}
                className={cn(
                  'flex-1 rounded-xl px-4 py-3 text-base font-medium transition-all',
                  'border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  length === option.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content area - focus mode */}
        <article className="mb-10 space-y-6">
          {currentExplanation.content.map((block: ContentBlock, index: number) => {
            if (block.type === 'heading') {
              return (
                <h2 key={index} className="pt-4 text-xl font-semibold text-foreground">
                  {block.value}
                </h2>
              );
            }
            
            if (block.type === 'text') {
              return (
                <p key={index} className="text-lg leading-relaxed text-foreground">
                  {block.value}
                </p>
              );
            }
            
            if (block.type === 'highlight-box') {
              return (
                <div 
                  key={index}
                  className="rounded-xl bg-primary/10 px-6 py-4 text-center text-xl font-semibold text-primary"
                >
                  {block.value}
                </div>
              );
            }
            
            if (block.type === 'bullets' && 'items' in block) {
              return (
                <ul key={index} className="space-y-3 pl-2">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <div>
                        <span className={cn(
                          'text-lg',
                          'highlight' in item && item.highlight 
                            ? 'font-semibold text-primary' 
                            : 'text-foreground'
                        )}>
                          {item.text}
                        </span>
                        {'description' in item && item.description && (
                          <span className="text-lg text-muted-foreground">
                            {' — '}{item.description}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              );
            }
            
            return null;
          })}
        </article>

        {/* Action buttons */}
        <footer className="space-y-4 border-t border-border/50 pt-8">
          <Button
            size="lg"
            onClick={() => setIsCompleted(!isCompleted)}
            className={cn(
              'h-14 w-full text-lg',
              isCompleted && 'bg-success hover:bg-success/90'
            )}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Completed
              </>
            ) : (
              'Mark as Complete'
            )}
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="h-12 flex-1"
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="mr-2 h-5 w-5 text-primary" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="mr-2 h-5 w-5" />
                  Save
                </>
              )}
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 flex-1"
            >
              <Link to="/student/subjects">
                Next Topic
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </StudentLayout>
  );
}
