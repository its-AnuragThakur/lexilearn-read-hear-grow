import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface LearningProfile {
  difficulties: {
    reading: number;
    spelling: number;
    phonics: number;
    memory: number;
    attention: number;
    visual: number;
  };
  preferences: {
    fontSize: string;
    spacing: string;
    learningStyle: string;
    ttsPreference: string;
    repetitionNeed: string;
  };
  recommendations: {
    useTTS: boolean;
    useReadingRuler: boolean;
    useColoredBackground: boolean;
    lessonPace: string;
    focusAreas: string[];
  };
}

export interface StudentAssessment {
  id: string;
  student_id: string;
  completed_at: string;
  responses: Record<number, string>;
  learning_profile: LearningProfile | null;
  created_at: string;
  updated_at: string;
}

export function useAssessment(studentId?: string) {
  const { user } = useAuth();
  const targetId = studentId || user?.id;

  return useQuery({
    queryKey: ["student-assessment", targetId],
    queryFn: async () => {
      if (!targetId) return null;

      const { data, error } = await supabase
        .from("student_assessments")
        .select("*")
        .eq("student_id", targetId)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      return {
        ...data,
        responses: data.responses as unknown as Record<number, string>,
        learning_profile: data.learning_profile as unknown as LearningProfile | null,
      } as StudentAssessment;
    },
    enabled: !!targetId,
  });
}

export function useHasCompletedAssessment() {
  const { data: assessment, isLoading } = useAssessment();
  return {
    hasCompleted: !!assessment?.completed_at,
    isLoading,
    assessment,
  };
}
