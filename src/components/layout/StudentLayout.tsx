/**
 * StudentLayout - Minimal, dyslexia-friendly layout
 * 
 * Design choices:
 * - Minimal left sidebar with icons + text labels
 * - Clear top bar with current page name
 * - Large touch targets (min 48px)
 * - Soft background, no visual clutter
 * - Single focus area in main content
 */

import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  Bookmark, 
  BarChart3, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface StudentLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

// Navigation items - minimal set to reduce cognitive load
const navItems = [
  { icon: Home, label: 'Home', path: '/student' },
  { icon: BookOpen, label: 'Learn', path: '/student/subjects' },
  { icon: Bookmark, label: 'Saved', path: '/student/bookmarks' },
  { icon: BarChart3, label: 'Progress', path: '/student/progress' },
  { icon: User, label: 'Profile', path: '/student/settings' },
];

export function StudentLayout({ children, pageTitle }: StudentLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Frontend-only sign out - just navigate to login
  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content - accessibility essential */}
      <a 
        href="#main-content" 
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-card shadow-md md:hidden"
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        {sidebarOpen ? (
          <X className="h-6 w-6 text-foreground" />
        ) : (
          <Menu className="h-6 w-6 text-foreground" />
        )}
      </button>

      {/* Sidebar - minimal navigation */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-full w-64 transform bg-card shadow-lg
          transition-transform duration-200 ease-out
          md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Main navigation"
      >
        <div className="flex h-full flex-col">
          {/* Logo area */}
          <div className="flex h-20 items-center gap-3 border-b border-border/30 px-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">LexiLearn</span>
          </div>

          {/* Navigation - large touch targets */}
          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/student' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex h-14 items-center gap-4 rounded-xl px-4 text-lg
                    transition-colors duration-150
                    ${isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="h-6 w-6 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section at bottom */}
          <div className="border-t border-border/30 p-4">
            <div className="mb-4 flex items-center gap-3 px-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <span className="truncate text-sm font-medium text-foreground">
                Student
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start gap-4 h-12 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-foreground/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content area */}
      <main 
        id="main-content"
        className="min-h-screen md:ml-64"
      >
        {/* Top bar - shows current page */}
        <header className="sticky top-0 z-20 flex h-20 items-center border-b border-border/30 bg-background/95 px-6 backdrop-blur-sm md:px-8">
          <h1 className="ml-14 text-2xl font-semibold text-foreground md:ml-0">
            {pageTitle}
          </h1>
        </header>

        {/* Page content - generous padding for readability */}
        <div className="p-6 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
