-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('student', 'teacher', 'parent');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create parent_student_links table
CREATE TABLE public.parent_student_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (parent_id, student_id)
);

-- Create accessibility_preferences table
CREATE TABLE public.accessibility_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  font_family TEXT DEFAULT 'lexend',
  font_size INTEGER DEFAULT 18,
  line_spacing NUMERIC DEFAULT 1.8,
  letter_spacing NUMERIC DEFAULT 0.05,
  background_theme TEXT DEFAULT 'cream',
  tts_speed NUMERIC DEFAULT 1.0,
  tts_voice TEXT,
  reading_ruler_enabled BOOLEAN DEFAULT false,
  reading_ruler_color TEXT DEFAULT '#ffeb3b',
  high_contrast BOOLEAN DEFAULT false,
  reduced_motion BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  audio_url TEXT,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  topic TEXT,
  estimated_minutes INTEGER DEFAULT 10,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create lesson_progress table
CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  UNIQUE (student_id, lesson_id)
);

-- Create flashcard_decks table
CREATE TABLE public.flashcard_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  topic TEXT,
  difficulty TEXT DEFAULT 'beginner',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create flashcards table
CREATE TABLE public.flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES public.flashcard_decks(id) ON DELETE CASCADE,
  front_text TEXT NOT NULL,
  back_text TEXT NOT NULL,
  image_url TEXT,
  audio_hint TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create quizzes table
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT DEFAULT 'beginner',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create quiz_questions table
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice', 'true_false', 'fill_blank')),
  options JSONB,
  correct_answer TEXT NOT NULL,
  image_url TEXT,
  audio_hint TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create practice_sessions table
CREATE TABLE public.practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('word_decoding', 'flashcards', 'quiz', 'spelling')),
  related_id UUID,
  score INTEGER,
  total_questions INTEGER,
  correct_answers INTEGER,
  time_spent_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create word_decoding_exercises table
CREATE TABLE public.word_decoding_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  syllables JSONB NOT NULL,
  phonetic_breakdown TEXT,
  audio_url TEXT,
  difficulty TEXT DEFAULT 'beginner',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create spelling_exercises table
CREATE TABLE public.spelling_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  audio_hint TEXT,
  image_url TEXT,
  difficulty TEXT DEFAULT 'beginner',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create teacher_notes table (for parent communication)
CREATE TABLE public.teacher_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accessibility_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_decoding_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spelling_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_notes ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is linked parent
CREATE OR REPLACE FUNCTION public.is_linked_parent(_parent_id UUID, _student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.parent_student_links
    WHERE parent_id = _parent_id
      AND student_id = _student_id
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Teachers can view student profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Parents can view linked children profiles"
  ON public.profiles FOR SELECT
  USING (public.is_linked_parent(auth.uid(), id));

-- User roles policies
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roles during signup"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Parent student links policies
CREATE POLICY "Parents can view own links"
  ON public.parent_student_links FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Students can view links to them"
  ON public.parent_student_links FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Parents can create links"
  ON public.parent_student_links FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can delete own links"
  ON public.parent_student_links FOR DELETE
  USING (auth.uid() = parent_id);

-- Accessibility preferences policies
CREATE POLICY "Users can manage own preferences"
  ON public.accessibility_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Lessons policies
CREATE POLICY "Published lessons visible to all authenticated"
  ON public.lessons FOR SELECT
  USING (is_published = true AND auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can view own lessons"
  ON public.lessons FOR SELECT
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can manage own lessons"
  ON public.lessons FOR ALL
  USING (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'))
  WITH CHECK (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'));

-- Lesson progress policies
CREATE POLICY "Students can manage own progress"
  ON public.lesson_progress FOR ALL
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can view all student progress"
  ON public.lesson_progress FOR SELECT
  USING (public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Parents can view linked children progress"
  ON public.lesson_progress FOR SELECT
  USING (public.is_linked_parent(auth.uid(), student_id));

-- Flashcard decks policies
CREATE POLICY "Published decks visible to authenticated"
  ON public.flashcard_decks FOR SELECT
  USING (is_published = true AND auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can manage own decks"
  ON public.flashcard_decks FOR ALL
  USING (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'))
  WITH CHECK (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'));

-- Flashcards policies
CREATE POLICY "Flashcards visible with deck access"
  ON public.flashcards FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.flashcard_decks
      WHERE id = deck_id
      AND (is_published = true OR teacher_id = auth.uid())
    )
  );

CREATE POLICY "Teachers can manage flashcards in own decks"
  ON public.flashcards FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.flashcard_decks
      WHERE id = deck_id AND teacher_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.flashcard_decks
      WHERE id = deck_id AND teacher_id = auth.uid()
    )
  );

-- Quizzes policies
CREATE POLICY "Published quizzes visible to authenticated"
  ON public.quizzes FOR SELECT
  USING (is_published = true AND auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can manage own quizzes"
  ON public.quizzes FOR ALL
  USING (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'))
  WITH CHECK (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'));

-- Quiz questions policies
CREATE POLICY "Questions visible with quiz access"
  ON public.quiz_questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.quizzes
      WHERE id = quiz_id
      AND (is_published = true OR teacher_id = auth.uid())
    )
  );

CREATE POLICY "Teachers can manage questions in own quizzes"
  ON public.quiz_questions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.quizzes
      WHERE id = quiz_id AND teacher_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.quizzes
      WHERE id = quiz_id AND teacher_id = auth.uid()
    )
  );

-- Practice sessions policies
CREATE POLICY "Students can manage own sessions"
  ON public.practice_sessions FOR ALL
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can view all practice sessions"
  ON public.practice_sessions FOR SELECT
  USING (public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Parents can view linked children sessions"
  ON public.practice_sessions FOR SELECT
  USING (public.is_linked_parent(auth.uid(), student_id));

-- Achievements policies
CREATE POLICY "Students can view own achievements"
  ON public.achievements FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can earn achievements"
  ON public.achievements FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can view student achievements"
  ON public.achievements FOR SELECT
  USING (public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Parents can view linked children achievements"
  ON public.achievements FOR SELECT
  USING (public.is_linked_parent(auth.uid(), student_id));

-- Word decoding exercises policies
CREATE POLICY "Published exercises visible to authenticated"
  ON public.word_decoding_exercises FOR SELECT
  USING (is_published = true AND auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can manage own exercises"
  ON public.word_decoding_exercises FOR ALL
  USING (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'))
  WITH CHECK (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'));

-- Spelling exercises policies
CREATE POLICY "Published spelling visible to authenticated"
  ON public.spelling_exercises FOR SELECT
  USING (is_published = true AND auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can manage spelling exercises"
  ON public.spelling_exercises FOR ALL
  USING (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'))
  WITH CHECK (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'));

-- Teacher notes policies
CREATE POLICY "Teachers can manage own notes"
  ON public.teacher_notes FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Parents can view notes about linked children"
  ON public.teacher_notes FOR SELECT
  USING (public.is_linked_parent(auth.uid(), student_id));

CREATE POLICY "Parents can mark notes as read"
  ON public.teacher_notes FOR UPDATE
  USING (public.is_linked_parent(auth.uid(), student_id));

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_accessibility_preferences_updated_at
  BEFORE UPDATE ON public.accessibility_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();