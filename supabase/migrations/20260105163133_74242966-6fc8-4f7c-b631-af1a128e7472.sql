-- Allow students to view profiles of parents who have sent them link requests
CREATE POLICY "Students can view parent profiles with pending requests"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'student'::app_role)
  AND has_role(profiles.id, 'parent'::app_role)
  AND EXISTS (
    SELECT 1 FROM public.parent_link_requests
    WHERE parent_link_requests.parent_id = profiles.id
      AND parent_link_requests.student_id = auth.uid()
      AND parent_link_requests.status = 'pending'
  )
);