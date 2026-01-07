-- Create storage bucket for assignment evidence
INSERT INTO storage.buckets (id, name, public)
VALUES ('assignment-evidence', 'assignment-evidence', false);

-- Storage policies for assignment evidence
CREATE POLICY "Parents can upload evidence for their linked students"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'assignment-evidence'
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'parent')
);

CREATE POLICY "Parents can view evidence they uploaded"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'assignment-evidence'
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'parent')
);

-- Create table to track assignment submissions
CREATE TABLE public.assignment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  parent_id UUID NOT NULL,
  assignment_id UUID NOT NULL,
  assignment_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;

-- RLS policies for assignment_submissions
CREATE POLICY "Parents can insert submissions for linked students"
ON public.assignment_submissions
FOR INSERT
WITH CHECK (
  auth.uid() = parent_id
  AND public.is_linked_parent(auth.uid(), student_id)
);

CREATE POLICY "Parents can view their own submissions"
ON public.assignment_submissions
FOR SELECT
USING (auth.uid() = parent_id);

CREATE POLICY "Teachers can view all submissions"
ON public.assignment_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'teacher'));