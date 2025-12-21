import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Send, Loader2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsSubmitted(true);
    toast({
      title: 'Message Sent!',
      description: 'We\'ll get back to you as soon as possible.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">LexiLearn</span>
          </Link>
          
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/accessibility" className="text-muted-foreground hover:text-foreground">Accessibility</Link>
            <Link to="/contact" className="font-medium text-foreground">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl">
            <div className="mb-10 text-center">
              <h1 className="lexi-heading mb-4 text-4xl font-bold">Contact Us</h1>
              <p className="lexi-text text-lg text-muted-foreground">
                Have questions, feedback, or need support? We'd love to hear from you.
              </p>
            </div>

            {isSubmitted ? (
              <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                  <Check className="h-8 w-8 text-success-foreground" />
                </div>
                <h2 className="mb-2 text-2xl font-semibold">Thank You!</h2>
                <p className="text-muted-foreground">
                  Your message has been sent. We'll respond within 24-48 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <div className="lexi-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      className="min-h-[150px] text-base"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full gap-2 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}

            {/* Alternative contact */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Prefer email?{' '}
                <a href="mailto:support@lexilearn.com" className="text-primary hover:underline">
                  support@lexilearn.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">LexiLearn</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">About</Link>
              <Link to="/accessibility" className="hover:text-foreground">Accessibility</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 LexiLearn</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
