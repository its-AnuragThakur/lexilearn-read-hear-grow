import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen, Users, FileText, BarChart3, Plus, Clock,
  TrendingUp, Award, Bell, ChevronRight, Layers,
  GraduationCap, Activity, Sparkles, LogOut
} from 'lucide-react';

interface DashboardStats {
  totalLessons: number;
  publishedLessons: number;
  totalStudents: number;
  totalQuizzes: number;
  recentSessions: number;
  avgScore: number;
}

interface RecentLesson {
  id: string;
  title: string;
  difficulty: string | null;
  is_published: boolean | null;
  updated_at: string;
}

interface RecentSession {
  id: string;
  activity_type: string;
  score: number | null;
  total_questions: number | null;
  completed_at: string | null;
  student_id: string;
  student_name?: string;
}

export default function TeacherDashboard() {
  const { profile, user, signOut } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalLessons: 0, publishedLessons: 0, totalStudents: 0,
    totalQuizzes: 0, recentSessions: 0, avgScore: 0,
  });
  const [recentLessons, setRecentLessons] = useState<RecentLesson[]>([]);
  const [recentSessions, setRecentSessions] = useState<RecentSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [lessonsRes, quizzesRes, sessionsRes, profilesRes] = await Promise.all([
        supabase.from('lessons').select('id, title, difficulty, is_published, updated_at').eq('teacher_id', user!.id).order('updated_at', { ascending: false }).limit(5),
        supabase.from('quizzes').select('id').eq('teacher_id', user!.id),
        supabase.from('practice_sessions').select('id, activity_type, score, total_questions, completed_at, student_id').order('created_at', { ascending: false }).limit(8),
        supabase.from('profiles').select('id, full_name'),
      ]);

      const lessons = lessonsRes.data || [];
      const quizzes = quizzesRes.data || [];
      const sessions = sessionsRes.data || [];
      const profiles = profilesRes.data || [];

      const profileMap = new Map(profiles.map(p => [p.id, p.full_name || 'Student']));
      const uniqueStudents = new Set(sessions.map(s => s.student_id));
      const scoredSessions = sessions.filter(s => s.score != null && s.total_questions != null && s.total_questions > 0);
      const avgScore = scoredSessions.length > 0
        ? Math.round(scoredSessions.reduce((sum, s) => sum + ((s.score! / s.total_questions!) * 100), 0) / scoredSessions.length)
        : 0;

      setStats({
        totalLessons: lessons.length,
        publishedLessons: lessons.filter(l => l.is_published).length,
        totalStudents: uniqueStudents.size,
        totalQuizzes: quizzes.length,
        recentSessions: sessions.length,
        avgScore,
      });

      setRecentLessons(lessons.slice(0, 4));
      setRecentSessions(sessions.slice(0, 5).map(s => ({
        ...s,
        student_name: profileMap.get(s.student_id) || 'Student',
      })));
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const difficultyColor = (d: string | null) => {
    switch (d) {
      case 'beginner': return 'bg-success/15 text-success border-success/20';
      case 'intermediate': return 'bg-warning/15 text-warning border-warning/20';
      case 'advanced': return 'bg-destructive/15 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const activityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <FileText className="h-4 w-4" />;
      case 'flashcards': return <Layers className="h-4 w-4" />;
      case 'spelling': return <Sparkles className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const timeAgo = (date: string | null) => {
    if (!date) return 'In progress';
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/teacher" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-semibold text-foreground">LexiLearn</span>
              <span className="ml-2 text-xs text-muted-foreground">Teacher</span>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <Link to="/teacher/lessons">
              <Button variant="ghost" size="sm" className="gap-2">
                <FileText className="h-4 w-4" /> Lessons
              </Button>
            </Link>
            <Link to="/teacher/reports">
              <Button variant="ghost" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" /> Reports
              </Button>
            </Link>
            <div className="mx-2 h-6 w-px bg-border" />
            <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {greeting()}, {profile?.full_name?.split(' ')[0] || 'Teacher'} 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here's what's happening with your students today.
            </p>
          </div>
          <Link to="/teacher/lessons">
            <Button className="gap-2 shadow-md">
              <Plus className="h-4 w-4" /> Create Lesson
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Lessons', value: stats.totalLessons, icon: FileText, color: 'text-primary', sub: `${stats.publishedLessons} published` },
            { label: 'Active Students', value: stats.totalStudents, icon: Users, color: 'text-lexi-sage', sub: 'across all classes' },
            { label: 'Quizzes Created', value: stats.totalQuizzes, icon: GraduationCap, color: 'text-lexi-amber', sub: 'total quizzes' },
            { label: 'Avg. Score', value: `${stats.avgScore}%`, icon: TrendingUp, color: 'text-success', sub: 'student average' },
          ].map((stat) => (
            <Card key={stat.label} className="relative overflow-hidden border-border/50 transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold text-foreground">{loading ? '—' : stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
                  </div>
                  <div className={`rounded-lg bg-muted p-2.5 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Lessons */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg">Recent Lessons</CardTitle>
                <CardDescription>Your latest lesson content</CardDescription>
              </div>
              <Link to="/teacher/lessons">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
                  ))}
                </div>
              ) : recentLessons.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <FileText className="mb-3 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No lessons yet</p>
                  <Link to="/teacher/lessons" className="mt-3">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Plus className="h-3 w-3" /> Create your first lesson
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{lesson.title}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="outline" className={`text-[10px] ${difficultyColor(lesson.difficulty)}`}>
                              {lesson.difficulty || 'unset'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              <Clock className="mr-1 inline h-3 w-3" />
                              {timeAgo(lesson.updated_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={lesson.is_published ? 'default' : 'secondary'} className="text-xs">
                        {lesson.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                {[
                  { label: 'Create Lesson', icon: Plus, to: '/teacher/lessons', color: 'bg-primary/10 text-primary' },
                  { label: 'View Reports', icon: BarChart3, to: '/teacher/reports', color: 'bg-lexi-sage/20 text-lexi-sage' },
                  { label: 'Student Progress', icon: TrendingUp, to: '/teacher/reports', color: 'bg-warning/15 text-warning' },
                ].map((action) => (
                  <Link key={action.label} to={action.to}>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-11">
                      <div className={`rounded-md p-1.5 ${action.color}`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Student Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-10 animate-pulse rounded bg-muted" />
                    ))}
                  </div>
                ) : recentSessions.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">No student activity yet</p>
                ) : (
                  <div className="space-y-3">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {activityIcon(session.activity_type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {session.student_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {session.activity_type} • {session.score != null ? `${session.score}/${session.total_questions}` : 'in progress'}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {timeAgo(session.completed_at)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Class Performance */}
            <Card className="border-border/50 bg-gradient-to-br from-card to-secondary/30">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-lexi-amber" />
                  <p className="font-semibold text-foreground">Class Performance</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Average Score</span>
                      <span className="font-medium text-foreground">{stats.avgScore}%</span>
                    </div>
                    <Progress value={stats.avgScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Lessons Published</span>
                      <span className="font-medium text-foreground">
                        {stats.publishedLessons}/{stats.totalLessons}
                      </span>
                    </div>
                    <Progress
                      value={stats.totalLessons > 0 ? (stats.publishedLessons / stats.totalLessons) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
