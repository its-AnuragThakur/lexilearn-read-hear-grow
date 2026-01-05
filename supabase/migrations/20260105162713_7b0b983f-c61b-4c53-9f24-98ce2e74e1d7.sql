-- Create table for pending parent-student link requests
CREATE TABLE public.parent_link_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID NOT NULL,
  student_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  UNIQUE (parent_id, student_id)
);

-- Enable RLS
ALTER TABLE public.parent_link_requests ENABLE ROW LEVEL SECURITY;

-- Parents can create and view their own requests
CREATE POLICY "Parents can create link requests"
ON public.parent_link_requests
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = parent_id
  AND has_role(auth.uid(), 'parent'::app_role)
);

CREATE POLICY "Parents can view own requests"
ON public.parent_link_requests
FOR SELECT
TO authenticated
USING (auth.uid() = parent_id);

-- Students can view and update requests sent to them
CREATE POLICY "Students can view requests to them"
ON public.parent_link_requests
FOR SELECT
TO authenticated
USING (
  auth.uid() = student_id
  AND has_role(auth.uid(), 'student'::app_role)
);

CREATE POLICY "Students can respond to requests"
ON public.parent_link_requests
FOR UPDATE
TO authenticated
USING (
  auth.uid() = student_id
  AND has_role(auth.uid(), 'student'::app_role)
)
WITH CHECK (
  auth.uid() = student_id
  AND has_role(auth.uid(), 'student'::app_role)
);