import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BarChart3, MessageSquare, Loader2, UserPlus, ClipboardCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import ParentAssessment from '@/components/assessment/ParentAssessment';
import { CreateStudentDialog } from '@/components/parent/CreateStudentDialog';
import { StudentCredentialsCard } from '@/components/parent/StudentCredentialsCard';

interface CreatedStudent {
  id: string;
  student_id: string;
  student_email: string;
  temporary_password: string;
  password_changed: boolean;
  credentials_sent_at: string | null;
  profile: {
    full_name: string | null;
  } | null;
  hasAssessment: boolean;
}

export default function ParentDashboard() {
  const { profile, signOut, user } = useAuth();
  const [showAssessment, setShowAssessment] = useState<string | null>(null);

  // Fetch parent-created students
  const { data: createdStudents, isLoading, refetch } = useQuery({
    queryKey: ['created-students', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      // Get parent-created students
      const { data: students, error } = await supabase
        .from('parent_created_students')
        .select('*')
        .eq('parent_id', user.id);

      if (error) throw error;
      if (!students || students.length === 0) return [];

      // Get profiles for students
      const studentIds = students.map(s => s.student_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', studentIds);

      // Check which students have completed assessments
      const { data: assessments } = await supabase
        .from('student_assessments')
        .select('student_id')
        .in('student_id', studentIds);

      const assessmentMap = new Set(assessments?.map(a => a.student_id) || []);

      return students.map(student => ({
        ...student,
        profile: profiles?.find(p => p.id === student.student_id) || null,
        hasAssessment: assessmentMap.has(student.student_id),
      })) as CreatedStudent[];
    },
    enabled: !!user?.id,
  });

  // If showing assessment for a student
  if (showAssessment) {
    const student = createdStudents?.find(s => s.student_id === showAssessment);
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <Button 
          variant="ghost" 
          onClick={() => setShowAssessment(null)}
          className="mb-4"
        >
          ← Back to Dashboard
        </Button>
        <ParentAssessment 
          studentId={showAssessment}
          studentName={student?.profile?.full_name || undefined}
          onComplete={() => {
            setShowAssessment(null);
            refetch();
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/parent" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LexiLearn</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/parent/progress" className="text-muted-foreground hover:text-foreground">Progress</Link>
            <Link to="/parent/feedback" className="text-muted-foreground hover:text-foreground">Feedback</Link>
            <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="lexi-heading text-3xl font-bold">Welcome, {profile?.full_name || 'Parent'}!</h1>
          <p className="mt-2 text-muted-foreground">Monitor and support your child's learning journey</p>
        </div>

        {/* Students Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Students</h2>
            <CreateStudentDialog onSuccess={refetch} />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : createdStudents && createdStudents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {createdStudents.map((student) => (
                <StudentCredentialsCard
                  key={student.id}
                  student={student}
                  hasAssessment={student.hasAssessment}
                  onAssessmentClick={() => setShowAssessment(student.student_id)}
                  onCredentialsReset={refetch}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-muted/50">
              <CardContent className="py-8 text-center">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No students yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Create a student account to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link to="/parent/progress" className="lexi-card p-6 hover:shadow-lg transition-shadow">
            <BarChart3 className="mb-4 h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold">View Progress</h3>
            <p className="mt-2 text-sm text-muted-foreground">Track your child's learning journey</p>
          </Link>
          <Link to="/parent/feedback" className="lexi-card p-6 hover:shadow-lg transition-shadow">
            <MessageSquare className="mb-4 h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold">Teacher Feedback</h3>
            <p className="mt-2 text-sm text-muted-foreground">Read notes from teachers</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
