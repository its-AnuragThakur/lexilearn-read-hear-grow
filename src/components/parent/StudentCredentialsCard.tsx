import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClipboardCheck, RefreshCw, Loader2, Eye, EyeOff, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface StudentCredentialsCardProps {
  student: {
    id: string;
    student_id: string;
    student_email: string;
    temporary_password: string;
    password_changed: boolean;
    credentials_sent_at: string | null;
    profile?: {
      full_name: string | null;
    } | null;
  };
  hasAssessment: boolean;
  onAssessmentClick: () => void;
  onCredentialsReset?: () => void;
}

export function StudentCredentialsCard({
  student,
  hasAssessment,
  onAssessmentClick,
  onCredentialsReset,
}: StudentCredentialsCardProps) {
  const { user, profile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleResendCredentials = async () => {
    if (!user) return;

    setIsResending(true);
    try {
      const { data, error } = await supabase.functions.invoke('resend-student-credentials', {
        body: {
          studentId: student.student_id,
          parentEmail: profile?.email || user.email,
          parentName: profile?.full_name || 'Parent',
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      toast.success('New credentials sent to your email!');
      onCredentialsReset?.();
    } catch (error: any) {
      console.error('Error resending credentials:', error);
      toast.error(error.message || 'Failed to reset credentials');
    } finally {
      setIsResending(false);
    }
  };

  const studentName = student.profile?.full_name || 'Student';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{studentName}</CardTitle>
          {student.password_changed ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Password Changed
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              First Login Pending
            </Badge>
          )}
        </div>
        <CardDescription>{student.student_email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Credentials Section */}
        {!student.password_changed && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Temporary Password</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="h-8 px-2"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <code className="block text-sm font-mono bg-background px-3 py-2 rounded border">
              {showPassword ? student.temporary_password : '••••••••••••'}
            </code>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {!student.password_changed && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResendCredentials}
              disabled={isResending}
              className="gap-2"
            >
              {isResending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Reset & Resend
            </Button>
          )}

          {hasAssessment ? (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <ClipboardCheck className="h-4 w-4" />
              Assessment Complete
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={onAssessmentClick} className="gap-2">
              <ClipboardCheck className="h-4 w-4" />
              Complete Assessment
            </Button>
          )}
        </div>

        {student.credentials_sent_at && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Mail className="h-3 w-3" />
            Credentials sent {new Date(student.credentials_sent_at).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
