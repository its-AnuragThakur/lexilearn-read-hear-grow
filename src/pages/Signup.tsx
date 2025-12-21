import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Loader2, Eye, EyeOff, GraduationCap, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { AppRole } from '@/types';
import { cn } from '@/lib/utils';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const roles: { value: AppRole; label: string; icon: typeof GraduationCap; description: string }[] = [
  { value: 'student', label: 'Student', icon: GraduationCap, description: 'I want to learn' },
  { value: 'teacher', label: 'Teacher', icon: BookOpen, description: 'I create lessons' },
  { value: 'parent', label: 'Parent', icon: Users, description: 'I support my child' },
];

export default function Signup() {
  const { signUp, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const initialRole = (searchParams.get('role') as AppRole) || 'student';
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<AppRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const result = signupSchema.safeParse({ fullName, email, password });
    if (!result.success) {
      const fieldErrors: { fullName?: string; email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'fullName') fieldErrors.fullName = err.message;
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, fullName, selectedRole);

    if (error) {
      let errorMessage = error.message;
      if (error.message.includes('already registered')) {
        errorMessage = 'This email is already registered. Please sign in instead.';
      }
      toast({
        title: 'Signup Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: 'Welcome to LexiLearn!',
      description: 'Your account has been created successfully.',
    });

    // Navigate to appropriate dashboard
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LexiLearn</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="lexi-card p-8">
            <div className="mb-8 text-center">
              <h1 className="lexi-heading mb-2 text-2xl font-bold">Create Your Account</h1>
              <p className="text-muted-foreground">
                Join LexiLearn and start your learning journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-base">I am a...</Label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                        selectedRole === role.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <role.icon className={cn(
                        'h-6 w-6',
                        selectedRole === role.value ? 'text-primary' : 'text-muted-foreground'
                      )} />
                      <span className={cn(
                        'text-sm font-medium',
                        selectedRole === role.value ? 'text-primary' : 'text-foreground'
                      )}>
                        {role.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                  className="h-12 text-base"
                  autoComplete="name"
                  aria-describedby={errors.fullName ? 'name-error' : undefined}
                />
                {errors.fullName && (
                  <p id="name-error" className="text-sm text-destructive">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 text-base"
                  autoComplete="email"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (6+ characters)"
                    className="h-12 pr-12 text-base"
                    autoComplete="new-password"
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-destructive">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="h-12 w-full text-base"
                disabled={isLoading || authLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
