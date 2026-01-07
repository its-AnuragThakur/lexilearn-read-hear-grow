-- Table to track parent-created student accounts
CREATE TABLE public.parent_created_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_email TEXT NOT NULL,
  temporary_password TEXT NOT NULL, -- Stored hashed
  password_changed BOOLEAN DEFAULT false,
  credentials_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(student_id)
);

-- Enable RLS
ALTER TABLE public.parent_created_students ENABLE ROW LEVEL SECURITY;

-- Parent can view their created students
CREATE POLICY "Parents can view their created students"
ON public.parent_created_students
FOR SELECT
TO authenticated
USING (parent_id = auth.uid());

-- Parent can insert (create student)
CREATE POLICY "Parents can create student records"
ON public.parent_created_students
FOR INSERT
TO authenticated
WITH CHECK (parent_id = auth.uid() AND has_role(auth.uid(), 'parent'::app_role));

-- Parent can update their student records
CREATE POLICY "Parents can update their student records"
ON public.parent_created_students
FOR UPDATE
TO authenticated
USING (parent_id = auth.uid());

-- Students can view their own record (to check password_changed status)
CREATE POLICY "Students can view their own record"
ON public.parent_created_students
FOR SELECT
TO authenticated
USING (student_id = auth.uid());

-- Students can update their own password_changed status
CREATE POLICY "Students can update their password_changed status"
ON public.parent_created_students
FOR UPDATE
TO authenticated
USING (student_id = auth.uid());