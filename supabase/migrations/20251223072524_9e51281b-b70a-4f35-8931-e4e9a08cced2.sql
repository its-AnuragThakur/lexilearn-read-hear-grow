-- Create table for storing student assessment responses
CREATE TABLE public.student_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  responses JSONB NOT NULL,
  learning_profile JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id)
);

-- Enable RLS
ALTER TABLE public.student_assessments ENABLE ROW LEVEL SECURITY;

-- Students can manage their own assessment
CREATE POLICY "Students can manage own assessment"
ON public.student_assessments
FOR ALL
USING (auth.uid() = student_id)
WITH CHECK (auth.uid() = student_id);

-- Parents can view linked children assessments
CREATE POLICY "Parents can view linked children assessments"
ON public.student_assessments
FOR SELECT
USING (is_linked_parent(auth.uid(), student_id));

-- Teachers can view student assessments
CREATE POLICY "Teachers can view student assessments"
ON public.student_assessments
FOR SELECT
USING (has_role(auth.uid(), 'teacher'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_student_assessments_updated_at
BEFORE UPDATE ON public.student_assessments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();