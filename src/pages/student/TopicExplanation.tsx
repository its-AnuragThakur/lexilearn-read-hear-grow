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

// Explanation length options
type ExplanationLength = 'short' | 'medium' | 'long';

// Content block types
interface TextBlock {
  type: 'text' | 'heading' | 'highlight-box';
  value: string;
}

interface BulletItem {
  text: string;
  highlight?: boolean;
  description?: string;
}

interface BulletsBlock {
  type: 'bullets';
  items: BulletItem[];
}

type ContentBlock = TextBlock | BulletsBlock;

interface Explanation {
  content: ContentBlock[];
}

// Sample topic data - would come from database
const sampleTopic = {
  id: 'topic-1',
  name: 'Vowels and Consonants',
  unitName: 'Basic Reading',
  subjectName: 'English',
  explanations: {
    short: {
      content: [
        {
          type: 'text',
          value: 'The alphabet has two types of letters:',
        },
        {
          type: 'bullets',
          items: [
            { text: 'Vowels', highlight: true, description: 'A, E, I, O, U' },
            { text: 'Consonants', highlight: true, description: 'All other letters' },
          ],
        },
        {
          type: 'text',
          value: 'Every word needs at least one vowel.',
        },
      ],
    },
    medium: {
      content: [
        {
          type: 'heading',
          value: 'What are Vowels?',
        },
        {
          type: 'text',
          value: 'Vowels are special letters.',
        },
        {
          type: 'text',
          value: 'There are 5 vowels in English:',
        },
        {
          type: 'highlight-box',
          value: 'A, E, I, O, U',
        },
        {
          type: 'text',
          value: 'Vowels make open sounds.',
        },
        {
          type: 'text',
          value: 'Your mouth stays open when you say them.',
        },
        {
          type: 'heading',
          value: 'What are Consonants?',
        },
        {
          type: 'text',
          value: 'Consonants are all the other letters.',
        },
        {
          type: 'bullets',
          items: [
            { text: 'There are 21 consonants' },
            { text: 'Examples: B, C, D, F, G, H...' },
            { text: 'Your mouth closes a bit when you say them' },
          ],
        },
        {
          type: 'heading',
          value: 'Why does this matter?',
        },
        {
          type: 'text',
          value: 'Every word needs at least one vowel.',
        },
        {
          type: 'text',
          value: 'Knowing vowels helps you read better.',
        },
      ],
    },
    long: {
      content: [
        {
          type: 'heading',
          value: 'Understanding Vowels',
        },
        {
          type: 'text',
          value: 'The English alphabet has 26 letters.',
        },
        {
          type: 'text',
          value: 'These letters are divided into two groups.',
        },
        {
          type: 'text',
          value: 'The first group is called vowels.',
        },
        {
          type: 'highlight-box',
          value: 'The 5 Vowels: A, E, I, O, U',
        },
        {
          type: 'text',
          value: 'Vowels are very important letters.',
        },
        {
          type: 'text',
          value: 'Here is what makes vowels special:',
        },
        {
          type: 'bullets',
          items: [
            { text: 'They make open sounds' },
            { text: 'Your mouth stays open when you say them' },
            { text: 'Every word must have at least one vowel' },
            { text: 'Sometimes the letter Y acts like a vowel too' },
          ],
        },
        {
          type: 'heading',
          value: 'Understanding Consonants',
        },
        {
          type: 'text',
          value: 'The second group is called consonants.',
        },
        {
          type: 'text',
          value: 'There are 21 consonants in English.',
        },
        {
          type: 'text',
          value: 'These are all the letters that are not vowels.',
        },
        {
          type: 'bullets',
          items: [
            { text: 'Consonants make different sounds than vowels' },
            { text: 'Your lips, tongue, or teeth touch when you say them' },
            { text: 'Examples: B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z' },
          ],
        },
        {
          type: 'heading',
          value: 'How Vowels and Consonants Work Together',
        },
        {
          type: 'text',
          value: 'Words are made by combining vowels and consonants.',
        },
        {
          type: 'text',
          value: 'Look at these examples:',
        },
        {
          type: 'bullets',
          items: [
            { text: 'CAT', highlight: true, description: 'C and T are consonants, A is a vowel' },
            { text: 'BEE', highlight: true, description: 'B is a consonant, E and E are vowels' },
            { text: 'DOG', highlight: true, description: 'D and G are consonants, O is a vowel' },
          ],
        },
        {
          type: 'heading',
          value: 'Practice Tip',
        },
        {
          type: 'text',
          value: 'When you see a new word, find the vowels first.',
        },
        {
          type: 'text',
          value: 'This helps you break the word into parts.',
        },
        {
          type: 'text',
          value: 'Breaking words into parts makes reading easier.',
        },
      ],
    },
  },
};

// Helper to get plain text for TTS
const getPlainText = (content: ContentBlock[]): string => {
  return content.map(block => {
    if (block.type === 'text' || block.type === 'heading' || block.type === 'highlight-box') {
      return (block as TextBlock).value;
    }
    if (block.type === 'bullets') {
      return (block as BulletsBlock).items.map(item => 
        item.description ? `${item.text}: ${item.description}` : item.text
      ).join('. ');
    }
    return '';
  }).join('. ');
};

export default function TopicExplanation() {
  const { topicId } = useParams<{ topicId: string }>();
  const [length, setLength] = useState<ExplanationLength>('medium');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const topic = sampleTopic; // Would fetch based on topicId
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
          {/* Breadcrumb - simple */}
          <p className="text-sm text-muted-foreground">
            {topic.subjectName} / {topic.unitName}
          </p>
          
          {/* TTS Button - prominent */}
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
          {currentExplanation.content.map((block, index) => {
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

        {/* Action buttons - clearly separated */}
        <footer className="space-y-4 border-t border-border/50 pt-8">
          {/* Primary action: Mark as complete */}
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

          {/* Secondary actions */}
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
