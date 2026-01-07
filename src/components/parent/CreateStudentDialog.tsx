import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserPlus, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CreateStudentDialogProps {
  onSuccess?: () => void;
}

export function CreateStudentDialog({ onSuccess }: CreateStudentDialogProps) {
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreate = async () => {
    if (!studentName.trim() || !studentEmail.trim() || !user) return;

    setIsCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-student-account', {
        body: {
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim(),
          parentEmail: profile?.email || user.email,
          parentName: profile?.full_name || 'Parent',
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setSuccess(true);
      toast.success('Student account created! Credentials sent to your email.');
      
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setStudentName('');
        setStudentEmail('');
        onSuccess?.();
      }, 2000);
    } catch (error: any) {
      console.error('Error creating student:', error);
      toast.error(error.message || 'Failed to create student account');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Create Student Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Student Account</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            Create a new account for your child. Login credentials will be sent to your email.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg font-medium text-center">Account Created!</p>
            <p className="text-muted-foreground text-center mt-2">
              Check your email for login credentials.
            </p>
          </div>
        ) : (
          <div className="space-y-5 pt-4">
            <div className="space-y-2">
              <Label htmlFor="student-name" className="text-base">
                Child's Full Name
              </Label>
              <Input
                id="student-name"
                type="text"
                placeholder="Enter your child's name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="h-12 text-base"
                disabled={isCreating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-email" className="text-base">
                Email for Student Account
              </Label>
              <Input
                id="student-email"
                type="email"
                placeholder="student@example.com"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="h-12 text-base"
                disabled={isCreating}
              />
              <p className="text-sm text-muted-foreground">
                This will be used for your child to log in.
              </p>
            </div>

            <Button
              onClick={handleCreate}
              disabled={isCreating || !studentName.trim() || !studentEmail.trim()}
              className="w-full h-12 text-base"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account & Send Credentials'
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
