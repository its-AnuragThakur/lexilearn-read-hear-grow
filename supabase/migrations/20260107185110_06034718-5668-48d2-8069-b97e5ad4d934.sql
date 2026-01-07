-- Allow parents to insert/update assessments for their linked students
CREATE POLICY "Parents can manage linked children assessments"
ON public.student_assessments
FOR ALL
USING (
  public.is_linked_parent(auth.uid(), student_id)
)
WITH CHECK (
  public.is_linked_parent(auth.uid(), student_id)
);