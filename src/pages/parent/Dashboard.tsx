import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BarChart3, MessageSquare, ClipboardCheck, UserPlus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import ParentAssessment from '@/components/assessment/ParentAssessment';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface LinkedStudent {
  id: string;
  student_id: string;
  profile: {
    full_name: string;
    email: string;
  } | null;
  hasAssessment: boolean;
}

export default function ParentDashboard() {
  const { profile, signOut, user } = useAuth();
  const [showAssessment, setShowAssessment] = useState<string | null>(null);
  const [linkEmail, setLinkEmail] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  // Fetch linked students
  const { data: linkedStudents, isLoading, refetch } = useQuery({
    queryKey: ['linked-students', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data: links, error } = await supabase
        .from('parent_student_links')
        .select('id, student_id')
        .eq('parent_id', user.id);

      if (error) throw error;
      if (!links || links.length === 0) return [];

      // Get profiles for linked students
      const studentIds = links.map(l => l.student_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', studentIds);

      // Check which students have completed assessments
      const { data: assessments } = await supabase
        .from('student_assessments')
        .select('student_id')
        .in('student_id', studentIds);

      const assessmentMap = new Set(assessments?.map(a => a.student_id) || []);

      return links.map(link => ({
        id: link.id,
        student_id: link.student_id,
        profile: profiles?.find(p => p.id === link.student_id) || null,
        hasAssessment: assessmentMap.has(link.student_id),
      })) as LinkedStudent[];
    },
    enabled: !!user?.id,
  });

  const handleLinkStudent = async () => {
    if (!linkEmail.trim() || !user?.id) return;
    setIsLinking(true);

    try {
      // Find student by email
      const { data: studentProfile, error: findError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', linkEmail.trim())
        .maybeSingle();

      if (findError) throw findError;
      if (!studentProfile) {
        toast.error('No student found with that email address');
        return;
      }

      // Check if student has student role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', studentProfile.id)
        .eq('role', 'student');

      if (!roles || roles.length === 0) {
        toast.error('This user is not registered as a student');
        return;
      }

      // Create link
      const { error: linkError } = await supabase
        .from('parent_student_links')
        .insert({
          parent_id: user.id,
          student_id: studentProfile.id,
        });

      if (linkError) {
        if (linkError.code === '23505') {
          toast.error('You are already linked to this student');
        } else {
          throw linkError;
        }
        return;
      }

      toast.success('Successfully linked to student!');
      setLinkEmail('');
      refetch();
    } catch (error) {
      console.error('Error linking student:', error);
      toast.error('Failed to link student. Please try again.');
    } finally {
      setIsLinking(false);
    }
  };

  // If showing assessment for a student
  if (showAssessment) {
    const student = linkedStudents?.find(s => s.student_id === showAssessment);
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
          studentName={student?.profile?.full_name}
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

        {/* Linked Students Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Linked Students</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Link Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Link a Student</DialogTitle>
                  <DialogDescription>
                    Enter the student's email address to link their account to yours.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Student Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@example.com"
                      value={linkEmail}
                      onChange={(e) => setLinkEmail(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleLinkStudent}
                    disabled={isLinking || !linkEmail.trim()}
                    className="w-full"
                  >
                    {isLinking ? 'Linking...' : 'Link Student'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : linkedStudents && linkedStudents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {linkedStudents.map((student) => (
                <Card key={student.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{student.profile?.full_name || 'Unknown Student'}</CardTitle>
                    <CardDescription>{student.profile?.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {student.hasAssessment ? (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <ClipboardCheck className="h-4 w-4" />
                        Assessment Complete
                      </div>
                    ) : (
                      <Button 
                        onClick={() => setShowAssessment(student.student_id)}
                        variant="outline"
                        className="w-full gap-2"
                      >
                        <ClipboardCheck className="h-4 w-4" />
                        Complete Assessment
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/50">
              <CardContent className="py-8 text-center">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No students linked yet.</p>
                <p className="text-sm text-muted-foreground">Link your child's account to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link to="/parent/progress" className="lexi-card p-6 hover:shadow-lg">
            <BarChart3 className="mb-4 h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold">View Progress</h3>
            <p className="mt-2 text-sm text-muted-foreground">Track your child's learning journey</p>
          </Link>
          <Link to="/parent/feedback" className="lexi-card p-6 hover:shadow-lg">
            <MessageSquare className="mb-4 h-10 w-10 text-lexi-sage" />
            <h3 className="text-xl font-semibold">Teacher Feedback</h3>
            <p className="mt-2 text-sm text-muted-foreground">Read notes from teachers</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
