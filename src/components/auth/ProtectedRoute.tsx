import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AppRole } from '@/types';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: AppRole;
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, roles, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && !hasRole(role)) {
    // Redirect to appropriate dashboard based on user's first role
    if (roles.includes('student')) {
      return <Navigate to="/student" replace />;
    } else if (roles.includes('teacher')) {
      return <Navigate to="/teacher" replace />;
    } else if (roles.includes('parent')) {
      return <Navigate to="/parent" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
