export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      accessibility_preferences: {
        Row: {
          background_theme: string | null
          font_family: string | null
          font_size: number | null
          high_contrast: boolean | null
          id: string
          letter_spacing: number | null
          line_spacing: number | null
          reading_ruler_color: string | null
          reading_ruler_enabled: boolean | null
          reduced_motion: boolean | null
          tts_speed: number | null
          tts_voice: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          background_theme?: string | null
          font_family?: string | null
          font_size?: number | null
          high_contrast?: boolean | null
          id?: string
          letter_spacing?: number | null
          line_spacing?: number | null
          reading_ruler_color?: string | null
          reading_ruler_enabled?: boolean | null
          reduced_motion?: boolean | null
          tts_speed?: number | null
          tts_voice?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          background_theme?: string | null
          font_family?: string | null
          font_size?: number | null
          high_contrast?: boolean | null
          id?: string
          letter_spacing?: number | null
          line_spacing?: number | null
          reading_ruler_color?: string | null
          reading_ruler_enabled?: boolean | null
          reduced_motion?: boolean | null
          tts_speed?: number | null
          tts_voice?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          achievement_type: string
          description: string | null
          earned_at: string
          icon: string | null
          id: string
          student_id: string
          title: string
        }
        Insert: {
          achievement_type: string
          description?: string | null
          earned_at?: string
          icon?: string | null
          id?: string
          student_id: string
          title: string
        }
        Update: {
          achievement_type?: string
          description?: string | null
          earned_at?: string
          icon?: string | null
          id?: string
          student_id?: string
          title?: string
        }
        Relationships: []
      }
      flashcard_decks: {
        Row: {
          created_at: string
          description: string | null
          difficulty: string | null
          id: string
          is_published: boolean | null
          teacher_id: string
          title: string
          topic: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          is_published?: boolean | null
          teacher_id: string
          title: string
          topic?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          is_published?: boolean | null
          teacher_id?: string
          title?: string
          topic?: string | null
        }
        Relationships: []
      }
      flashcards: {
        Row: {
          audio_hint: string | null
          back_text: string
          created_at: string
          deck_id: string
          front_text: string
          id: string
          image_url: string | null
        }
        Insert: {
          audio_hint?: string | null
          back_text: string
          created_at?: string
          deck_id: string
          front_text: string
          id?: string
          image_url?: string | null
        }
        Update: {
          audio_hint?: string | null
          back_text?: string
          created_at?: string
          deck_id?: string
          front_text?: string
          id?: string
          image_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "flashcard_decks"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          id: string
          is_completed: boolean | null
          lesson_id: string
          started_at: string | null
          student_id: string
          time_spent_seconds: number | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          is_completed?: boolean | null
          lesson_id: string
          started_at?: string | null
          student_id: string
          time_spent_seconds?: number | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          is_completed?: boolean | null
          lesson_id?: string
          started_at?: string | null
          student_id?: string
          time_spent_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          audio_url: string | null
          content: string
          created_at: string
          description: string | null
          difficulty: string | null
          estimated_minutes: number | null
          id: string
          image_url: string | null
          is_published: boolean | null
          teacher_id: string
          title: string
          topic: string | null
          updated_at: string
        }
        Insert: {
          audio_url?: string | null
          content: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          estimated_minutes?: number | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          teacher_id: string
          title: string
          topic?: string | null
          updated_at?: string
        }
        Update: {
          audio_url?: string | null
          content?: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          estimated_minutes?: number | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          teacher_id?: string
          title?: string
          topic?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      parent_student_links: {
        Row: {
          created_at: string
          id: string
          parent_id: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          parent_id: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          parent_id?: string
          student_id?: string
        }
        Relationships: []
      }
      practice_sessions: {
        Row: {
          activity_type: string
          completed_at: string | null
          correct_answers: number | null
          created_at: string
          id: string
          related_id: string | null
          score: number | null
          student_id: string
          time_spent_seconds: number | null
          total_questions: number | null
        }
        Insert: {
          activity_type: string
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string
          id?: string
          related_id?: string | null
          score?: number | null
          student_id: string
          time_spent_seconds?: number | null
          total_questions?: number | null
        }
        Update: {
          activity_type?: string
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string
          id?: string
          related_id?: string | null
          score?: number | null
          student_id?: string
          time_spent_seconds?: number | null
          total_questions?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          audio_hint: string | null
          correct_answer: string
          created_at: string
          id: string
          image_url: string | null
          options: Json | null
          order_index: number | null
          question_text: string
          question_type: string | null
          quiz_id: string
        }
        Insert: {
          audio_hint?: string | null
          correct_answer: string
          created_at?: string
          id?: string
          image_url?: string | null
          options?: Json | null
          order_index?: number | null
          question_text: string
          question_type?: string | null
          quiz_id: string
        }
        Update: {
          audio_hint?: string | null
          correct_answer?: string
          created_at?: string
          id?: string
          image_url?: string | null
          options?: Json | null
          order_index?: number | null
          question_text?: string
          question_type?: string | null
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          description: string | null
          difficulty: string | null
          id: string
          is_published: boolean | null
          lesson_id: string | null
          teacher_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          is_published?: boolean | null
          lesson_id?: string | null
          teacher_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          is_published?: boolean | null
          lesson_id?: string | null
          teacher_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      spelling_exercises: {
        Row: {
          audio_hint: string | null
          created_at: string
          difficulty: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          teacher_id: string
          word: string
        }
        Insert: {
          audio_hint?: string | null
          created_at?: string
          difficulty?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          teacher_id: string
          word: string
        }
        Update: {
          audio_hint?: string | null
          created_at?: string
          difficulty?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          teacher_id?: string
          word?: string
        }
        Relationships: []
      }
      teacher_notes: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          note: string
          student_id: string
          teacher_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          note: string
          student_id: string
          teacher_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          note?: string
          student_id?: string
          teacher_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      word_decoding_exercises: {
        Row: {
          audio_url: string | null
          created_at: string
          difficulty: string | null
          id: string
          is_published: boolean | null
          phonetic_breakdown: string | null
          syllables: Json
          teacher_id: string
          word: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          difficulty?: string | null
          id?: string
          is_published?: boolean | null
          phonetic_breakdown?: string | null
          syllables: Json
          teacher_id: string
          word: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          difficulty?: string | null
          id?: string
          is_published?: boolean | null
          phonetic_breakdown?: string | null
          syllables?: Json
          teacher_id?: string
          word?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_linked_parent: {
        Args: { _parent_id: string; _student_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "teacher" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "teacher", "parent"],
    },
  },
} as const
