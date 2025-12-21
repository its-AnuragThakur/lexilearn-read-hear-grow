// Core application types

export type AppRole = 'student' | 'teacher' | 'parent';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface AccessibilityPreferences {
  id: string;
  user_id: string;
  font_family: 'lexend' | 'open-dyslexic' | 'system';
  font_size: number;
  line_spacing: number;
  letter_spacing: number;
  background_theme: 'default' | 'cream' | 'blue-tint' | 'green-tint' | 'high-contrast';
  tts_speed: number;
  tts_voice: string | null;
  reading_ruler_enabled: boolean;
  reading_ruler_color: string;
  high_contrast: boolean;
  reduced_motion: boolean;
  updated_at: string;
}

export interface Lesson {
  id: string;
  teacher_id: string;
  title: string;
  description: string | null;
  content: string;
  image_url: string | null;
  audio_url: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topic: string | null;
  estimated_minutes: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  started_at: string | null;
  completed_at: string | null;
  time_spent_seconds: number;
  is_completed: boolean;
}

export interface FlashcardDeck {
  id: string;
  teacher_id: string;
  title: string;
  description: string | null;
  topic: string | null;
  difficulty: string;
  is_published: boolean;
  created_at: string;
}

export interface Flashcard {
  id: string;
  deck_id: string;
  front_text: string;
  back_text: string;
  image_url: string | null;
  audio_hint: string | null;
  created_at: string;
}

export interface Quiz {
  id: string;
  teacher_id: string;
  lesson_id: string | null;
  title: string;
  description: string | null;
  difficulty: string;
  is_published: boolean;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'fill_blank';
  options: string[] | null;
  correct_answer: string;
  image_url: string | null;
  audio_hint: string | null;
  order_index: number;
  created_at: string;
}

export interface PracticeSession {
  id: string;
  student_id: string;
  activity_type: 'word_decoding' | 'flashcards' | 'quiz' | 'spelling';
  related_id: string | null;
  score: number | null;
  total_questions: number | null;
  correct_answers: number | null;
  time_spent_seconds: number;
  completed_at: string | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  student_id: string;
  achievement_type: string;
  title: string;
  description: string | null;
  icon: string | null;
  earned_at: string;
}

export interface WordDecodingExercise {
  id: string;
  teacher_id: string;
  word: string;
  syllables: string[];
  phonetic_breakdown: string | null;
  audio_url: string | null;
  difficulty: string;
  is_published: boolean;
  created_at: string;
}

export interface SpellingExercise {
  id: string;
  teacher_id: string;
  word: string;
  audio_hint: string | null;
  image_url: string | null;
  difficulty: string;
  is_published: boolean;
  created_at: string;
}

export interface TeacherNote {
  id: string;
  teacher_id: string;
  student_id: string;
  note: string;
  is_read: boolean;
  created_at: string;
}

export interface ParentStudentLink {
  id: string;
  parent_id: string;
  student_id: string;
  created_at: string;
}

// UI State types
export interface TTSState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string | null;
  speed: number;
  voice: SpeechSynthesisVoice | null;
}

export interface ReadingRulerState {
  enabled: boolean;
  position: number;
  color: string;
}
