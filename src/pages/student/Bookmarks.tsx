/**
 * Bookmarks Page
 * 
 * Design choices:
 * - Simple list of saved topics
 * - Large readable text
 * - Easy remove option with clear feedback
 * - No complex layouts or nested information
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LexiCard } from '@/components/ui/lexi-card';
import { Button } from '@/components/ui/button';
import { X, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

// Sample bookmarks - would come from database
const initialBookmarks = [
  { 
    id: 'topic-1', 
    name: 'Vowels and Consonants', 
    subject: 'English',
    unit: 'Basic Reading'
  },
  { 
    id: 'topic-3', 
    name: 'Simple Words', 
    subject: 'English',
    unit: 'Basic Reading'
  },
  { 
    id: 'topic-5', 
    name: 'Addition with Pictures', 
    subject: 'Mathematics',
    unit: 'Addition'
  },
  { 
    id: 'topic-8', 
    name: 'Living and Non-Living Things', 
    subject: 'Science',
    unit: 'Living Things'
  },
];

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
    toast.success('Removed from saved topics');
  };

  return (
    <StudentLayout pageTitle="Saved Topics">
      <div className="mx-auto max-w-2xl">
        
        {/* Empty state */}
        {bookmarks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-medium text-foreground">
              No saved topics yet
            </h2>
            <p className="mb-6 text-muted-foreground">
              Save topics while learning to find them here
            </p>
            <Button asChild size="lg">
              <Link to="/student/subjects">Start Learning</Link>
            </Button>
          </div>
        )}

        {/* Bookmark list */}
        {bookmarks.length > 0 && (
          <>
            <p className="mb-6 text-lg text-muted-foreground">
              {bookmarks.length} saved {bookmarks.length === 1 ? 'topic' : 'topics'}
            </p>

            <div className="space-y-3">
              {bookmarks.map((bookmark) => (
                <LexiCard key={bookmark.id} className="py-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* Topic info */}
                    <Link 
                      to={`/student/topics/${bookmark.id}`}
                      className="flex-1 min-w-0"
                    >
                      <h2 className="text-lg font-medium text-foreground truncate">
                        {bookmark.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {bookmark.subject} / {bookmark.unit}
                      </p>
                    </Link>

                    {/* Remove button - large tap target */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBookmark(bookmark.id)}
                      className="h-12 w-12 flex-shrink-0 text-muted-foreground hover:text-destructive"
                      aria-label={`Remove ${bookmark.name} from saved topics`}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </LexiCard>
              ))}
            </div>
          </>
        )}
      </div>
    </StudentLayout>
  );
}
